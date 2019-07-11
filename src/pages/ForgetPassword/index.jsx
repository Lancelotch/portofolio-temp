import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Button, Row, Col, Form, Alert } from "antd";
import "./style.sass";
import authentication from "../../api/services/authentication";
import history from "../../routers/history";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { rulesEmail } from "../Register/registerContainer";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailSend: false,
      email: "",
      emailNotRegister: "",
      errorMessage: "",
      showMessage: false
    };
  }

  submitForgotPassword = param => {
    if (param.message === "OK") {
      this.setState({ isEmailSend: true });
    } else {
      this.setState({
        errorMessage: param.data.message,
        showMessage: true
      });
    }
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields(async (err, values) => {
      if (!err) {
        try {
          const response = await authentication.forgotPassword({
            email: values.email
          });
          this.submitForgotPassword(response);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  handleClose = () => {
    return history.push("/login");
  };

  handleInvalidEmail = () => {
    this.setState({ showMessage: false });
  };

  render() {
    const isEnabled = this.state.email.length > 0;
    const FormItem = Form.Item;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="forget-password">
        <div
          className={
            this.state.isEmailSend
              ? "forget-password__box-forget-alert"
              : "forget-password__box-forget"
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img src={monggopesen_logo} alt="Monggopesen" />
          </div>
            {this.state.isEmailSend ? (
              <div>
                <Alert
                  showIcon
                  message="Email pengaturan kata sandi telah dikirim"
                  type="success"
                  style={{ marginTop: "120px" }}
                  closable
                  onClose={this.handleClose}
                  description="Silahkan cek email yang sudah kami kirim, dan ikuti instruksi yang sudah kami sediakan
                  untuk pengaturan perubahan kata sandi."
                />
              </div>
            ) : (
              <div className="forget-password__box-forget-content">
                <div>
                  <p className="forget-password__title">Lupa Kata Sandi</p>
                  <p className="forget-password__content">
                    Masukkan alamat email yang terdaftar, kami akan
                    <br />
                    mengirimkan link untuk mengatur ulang kata sandi.
                  </p>
                  <Form onSubmit={this.handleSubmit}>
                    {this.state.emailNotRegister}
                    <FormItem>
                      {getFieldDecorator("email", rulesEmail())(
                        <Input
                          placeholder="Email"
                          onChange={this.handleEmailChange}
                          className={
                            this.state.showMessage
                              ? "forget-password__input-email-error"
                              : "forget-password__input-email"
                          }
                          name="email"
                          onKeyUp={this.handleInvalidEmail}
                        />
                      )}
                      {this.state.showMessage ? (
                        <div className="forget-password__error-message">
                          {this.state.errorMessage}
                        </div>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <Button
                        htmlType="submit"
                        disabled={!isEnabled}
                        className={
                          isEnabled
                            ? "forget-password__button-submit"
                            : "forget-password__button-submit-disabled"
                        }
                      >
                        Kirim Link
                      </Button>
                    </FormItem>
                  </Form>
                </div>
                <div className="forget-password__content-bottom">
                  <span>
                    Silahkan{" "}
                    <Link
                      className="forget-password__link-bottom"
                      to={{
                        pathname: "/login"
                      }}
                      style={{ color: "#F63700" }}
                    >
                      Login
                    </Link>{" "}
                    jika kamu sudah punya akun,
                    <br />
                    atau{" "}
                    <Link
                      className="forget-password__link-bottom"
                      to={{
                        pathname: "/register"
                      }}
                      style={{ color: "#F63700" }}
                    >
                      Register
                    </Link>{" "}
                    untuk mulai belanja barang-barang kece.
                  </span>
                </div>
              </div>
            )}
          <div />
        </div>
      </div>
    );
  }
}

const ForgetPasswordForm = Form.create({})(ForgetPassword);

export default ForgetPasswordForm;