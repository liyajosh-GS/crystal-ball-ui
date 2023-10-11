import { UserInfoProps } from "./UserInfoProps";

export interface ProjectCreationRequest extends UserInfoProps {
  name: string;
  description: string;
  projectType: string;
  targetFund: string;
  creators: string[];
}
