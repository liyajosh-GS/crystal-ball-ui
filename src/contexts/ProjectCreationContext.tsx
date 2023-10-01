import { createContext, useContext, useState, ReactNode } from "react";
import {
  ProjectCreationContextProps,
  ProjectCreationRequest,
} from "../models/contexts/ProjectCreationContextProps";
import postData from "../models/repositories/postData";

export const ProjectCreationContext = createContext<
  ProjectCreationContextProps | undefined
>(undefined);

export function ProjectCreationProvider({ children }: { children: ReactNode }) {
  const [projectRequest, setProjectRequest] = useState<ProjectCreationRequest>({
    name: "",
    description: "",
    projectType: "",
    targetFund: "",
    creators: [],
  });
  const [isApiLoading, setIsApiLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<any>();
  const [apis, setApis] = useState<string[]>([]);

  const makeApiRequest = async () => {
    postData(apis[0], projectRequest);
  };

  //const { data, isLoading, error } = usePostApiHook(apis[0], projectRequest);

  // useEffect(() => {
  //  setKpis(data)
  // }, [data]);

  return (
    <ProjectCreationContext.Provider
      value={{
        apiError,
        isApiLoading,
        projectRequest,
        setProjectRequest,
        apis,
        setApis,
        makeApiRequest,
      }}
    >
      {children}
    </ProjectCreationContext.Provider>
  );
}

export function useProjectCreationContext() {
  const context = useContext(ProjectCreationContext);
  if (!context) {
    throw new Error("15 not defined");
  }
  return context;
}
