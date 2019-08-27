import React, { Component } from "react";
import { Form, Row, Col, Checkbox } from "antd";
import { Link } from "react-router-dom";
import ButtonFacebook from "../../components/ButtonFacebook";
import ButtonGoogle from "../../components/ButtonGoogle";
import { connect } from "react-redux";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/logo_monggopesen/ic_logo_bag_borderteal.png";
import {useRootContext} from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import { schema } from "./schema";

function Login(){
  const {handleLogin, isSubmitting, isAuthenticated, history} = useRootContext()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      isErorloaded: false,
      nextPage: "",
      status: null,
      message: "",
      firstInput: true,
      heightImageBackground: 0
    };
  }

  componentDidMount() {
    // console.log(this.props.location)
    if (this.props.location.state !== undefined) {
      this.setState({
        nextPage: this.props.location.state.nextPage
      });
    }
    this.updateHeightImageBackground();
    window.addEventListener('resize', this.updateHeightImageBackground);
  }

  updateHeightImageBackground = () => {
    let heightContent = window.document.getElementById("root").offsetHeight;
    let heightWindow = window.innerHeight;
    let height = heightWindow >= heightContent ? heightWindow : heightContent;
    this.setState({
      heightImageBackground: height
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeightImageBackground);
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
        console.log(login);       
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
        <Row style={{display: "flex"}}>
          <Col md={{ span: 14 }}>
            <div
              className="scrollable-container"
              style={{height: "100%"}}
              ref={node => {
                this.container = node;
              }}
            >
              <div className="register_Background" style={{height: this.state.heightImageBackground}} />
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
                      onChange={
                        this.state.firstInput
                          ? this.clearTrigger
                          : this.clearErrorMessage
                      }
                      size={"large"}
                      icon={"user"}
                      placeholder={"Email"}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Password harus diisi"
                      }
                    ]
                  })(
                    <Input
                      size={"large"}
                      type="password"
                      onChange={
                        this.state.firstInput
                          ? this.clearTrigger
                          : this.clearErrorMessage
                      }
                      icon="lock"
                      placeholder={"Password"}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true
                  })(<Checkbox>{strings.login_remember_me}</Checkbox>)}
                  <Link
                      className="login-form__forgot"
                      onClick={this.clearErrorMessage}
                      to={{
                        pathname: "/forget-password",
                        state: { nextPage: this.state.nextPage }
                      }}
                    >
                      <span>{strings.login_forgot_password}</span>
                    </Link>
                  <Button
                    type="primary"
                    size="large"
                    width="full"
                    htmlType="submit"
                    disabled={isSubmitting}
                  >
                    Log in
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
                    <ButtonGoogle
                      className="register__form__socmed-button"
                      onSubmit={this.handleloginGoogle}
                    >
                      {strings.google}
                    </ButtonGoogle>
                    <ButtonFacebook
                      className="register__form__socmed-button"
                      onSubmit={this.handleFacebook}
                    >
                      {strings.facebook}
                    </ButtonFacebook>
                  </div>
                </Form.Item>
                <div className="register__form__direct-login">
                  {strings.formatString(
                    strings.login_quote,
                    <Link
                      className="link-register"
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
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;