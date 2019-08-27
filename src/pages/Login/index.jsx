import React, { useEffect, useState } from "react";
import { Col } from "antd";
import "./style.sass";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import FormLogin from "../../containers/FormLogin";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { Link } from "react-router-dom";
import strings from "../../localization/localization";
import BackgroundForm from "../../components/BackgroundForm";

export default function Login() {
  const { isAuthenticated, history } = useRootContext()

  useEffect(() => {
    if (isAuthenticated) {
      history.push(PATH_URL.HOME);
    }
  })

  return (
    <div className="mp-login-container">
      <Col md={{ span: 14 }}>
        <BackgroundForm />
      </Col>
      <Col md={{ span: 10 }}>
        <div className="mp-login-content">
          <Link to="/">
            <img
              className="mp-login-container__logo"
              src={monggopesen_logo}
              alt="login__logo"
            />
          </Link>
          <p className="mp-login-container__title">{strings.login_enter}</p>
          <FormLogin />

        </div>
      </Col>
    </div>
  );
}
