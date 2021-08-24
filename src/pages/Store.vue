<template lang="pug">
.container
  h4.text-center 商店
  .row.q-mb-xl
    .col-12.col-sm-6.col-md-4(v-for="product in products" :key="product._id")
      router-link(:to="'/product/'+product._id" style="text-decoration: none;")
        CardProduct(:product="product")
</template>

<script>
import { api } from 'boot/axios'
import CardProduct from 'components/CardProduct.vue'

export default {
  name: 'Store', // 定義輸出頁面名稱
  data () {
    return {
      products: [] // 定義 card 連結元件內容
    }
  },
  components: {
    CardProduct
  },
  // 更改
  async mounted () {
    try {
      const { data } = await api.get('/products')
      this.products = data.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}` // 在抓到 API 資料後，將 image 檔名改為圖檔路徑，放便網頁呈現。
          console.log(product.image)
        }
        return product
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
