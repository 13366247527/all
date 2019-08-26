// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import 'babel-polyfill'
import util from './common/util'
import '@/assets/icon/iconfont.css'
import Vuex from 'vuex'
import store from './store'
import './assets/iconfont/iconfont.css'
// import CKEditor from '@ckeditor/ckeditor5-vue';
window.moment=require('moment')
import 'url-search-params-polyfill'


//import 'element-ui/lib/theme-chalk/index.css';
// import '../static/css/theme-green/index.css';


Vue.prototype.$ajax=axios
Vue.config.productionTip = false

//Vue.use(ElementUI);
Vue.use(util);
Vue.use(Vuex);
// Vue.use(CKEditor);
import router from './router'

process.env.MOCK && require('@/apimock')



// 接口统一加token
axios.interceptors.request.use(
  config => {
    if (!(config.url.endsWith('login'))) {
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
          window.ELEMENT.Message.error('账号已在其他处登录，请重新登录!')
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
    window.ELEMENT.Message.error('服务器连接错误!')
    window.flages = 1
    return Promise.resolve(error.response)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

