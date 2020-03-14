export const mutationTypes = {
  SET_LANG: 'SET_LANG'
}

export const state = () => {
  return {
    locale: 'ru',
    locales: ['ua', 'ru', 'en'],
    fallbackLocale: 'ru'
  }
}

export const mutations = {
  [mutationTypes.SET_LANG](state, locale) {
    state.locale = locale
  }
}

export const actions = {}

export const getters = {}
