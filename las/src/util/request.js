import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import Vue from 'vue'

Vue.prototype.$request = service;
 
// // 创建axios实例
// const service = axios.create({
// //   baseURL: "192.168.1.147:8090", // api的base_url
//   timeout: 15000                  // 请求超时时间
// });

const service = axios.create();


// 添加请求拦截器，在请求头中加token
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.token = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // if (res.code !== '200' && res.code !== 200) {
    //   if (res.code === '4001' || res.code === 4001) {
    //     MessageBox.confirm('用户名或密码错误，请重新登录', '重新登录', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //          location.reload()// 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   if (res.code === '4009' || res.code === 4009) {
    //     MessageBox.confirm('该用户名已存在，请重新注册！', '重新注册', {
    //       confirmButtonText: '重新注册',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload()// 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
    return response;
  },
  error => {
    Message({
        message: error.message + "服务器端出错了 ╯０╰",
        type: 'error',
        duration: 5 * 1000
    });
    return Promise.reject(error)
  }
)

export default service;
