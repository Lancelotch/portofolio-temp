import React, { useState, useEffect } from "react";
import { Icon, Form, Checkbox } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import { schema } from "./schema";
import strings from "../../localization/localization";
import { Link } from "react-router-dom"
import ButtonGoogle from "../../components/ButtonGoogle";
import ButtonFacebook from "../../components/ButtonFacebook";


export default function FormLogin(props) {
    const { handleLogin, isSubmitting, isAuthenticated, history } = useRootContext()
    const [nextPage, setNextPage] = useState(" ")

    useEffect(() => {
        if (isAuthenticated) {
            history.push(PATH_URL.HOME);
        }
    })

    return (
        <div className="mp-login-container">
            <div className="mp-form-login">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={values => {
                        handleLogin(values);
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
                                <Form.Item>
                                    <Input
                                        placeholder="Email"
                                        name="email"
                                        size="large"
                                        icon="mail"
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
                                        value={values.email}
                                        onBlur={handleBlur}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        name="password"
                                        prefix={
                                            <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                                        }
                                        type="password"
                                        size="large"
                                        icon="lock"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={values.password}
                                        onBlur={handleBlur}
                                        status={
                                            errors.password && touched.password ? "error" : "default"
                                        }
                                    />

                                </Form.Item>
                                {((errors.username && touched.username) || (errors.password && touched.password)) && (
                                    <center className="mp-login-error-message"><span>Please don't be stupid! </span></center>
                                )}
                                <Form.Item>
                                    <Checkbox>{strings.login_remember_me}</Checkbox>
                                    <Link
                                        className="mp-form-login__forgot"
                                        to={{
                                            pathname: "/forget-password",
                                            state: { nextPage: nextPage }
                                        }}
                                    >
                                        <span>{strings.login_forgot_password}</span>
                                    </Link>
                                </Form.Item>
                                    <Button
                                        type="primary"
                                        size="large"
                                        width="full"
                                        htmlType="submit"
                                        disabled={isSubmitting}
                                    >
                                        {strings.enter}
                                    </Button>
                                <div type="flex" align="middle" className="mp-form-login__text-login">
                                    <p>{strings.login_option}</p>
                                </div>
                                <Form.Item className="mp-form-login__btn-socmed">
                                    <div className="mp-form-login__socmed-box">
                                        <ButtonGoogle>
                                            {strings.google}
                                        </ButtonGoogle>
                                        <ButtonFacebook>
                                            {strings.facebook}
                                        </ButtonFacebook>
                                    </div>
                                    <div className="mp-form-login__direct-register">
                                        {strings.formatString(
                                            strings.login_quote,
                                            <Link
                                                className="link-register"
                                                to={{
                                                    pathname: "/register",
                                                    state: { nextPage:  nextPage }
                                                }}>
                                                <b>{strings.login_register} </b>
                                            </Link>
                                        )}
                                    </div>
                                </Form.Item>
                            </Form>
                        )}
                </Formik>
            </div>
        </div>
    );
}

