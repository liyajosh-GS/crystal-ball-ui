import DashboardStory from "../organisms/dashboard/DashboardStory";
import DashboardKpis from "../organisms/dashboard/DashboardKpis";

const Dashboard: React.FC = () => {
  return (
    <main data-testid="dashboard">
      <DashboardStory />
      <DashboardKpis />
    </main>
  );
};

export default Dashboard;
