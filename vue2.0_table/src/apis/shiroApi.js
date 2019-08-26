import Axios from "axios";

/**
 * 系统认证接口
 */
export default {
    /**
     * 系统登陆
     */
    loginIn: param=> {return Axios.post('http://user.logwsd.com/login', param);},
    // loginIn: param=> {return Axios.post('http://192.168.1.166:5010/login', param);},
    /**
     * 退出登陆
     */
    loginOut: function () {
        return Axios.post('/api/shiro-api/loginout');
    },
    /**
     * 记录登陆日志
     */
    loginLog: function ({ip,city,type}) {
        var param={
            ip:ip,
            city:city,
            type:type
        };
        return Axios.post('/api/loginlog-api/save', param);
    },
    /**
     * 还原数据
     */
    rollBackTables: function () {
        return Axios.post('/api/loginlog-api/rollBackTables');
    }
}
