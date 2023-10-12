import { Box, Button, Grid, Link, TextField, Theme } from "@mui/material";
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
import { useAppContext } from "../../../contexts/AppContext";

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

const LoginForm: React.FC = () => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const { redirectBackTo } = useAppContext();
  const { setShowSnackBar, setApiResponseType, setApiResponseMessage } =
    useApiContext();

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
          history.push(`${redirectBackTo === null ? "/" : redirectBackTo}`);
        } else {
          setApiResponseMessage(response.error);
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
            variant="outlined"
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
            variant="outlined"
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
        sx={{
          display: "block",
          justifyContent: "flex-end",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Button fullWidth variant="contained" onClick={makeApiRequestLogin}>
          Login
        </Button>
        <Link href="/registration" variant="body2">
          {"Don't have an account? Register"}
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
