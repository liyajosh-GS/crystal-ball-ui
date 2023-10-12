import "./App.css";
import PageShell from "./components/organisms/PageShell";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pages from "./components/pages/Pages";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3b95ef",
      main: "#0A7BEB",
      dark: "#0756a4",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#829baf",
      dark: "#ba000d",
      contrastText: "#000",
    },
    success: {
      main: "#388e3c",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const backgroundStyle = {
  backgroundImage: `url(/images/theme.jpg)`,
  fontSize: "40px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  height: "120vh",
};

function App() {
  return (
    <div style={backgroundStyle}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <PageShell>
            <div>
              <Pages />
            </div>
          </PageShell>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
