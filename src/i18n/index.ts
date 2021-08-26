import { createI18n } from 'vue-i18n';

import zh from './lang/zh';
import en from './lang/en';

const i18n = createI18n({
    locale: localStorage.getItem('localeLang') || 'zh',
    messages: {
      zh,
      en,
    }
})

export function setLang(lang: string) {
  if (lang !== 'zh' && lang !== 'en') {
    return false;
  }
  i18n.global.locale = lang;
  localStorage.setItem('localeLang', i18n.global.locale);
};

export default i18n;
