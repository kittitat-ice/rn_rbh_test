import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import th from './th';
import en from './en';
import 'intl-pluralrules';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  th: {
    translation: th,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'th',
  fallbackLng: 'th',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;