import Cookies from 'js-cookie'
import store from '../store/index'
import VueRouter from 'vue-router'
import login from '@/views/member/login.vue'
import Index from '@/views/member/index.vue'


Vue.use(VueRouter)

// 静态路由
const staticRouter =  new VueRouter({
  routes: [
    {
      path: '/login',
      name:"login",
      component:login	
    }
  ]
})

//动态路由
export const dynamicRouter = [
  {
    path: '/',
    name:"会员管理",
    component:Index,
    redirect: '/memberList',
    children:[]
  }
]

export function resetRouter(){
  const newRouter = new VueRouter({
    routes: [
      {
        path: '/login',
        name:"login",
        component:login	
      }
    ]
  });
  staticRouter.matcher = newRouter.matcher;
}

const whiteList = ['/login']; // 不重定向白名单
staticRouter.beforeEach((to, from, next) => {
  //获取登录用户唯一标识
  let Authorization = Cookies.get('Authorization')?Cookies.get('Authorization'):null;
  // //当页面刷新操作动态路由失效(Authorization存在时)
  if(Authorization && to.name == null && to.path !='/login'){
      //重新获取个人信息和路由
      store.dispatch('getInfo');
      //添加最后访问的路由,如果第一次登录则获取的路由为null，需跳转到login
      let lastRouter = JSON.parse(sessionStorage.getItem('lastRouter'));
      store.dispatch('addVisitedViews',lastRouter);
      //保存左侧活动菜单index
      if(lastRouter){
        store.commit('saveActiveIndex',lastRouter.meta.menuIndex);
      }
      next();
    }
    //获取消息通知
  if(Authorization && whiteList.indexOf(to.path) == -1){ 
      store.dispatch('getMessage');
      next();
  }else{
    if(to.path=='/login'){ 
      next();
    } else {
        next('/login');
    }
  }
})

export default staticRouter;