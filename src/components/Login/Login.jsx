import React, { Component } from "react";
import { Modal, Input, Form, Button, Icon, Checkbox } from "antd";
import ButtonFacebook from "../Button/SocialMedia/Facebook";
import ButtonGoogle from "../Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import authentication from "api/services/authentication";
import strings from "config/localization";
import {login} from "../../store/actions/auth"


const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    };
  }

  handleSocialLogin = (request) => {
    authentication.loginSosialMedia(request).then(response=>{
      console.log({login : response});
      const token = response.data;
      localStorage.setItem("token", token);
      this.props.dispatchAuthenticated(token);
      this.props.onCancel();
      
    }).catch(error=>{
      console.log(error);
      if(error.status === 404){
        authentication.registerSosialMedia(request).then(response=>{
          authentication.loginSosialMedia(request).then(response=>{
            const token = response.data;
            localStorage.setItem("token", token);
            this.props.dispatchAuthenticated(token);
            this.props.onCancel();
          }).catch(error=>{
            console.log(error);
          })
        }).catch(error=>{
          console.log(error);
        })
      }
    })
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
            localStorage.setItem("token", token);
            this.props.dispatchAuthenticated(token);
            // this.props.onCancel();
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
              onSubmit={this.handleSocialLogin}
            >
              {strings.facebook}
            </ButtonFacebook>
            <ButtonGoogle
              className="login-form__button"
              onSubmit={this.handleSocialLogin}
            >
              {strings.google}
            </ButtonGoogle>
            <div className="login-form__separator">
              <span className="login-form__separator__hline" />
              <span className="login-form__separator__text">
                {strings.login_option}
              </span>
              <span className="login-form__separator__hline" />
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
              {strings.formatString(
                strings.login_quote,
                <a href="/register">{strings.login_register} </a>
              )}
            </FormItem>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  dispatchAuthenticated: (token) => dispatch(login(token)),
});

const LoginForm = Form.create({})(Login);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
