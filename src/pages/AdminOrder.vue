<template lang="pug">
.container
  .row.q-my-xl.q-pt-xl.justify-center
    q-table(title="訂單資料" :data="orders" :columns="columns" row-key="name" style="width: 55vw;" @row-dblclick="getOrderDetail")
      template(v-slot:body-cell-product="data")
        q-td(:props="data")
          div(v-for="product in data.row.products") {{ product.product.name }} * {{ product.amount }}

  //- 訂單詳細內容區
  .row.justify-center(v-if="OrderDetails.title")
    .col-12
      hr.q-mb-xl(style="width: 55vw;")
    .col-12.flex.justify-center.q-mb-xl.q-pb-xl
      .row(style="width: 55vw;")
        .col.q-ml-sm.q-mr-xl
          img(:src="OrderDetails.image" style="width: 100%")
        .col(style="font-size: 1.5rem")
          .row {{ OrderDetails.dateStart }}
          .row {{ OrderDetails.title }}
          .row.q-my-md(style="font-size: 1rem") 介紹：{{ OrderDetails.description }}
          .row.q-my-md(style="font-size: 1rem") 資訊：{{ OrderDetails.information }}
          .row.q-my-md(style="font-size: 1rem") 主辦單位：{{ OrderDetails.host }}
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      // 訂單表單功能
      columns: [
        { name: 'id', align: 'left', label: '訂單編號', field: '_id', sortable: true },
        { name: 'user', align: 'left', label: '訂購人', field: 'account', sortable: true },
        { name: 'date', align: 'left', label: '訂單日期', field: 'date', sortable: true },
        {
          name: 'product',
          align: 'left',
          label: '商品名稱',
          field: row => row.name, // row => row.name 是什麼意思？
          format: val => `${val}`, // val => `${val}` 是什麼意思？
          sortable: true
        },
        { name: 'total', align: 'left', label: '訂單金額', field: 'total', sortable: true },
        { name: 'state', align: 'center', label: '狀態', field: 'state', sortable: true }
      ],
      orders: [],

      // 指定訂單詳細資訊
      OrderDetails: {
        image: '',
        dateStart: '',
        title: '',
        description: '',
        information: '',
        host: ''
      }
    }
  },
  methods: {
    async getOrderDetail (evt, row, index) {
      try {
        // console.log(index)
        // console.log(this.orders[index]._id)
        // console.log('/users/orders/' + this.orders[index]._id)
        const { data } = await api.get('/users/orders/' + this.orders[index]._id, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        console.log(data.orders)
        // if (data.result.image) {
        //   data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        // }
        // data.result.dateStart = new Date(data.result.dateStart).toLocaleDateString()
        // this.OrderDetails = data.result
        // console.log(this.OrderDetails[0])
        // console.log(this.OrderDetails[0].title)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '取得指定節慶錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await api.get('/users/orders/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      console.log(data.result)
      this.orders = data.result.map(order => {
        order.date = new Date(order.date).toLocaleDateString()
        order.account = order.user.account
        order.total = 0
        console.log(order.products)
        for (const item of order.products) {
          // console.log(item)
          // console.log(item.amount)
          // console.log(item.product.price)
          // console.log(item.product.price * item.amount)
          order.total += item.product.price * item.amount
        }
        console.log(order.total)
        return order
      })
      // console.log(this.orders)
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
