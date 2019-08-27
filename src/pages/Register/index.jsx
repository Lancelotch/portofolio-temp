import React from "react";
import { Icon, Form, Row, Col } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import { schema } from "./schema";
import strings from "../../localization/localization";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";

function Register() {
  const {
    handleRegister,
    isSubmitting,
    isAuthenticated,
    history
  } = useRootContext();
  const validateStatus = (error, touched) =>
    error && touched ? "warning" : "success";
    
  if (isAuthenticated) {
    history.push(PATH_URL.HOME);
    return null;
  } else {
    return (
        <React.Fragment>
        <Row style={{ display: "flex" }}>
          <Col md={{ span: 14 }}>
            <div className="scrollable-container">
              <div className="register_Background" />
            </div>
          </Col>
          <Col md={{ span: 10 }}>
            <div className="register">
                <img
                  className="register__logo"
                  src={monggopesen_logo}
                  alt="login__logo"
                  onClick={history.push(PATH_URL.HOME)}
                />
              <h2 className="register__title">{strings.register_now}</h2>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={values => {
                handleRegister(values);
              }}
              validationSchema={schema}
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
                    validateStatus={validateStatus(errors.name, touched.name)}
                    help={errors.name}
                  >
                    <Input
                      placeholder="Nama"
                      name="name"
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
                      onBlur={handleBlur}
                      className="register__input"
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={validateStatus(errors.email, touched.email)}
                    help={errors.email}
                  >
                    <Input
                      placeholder="Email"
                      name="email"
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
                      onBlur={handleBlur}
                      className="register__input"
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={validateStatus(
                      errors.password,
                      touched.password
                    )}
                    help={errors.password}
                  >
                    <Input
                      name="password"
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                      onBlur={handleBlur}
                      className="register__input"
                    />
                  </Form.Item>
                  <div className="mp-login-button-submit">
                    <Button
                      type="primary"
                      size="large"
                      width="full"
                      htmlType="submit"
                      disabled={isSubmitting}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Register;
