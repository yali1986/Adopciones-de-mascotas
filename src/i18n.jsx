import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

i18n

  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "cat",  //idioma en el que se inicia la app
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', "cat"],    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })

  export default i18n
