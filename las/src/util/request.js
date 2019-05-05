import { Notification } from 'element-ui'
import Cookies from 'js-cookie'
import router from "../router";
import store from '../store/index'
Vue.prototype.$request = service;
// // 创建axios实例
const service = axios.create();
// request拦截器
service.interceptors.request.use(
  config => {
    //添加token到请求头里
    if(Cookies.get('Authorization')){
      config.headers.token = Cookies.get('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let title = error.message + "\n系统错误";
    if(error.response){
      switch (error.response.status) {
        // 返回 401 清除token信息并跳转到登录页面
        case 401:
            title = "用户登录状态已过期，请重新登录"
            setTimeout(()=>{
              //清除上个用户信息
              store.commit('clearInfo');
              router.push('/login');
            },300)
            break;
      }
    }
    Notification ({
      title: '错误',
      type:'info',
      message: title
    });
    return Promise.reject(error)
  }
)

export default service;
