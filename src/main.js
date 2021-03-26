import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入字体图片
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'
// //导入弹框提示组件
// import {Message} from 'element-ui'

//配置axios
import axios from 'axios'
//设置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//请求挂载到Vue的原型对象上
Vue.prototype.$http = axios
//弹框挂载Vue原型对象上
// Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
