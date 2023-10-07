import { createContext, useContext, useState, ReactNode } from "react";
import postData from "../models/repositories/postData";
import {
  ProjectContributionContextProps,
  ContributionRequest,
} from "../models/contexts/ProjectContributionContextProps";

export const ProjectContributionContext = createContext<
  ProjectContributionContextProps | undefined
>(undefined);

export function ProjectDetailPageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contributionRequest, setContributionRequest] = useState<
    ContributionRequest[]
  >([]);
  const [isApiLoading, setIsApiLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<any>();
  const [apis, setApis] = useState<string[]>([]);

  const makeApiRequest = async () => {
    postData(apis[0], contributionRequest);
  };

  return (
    <ProjectContributionContext.Provider
      value={{
        apiError,
        isApiLoading,
        contributionRequest,
        setContributionRequest,
        apis,
        setApis,
        makeApiRequest,
      }}
    >
      {children}
    </ProjectContributionContext.Provider>
  );
}

export function useProjectContributionContext() {
  const context = useContext(ProjectContributionContext);
  if (!context) {
    throw new Error("15 not defined");
  }
  return context;
}
