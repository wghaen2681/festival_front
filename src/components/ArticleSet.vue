<template lang="pug">
.row(style="margin-left: -24px;margin-right: -24px;")
  .col-12.col-sm-6.col-md-4(v-for="article in articles" :key="article._id")
    router-link(:to="'/article/'+article._id" style="text-decoration: none;")
      CardArticle(:article="article")
</template>

<script>
import { api } from 'boot/axios'
import CardArticle from 'components/CardArticle.vue'

export default {
  name: 'ArticleSet',
  data () {
    return {
      articles: []
    }
  },
  props: {
    festival: {
      type: Object,
      required: true
    }
  },
  components: {
    CardArticle
  },
  async mounted () {
    try {
      // 透過節慶 id 取得多個文章
      const { data } = await api.get('/articles/festival/' + this.festival._id)
      this.articles = data.result.map(article => {
        if (article.image) {
          article.image = `${process.env.VUE_APP_API}/files/${article.image}`
        }
        return article
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得文章失敗'
      })
    }
  }
}
</script>
