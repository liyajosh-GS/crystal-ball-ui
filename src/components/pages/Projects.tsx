import ProjectCatalogStory from "../organisms/projects/ProjectCatalogStory";
import { ProjectCatalogProvider } from "../../contexts/ProjectCatalogContext";
import ProjectCatalog from "../organisms/projects/ProjectCatalog";
import { ComponentProps } from "../../models/components/ComponentProps";

const Projects: React.FC<ComponentProps> = ({ componentKey }) => {
  return (
    <>
      <ProjectCatalogProvider>
        <ProjectCatalogStory />
        <ProjectCatalog componentKey={componentKey + ".projectCatalog"} />
      </ProjectCatalogProvider>
    </>
  );
};

export default Projects;
