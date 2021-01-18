import axios from '../../src/utils/request';


//产品下拉查询
const getimportProduct = () =>
  axios.request({
    url: 'productlist/v1/list',
    method: 'get',
  });
//模块下拉查询
const getImportModule = (productid) =>
  axios.request({
    url: 'modulelist/v1/list',
    method: 'POST',
    data: {
      productid: productid
    }
  });
//查询
const getImportSearch = (size, page, moduleid, filename, productid, ordering) =>
  axios.request({
    url: `script/v1/list`,
    method: 'get',
    params: {
      size,
      page,
      moduleid: moduleid,
      filename: filename,
      productid: productid,
      ordering: ordering

    },
  });
//用户删除
const getImportDelete = (scriptid) =>
  axios.request({
    url: `/script/v1/delete/`,
    method: 'POST',
    data: {
      delete: scriptid


    }
  });
export { getimportProduct, getImportModule, getImportSearch, getImportDelete };
