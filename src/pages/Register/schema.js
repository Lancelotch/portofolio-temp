import * as yup from "yup";
import strings from "../../localization/localization";
import { regexName, regexPassword } from "../../library/regex";

export const schema = yup.object().shape({
  name: yup.string().matches(regexName,strings.register_pattern_quote).required(strings.register_name),
  email: yup.string().email(strings.email_valid).required(strings.email_quote_required),
  password: yup.string().matches(regexPassword, strings.register_password_quote).required(strings.password_required)
});
