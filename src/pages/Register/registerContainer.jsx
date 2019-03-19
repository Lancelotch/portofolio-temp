import React, { Component } from 'react';
import { Button } from "antd";
import strings from "../../localization/localization";
import Loading from '../../components/Loading';

class RegistrationSubmitButton extends Component {
  render() {
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
  }
}
export default RegistrationSubmitButton;


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
      }
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
      }
    ]
  };
};


