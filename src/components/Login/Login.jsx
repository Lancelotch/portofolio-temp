import React, { Component } from "react";
import { Modal, Input, Form, Button, Icon, Checkbox } from "antd";
import { connect } from 'react-redux';
import "./style.sass";
import authentication from "../../api/services/authentication";
import { LOGIN } from "../../store/actions/actions";

const FormItem = Form.Item;

class Login extends Component {
  // onChangeValue = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        authentication.login(values).then(response=>{
          this.props.isAuthenticated();
          this.props.onCancel();
        }).catch(error=>{
          console.log(error);
        })
      }
    });
  };

  render() {
    const { visible, onCancel, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Modal
          title="Login"
          visible={visible}
          footer={null}
          onCancel={onCancel}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("email", {
                rules: [
                  { type:"email", required: true, message: "Please input your email!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type={"user"} style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder={"Email"}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your password!" }
                ]
              })(
                <Input
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
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.authReducer.isAuthenticated 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isAuthenticated : ()=>dispatch({type : LOGIN})
  }
}

const LoginForm = Form.create({})(Login);
export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
