import { Box, Button, Grid, TextField, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ACCESS_TOKEN,
  CREATE_PROJECT_API_KEY,
  PROJECT_CATALOG_PAGE_ROUTE,
  USER_ID,
} from "../../../constants/constant";
import { useApiContext } from "../../../contexts/ApiContext";
import { ProjectCreationRequest } from "../../../models/repositories/ProjectCreationRequestProps";
import postData from "../../../repositories/postData";
import SingleSelect from "../../atoms/SingleSelect";
import DynamicTextFieldForm from "../../molecules/DynamicTextField";

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

const dropdownOptions = [
  {
    label: "Software",
    value: "SOFTWARE",
  },
  {
    label: "GreenTechnology",
    value: "GREEN_TECHNOLOGY",
  },
  {
    label: "Medical",
    value: "MEDICAL",
  },
];

const AccountDetailsForm: React.FC = () => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const currentApi: string = _.get(apiConfig, CREATE_PROJECT_API_KEY);
  const history = useHistory();
  const { setShowSnackBar, setApiResponseType, setApiResponseMessage } =
    useApiContext();

  const [projectRequest, setProjectRequest] = useState<ProjectCreationRequest>({
    name: "",
    description: "",
    projectType: "",
    targetFund: "",
    groupMembers: [],
  });

  const handleOnChangeInputElement = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    let request = { ...projectRequest };
    request = { ...request, [key]: event.target.value };
    setProjectRequest(request);
  };

  const handleOnChangeForProjectType = (value: string) => {
    let request = { ...projectRequest };
    request = { ...request, projectType: value };
    setProjectRequest(request);
  };

  const handleOnChangeForCreators = (value: string[]) => {
    let request = { ...projectRequest };
    request = { ...request, groupMembers: value };
    setProjectRequest(request);
  };

  const makeApiRequest = async () => {
    if (currentApi?.length > 0) {
      let request = {
        ...projectRequest,
      };
      postData(currentApi, request, sessionStorage.getItem(ACCESS_TOKEN)).then(
        (response) => {
          if (response.error === null) {
            history.push(PROJECT_CATALOG_PAGE_ROUTE);
          } else {
            setApiResponseMessage("Could not create project try again");
            setApiResponseType("error");
            setShowSnackBar(true);
          }
        }
      );
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
            id="account"
            name="account"
            label="Bank Account Number"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "account"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="re-account"
            name="re-account"
            label="Re-enter Account Number"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "re-account"
              )
            }
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
                "accountHolderName"
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
