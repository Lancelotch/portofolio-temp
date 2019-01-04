import React, { Component } from "react";
import { Modal, Input, Form, Button, Icon, Checkbox } from "antd";
import ButtonFacebook from "../Button/SocialMedia/Facebook";
import ButtonGoogle from "../Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import authentication from "../../api/services/authentication";
import { LOGIN } from "../../store/actions/actions";
import strings from "../../config/localization";

const FormItem = Form.Item;

class Login extends Component {
  // state ={
  //   isAuthenticated : false
  // }
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : this.props.isAuthenticated
    }
  }

  handleFacebookLoginSuccess = (user) => {
    const request = {
      platformId : user._token.accessToken
    }
    authentication.loginSosialMedia(request).then(response=>{
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })
  }
   
  handleFacebookLoginFailure = (err) => {
    console.error(err)
  }

  handleGoogleLoginSuccess = (user) => {
    console.log(user)
  }
   
  handleGoogleLoginFailure = (err) => {
    console.error(err)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        authentication
          .login(values)
          .then(response => {
            console.log(response);
            const token = response.data;
            this.props.isAuthenticateds(token);
            this.props.onCancel();
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  render() {
    console.log(this.props.token);
    
    const { visible, onCancel, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <React.Fragment>
        <Modal
          visible={visible}
          closable={false}
          footer={null}
          onCancel={onCancel}
          width={380}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h1 className="login-form__typography">{strings.login_enter}</h1>
            <ButtonFacebook
              className="login-form__button"
              provider='facebook'
              appId='315428089178708'
              onLoginSuccess={this.handleFacebookLoginSuccess}
              onLoginFailure={this.handleFacebookLoginFailure}
            >
              {strings.facebook}
            </ButtonFacebook>
            <ButtonGoogle
              className="login-form__button"
              provider='google'
              appId='615585105258-0bokifsov91evfhuhjst3qnlc3ab1gvl.apps.googleusercontent.com'

              onLoginSuccess={this.handleGoogleLoginSuccess}
              onLoginFailure={this.handleGoogleLoginFailure}
            >
              {strings.google}
            </ButtonGoogle>
            {/* <Button size={"large"} className="login-form__button"><Icon type="google" style={{float : "left"}}></Icon>{strings.google}</Button> */}
            {/* <GoogleLoginButton align={"center"} className="login-form__button" onClick={() => alert("Hello")} ><span>{strings.google}</span></GoogleLoginButton>
            <FacebookLoginButton align={"center"} className="login-form__button" onClick={() => alert("Hello")} ><span>{strings.facebook}</span></FacebookLoginButton> */}
            {/* <Button size={"large"} className="login-form__button"><Icon type="facebook" style={{float : "left"}}></Icon>{strings.facebook}</Button> */}
            <div className="login-form__separator">
              <span className="login-form__separator__hline"></span>
              <span className="login-form__separator__text">{strings.login_option}</span>
              <span className="login-form__separator__hline"></span>
            </div>
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
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
              <a className="login-form__forgot" href="">
                {strings.login_forgot_password}
              </a>
              <Button
                size={"large"}
                htmlType="submit"
                className="login-form__button__submit"
              >
                {strings.login_enter}
              </Button>
              {strings.formatString(strings.login_quote,<a href="/register">{strings.login_register} </a>)}
            </FormItem>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    token: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isAuthenticateds: (token) => dispatch({ type: LOGIN, payLoad: token })
  };
};

const LoginForm = Form.create({})(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
