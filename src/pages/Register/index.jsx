import React, { Component } from "react";
import { Input, Form, Button, Icon, Row, Col, Alert, Affix } from "antd";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import logoMonggoPesen from "../../assets/img/logo_monggopesen.png";
import strings from "../../localization/localization";
import imageRegister from "../../assets/img/register_pict.png";
import {
  registerWithGoogle,
  registerForm
} from "../../store/actions/authentication";
import FrontImage from "../../components/Image/FrontImage";
import Loading from "../../components/Loading";
import {
  rulesName,
  rulesEmail,
  rulesPassword,
  handleSubmit
} from "./registerContainer";

const FormItem = Form.Item;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      status: null,
      success: "",
      message: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      status: null
    });
    this.props.form.validateFields((err, values) => {
      const history = this.props.history;
      if (!err) {
        this.props.registerForm(history, values);
        const message = this.props.message.data.message;
        this.setState({
          message
        });
      }
    });
  };

  handleRegisterGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request);
  };

  renderButton = () => {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <Button
        className="register__form__button-register"
        size={"large"}
        htmlType="submit"
        type="primary"
      >
        <p className="register__form__button-register-text">
          {strings.login_register}
        </p>
      </Button>
    );
  };

  alertMessage = () => {
    return (
      this.state.message && (
        <Alert
          type={this.state.success ? "success" : "error"}
          message={
            <span>
              <b>{this.state.success ? "Berhasil" : "Gagal"}</b> &nbsp;
              {this.state.message}
            </span>
          }
          showIcon
        />
      )
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
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
                <FrontImage src={imageRegister} />
              </Affix>
            </div>
          </Col>
          <Col md={{ span: 10 }}>
            <div className="register">
              <img
                className="register__logo"
                src={logoMonggoPesen}
                alt="register__logo"
              />
              <h2 className="register__title">{strings.register_now}</h2>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator("name", rulesName())(
                    <Input
                      className="register__input"
                      size={"large"}
                      prefix={<Icon type={"user"} />}
                      placeholder={"Name"}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("email", rulesEmail())(
                    <Input
                      className="register__input"
                      size={"large"}
                      prefix={<Icon type={"mail"} />}
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
                  <div className="register__form__confirm">
                    {this.alertMessage()}
                  </div>
                  {this.renderButton()}
                </FormItem>
                <Row
                  type="flex"
                  align="middle"
                  justify="space-between"
                  className="register__form__option-text"
                >
                  <div className="register__form__text-line" />
                  <span>{strings.register_option}</span>
                  <div className="register__form__text-line" />
                </Row>
                <Form.Item className="register__form__btn-socmed">
                  <div className="register__form__socmed-box">
                    <ButtonFacebook
                      className="register__form__socmed-button"
                      onSubmit={this.handleRegisterGoogle}
                    >
                      {strings.facebook}
                    </ButtonFacebook>
                    <ButtonGoogle
                      className="register__form__socmed-button"
                      onSubmit={this.handleRegisterGoogle}
                    >
                      {strings.google}
                    </ButtonGoogle>
                  </div>
                  <center className="register__form__direct-login">
                    {strings.formatString(
                      strings.register_quote,
                      <a className="register__form__link" href="/">
                        {strings.register_now}
                      </a>
                    )}
                  </center>
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
  const { isAuthenticated, token, message, isLoading } = state.authentication;
  return {
    isAuthenticated,
    token,
    message,
    isLoading
  };
};

export default connect(
  mapStateToProps,
  { registerWithGoogle, registerForm }
)(RegisterForm);
