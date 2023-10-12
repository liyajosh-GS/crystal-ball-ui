import Dashboard from "./Dashboard";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ProjectCreation from "./ProjectCreation";
import Projects from "./Projects";
import ProjectDetailPage from "./ProjectDetailPage";
import LoginPage from "./LoginPage";
import {
  CREATE_PAGE_ROUTE,
  PROJECT_CATALOG_PAGE_ROUTE,
} from "../../constants/constant";
import UserRegistration from "./UserRegistration";
import ProtectedRoute from "../organisms/ProtectedPageRoute";

const Pages: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Dashboard />
        </Route>
        <Route exact path={PROJECT_CATALOG_PAGE_ROUTE}>
          <Projects />
        </Route>
        <Route path="/projects-detail-page/:projectId">
          <ProjectDetailPage />
        </Route>
        <Route exact path={"/login"}>
          <LoginPage />
        </Route>
        <Route exact path={"/registration"}>
          <UserRegistration />
        </Route>
        <Route path={CREATE_PAGE_ROUTE}>
          <ProtectedRoute
            children={<ProjectCreation />}
            redirectBackUrl={CREATE_PAGE_ROUTE}
          />
        </Route>
      </Switch>
    </>
  );
};

export default Pages;
