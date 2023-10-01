import { createContext, useContext, useState, ReactNode } from "react";
import {
  DashboardContextProps,
  Kpi,
} from "../models/contexts/DashboardContextProps";

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [isApiLoading, setIsApiLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<any>();
  const [apis, setApis] = useState<string[]>([]);
  //const { data, isLoading, error } = useGetApiHook(apis[0]);

  // useEffect(() => {
  //  setKpis(data)
  // }, [data]);

  return (
    <DashboardContext.Provider
      value={{ kpis, setKpis, isApiLoading, apiError, apis, setApis }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("12 not defined");
  }
  return context;
}
