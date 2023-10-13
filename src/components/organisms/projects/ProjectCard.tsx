import { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import { ProjectCardProps } from "../../../models/components/organisms/ProjectCardProps";
import {
  ACCESS_TOKEN,
  LOGIN_PAGE,
  PROJECT_DETAIL_PAGE_ROUTE,
} from "../../../constants/constant";
import { useAppContext } from "../../../contexts/AppContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectType: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
      borderRadius: theme.spacing(1),
    },
    collectedFund: {
      color: "green",
    },
  })
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const classes = useStyles();
  const history = useHistory();
  const { setRedirectBackTo } = useAppContext();

  const goToProjectDetailPage = () => {
    if (
      sessionStorage.getItem(ACCESS_TOKEN) &&
      sessionStorage.getItem(ACCESS_TOKEN) !== undefined
    ) {
      history.push(`${PROJECT_DETAIL_PAGE_ROUTE}${project.id}`);
    } else {
      setRedirectBackTo(`${PROJECT_DETAIL_PAGE_ROUTE}${project.id}`);
      history.push(`${LOGIN_PAGE}`);
    }
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
