import * as yup from 'yup';
import strings from "../../localization/localization";
import { regexPassword } from '../../library/regex';

export const schema = yup.object().shape({
  password: yup.string().matches(regexPassword, strings.register_password_quote).required(strings.password_required)
})