<template lang="pug">
.container
  .row.q-pt-xl.q-mt-xl.justify-center
    q-table(title="會員資料" :data="users" :columns="columns" row-key="name" style="width: 55vw;" @row-dblclick="getUserDetail")
      template(v-slot:header-selection="scope")
        q-toggle(v-model="scope.selected")
      template(v-slot:body-selection="scope")
        q-toggle(v-model="scope.selected")

  //- 會員詳細內容區
  .row.justify-center(v-if="UserDetails.account")
    .col-12
      hr.q-my-xl(style="width: 55vw;")
  .row.q-mb-xl.q-pb-md(v-if="UserDetails.account")
    .col-5.q-mr-md.column.items-end
      .q-mt-none.q-mb-md(style="font-size: 1rem") 帳號：
      .q-my-md(style="font-size: 1rem") 密碼：
      .q-my-md(style="font-size: 1rem") 姓名：
      .q-my-md(style="font-size: 1rem") 電子郵件：
      .q-my-md(style="font-size: 1rem") 身份別：
    .col.q-ml-md.column.items-start
      .q-mt-none.q-mb-md(style="font-size: 1rem") {{ UserDetails.account }}
      .q-my-md(style="font-size: 1rem") {{ UserDetails.password }}
      .q-my-md(style="font-size: 1rem") {{ UserDetails.name }}
      a.q-my-md(style="font-size: 1rem; text-decoration: none;" :href="'mailto:' + UserDetails.email") {{ UserDetails.email }}
      q-select(label="選擇身份別" :options="options" v-model="UserDetails.role" @input="changeRole")
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      columns: [
        { name: 'name', required: true, label: '姓名', align: 'left', field: 'name', sortable: true },
        { name: 'account', align: 'left', label: '帳號', field: 'account', sortable: true },
        { name: 'email', align: 'left', label: '電子郵件', field: 'email' },
        { name: 'role', align: 'left', label: '角色', field: 'role', sortable: true }
      ],
      users: [],
      UserDetails: [],
      options: [{ label: '使用者', value: 0 }, { label: '管理員', value: 1 }]
    }
  },
  methods: {
    async getUserDetail (evt, row, index) {
      try {
        const { data } = await api.get('/users/' + this.users[index]._id)
        console.log(data.result)
        if (data.result.role === 0) {
          data.result.role = { label: '使用者', value: 0 }
        } else {
          data.result.role = { label: '管理員', value: 1 }
        }
        this.UserDetails = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '取得指定用戶錯誤',
          text: error.response.data.message
        })
      }
    },
    async changeRole () {
      const fd = new FormData() // 定義 fd 為送出表單資料的常數
      for (const key in this.form) {
        fd.append(key, this.form[key])
      }
      try {
        // const { data } = await api.patch('/users/' + this.users._id, { role: this.UserDetails.role })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '更改用戶身份失敗',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await api.get('/users/all')
      this.users = data.result.map(user => {
        if (user.image) {
          user.image = `${process.env.VUE_APP_API}/files/${user.image}`
        }
        if (user.role === 0) {
          user.role = '使用者'
        } else if (user.role === 1) {
          user.role = '管理員'
        }
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
