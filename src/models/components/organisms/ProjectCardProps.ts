export interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  projectType: string;
  targetFund: string;
  collectedFund: string;
  groupMembers: string[];
  createdTime: string;
  updateTime: string;
}

export interface ProjectCardProps {
  project: ProjectDetail;
}
