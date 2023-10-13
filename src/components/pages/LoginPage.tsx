import React from "react";
import LoginForm from "../organisms/login/LoginForm";
import AuthenticationShell from "../organisms/AuthenticationShell";

const LoginPage: React.FC = () => {
  return (
    <>
      <AuthenticationShell title="Sign in">
        <LoginForm />
      </AuthenticationShell>
    </>
  );
};

export default LoginPage;
