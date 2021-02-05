import axios from '../../src/utils/request';
//产品下拉查询
const getTaskProduct = () =>
  axios.request({
    url: 'productlist/v1/list',
    method: 'get',
  });
//模块下拉查询
const getTaskModule = (productid) =>
  axios.request({
    url: 'modulelist/v1/list',
    method: 'POST',
    data: {
      productid: productid
    }
  });
//主页表格查询
const getTaskSearch = (size, page,search, ordering) =>
  axios.request({
    url: `task/v1/searchTask`,
    method: 'get',
    params: {
      size,
      page,
      search,
      ordering: ordering

    },
  });
//点击创建页穿梭框表格查询
const getTaskAddSearch = (size, page, taskid) =>
  axios.request({
    url: `script/v1/distinct`,
    method: 'get',
    params: {
      size,
      page,
      taskid: taskid
    },
  });
//穿梭框接口查询
const getTasktransfer = (page, size, moduleid) =>
  axios.request({
    url: `user/v1/list`,
    method: 'get',
    params: {
      page,
      size,
      moduleid: moduleid
    },
  });
//创建任务管理第一页面的保存
const getTaskAdd = (taskname, description, moduleid, cases) =>
  axios.request({
    url: `/task/v1/manage/`,
    method: 'POST',
    data: {
      optype: '0',
      data: {
        taskname,
        description,
        createuser: localStorage.getItem('uid'),
        moduleid,
        cases
      }
    }
  });
//创建任务管理第二页面的保存
const getTaskSecondAdd = ({ taskid,taskname, description, moduleid, remainingtimes, interval, issendemail, email, begintime, rcycleflag, cases }) =>
  axios.request({
    url: `/task/v1/manage/`,
    method: 'POST',
    data: {
      optype: '1',
      data: {
        taskid,
        taskname,
        description,
        createuser: localStorage.getItem('uid'),
        moduleid,
        cases,//任务关联用例，内容为由用例编号组成的数组
        remainingtimes,//重试次数
        interval,//执行间隔
        issendemail,//是否发送邮件（0不发，1发）
        email,//发送邮件
        rcycleflag,//执行方式（0：立即执行1：定时执行 2:暂不执行）
        begintime,//任务开始时间
      }
    }
  });
//主页表格中的删除功能
const getTaskDelete = (taskid) =>
  axios.request({
    url: `task/v1/manage/`,
    method: 'POST',
    data: {
      optype: '2',
      data: {
        taskid
      }
    }
  });
  //主页表格中的执行功能
const getTaskExecute = (origin,createuser) =>
axios.request({
  url: `task/v1/taskOrignlist/`,
  method: 'POST',
  data: {
    optype: '0',
    data: {
      origin,
      createuser
    }
  }
});
//点击详情页表格查询
const getTaskDetialSearch = (size, page, taskid,ordering) =>
  axios.request({
    url: `task/v1/task_cases`,
    method: 'get',
    params: {
      size,
      page,
      taskid: taskid,
      ordering: ordering
    },
  });
  //点击详情页查询详情数据
const getTaskDetialDetail = (taskid) =>
axios.request({
  url: `task/v1/manage`,
  method: 'get',
  params: {
    taskid: taskid,
  },
});
  //详情页面表格多选删除功能
const getDetialTaskDelete = (taskid,deletelist) =>
axios.request({
  url: `task/v1/task_cases/`,
  method: 'POST',
  data: {
    optype: '2',
    data: {
      taskid,
      deletelist
    }
  }
});
//详情页里的穿梭框保存
const getTasktransferAdd= (taskid, cases) =>
  axios.request({
    url: `task/v1/task_cases/`,
    method: 'POST',
    data: {
      optype: '0',
      data: {
        taskid,
        cases
      }
    }
  });
  //新增里的穿梭框查询
const getTasktransferSearch= (moduleid) =>
axios.request({
  url: `script/v1/distinct`,
  method: 'get',
  params: {
    moduleid,
  }
});
//子任务列表查询接口
const getTaskChildrenSearch = (size, page, taskid) =>
  axios.request({
    url: `task/v1/taskOrignlist`,
    method: 'get',
    params: {
      size,
      page,
      taskid: taskid,
  
    },
  });
export { getTaskProduct, getTaskModule, getTasktransfer,
  getTaskSearch, getTaskAddSearch, getTaskAdd, getTaskSecondAdd,
  getTaskDelete, getTaskDetialSearch,getDetialTaskDelete,getTasktransferAdd ,
  getTasktransferSearch,getTaskChildrenSearch,getTaskExecute,getTaskDetialDetail};
