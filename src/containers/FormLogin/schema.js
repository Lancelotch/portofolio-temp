import * as yup from "yup";
import strings from "../../localization/localization";

export const schema = yup.object().shape({
  email: yup.string().email('invalid').required('required'),
  password: yup.string().required('required')
});
