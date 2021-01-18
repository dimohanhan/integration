import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.use(VueRouter)


// 解决重复路由造成的控制台报错的问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),

  },

  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    children: [
      {
        path: '/',
        name: 'content',
        component: () => import('@/views/content'),

      },
      {
        path: '/home/personal',
        name: 'personal',
        component: () => import('@/views/personalCenter'),

      },
      {
        path: '/userManagement',
        name: 'userManagement',
        component: () => import('@/views/userManagement'),

      },
      {
        path: '/roleManagement',
        name: 'roleManagement',
        component: () => import('@/views/roleManagement'),

      },
      {
        path: '/authManagement',
        name: 'authManagement',
        component: () => import('@/views/authManagement'),

      },
      {
        path: '/content',
        name: 'content',
        component: () => import('@/views/content'),

      },
      {
        path: '/tastManagement',
        name: 'tastManagement',
        component: () => import('@/views/tastManagement'),

      },
      {
        path: '/taskSetManagement',
        name: 'taskSetManagement',
        component: () => import('@/views/taskSetManagement'),

      },
      {
        path: '/productManagement',
        name: 'productManagement',
        component: () => import('@/views/productManagement'),

      },
      {
        path: '/interfaceManagement',
        name: 'interfaceManagement',
        component: () => import('@/views/interfaceManagement'),
      },
      {
        path: '/reportManagement',
        name: 'reportManagement',
        component: () => import('@/views/reportManagement'),
      },
      {
        path: '/ImportScript',
        name: 'ImportScript',
        component: () => import('@/views/ImportScript'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router
