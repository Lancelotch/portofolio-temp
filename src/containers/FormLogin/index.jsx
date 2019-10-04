import React from "react";
import { Form, Checkbox } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { schema } from "./schema";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import "./style.sass";

export default function FormLogin(props) {
  const { t } = useTranslation();

  let errorMessage = "";
  if(props.isSubmitLoading === false && props.authResponse.status === null) {
    errorMessage = t('error:backend_not_connected');
  } else if(props.isSubmitLoading === false && props.authResponse.status !== 200) {
      errorMessage = t('error:auth.failed');
  }

  return (
    <div className="mp-login-container">
      <div className="mp-form-login">
        <Formik
          onSubmit={values => {
            props.handleLogin(values);
          }}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Item
                validateStatus={errors.email && "error"}
                help={
                  errors.email && t("validation:email." + errors.email)
                }
              >
                <Input
                  data-testid="email"
                  placeholder={t("common:email")}
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
                  errors.password && t("validation:password." + errors.password)
                }
              >
                <Input
                  data-testid="password"
                  name="password"
                  type="password"
                  size="large"
                  icon="lock"
                  placeholder={t("common:password")}
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("login:remember_me")}</Checkbox>
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
                  disabled={props.isSubmitLoading}
                >
                  {t("common:login")}
                </Button>
                <div className="mp-form-login__error-box">{errorMessage}</div>
              </Form.Item>
              <div
                type="flex"
                align="middle"
                className="mp-form-login__text-login"
              >
                <p>{t("login:other_option")}</p>
              </div>
              <Form.Item className="mp-form-login__btn-socmed">
                <div className="mp-form-login__socmed-box">
                  {/* <ButtonGoogle>{t("common:google")}</ButtonGoogle>
                  <ButtonFacebook>
                    {t("common:facebook")}
                  </ButtonFacebook> */}
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
                    </Link>
                    string1
                  </Trans>
                </div>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </div>
    </div>    
  )
}
