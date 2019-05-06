import React from 'react';
import { Button, Alert } from "antd";
import strings from "../../localization/localization";
import Loading from '../../components/Loading';

export const RegistrationSubmitButton = props => {
  const {isLoading} = props
    return (
    isLoading ? (
      <Loading />
    ) : (
      <Button
        className="register__form__button-register color-button"
        size={"large"}
        htmlType="submit"
        type="primary"
      >
        <p className="register__form__button-register-text">
          {strings.login_register}
        </p>
      </Button>
    )
  );
}

// // export const AlertLogin = props =>{
// //   const {message,isErorloaded} = props;
// //   return <div className="login-form__error-box">
// //     {isErorloaded ? (
// //       <p className="login-form__error-notif">{errorMessage}</p>
// //     ) : null}
// //   </div>
// }

export const RegistrationaAlert = props => {
  // const { message } = props;
  // console.log("ini alert",props)
  return (
    <div>
        <Alert
          message={props.message.message}
        >
        </Alert>
    </div>
  );
};

export const rulesName = () => {
  return {
    rules: [
      {
        required: true,
        message: strings.register_name
      },
      {
        pattern: /(?=.*[a-zA-Z])[a-zA-Z .]+$/,
        message: strings.register_pattern_quote
      }
    ]
  };
};

export const rulesEmail = () => {
  return {
    rules: [
      {
        type: "email",
        message: strings.register_email
      },
      {
        required: true,
        message: strings.register_email_quote
      },  
    ]
  };
};

export const rulesPassword = () => {
  return {
    rules: [
      {
        required: true,
        message: strings.register_password
      },
      {
        pattern: /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}/,
        message: strings.register_password_quote
      },
    ]
  };
};
