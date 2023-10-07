import {
  Theme,
  Grid,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Divider,
} from "@mui/material";
import _ from "lodash";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useApiContext } from "../../../contexts/ApiContext";
import { useProjectCreationContext } from "../../../contexts/ProjectCreationContext";
import SingleSelect from "../../atoms/SingleSelect";
import { makeStyles, createStyles } from "@mui/styles";
import { ComponentProps } from "../../../models/components/ComponentProps";
import DynamicTextFieldForm from "../../molecules/DynamicTextField";
import {
  ProjectCardProps,
  ProjectDetail,
} from "../../../models/components/organisms/ProjectCardProps";
import fetchData from "../../../models/repositories/fetchData";
import { useParams } from "react-router-dom";
import DisplayAndEditText from "../../atoms/DisplayAndEditTextField";
import postData from "../../../models/repositories/postData";
import ContributionForm from "./ContributionForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },

    // card: {
    //   maxWidth: 400,
    //   margin: "auto",
    //   marginTop: theme.spacing(2),
    //   boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    //   borderRadius: "12px",
    // },
    // header: {
    //   backgroundColor: theme.palette.primary.main,
    //   color: "#fff",
    //   padding: theme.spacing(2),
    //   textAlign: "center",
    // },
    // content: {
    //   padding: theme.spacing(2),
    // },
    card: {
      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      height: "100%",
      padding: theme.spacing(0, 4, 4, 4),
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      padding: theme.spacing(2),
    },
    content: {
      justifyContent: "left",
      padding: theme.spacing(2),
    },
    container: {
      padding: theme.spacing(4),
    },
    title: {
      fontSize: "32px",
      color: theme.palette.primary.dark,
    },
  })
);

const detailtoTextMapping = {
  name: "Name",
  description: "Decsription",
  projectType: "Project Type",
  targetFund: "Fund requested",
  collectedFund: "Fund Raised",
  creators: "Created by",
  createdTime: "Created on",
};

const ProjectDetailCard: React.FC<ComponentProps> = ({ componentKey }) => {
  const classes = useStyles();
  const { projectId } = useParams<{ projectId: string }>();

  const { apiConfig } = useApiContext();
  const currentApis: string[] = _.get(apiConfig, componentKey + ".project");

  const [project, setProject] = useState<ProjectCardProps | null>();

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

  useEffect(() => {
    if (currentApis?.length > 0) {
      fetchData(currentApis[0] + projectId)
        .then((response) => setProject({ project: response.data }))
        .catch((err) => setProject(null));
    }
  }, [currentApis]);

  const handleOnChangeInputElement = (event: string, key: string) => {};

  const getProjectDetails = (
    projectData: ProjectDetail
  ): { name: string; value: string }[] => {
    const projectArray = Object.entries(projectData).map(([name, value]) => ({
      name,
      value,
    }));
    return projectArray;
  };

  const renderProjectDetails = (project: ProjectCardProps | undefined) => {
    const detail = project?.project;
    console.log("detail " + JSON.stringify(detail));
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            title={detail?.name}
            action={
              <ContributionForm
                componentKey={componentKey}
                projectId={projectId}
              />
            }
            classes={{
              title: classes.title,
            }}
          />
          <Divider />
          <Grid container>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  color="primary.light"
                  display="inline"
                >
                  Description
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <DisplayAndEditText
                  id="description"
                  name="description"
                  value={detail?.description}
                  disabled={true}
                  onChange={(value) =>
                    handleOnChangeInputElement(value, "description")
                  }
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  color="primary.light"
                  display="inline"
                >
                  Fund Requested
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <DisplayAndEditText
                  id="targetFund"
                  name="targetFund"
                  value={detail?.targetFund}
                  disabled={true}
                  onChange={(value) =>
                    handleOnChangeInputElement(value, "targetFund")
                  }
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  color="primary.light"
                  display="inline"
                >
                  Fund Raised
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <DisplayAndEditText
                  id="collectedFund"
                  name="collectedFund"
                  value={detail?.collectedFund}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  color="primary.light"
                  display="inline"
                >
                  Project Type
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <SingleSelect
                  dropdownOptions={dropdownOptions}
                  defaultValue={detail?.projectType}
                  onChange={(value) => console.log(value)}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  color="primary.light"
                  display="inline"
                >
                  Creators
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <DisplayAndEditText
                  id="creators"
                  name="creators"
                  value={detail?.creators.join()}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  color="primary.light"
                  display="inline"
                >
                  Created On
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <DisplayAndEditText
                  id="createdTime"
                  name="createdTime"
                  value={detail?.createdTime}
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    );
  };

  return (
    <div className={classes.root}>
      {project !== null ? renderProjectDetails(project) : `no project`}
    </div>
  );
};

export default ProjectDetailCard;
