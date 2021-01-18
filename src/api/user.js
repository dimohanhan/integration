import axios from '../../src/utils/request';
import md5 from 'js-md5';
import Vue from 'vue'
Vue.prototype.$md5 = md5;
//用户管理查询
const getUserSearch = (size, page, state, ordering) =>
  axios.request({
    url: `user/v1/list`,
    method: 'get',
    params: {
      size,
      page,
      state,
      ordering: ordering
    },
  });
//组别下拉查询
const getUserGroup = () =>
  axios.request({
    url: `group/v1/list`,
    method: 'get',
  });
//角色下拉查询
const getUserRole = () =>
  axios.request({
    url: `role/v1/list`,
    method: 'get',

  });
//用户管理新增
const getUserAdd = ({ uid, username, group, role, state, passwd }) =>
  axios.request({
    url: `user/v1/detail`,
    method: 'POST',
    data: {
      optype: '0',
      data: {
        uid,
        username,
        group,
        role,
        state,
        passwd: md5(passwd)
      }
    }
  });
//用户管理修改
const getUserEdit = ({ uid, username, group, role, state }) =>
  axios.request({
    url: `user/v1/detail`,
    method: 'POST',
    data: {
      optype: '1',
      data: {
        uid,
        username,
        group,
        role,
        state
      }
    }

  });
//用户详情
const getUserDetail = () =>
  axios.request({
    url: `/user/v1/detail`,
    method: 'get',
    params: {
      user: localStorage.getItem('uid')
    },
  });
//用户删除
const getUserDelete = (uid) =>
  axios.request({
    url: `user/v1/detail`,
    method: 'POST',
    data: {
      optype: '2',
      data: {
        uid
      }
    }
  });
export { getUserSearch, getUserGroup, getUserRole, getUserAdd, getUserEdit, getUserDetail, getUserDelete };