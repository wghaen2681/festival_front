<template lang="pug">
q-layout#mainLayout(view='hHh Lpr fff')

  //- header
  q-header.bg-white(elevated)
    q-toolbar.text-black
      q-btn(flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen")
      q-toolbar-title.text-center#logo
        router-link(to='/' style="display: inline-block;")
          img(alt="Website logo" src="../assets/logo.svg" style="width: 190px; padding: 15px; vertical-align: middle; ")
      div
        q-btn#btn_app(flat round icon="apps")
          q-menu(auto-close)
            q-list
              q-item(clickable v-close-popup v-if="!user.islogin" to="/login")
                q-item-section 登入
              q-item(clickable v-close-popup v-if="!user.islogin" to="/register")
                q-item-section 註冊
              q-item(clickable v-close-popup v-if="user.islogin" @click="logout")
                q-item-section 登出
              q-item(clickable v-close-popup v-if="user.islogin  && !user.isAdmin" to="/cart")
                q-item-section 購物車
              q-item(clickable v-close-popup v-if="user.islogin  && !user.isAdmin" to="/order")
                q-item-section 訂單
              q-item(clickable v-close-popup v-if="user.islogin  && !user.isAdmin" to="/profile")
                q-item-section 個人檔案
              q-item(clickable v-close-popup v-if="user.islogin  && user.isAdmin" to="/admin/member")
                q-item-section 管理後台
        q-btn#btn_login(v-if="!user.islogin" flat round icon="login" to="/login")
        q-btn#btn_register(v-if="!user.islogin" flat round icon="person_add" to="/register")
        q-btn#btn_logout(v-if="user.islogin" flat round icon="logout" @click="logout")
        q-btn#btn_shopping_cart(v-if="user.islogin  && !user.isAdmin" flat round icon="shopping_cart" to="/cart")
        q-btn#btn_order(v-if="user.islogin  && !user.isAdmin" flat round icon="receipt_long" to="/order")
        q-btn#btn_account_circle(v-if="user.islogin  && !user.isAdmin" flat round icon="account_circle" to="/profile")
        q-btn#btn_manage_accounts(v-if="user.islogin  && user.isAdmin" flat round icon="manage_accounts" to="/admin/member")

  //- drawer
  q-drawer.bg-grey-1#drawer_mobile(:width="250" show-if-above bordered persistent behavior="mobile" v-model="leftDrawerOpen")
    q-list.q-py-lg
      EssentialLink.q-py-md(v-for="link in essentialLinks" :key="link.title" v-bind="link")
  q-drawer.bg-grey-1#drawer_desktop(:width="250" show-if-above bordered persistent behavior="desktop" v-model="leftDrawerOpen")
    q-list.q-py-lg
      EssentialLink.q-py-md(v-for="link in essentialLinks" :key="link.title" v-bind="link")

  //- 網站內容區
  //- q-page-container#page_container
  q-page-container#page_container
    router-view(:key='$route.fullPath')

  //- q-footer.bg-dark.text-white
  //-   q-toolbar
  //-     q-toolbar-title
  //-       q-avatar
  //-         img(src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg")
  //- .q-pa-md#footer
  //-   .row.container
  //-     .col
  //-       span.text-white © Festival_Center 2021
  //-     .col.text-right
  //-       span.text-white 台灣
</template>

<script>
import { api } from 'boot/axios'
import EssentialLink from 'components/EssentialLink.vue' // 引用 drawer 連結元件

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    // 定義 drawer 連結元件內容為一個常數
    const linksData = [
      {
        title: '關於我們',
        icon: 'import_contacts',
        link: '/about'
      },
      {
        title: '進行中節慶',
        icon: 'date_range',
        link: '/progress'
      },
      {
        title: '季節分類',
        icon: 'surfing',
        link: '/summer'
      },
      {
        title: '商店',
        icon: 'store',
        link: '/store'
      },
      {
        title: '問題諮詢',
        icon: 'help',
        link: '/assist'
      }
    ]
    return {
      // drawer
      leftDrawerOpen: true, // 問題：預設 leftDrawer 收合狀態為 false，但是不知道為什麼網頁重新整理後 leftDrawer 會是開啟的狀態
      essentialLinks: linksData,
      mobileData: true,
      bluetooth: false
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    async logout () {
      try {
        await api.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$store.commit('user/logout')
        if (this.$route.path !== '/') this.$router.push('/')
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登出成功'
        })
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '發生錯誤'
        })
      }
    }
  }
}
</script>
