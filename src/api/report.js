import axios from '../../src/utils/request';
//查询
const getReportSearch = (size, page, createuser, taskname,flag,ordering) =>
  axios.request({
    url: `report/v1/list`,
    method: 'get',
    params: {
      size,
      page,
      createuser,
      taskname,
      flag,
      ordering
    },
  });
  //任务详情
const getReportDetial= (taskid) =>
axios.request({
  url: `report/v1/detail`,
  method: 'get',
  params: {
    taskid: taskid,
  },
});
//执行
const getReportExecute = (origin) =>
axios.request({
  url: `task/v1/taskOrignlist/`,
  method: 'POST',
  data: {
    optype: '0',
    data: {
      origin,
      createuser:localStorage.getItem('uid')
    }
  }
});
  export {getReportSearch,getReportDetial,getReportExecute};