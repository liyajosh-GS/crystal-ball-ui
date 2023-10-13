import { Box, Button, Grid, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ACCESS_TOKEN,
  BANK_API_KEY,
  PROJECT_CATALOG_PAGE_ROUTE,
} from "../../../constants/constant";
import { useApiContext } from "../../../contexts/ApiContext";
import { BankDetailRequest } from "../../../models/repositories/ProjectCreationRequestProps";
import postData from "../../../repositories/postData";
import { StepperControlProps } from "../../../models/components/organisms/StepperControlProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
    button: {
      backgroundColor: theme.palette.primary.light,
    },
    title: {
      color: "white",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.spacing(1),
    },
  })
);

const AccountDetailsForm: React.FC<StepperControlProps> = ({
  sharedResources,
}) => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const currentApi: string = _.get(apiConfig, BANK_API_KEY);
  const history = useHistory();
  const { setShowSnackBar, setApiResponseType, setApiResponseMessage } =
    useApiContext();

  const [bankDetailsRequest, setBankDetailsRequest] =
    useState<BankDetailRequest>({
      accountHolder: "",
      accountNumber: "",
      code: "",
      projectId: sharedResources.projectId,
    });
  const [isError, setIsError] = useState<boolean>(false);

  const handleOnChangeInputElement = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    let request = { ...bankDetailsRequest };
    request = { ...request, [key]: event.target.value };
    setBankDetailsRequest(request);
  };

  const makeApiRequest = async () => {
    if (currentApi?.length > 0) {
      let request = {
        ...bankDetailsRequest,
      };
      postData(currentApi, request, sessionStorage.getItem(ACCESS_TOKEN)).then(
        (response) => {
          if (response.error === null) {
            history.push(PROJECT_CATALOG_PAGE_ROUTE);
          } else {
            setApiResponseMessage("Could not save bank details, try again");
            setApiResponseType("error");
            setShowSnackBar(true);
          }
        }
      );
    }
  };

  const validateReEntered = (value: string) => {
    let accountNumber = bankDetailsRequest.accountNumber;
    if (value !== accountNumber) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <React.Fragment>
      {/* <Typography variant="h5" align="left" className={classes.title}>
        Add Bank Details
      </Typography> */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <TextField
            required
            id="accountNumber"
            name="accountNumber"
            label="Bank Account Number"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "accountNumber"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={isError}
            id="re-account"
            name="re-account"
            label="Re-enter Account Number"
            fullWidth
            type="password"
            variant="outlined"
            helperText={isError && "Numbers do not match"}
            onBlur={(event) => validateReEntered(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="code"
            name="code"
            label="Bank IFSC Code"
            fullWidth
            variant="outlined"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "code"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="accountHolderName"
            name="accountHolderName"
            label="Account Holder's Name"
            fullWidth
            variant="outlined"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "accountHolder"
              )
            }
          />
        </Grid>
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", padding: "24px" }}
      >
        <Button
          className={classes.button}
          variant="contained"
          onClick={makeApiRequest}
        >
          Save Bank Info
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default AccountDetailsForm;
