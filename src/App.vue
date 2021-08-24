<template lang="pug">
#q-app
  router-view
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'App',
  async mounted () {
    if (this.$store.state.user.jwt.token.length === 0) return
    // 定義時間差常數可用來確認使用者 jwt 是否過期
    const diff = Date.now() - this.$store.state.jwt.received
    try {
      // 如果進入網頁時，距離收到 jwt 過了六天，重新取得一次新的 jwt
      // 1000 * 60 * 60 * 24 * 6 = 6 天的毫秒數
      if (diff > 1000 * 60 * 60 * 24 * 6) {
        const { data } = await api.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.user.jwt.token
          }
        })
        this.$store.commit('extend', data.result)
      }
      // 進入網頁時重新取一次使用者資料
      const { data } = await api.get('/users/', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.user.jwt.token
        }
      })
      this.$store.commit('getinfo', data.result)
    } catch (error) {
      this.$store.commit('logout')
    }
  }
}
</script>
