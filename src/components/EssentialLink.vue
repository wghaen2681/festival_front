<template>
  <!-- 在原分頁開啟連結 -->
  <q-item
    clickable
    tag="a"
    :to="link"
  >
    <!-- 選項 icon 區 -->
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <!-- 選項標題區 -->
    <q-item-section>
    <!-- 選項標題 -->
      <q-item-label>{{ title }}</q-item-label>

    <!-- 選項內容 -->
      <!-- <q-item-label caption>
        {{ caption }}
      </q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    // caption: {
    //   type: String,
    //   default: ''
    // },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
