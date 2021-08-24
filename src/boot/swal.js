// 不是 quasar 內建的套件，都要透過 boot 內的檔案引用
// 藉由 boot 資料夾，引用 sweetalert，使 sweet alert 功能可以在整個網頁中被使用到
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)
