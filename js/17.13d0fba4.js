(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{c4ca:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("div",{staticClass:"row q-mt-xl q-pt-xl justify-center"},[e("q-table",{staticStyle:{width:"55vw"},attrs:{title:"問題資料",data:t.assists,columns:t.columns,"row-key":"name"},on:{"row-dblclick":t.getAssistDetail}})],1),t.AssistDetails.title?e("div",{staticClass:"row justify-center"},[t._m(0)]):t._e(),t.AssistDetails.title?e("div",{staticClass:"row q-mb-xl q-pb-md"},[e("div",{staticClass:"col q-mr column items-end"},[e("div",{staticClass:"q-mt-none q-mb-md",staticStyle:{"font-size":"1rem"}},[t._v("標題：")]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("日期：")]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("電子郵件：")]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("問題類型：")]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("問題內容：")]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("處理狀態：")]),t.AssistDetails.image?e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v("問題影像：")]):t._e()]),e("div",{staticClass:"col q-ml-md column items-start"},[e("div",{staticClass:"q-mt-none q-mb-md",staticStyle:{"font-size":"1rem"}},[t._v(t._s(t.AssistDetails.title))]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v(t._s(t.AssistDetails.date))]),e("a",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem","text-decoration":"none"},attrs:{href:"mailto:"+t.AssistDetails.email}},[t._v(t._s(t.AssistDetails.email))]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v(t._s(t.AssistDetails.type))]),e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v(t._s(t.AssistDetails.content))]),e("q-select",{staticStyle:{"font-size":"1rem"},attrs:{borderless:"",options:t.state_options},on:{input:t.changeState},model:{value:t.AssistDetails.state,callback:function(s){t.$set(t.AssistDetails,"state",s)},expression:"AssistDetails.state"}}),t.AssistDetails.image?e("div",{staticClass:"q-my-md",staticStyle:{"font-size":"1rem"}},[t._v(t._s(t.AssistDetails.image))]):t._e()],1)]):t._e()])},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col"},[e("hr",{staticClass:"q-my-xl",staticStyle:{width:"55vw"}})])}],l=e("758b"),n={data(){return{columns:[{name:"id",align:"left",label:"協助編號",field:"_id",sortable:!0},{name:"title",align:"center",label:"標題",field:"title",sortable:!0},{name:"type",align:"center",label:"問題類型",field:"type",sortable:!0},{name:"email",align:"center",label:"電子郵件",field:"email"},{name:"date",align:"center",label:"日期",field:"date"},{name:"state",align:"center",label:"狀態",field:"state",sortable:!0}],assists:[],state_options:["尚未回覆","處理中","已回覆"],AssistDetails:[]}},methods:{async getAssistDetail(t,s,e){try{const{data:t}=await l["a"].get("/assists/"+this.assists[e]._id);t.result.image&&(t.result.image=`https://festivalsweb.herokuapp.com//files/${t.result.image}`),t.result.date=new Date(t.result.date).toLocaleDateString(),this.AssistDetails=t.result}catch(a){this.$swal({icon:"error",title:"取得指定節慶錯誤",text:a.response.data.message})}},async changeState(){try{console.log("/assists/"+this.AssistDetails._id),console.log(this.$store.state.user.jwt.token);const{data:t}=await l["a"].patch("/assists/"+this.AssistDetails._id,{headers:{authorization:"Bearer "+this.$store.state.user.jwt.token}});console.log(t),console.log("success")}catch(t){this.$swal({icon:"error",title:"更改回復狀態錯誤",text:t.response.data.message})}}},async mounted(){try{const{data:t}=await l["a"].get("/assists/all");this.assists=t.result.map((t=>(t.image&&(t.image=`https://festivalsweb.herokuapp.com//files/${t.image}`),t.date=new Date(t.date).toLocaleDateString(),t)))}catch(t){this.$swal({icon:"error",title:"錯誤",text:"取得會員失敗"})}}},c=n,o=e("2877"),m=e("eaac"),r=e("ddd8"),d=e("eebe"),v=e.n(d),y=Object(o["a"])(c,a,i,!1,null,null,null);s["default"]=y.exports;v()(y,"components",{QTable:m["a"],QSelect:r["a"]})}}]);