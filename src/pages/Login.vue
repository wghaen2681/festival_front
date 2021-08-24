<template lang="pug">
.container.q-my-auto
  .row.q-pb-xl.q-mb-xl
    .col
    .col-10.col-sm-8.col-md-6
      h4.q-pb-xl.q-mb-lg.text-center 登入
      q-form(@submit="submit" @reset="reset" class="q-gutter-lg")
        q-input(filled v-model="form.account" label="請輸入帳號 *" hint="帳號長度限制為 4 到 20 個字" :state="state.account" invalid-feedback="帳號格式不正確")
        q-input(filled type="string" v-model="form.password" label="請輸入密碼 *" hint="密碼長度限制為 4 到 20 個字" :state="state.password" invalid-feedback="密碼格式不正確")
        br
        .row.flex.justify-center
          q-btn(label="登入" type="submit" color="primary")
          q-btn.q-mx-sm(label="重設" type="reset" color="primary" flat)
    .col
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  computed: {
    state () {
      const account = this.form.account
      const password = this.form.password
      return {
        account: account.length === 0 ? null : account.length >= 4 && account.length <= 20,
        password: password.length === 0 ? null : password.length >= 4 && password.length <= 20
      }
    }
  },
  methods: {
    reset () {
      this.form.account = ''
      this.form.password = ''
    },
    async submit () {
      try {
        const { data } = await api.post('/users/login', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '登入成功'
        })
        this.$store.commit('user/login', data)
        this.$router.push('/')
      } catch (error) {
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
