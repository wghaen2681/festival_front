(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{aa32:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"container"},[a("h4",{staticClass:"text-center"},[t._v("進行中")]),a("div",{staticClass:"row q-mb-xl"},t._l(t.festivals,(function(t){return a("div",{key:t._id,staticClass:"col-12 col-sm-6 col-md-4"},[a("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/festival/"+t._id}},[a("CardFestival",{attrs:{festival:t}})],1)],1)})),0)])},i=[],l=a("758b"),c=a("cb16"),r={name:"PageIndex",data(){return{festivals:[]}},components:{CardFestival:c["a"]},async mounted(){try{const{data:t}=await l["a"].get("/festivals/progress");this.festivals=t.result.map((t=>(t.image&&(t.image=`https://festivalsweb.herokuapp.com//files/${t.image}`,t.dateStart=new Date(t.dateStart).toLocaleDateString()),t)))}catch(t){console.log(t),this.$swal({icon:"error",title:"錯誤",text:"取得節慶失敗"})}}},n=r,o=a("2877"),d=a("9989"),v=a("eebe"),m=a.n(v),f=Object(o["a"])(n,s,i,!1,null,null,null);e["default"]=f.exports;m()(f,"components",{QPage:d["a"]})},cb16:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:"q-mx-md q-mb-xl col card_festival",attrs:{bordered:""}},[a("q-img",{attrs:{src:t.festival.image}}),a("q-card-section",[a("div",{staticClass:"text-h5 q-mt-sm q-mb-xs",staticStyle:{color:"black"}},[t._v(t._s(t.festival.dateStart))]),a("div",{staticClass:"text-h6 q-mt-sm q-mb-xs",staticStyle:{color:"black"}},[t._v(t._s(t.festival.title))]),a("div",{staticClass:"text-caption text-grey"},[t._v(t._s(t.festival.description))])])],1)},i=[],l={name:"CardFestival",props:{festival:{type:Object,required:!0}}},c=l,r=a("2877"),n=a("f09f"),o=a("068f"),d=a("a370"),v=a("eebe"),m=a.n(v),f=Object(r["a"])(c,s,i,!1,null,null,null);e["a"]=f.exports;m()(f,"components",{QCard:n["a"],QImg:o["a"],QCardSection:d["a"]})}}]);