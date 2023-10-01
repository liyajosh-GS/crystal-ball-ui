import { Grid, Paper, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import React from "react";
import { ComponentProps } from "../../models/components/ComponentProps";
import { ProjectCreationProvider } from "../../contexts/ProjectCreationContext";
import ProjectCreationForm from "../organisms/projectCreation/ProjectCreationForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
    title: {
      color: theme.palette.primary.dark,
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

const ProjectCreation: React.FC<ComponentProps> = ({ componentKey }) => {
  const classes = useStyles();

  return (
    <ProjectCreationProvider>
      <div className={classes.container}>
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
