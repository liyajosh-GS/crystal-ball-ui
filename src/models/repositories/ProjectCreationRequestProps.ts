export interface ProjectCreationRequest {
  name: string;
  description: string;
  projectType: string;
  targetFund: string;
  groupMembers: string[];
}
