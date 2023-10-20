import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularLoader() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
      data-testid="circular-loader"
    >
      <CircularProgress />
    </Box>
  );
}
