<template lang="pug">
  .q-py-xl.q-my-md
    q-table(title="會員表單" :data="data" :columns="columns" row-key="name" selection="multiple" :selected.sync="selected" style="width: 55vw;")
      template(v-slot:header-selection="scope")
        q-toggle(v-model="scope.selected")
      template(v-slot:body-selection="scope")
        q-toggle(v-model="scope.selected")
</template>

<script>
export default {
  data () {
    return {
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: '姓名',
          align: 'left',
          field: 'name',
          sortable: true
        },
        { name: 'account', align: 'left', label: '帳號', field: 'account', sortable: true },
        { name: 'email', align: 'left', label: '電子郵件', field: 'email' },
        { name: 'role', align: 'center', label: '角色', field: 'role', sortable: true },
        { name: 'id', align: 'center', label: '_id', field: 'id', sortable: true }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          account: 159,
          email: 6.0,
          role: 24,
          id: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          account: 237,
          email: 9.0,
          role: 37,
          id: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          account: 262,
          email: 16.0,
          role: 23,
          id: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          account: 305,
          email: 3.7,
          role: 67,
          id: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          account: 356,
          email: 16.0,
          role: 49,
          id: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          account: 375,
          email: 0.0,
          role: 94,
          id: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          account: 392,
          email: 0.2,
          role: 98,
          id: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          account: 408,
          email: 3.2,
          role: 87,
          id: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          account: 452,
          email: 25.0,
          role: 51,
          id: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          account: 518,
          email: 26.0,
          role: 65,
          id: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  }
}
</script>
