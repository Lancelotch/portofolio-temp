import * as yup from "yup";

export const schema = yup.object().shape({
    labelName: yup.string().required(),
    receiverName: yup.string().required(),
    phoneNumber: yup.number().required(),
    fullAddress: yup.string().required(),
    province: yup.string().required(),
    provinceId: yup.string().required(),
    city: yup.string().required(),
    cityId: yup.string().required(),
    subdistrictId: yup.string().required(),
    subdistrict: yup.string().required(),
    zipcode: yup.string().required(),
    geolocation: yup.object().default({}).required(),
    isDefault: yup.boolean().default(false).required()
})