import React from "react";
import {  Form, Checkbox } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRootContext } from "../../hoc/RootContext";
import { schema } from "./schema";
import strings from "../../localization/localization";
import { Link } from "react-router-dom"
import ButtonGoogle from "../../components/ButtonGoogle";
import ButtonFacebook from "../../components/ButtonFacebook";


export default function FormLogin(props) {
    
    const { handleLogin, isSubmitting} = useRootContext()
    const validateStatus = (error,touched)=> error && touched ? "warning":"success";

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
                                <Form.Item validateStatus={validateStatus(errors.email,touched.email)} help={errors.email}>
                                    <Input
                                        placeholder="Email"
                                        name="email"
                                        size="large"
                                        icon="mail"
                                        onChange={handleChange}
                                        value={values.email}
                                        onBlur={handleBlur}
                                    />
                                </Form.Item>
                                <Form.Item validateStatus={validateStatus(errors.password,touched.password)} help={errors.password}>
                                    <Input
                                        name="password"
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
                                <Form.Item>
                                    <Checkbox>{strings.login_remember_me}</Checkbox>
                                    <Link
                                        className="mp-form-login__forgot"
                                        to={{
                                            pathname: "/forget-password"
                                    
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
                                                    pathname: "/register"
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

