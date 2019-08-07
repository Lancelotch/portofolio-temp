import React, { Component, Fragment } from "react";
import { Card, Input, Button, Form } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import * as yup from "yup";
import { Formik } from "formik";
import "./style.sass";
import { apiPostWithToken, apiGetWithToken } from "../../api/services";
import { PATH_PUBLIC } from "../../api/path";
import notification from "../../library/notification";

class PasswordDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptReset: true
    };
  }

  resetForm = values => {
    values.oldPassword = "";
    values.newPassword = "";
  };

  onSubmitPassword = async ({ oldPassword, newPassword }) => {
    const request = {
      oldPassword: oldPassword,
      password: newPassword
    };
    try {
      const response = await apiPostWithToken(
        PATH_PUBLIC.PUBLIC_CHANGE_PASSWORD,
        request
      );
      if (response) return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  onResetPassword = async () => {
    try {
      const response = await apiGetWithToken(PATH_PUBLIC.PUBLIC_RESET_PASSWORD);
      response && notification(
        "Berhasil Mengirim Tautan.",
        "Kami sudah mengirimkan tautan, silahkan periksa kotak masuk email kamu.",
        "success"
      );
      this.setState({
        ...this.state, acceptReset: true
      })
    } catch (error) {
      console.log(error);
      this.setState({
        ...this.state, acceptReset: true
      })
    }
  }

  schema = () =>
    yup.object().shape({
      oldPassword: yup.string().required("Password lama harus di isi"),
      newPassword: yup
        .string()
        .required("Password baru harus di isi")
        .min(6, "Password kurang dari 6 digit")
    });

  onCaptchaChange = (value) => {
    this.setState({
      ...this.state,
      acceptReset: value ? false : true
    });
  };

  render() {
    return (
      <div className="mp-password-container">
        <Card
          title={
            <Fragment>
              <span className="mp-text-title-header">Password</span>
              <br />
              <span className="mp-text-description-header">
                Jangan berikan Password anda pada siapapun untuk keamanan akun
                anda
              </span>
            </Fragment>
          }
        >
          <div className="mp-body-password-container">
            <Formik
              initialValues={{ oldPassword: "", newPassword: "" }}
              onSubmit={async (values, {setErrors}) => {
                var isSuccess = false;
                await this.onSubmitPassword(values).then((response)=>{
                  response ? isSuccess = true : isSuccess = false;
                })
                if (isSuccess) {
                  notification(
                    "Berhasil Mengganti password.",
                    "Kami sudah mengganti password lama anda dengan yang baru cup-cup waw-waw.",
                    "success"
                  );
                } else {
                  setErrors({oldPassword: "Password yang anda masukan kurang tepat"})
                }
              }}
              validationSchema={this.schema}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mp-item-password-container">
                    <label className="mp-label-password">Password Lama</label>
                    <Input
                      name="oldPassword"
                      id="oldPassword"
                      onChange={handleChange}
                      value={values.oldPassword}
                      style={{ width: "30%" }}
                      className={
                        errors.oldPassword && touched.oldPassword
                          ? "mp-input-error"
                          : null
                      }
                    />
                    <br />
                    {errors.oldPassword && touched.oldPassword && (
                      <Fragment>
                        <div className="mp-label-password" />
                        <span className="mp-label-error">
                          {errors.oldPassword}
                        </span>
                      </Fragment>
                    )}
                  </div>
                  <div className="mp-item-password-container">
                    <label className="mp-label-password">Password Baru</label>
                    <Input.Password
                      name="newPassword"
                      id="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      style={{ width: "30%" }}
                      className={
                        errors.newPassword && touched.newPassword
                          ? "mp-input-password-error"
                          : null
                      }
                    />
                    <br />
                    {errors.newPassword && touched.newPassword && (
                      <Fragment>
                        <div className="mp-label-password" />
                        <span className="mp-label-error">
                          {errors.newPassword}
                        </span>
                      </Fragment>
                    )}
                  </div>
                  <div className="mp-label-password" />
                  <Button htmlType="submit" className="mp-button-password">
                    Terapkan Password
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
        <div style={{ marginBottom: 24 }} />
        <Card
          title={
            <Fragment>
              <span className="mp-text-title-header">Reset Password</span>
              <br />
              <span className="mp-text-description-header">
                Klik tombol Reset Password jika ingin melakukan reset pada
                password akun monggopesen kamu.
              </span>
            </Fragment>
          }
        >
          <div className="mp-captcha-change-password">
            <ReCAPTCHA
              sitekey="6LfyurAUAAAAAGkMgUQTD1rDsh81QAxvC5oqrNFv"
              onChange={(value)=>this.onCaptchaChange(value)}
            />
          </div>
          <div>
            <Button
              disabled={this.state.acceptReset}
              className={
                !this.state.acceptReset
                  ? "mp-button-password"
                  : "mp-button-password__disabled"
              }
              onClick={this.onResetPassword}
            >
              Reset Password
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default PasswordDashboard;
