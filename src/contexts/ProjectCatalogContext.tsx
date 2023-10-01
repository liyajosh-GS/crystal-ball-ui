import { createContext, useContext, useState, ReactNode } from "react";
import { ProjectCatalogContextProps } from "../models/contexts/ProjectCatalogContextProps";
import useGetApiHook from "../hooks/useGetApiHook";

export const ProjectCatalogContext = createContext<
  ProjectCatalogContextProps | undefined
>(undefined);

export function ProjectCatalogProvider({ children }: { children: ReactNode }) {
  const [apis, setApis] = useState<string[]>([]);

  const { data, isApiLoading, apiError } = useGetApiHook(
    apis && apis.length > 0 ? apis[0] : ""
  );

  return (
    <ProjectCatalogContext.Provider
      value={{ data, apis, setApis, isApiLoading, apiError }}
    >
      {children}
    </ProjectCatalogContext.Provider>
  );
}

export function useProjectCatalogContext() {
  const context = useContext(ProjectCatalogContext);
  if (!context) {
    throw new Error("15 not defined");
  }
  return context;
}
