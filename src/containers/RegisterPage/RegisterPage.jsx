import React, { Component } from "react";
import { Input, Form, Button, Icon, Checkbox, Card, Row, Col } from "antd";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import authentication from "../../api/services/authentication";
import strings from "../../config/localization";
import { Redirect } from "react-router-dom";
//import "../../sass/style.sass";

function mapStateToProps(state) {
  return {
    
  };
}

const FormItem = Form.Item;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    };
  }

  handleSocialRegister = (request) => {
    console.log({req : request});
    
    authentication.registerSosialMedia(request).then(response=>{
      console.log(response);
      
    }).catch(error=>{
      console.log(error);
      
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        authentication
          .register(values)
          .then(response => {
            console.log(response);
            
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {isAuthenticated} = this.state; 

    if(isAuthenticated === true){
      return (
        <Redirect to='/' />
      )
    }

    return (
      <React.Fragment>
        <div className="register-header">
          <a href="/">
            <img
              src="/static/media/monggopesen_logo.9eae6d5c.png"
              className="register-header__image"
              alt=""
            />
          </a>
        </div>
        <div className="container">
          <div className="user-account-container">
            <Row>
              <Col span={12} className="user-account-container-col">
                Logo
              </Col>
              <Col span={12} className="user-account-container-col">
                <Card>
                  <Form onSubmit={this.handleSubmit} className="register-form">
                    <h1 className="register-form__typography">
                      {strings.register_now}
                    </h1>
                    <p>
                      {strings.formatString(
                        strings.register_quote,
                        <a href="/">{strings.register_enter}</a>
                      )}
                    </p>
                    <ButtonFacebook className="register-form__button" onSubmit={this.handleSocialRegister}>
                      {strings.facebook}
                    </ButtonFacebook>
                    <ButtonGoogle className="register-form__button" onSubmit={this.handleSocialRegister}>
                      {strings.google}
                    </ButtonGoogle>
                    <div className="register-form__separator">
                      <span className="register-form__separator__hline" />
                      <span className="register-form__separator__text">
                        {strings.register_option}
                      </span>
                      <span className="register-form__separator__hline" />
                    </div>
                    <FormItem className="register-form__input-text">
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your name!"
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
                          placeholder={"Nama"}
                        />
                      )}
                    </FormItem>
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
                              type={"mail"}
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
                      })(<Checkbox>{strings.register_agree}</Checkbox>)}
                      <Button
                        size={"large"}
                        htmlType="submit"
                        className="register-form__button__submit"
                      >
                        {strings.login_register}
                      </Button>
                    </FormItem>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <div className="register-footer">
          <a href="#">
            Bantuan
          </a>
        </div>
      </React.Fragment>
    );
  }
}
const RegisterForm = Form.create({})(RegisterPage);

export default connect(mapStateToProps)(RegisterForm);
