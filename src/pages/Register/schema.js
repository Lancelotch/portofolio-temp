import * as yup from "yup";
import strings from "../../localization/localization";

const regexPassword = RegExp(/(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}/);
const regexUrl = RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);
export const schema = yup.object().shape({
  name: yup.string().required(strings.register_name),
  email: yup.string().matches(regexUrl, strings.register_email).required(strings.register_email_quote),
  password: yup.string().matches(regexPassword, strings.register_password_quote).required(strings.register_password)
});
