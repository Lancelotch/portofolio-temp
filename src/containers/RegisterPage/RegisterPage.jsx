import React, { Component } from "react";
import { Input, Form, Button, Icon, Checkbox, Card, Row, Col } from "antd";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import authentication from "../../api/services/authentication";
import strings from "../../config/localization";
//import "../../sass/style.sass";

function mapStateToProps(state) {
  return {};
}

const FormItem = Form.Item;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    };
  }

  handleFacebookLoginSuccess = user => {
    const request = {
      platformId: user._token.accessToken
    };
    authentication
      .loginSosialMedia(request)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFacebookLoginFailure = err => {
    console.error(err);
  };

  handleGoogleLoginSuccess = user => {
    console.log(user);
  };

  handleGoogleLoginFailure = err => {
    console.error(err);
  };

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
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="register-header">
            <a href="#" >
                <img src="/static/media/monggopesen_logo.9eae6d5c.png" className="register-header__image" alt=""/>
            </a>
        </div>
        <div className="register-container">
          <div className="register-container__fluid ">
            <Row>
              <Col span={12}>Logo</Col>
              <Col span={12}>
                <Card>
                  <Form onSubmit={this.handleSubmit} className="register-form">
                    <h1 className="register-form__typography">
                      {strings.login_enter}
                    </h1>
                    <ButtonFacebook
                      className="register-form__button"
                      provider="facebook"
                      appId="315428089178708"
                      onLoginSuccess={this.handleFacebookLoginSuccess}
                      onLoginFailure={this.handleFacebookLoginFailure}
                    >
                      {strings.facebook}
                    </ButtonFacebook>
                    <ButtonGoogle
                      className="register-form__button"
                      provider="google"
                      appId="615585105258-0bokifsov91evfhuhjst3qnlc3ab1gvl.apps.googleusercontent.com"
                      onLoginSuccess={this.handleGoogleLoginSuccess}
                      onLoginFailure={this.handleGoogleLoginFailure}
                    >
                      {strings.google}
                    </ButtonGoogle>
                    <div className="register-form__separator">
                      <span className="register-form__separator__hline" />
                      <span className="register-form__separator__text">
                        {strings.login_option}
                      </span>
                      <span className="register-form__separator__hline" />
                    </div>
                    <FormItem className="register-form__input-text">
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
                            <Icon
                              type={"user"}
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder={"Email"}
                        />
                      )}
                    </FormItem>
                    <FormItem className="register-form__input-text">
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
                      <a className="register-form__forgot" href="">
                        {strings.login_forgot_password}
                      </a>
                      <Button
                        size={"large"}
                        htmlType="submit"
                        className="register-form__button__submit"
                      >
                        {strings.login_enter}
                      </Button>
                      {strings.formatString(
                        strings.login_quote,
                        <a href="/register">{strings.login_register} </a>
                      )}
                    </FormItem>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const RegisterForm = Form.create({})(RegisterPage);
export default connect(mapStateToProps)(RegisterForm);
