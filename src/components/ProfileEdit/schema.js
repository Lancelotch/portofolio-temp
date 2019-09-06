import * as yup from "yup";
import strings from "../../localization/localization";

export const schema = yup.object().shape({
  name: yup.string().required(strings.profile_error_message)
});
