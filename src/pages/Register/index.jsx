import React, { useEffect } from "react";
import { Icon, Form,  Typography } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import { schema } from "./schema";
import strings from "../../localization/localization";
import monggopesen_logo from "../../assets/img/logo_monggopesen/logo_monggopesen_orange_large.png";
import { Link } from "react-router-dom";
import ButtonGoogle from "../../components/ButtonGoogle";
import ButtonFacebook from "../../components/ButtonFacebook";
import BackgroundWrapper from "../../components/BackgroundWrapper";

const { Text } = Typography

function Register() {
  const {
    handleRegister,
    isSubmitting,
    isAuthenticated,
    history,
    authBody
  } = useRootContext();

  useEffect(() => {
    if (isAuthenticated) {
      history.push(PATH_URL.HOME);
    }
  });

  let messageError = authBody.response && authBody.response.data.message


  return (
    <div className="mp-register">
      <Link to={PATH_URL.HOME}>
        <div className="mp-register__logo">
          <img
            src={monggopesen_logo}
            alt="login__logo"
          />
        </div>
      </Link>
      <p className="mp-register__title">{strings.register_now}</p>
      <BackgroundWrapper>
        <div className="mp-register__form">
          <Formik
            onSubmit={values => {
              handleRegister(values);
            }}
            validationSchema={schema}
            validateOnChange={false}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Item
                    validateStatus={errors.name && "error"}
                    help={errors.name}
                  >
                    <Input
                      placeholder="Nama"
                      name="name"
                      size="large"
                      prefix={
                        <Icon
                          type="user"
                          style={{
                            color: "rgba(0,0,0,.25)",
                            fontSize: "15.64px"
                          }}
                        />
                      }
                      onChange={handleChange}
                      value={values.name}
                      maxLength={30}
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={errors.email && "error"}
                    help={errors.email}
                  >
                    <Input
                      placeholder="Email"
                      name="email"
                      size="large"
                      prefix={
                        <Icon
                          type="mail"
                          style={{
                            color: "rgba(0,0,0,.25)",
                            fontSize: "15.64px"
                          }}
                        />
                      }
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={errors.password && "error"}
                    help={errors.password}
                  >
                    <Input
                      name="password"
                      size="large"
                      prefix="lock"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                    />
                  </Form.Item>
                  <div className="mp-register__note">
                    {strings.formatString(
                      strings.register_agree,
                      <a className="mp-register__link" href="/">
                        {strings.register_policy}
                      </a>,
                      <a className="mp-register__link" href="/">
                        {strings.register_requirement}
                      </a>
                    )}
                  </div>
                  {authBody.response &&
                    <div className="mp-register__allert-message">
                      <Text type="danger">
                        {messageError}
                      </Text>
                    </div>
                  }
                  <Button
                    type="primary"
                    size="large"
                    width="full"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    {strings.login_register}
                  </Button>
                  <div
                    type="flex"
                    align="middle"
                    className="mp-register__option-text"
                  >
                    <span>{strings.register_option}</span>
                  </div>
                  <Form.Item className="mp-register__btn-socmed">
                    <div className="mp-register__socmed-box">
                      <ButtonGoogle>
                        {strings.google}
                      </ButtonGoogle>
                      <ButtonFacebook>
                        {strings.facebook}
                      </ButtonFacebook>
                    </div>
                    <div className="mp-register__direct-login">
                      {strings.formatString(
                        strings.register_quote,
                        <Link
                          to={{
                            pathname: "/login"
                          }}
                          style={{ color: "#F63700" }}
                        >
                          <span className="mp-register__link-login">
                            {strings.register_login}
                          </span>
                        </Link>
                      )}
                    </div>
                  </Form.Item>
                </Form>
              )}
          </Formik>
        </div>
      </BackgroundWrapper>
    </div>
  );
}

export default Register;
