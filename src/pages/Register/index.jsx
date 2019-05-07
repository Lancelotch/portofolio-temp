import React, { Component } from "react";
import { Input, Form, Icon, Row, Col, Affix, Alert } from "antd";
import ButtonFacebook from "../../components/Button/SocialMedia/Facebook";
import ButtonGoogle from "../../components/Button/SocialMedia/Google";
import { connect } from "react-redux";
import "./style.sass";
import logoMonggoPesen from "../../assets/img/logo_monggopesen.png";
import strings from "../../localization/localization";
import {
  registerWithGoogle,
  registerForm,
  loading,
  loginWithGoogle
} from "../../store/actions/authentication";
import { Link } from "react-router-dom";
import {
  rulesName,
  rulesEmail,
  rulesPassword,
  RegistrationaAlert,
  RegistrationSubmitButton
} from "./registerContainer";
import ModalSuccess from "../../modal/ModalRegisterSuccess"
import history from "../../routers/history"

const FormItem = Form.Item;

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated,
      nextPage: "",
      status: null,
      message: "",
      modalStatus: false
    };
  }

  openModal = () => {
    console.log("ini di open modal")
    this.setState({
      modalStatus : true
    })
    setTimeout(() => {
      this.setState({
        modalStatus : false
      })
      history.push("/")
    }, 3000)
  }

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        nextPage: this.props.location.state.nextPage
      });
    }
  }

  validation(form,values){
    if(this.props.isAuthenticated){
      this.openModal()
    }else{
      form.setFields({
        email: {
          value: values.email,
          errors: [new Error(this.props.message)]
        }
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      const history = this.props.history;
      if (!err) {
        const linkCheckout = "/checkout";
        if (this.state.nextPage === "checkout") {
          await this.props.registerForm(history, values, linkCheckout);
          this. validation(this.props.form,values) 
        } else {
          await this.props.registerForm(history, values);  
            this. validation(this.props.form,values)          
        }
      }else{
        this.setState({
          modalStatus: false
        })
      }
    });
  };

  handleRegisterGoogle = request => {
    this.props.loginWithGoogle(this.props.history, request);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Row className="heads">
          <Col md={{ span: 14 }}>
            <div
              className="scrollable-container"
              ref={node => {
                this.container = node;
              }}
            >
              <Affix target={() => this.container}>
                <div className="register_Background" />
              </Affix>
            </div>
          </Col>
          <Col md={{ span: 10 }}>
            <div className="register">
              <Link to="/">
                <img
                  className="register__logo"
                  src={logoMonggoPesen}
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
                  {getFieldDecorator("password",rulesPassword())(
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
                  {/* <button onClick={this.props.loading}>gonee</button> */}
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
                      <Link
                        to={{
                          pathname: "/login",
                          state: { nextPage: "/" }
                        }}
                      >
                        {strings.register_login}
                      </Link>
                    )}
                  </center>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
        <ModalSuccess modalStatus={this.state.modalStatus} email={this.props.message.email}/>
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
  { registerWithGoogle, registerForm, loading, loginWithGoogle }
)(RegisterForm);
