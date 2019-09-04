import * as yup from "yup";

export const schema = yup.object().shape({
    labelName : yup.string().required(),
    receiverName: yup.string().required(),
    phoneNumber: yup.string().required(),
    province: yup.string().required(),
    city: yup.string().required(),
    subdistrict: yup.string().required(),
    zipcode: yup.string().required(),
    fullAddress: yup.string().required()
})