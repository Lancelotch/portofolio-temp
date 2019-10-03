import * as yup from "yup";
export const regexMessage = RegExp(/([a-zA-Z- .,]){20,}/);
export const schema = yup.object().shape({
    note: yup.string().required('Harus pilih alasan atau isi form lainya')
});
