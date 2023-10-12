import { Grid, Paper, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { Redirect } from "react-router-dom";
import ProjectCreationForm from "../organisms/projectCreation/ProjectCreationForm";
import { ACCESS_TOKEN } from "../../constants/constant";
import { ProtectedRouteProps } from "../../models/components/pages/ProtectedRouteProps";
import { useAppContext } from "../../contexts/AppContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    title: {
      color: "white",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectBackUrl,
}) => {
  const classes = useStyles();
  const { setRedirectBackTo } = useAppContext();

  const ifAccessTokenExists = () => {
    if (
      sessionStorage.getItem(ACCESS_TOKEN) &&
      sessionStorage.getItem(ACCESS_TOKEN) !== undefined
    ) {
      return true;
    }
    setRedirectBackTo(redirectBackUrl);
  };

  return (
    <>
      {ifAccessTokenExists() ? (
        <div className={classes.root}>{children}</div>
      ) : (
        <Redirect push to={"/login"} />
      )}
    </>
  );
};

export default ProtectedRoute;
