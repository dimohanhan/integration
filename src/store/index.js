import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    // uid: localStorage.getItem('userid') ? localStorage.getItem('userid') : '',
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      state.uid = user.uid;
      console.log(state.Authorization, '111')
      localStorage.setItem('Authorization', user.Authorization);
      // localStorage.setItem('userid', user.uid);
    }
  }
});

export default store;