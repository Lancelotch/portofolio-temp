import * as yup from "yup";
import strings from "../../localization/localization";
export const regexMessage = RegExp(/[a-zA-Z0-9]{20,}/);
export const schema = yup.object().shape({
    rating: yup.number().required(),
    message: yup.string().matches(regexMessage, "Ulasan hanya boleh kosong atau memiliki minimal 20 karakter"),
    images: yup.array().of(yup.object().shape({
        mediumUrl: yup.string(),
        alt: yup.string(),
        isDefault: yup.boolean().required()
    })),
    isAnonymous:yup.boolean().required()
});
