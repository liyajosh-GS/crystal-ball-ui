import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.dark,
    },
  })
);

const ProjectCreation: React.FC = () => {
  const classes = useStyles();
  return <>view all project</>;
};

export default ProjectCreation;
