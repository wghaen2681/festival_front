<template lang="pug">
.container
  .row.q-mt-xl.q-pt-xl.justify-center
    q-table(title="問題資料" :data="assists" :columns="columns" row-key="name" style="width: 55vw;" @row-dblclick="getAssistDetail")

  //- 訂單詳細內容區
  .row.justify-center(v-if="AssistDetails.title")
    .col
      hr.q-my-xl(style="width: 55vw;")
  .row.q-mb-xl.q-pb-md(v-if="AssistDetails.title")
    .col.q-mr.column.items-end
      .q-mt-none.q-mb-md(style="font-size: 1rem") 標題：
      .q-my-md(style="font-size: 1rem") 日期：
      .q-my-md(style="font-size: 1rem") 電子郵件：
      .q-my-md(style="font-size: 1rem") 問題類型：
      .q-my-md(style="font-size: 1rem") 問題內容：
      .q-my-md(style="font-size: 1rem") 處理狀態：
      .q-my-md(style="font-size: 1rem" v-if="AssistDetails.image") 問題影像：
    .col.q-ml-md.column.items-start
      .q-mt-none.q-mb-md(style="font-size: 1rem") {{ AssistDetails.title }}
      .q-my-md(style="font-size: 1rem") {{ AssistDetails.date }}
      //- .q-my-md(style="font-size: 1rem") {{ AssistDetails.state }}
      //- maito link 可以將郵件地址變為連結
      a.q-my-md(style="font-size: 1rem; text-decoration: none;" :href="'mailto:' + AssistDetails.email") {{ AssistDetails.email }}
      .q-my-md(style="font-size: 1rem") {{ AssistDetails.type }}
      .q-my-md(style="font-size: 1rem") {{ AssistDetails.content }}
      q-select(borderless style="font-size: 1rem" :options="state_options" v-model="AssistDetails.state" @input="changeState")
      .q-my-md(style="font-size: 1rem" v-if="AssistDetails.image") {{ AssistDetails.image }}
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      columns: [
        { name: 'id', align: 'left', label: '協助編號', field: '_id', sortable: true },
        { name: 'title', align: 'center', label: '標題', field: 'title', sortable: true },
        { name: 'type', align: 'center', label: '問題類型', field: 'type', sortable: true },
        { name: 'email', align: 'center', label: '電子郵件', field: 'email' },
        { name: 'date', align: 'center', label: '日期', field: 'date' },
        { name: 'state', align: 'center', label: '狀態', field: 'state', sortable: true }
      ],
      assists: [],
      state_options: ['尚未回覆', '處理中', '已回覆'],

      AssistDetails: [] // 商品詳細資訊
    }
  },
  methods: {
    // 取得協助項目的詳細資訊
    async getAssistDetail (evt, row, index) {
      try {
        const { data } = await api.get('/assists/' + this.assists[index]._id)
        if (data.result.image) {
          data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        }
        data.result.date = new Date(data.result.date).toLocaleDateString()
        this.AssistDetails = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '取得指定節慶錯誤',
          text: error.response.data.message
        })
      }
    },

    // 更改協助項目的處理狀態
    async changeState () {
      try {
        console.log('/assists/' + this.AssistDetails._id)
        console.log(this.$store.state.user.jwt.token)
        // Jam: Why this line below get auth error?
        const { data } = await api.patch('/assists/' + this.AssistDetails._id, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        console.log(data)
        console.log('success')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '更改回復狀態錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await api.get('/assists/all')
      this.assists = data.result.map(user => {
        if (user.image) {
          user.image = `${process.env.VUE_APP_API}/files/${user.image}`
        }
        user.date = new Date(user.date).toLocaleDateString()
        return user
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得會員失敗'
      })
    }
  }
}
</script>
