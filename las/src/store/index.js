import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import tagsview from './tagsview.js'
Vue.use(Vuex);

// const state = {
//     // 存储token
//     Authorization: window.localStorage.getItem('Authorization') ? window.localStorage.getItem('Authorization') : null,
// }

 
// const mutations = {
//     // 修改token，并将token存入localStorage
//     changeLogin (state, user) {
//         state.Authorization = user.Authorization;
//         window.localStorage.setItem('Authorization', user.Authorization);
//     }
// }


//创建管理全局状态的对象
export default new Vuex.Store({
    modules:{
        tagsview
    },
    // state,
    // mutations,
})

