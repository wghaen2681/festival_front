<template lang="pug">
.container.q-pb-xl.q-mb-xl
  .row
    .col
    .col-10.col-sm-9.col-md-8
      h4.q-mb-md.text-center 問題諮詢
      p.q-mb-xs.text-center 遇到什麼問題了嗎？
      p.q-mb-xs.text-center 在下方輸入您遇到的問題，
      p.q-mb-xs.q-pb-xl.q-mb-md.text-center 我們將盡快協助您處理。
      q-form.q-gutter-lg.text-center(@submit="submit" @reset="reset")
        q-input(filled type="string" v-model="form.email" label="請輸入您的信箱 *" hint="xxxx@gmail.com")
        q-input(filled v-model="form.title" label="請輸入問題標題 *" hint="標題長度限制為 30 字以內" :state="state.title" invalid-feedback="標題格式不正確")
        q-select(filled v-model="form.type" :options="options" hint="選擇您的問題類型" label="請選擇問題類型")
        q-input(filled autogrow type="string" v-model="form.content" label="請輸入問題內容 *" hint="內容長度限制為 300 個字以內" :state="state.content" invalid-feedback="密碼格式不正確")
        .row
          img-inputer.col(theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" style="width: 94%;" v-model="form.image")

        br
        .row.flex.justify-center
          q-btn(label="送出" type="submit" color="primary")
          q-btn.q-mx-sm(flat label="重設" type="reset" color="primary")
    .col
</template>

<script>
import { api } from 'boot/axios'

export default {
  // 設定資料型態
  data () {
    return {
      form: {
        type: null,
        email: '',
        title: '',
        content: '',
        image: ''
      },

      options: ['網站操作', '訂單問題', '會員相關', '改善建議']
    }
  },
  // 讀取表格的狀態
  computed: {
    state () {
      const title = this.form.title
      const content = this.form.content
      return {
        title: title.length === 0 ? null : title.length <= 20,
        content: content.length === 0 ? null : content.length <= 300
      }
    }
  },
  methods: {
    reset () {
      this.form.type = null
      this.form.email = ''
      this.form.title = ''
      this.form.content = ''
    },
    async submit () {
      try {
        await api.post('/assists', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '我們會盡快回覆並協助處理您的問題'
        })
        this.form.type = null
        this.form.email = ''
        this.form.title = ''
        this.form.content = ''
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '失敗'
        })
      }
    }
  }
}
</script>
