export interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    projectType: string;
    targetFund: string;
    creators: string[];
    createdTime: string;
    updateTime: string;
  };
}
