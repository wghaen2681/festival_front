<template lang="pug">
.container#home
  .column.items-center#home_background

  h4.text-center 即將到來
  .row.q-mb-xl(style="margin-left: -24px; margin-right: -24px;")
    .col-12.col-sm-6.col-md-4(v-for="festival in festivals" :key="festival._id")
      router-link(:to="'/festival/'+festival._id" style="text-decoration: none;")
        CardFestival(:festival="festival")
</template>

<script>
import { api } from 'boot/axios'
import CardFestival from 'components/CardFestival.vue'

export default {
  name: 'Home',
  data () {
    return {
      festivals: []
    }
  },
  components: {
    CardFestival
  },
  async mounted () {
    try {
      const { data } = await api.get('/festivals/upcoming')
      this.festivals = data.result.map(festival => {
        if (festival.image) {
          festival.image = `${process.env.VUE_APP_API}/files/${festival.image}`
        }
        festival.dateStart = new Date(festival.dateStart).toLocaleDateString()
        return festival
      })
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得節慶失敗'
      })
    }
  }
}
</script>
