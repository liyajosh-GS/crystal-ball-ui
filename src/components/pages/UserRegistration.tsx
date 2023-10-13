import React from "react";
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
