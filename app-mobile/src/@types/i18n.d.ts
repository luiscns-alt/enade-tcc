declare module 'i18n-js' {
  interface Translations {
    [key: string]: { [key: string]: string };
  }

  interface I18n {
    translations: Translations;
    locale: string;
    fallbacks: boolean;

    t(key: string, options?: { [key: string]: string }): string;
  }

  const i18n: I18n;
  export default i18n;
}
