import React, { Component } from "react";
import { Input, Form, Button, Icon, Row, Col, Affix, Checkbox } from "antd";
import { Link } from "react-router-dom";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import "./style.sass";
// import "../../sass/style.sass"
import strings from "../../localization/localization";
import {
  loginWithGoogle,
  loginWithForm,
  loginWithHome,
  clearError,
  loginWithFacebook
} from "../../store/actions/authentication";
import {
  rulesEmail
  // rulesPassword,
  // AlertLogin,
  // RegistrationaAlert
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
      message: "",
      firstInput: true
    };
  }

  componentDidMount() {
    // console.log(this.props.location)
    if (this.props.location.state !== undefined) {
      this.setState({
        nextPage: this.props.location.state.nextPage
      });
    }
  }

  clearErrorMessage = () => {
    this.props.form.validateFields();
    this.props.clearError();
  };

  clearTrigger = () => {
    this.props.clearError();
  };

  // getPath = (state) => {
  //   let path = ""
  //   state === "checkout" ? path =`/${state}` : path = "/"
  //   return path
  // }

  handleloginGoogle = request => {
    const path = this.state.nextPage;
    this.props.loginWithGoogle(path, request);
  };

  handleFacebook = request => {
    const path = this.state.nextPage;
    this.props.loginWithFacebook(request, path);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      firstInput: false
    });
    const { history } = this.props;

    // const path = this.getPath(this.state.nextPage)
    const path = this.state.nextPage;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const login = await this.props.loginWithHome(values, path, history);
        if (this.props.isError) {
          this.props.form.setFields({
            password: {
              value: values.password,
              errors: [new Error("")]
            },
            email: {
              value: values.email,
              errors: [new Error("")]
            }
          });
        }
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
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
                  src={monggopesen_logo}
                  alt="login__logo"
                />
              </Link>
              <h2 className="register__title">{strings.login_enter}</h2>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator("email", rulesEmail())(
                    <Input
                      className="register__input"
                      onChange={
                        this.state.firstInput
                          ? this.clearTrigger
                          : this.clearErrorMessage
                      }
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
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      }
                    ]
                  })(
                    <Input
                      className="register__input"
                      size={"large"}
                      onChange={
                        this.state.firstInput
                          ? this.clearTrigger
                          : this.clearErrorMessage
                      }
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
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
                  <a className="login-form__forgot" href="/forget-password">
                    {strings.login_forgot_password}
                  </a>
                  {/* <div type="flex" align="end">
                    <Link
                      style={{ color: "#F63700" }}
                      onClick={this.clearErrorMessage}
                      to={{
                        pathname: "/forget-password",
                        state: { nextPage: this.state.nextPage }
                      }}
                    >
                      {strings.login_forgot_password}
                    </Link>
                  </div> */}
                  <Button
                    size={"large"}
                    htmlType="submit"
                    className="login__button-login color-button"
                  >
                    <p className="register__form__button-register-text">
                      {strings.login_enter}
                    </p>
                  </Button>
                  <div className="login-form__error-box">
                    {this.props.messageError ? (
                      <p> {this.props.messageError}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </FormItem>
                <div type="flex" align="middle" className="login__separator">
                  <p>{strings.login_option}</p>
                </div>
                <Form.Item className="register__form__btn-socmed">
                  <div className="register__form__socmed-box">
                    <ButtonFacebook
                      className="register__form__socmed-button"
                      onSubmit={this.handleFacebook}
                    >
                      {strings.facebook}
                    </ButtonFacebook>
                    <ButtonGoogle
                      className="register__form__socmed-button"
                      onSubmit={this.handleloginGoogle}
                    >
                      {strings.google}
                    </ButtonGoogle>
                  </div>
                </Form.Item>
                <div className="register__form__direct-login">
                  {strings.formatString(
                    strings.login_quote,
                    <Link
                      style={{ color: "#F63700" }}
                      onClick={this.clearErrorMessage}
                      to={{
                        pathname: "/register",
                        state: { nextPage: this.state.nextPage }
                      }}
                    >
                      <b>{strings.login_register} </b>
                    </Link>
                  )}
                </div>
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
  isError: state.authentication.checkError
});

const LoginForm = Form.create({})(Login);
export default connect(
  mapStateToProps,
  {
    loginWithGoogle,
    loginWithForm,
    loginWithHome,
    clearError,
    loginWithFacebook
  }
)(LoginForm);
