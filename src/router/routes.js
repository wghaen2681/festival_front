const routes = [
  // 網站前台
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Home.vue'),
        meta: {
          title: '年度活動'
        }
      },
      {
        path: 'progress',
        name: 'Progress',
        component: () => import('pages/Progress.vue'),
        meta: {
          title: '進行中｜年度活動'
        }
      },
      // 將所有路由為 /festival/:id 的頁面都導向 Festival.vue
      {
        path: '/festival/:id',
        name: 'Festival',
        component: () => import('pages/Festival.vue'),
        meta: {
          title: '節慶 | 年度活動'
        }
      },
      // 將所有路由為 /article/:id 的頁面都導向 Article.vue
      {
        path: '/article/:id',
        name: 'Article',
        component: () => import('pages/Article.vue'),
        meta: {
          title: '文章 | 年度活動'
        }
      },
      {
        path: 'spring',
        name: 'Spring',
        component: () => import('pages/Spring.vue'),
        meta: {
          title: '春季｜年度活動'
        }
      },
      {
        path: 'summer',
        name: 'Summer',
        component: () => import('pages/Summer.vue'),
        meta: {
          title: '夏季｜年度活動'
        }
      },
      {
        path: 'autumn',
        name: 'Autumn',
        component: () => import('pages/Autumn.vue'),
        meta: {
          title: '秋季｜年度活動'
        }
      },
      {
        path: 'winter',
        name: 'Winter',
        component: () => import('pages/Winter.vue'),
        meta: {
          title: '冬季｜年度活動'
        }
      },
      {
        path: 'community',
        name: 'Community',
        component: () => import('pages/Community.vue'),
        meta: {
          title: '社區｜年度活動'
        }
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import('pages/Store.vue'),
        meta: {
          title: '商店｜年度活動'
        }
      },
      {
        path: '/product/:id',
        name: 'Product',
        component: () => import('pages/Product.vue'),
        meta: {
          title: '商品 | 年度活動'
        }
      },
      // 將所有路由為 /product/:id 的頁面都導向 Product.vue
      {
        path: 'assist',
        name: 'Assist',
        component: () => import('pages/Assist.vue'),
        meta: {
          title: '協助｜年度活動'
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('pages/About.vue'),
        meta: {
          title: '關於我們｜年度活動'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Register.vue'),
        meta: {
          title: '註冊｜年度活動'
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: {
          title: '登入｜年度活動'
        }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('pages/Cart.vue'),
        meta: {
          login: true,
          title: '購物車｜年度活動'
        }
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('pages/Order.vue'),
        meta: {
          login: true,
          title: '訂單｜年度活動'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/Profile.vue'),
        meta: {
          login: true, title: '個人檔案｜年度活動'
        }
      }
    ]
  },
  // 網站後台
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      // 引用子分頁的路由器
      {
        path: 'member',
        component: () => import('pages/AdminMember.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '會員｜管理後台'
        }
      },
      {
        path: 'festival',
        component: () => import('pages/AdminFestival.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '節慶｜管理後台'
        }
      },
      {
        path: 'article_tag',
        component: () => import('pages/AdminArticle.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '文章標籤｜管理後台'
        }
      },
      {
        path: 'plan',
        component: () => import('pages/AdminPlan.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '計畫｜管理後台'
        }
      },
      {
        path: 'product',
        component: () => import('pages/AdminProduct.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '商品｜管理後台'
        }
      },
      {
        path: 'order',
        component: () => import('pages/AdminOrder.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '訂單｜管理後台'
        }
      },
      {
        path: 'assist',
        component: () => import('pages/AdminAssist.vue'),
        meta:
        {
          login: true,
          admin: true,
          title: '協助｜管理後台'
        }
      }
    ]
  },
  // 測試頁面路由器
  {
    path: '/test',
    name: 'Test',
    component: () => import('pages/Test.vue'),
    meta: { title: '測試｜年度活動' }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
