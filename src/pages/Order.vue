<template lang="pug">
.container
  .row.q-my-xl.q-pt-xl.justify-center
    q-table(title="訂單表單" :data="orders" :columns="columns" row-key="name" style="width: 55vw" template)
      //- 從這邊以下看不懂
      //- body-cell- 後面接的 name 需要改嗎？
      //- data 是指什麼？是指 axios 抓到的資料陣列嗎？
      //- props 是指什麼？
      //- item 是指什麼？是指 axios 抓到的資料陣列下的多個項目嗎？
      //- 為什麼這樣是顯示 undefined？
      template(v-slot:body-cell-product="data")
        q-td(:props="data")
          div(v-for="product in data.row.products") {{ product.product.name}} * {{ product.amount}}
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      columns: [
        { name: 'id', align: 'left', label: '訂單編號', field: '_id', sortable: true },
        { name: 'date', align: 'left', label: '訂單日期', field: 'date', sortable: true },
        {
          name: 'product',
          align: 'left',
          label: '商品名稱',
          field: row => row.name, // row => row.name 是什麼意思？
          format: val => `${val}`, // val => `${val}` 是什麼意思？
          sortable: true
        },
        { name: 'state', align: 'center', label: '狀態', field: 'state', sortable: true }
      ],
      orders: []
    }
  },
  async mounted () {
    try {
      const { data } = await api.get('/users/orders', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      this.orders = data.result.orders.map(order => {
        order.date = new Date(order.date).toLocaleString()
        return order
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
