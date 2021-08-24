(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"17be":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"container"},[e("div",{staticClass:"row q-mx-lg q-mt-xl"},[e("div",{staticClass:"col-12 col-md q-mr-xl q-mb-xl"},[e("q-img",{staticStyle:{height:"250px"},attrs:{src:t.image}})],1),e("div",{staticClass:"col-12 col-md q-mb-xl",staticStyle:{"font-size":"1.5rem"}},[e("div",{staticClass:"row"},[t._v(t._s(t.name))]),e("div",{staticClass:"row"},[t._v("$"+t._s(t.price))]),e("div",{staticClass:"row"},[e("p",{staticStyle:{"font-size":"1rem"}},[t._v(t._s(t.description))])]),e("div",{staticClass:"row q-py-sm items-center"},[e("div",{staticClass:"col"},[e("div",{staticClass:"row",staticStyle:{"min-width":"210px"}},[e("q-select",{staticClass:"q-mr-sm",staticStyle:{width:"80px"},attrs:{borderless:"",options:t.options.size,label:"尺寸"},model:{value:t.size,callback:function(s){t.size=s},expression:"size"}}),e("q-select",{staticClass:"q-mr-sm",staticStyle:{width:"80px"},attrs:{borderless:"",options:t.options.amount,label:"數量"},model:{value:t.amount,callback:function(s){t.amount=s},expression:"amount"}})],1)]),e("div",{staticClass:"col"},[e("div",{staticClass:"row",staticStyle:{"min-width":"210px"}},[e("q-btn",{staticClass:"q-mr-sm",staticStyle:{border:"1px solid black",height:"2rem"},attrs:{flat:""},on:{click:t.addcart}},[t._v("加入購物車")]),e("q-btn",{staticClass:"q-mr-sm",staticStyle:{border:"1px solid black",height:"2rem"},attrs:{flat:""},on:{click:t.checkout}},[t._v("立即購買")])],1)])])])]),e("hr"),e("div",{staticClass:"row"},[e("h5",{staticClass:"col q-mx-lg"},[t._v("其他商品")]),e("div",{staticClass:"row q-mb-xl"},t._l(t.products,(function(t){return e("div",{key:t._id,staticClass:"col-12 col-sm-6 col-md-4"},[e("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:"/product/"+t._id}},[e("CardProduct",{attrs:{product:t}})],1)],1)})),0)])])},a=[],r=(e("e01a"),e("758b")),o=e("9294"),c={name:"Product",components:{CardProduct:o["a"]},data(){return{name:"",price:"",description:"",image:"",sell:!0,size:null,amount:null,options:{size:[],amount:["1","2","3","4","5","6","7","8","9","10"]},products:[]}},methods:{async addcart(){if(0!==this.$store.state.user.jwt.token.length)if(null!=this.size)if(null!=this.amount)try{await r["a"].post("/users/cart",{product:this.$route.params.id,amount:this.amount,size:this.size,size_option:this.options.size},{headers:{authorization:"Bearer "+this.$store.state.user.jwt.token}}),this.$swal({icon:"success",title:"成功",text:"成功加入購物車"})}catch(t){this.$swal({icon:"error",title:"錯誤",text:"加入購物車失敗"})}else this.$swal({icon:"error",title:"錯誤",text:"請先選擇商品數量"});else this.$swal({icon:"error",title:"錯誤",text:"請先選擇商品尺寸"});else this.$swal({icon:"error",title:"錯誤",text:"請先登入"})},async checkout(){if(0!==this.$store.state.user.jwt.token.length)if(null!=this.size)if(null!=this.amount)try{await r["a"].post("/users/cart",{product:this.$route.params.id,amount:this.amount,size:this.size,size_option:this.options.size},{headers:{authorization:"Bearer "+this.$store.state.user.jwt.token}}),await r["a"].post("/users/checkout",{},{headers:{authorization:"Bearer "+this.$store.state.user.jwt.token}}),this.$swal({icon:"success",title:"成功",text:"成功下單"}),this.$router.push("/order")}catch(t){this.$swal({icon:"error",title:"錯誤",text:"下單失敗"})}else this.$swal({icon:"error",title:"錯誤",text:"請先選擇商品數量"});else this.$swal({icon:"error",title:"錯誤",text:"請先選擇商品尺寸"});else this.$swal({icon:"error",title:"錯誤",text:"請先登入"})}},async mounted(){try{const{data:t}=await r["a"].get("/products/"+this.$route.params.id);this.name=t.result.name,this.price=t.result.price,this.description=t.result.description,this.options.size=t.result.size,this.image=`https://festivalsweb.herokuapp.com//files/${t.result.image}`,this.sell=t.result.sell,document.title=`${this.name} | 商店`}catch(t){this.$router.push("/")}try{const{data:t}=await r["a"].get("/products");this.products=t.result.map((t=>(t.image&&(t.image=`https://festivalsweb.herokuapp.com//files/${t.image}`,console.log(t.image)),t)))}catch(t){this.$router.push("/")}}},l=c,n=e("2877"),u=e("068f"),d=e("ddd8"),m=e("9c40"),h=e("eebe"),p=e.n(h),w=Object(n["a"])(l,i,a,!1,null,null,null);s["default"]=w.exports;p()(w,"components",{QImg:u["a"],QSelect:d["a"],QBtn:m["a"]})},9294:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("q-card",{staticClass:"q-mx-md q-mb-xl col card_product",attrs:{bordered:""}},[e("q-img",{attrs:{src:t.product.image}}),e("q-card-section",[e("div",{staticClass:"text-h6 q-mt-sm q-mb-xs",staticStyle:{color:"black"}},[t._v(t._s(t.product.name))]),e("div",{staticClass:"text-caption text-grey"},[t._v(t._s(t.product.description))])])],1)},a=[],r={name:"CardProduct",props:{product:{type:Object,required:!0}}},o=r,c=e("2877"),l=e("f09f"),n=e("068f"),u=e("a370"),d=e("eebe"),m=e.n(d),h=Object(c["a"])(o,i,a,!1,null,null,null);s["a"]=h.exports;m()(h,"components",{QCard:l["a"],QImg:n["a"],QCardSection:u["a"]})}}]);