import { Box, Button, Grid, TextField, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import React, { ChangeEvent, useState } from "react";
import {
  ACCESS_TOKEN,
  CREATE_PROJECT_API_KEY,
} from "../../../constants/constant";
import { useApiContext } from "../../../contexts/ApiContext";
import { ProjectCreationRequest } from "../../../models/repositories/ProjectCreationRequestProps";
import postData from "../../../repositories/postData";
import SingleSelect from "../../atoms/SingleSelect";
import DynamicTextFieldForm from "../../molecules/DynamicTextField";
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

const ProjectCreationForm: React.FC<StepperControlProps> = ({
  onSuccessCallback,
  setSharedResources,
}) => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const currentApi: string = _.get(apiConfig, CREATE_PROJECT_API_KEY);
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
            onSuccessCallback();
            setSharedResources({ projectId: response.data.id });
            // history.push(PROJECT_CATALOG_PAGE_ROUTE);
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
        Register your project!
      </Typography> */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Project Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "name"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "description"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="targetFund"
            name="targetFund"
            label="Amount required"
            fullWidth
            autoComplete="targetFund"
            variant="standard"
            onChange={(event) =>
              handleOnChangeInputElement(
                event as ChangeEvent<HTMLInputElement>,
                "targetFund"
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <SingleSelect
            label={"Project Type"}
            dropdownOptions={dropdownOptions}
            onChange={(value) => handleOnChangeForProjectType(value)}
          />
        </Grid>
        <Grid item xs={12}>
          <DynamicTextFieldForm
            label="Group Member(s)"
            onChange={handleOnChangeForCreators}
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
          Register Project
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ProjectCreationForm;
