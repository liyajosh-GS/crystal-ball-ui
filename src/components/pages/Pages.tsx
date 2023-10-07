import Dashboard from "./Dashboard";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ProjectCreation from "./ProjectCreation";
import Projects from "./Projects";
import ProjectDetailPage from "./ProjectDetailPage";

const Pages: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Dashboard componentKey="apis.dashboard" />
        </Route>
        <Route exact path="/create-project">
          <ProjectCreation componentKey="apis.projectCreation" />
        </Route>
        <Route exact path="/projects-catalog">
          <Projects componentKey="apis.projects" />
        </Route>
        <Route exact path="/projects-detail-page/:projectId">
          <ProjectDetailPage componentKey="apis.projectDetailPage" />
        </Route>
      </Switch>
    </>
  );
};

export default Pages;
