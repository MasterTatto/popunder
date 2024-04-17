import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './language/en.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },

        },
        lng: localStorage.getItem('lang') || 'ru'
    })

export default i18n
