import { Grid, Paper, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { LoginFormProps } from "../../models/components/organisms/LoginFormProps";
import LoginForm from "../organisms/login/LoginForm";

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

const LoginPage: React.FC<LoginFormProps> = ({ onSuccessGoBackTo }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={5}>
            <Paper elevation={3} className={classes.paper}>
              <LoginForm onSuccessGoBackTo={onSuccessGoBackTo} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LoginPage;
