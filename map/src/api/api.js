import axios from 'axios';

let base = process.env.API_ROOT;
// let bases = "http://192.168.1.166:8118";
// let base = "http://192.168.1.71:5030";
//let bases = "http://test-tms.logwsd.com";



export const delstorehouse = params => { return axios.post(`${base}/storehouse/delete`, params ).then(res => res.data) };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };




export const selectData = params => { return axios.get(`${base}/dispatcherStatist2/vehicleGroups`, { params: params }); }; 

export const lastLocation = params => { return axios.post(`${base}/gps/lastLocationPC`, params).then(res => res.data)  };

export const truckTrack = params => { return axios.post(`${base}/gps/truckTrackPC`, params).then(res => res.data)  };

export const historyTruckTrack = params => { return axios.post(`${base}/gps/historyTruckTrackPC`, params).then(res => res.data)  };

export const orderList = params => { return axios.post(`${base}/gps/orderList`, params).then(res => res.data)  };

export const getVehStatusNum = params => { return axios.get(`${base}/v3/getVehStatusNum`,  { params: params }); };
export const getVehStatusList = params => { return axios.get(`${base}/v3/getVehStatusList`, { params: params});};

export const loadingTruckNum = params => { return axios.get(`${base}/vehicles/loadCar`, { params: params}); }; 
export const deliveryTruckNum = params => { return axios.get(`${base}/gpsV2_3/deliveryTruckNum`, { params: params }); }; 
export const waybillDetails = params => { return axios.get(`${base}/gpsV2/waybillDetails`, { params: params }); }; 
//export const finishOrder = params => { return axios.get(`${base}/gpsV2_3/finishWaybillDetails`, { params: params });  };
export const vehicleGroupsQuery = params => { return axios.get(`${base}/gpsV2_3/getVehgrpnam`, { params: params }); }; 
export const contractVehicle = params => { return axios.get(`${base}/gpsV2_3/getVehlicnum`, { params: params }); }; 
export const finishWaybillDetails = params => { return axios.get(`${base}/gpsV2_3/finishWaybillDetails`, { params: params }); }; 
export const historyTruckNum = params => { return axios.post(`${base}/gpsV2_3/historyTruckNum`, params).then(res => res.data)  };
export const appointManage = params => { return axios.get(`${base}/vehicles/appoint_manage`, { params: params }); }; 
export const noSentOrder = params => { return axios.get(`${base}/vehicles/noSentOrder`, { params: params }); }; 
export const deliveryDetaileds = params => { return axios.get(`${base}/vehicles/deliveryDetaileds`, { params: params }); }; 
export const tit = params => { return axios.get(`${base}/gps/title`, { params: params }); }; 













