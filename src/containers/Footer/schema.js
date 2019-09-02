import * as yup from "yup";
import strings from "../../localization/localization";

export const schema = yup.object().shape({
  email: yup.string().email(strings.email_valid).required(strings.email_quote_required)
});
