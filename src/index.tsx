import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import { ApiProvider } from "./contexts/ApiContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId="1051874624760-t5od2qfid4euev455idjijqs57mfs225.apps.googleusercontent.com">
    <React.StrictMode>
      <AppProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </AppProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
