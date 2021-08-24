<template lang="pug">
  q-card.q-mx-md.q-mb-xl.col.card_product(bordered)
    q-img(:src='product.image')

    q-card-section
      div.text-h6.q-mt-sm.q-mb-xs(style="color: black;") {{ product.name }}
      div.text-caption.text-grey {{ product.description }}
</template>

<script>
export default {
  //  輸出的元件名稱
  name: 'CardProduct',
  //  props 可以使元件內容在被引用後仍然可以更改
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
