import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { Message } from 'element-ui';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$http = axios;

const i18n = new VueI18n({
    locale: 'zh',
    messages
})
// console.log(process.env.VUE_APP_URL)
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     const role = sessionStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin' ? next() : next('/403');
//     } else {
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         } else {
//             next();
//         }
//     }
// })
// 网络异常提示
axios.interceptors.response.use(
    response => {
        let status = response.data.ret_code;
        switch (status) {
            case '1':
                break
            case '2':
                setTimeout(() => {
                    router.replace({
                        path: '/login'
                    })
                }, 1500)
                break
        }
        return response
    },
    // console.log(error)
error => {
    if (error) {
            if (error.response.status === 500) {
                // return Promise.resolve(error.response)
                // console.log(Promise.resolve(error.response))
                Message.error('网络异常，请稍后重试')
            }
        }
    }
)
router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})
let root = process.env.VUE_APP_URL;
// 接口统一加token
axios.interceptors.request.use(
    config => {
        let url1 = 'http://user.logwsd.com/login'
        let url2 = 'http://62.234.98.225:5010/login'
        if (config.url !== url1 && config.url !== url2) {
            let pubUrl = config.url.slice(4)
            config.url = root + pubUrl;
            const USER_TOKEN = JSON.parse(sessionStorage.getItem('user')).token
            // 判断session中是否有token加到header中
            if(USER_TOKEN ){
                config.headers.common['token'] = USER_TOKEN
                config.headers.common['cpycod'] = JSON.parse(sessionStorage.getItem('user')).user.cpycod
                config.headers.common['whsnum'] = JSON.parse(sessionStorage.getItem('user')).user.delwhsnum
                // config.headers.common['cpycod'] = '0006'
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// export default axios;

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
