import { Theme, Grid, TextField, Button, Box } from "@mui/material";
import _ from "lodash";
import React, { ChangeEvent } from "react";
import { useApiContext } from "../../../contexts/ApiContext";
import { useProjectCreationContext } from "../../../contexts/ProjectCreationContext";
import SingleSelect from "../../atoms/SingleSelect";
import { makeStyles, createStyles } from "@mui/styles";
import { ComponentProps } from "../../../models/components/ComponentProps";
import DynamicTextFieldForm from "../../molecules/DynamicTextField";
import { useAppContext } from "../../../contexts/AppContext";
import { ProjectCreationRequest } from "../../../models/contexts/ProjectCreationContextProps";
import postData from "../../../models/repositories/postData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
    button: {
      backgroundColor: theme.palette.primary.light,
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

const ProjectCreationForm: React.FC<ComponentProps> = ({ componentKey }) => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const currentApis: string[] = _.get(apiConfig, componentKey);
  const { user, setUser } = useAppContext();

  const { setProjectRequest, setApis, projectRequest } =
    useProjectCreationContext();

  setApis(currentApis);

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
    request = { ...request, creators: value };
    setProjectRequest(request);
  };

  const makeApiRequest = async () => {
    if (currentApis?.length > 0) {
      //et request: ProjectCreationRequest =
      postData(currentApis[0], projectRequest, user.access_token);
    }
  };

  return (
    <React.Fragment>
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
            label="Project Creator"
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
          Create Project
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default ProjectCreationForm;
