
import adminApi from './adminApi';
import shiroApi from './shiroApi';
import mayiApi from './mayiApi';
import msgApi from './msgApi';

import axios from "axios";
/**
 * 接口汇总
 */
let base = process.env.API_ROOT;
  export const loginIn = params => { return axios.post('http://user.logwsd.com/login', params ) };
//export const loginIn = params => { return axios.post('http://192.168.1.166:5010/login', params ) };
// export const loginIn = params => { return axios.post('http://140.143.236.130:5010/login', params ) };
// export const loginIn = params => { return axios.post('http://192.168.1.166:5010/login', params ) };//桂林测试
//export const getList = params => { return axios.post(`${base}/tmsReport/getList`, params ).then(res => res.data) };
export const getList = params => { return axios.get(`${base}/tmsReport/getList`,{ params: params })};
export const getVehgrpnam = params => { return axios.get(`${base}/gpsV2_3/getVehgrpnam`, { params: params }); };
export const outExport = params => { return axios.get(`${base}/tmsReport/export`, { params: params }); };
export const outExportInfo = params => { return axios.get(`${base}/tmsReport/exportViolations`, { params: params }); };
export const getViolationsList = params => { return axios.get(`${base}/tmsReport/getViolationsList`, { params: params }); };
export const carDetaileds = params => { return axios.get(`${base}/vehicles/carDetaileds`, { params: params }); };
export const DetailedExport = params => { return axios.get(`${base}/vehicles/carDetaileds_export`, { params: params }); };
export const getVehEfficiency = params => { return axios.get(`${base}/tmsReport/getVehEfficiency`, { params: params }); };
export const exportVehEfficiency = params => { return axios.get(`${base}/tmsReport/exportVehEfficiency`, { params: params }); };

//仓储报表接口汇总
//仓库列表
export const storelist = params => { return axios.get(`${base}/wms/outreport/inventoryCount`,{ params: params })};
//入库列表
export const intlist = params => { return axios.post(`${base}/wms/report/in/inventory/list`, params ) };
//入库列表详情
export const intdetaillist = params => { return axios.post(`${base}/wms/report/in/inventory/detail`,params)};
//出库列表
export const outlist = params => { return axios.get(`${base}/wms/outreport/outInfo`, { params: params } ) };
//出库列表详情
export const outdetaillist = params => { return axios.get(`${base}/wms/outreport/outInfoDetailMain`, { params: params } ) };
//库存列表
export const stocklist = params => { return axios.get(`${base}/wms/stock/manage/list`,{ params: params })};
//库存列表详情
export const stockdetaillist = params => { return axios.get(`${base}/wms/stock/manage/details/list`,{ params: params })};
//待检列表
export const pendlist = params => { return axios.get(`${base}/wms/stock/manage/noTest/list`,{ params: params })};
//待检列表详情
export const penddetaillist = params => { return axios.get(`${base}/wms/stock/manage/noTest/details`,{ params: params })};






export default {
    /**用户,角色,组织等管理接口 */
    adminApi: adminApi,
    /**认证接口 */
    shiroApi: shiroApi,
    /**蚂蚁种树接口 */
    mayiApi:mayiApi,
    /**消息接口 */
    msgApi:msgApi,

}
