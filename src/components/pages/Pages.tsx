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

        <Route exact path="/projects-catalog">
          <Projects componentKey="apis.projects" />
        </Route>
      </Switch>
    </>
  );
};

export default Pages;
