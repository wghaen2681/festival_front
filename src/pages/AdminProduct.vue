<template lang="pug">
.container
  //- 商品表單
  .row.q-mt-xl.q-pt-xl.justify-center
    q-table(title="商品資料" :data="products" :columns="columns" row-key="name" style="width: 55vw;" @row-dblclick="getProductDetail")
      template(v-slot:header-selection="scope")
        q-toggle(v-model="scope.selected")
      template(v-slot:body-selection="scope")
        q-toggle(v-model="scope.selected")

  //- 新增商品按鈕
  .row.q-my-lg.justify-center
    q-btn(flat label="新增商品" color="primary" @click="addProduct")

  //- 節慶詳細內容區
  .row.q-mb-lg.justify-center(v-if="ProductDetails.name")
    .col-12
      hr.q-mb-xl(style="width: 55vw;")
    .col-12.flex.justify-center
      .row(style="width: 700px;")
        .col.q-ml-sm.q-mr-xl
          img(:src="ProductDetails.image" style="width: 100%")
        .col(style="font-size: 1.5rem")
          .row {{ ProductDetails.name }}
          .row $ {{ ProductDetails.price }}
          .row.q-my-md(style="font-size: 1rem") {{ ProductDetails.description }}
          .row(style="font-size: 1rem;") 提供尺寸：{{ ProductDetails.size }}
    .col-12.q-my-lg.text-center
      q-btn.text-primary(flat @click="editProduct") 編輯商品

  //- 管理商品功能
  q-dialog(v-model="alert")
    q-card.q-pa-md
      q-card-section
        .text-h6 {{ mode }}
      q-card-section.q-pt-none
        q-input(v-model="form.name" label="商品標題")
        q-input(v-model="form.price" label="商品價格" prefix="$")
        q-input(v-model="form.description" label="商品描述")
        q-select(v-model="form.size" multiple :options="options" label="提供尺寸")
        q-input(v-model="form.seller" label="販售商家")
      q-card-section
        img-inputer(placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" size="large" theme="dark" style="width: 100%;" :img-src="form.image" v-model="form.image")
      q-card-actions.justify-around
        q-btn.text-negative(flat style="width: 80px;" label="下架" v-if="mode === '編輯商品' && true" v-model="form.sell" :value="false" v-close-popup @click="submitModal")
        q-btn.text-positive(flat style="width: 80px;" label="上架" v-if="mode === '編輯商品' && false" v-model="form.sell" :value="false" v-close-popup @click="submitModal")
        q-btn(flat label="取消" color="primary" style="width: 80px;" @click="resetForm")
        q-btn(flat label="確認" color="primary" style="width: 80px;"  @click="submitModal")
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      // 商品表單功能
      columns: [
        { name: 'name', required: true, label: '商品名稱', align: 'left', field: 'name', sortable: true },
        { name: 'price', align: 'left', label: '價格', field: 'price', sortable: true },
        { name: 'sell', align: 'left', label: '販售狀態', field: 'sell' },
        { name: 'id', align: 'center', label: '_id', field: '_id', sortable: true }
      ],
      products: [], // 商品表單內容

      // 管理商品功能
      alert: false, // alert 決定提示窗是否開啟
      mode: '',
      confirm: false,
      prompt: false,
      address: '',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '固定尺寸'],
      submitDisable: false, // disable 變數提供在新增商品時，暫時停用彈出提示窗按鈕，以免使用者連續點擊
      form: {
        name: '',
        price: '',
        description: '',
        size: null,
        seller: '',
        image: '',
        sell: '',
        _id: ''
      },

      // 商品詳細資訊
      ProductDetails: {
        name: '',
        price: '',
        description: '',
        size: null,
        seller: '',
        image: '',
        sell: '',
        _id: ''
      }
    }
  },
  methods: {
    addProduct () {
      this.mode = '新增商品'
      this.form = {
        name: '',
        price: '',
        description: '',
        size: null,
        seller: '',
        image: '',
        sell: ''
      }
      this.alert = true
    },
    editProduct (index) {
      this.mode = '編輯商品'
      this.form = {
        name: this.ProductDetails.name,
        price: this.ProductDetails.price,
        description: this.ProductDetails.description,
        size: this.ProductDetails.size,
        seller: this.ProductDetails.seller,
        image: this.ProductDetails.image,
        sell: this.ProductDetails.sell,
        _id: this.ProductDetails._id,
        index
      }
      this.alert = true
    },
    resetForm (event) {
      if (this.submitDisable) {
        event.preventDefault()
        return
      }
      this.alert = false
      this.form = {
        name: '',
        price: '',
        description: '',
        size: null,
        seller: '',
        image: '',
        sell: '',
        _id: ''
      }
    },
    async submitModal () {
      this.submitDisable = true // 將彈出提示窗按鈕停用，以免使用者連續點擊
      try {
        const fd = new FormData() // 定義 fd 為送出表單資料的常數
        for (const key in this.form) {
          if (Array.isArray(this.form[key])) { // 判斷值是否為陣列，如果是就另外處理
            for (const item of this.form[key]) { // 將陣列內的值轉為字串一一放進 fd
              fd.append(key, item)
            }
          } else {
            fd.append(key, this.form[key])
          }
        }
        await api.post('/products', fd, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.alert = false // 關閉新增商品提示窗
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '新增商品成功'
        })
        this.form = {
          name: '',
          price: '',
          description: '',
          size: null,
          seller: '',
          image: '',
          sell: '',
          _id: ''
        }

        // if (this.form._id.length === 0) {
        //   await api.post('/products', fd, {
        //     headers: {
        //       authorization: 'Bearer ' + this.$store.state.user.jwt.token
        //     }
        //   })
        //   this.alert = false // 關閉新增商品提示窗
        //   this.$swal({
        //     icon: 'success',
        //     title: '成功',
        //     text: '新增商品成功'
        //   })
        //   this.form = {
        //     name: '',
        //     price: '',
        //     description: '',
        //     size: null,
        //     seller: '',
        //     image: '',
        //     sell: '',
        //     _id: ''
        //   }
        // } else {
        //   const { data } = await api.patch('/products/' + this.form._id, fd, {
        //     headers: {
        //       authorization: 'Bearer ' + this.$store.state.jwt.token
        //     }
        //   })
        //   this.products[this.form.index] = {
        //     name: this.form.name,
        //     price: this.form.price,
        //     description: this.form.description,
        //     size: null,
        //     seller: this.form.seller,
        //     image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
        //     sell: this.form.sell,
        //     _id: this.form._id
        //   }
        //   // this.$refs.productTable.refresh()
        // }
      } catch (error) {
        this.alert = false // 關閉新增商品提示窗
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.submitDisable = false // 在表單完整送出後，將彈出提示窗按鈕回覆啟用
    },
    async getProductDetail (evt, row, index) {
      try {
        const { data } = await api.get('/products/' + this.products[index]._id)
        if (data.result.image) {
          data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        }
        this.ProductDetails = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '取得指定商品錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await api.get('/products/all')
      this.products = data.result.map(product => {
        if (product.image) {
          product.image = `${process.env.VUE_APP_API}/files/${product.image}`
        }
        if (product.sell) {
          product.sell = '販售中'
        } else {
          product.sell = '未上架'
        }
        product.price = `$ ${product.price}`
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
