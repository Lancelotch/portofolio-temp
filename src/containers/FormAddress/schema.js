import * as yup from "yup";

export const schema = yup.object().shape({
    labelName: yup.string().required(),
    receiverName: yup.string().required(),
    phoneNumber: yup.string().required(),
    city: yup.string().required(),
    fullAddress: yup.string().required(),
    province: yup.string().required(),
    provinceId: yup.string().required(),
    subdistrictId: yup.string().required(),
    subdistrict: yup.string().required(),
    cityId: yup.string().required(),
    zipcode: yup.string().required(),
    geolocation: yup.string().required(),
    isDefault: yup.string().required()
})