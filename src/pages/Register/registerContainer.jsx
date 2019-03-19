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

export const svgReactElement = (

<svg
      width="840px"
      height="900px"
      viewBox="0 0 840 900"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          x1="-13.4063232%"
          y1="92.6674292%"
          x2="114.914791%"
          y2="29.2926902%"
          id="linearGradient-1"
        >
          <stop stop-color="#00B5B7" offset="0%" />
          <stop stop-color="#007E80" offset="100%" />
        </linearGradient>
      </defs>
      <g
        id="Login-&amp;-Register"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <rect
          id="Mask"
          fill="url(#linearGradient-1)"
          x="0"
          y="0"
          width="840"
          height="900"
        />
      </g>
    </svg>

);
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


