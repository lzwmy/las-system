import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import tagsview from './tagsview.js'
Vue.use(Vuex);

const state = {
    // 存储token
    //Authorization: window.localStorage.getItem('Authorization') ? window.localStorage.getItem('Authorization') : null,
    //存储用户信息
    infoData: {},
    //路由表
    roleData:[]
}

 
const mutations = {
    // 修改token，并将token存入localStorage
    // changeLogin (state, user) {
    //     state.Authorization = user.Authorization;
    //     window.localStorage.setItem('Authorization', user.Authorization);
    // }
    //保存用户登录信息
    saveInfo(state, data) {
        state.infoData = data;
        console.log("得到了用户信息")
        console.log(data)
    },
    //保存路由表
    saveRole(state, data) {
        state.roleData = data;
        console.log("得到了路由表信息")
        console.log(state.roleData )
    }
}





//创建管理全局状态的对象
export default new Vuex.Store({
    modules:{
        tagsview
    },
    state,
    mutations,
})

