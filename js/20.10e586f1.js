(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"356b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row q-my-xl q-pt-xl justify-center"},[a("q-table",{staticStyle:{width:"55vw"},attrs:{title:"訂單資料",data:t.orders,columns:t.columns,"row-key":"name"},on:{"row-dblclick":t.getOrderDetail},scopedSlots:t._u([{key:"body-cell-product",fn:function(e){return[a("q-td",{attrs:{props:e}},t._l(e.row.products,(function(e){return a("div",[t._v(t._s(e.product.name)+" * "+t._s(e.amount))])})),0)]}}])})],1),t.OrderDetails.title?a("div",{staticClass:"row justify-center"},[t._m(0),a("div",{staticClass:"col-12 flex justify-center q-mb-xl q-pb-xl"},[a("div",{staticClass:"row",staticStyle:{width:"55vw"}},[a("div",{staticClass:"col q-ml-sm q-mr-xl"},[a("img",{staticStyle:{width:"100%"},attrs:{src:t.OrderDetails.image}})]),a("div",{staticClass:"col",staticStyle:{"font-size":"1.5rem"}},[a("div",{staticClass:"row"},[t._v(t._s(t.OrderDetails.dateStart))]),a("div",{staticClass:"row"},[t._v(t._s(t.OrderDetails.title))]),a("div",{staticClass:"row q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("介紹："+t._s(t.OrderDetails.description))]),a("div",{staticClass:"row q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("資訊："+t._s(t.OrderDetails.information))]),a("div",{staticClass:"row q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("主辦單位："+t._s(t.OrderDetails.host))])])])])]):t._e()])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12"},[a("hr",{staticClass:"q-mb-xl",staticStyle:{width:"55vw"}})])}],l=(a("ddb0"),a("758b")),i={data(){return{columns:[{name:"id",align:"left",label:"訂單編號",field:"_id",sortable:!0},{name:"user",align:"left",label:"訂購人",field:"account",sortable:!0},{name:"date",align:"left",label:"訂單日期",field:"date",sortable:!0},{name:"product",align:"left",label:"商品名稱",field:t=>t.name,format:t=>`${t}`,sortable:!0},{name:"total",align:"left",label:"訂單金額",field:"total",sortable:!0},{name:"state",align:"center",label:"狀態",field:"state",sortable:!0}],orders:[],OrderDetails:{image:"",dateStart:"",title:"",description:"",information:"",host:""}}},methods:{async getOrderDetail(t,e,a){try{const{data:t}=await l["a"].get("/users/orders/"+this.orders[a]._id,{headers:{authorization:"Bearer "+this.$store.state.user.jwt.token}});console.log(t.orders)}catch(s){this.$swal({icon:"error",title:"取得指定節慶錯誤",text:s.response.data.message})}}},async mounted(){try{const{data:t}=await l["a"].get("/users/orders/all",{headers:{authorization:"Bearer "+this.$store.state.user.jwt.token}});console.log(t.result),this.orders=t.result.map((t=>{t.date=new Date(t.date).toLocaleDateString(),t.account=t.user.account,t.total=0,console.log(t.products);for(const e of t.products)t.total+=e.product.price*e.amount;return console.log(t.total),t}))}catch(t){console.log(t),this.$swal({icon:"error",title:"錯誤",text:"取得訂單失敗"})}}},o=i,n=a("2877"),c=a("eaac"),d=a("db86"),u=a("eebe"),m=a.n(u),f=Object(n["a"])(o,s,r,!1,null,null,null);e["default"]=f.exports;m()(f,"components",{QTable:c["a"],QTd:d["a"]})}}]);