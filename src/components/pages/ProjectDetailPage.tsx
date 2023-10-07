import { ProjectDetailPageProvider } from "../../contexts/ProjectDetailPageContext";
import { ComponentProps } from "../../models/components/ComponentProps";
import ProjectDetailCard from "../organisms/projectDetails/ProjectDetailCard";

const ProjectDetailPage: React.FC<ComponentProps> = ({ componentKey }) => {
  return (
    <>
      <ProjectDetailPageProvider>
        <ProjectDetailCard componentKey={componentKey} />
      </ProjectDetailPageProvider>
    </>
  );
};

export default ProjectDetailPage;
