(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"2ff9":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container q-mb-xl q-pb-xl",attrs:{id:"profile"}},[a("h4",{staticClass:"text-center"},[t._v("我的文章")]),a("div",{staticClass:"row q-mb-sm"},t._l(t.articles,(function(t){return a("div",{key:t._id,staticClass:"col-12 col-sm-6 col-md-4"},[a("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/article/"+t._id}},[a("CardArticle",{attrs:{article:t}})],1)],1)})),0),a("div",{staticClass:"text-center"},[a("q-btn",{staticClass:"q-mr-md text-primary",attrs:{flat:"",label:"編輯文章"},on:{click:t.editArticle}}),a("q-btn",{staticClass:"q-ml-md text-primary",attrs:{flat:"",label:"新增文章"},on:{click:t.addArticle}})],1),a("q-dialog",{model:{value:t.alert,callback:function(e){t.alert=e},expression:"alert"}},[a("q-card",{staticClass:"q-pa-md"},[a("q-card-section",{staticClass:"q-pb-none"},[a("div",{staticClass:"text-h6"},[t._v(t._s(t.mode))])]),a("q-card-section",{staticClass:"q-pb-lg"},["編輯文章"===t.mode?a("q-select",{attrs:{label:"選擇文章",options:t.articles},on:{input:t.articleIn},model:{value:t.form.article,callback:function(e){t.$set(t.form,"article",e)},expression:"form.article"}}):t._e(),a("q-select",{attrs:{label:"節慶主題",options:t.option_festivals},model:{value:t.form.festival,callback:function(e){t.$set(t.form,"festival",e)},expression:"form.festival"}}),a("q-input",{attrs:{label:"文章標題"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}}),a("q-input",{attrs:{label:"文章日期"},model:{value:t.form.date,callback:function(e){t.$set(t.form,"date",e)},expression:"form.date"}}),a("q-input",{attrs:{label:"文章內容"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}}),a("q-input",{attrs:{label:"文章資訊"},model:{value:t.form.information,callback:function(e){t.$set(t.form,"information",e)},expression:"form.information"}})],1),a("q-card-section",[a("img-inputer",{staticStyle:{width:"100%"},attrs:{theme:"dark",size:"large",placeholder:"點擊或拖曳選擇圖片","bottom-text":"點擊或拖曳以修改","img-src":t.form.image},model:{value:t.form.image,callback:function(e){t.$set(t.form,"image",e)},expression:"form.image"}})],1),a("q-card-actions",{staticClass:"justify-around"},["編輯文章"===t.mode?a("q-btn",{staticClass:"text-negative",staticStyle:{width:"80px"},attrs:{flat:"",label:"刪除"},on:{click:t.deleteArticle}}):t._e(),a("q-btn",{staticClass:"text-dark",staticStyle:{width:"80px"},attrs:{flat:"",label:"取消"},on:{click:t.resetForm}}),a("q-btn",{staticClass:"text-primary",staticStyle:{width:"80px"},attrs:{flat:"",label:"確認"},on:{click:t.submitModal}})],1)],1)],1)],1)},i=[],l=a("758b"),r=a("355a"),o={name:"Profile",components:{CardArticle:r["a"]},data(){return{articles:[],alert:!1,mode:"",submitDisable:!1,option_articles:[],option_festivals:[],form:{title:"",date:"",content:"",information:"",image:"",author:this.$store.state.user.user.account,article:"",festival:"",published:"",_id:""}}},computed:{user(){return this.$store.getters["user/user"]}},methods:{resetForm(t){this.alert=!1,this.form={title:"",date:"",content:"",information:"",image:"",author:this.$store.state.user.user.account,article:"",festival:"",published:!0,_id:""}},editArticle(){this.mode="編輯文章",this.alert=!0},async articleIn(){try{const{data:t}=await l["a"].get("/articles/"+this.form.article._id);t.result.date=new Date(t.result.date).toLocaleDateString(),t.result.image&&(t.result.image=`https://festivalsweb.herokuapp.com//files/${t.result.image}`),this.form={title:t.result.title,date:t.result.date,content:t.result.content,information:t.result.information,image:t.result.image,author:this.$store.state.user.user.account,article:t.result.title,festival:t.result.festival.title,_id:t.result._id}}catch(t){this.alert=!1,this.$swal({icon:"error",title:"帶入文章資料失敗"})}},addArticle(){this.mode="新增文章",this.resetForm(),this.alert=!0},async deleteArticle(){try{this.form.published=!1;const t=new FormData;for(const a in this.form)t.append(a,this.form[a]);const{data:e}=await l["a"].patch("/articles/"+this.form._id,t);console.log(e),console.log("yes"),this.alert=!1,this.$swal({icon:"success",title:"成功",text:"成功刪除文章"})}catch(t){this.alert=!1,console.log(t),this.$swal({icon:"error",title:"錯誤",text:"刪除文章失敗"})}},async submitModal(){this.submitDisable=!0,this.form.published=!0;try{const t=new FormData;for(const e in this.form)t.append(e,this.form[e]);0===this.form._id.length?(await l["a"].post("/articles",t),this.$swal({icon:"success",title:"成功新增文章"})):(console.log("/articles/"+this.form._id),await l["a"].patch("/articles/"+this.form._id,t),this.$swal({icon:"success",title:"成功編輯文章"})),this.alert=!1,this.resetForm()}catch(t){console.log(t),this.alert=!1,this.$swal({icon:"error",title:"設定文章失敗"})}this.submitDisable=!1}},async mounted(){try{const{data:t}=await l["a"].get("/articles/author/"+this.$store.state.user.user.account);this.articles=t.result.map((t=>(t.image&&(t.image=`https://festivalsweb.herokuapp.com//files/${t.image}`),t.label=t.title,t.date=new Date(t.date).toLocaleDateString(),t)))}catch(t){this.$swal({icon:"error",title:"錯誤",text:"取得文章資料失敗"})}try{const{data:t}=await l["a"].get("/festivals/all");this.option_festivals=t.result.map((t=>(t.image&&(t.image=`https://festivalsweb.herokuapp.com//files/${t.image}`),t.title)))}catch(t){this.$swal({icon:"error",title:"錯誤",text:"取得節慶選項失敗"})}}},c=o,n=a("2877"),m=a("9c40"),d=a("24e8"),u=a("f09f"),f=a("a370"),h=a("ddd8"),p=a("27f9"),b=a("4b7e"),g=a("eebe"),v=a.n(g),x=Object(n["a"])(c,s,i,!1,null,null,null);e["default"]=x.exports;v()(x,"components",{QBtn:m["a"],QDialog:d["a"],QCard:u["a"],QCardSection:f["a"],QSelect:h["a"],QInput:p["a"],QCardActions:b["a"]})},"355a":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-card",{staticClass:"q-mx-md q-mb-xl col card_article",attrs:{flat:"",bordered:""}},[a("q-img",{attrs:{src:t.article.image}}),a("q-card-section",[a("div",{staticClass:"text-h6 q-mt-sm q-mb-xs",staticStyle:{color:"black"}},[t._v(t._s(t.article.title))]),a("div",{staticClass:"text-caption text-grey"},[t._v(t._s(t.article.content))])])],1)},i=[],l={name:"CardArticle",props:{article:{type:Object,required:!0}}},r=l,o=a("2877"),c=a("f09f"),n=a("068f"),m=a("a370"),d=a("eebe"),u=a.n(d),f=Object(o["a"])(r,s,i,!1,null,null,null);e["a"]=f.exports;u()(f,"components",{QCard:c["a"],QImg:n["a"],QCardSection:m["a"]})}}]);