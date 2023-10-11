import { UserInfoProps } from "./UserInfoProps";

export interface ContributionRequest extends UserInfoProps {
  amount: number;
  projectId: string;
}
