import { Box, Button, Grid, Link, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import React, { useState } from "react";
import { useApiContext } from "../../../contexts/ApiContext";
import { useHistory } from "react-router-dom";
import {
  ACCESS_TOKEN,
  LOGIN_API_KEY,
  REGISTER_API_KEY,
} from "../../../constants/constant";
import postData from "../../../repositories/postData";
import { useAppContext } from "../../../contexts/AppContext";
import InputField from "../../atoms/InputField";

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

  const handleOnChangeInputElement = (value: string, key: string) => {
    console.log("value " + value);
    let request = { ...userRequest };
    request = { ...request, [key]: value };
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
    sessionStorage.clear();
    handleApiResponse(currentApi);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <InputField
            required
            id="userName"
            label="User Name"
            type="userName"
            variant="outlined"
            onChange={(value) => handleOnChangeInputElement(value, "userName")}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            required
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(value) => handleOnChangeInputElement(value, "password")}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "block",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Button fullWidth variant="contained" onClick={makeApiRequestLogin}>
          Login
        </Button>
        <Link href="/registration" variant="body2" data-testid="goToRegister">
          {"Don't have an account? Register"}
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
