import { Alert, Snackbar, SnackbarContent, Theme } from "@mui/material";
import React, { useContext } from "react";
import { ApiContext, useApiContext } from "../../contexts/ApiContext";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function SnackbarComponent() {
  const classes = useStyles();
  const { apiResponseMessage, apiResponseType, showSnackBar, setShowSnackBar } =
    useApiContext();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackBar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={showSnackBar}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={apiResponseType}
        sx={{ width: "100%" }}
      >
        {apiResponseMessage}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;
