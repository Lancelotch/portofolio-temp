// import React, { Fragment, useState } from 'react';
// import { Card, Form, Row, Col } from "antd";
// import Button from '../../components/Button'
// import Input from '../../components/Input'
// import ReCAPTCHA from "react-google-recaptcha";
// import { Formik } from "formik";
// import { PATH_PUBLIC } from "../../api/path";
// import notification from "../../library/notification";
// import schemaPassword from './schema';
// import PasswordRepo from '../../repository/Password/index'
// import "./style.sass";

// export default function Password() {
//   const [acceptReset, setAcceptReset] = useState(true)
//   const [errorMessage, setErrorMessage] = useState('')

//   async function onSubmitPassword({ oldPassword, newPassword }, resetForm) {
//     const params = {
//       oldPassword: oldPassword,
//       password: newPassword
//     };
    
//     const response = await PasswordRepo.change({params})
//      if (response.status === 200) {
//         resetForm({})
//         notification(
//           "Berhasil Menetapkan Password Baru.",
//           "Akun kamu makin aman nih, ingat untuk selalu berhati-hati dengan tidak memberikan password kamu kepada siapapun",
//           "success"
//         );
//       } else {
//         setErrorMessage('Password yang anda masukan kurang tepat')
//       }
//   };

//   async function onResetPassword () {
//     const response = await PasswordRepo.reset(PATH_PUBLIC.PUBLIC_RESET_PASSWORD);
//     if(response.status === 200){
//       setAcceptReset(true)
//       notification(
//         "Berhasil Mengirim Tautan.",
//         "Kami sudah mengirimkan tautan, silahkan periksa kotak masuk email kamu.",
//         "success"
//       );
//     } else {
//       setAcceptReset(true)
//     }
//   }

//   function onCaptchaChange(value) {
//     if (value) {
//       setAcceptReset(false)
//     }
//   };

//   return (
//     <div className="mp-password-container">
//       <Card
//         title={
//           <Fragment>
//             <span className="mp-text-title-header">Password</span>
//             <br />
//             <span className="mp-text-description-header">
//               Jangan berikan Password anda pada siapapun untuk keamanan akun
//               anda
//             </span>
//           </Fragment>
//         }
//       >
//         <div className="mp-body-password-container">
//           <Formik
//             initialValues={{ oldPassword: "", newPassword: "" }}
//             validateOnChange={false}
//             onSubmit={async (values, { setErrors, resetForm }) => {
//               onSubmitPassword(values, resetForm)
//             }}
//             validationSchema={schemaPassword}
//           >
//             {({ values, errors, touched, handleChange, handleSubmit }) => (
//               <Form onSubmit={handleSubmit} >
//                 <div className="mp-item-password-container">
//                   <Row>
//                     <Col md={4}>
//                       <label className="mp-label-password" >Password Lama</label>
//                     </Col>
//                     <Col md={20}>
//                       <Form.Item
//                         validateStatus={(errors.oldPassword || errorMessage) && 'error'}
//                         help={errors.oldPassword ? errors.oldPassword : errorMessage}
//                       >
//                         <Input
//                           name="oldPassword"
//                           id="oldPassword"
//                           htmltype="password"
//                           onChange={handleChange}
//                           value={values.oldPassword}
//                           style={{ width: "30%" }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={4}>
//                       <label className="mp-label-password">Password Baru</label>
//                     </Col>
//                     <Col md={20}>
//                       <Form.Item
//                         validateStatus={errors.newPassword ? 'error' : 'success'}
//                         help={errors.newPassword && errors.newPassword}
//                       >
//                         <Input
//                           name="newPassword"
//                           id="newPassword"
//                           type="password"
//                           value={values.newPassword}
//                           onChange={handleChange}
//                           style={{ width: "30%" }}
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </div>
//                 <div className="mp-label-password" />
//                 <Button htmlType="submit" type="primary" >
//                   Terapkan Password
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </Card>
//       <div style={{ marginBottom: 24 }} />
//       <Card
//         title={
//           <Fragment>
//             <span className="mp-text-title-header">Reset Password</span>
//             <br />
//             <span className="mp-text-description-header">
//               Klik tombol Reset Password jika ingin melakukan reset pada
//               password akun monggopesen kamu.
//             </span>
//           </Fragment>
//         }
//       >
//         <div className="mp-captcha-change-password">
//           <ReCAPTCHA
//             sitekey={process.env.REACT_APP_KEY_CAPTCHA}
//             onChange={(value) => onCaptchaChange(value)}
//           />
//         </div>
//         <div>
//           <Button
//             disabled={acceptReset}
//             className={
//               !acceptReset
//                 ? "mp-button-password"
//                 : "mp-button-password__disabled"
//             }
//             onClick={onResetPassword}
//           >
//             Reset Password
//           </Button>
//         </div>
//       </Card>
//     </div>
//   )
// }