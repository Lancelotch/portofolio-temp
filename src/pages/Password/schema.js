import * as yup from "yup";
import { regexPassword } from "../../library/regex";
import strings from "../../localization/localization";

const schemaPassword =
  yup.object().shape({
    oldPassword: yup.string().required("Password lama harus di isi"),
    newPassword: yup
      .string()
      .matches(regexPassword, strings.register_password_quote)
  });


export default schemaPassword


