<template lang="pug">
.container
  .row.q-mt-xl.q-pt-xl.justify-center
    //- 節慶表單
    q-table(title="節慶資料" :data="festivals" :columns="columns" row-key="name" style="width: 55vw;" ref="festivalTable" @row-dblclick="getFestivalDetail")

  //- 新增節慶按鈕
  .row.q-my-lg.justify-center
    q-btn(flat label="新增節慶" color="primary" @click="addFestival")

  //- 節慶詳細內容區
  .row.q-mb-lg.justify-center(v-if="FestivalDetails.title")
    .col-12
      hr.q-mt-none.q-mb-xl(style="width: 55vw;")
    .col-12.flex.justify-center
      .row(style="width: 55vw;")
        .col.q-ml-sm.q-mr-xl
          img(:src="FestivalDetails.image" style="width: 100%")
        .col(style="font-size: 1.5rem")
          .row {{ FestivalDetails.dateStart }} ~ {{ FestivalDetails.dateEnd }}
          .row {{ FestivalDetails.title }}
          .row.q-my-md(style="font-size: 1rem") 介紹：{{ FestivalDetails.description }}
          .row.q-my-md(style="font-size: 1rem") 資訊：{{ FestivalDetails.information }}
          .row.q-my-md(style="font-size: 1rem") 主辦單位：{{ FestivalDetails.host }}
    .col-12.q-my-lg.text-center
      q-btn.text-primary(flat @click="editFestival") 編輯節慶

  //- 管理節慶功能
  q-dialog(v-model="alert")#add_festival
    q-card.q-pa-md
      q-card-section.q-pb-none
        .text-h6 {{ mode }}
      q-card-section.q-pb-lg
        q-input(label="節慶標題" v-model="form.title")
        q-input(label="開始日期" v-model="form.dateStart")
        q-input(label="結束日期" v-model="form.dateEnd")
        q-input(label="節慶內容" v-model="form.description")
        q-input(label="節慶資訊" v-model="form.information")
        q-input(label="主辦單位" v-model="form.host")
      q-card-section
        img-inputer(placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改" size="large" theme="dark" style="width: 100%;" :img-src="form.image" v-model="form.image")
      q-card-actions.justify-around
        q-btn.text-negative(flat style="width: 80px;" label="下架" v-if="mode === '編輯節慶' && true" v-close-popup @click="resetForm")
        q-btn.text-positive(flat style="width: 80px;" label="上架" v-if="mode === '編輯節慶' && false" v-close-popup @click="resetForm")
        q-btn.text-dark(flat style="width: 80px;" label="取消" @click="resetForm")
        q-btn.text-primary(flat label="確認" style="width: 80px;"  @click="submitModal")
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      // 節慶表單功能
      columns: [
        { name: 'account', align: 'left', label: '開始日期', field: 'dateStart', sortable: true },
        { name: 'name', required: true, label: '節慶名稱', align: 'left', field: 'title', sortable: true },
        { name: 'email', align: 'left', label: '主辦', field: 'host' }
      ],
      festivals: [],

      // 管理節慶功能
      alert: false, // alert 變數決定提示窗是否開啟
      mode: '',
      confirm: false,
      prompt: false,
      address: '',
      submitDisable: false, // submitDisable 變數提供在新增節慶時，暫時停用彈出提示窗按鈕，以免使用者連續點擊
      form: {
        title: '',
        dateStart: '',
        dateEnd: '',
        description: '',
        information: '',
        image: null,
        host: '',
        _id: ''
      },

      // 節慶詳細資訊
      FestivalDetails: {
        image: '',
        dateStart: '',
        title: '',
        description: '',
        information: '',
        host: '',
        index: ''
      }
    }
  },
  methods: {
    addFestival () {
      this.mode = '新增節慶'
      this.form = {
        title: '',
        dateStart: '',
        dateEnd: '',
        description: '',
        information: '',
        host: ''
      }
      this.alert = true
    },
    editFestival (index) {
      this.mode = '編輯節慶'
      this.form = {
        image: this.FestivalDetails.image,
        title: this.FestivalDetails.title,
        dateStart: this.FestivalDetails.dateStart,
        dateEnd: this.FestivalDetails.dateEnd,
        description: this.FestivalDetails.description,
        information: this.FestivalDetails.information,
        host: this.FestivalDetails.host,
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
        title: '',
        dateStart: '',
        dateEnd: '',
        description: '',
        information: '',
        host: '',
        index: '',
        _id: ''
      }
    },
    async submitModal () {
      this.submitDisable = true // 將彈出提示窗按鈕停用，以免使用者連續點擊
      try {
        const fd = new FormData() // 定義 fd 為送出表單資料的常數
        for (const key in this.form) {
          fd.append(key, this.form[key])
        }
        await api.post('/festivals', fd, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token // 身份驗證
          }
        })
        this.alert = false // 關閉新增節慶提示窗
        this.$swal({
          icon: 'success',
          title: '新增成功'
        })
        this.form = {
          title: '',
          dateStart: '',
          dateEnd: '',
          description: '',
          information: '',
          host: ''
        }

        // 節慶編輯功能
        // if (this.form._id.length === 0) {  // Jam: 為什麼編輯節慶的 id 判斷式這行跑不動？
        //   await api.post('/festivals', fd, {
        //     headers: {
        //       authorization: 'Bearer ' + this.$store.state.user.jwt.token // 身份驗證
        //     }
        //   })
        //   this.alert = false // 關閉新增節慶提示窗
        //   this.$swal({
        //     icon: 'success',
        //     title: '新增成功'
        //   })
        //   this.form = {
        //     title: '',
        //     dateStart: '',
        //     dateEnd: '',
        //     description: '',
        //     information: '',
        //     host: ''
        //   }
        // } else {
        //   const { data } = await api.patch('/festivals/' + this.form._id, fd, {
        //     headers: {
        //       authorization: 'Bearer ' + this.$store.state.user.jwt.token
        //     }
        //   })
        //   // 在編輯資料後更新資料表格
        //   this.festivals[this.form.index] = {
        //     title: this.form.title,
        //     dateStart: this.form.dateStart,
        //     dateEnd: this.form.dateEnd,
        //     description: this.form.title,
        //     information: this.form.information,
        //     host: this.form.host,
        //     image: `${process.env.VUE_APP_API}/files/${data.result.image}`,
        //     _id: this.form._id
        //   }
        //   this.$refs.festivalTable.refresh()
        // }
        this.alert = false // 關閉新增節慶提示窗
      } catch (error) {
        this.alert = false // 關閉新增節慶提示窗
        this.$swal({
          icon: 'error',
          title: '新增失敗',
          text: error.response.data.message
        })
      }
      this.submitDisable = false // 在表單完整送出後，將彈出提示窗按鈕回覆啟用
    },
    async getFestivalDetail (evt, row, index) {
      try {
        const { data } = await api.get('/festivals/' + this.festivals[index]._id)
        if (data.result.image) {
          data.result.image = `${process.env.VUE_APP_API}/files/${data.result.image}`
        }
        data.result.dateStart = new Date(data.result.dateStart).toLocaleDateString()
        data.result.dateEnd = new Date(data.result.dateEnd).toLocaleDateString()
        data.result.index = index
        this.FestivalDetails = data.result
        console.log(this.FestivalDetails)
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
      const { data } = await api.get('/festivals/all')
      this.festivals = data.result.map(festival => {
        if (festival.image) {
          festival.image = `${process.env.VUE_APP_API}/files/${festival.image}`
        }
        festival.dateStart = new Date(festival.dateStart).toLocaleDateString()
        return festival
      })
    } catch (error) {
      // 錯誤訊息
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得節慶失敗'
      })
    }
  }
}
</script>
