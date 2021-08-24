<template lang="pug">
.container
  .row.q-my-xl.q-pt-xl.justify-center
    q-table(title="文章資料" :data="articles" :columns="columns" row-key="name"  style="width: 55vw;" @row-dblclick="getArticleDetail")

  //- 文章詳細內容區
  .row.q-mb-lg.justify-center(v-if="ArticleDetails.title")
    .col-12
      hr.q-mt-none.q-mb-xl(style="width: 55vw;")
    .col-12.flex.justify-center
      .row(style="width: 55vw;")
        .col.q-ml-sm.q-mr-xl
          img(:src="ArticleDetails.image" style="width: 100%")
        .col(style="font-size: 1.5rem")
          .row {{ ArticleDetails.title }}
          .row.q-my-md(style="font-size: 1rem") 內容：{{ ArticleDetails.content }}
          .row.q-my-md(style="font-size: 1rem") 資訊：{{ ArticleDetails.information }}
          .row.q-my-md(style="font-size: 1rem") 作者：{{ ArticleDetails.author }}
          .row.q-my-md(style="font-size: 1rem") 日期：{{ ArticleDetails.date }}
          .row.q-my-md(style="font-size: 1rem") 節慶：{{ ArticleDetails.festival }}
    .col-12.q-my-lg.text-center
      q-btn.text-primary(flat @click="editArticle") 編輯文章

  //- 管理節慶功能
  q-dialog(v-model="alert")#add_festival
    q-card.q-pa-md
      q-card-section.q-pb-none
        .text-h6 編輯文章
      q-card-section.q-pb-lg
        q-input(label="文章標題" v-model="form.title")
        q-input(label="文章日期" v-model="form.date")
        q-input(label="文章內容" v-model="form.content")
        q-input(label="文章資訊" v-model="form.information")
        q-input(label="文章作者" v-model="form.author")
        q-select(label="文章節慶" :options="options" v-model="form.festival")
      q-card-section
        img-inputer(v-model="form.image" :img-src="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" style="width: 100%;")
      q-card-actions.justify-around
        q-btn.text-negative(label="下架" flat style="width: 80px;" v-close-popup v-if="true" @click="resetForm")
        q-btn.text-positive(label="上架" flat style="width: 80px;" v-close-popup v-if="false" @click="resetForm")
        q-btn.text-dark(label="取消" flat style="width: 80px;" @click="resetForm")
        q-btn.text-primary(flat label="確認" style="width: 80px;"  @click="submitModal")
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      // 文章表單功能
      columns: [
        { name: 'title', align: 'left', label: '標題', field: 'title', sortable: true },
        { name: 'author', align: 'left', label: '作者', field: 'author', sortable: true },
        { name: 'date', align: 'left', label: '日期', field: 'date', sortable: true },
        { name: 'festival', align: 'left', label: '節慶', field: 'festival', sortable: true }
      ],
      articles: [],

      // 管理文章功能
      alert: false, // alert 變數決定提示窗是否開啟
      confirm: false,
      prompt: false,
      address: '',
      submitDisable: false, // submitDisable 變數提供在新增文章時，暫時停用彈出提示窗按鈕，以免使用者連續點擊
      form: {
        image: '',
        date: '',
        title: '',
        content: '',
        information: '',
        author: '',
        festival: '',
        _id: ''
      },

      // 節慶詳細資訊
      ArticleDetails: {
        image: '',
        date: '',
        title: '',
        content: '',
        information: '',
        author: '',
        festival: '',
        index: ''
      }
    }
  },
  methods: {
    editArticle (index) {
      this.form = {
        image: this.ArticleDetails.image,
        title: this.ArticleDetails.title,
        date: this.ArticleDetails.date,
        content: this.ArticleDetails.content,
        information: this.ArticleDetails.information,
        author: this.ArticleDetails.author,
        festival: this.ArticleDetails.festival,
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
        image: '',
        date: '',
        title: '',
        content: '',
        information: '',
        author: '',
        festival: '',
        _id: ''
      }
    },
    async getArticleDetail (evt, row, index) {
      try {
        const { data } = await api.get('/articles/' + this.articles[index]._id)
        if (data.result.image) {
          data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        }
        data.result.date = new Date(data.result.date).toLocaleDateString()
        data.result.index = index
        data.result.festival = data.result.festival.title
        this.ArticleDetails = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '取得指定節慶錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    try {
      const { data } = await api.get('/articles/all', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      this.articles = data.result.map(article => {
        if (article.image) {
          article.image = `${process.env.VUE_APP_API}/files/${article.image}`
        }
        article.date = new Date(article.date).toLocaleDateString()
        article.festival = article.festival.title
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
