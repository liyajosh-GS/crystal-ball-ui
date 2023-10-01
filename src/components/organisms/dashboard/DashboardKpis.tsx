import { useDashboardContext } from "../../../contexts/DashboardContext";
import { ComponentProps } from "../../../models/components/ComponentProps";
import { useApiContext } from "../../../contexts/ApiContext";
import _ from "lodash";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const DashboardKpis: React.FC<ComponentProps> = ({ componentKey }) => {
  const { apiConfig } = useApiContext();
  const currentApis: string | string[] = _.get(apiConfig, componentKey);

  const { kpis, setApis } = useDashboardContext();
  //setApis(currentApis)

  return <></>;
};

export default DashboardKpis;
