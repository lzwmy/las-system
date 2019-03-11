import axios from 'axios'
import { Notification } from 'element-ui'
import Vue from 'vue'
import router from '../router'
import Cookies from 'js-cookie'
Vue.prototype.$request = service;
 
// // 创建axios实例
const service = axios.create();
service.defaults.timeout = 5000;  // 超时时间

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
    let title = error.message + "服务器端出错了，请联系后台管理员";
    if(error.response){
      switch (error.response.status) {
        // 返回 401 清除token信息并跳转到登录页面
        case 401:
            title = "用户登录状态已过期，请重新登录"
            setTimeout(()=>{
              Cookies.remove('Authorization');
              sessionStorage.clear();
              window.location.reload();
              router.push('/login')
            },1000)
            break;
      }
    }
    Notification ({
      title: '错误',
      type:'error',
      message: title
    });
    return Promise.reject(error)
  }
)

export default service;
