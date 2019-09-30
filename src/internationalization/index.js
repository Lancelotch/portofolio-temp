import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import common_id from "../assets/languages/common/id.json";
import validation_id from "../assets/languages/validation/id.json";
import error_id from "../assets/languages/error/id.json";
import login_id from "../assets/languages/login/id.json";

i18n
    .use(initReactI18next)
    .init({
        lng: 'id',
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        },
        resources: {            
            id: {
                common: common_id,
                validation: validation_id,
                error: error_id,
                login: login_id
            }
        }
    })

export default i18n;