import { Grid, Theme, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import _ from "lodash";
import { useApiContext } from "../../../contexts/ApiContext";
import { ComponentProps } from "../../../models/components/ComponentProps";
import { useProjectCatalogContext } from "../../../contexts/ProjectCatalogContext";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
  })
);

const ProjectCatalog: React.FC<ComponentProps> = ({ componentKey }) => {
  const classes = useStyles();

  const { apiConfig } = useApiContext();
  const currentApis: string[] = _.get(apiConfig, componentKey);

  const { setApis, data } = useProjectCatalogContext();

  setApis(currentApis);

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="left" color="primary.dark" gutterBottom>
        Latest Projects
      </Typography>
      <Grid container spacing={4}>
        {data &&
          data.map((project) => (
            <Grid item key={project.name} xs={12} sm={6} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default ProjectCatalog;
