import { CssBaseline, Theme, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { PageShellProps } from "../../models/components/pages/PageShellProps";
import { makeStyles, createStyles } from "@mui/styles";
import SnackbarComponent from "../molecules/Snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.dark,
    },
  })
);

const PageShell: React.FC<PageShellProps> = ({ children, title }) => {
  const classes = useStyles();
  return (
    <>
      {" "}
      <CssBaseline />
      <AppBar position="relative" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title} noWrap>
            Crystal Ball
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
      <SnackbarComponent />
    </>
  );
};

export default PageShell;
