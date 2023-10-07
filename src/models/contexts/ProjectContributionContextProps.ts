import { ApiConfigProps } from "./ApiContextProps";

export interface ContributionRequest {
  amount: number;
  projectId: string;
}

export interface ProjectContributionContextProps extends ApiConfigProps {
  contributionRequest: ContributionRequest[];
  setContributionRequest: (contributionRequest: ContributionRequest[]) => void;
}
