import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { ProjectCardProps } from "../../../models/components/organisms/ProjectCardProps";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectType: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.spacing(1),
    },
    collectedFund: {
      //borderBottom: "8px solid green",
      color: "green",
    },
  })
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const classes = useStyles();
  const history = useHistory();

  const goToProjectDetailPage = () => {
    history.push(`/projects-detail-page/${project.id}`);
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        borderRadius: "16px",
      }}
    >
      <Typography
        sx={{ fontSize: 14 }}
        color="white"
        gutterBottom
        textAlign={"left"}
        className={classes.projectType}
      >
        {`Project Type: ${project.projectType}`}
      </Typography>
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {project.description}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Fund Requested: ${project.targetFund}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight={900}
            className={classes.collectedFund}
          >
            Fund Collected: ${project.collectedFund}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={goToProjectDetailPage}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
