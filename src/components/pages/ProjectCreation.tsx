import {
  Box,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Theme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import ProjectCreationForm from "../organisms/projectCreation/ProjectCreationForm";
import AccountDetailsForm from "../organisms/projectCreation/AccountDetailsForm";

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

  const steps = ["Register your Project", "Bank Info"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [sharedResource, setSharedResource] = React.useState<{
    [key: string]: string;
  }>({});

  const moveForward = () => {
    console.log(" moving ");
    setActiveStep(activeStep + 1);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <ProjectCreationForm
            onSuccessCallback={moveForward}
            sharedResources={sharedResource}
            setSharedResources={setSharedResource}
          />
        );
      case 1:
        return (
          <AccountDetailsForm
            onSuccessCallback={moveForward}
            sharedResources={sharedResource}
            setSharedResources={setSharedResource}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <Grid container>
        <Container>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Grid item xs={10} justifyContent="center">
              <Paper elevation={3} className={classes.paper}>
                <Stepper
                  activeStep={activeStep}
                  sx={{ pt: 3, pb: 5 }}
                  alternativeLabel
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
              </Paper>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </>
  );
};

export default ProjectCreation;
