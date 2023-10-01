import { ApiConfigProps } from "./ApiContextProps";

export interface ProjectCreationRequest {
  name: string;
  description: string;
  projectType: string;
  targetFund: string;
  creators: string[];
}

export interface ProjectCreationContextProps extends ApiConfigProps {
  projectRequest: ProjectCreationRequest;
  setProjectRequest: (projectRequest: ProjectCreationRequest) => void;
}
