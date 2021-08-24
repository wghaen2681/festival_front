import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  // 定義一個變數儲存使用者狀態的資料
  const store = new Vuex.Store({
    modules: {
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  // 回傳紀錄使用者狀態資料的常數
  return store
}
