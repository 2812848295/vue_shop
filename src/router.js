import Vue from 'vue'
import Router from 'vue-router'
//导入登录组件
import Login from './components/Login.vue'
//导入Home组件
import Home from './components/Home.vue'
//导入Welcome组件
import Welcome from './components/Welcome.vue'
//导入用户列表主键
import Users from './components/user/Users.vue'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/', 
      redirect: '/login'
    },
    //新增一个登录路由规则
    {
      path: '/login',
      component: Login
    },
    //新增Home路由规则
    {
      path: '/home',
      component: Home,
      //重定向
      redirect:'/welcome',
      //增加一个子路由
      children:[
        {
          path:'/welcome',
          component:Welcome
        },
        //新增一个子路由
        {
          path: '/users',
          component:Users
        }
      ]

    }
  ]
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 从那个路径跳转过来
  //next是一个函数 表示放行 next()放行
  //next('路径')强制跳转
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
})
//暴漏出去
export default router
