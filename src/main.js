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
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


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
// 将富文本编辑器 注册为全局可用的组件
Vue.use(VueQuillEditor)

//注册vue-table-with-tree-grid
Vue.component('tree-table',TreeTable);
// 注册全局过滤器
Vue.filter('dateFormat',function(time){
  const dt = new Date(time);

  const y = dt.getFullYear();
  const m = (dt.getMonth()+1+'').padStart(2,'0');
  const d = (dt.getDate()+'').padStart(2,0);

  const hh = (dt.getHours()+'').padStart(2,0);
  const mm = (dt.getMinutes()+'').padStart(2,0);
  const ss = (dt.getSeconds()+'').padStart(2,0);
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
