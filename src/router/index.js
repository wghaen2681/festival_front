import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store /*, ssrContext */ }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // 在 router 帶使用者前往頁面前先做判斷式：如果使用者要去需要登入的頁面則需要事先登入，如果使用者要去管理員頁面卻不是管理員會被丟回首頁
  // Router.beforeEach((to, from, next) => {
  // })

  // 在 router 帶使用者前往頁面後，將分頁的標題改為該分頁的標題
  Router.afterEach((to, from) => {
    document.title = to.meta.title
    if (to.meta.login && store.state.user.user.account.length === 0) {
      Router.push('/login')
    } else if (to.meta.admin && store.state.user.user.role !== 1) {
      Router.push('/')
    }
  })

  return Router
}
