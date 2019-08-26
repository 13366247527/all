/*
 * @Description: In User Settings Edit
 * @Author: sailei
 * @Date: 2018-12-15 15:28:34
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.css'
//import 'jquery'


Vue.config.productionTip = false

// 解决移动端300毫秒延迟问题
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
// 引入axios
import Axios from './config/http'
Vue.prototype.$http = Axios

// 引入mint-ui
import MintUI from 'mint-ui';
import { Toast, Indicator  } from 'mint-ui'
import 'mint-ui/lib/style.css';
import './assets/css/my-mint.scss'
Vue.use(MintUI)
Vue.prototype.$toast = Toast
Vue.prototype.$loading = Indicator


// 引入swiper插件
import 'swiper/dist/css/swiper.min.css'

 import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
  new VConsole() // 初始化


//引入vue-amap
import VueAMap from 'vue-amap'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '1c6fa8ef70e652c9198aac260a749eac',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.ToolBar', 'AMap.Geolocation', 'AMap.TruckDriving'],
    v: '1.4.10'
});

//引入语音合成Speech Synthesis API
import VueSpeech from 'vue-speech'
Vue.use(VueSpeech)
Vue.prototype.$say = msg => {
    let utterThis = new window.SpeechSynthesisUtterance(msg);
    window.speechSynthesis.speak(utterThis);
}

// native
import Bridge from './native/bridge'
Vue.prototype.$bridge = Bridge
//首次进入检查更新
import { update } from './native/update'
update.init()



new Vue({
    router,
    store,
    data: {
        eventHub: new Vue() // 集中的事件处理器
    },
    render: h => h(App)
}).$mount('#app')
