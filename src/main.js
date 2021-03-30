import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入字体图片
import './assets/fonts/iconfont.css'
//导入全局样式表
import './assets/css/global.css'
//导入vue-table-with-tree-grid
import TreeTable from 'vue-table-with-tree-grid'


//配置axios
import axios from 'axios'
//设置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//设置拦截器
axios.interceptors.request.use(config =>{
  //为请求头对象 添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  //最后必须return config
  return config;
})

//请求挂载到Vue的原型对象上
Vue.prototype.$http = axios


Vue.config.productionTip = false

//注册vue-table-with-tree-grid
Vue.component('tree-table',TreeTable);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
