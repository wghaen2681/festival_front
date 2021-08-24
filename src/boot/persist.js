import createPersistedState from 'vuex-persistedstate'
import { LocalStorage } from 'quasar'

export default async ({ app, router, store, Vue }) => {
  window.setTimeout(() => {
    createPersistedState({
      key: 'festival',
      paths: [
        'user'
      ],
      storage: {
        getItem: key => LocalStorage.getItem(key),
        setItem: (key, value) => LocalStorage.set(key, value),
        removeItem: key => LocalStorage.remove(key)
      }
    })(store)
  }, 0)
}
