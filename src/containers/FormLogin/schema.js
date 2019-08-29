import * as yup from "yup";
import strings from "../../localization/localization";
import {regexEmail} from "../../library/regex";

export const schema = yup.object().shape({
  email: yup.string().matches(regexEmail,strings.email_valid).required(strings.email_quote_required),
  password: yup.string().required(strings.password_required)
});
