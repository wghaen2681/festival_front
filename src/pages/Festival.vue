<template lang="pug">
  .container
    //- 麵包屑區
    .row
      .col-12.q-py-md
        .q-pa-md.q-gutter-sm
          q-breadcrumbs
            q-breadcrumbs-el(label="首頁" icon="home" to="/")
            q-breadcrumbs-el(label="節慶介紹" icon="widgets")

    //- 節慶資訊區
    .row
      .col-12.col-sm-11.col-md.q-mr-xl.q-mb-xl
        q-img#media(:src='festival.image' :ratio="16/9" style="max-width: 600px;")
      .col-12.col-sm-11.col-md.q-mb-xl(style="max-width: 600px;")
        h5.q-mt-none.q-mb-sm.q-mr-xs(style="display: inline-block;") {{ festival.dateStart }}
        h5.q-mt-none.q-mb-sm.q-mr-xs(style="display: inline-block;") ~
        h5.q-mt-none.q-mb-sm.q-mr-md(style="display: inline-block;") {{ festival.dateEnd }}
        h5.q-mt-none.q-mb-lg(style="display: inline-block;") {{ festival.title }}
        div.q-mb-sm(style="font-size: 1.1rem; font-weight: 500;") 介紹
        p {{ festival.description }}
        div.q-mb-sm(style="font-size: 1.1rem; font-weight: 500;") 資訊
        p {{ festival.information }}
        div.q-mb-sm(style="font-size: 1.1rem; font-weight: 500;") 主辦
        p.q-mb-none {{ festival.host }}
    .row
      .col.q-mb-xl
        hr

    //- 相關文章區
    h6.q-mt-none 相關文章
    .row.q-mb-xl.q-pb-xl(style="margin-left: -24px;margin-right: -24px;")
      .col-12.col-sm-6.col-md-4(v-for="article in articles" :key="article._id")
        router-link(:to="'/article/'+article._id" style="text-decoration: none;")
          CardArticle(:article="article")
</template>

<script>
import { api } from 'boot/axios'
import CardArticle from 'components/CardArticle.vue'

export default {
  data () {
    return {
      festival: [],
      articles: []
    }
  },
  components: {
    CardArticle
  },
  async mounted () {
    // 從後端取得關於這項節慶的資料
    try {
      const { data } = await api.get('/festivals/' + this.$route.params.id)
      if (data.result.image) {
        data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
      }
      data.result.dateStart = new Date(data.result.dateStart).toLocaleDateString()
      data.result.dateEnd = new Date(data.result.dateEnd).toLocaleDateString()
      this.festival = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得節慶失敗'
      })
    }

    // 從後端取得關於這項節慶的所有文章
    try {
      const { data } = await api.get('/articles/festival/' + this.$route.params.id)
      console.log(data)
      this.articles = data.result.map(article => {
        if (article.image) {
          article.image = `${process.env.VUE_APP_API}/files/${article.image}`
        }
        return article
      })
    } catch (error) {
      // console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得文章失敗'
      })
    }
  }
}
</script>
