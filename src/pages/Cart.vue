<template lang="pug">
.container#cart
  h4 購物車

  .row.reverse
    //- 購物車總結
    .col-12.col-md-3.q-mb-xl.q-pa-md.column.justify-between.items-center(style="height: 200px; border: 1px solid #757575")
      #alert 訂購前請務必確認好想購買的商品種類、尺寸、顏色和數量，並且於2日內完成付款。
      .text-center 總計金額
      .text-center ${{ totalprice }}
      q-btn.text-white.bg-primary(flat label="立即下單" style="width: 100%;" @click="checkout")

    .col-md

    .col-12.col-md-8
      .row
        .col-4
        .col
        .col-5
        .col-2
          .text-center 金額
      .row
        .col
          hr.q-mb-md
      .row
        .col
          //- index 提供 v-for 迴圈物件 index 查詢功能
          .row(v-for="(item, index) in cart" :key="item._id" ref="table")
            .col.q-mr-md(style="overflow: hidden;")
              q-img(:src='item.image' style=" width: 300px; height: 300px;")

            .col-7.column.justify-between
              .row
                .col-8.column.justify-between
                  h6.q-mt-none.q-mb-sm {{ item.name }}
                  .row {{ item.description }}
                .col-4
                  .text-center ${{ item.price*item.amount }}
              .row
                .col
                  .row(style="height: 50px;")
                    q-select.col.q-mr-sm(label="尺寸" v-model="item.sizeModel" :options="item.size_option" borderless @input="changeSize(index)")
                    q-select.col.q-mr-sm(label="數量" v-model="item.amountModel" :options="option.amount" borderless @input="changeAmount(index)")
                    q-btn.col.text-grey-7(label="刪除商品" flat @click="delProduct(index)")

            .col-12.q-mt-md
              hr.q-mb-md

      //- 如果使用者的購物車沒有商品，顯示前往商店的連結按鈕
      .row(v-if="!cart.length")
        h6 您的購物車中似乎沒有任何東西，歡迎前往商店瀏覽我們的最新商品
      .row(v-if="!cart.length")
        .col
        .col.text-center
          q-btn.text-white.bg-primary(falt label="前往商店" to="/store")
        .col
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'Cart',
  data () {
    const amount = []
    for (let i = 1; i <= 20; i++) {
      amount.push(i)
    }
    return {
      cart: [],
      option: {
        size: ['xs', 'sm', 'md', 'lg', 'xl'],
        amount: Object.freeze(amount)
      }
    }
  },
  computed: {
    totalprice () {
      return this.cart.length === 0 ? 0 : this.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price), 0)
    }
  },
  methods: {
    async changeSize (index) {
      try {
        await api.patch('/users/cart/size', { product: this.cart[index]._id, size: this.cart[index].sizeModel }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        console.log('change size yes')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '更改尺寸失敗'
        })
      }
    },
    async changeAmount (index) {
      try {
        await api.patch('/users/cart/amount', { product: this.cart[index]._id, amount: this.cart[index].amountModel }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        // this.$refs.table.refresh() // Jam: How to refresh the page for the new price after changing the product amount?
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '更改數量失敗'
        })
      }
    },
    async delProduct (index) {
      try {
        await api.patch('/users/cart/amount', { product: this.cart[index]._id, amount: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.cart.splice(index, 1)
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除商品失敗'
        })
      }
    },
    async checkout () {
      try {
        await api.post('/users/checkout', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功下單'
        })
        this.$router.push('/order') // 前往訂單頁面
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '下單失敗'
        })
      }
    }
  },
  async mounted () {
    // 從後端取得使用者購物車資訊
    try {
      const { data } = await api.get('/users/cart', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      // console.log(data.result)
      this.cart = data.result.map(item => {
        item = { ...item.product, amount: item.amount, size: item.size, size_option: item.size_option } // ...item.product 是指把 item 中 product 的所有資訊搬進 item 中，等同消除 product 這個資訊的分類。
        item.image = `${process.env.VUE_APP_API}/files/${item.image}`
        item.amountModel = item.amount // Question: 為什麼要在搞一個 amoutModel 出來看不太懂？
        item.sizeModel = item.size
        return item
      })
      console.log(this.cart)
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
