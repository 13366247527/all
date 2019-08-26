/*
 * @Description: In User Settings Edit
 * @Author: sailei
 * @Date: 2018-12-15 14:27:14
 */
import axios from 'axios'
import native from './bridge'
//import { setCache, getCache } from '../config/utils'


//检查版本号更新时间
//const checkUpdateTime = 6 * 60 * 60 * 1000;
//原生版本号
//const nativeVersion = '1.1.0'
const versionCode = '210'

//h5版本号
//const version = '1.0.0';
const versionCodeH5 = '213';

//const publicPath = "http://192.168.1.166:5010"; //测试环境
// const publicPath = "http://test-com.logwsd.com"; //河北测试公共环境

//const publicPath = "http://xh-com.logwsd.com"; //长春环境

//const publicPath = "http://gl-com.logwsd.com"; //桂林生产环境
// const publicPath = "http://coca-com.logwsd.com"; //香河测试环境
const publicPath = "http://192.168.56.31:5010"; //香河测试环境


// const publicPath = 'http://user.logwsd.com' //生产环境

export const update = {
    init: function () {
        //const now = +new Date();
        // const lastCheckTime = getCache('lastCheckTime') || 0;

        // if ((now - lastCheckTime) < checkUpdateTime) {
            
        axios.get(`${publicPath}/appVersion/updateVersion`, {
            params: {
                fromType: 2
            }
        }).then(res => {
            // setCache('lastCheckTime', now)
            
            this.doUpdate(res.data)
        })
        //}
    },
    doUpdate: function (data) {
        console.log(data)
        if (!data) {
            return false;
        }

        //const currentVersion = version.replace(/\.|v/g, "") * 1;
        //const currentNativeVersion = nativeVersion.replace(/\.|v/g, "") * 1;
        const currentversionCodeH5 = versionCodeH5.replace(/\.|v/g, "") * 1;
        const currentversionCode = versionCode.replace(/\.|v/g, "") * 1;
        const latestVersionH5 = data.data['versionCodeH5'].replace(/\.|v/g, "") * 1;
        const versionAndroid = data.data['versionCode'].replace(/\.|v/g, "") * 1;
        //const versionIos = data.data['versionIos'].replace(/\.|v/g, "") * 1;

        //ios和Android原生更新
        if (currentversionCode < versionAndroid) {
            console.log('versionAndroid')
            let updateInfo = {
                url: data.data['appUrl'],
                //zip: data['zip'],
                type:data.data['type'],
                message: data['msg'],
                // version: data['versionAndroid'],
                // versionIos: data['versionIos']
            };
            setTimeout(() => {
                native.callhandler('download', updateInfo)
            }, 500)
            //h5更新
        } else if (currentversionCodeH5 < latestVersionH5) {
            console.log('h5update')
            let updateInfo = {
                url: data.data['h5Url'],
                // zip: data['zip'],
                type:data.data['type'],
                message: data['msg'],
                // version: data['versionH5'],
                // versionIos: data['versionIos']
            };
            console.log(updateInfo)
            setTimeout(() => {
                native.callhandler('download', updateInfo)
            }, 500)
        } else {
            console.log('当前已是最新版本');
        }
    }
}