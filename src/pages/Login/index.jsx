import React, { Component } from "react";
import { Input, Form, Button, Icon, Row, Col, Affix } from "antd";
import { Link } from "react-router-dom";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import logoMonggoPesen from "../../assets/img/logo_monggopesen.png";
import "./style.sass";
// import "../../sass/style.sass"
import strings from "../../localization/localization";
import {
  loginWithGoogle,
  loginWithForm,
  loginWithHome
} from "../../store/actions/authentication";
import {
  rulesEmail,
  // rulesPassword,
  // AlertLogin,
  RegistrationaAlert
} from "../Register/registerContainer";
// import HomePage from "../Home";

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
    e.preventDefault()
      this.props.form.validateFields( async (err, values) => {
        if (!err) {
          const login = await this.props.loginWithHome(values)
          if(this.props.isError ){
            this.props.form.setFields({
              password: {
                value: values.password,
                errors: [new Error(this.props.messageError)]
              }
            })
          }
        }
      })
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    // const { errorMessage } = this.state;
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
                  {getFieldDecorator("password",{
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!'
                      }
                    ]
                  })(
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
                    className="register__form__button-register color-button"
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
  auth: state.authentication.auth,
  messageError: state.authentication.messageError,
  isError : state.authentication.checkError
});

const LoginForm = Form.create({})(Login);
export default connect(
  mapStateToProps,
  { loginWithGoogle, loginWithForm, loginWithHome }
)(LoginForm);
