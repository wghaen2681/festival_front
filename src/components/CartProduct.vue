<template lang="pug">
.col-8
  .row.q-mb-md
    //- 商品圖片
    .col(style="overflow: hidden;")
      q-img(:src='product.image' style=" width: 300px; height: 300px;")
    .col-1
    //- 商品內容
    .col-5
      //- 商品標題
      .row
        h6.q-my-sm {{ product.name }}
      //- 商品描述
      .row {{ product.description }}
      //- 商品功能按鈕
      .row
        q-select.col.q-mr-sm(v-model="size.model" :options="size.options" label="尺寸")
        q-select.col.q-mr-sm(v-model="amount.model" :options="amount.options" label="數量")
        q-btn.col.text-grey-7(flat label="刪除商品")
    //- 商品價格
    .col-2
      .text-center $XXX
  //- 分隔線
  hr.q-mb-md
</template>

<script>
export default {
  name: 'CartProduct',
  data () {
    return {
      // 尺寸選項
      size: {
        model: null,
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      amount: {
        model: null,
        options: ['1', '2', '3', '4', '5']
      },
      //  props 可以使元件內容在被引用後仍然可以更改
      props: {
        prpoduct: {
          type: Object,
          required: true
        }
      }
    }
  }
}
</script>
