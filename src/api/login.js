import axios from '../../src/utils/request';
import md5 from 'js-md5';
import Vue from 'vue'
Vue.prototype.$md5 = md5;
const getUserLogin = ({ uid, passwd }) =>
  axios.request({
    url: `/login`,
    method: 'POST',
    data: {
      uid,
      passwd: md5(passwd)
    },
  });

export { getUserLogin };
