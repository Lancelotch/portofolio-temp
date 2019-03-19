import strings from "../../localization/localization";



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
