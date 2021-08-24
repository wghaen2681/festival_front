<template lang="pug">
.container.q-my-auto
  .row.q-pb-xl.q-mb-xl
    .col
    .col-10.col-sm-8.col-md-6
      h4.q-pb-xl.q-mb-lg.text-center 註冊
      q-form(@submit="submit" @reset="reset" class="q-gutter-lg")
        q-input(filled v-model="form.name" label="請輸入名稱 *" hint="姓名或暱稱" :state="state.name")
        q-input(filled v-model="form.account" label="請輸入帳號 *" hint="帳號長度限制為 4 到 20 個字" :state="state.account" invalid-feedback="帳號格式不正確")
        q-input(filled type="string" v-model="form.password" label="請輸入密碼 *" hint="密碼長度限制為 4 到 20 個字" :state="state.password" invalid-feedback="密碼格式不正確")
        q-input(filled type="string" v-model="form.email" label="請輸入電子郵件 *" hint="xxxx@gmail.com" :state="state.email" invalid-feedback="電子郵件格式不正確")
        br
        .row.flex.justify-center
          q-btn(label="註冊" type="submit" color="primary")
          q-btn.q-mx-sm(flat label="重設" type="reset" color="primary")
    .col
</template>

<script>
import { api } from 'boot/axios'
import isEmail from 'validator/es/lib/isEmail'

export default {
  // 設定資料型態
  data () {
    return {
      form: {
        account: '',
        password: '',
        email: ''
      }
    }
  },
  // 讀取表格的狀態
  computed: {
    state () {
      const account = this.form.account
      const password = this.form.password
      const email = this.form.email
      return {
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20,
        email: email.length === 0 ? null : isEmail(email)
      }
    }
  },
  // 更改資料的方法
  methods: {
    reset () {
      this.form.account = ''
      this.form.password = ''
      this.form.email = ''
    },
    async submit () {
      try {
        await api.post('/users', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        // 註冊成功之後透過 router 將使用者帶回首頁
        this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: error.response.data.message
        })
      }
    }
  }
}
</script>
