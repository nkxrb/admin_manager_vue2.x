import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh-cn'
import axios from '@/utils/network.js'

Vue.use(VueI18n)
const loadedLanguages = ['zh-cn']

const i18n = new VueI18n({
  locale: loadedLanguages[0],
  fallbackLocale: loadedLanguages[0],
  messages: { [loadedLanguages[0]]: zh }
})

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers = { 'Accept-Language': lang, ...axios.defaults.headers }
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  // 如果语言相同
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // 如果尚未加载语言
  return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/${lang}.js`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}

export default i18n
