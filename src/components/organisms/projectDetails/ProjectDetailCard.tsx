import {
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Theme,
  Typography,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useApiContext } from "../../../contexts/ApiContext";
import SingleSelect from "../../atoms/SingleSelect";

import { useParams } from "react-router-dom";
import { ProjectCardProps } from "../../../models/components/organisms/ProjectCardProps";
import fetchData from "../../../repositories/fetchData";
import DisplayAndEditText from "../../atoms/DisplayAndEditTextField";
import ContributionForm from "./ContributionForm";
import { GET_PROJECT_DETAIL } from "../../../constants/constant";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
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

const ProjectDetailCard: React.FC = () => {
  const classes = useStyles();
  const { projectId } = useParams<{ projectId: string }>();

  const { apiConfig } = useApiContext();
  const currentApi: string = _.get(apiConfig, GET_PROJECT_DETAIL);

  const [project, setProject] = useState<ProjectCardProps | null>();

  useEffect(() => {
    if (currentApi?.length > 0) {
      fetchData(currentApi + projectId)
        .then((response) => setProject({ project: response.data }))
        .catch((err) => setProject(null));
    }
  }, [projectId]);

  const handleOnChangeInputElement = (event: string, key: string) => {};

  const renderProjectDetails = (project: ProjectCardProps | undefined) => {
    const detail = project?.project;
    console.log("detail " + JSON.stringify(detail));
    return (
      <Container maxWidth="lg" className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            title={detail?.name}
            action={<ContributionForm projectId={projectId} />}
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
                  Group Members
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <DisplayAndEditText
                  id="groupMembers"
                  name="groupMembers"
                  value={detail?.groupMembers.join()}
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
