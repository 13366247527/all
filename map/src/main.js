import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import '../src/assets/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import axios from 'axios'
import 'url-search-params-polyfill'
import 'vw-layout'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import drag from './drag'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });
Vue.prototype.$http = axios

const router = new VueRouter({
  routes
})
function getQueryVariable(variable){
         var query = window.location.href;
         var vars = query.split("?");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == variable){return pair[1];}
         }
         return(false);
  }
  
 
  var tokens  = getQueryVariable("token")
    if(tokens){
      sessionStorage.setItem("token", tokens.slice(0,-2));
      var old_url = window.location.href;
      var new_url = old_url.substring(0, old_url.indexOf('?'));
      self.location = new_url;
    }

router.beforeEach((to, from, next) => {
  //NProgress.start();
// 调用方法

  if (to.path == '/login') {
    sessionStorage.removeItem('token')
  }
  let token = sessionStorage.getItem('token')
  if (!token) {
    if (to.path !== '/login') {
      next({ path: '/login' })
    }
    else {
      next();
    }
  }else {
  next();
}

  // if (token && to.path != '/login') {
  //   next()
  // } else {
  //   next()
  // }
})

//router.afterEach(transition => {
//NProgress.done();
//});



// 接口统一加token
axios.interceptors.request.use(
  config => {
    if (config.url !== 'http://192.168.1.166:5010/login') {
      const USER_TOKEN = sessionStorage.getItem('token')
      // 判断session中是否有token加到header中
      if(USER_TOKEN ){
        config.headers.common['token'] = USER_TOKEN
        // config.headers.common['cpycod'] = '0006'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

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
  error => {
    ElementUI.Message({
      type: 'error',
      message:'服务器连接错误!'
    })
    window.flages = 1
    return Promise.resolve(error.response)
  }
)


new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

