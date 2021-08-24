// 不是 quasar 內建的套件，都要透過 boot 內的檔案引用
// 藉由 boot 資料夾，引用 axios，使 axios 功能可以在整個網頁中被使用到
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
// ^ ^ ^ this will allow you to use this.$axios
//       so you won't necessarily have to import axios in each vue file

const api = axios.create({ baseURL: 'http://localhost:3000/' })
Vue.prototype.$api = api
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, api }
