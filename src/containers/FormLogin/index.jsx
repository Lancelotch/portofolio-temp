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
    
    const { handleLogin, isSubmitting } = useRootContext()

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
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit
                    }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Item validateStatus={errors.email && "error"} help={errors.email}>
                                    <Input
                                        placeholder="Email"
                                        name="email"
                                        size="large"
                                        icon="mail"
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                </Form.Item>
                                <Form.Item validateStatus={errors.password && "error"} help={errors.password}>
                                    <Input
                                        name="password"
                                        type="password"
                                        size="large"
                                        icon="lock"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={values.password}
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
                                    <Button
                                        type="primary"
                                        size="large"
                                        width="full"
                                        htmlType="submit"
                                        disabled={isSubmitting}
                                    >
                                        {strings.enter}
                                    </Button>
                                    <div className="mp-form-login__error-box">
                                        Tess
                                    </div>
                                </Form.Item>
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
