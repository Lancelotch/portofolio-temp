import React, { useEffect } from "react";
import { Col } from "antd";
import "./style.sass";
import { useRootContext } from "../../hoc/RootContext";
import FormLogin from "../../containers/FormLogin";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { Link } from "react-router-dom";
import strings from "../../localization/localization";
import BackgroundAuth from "../../components/BackgroundAuth";
import PATH_URL from "../../routers/path.js"

export default function Login(props) {
  
  const { isAuthenticated, history } = useRootContext()

  useEffect(() => {
    if (isAuthenticated) {
      const nextPage = props.location.state && 
      props.location.state.nextPage ? props.location.state.nextPage : PATH_URL.HOME
      history.push(nextPage);
    }
  })

  return (
    <div className="mp-login-container">
      <Col md={14}>
        <BackgroundAuth />
      </Col>
      <Col md={10}>
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
