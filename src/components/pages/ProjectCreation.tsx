import { Grid, Paper, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { Redirect } from "react-router-dom";
import ProjectCreationForm from "../organisms/projectCreation/ProjectCreationForm";
import { ACCESS_TOKEN } from "../../constants/constant";

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

const ProjectCreation: React.FC = () => {
  const classes = useStyles();

  const ifAccessTokenExists = () => {
    return (
      sessionStorage.getItem(ACCESS_TOKEN) &&
      sessionStorage.getItem(ACCESS_TOKEN) !== undefined
    );
  };

  return (
    <>
      {ifAccessTokenExists() ? (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={5}>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" align="left" className={classes.title}>
                  Register your project!
                </Typography>
                <ProjectCreationForm />
              </Paper>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Redirect push to={"/login/create-project"} />
      )}
    </>
  );
};

export default ProjectCreation;
