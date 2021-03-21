export const getUserLang = (defaultLang: string = 'en') => {
  const [lang, locale] = navigator.language.split('-')
  return lang || defaultLang
}