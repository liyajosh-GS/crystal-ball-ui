import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Theme,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { AuthenticationShellProps } from "../../models/components/organisms/AutheticationShellProps";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      justifyContent: "center",
      alignContent: "center",
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

const AuthenticationShell: React.FC<AuthenticationShellProps> = ({
  title,
  children,
}) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Paper elevation={3} className={classes.paper}>
            <>
              <Grid container justifyContent="center">
                <Grid>
                  <Avatar
                    sx={{ m: 1, bgcolor: "primary.light", marginLeft: "16px" }}
                  >
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {title}
                  </Typography>
                </Grid>
              </Grid>
              {children}
            </>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AuthenticationShell;
