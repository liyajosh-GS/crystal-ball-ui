import { Card, CardContent, CardHeader } from "@mui/material";
import { KpiCardProps } from "../../models/components/molecules/KpiCardProps";

const KpiCard: React.FC<KpiCardProps> = ({ title, content }) => {
  return (
    <>
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </>
  );
};

export default KpiCard;
