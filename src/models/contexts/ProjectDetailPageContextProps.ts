import { ApiConfigProps } from "./ApiContextProps";

export interface ProjectDetailRequest {
  projectId: string;
}

export interface ProjectDetailPageContextProps extends ApiConfigProps {
  data: any;
  projectDetailRequest: ProjectDetailRequest;
  setProjectDetailRequest: (projectDetailRequest: ProjectDetailRequest) => void;
}
