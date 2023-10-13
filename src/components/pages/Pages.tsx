import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import ProjectCreation from "./ProjectCreation";
import {
  CREATE_PAGE_ROUTE,
  PROJECT_CATALOG_PAGE_ROUTE,
} from "../../constants/constant";
import Dashboard from "./Dashboard";
import CircularLoader from "../atoms/CircularLoader";

const Projects = lazy(() => import("./Projects"));
const ProjectDetailPage = lazy(() => import("./ProjectDetailPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const UserRegistration = lazy(() => import("./UserRegistration"));
const ProtectedRoute = lazy(() => import("../organisms/ProtectedPageRoute"));

const Pages: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Dashboard />
        </Route>
        <Route exact path={PROJECT_CATALOG_PAGE_ROUTE}>
          <Suspense fallback={<CircularLoader />}>
            <Projects />
          </Suspense>
        </Route>
        <Route path="/projects-detail-page/:projectId">
          <Suspense fallback={<CircularLoader />}>
            <ProjectDetailPage />
          </Suspense>
        </Route>
        <Route exact path={"/login"}>
          <Suspense fallback={<CircularLoader />}>
            <LoginPage />
          </Suspense>
        </Route>
        <Route exact path={"/registration"}>
          <Suspense fallback={<CircularLoader />}>
            <UserRegistration />
          </Suspense>
        </Route>
        <Route path={CREATE_PAGE_ROUTE}>
          <Suspense fallback={<CircularLoader />}>
            <ProtectedRoute
              children={<ProjectCreation />}
              redirectBackUrl={CREATE_PAGE_ROUTE}
            />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
};

export default Pages;
