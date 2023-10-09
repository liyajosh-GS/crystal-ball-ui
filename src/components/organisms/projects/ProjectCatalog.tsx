import { Grid, Theme, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import _ from "lodash";
import { useApiContext } from "../../../contexts/ApiContext";
import useGetApiHook from "../../../hooks/useGetApiHook";
import ProjectCard from "./ProjectCard";
import { GET_PROJECTS_LIST_API } from "../../../constants/constant";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
  })
);

const ProjectCatalog: React.FC = () => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const currentApi: string = _.get(apiConfig, GET_PROJECTS_LIST_API);

  const { data, isLoading, error } = useGetApiHook(currentApi);

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="left" color="primary.dark" gutterBottom>
        Latest Projects
      </Typography>
      <Grid container spacing={4}>
        {data &&
          data.map((project: any) => (
            <Grid item key={project.name} xs={12} sm={6} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ProjectCatalog;
