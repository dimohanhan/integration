import axios from '../../src/utils/request';

//主页表格查询
const getProductSearch = (size, page, ordering) =>
  axios.request({
    url: `module/v1/list`,
    method: 'get',
    params: {
      size,
      page,
      ordering: ordering

    },
  });
//产品下拉查询
const getProduct = () =>
  axios.request({
    url: 'productlist/v1/lists',
    method: 'get',
  });
  //产品删除
const getProductDelete = (moduleid) =>
axios.request({
  url: `module/v1/manage/`,
  method: 'POST',
  data: {
    optype:'2',
    data:{
      moduleid
    }
 
  }
});
//环境信息删除
const getEnvironmentDelete = (environmentid) =>
axios.request({
  url: `environment/v1/manage`,
  method: 'POST',
  data: {
    optype:'2',
    data:{
      environmentid
    }
  }
});
//进入配置前调取详情接口查询
const getProductDetials = (module) =>
  axios.request({
    url: `module/v1/detail`,
    method: 'get',
    params: {
      module
    },
  });
//环境配置页面的保存（新增）
const getEnvironmentSave= ({environmentname,moduleid,host,port,user,password,db,contents,username}) =>
axios.request({
  url: `environment/v1/manage`,
  method: 'POST',
  data: {
    optype:'0',
    data:{
      environmentname,
      moduleid,
      host,
      port,
      user,
      password,
      db,
      contents,
      username,
    }
  }
});
//环境配置页面的保存（修改）
const getEnvironmentResert= ({environmentname,moduleid,host,port,user,password,db,contents,username,environmentid}) =>
axios.request({
  url: `environment/v1/manage`,
  method: 'POST',
  data: {
    optype:'1',
    data:{
      environmentname,
      moduleid,
      host,
      port,
      user,
      password,
      db,
      contents,
      username,
      environmentid
    }
  }
});
//环境测试页面保存成功后查询表格
const getEnvironmentSearch = (moduleid,ordering) =>
  axios.request({
    url: `environment/v1/list`,
    method: 'get',
    params: {
      moduleid,
      ordering: ordering
    },
  });
export { getProductSearch, getProduct,getProductDelete ,getEnvironmentSave,getEnvironmentSearch,getEnvironmentResert,getProductDetials,getEnvironmentDelete};
