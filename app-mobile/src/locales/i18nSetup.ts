import * as Localization from 'expo-localization';
import I18n, { fallbacks } from 'i18n-js';

fallbacks = true;

I18n.translations = {
  en: require('../locales/en.json') as Translations,
  pt: require('../locales/pt.json') as Translations,
};

I18n.Locales = Localization.locale;

export default I18n;
