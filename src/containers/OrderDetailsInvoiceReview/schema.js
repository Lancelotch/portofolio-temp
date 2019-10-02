import * as yup from "yup";
import strings from "../../localization/localization";
export const regexMessage = RegExp(/([a-zA-Z- .,]){20,}/);
export const schema = yup.object().shape({
    rating: yup.number().required(),
    message: yup.string().matches(regexMessage, strings.review_dashboard_quote),
    images: yup.array().of(yup.object().shape({
        isDefault: yup.boolean().required().default((false))
    })),
    isAnonymous:yup.boolean().required().default((false)),
    invoiceId: yup.string()
});
