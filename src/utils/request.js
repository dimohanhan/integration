/****   request.js   ****/
// 导入axios

import Vue from 'vue'
import axios from 'axios'
import router from '../router'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.use(router)
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口-
  // baseURL: 'http://10.1.61.34:8000',//服务器
  // baseURL: 'http://10.4.4.79:8000',//本地王岳峰
  baseURL: 'http://10.1.94.89:8000',//刘慧
  // baseURL: 'http://10.1.71.243:8000',//候瑞丰
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000
})

//添加请求拦截器
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    //对请求错误做什么
    return Promise.reject(error);
  }
)
//http reponse响应拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error.response.status)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('Authorization');
          router.push({ path: '/login' });//易错点：写成this.$router无法成功跳转登录页，以为没有this的实例
      }
    }
  })
//4.导入文件
export default service
