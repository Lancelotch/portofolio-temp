import React, { Component } from "react";
import { Input, Form, Button, Icon, Checkbox, Row, Col, Affix } from "antd";
import { Redirect, Link } from "react-router-dom";
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
  AlertLogin,
  RegistrationaAlert
} from "../Register/registerContainer";
import HomePage from "../Home";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      isErorloaded: false,
      nextPage: "",
      status: null,
      message: ""
    };
  }

  componentDidMount() {
    console.log("ini location", this.props.location);
    if (this.props.location.state !== undefined) {
      this.setState({
        nextPage: this.props.location.state.nextPage
      });
    }
  }

  handleloginGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      status: null
    });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const history = this.props.history;
        const linkCheckout = "/checkout";
        if (this.state.nextPage === "checkout") {
         await  this.props.loginWithForm(history, values, linkCheckout);
        } else {
         await this.props.loginWithForm(history, values);
        }
        console.log("message>>>login-page", this.props.auth);
        const { message, status } = this.props.auth.data;
        this.setState({
          message,
          status
        });
      }
    });
  };

  render() {
    console.log(this.props.token);
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { errorMessage } = this.state;

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
                  <RegistrationaAlert
                    message={this.state.message}
                  />
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
                </FormItem>
                <div className="login__separator">
                  <p>{strings.login_option}</p>
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
                      <Link
                        to={{
                          pathname: "/register",
                          state: { nextPage: "checkout" }
                        }}
                      >
                        {/* <a href="/register" className="login-form__login"> */}
                        {strings.login_register}{" "}
                      </Link>
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
  token: state.authentication.token,
  auth: state.authentication.auth
});

const LoginForm = Form.create({})(Login);
export default connect(
  mapStateToProps,
  { loginWithGoogle, loginWithForm }
)(LoginForm);
