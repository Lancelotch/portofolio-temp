import React, { Component } from "react";
import "./style.sass";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { Input, Button, Row, Col, Form, Alert } from "antd";
import history from "../../routers/history";
// import category from "../../api/services/category";
// import Axios from "axios";
// import { rulesEmail } from "../Register/registerContainer";
import authentication from "../../api/services/authentication";

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
          if (response.message === "OK") {
            this.setState({ isEmailSend: true });
          } else {
            this.setState({
              errorMessage: response.data.message,
              showMessage: true
            });
          }
          console.log(response);
        } catch (error) {
          console.log(this.state.errorMessage);
        }
      }
    });
  };

  handleClose = () => {
    console.log("close");
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
        <Row
          className={
            this.state.isEmailSend
              ? "forget-password__box-forget-alert"
              : "forget-password__box-forget"
          }
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img src={monggopesen_logo} alt="Monggopesen" />
          </Col>
          <Col>
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
                    {getFieldDecorator("email")(
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
                <div className="forget-password__content-bottom">
                  Silahkan{" "}
                  <span className="forget-password__link-bottom">
                    <a href="/login">Log In</a>
                  </span>{" "}
                  jika kamu sudah punya akun,
                  <br />
                  atau{" "}
                  <span className="forget-password__link-bottom">
                    <a href="/register">Daftar</a>
                  </span>{" "}
                  untuk mulai belanja barang-barang kece.
                </div>
              </div>
            )}
          </Col>
          <Col />
        </Row>
      </div>
    );
  }
}

const ForgetPasswordForm = Form.create({})(ForgetPassword);

export default ForgetPasswordForm;
