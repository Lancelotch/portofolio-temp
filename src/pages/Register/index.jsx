import React, { Component } from "react";
import { Input, Form, Icon, Row, Col } from "antd";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import strings from "../../localization/localization";
import {
  registerWithGoogle,
  registerForm,
  loading,
  loginWithGoogle,
  openModal,
  clearError,
  loginWithFacebook
} from "../../store/actions/authentication";
import { Link } from "react-router-dom";
import {
  rulesName,
  rulesEmail,
  rulesPassword,
  RegistrationSubmitButton
} from "./registerContainer";

const FormItem = Form.Item;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      nextPage: "",
      status: null,
      message: "",
      modalStatus: false,
      heightImageBackground: 0
    };
  }

  componentDidMount() {
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

  validation(form, values) {
    if (this.props.isAuthenticated) {
      this.props.openModal();
    } else {
      form.setFields({
        email: {
          value: values.email,
          errors: [new Error("")]
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const path = this.state.nextPage;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.registerForm(history, values, path);
        this.validation(this.props.form, values);
      } else {
        this.setState({
          modalStatus: false
        });
      }
    });
  };

  handleGoogle = request => {
    const path = this.state.nextPage;
    this.props.loginWithGoogle(path, request);
  };
  handleFacebook = request => {
    const path = this.state.nextPage;
    this.props.loginWithFacebook(request, path);
  };

  
  clearErrorMessage = () => {
    this.props.form.validateFields();
    this.props.clearError();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Row style={{display: "flex"}}>
          <Col md={{ span: 14 }}>
<<<<<<< HEAD
            <div className="scrollable-container">
              <div className="register_Background" />
=======
            <div
              className="scrollable-container"
              style={{height: "100%"}}
              ref={node => {
                this.container = node;
              }}
            >
              <div className="register_Background" style={{height: this.state.heightImageBackground}} />
>>>>>>> development
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
              <h2 className="register__title">{strings.register_now}</h2>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator("name", rulesName())(
                    <Input
                      className="register__input"
                      size={"large"}
                      prefix={
                        <Icon
                          type={"user"}
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder={"Name"}
                      type="text"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("email", rulesEmail())(
                    <Input
                      className="register__input"
                      onChange={this.props.clearError}
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
                  {getFieldDecorator("password", rulesPassword())(
                    <Input.Password
                      className="register__input"
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
                <div className="register__form__note">
                  {strings.formatString(
                    strings.register_agree,
                    <a className="register__form__link" href="/">
                      {strings.register_policy}
                    </a>,
                    <a className="register__form__link" href="/">
                      {strings.register_requirement}
                    </a>
                  )}
                </div>
                <FormItem>
                  <RegistrationSubmitButton isLoading={this.props.isLoading} />
                  <div className="login-form__error-box">
                    {this.props.messageError ? (
                      <p> {this.props.messageError}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </FormItem>
                <div
                  type="flex"
                  align="middle"
                  className="register__form__option-text"
                >
                  <span>{strings.register_option}</span>
                </div>
                <Form.Item className="register__form__btn-socmed">
                  <div className="register__form__socmed-box">
                    <ButtonGoogle
                      className="register__form__socmed-button"
                      onSubmit={this.handleGoogle}
                      path={this.props.history}
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
                  <div className="register__form__direct-login">
                    {strings.formatString(
                      strings.register_quote,
                      <Link
                        to={{
                          pathname: "/login",
                          state: { nextPage: this.state.nextPage }
                        }}
                        onClick={this.clearErrorMessage}
                        style={{ color: "#F63700" }}
                      >
                        <span className="register__form__link-login">
                          {strings.register_login}
                        </span>
                      </Link>
                    )}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const RegisterForm = Form.create({})(RegisterPage);

const mapStateToProps = state => {
  const {
    isAuthenticated,
    token,
    message,
    isLoading,
    messageError
  } = state.authentication;
  return {
    isAuthenticated,
    token,
    message,
    isLoading,
    messageError
  };
};

export default connect(
  mapStateToProps,
  {
    registerWithGoogle,
    registerForm,
    loading,
    loginWithGoogle,
    openModal,
    clearError,
    loginWithFacebook
  }
)(RegisterForm);
