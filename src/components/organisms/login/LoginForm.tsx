import { Box, Button, Grid, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import React, { ChangeEvent, useState } from "react";
import { useApiContext } from "../../../contexts/ApiContext";

import { useHistory, useParams } from "react-router-dom";
import {
  ACCESS_TOKEN,
  LOGIN_API_KEY,
  REGISTER_API_KEY,
} from "../../../constants/constant";
import { LoginFormProps } from "../../../models/components/organisms/LoginFormProps";
import postData from "../../../repositories/postData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
    button: {
      marginLeft: theme.spacing(3),
      backgroundColor: theme.palette.primary.light,
    },
  })
);

const LoginForm: React.FC<LoginFormProps> = ({ onSuccessGoBackTo }) => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const { setShowSnackBar, setApiResponseType, setApiResponseMessage } =
    useApiContext();
  const { initialPage } = useParams<{ initialPage: string }>();
  const api: any = {
    login: _.get(apiConfig, LOGIN_API_KEY),
    register: _.get(apiConfig, REGISTER_API_KEY),
  };
  const history = useHistory();

  const [userRequest, setUserRequest] = useState<{
    userName: string;
    password: string;
  }>({
    userName: "",
    password: "",
  });
  const handleOnChangeInputElement = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    let request = { ...userRequest };
    request = { ...request, [key]: event.target.value };
    setUserRequest(request);
  };

  const handleApiResponse = (currentApi: string) => {
    if (currentApi !== null && currentApi !== undefined) {
      postData(
        currentApi,
        userRequest,
        sessionStorage.getItem(ACCESS_TOKEN)
      ).then((response) => {
        if (response.error === null) {
          console.log("success");
          history.push("/" + initialPage);
        } else {
          setApiResponseMessage(
            `${
              currentApi === "/login"
                ? "Login failed, please try again"
                : "Registration failed, please try again"
            }  `
          );
          setApiResponseType("error");
          setShowSnackBar(true);
        }
      });
    }
  };

  const makeApiRequestLogin = async () => {
    let currentApi = api.login;
    handleApiResponse(currentApi);
  };

  const makeApiRequestRegister = async () => {
    let currentApi = api.register;
    handleApiResponse(currentApi);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <TextField
            required
            id="userName"
            name="userName"
            label="User Name"
            fullWidth
            type="userName"
            autoComplete="given-name"
            variant="standard"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "userName"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            type="password"
            autoComplete="family-name"
            variant="standard"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "password"
              )
            }
          />
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "24px" }}
      >
        <Button
          className={classes.button}
          variant="contained"
          onClick={makeApiRequestRegister}
        >
          Register
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={makeApiRequestLogin}
        >
          Login
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
