import * as yup from "yup";
import strings from "../../localization/localization";

const regexName = RegExp(/(?=.*[a-zA-Z])[a-zA-Z .]+$/)
const regexPassword = RegExp(/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}/);
const regexEmail = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const schema = yup.object().shape({
  name: yup.string().matches(regexName,strings.register_pattern_quote).required(strings.register_name),
  email: yup.string().matches(regexEmail, strings.register_email).required(strings.register_email_quote),
  password: yup.string().matches(regexPassword, strings.register_password_quote).required(strings.register_password)
});
