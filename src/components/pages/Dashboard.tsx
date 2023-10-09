import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import DashboardStory from "../organisms/dashboard/DashboardStory";
import DashboardKpis from "../organisms/dashboard/DashboardKpis";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Dashboard: React.FC = () => {
  return (
    <main>
      <DashboardStory />
      <DashboardKpis />
    </main>

    // <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
    //   <Typography variant="h6" align="center" gutterBottom>
    //     Footer
    //   </Typography>
    //   <Typography
    //     variant="subtitle1"
    //     align="center"
    //     color="text.secondary"
    //     component="p"
    //   >
    //     Something here to give the footer a purpose!
    //   </Typography>
    //   <Copyright />
    // </Box>
    //{/* End footer */}
  );
};

export default Dashboard;
