
/*
 * @Description: tools
 * @Author: sailei
 * @Date: 2018-12-13 15:29:21
 */

//本地缓存
export function setCache(id, data) {
    if (data) {
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        localStorage.setItem(id, data);
    }
}

export function getCache(id) {
    let string = localStorage.getItem(id);
    try {
        if (string.startsWith('{') || string.startsWith('[')) {
            return JSON.parse(string);
        } else {
            return string;
        }
    } catch (e) {
        return string;
    }
}

export function removeCache(id) {
    localStorage.removeItem(id);
}


//登录
export function login(Vue, loginName, password) {
    
    removeCache('token');
    removeCache('roles');

    setCache('username', loginName);
    setCache('lastCheckTime', +new Date());
    
    Vue.$http.post('/login', {
        username: loginName,
        password: password
    }).then(res => {
        let result = res.data
        if (result.ret_code == 0) {
            setCache('token', result.data.token);
            setCache('user', result.data.user);//车辆调度员
            setCache('jobpost', result.data.currentJobpost)
            setCache("vehgrpnum",'vehgrpnum')
            console.log(result)
            
            // Vue.$router.push({
            //     path: '/SignIn',
            // })
            Vue.$router.push({
                path: '/home',
            })
        } else if (result.ret_code == 401) {
            Vue.$router.push({
                path: '/login',
            })
        } else {
            Vue.$toast(result.msg);
            return
        }
    }).catch(res => {
        Vue.$toast(res.msg);
      });
}