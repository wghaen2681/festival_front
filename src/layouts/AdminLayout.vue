<template lang="pug">
q-layout#adminLayout(view="hHh Lpr lff")
  q-header.text-white#header_mobile(elevated)
    q-toolbar
      .col-2.q-mx-xl(style="min-width: 80px;")
        router-link(to='/' style="display: inline-block;")
          img(alt="Website logo" src="../assets/logo.svg" style="width: 190px; padding: 15px; vertical-align: middle; ")
      .col-8.q-ml-xl
        q-btn(to="/admin/member" flat label="會員資料")
        q-btn(to="/admin/festival" flat label="節慶資料")
        q-btn(to="/admin/article_tag" flat label="文章資料")
        q-btn(to="/admin/product" flat label="商品資料")
        q-btn(to="/admin/order" flat label="訂單資料")
        q-btn(to="/admin/assist" flat label="問題資料")

  q-drawer#drawer_desktop(show-if-above v-model="desktop" side="left" elevated content-class="text-white column justify-center" content-style="overflow: hidden;")
    .q-pa-sm
      router-link.q-mt-xl.flex.justify-center.items-center(to='/')
        img.q-pa-md(alt="Website logo" src="../assets/logo.svg" style="width: 240px; vertical-align: middle; ")
      .q-mt-lg.text-center.text-white(style="font-size: 1.2rem;") 後台管理系統
      hr.q-mx-lg.q-my-xl
      q-btn.row.text-center.q-mt-none.q-pb-sm(to="/admin/member" flat) 會員資料
      q-btn.row.text-center.q-py-sm(to="/admin/festival" flat) 節慶資料
      q-btn.row.text-center.q-py-sm(to="/admin/article_tag" flat) 文章資料
      q-btn.row.text-center.q-py-sm(to="/admin/product" flat) 商品資料
      q-btn.row.text-center.q-py-sm(to="/admin/order" flat) 訂單資料
      q-btn.row.text-center.q-py-sm.q-mb-xl(to="/admin/assist" flat) 問題資料

  q-page-container.flex.justify-center
    router-view
</template>

<script>
export default {
  data () {
    return {
      mobile: true,
      desktop: true
    }
  }
}
</script>
