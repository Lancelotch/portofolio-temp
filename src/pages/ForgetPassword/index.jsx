import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Alert } from "antd";
import Button from '../../components/Button'
import "./style.sass";
import history from "../../routers/history";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import Input from "../../components/Input";
import { Formik } from 'formik';
import schema from './schema';
import Authentication from '../../repository/Authentication'

export default function ForgetPassword (){
  const [isEmailSend , setIsEmailSend] = useState(false)
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const isDisabled = email.length > 0 ? false : true;

  async function handleSubmit (values){
    const forgotPassword = await Authentication.forgotPassword({params : values})
    if(forgotPassword.status === 200){
      setIsEmailSend(true)
    }else{
      setErrorMessage(forgotPassword.response.data.message)
    }
  }

  function handleClose () {
    return history.push("/login");
  };

  function handleChangeEmail (event, setFieldValue) {
    setEmail(event.target.value)
    setFieldValue('email',event.target.value)
  }

  return (
    <div className="forget-password">
    <div
      className={
        isEmailSend
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
      {isEmailSend ? (
        <div>
          <Alert
            showIcon
            message="Email pengaturan kata sandi telah dikirim"
            type="success"
            style={{ marginTop: "120px" }}
            closable
            onClose={handleClose}
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
          <Formik 
            onSubmit={values => {
              handleSubmit(values)
            }}
            initialValues={{
              email : ''
            }}
            validationSchema={schema}
            validateOnChange={false}
            render={({
              values,
              errors,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Item
                  validateStatus={
                    errors.email || errorMessage ? 'error' : 'success'
                  }
                  help={errors.email ? errors.email : errorMessage }
                >
                <Input
                  size="large"
                  placeholder="Email"
                  name="email"
                  onChange={e => handleChangeEmail(e,setFieldValue)}
                  value={values.email}
                />
                </Form.Item>
                <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  width="full"
                  size="large"
                  disabled={isDisabled}
                >
                  Kirim Link
                </Button>

                </Form.Item>
              </Form>
            )}
          />
          </div>
          <div className="forget-password__content-bottom">
            <span>
              Silahkan{" "}
              <Link
                className="forget-password__link-bottom"
                to={{
                  pathname: "/login"
                }}
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
  )
}
