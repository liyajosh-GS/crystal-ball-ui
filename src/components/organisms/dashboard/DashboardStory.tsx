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
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      display: "flex",
      flexDirection: "column",
      alignItems: "baseline",
      justifyContent: "center",
      height: "100vh",
    },
    container: {
      textAlign: "center",
    },
    button: {
      marginRight: theme.spacing(4),
      marginTop: theme.spacing(2),
    },
    text: {
      marginTop: theme.spacing(4),
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
          <AllInclusiveIcon
            fontSize="large"
            sx={{ transform: "scale(5)", color: "antiquewhite" }}
          />
          <div className={classes.text}>
            <Typography variant="h5" color="antiquewhite" paragraph>
              At the heart of our global crowdfunding platform lies a shared
              vision—a vision where innovation knows no boundaries. Together, we
              support the dreamers, thinkers, and creators who are driving
              positive change around the world.
            </Typography>
          </div>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained" onClick={goToProjectCatalog}>
              Browse Project Catalog
            </Button>
            <Button variant="contained" onClick={goToCreationPage}>
              Register new Project
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default DashboardStory;
