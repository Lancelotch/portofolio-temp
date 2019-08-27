import React, { useEffect, useState } from "react";
import { Col } from "antd";
import "./style.sass";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import FormLogin from "../../containers/FormLogin";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { Link } from "react-router-dom";
import strings from "../../localization/localization";

export default function Login() {
  const {isAuthenticated, history } = useRootContext()
  const [heightImageBackground, stateHeightImageBackground] = useState(0)
  
  useEffect(() => {
    updateHeightImageBackground();
  }, [])


  useEffect(() => {
    if (isAuthenticated) {
      history.push(PATH_URL.HOME);
    }
    window.addEventListener('resize', updateHeightImageBackground)
    
    return () => {
      window.removeEventListener('resize', updateHeightImageBackground)
    }
  })

  function updateHeightImageBackground() {
    let heightContent = window.document.getElementById("root").offsetHeight;
    let heightWindow = window.innerHeight;
    let height = heightWindow >= heightContent ? heightWindow : heightContent
    stateHeightImageBackground(height)
  }

  return (
    <div className="mp-login-container">
      <Col md={{ span: 14 }}>
        <div
          className="scrollable-container">
          <div className="mp-form-background" style={{ height: heightImageBackground }} />
        </div>
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
