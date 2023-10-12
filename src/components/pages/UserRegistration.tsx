import { Box, Container, CssBaseline, Grid, Paper, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { LoginFormProps } from "../../models/components/organisms/LoginFormProps";
import LoginForm from "../organisms/login/LoginForm";
import AuthenticationShell from "../organisms/AuthenticationShell";
import RegistrationForm from "../organisms/register/RegistrationForm";

const UserRegistration: React.FC = () => {
  return (
    <>
      <AuthenticationShell title="Register">
        <RegistrationForm />
      </AuthenticationShell>
    </>
  );
};

export default UserRegistration;
