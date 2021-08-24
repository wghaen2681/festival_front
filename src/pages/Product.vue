<template lang="pug">
  .container
    .row.q-mx-lg.q-mt-xl
      .col-12.col-md.q-mr-xl.q-mb-xl
        q-img(:src="image" style="height: 250px;")
      .col-12.col-md.q-mb-xl(style="font-size: 1.5rem")
        .row {{ name }}
        .row ${{ price }}
        .row
          p(style="font-size: 1rem") {{ description }}
        .row.q-py-sm.items-center
          .col
            .row(style="min-width: 210px;")
              q-select.q-mr-sm(borderless v-model="size" :options="options.size" label="尺寸" style="width: 80px;")
              q-select.q-mr-sm(borderless v-model="amount" :options="options.amount" label="數量" style="width: 80px;")
          .col
            .row(style="min-width: 210px;")
              q-btn.q-mr-sm(flat style="border: 1px solid black; height: 2rem" @click="addcart") 加入購物車
              q-btn.q-mr-sm(flat style="border: 1px solid black; height: 2rem" @click="checkout") 立即購買
    hr
    .row
      h5.col.q-mx-lg 其他商品
      .row.q-mb-xl
        .col-12.col-sm-6.col-md-4(v-for="product in products" :key="product._id")
          router-link(:to="'/product/'+product._id" style="text-decoration: none;")
            CardProduct(:product="product")
</template>

<script>
import { api } from 'boot/axios'
import CardProduct from 'components/CardProduct.vue'

export default {
  name: 'Product',
  components: { CardProduct },
  data () {
    return {
      name: '',
      price: '',
      description: '',
      image: '',
      sell: true,
      size: null,
      amount: null,
      options: {
        size: [],
        amount: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
      },
      products: []
    }
  },
  methods: {
    async addcart () {
      if (this.$store.state.user.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }
      if (this.size == null) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先選擇商品尺寸'
        })
        return
      }
      if (this.amount == null) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先選擇商品數量'
        })
        return
      }
      try {
        await api.post('/users/cart', { product: this.$route.params.id, amount: this.amount, size: this.size, size_option: this.options.size }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功加入購物車'
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '加入購物車失敗'
        })
      }
    },
    async checkout () {
      if (this.$store.state.user.jwt.token.length === 0) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先登入'
        })
        return
      }
      if (this.size == null) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先選擇商品尺寸'
        })
        return
      }
      if (this.amount == null) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '請先選擇商品數量'
        })
        return
      }
      try {
        await api.post('/users/cart', { product: this.$route.params.id, amount: this.amount, size: this.size, size_option: this.options.size }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
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
    // 從後端取得商品資訊
    try {
      const { data } = await api.get('/products/' + this.$route.params.id)
      this.name = data.result.name
      this.price = data.result.price
      this.description = data.result.description
      this.options.size = data.result.size
      this.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      this.sell = data.result.sell
      document.title = `${this.name} | 商店`
    } catch (error) {
      this.$router.push('/')
    }

    // 從後端取得相關商品資訊
    try {
      const { data } = await api.get('/products')
      this.products = data.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}`
          console.log(product.image)
        }
        return product
      })
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
