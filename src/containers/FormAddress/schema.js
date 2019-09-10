import * as yup from "yup";
import strings from "../../localization/localization";

export const schema = yup.object().shape({
    labelName: yup.string().required(strings.validation_required_address_name),
    receiverName: yup.string().required(strings.validation_required_receiver),
    phoneNumber: yup.string().required(strings.validation_required_phone_number),
    fullAddress: yup.string().required(strings.validation_required_full_address),
    province: yup.string().required(strings.validation_required_province),
    provinceId: yup.string().required(strings.validation_required_province),
    city: yup.string().required(strings.validation_required_city),
    cityId: yup.string().required(strings.validation_required_city),
    subdistrictId: yup.string().required(strings.validation_required_subdistrict),
    subdistrict: yup.string().required(strings.validation_required_subdistrict),
    zipcode: yup.string().required(strings.validation_required_zipcode),
    geolocation: yup.object().default({}).required(),
    isDefault: yup.boolean().default(false).required()
})