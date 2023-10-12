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

const RegistrationForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { apiConfig } = useApiContext();

  console.log("apiConfig " + JSON.stringify(apiConfig));

  const { setShowSnackBar, setApiResponseType, setApiResponseMessage } =
    useApiContext();
  const api: any = {
    login: _.get(apiConfig, LOGIN_API_KEY),
    register: _.get(apiConfig, REGISTER_API_KEY),
  };

  const [userRequest, setUserRequest] = useState<{
    userName: string;
    password: string;
    email: string;
  }>({
    userName: "",
    password: "",
    email: "",
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
          history.push("/");
        } else {
          setApiResponseMessage(response.error);
          setApiResponseType("error");
          setShowSnackBar(true);
        }
      });
    }
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

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            type="email"
            autoComplete="family-name"
            variant="outlined"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "email"
              )
            }
          />
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "24px" }}
      >
        <Button variant="contained" fullWidth onClick={makeApiRequestRegister}>
          Register
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default RegistrationForm;
