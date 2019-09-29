import React from "react";
import { Form, Checkbox } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRootContext } from "../../hoc/RootContext";
import { schema } from "./schema";
import strings from "../../localization/localization";
import { Link } from "react-router-dom";
import ButtonGoogle from "../../components/ButtonGoogle";
import ButtonFacebook from "../../components/ButtonFacebook";

export default function FormLogin(props) {
  const {
    handleLogin,
    isSubmitLoading,
    authResponse,
    translate,
    Trans
  } = useRootContext();

  let errorMessage = "";
  if(isSubmitLoading === false && authResponse.status === null) {
    errorMessage = translate('error:backend_not_connected');
  } else if(isSubmitLoading === false && authResponse.status !== null) {
      errorMessage = translate('error:auth.failed');
  }

  return (
    <div className="mp-login-container">
      <div className="mp-form-login">
        <Formik
          onSubmit={values => {
            handleLogin(values);
          }}
          validationSchema={schema}
          validateOnChange={false}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Item
                validateStatus={errors.email && "error"}
                help={
                  errors.email && translate("validation:email." + errors.email)
                }
              >
                <Input
                  placeholder={translate("common:email")}
                  name="email"
                  size="large"
                  icon="mail"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Item>
              <Form.Item
                validateStatus={errors.password && "error"}
                help={
                  errors.password && translate("validation:password." + errors.password)
                }
              >
                <Input
                  name="password"
                  type="password"
                  size="large"
                  icon="lock"
                  placeholder={translate("common:password")}
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox>{translate("login:remember_me")}</Checkbox>
                <Trans i18nKey="login:forgot_password">
                  <Link
                    className="mp-form-login__forgot"
                    to={{
                      pathname: "/forget-password"
                    }}
                  >
                    <span>string0</span>
                  </Link>
                </Trans>
                <Button
                  type="primary"
                  size="large"
                  width="full"
                  htmlType="submit"
                  disabled={isSubmitLoading}
                >
                  {translate("common:login")}
                </Button>
                <div className="mp-form-login__error-box">{errorMessage}</div>
              </Form.Item>
              <div
                type="flex"
                align="middle"
                className="mp-form-login__text-login"
              >
                <p>{translate("login:other_option")}</p>
              </div>
              <Form.Item className="mp-form-login__btn-socmed">
                <div className="mp-form-login__socmed-box">
                  <ButtonGoogle>{translate("common:google")}</ButtonGoogle>
                  <ButtonFacebook>
                    {translate("common:facebook")}
                  </ButtonFacebook>
                </div>
                <div className="mp-form-login__direct-register">
                  <Trans i18nKey="login:go_to_register">
                    <Link
                      className="link-register"
                      to={{
                        pathname: "/register"
                      }}
                    >
                      <b>string0</b>
                    </Link>{" "}
                    string1
                  </Trans>
                </div>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
