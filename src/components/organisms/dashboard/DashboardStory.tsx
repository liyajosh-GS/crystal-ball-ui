import {
  Box,
  Button,
  Container,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles, createStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
    },
    container: {
      padding: theme.spacing(2),
    },
  })
);

const DashboardStory: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const goToCreationPage = () => {
    history.push("/create-project");
  };

  const goToProjectCatalog = () => {
    history.push("/projects-catalog");
  };
  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h6" color="antiquewhite" paragraph>
            At the heart of our global crowdfunding platform lies a shared
            vision—a vision where innovation knows no boundaries. Together, we
            support the dreamers, thinkers, and creators who are driving
            positive change around the world.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={goToProjectCatalog}>
              Browse Project Catalog
            </Button>
            <Button variant="outlined" onClick={goToCreationPage}>
              Register new Project
            </Button>
          </Stack>
        </Container>
        <Container maxWidth="lg"></Container>
      </Box>
    </>
  );
};

export default DashboardStory;
