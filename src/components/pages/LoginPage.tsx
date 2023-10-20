import React from "react";
import LoginForm from "../organisms/login/LoginForm";
import AuthenticationShell from "../organisms/AuthenticationShell";

const LoginPage: React.FC = () => {
  return (
    <>
      <AuthenticationShell title="Sign in" data-testid="authentication-shell">
        <LoginForm data-testid="login-form" />
      </AuthenticationShell>
    </>
  );
};

export default LoginPage;
