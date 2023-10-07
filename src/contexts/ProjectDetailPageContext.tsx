import { createContext, useContext, useState, ReactNode } from "react";
import {
  ProjectDetailPageContextProps,
  ProjectDetailRequest,
} from "../models/contexts/ProjectDetailPageContextProps";
import useGetApiHook from "../hooks/useGetApiHook";

export const ProjectDetailPageContext = createContext<
  ProjectDetailPageContextProps | undefined
>(undefined);

export function ProjectDetailPageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [projectDetailRequest, setProjectDetailRequest] =
    useState<ProjectDetailRequest>({
      projectId: "",
    });
  const [apis, setApis] = useState<string[]>([]);

  const { data, isApiLoading, apiError } = useGetApiHook(
    apis && apis.length > 0 ? apis[0] : ""
  );

  return (
    <ProjectDetailPageContext.Provider
      value={{
        apiError,
        isApiLoading,
        projectDetailRequest,
        setProjectDetailRequest,
        apis,
        setApis,
        data,
      }}
    >
      {children}
    </ProjectDetailPageContext.Provider>
  );
}

export function useProjectDetailPageContext() {
  const context = useContext(ProjectDetailPageContext);
  if (!context) {
    throw new Error("15 not defined");
  }
  return context;
}
