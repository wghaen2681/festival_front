<template lang="pug">
.container.q-mb-xl.q-pb-xl#profile
  h4.text-center 我的文章
  .row.q-mb-sm
    .col-12.col-sm-6.col-md-4(v-for="article in articles" :key="article._id")
      router-link(:to="'/article/'+article._id" style="text-decoration: none;")
        CardArticle(:article="article")

  //- 新增節慶按鈕功能
  .text-center
    q-btn.q-mr-md.text-primary(flat label="編輯文章" @click="editArticle")
    q-btn.q-ml-md.text-primary(flat label="新增文章" @click="addArticle")

  //- 新增節慶提示窗
  q-dialog(v-model="alert")
    q-card.q-pa-md
      q-card-section.q-pb-none
        .text-h6 {{ mode }}
      q-card-section.q-pb-lg
        q-select(label="選擇文章" :options="articles" v-if="mode === '編輯文章'" v-model="form.article" @input="articleIn")
        q-select(label="節慶主題" :options="option_festivals" v-model="form.festival")
        q-input(v-model="form.title" label="文章標題")
        q-input(v-model="form.date" label="文章日期")
        q-input(v-model="form.content" label="文章內容")
        q-input(v-model="form.information" label="文章資訊")
      q-card-section
        img-inputer(theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" style="width: 100%;" :img-src="form.image" v-model="form.image")
      q-card-actions.justify-around
        q-btn.text-negative(flat label="刪除" style="width: 80px;" v-if="mode === '編輯文章'" @click="deleteArticle")
        q-btn.text-dark(flat label="取消" style="width: 80px;" @click="resetForm")
        q-btn.text-primary(flat label="確認" style="width: 80px;"  @click="submitModal")
</template>

<script>
import { api } from 'boot/axios'
import CardArticle from 'components/CardArticle.vue'

export default {
  name: 'Profile',
  components: {
    CardArticle
  },
  data () {
    return {
      articles: [], // 文章資料

      // 新增文章功能
      alert: false, // alert 變數決定提示窗是否開啟
      mode: '',
      submitDisable: false, // submitDisable 提供在新增節慶時，暫時停用彈出提示窗按鈕，以免使用者連續點擊
      option_articles: [], // 節慶資料
      option_festivals: [], // 節慶資料
      form: {
        title: '',
        date: '',
        content: '',
        information: '',
        image: '',
        author: this.$store.state.user.user.account,
        article: '',
        festival: '',
        published: '',
        _id: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user'] // 可能因為有使用 namespaced: true，所以要指定才能呼叫 function
    }
  },
  methods: {
    resetForm (event) {
      // if (this.submitDisable) {
      //   event.preventDefault()
      //   return
      // }
      this.alert = false
      this.form = {
        title: '',
        date: '',
        content: '',
        information: '',
        image: '',
        author: this.$store.state.user.user.account,
        article: '',
        festival: '',
        published: true,
        _id: ''
      }
    },
    editArticle () {
      this.mode = '編輯文章'
      this.alert = true
    },
    async articleIn () {
      try {
        const { data } = await api.get('/articles/' + this.form.article._id)
        data.result.date = new Date(data.result.date).toLocaleDateString()
        if (data.result.image) {
          data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        }
        this.form = {
          title: data.result.title,
          date: data.result.date,
          content: data.result.content,
          information: data.result.information,
          image: data.result.image,
          author: this.$store.state.user.user.account,
          article: data.result.title,
          festival: data.result.festival.title,
          _id: data.result._id
        }
      } catch (error) {
        this.alert = false // 關閉新增節慶提示窗
        this.$swal({
          icon: 'error',
          title: '帶入文章資料失敗'
        })
      }
    },
    addArticle () {
      this.mode = '新增文章'
      this.resetForm()
      this.alert = true
    },
    async deleteArticle () {
      try {
        this.form.published = false
        const fd = new FormData() // 定義 fd 為送出表單資料的常數
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        const { data } = await api.patch('/articles/' + this.form._id, fd)
        console.log(data)
        console.log('yes')
        this.alert = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '成功刪除文章'
        })
      } catch (error) {
        this.alert = false
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除文章失敗'
        })
      }
    },
    async submitModal () {
      this.submitDisable = true // 將彈出提示窗按鈕停用，以免使用者連續點擊
      this.form.published = true
      try {
        const fd = new FormData()
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        if (this.form._id.length === 0) {
          await api.post('/articles', fd)
          this.$swal({
            icon: 'success',
            title: '成功新增文章'
          })
        } else {
          console.log('/articles/' + this.form._id)
          await api.patch('/articles/' + this.form._id, fd)
          this.$swal({
            icon: 'success',
            title: '成功編輯文章'
          })
        }
        this.alert = false
        this.resetForm()
      } catch (error) {
        console.log(error)
        this.alert = false
        this.$swal({
          icon: 'error',
          title: '設定文章失敗'
        })
      }
      this.submitDisable = false
    }
  },
  async mounted () {
    // 文章資料
    try {
      const { data } = await api.get('/articles/author/' + this.$store.state.user.user.account)
      this.articles = data.result.map(article => {
        if (article.image) {
          article.image = `${process.env.VUE_APP_API}/files/${article.image}`
        }
        article.label = article.title
        // article.value = article.title
        article.date = new Date(article.date).toLocaleDateString()
        return article
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得文章資料失敗'
      })
    }

    // 節慶選項
    try {
      const { data } = await api.get('/festivals/all')
      this.option_festivals = data.result.map(festival => {
        if (festival.image) {
          festival.image = `${process.env.VUE_APP_API}/files/${festival.image}`
        }
        return festival.title
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得節慶選項失敗'
      })
    }
  }
}
</script>
