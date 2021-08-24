<template lang="pug">
q-card.q-mx-md.q-mb-xl.col.card_article(flat bordered)
  q-img(:src='article.image')

  q-card-section
    div.text-h6.q-mt-sm.q-mb-xs(style="color: black;") {{ article.title }}
    div.text-caption.text-grey {{ article.content }}
</template>

<script>
export default {
  //  輸出的元件名稱
  name: 'CardArticle',
  //  props 可以使元件內容在被引用後仍然可以更改
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
