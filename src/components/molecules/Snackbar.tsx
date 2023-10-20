import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useApiContext } from "../../contexts/ApiContext";

function SnackbarComponent() {
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
      data-testid="snackbar"
    >
      <Alert
        onClose={handleClose}
        severity={apiResponseType}
        sx={{ width: "100%" }}
        data-testid="alert"
      >
        {apiResponseMessage}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;
