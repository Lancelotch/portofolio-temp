import React, { Component } from "react"
import { Input, Form, Button, Icon, Checkbox, Card, Row, Col, Alert } from "antd"
import { connect } from "react-redux"
import authentication from "../../api/services/authentication"
import strings from "../../config/localization"
import { Redirect } from "react-router-dom"


function mapStateToProps(state) {
  return {};
}

const FormItem = Form.Item;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      status: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      status: null
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        authentication
          .register(values)
          .then(response => {
            console.log(response);
            this.setState({
              status: {
                success: true,
                message: strings.register_sucsess
              }
            })
          })
          .catch(error => {
            console.log(error);
            this.setState({
              status: {
                success: false,
                message: error.data.message
              }
            })
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAuthenticated } = this.state;

    if (isAuthenticated === true) {
      return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <Row>
              <Col xs={24} md={24}>
                <Card>
                  <Form onSubmit={this.handleSubmit}>
                    <h2>
                      {strings.register_now}
                    </h2>
                    <p>
                      {strings.formatString(
                        strings.register_quote,
                        <a href="/">{strings.register_enter}</a>
                      )}
                    </p>
                      <span>
                        {strings.register_option}
                      </span>
                    <FormItem>
                      {getFieldDecorator("name", {
                        rules: [
                          {
                            required: true,
                            message: strings.register_name
                          },
                          {
                            pattern: /^[. a-zA-Z]+$/,
                            message: strings.register_pattern_quote
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
                    <FormItem>
                      {getFieldDecorator("email", {
                        rules: [
                          {
                            type: "email",
                            message: strings.register_email
                          },
                          {
                            required: true,
                            message:  strings.register_email_quote
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
                    <FormItem>
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                            message: strings.register_password
                          },
                          {
                            min: 6,
                            message: strings.register_password_quote
                          }
                        ]
                      })(
                        <Input.Password
                          min={6}
                          max={12}
                          size={"large"}
                          prefix={
                            <Icon
                              type={"lock"}
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          placeholder={strings.register_password_placeholder}
                          type="password"
                        />
                      )}
                    </FormItem>
                    <FormItem>
                    {
                    this.state.status != null && 
                      <Alert
                        type={this.state.status.success ? "success" : "error"}
                        message={
                          <span>
                            <b>{this.state.status.success ? "Berhasil" : "Gagal"}</b>{this.state.status.message}
                          </span>
                        }
                        showIcon
                      />
                  }
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
    );
  }
}
const RegisterForm = Form.create({})(RegisterPage);

export default connect(mapStateToProps)(RegisterForm);

