import React, { Component } from "react";
import {
  Input,
  Form,
  Button,
  Icon,
  Checkbox,
} from "antd";
import { Redirect } from "react-router-dom";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
// import './style.sass'
import strings from "../../localization/localization";
import {
  loginWithGoogle,
  loginWithForm
} from "../../store/actions/authentication";

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      isErorloaded: false
    };
  }

  handleRegisterGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request);
  };

  handleSubmit = e => {
    try {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          await this.props.loginWithForm(values);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {

    console.log(this.props.token);
    const { form,isAuthenticated } = this.props;
    const { getFieldDecorator } = form;
    const { errorMessage, isErorloaded } = this.state;
    const linkCheckout= "/checkout";
    if (isAuthenticated === true) {
      return <Redirect to={linkCheckout}/>
    }
    console.log(errorMessage);
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem className="login-form__input-text">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                required: true,
                message: "Please input your email!"
              }
            ]
          })(
            <Input
              size={"large"}
              prefix={
                <Icon type={"user"} style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder={"Email"}
            />
          )}
        </FormItem>
        <FormItem className="login-form__input-text">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              }
            ]
          })(
            <Input
              size={"large"}
              prefix={
                <Icon type={"lock"} style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder={"Password"}
              type="password"
            />
          )}
        </FormItem>
        <FormItem className="login-form__checkBox">
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
          <a className="login-form__forgot" href="/">
            {strings.login_forgot_password}
          </a>
          <div>
            <Button
              size={"large"}
              htmlType="submit"
              className="login-form__button__submit"
            >
              <h4>{strings.login_enter}</h4>
            </Button>
            <div className="login-form__error-box">
              {isErorloaded ? (
                <p className="login-form__error-notif"> {errorMessage}</p>
              ) : null}
            </div>
          </div>
          <div className="login-form__separator">
            <p className="login-form__separator__text">
              {strings.login_option}
            </p>
          </div>
          <div className="login-form__socmed-box">
            <ButtonFacebook
              className="login-form__socmed-button"
              onSubmit={this.handleRegisterGoogle}
            >
              <p> {strings.facebook}</p>
            </ButtonFacebook>
            <ButtonGoogle
              className="login-form__socmed-button"
              onSubmit={this.handleRegisterGoogle}
            >
              <p> {strings.google}</p>
            </ButtonGoogle>
          </div>
          <p style={{ marginTop: "70px" }}>
            {strings.formatString(
              strings.login_quote,
              <a href="/register" className="login-form__register">
                {strings.login_register}{" "}
              </a>
            )}
          </p>
        </FormItem>
      </Form>
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
