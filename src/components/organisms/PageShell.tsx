import {
  Box,
  Button,
  CssBaseline,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { PageShellProps } from "../../models/components/organisms/PageShellProps";
import { makeStyles, createStyles } from "@mui/styles";
import SnackbarComponent from "../molecules/Snackbar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.dark,
      flexGrow: 1,
    },
  })
);

const PageShell: React.FC<PageShellProps> = ({ children }) => {
  const classes = useStyles();

  const history = useHistory();

  const goToLogin = () => {
    history.push("/login");
  };

  const gotToRegister = () => {
    history.push("/registration");
  };

  return (
    <>
      {" "}
      <Box flexGrow={1}>
        <CssBaseline />
        <AppBar position="relative" sx={{ bgcolor: "white" }}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Crystal Ball
            </Typography>

            <Button variant="outlined" onClick={goToLogin}>
              Sign in
            </Button>
            <Button
              sx={{ marginLeft: "24px" }}
              variant="contained"
              onClick={gotToRegister}
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
      <SnackbarComponent />
    </>
  );
};

export default PageShell;
