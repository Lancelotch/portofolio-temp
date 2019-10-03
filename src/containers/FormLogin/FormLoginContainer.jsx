import React from "react";
import { useRootContext } from "../../hoc/RootContext";
import FormLogin from "./index";

export default function FormLoginContainer(props) {
  const {
    handleLogin,
    isSubmitLoading,
    authResponse,
  } = useRootContext();

  return (
    <FormLogin 
    handleLogin={handleLogin}
    isSubmitLoading={isSubmitLoading}
    authResponse={authResponse}
    />
  );
}
