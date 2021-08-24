<template lang="pug">
  q-page.container#spring
    .row.q-my-md
      .col-3
      router-link.col.q-mb-md(to="/spring" style="text-decoration: none;")
        h6.text-center.text-primary.q-mb-sm 春季
      router-link.col.q-mb-md(to="/summer" style="text-decoration: none;")
        h6.text-center.text-dark.q-mb-sm 夏季
      router-link.col.q-mb-md(to="/autumn" style="text-decoration: none;")
        h6.text-center.text-dark.q-mb-sm 秋季
      router-link.col.q-mb-md(to="/winter" style="text-decoration: none;")
        h6.text-center.text-dark.q-mb-sm 冬季
      .col-3
    .row.q-mb-xl
      .col-12(v-for="festival in festivals" :key="festival._id")
        router-link.col.text-dark(:to="'/festival/'+festival._id" style="text-decoration: none;")
          h6.q-mb-xl#festivalTitle {{ festival.title }}
        ArticleSet(:festival="festival")
</template>

<script>
import { api } from 'boot/axios'
import ArticleSet from 'components/ArticleSet.vue'

export default {
  name: 'Spring',
  data () {
    return {
      festivals: [],
      articles: []
    }
  },
  components: {
    ArticleSet
  },
  async mounted () {
    try {
      const { data } = await api.get('/festivals/season/1')
      this.festivals = data.result.map(festival => {
        if (festival.image) {
          festival.image = `${process.env.VUE_APP_API}/files/${festival.image}`
        }
        return festival
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得節慶失敗'
      })
    }
  }
}
</script>
