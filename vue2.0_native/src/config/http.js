/*
 * @Description: In User Settings Edit
 * @Author: sailei
 * @Date: 2018-12-14 16:59:00
 */
import axios from 'axios'
import qs from 'qs'
import {
    Toast,
    Indicator
} from 'mint-ui'
import router from '../router'
import {
    getCache
} from './utils'
import native from '@/native/bridge.js'




//const localUrlT = "http://192.168.1.101:8002"; //河北测试环境


// const localUrlT = "http://test-tms.logwsd.com"; //河北测试环境
// const localUrl = "http://test-wms.logwsd.com/"; //河北测试环境
// const localUrlG = "http://test-com.logwsd.com"; //河北测试公共环境

// const localUrlT = "http://192.168.1.166:5030"; //测试环境
// const localUrl = "http://192.168.1.166:5050/"; //测试环境
// const localUrlG = "http://192.168.1.166:5010"; //测试公共环境


const localUrlT = "http://192.168.56.31:5030"; //测试环境
const localUrl = "http://192.168.56.31:5050/"; //测试环境
const localUrlG = "http://192.168.56.31:5010"; //测试公共环境

// const localUrlT = "http://coca-tms.logwsd.com"; //香河测试环境
// const localUrl = "http://coca-wms.logwsd.com/"; //香河测试环境
// const localUrlG = "http://coca-com.logwsd.com"; //香河测试公共环境


// const localUrlT = "http://xh-tms.logwsd.com"; //长春环境
// const localUrl = "http://xh-wms.logwsd.com/"; //长春环境
// const localUrlG = "http://xh-com.logwsd.com"; //长春环境



// const localUrlT = "http://tms.logwsd.com"; //河北生产环境
// const localUrl = "http://wms.logwsd.com/"; //河北生产环境
// const localUrlG = "http://user.logwsd.com"; //河北生产环境

// const localUrlT = "http://gl-tms.logwsd.com"; //桂林生产
// const localUrl = "http://gl-wms.logwsd.com/"; //桂林生产
// const localUrlG = "http://gl-com.logwsd.com"; //桂林生产


// http request 拦截器
axios.interceptors.request.use(
    native.callhandler('getConnectionInfo', '', connectionInfo => {
        if (connectionInfo == 'none') {
            Toast('网络连接未开启！')
        } else {
            config => {
                    return config;
                },
                err => {
                    return Promise.reject(err);
                }
        }
    })


    // config => {
    //     console.log(config)
    //     config.headers['token'] = 123
    // } 
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        let status = response.data.ret_code;
        switch (status) {
            case '1':
                break
            case '2':
                native.callhandler("showVoice", "账户已在其他设备登陆，请重新登录!");
                setTimeout(() => {
                    router.replace({
                        path: '/login'
                    })
                }, 1500)
                break
        }
        return response
    },
    error => {
        Toast('服务器连接错误!')
      
        Indicator.close()
        return Promise.resolve(error.response)
    }
)

export default {
    post(url, params) {
        let token = getCache('token');
        token = token ? token : '';
        let timeout = 15000;
        let header
        if (url == "/login" || url == "/regist" || url == "/app/navi") {
            url = localUrlG + url + "?token=" + token
            header = {
                'token': token ? token : '',
                'content-type': 'application/x-www-form-urlencoded',
            }
        } else if (url == "/image/upload") {
            url = "http://test-upload.logwsd.com/image/upload"
            header = {
                'token': token ? token : '',
                'content-type': 'application/x-www-form-urlencoded',
            }
        } else if (url.startsWith('/', 0)) {
            header = {
                'token': token ? token : '',
                'content-type': 'application/x-www-form-urlencoded',
            }
            url = localUrlT + url + "?token=" + token
        } else {
            header = {
                'token': token ? token : '',
                'content-type': 'application/x-www-form-urlencoded',
            }
            url = localUrl + url + "?token=" + token
        }
        return axios({
            method: 'post',
            url,
            data: params ? qs.stringify(params) : {},
            timeout: timeout,
            headers: header
        })
    },
    get(url, params) {
        let token = getCache('token');
        token = token ? token : '';
        // url = localUrl + url + "?token=" + token;
        if (url.startsWith('/', 0)) {
            url = localUrlT + url + "?token=" + token
        } else {
            url = localUrl + url + "?token=" + token
        }
      
        let timeout = 15000;
        let username = getCache('username');
        let header = {
            'token': token ? token : '',
            'username': username ? username : '',
        }
        return axios({
            method: 'get',
            url,
            params: params ? params : {},
            timeout: timeout,
            headers: header
        })
    }
}