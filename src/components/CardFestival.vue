<template lang="pug">
q-card.q-mx-md.q-mb-xl.col.card_festival(bordered)
  q-img(:src='festival.image')

  q-card-section
    div.text-h5.q-mt-sm.q-mb-xs(style="color: black;") {{ festival.dateStart }}
    div.text-h6.q-mt-sm.q-mb-xs(style="color: black;") {{ festival.title }}
    div.text-caption.text-grey {{ festival.description }}
</template>

<script>
export default {
  name: 'CardFestival',
  //  props 可以使元件內容在被引用後仍然可以更改
  props: {
    festival: {
      type: Object,
      required: true
    }
  }
}
</script>
