import React from "react";
import "./App.css";
import Dashboard from "./components/pages/Dashboard";
import PageShell from "./components/organisms/PageShell";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pages from "./components/pages/Pages";
import { BrowserRouter } from "react-router-dom";
import background from "../public/images/theme.jpg";

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
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const backgroundStyle = {
  backgroundImage: `url(/images/theme.jpg)`,
  height: "100vh",
  fontSize: "50px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <PageShell>
          <BrowserRouter>
            <div style={backgroundStyle}>
              <Pages />
            </div>
          </BrowserRouter>
        </PageShell>
      </ThemeProvider>
    </div>
  );
}

export default App;
