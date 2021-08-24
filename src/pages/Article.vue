<template lang="pug">
.container#article
  .row
    //- 文章區
    .col-12.q-py-md
      .q-pa-md.q-gutter-sm
        q-breadcrumbs
          q-breadcrumbs-el(label="首頁" icon="home" to="/")
          q-breadcrumbs-el(label="節慶" icon="widgets" :to="'/festival/'+article.festival")
          q-breadcrumbs-el(label="文章" icon="feed")
    .col-12.col-sm-10.col-md-8
      q-img#media(:src='article.image' :ratio="16/9")
      h5 {{ article.title }}
      h6.q-mb-md 內容
      P#content {{ article.content }}
      h6.q-mb-md 資訊
      P#information(v-if="article.information") {{ article.information }}
      h6.q-mb-md 相關文章
      .row.q-mb-xl.q-pb-xl#extend
        .col-12.col-md-6(v-for="article in extendArticles" :key="article._id")
          router-link(:to="'/article/'+article._id" style="text-decoration: none;")
            CardArticle(:article="article")

    //- 段落連結
    .col-2#link
      .row
        a(style="text-decoration: none; color: #333; font-size: 1rem; line-height: 2rem;" href="#" @click.prevent="goto('media')") 影像
      .row
        a(style="text-decoration: none; color: #333; font-size: 1rem; line-height: 2rem;" href="#" @click.prevent="goto('content')") 內容
      .row
        a(style="text-decoration: none; color: #333; font-size: 1rem; line-height: 2rem;" href="#" @click.prevent="goto('information')") 資訊
      .row
        a(style="text-decoration: none; color: #333; font-size: 1rem; line-height: 2rem;" href="#" @click.prevent="goto('extend')") 相關文章
</template>

<script>
import { api } from 'boot/axios'
import CardArticle from 'components/CardArticle.vue'

export default {
  data () {
    return {
      article: [],
      extendArticles: []
    }
  },
  components: {
    CardArticle
  },
  methods: {
    goto (id) {
      document.getElementById('page_container').scrollTo(0, document.getElementById(id).offsetTop - 150)
    }
  },
  async mounted () {
    // 從後端拉文章資料
    try {
      const { data } = await api.get('/articles/' + this.$route.params.id)
      if (data.result.image) {
        data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      }
      data.result.festival = data.result.festival._id
      this.article = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得文章失敗'
      })
    }

    // 從後端拉延伸文章資料
    try {
      const { data } = await api.get('/articles/festival/' + this.article.festival)
      console.log(data)
      this.extendArticles = data.result.map(article => {
        if (article.image) {
          article.image = `${process.env.VUE_APP_API}/files/${article.image}`
        }
        return article
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得延伸文章失敗'
      })
    }
  }
}
</script>
