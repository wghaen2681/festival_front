(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"355a":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("q-card",{staticClass:"q-mx-md q-mb-xl col card_article",attrs:{flat:"",bordered:""}},[s("q-img",{attrs:{src:t.article.image}}),s("q-card-section",[s("div",{staticClass:"text-h6 q-mt-sm q-mb-xs",staticStyle:{color:"black"}},[t._v(t._s(t.article.title))]),s("div",{staticClass:"text-caption text-grey"},[t._v(t._s(t.article.content))])])],1)},i=[],l={name:"CardArticle",props:{article:{type:Object,required:!0}}},c=l,r=s("2877"),n=s("f09f"),o=s("068f"),m=s("a370"),d=s("eebe"),v=s.n(d),u=Object(r["a"])(c,e,i,!1,null,null,null);a["a"]=u.exports;v()(u,"components",{QCard:n["a"],QImg:o["a"],QCardSection:m["a"]})},"6e33":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 q-py-md"},[s("div",{staticClass:"q-pa-md q-gutter-sm"},[s("q-breadcrumbs",[s("q-breadcrumbs-el",{attrs:{label:"首頁",icon:"home",to:"/"}}),s("q-breadcrumbs-el",{attrs:{label:"節慶介紹",icon:"widgets"}})],1)],1)])]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-sm-11 col-md q-mr-xl q-mb-xl"},[s("q-img",{staticStyle:{"max-width":"600px"},attrs:{id:"media",src:t.festival.image,ratio:16/9}})],1),s("div",{staticClass:"col-12 col-sm-11 col-md q-mb-xl",staticStyle:{"max-width":"600px"}},[s("h5",{staticClass:"q-mt-none q-mb-sm q-mr-xs",staticStyle:{display:"inline-block"}},[t._v(t._s(t.festival.dateStart))]),s("h5",{staticClass:"q-mt-none q-mb-sm q-mr-xs",staticStyle:{display:"inline-block"}},[t._v("~")]),s("h5",{staticClass:"q-mt-none q-mb-sm q-mr-md",staticStyle:{display:"inline-block"}},[t._v(t._s(t.festival.dateEnd))]),s("h5",{staticClass:"q-mt-none q-mb-lg",staticStyle:{display:"inline-block"}},[t._v(t._s(t.festival.title))]),s("div",{staticClass:"q-mb-sm",staticStyle:{"font-size":"1.1rem","font-weight":"500"}},[t._v("介紹")]),s("p",[t._v(t._s(t.festival.description))]),s("div",{staticClass:"q-mb-sm",staticStyle:{"font-size":"1.1rem","font-weight":"500"}},[t._v("資訊")]),s("p",[t._v(t._s(t.festival.information))]),s("div",{staticClass:"q-mb-sm",staticStyle:{"font-size":"1.1rem","font-weight":"500"}},[t._v("主辦")]),s("p",{staticClass:"q-mb-none"},[t._v(t._s(t.festival.host))])])]),t._m(0),s("h6",{staticClass:"q-mt-none"},[t._v("相關文章")]),s("div",{staticClass:"row q-mb-xl q-pb-xl",staticStyle:{"margin-left":"-24px","margin-right":"-24px"}},t._l(t.articles,(function(t){return s("div",{key:t._id,staticClass:"col-12 col-sm-6 col-md-4"},[s("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/article/"+t._id}},[s("CardArticle",{attrs:{article:t}})],1)],1)})),0)])},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col q-mb-xl"},[s("hr")])])}],l=s("758b"),c=s("355a"),r={data(){return{festival:[],articles:[]}},components:{CardArticle:c["a"]},async mounted(){try{const{data:t}=await l["a"].get("/festivals/"+this.$route.params.id);t.result.image&&(t.result.image=`https://festivalsweb.herokuapp.com/files/${t.result.image}`),t.result.dateStart=new Date(t.result.dateStart).toLocaleDateString(),t.result.dateEnd=new Date(t.result.dateEnd).toLocaleDateString(),this.festival=t.result}catch(t){this.$swal({icon:"error",title:"錯誤",text:"取得節慶失敗"})}try{const{data:t}=await l["a"].get("/articles/festival/"+this.$route.params.id);console.log(t),this.articles=t.result.map((t=>(t.image&&(t.image=`https://festivalsweb.herokuapp.com/files/${t.image}`),t)))}catch(t){this.$swal({icon:"error",title:"錯誤",text:"取得文章失敗"})}}},n=r,o=s("2877"),m=s("ead5"),d=s("079e"),v=s("068f"),u=s("eebe"),b=s.n(u),f=Object(o["a"])(n,e,i,!1,null,null,null);a["default"]=f.exports;b()(f,"components",{QBreadcrumbs:m["a"],QBreadcrumbsEl:d["a"],QImg:v["a"]})}}]);