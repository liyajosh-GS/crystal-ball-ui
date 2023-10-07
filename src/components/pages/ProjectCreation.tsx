import { Button, Grid, Paper, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { ComponentProps } from "../../models/components/ComponentProps";
import { ProjectCreationProvider } from "../../contexts/ProjectCreationContext";
import ProjectCreationForm from "../organisms/projectCreation/ProjectCreationForm";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
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

const ProjectCreation: React.FC<ComponentProps> = ({ componentKey }) => {
  const classes = useStyles();

  const responseMessage = (response: any) => {
    console.log(JSON.stringify(response));
  };
  const errorMessage = () => {
    console.log(JSON.stringify("error"));
  };

  const { user, setUser } = useAppContext();
  // const [user, setUser] = useState<any>([]);
  // const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log("codeResponse " + JSON.stringify(codeResponse));
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      console.log("user " + JSON.stringify(user));
    }
  }, [user]);

  return (
    <ProjectCreationProvider>
      <div className={classes.root}>
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
        <Button onClick={() => login()}> Sign in</Button>
        <Grid container>
          <Grid item xs={5}>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h5" align="left" className={classes.title}>
                Register your project!
              </Typography>
              <ProjectCreationForm
                componentKey={componentKey + ".createProject"}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </ProjectCreationProvider>
  );
};

export default ProjectCreation;
