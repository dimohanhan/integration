import axios from '../../src/utils/request';
//查询
const getReportSearch = (size, page, createuser, taskid) =>
  axios.request({
    url: `report/v1/list`,
    method: 'get',
    params: {
      size,
      page,
      createuser: createuser,
      taskid: taskid,
    },
  });
  export {getReportSearch};