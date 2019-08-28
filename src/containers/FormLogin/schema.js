import * as yup from "yup";
import strings from "../../localization/localization";


const regexEmail = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export const schema = yup.object().shape({
  email: yup.string().matches(regexEmail,strings.email_valid).required(strings.email_quote_required),
  password: yup.string().required(strings.password_required)
});
