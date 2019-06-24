import React, { Component } from "react";
import "./style.sass";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import { Input, Button, Row, Col, Form } from "antd";
import history from "../../routers/history";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = () => {
    const email = this.state.email
    console.log(email);
    return history.push("/");
  };

  render() {
    const isEnabled = this.state.email.length > 0;
    const FormItem = Form.Item
    return (
      <div className="forget-password">
        <Row className="forget-password__box-forget">
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "80px"
            }}
          >
            <img src={monggopesen_logo} alt="Monggopesen" />
          </Col>
          <Col>
            <p className="forget-password__title">Lupa Kata Sandi</p>
            <p className="forget-password__content">
              Masukkan alamat email yang terdaftar, kami akan mengirimkan link
              untuk mengatur ulang kata sandi.
            </p>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                <Input
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  className="forget-password__input-email"
                />
              </FormItem>
              <FormItem>
                <Button
                  htmlType="submit"
                  disabled={!isEnabled}
                  className={isEnabled?"forget-password__button-submit":"forget-password__button-submit-disabled"}
                >
                  Kirim Link
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ForgetPassword;
