export interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  projectType: string;
  targetFund: string;
  collectedFund: string;
  creators: string[];
  createdTime: string;
  updateTime: string;
}

export interface ProjectCardProps {
  project: ProjectDetail;
}
