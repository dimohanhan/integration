import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/iconfont.css'
import './style/index.css'
// import axios from 'axios'
import Router from 'vue-router'

import * as api from './api';
Vue.prototype.$http = api;

Vue.config.productionTip = false
// const request = axios.create({
//   // process.env.NODE_ENV === 'development' 来判断是否开发环境
//   baseURL: 'https://www.fastmock.site/mock/a13e6c0e35501e4dc2fcfc9cdb640b7d/sys',
//   timeout: 5000,
// })

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// export default request;