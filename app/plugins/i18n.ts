import { createI18n } from 'vue-i18n'
import en from '../languages/en.json'
import th from '../languages/th.json'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (nuxtApp: any) => {
    const i18n = createI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'th',
        globalInjection: true,
        messages: { en, th }
    })

    nuxtApp.vueApp.use(i18n)
}
