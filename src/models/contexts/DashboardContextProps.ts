import { ApiConfigProps } from "./ApiContextProps";

export interface Kpi {
  title: string;
  content: string;
}

export interface DashboardContextProps extends ApiConfigProps {
  kpis: Kpi[];
  setKpis: (kpi: Kpi[]) => void;
}
