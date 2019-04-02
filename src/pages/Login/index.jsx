import React, { Component } from "react";
import { Input, Form, Button, Icon, Checkbox, Row, Col, Affix } from "antd";
import { Redirect,Link } from "react-router-dom";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import logoMonggoPesen from "../../assets/img/logo_monggopesen.png";
import "./style.sass";
import strings from "../../localization/localization";
import {
  loginWithGoogle,
  loginWithForm
} from "../../store/actions/authentication";
import {
  rulesEmail,
  rulesPassword,
  AlertLogin
} from "../Register/registerContainer";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      isErorloaded: false
    };
  }

  handleloginGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request);
  };

  handleSubmit = e => {
    try {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          await this.props.loginWithForm(values);
          if (this.state.isAuthenticated !== true) {
            this.setState({
              errorMessage: "Email atau password anda salah",
              isErorloaded: true
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.props.token);
    const { form, isAuthenticated } = this.props;
    const { getFieldDecorator } = form;
    const { errorMessage, isErorloaded } = this.state;
    const linkCheckout = "/checkout";
    if (isAuthenticated === true) {
      return <Redirect to={linkCheckout} />;
    }
    console.log(errorMessage);
    return (
      <React.Fragment>
        <Row>
          <Col md={{ span: 14 }}>
            <div
              className="scrollable-container"
              ref={node => {
                this.container = node;
              }}
            >
              <Affix target={() => this.container}>
                <div className="register_Background" />
              </Affix>
            </div>
          </Col>
          <Col md={{ span: 10 }}>
            <div className="register">
            <Link to="/">
              <img
                className="register__logo"
                src={logoMonggoPesen}
                alt="login__logo"
              />
              </Link>
              <h2 className="register__title">{strings.login_enter}</h2>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator("email", rulesEmail())(
                    <Input
                      className="register__input"
                      size={"large"}
                      prefix={
                        <Icon
                          type={"user"}
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder={"Email"}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", rulesPassword())(
                    <Input
                      size={"large"}
                      prefix={
                        <Icon
                          type={"lock"}
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder={"Password"}
                      type="password"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {/* {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>{strings.login_remember_me}</Checkbox>)} */}
                  <a className="login-form__forgot" href="/">
                    {strings.login_forgot_password}
                  </a>
                  <Button
                    size={"large"}
                    htmlType="submit"
                    className="register__form__button-register"
                  >
                    <p className="register__form__button-register-text">
                      {strings.login_enter}
                    </p>
                  </Button>
                  <AlertLogin errorMessage={errorMessage} isErorloaded={isErorloaded}/>
                </FormItem>
                <div className="login__separator">
                  <p>
                    {strings.login_option}
                  </p>
                </div>
                <Form.Item className="register__form__btn-socmed">
                  <div className="register__form__socmed-box">
                    <ButtonFacebook
                      className="register__form__socmed-button"
                      onSubmit={this.handleRegisterGoogle}
                    >
                      {strings.facebook}
                    </ButtonFacebook>
                    <ButtonGoogle
                      className="register__form__socmed-button"
                      onSubmit={this.handleRegisterGoogle}
                    >
                      {strings.google}
                    </ButtonGoogle>
                  </div>
                  <center className="register__form__direct-login">
                    {strings.formatString(
                      strings.login_quote,
                      <a href="/register" className="login-form__login">
                        {strings.login_register}{" "}
                      </a>
                    )}
                  </center>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  token: state.authentication.token
});

const LoginForm = Form.create({})(Login);
export default connect(
  mapStateToProps,
  { loginWithGoogle, loginWithForm }
)(LoginForm);
