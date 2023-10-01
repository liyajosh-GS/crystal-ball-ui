import { CssBaseline, Theme, Toolbar, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import { PageShellProps } from "../../models/components/pages/PageShellProps";
import { makeStyles, createStyles } from "@mui/styles";
import Dashboard from "./Dashboard";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ProjectCreation from "./ProjectCreation";
import Projects from "./Projects";

const Pages: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Dashboard componentKey="apis.dashboard" />
        </Route>
        <Route exact path="/createProject">
          <ProjectCreation componentKey="apis.projectCreation" />
        </Route>

        <Route exact path="/projects">
          <Projects />
        </Route>
      </Switch>
    </>
  );
};

export default Pages;
