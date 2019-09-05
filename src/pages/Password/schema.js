import * as yup from "yup";

const schemaPassword =
  yup.object().shape({
    oldPassword: yup.string().required("Password lama harus di isi"),
    newPassword: yup
      .string()
      .required("Password baru harus di isi")
      .min(6, "Password kurang dari 6 digit")
  });


export default schemaPassword


