import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import request from "../util/request.js";
import router from '../router'
import tagsview from './tagsview.js'
import {dynamicRouter} from '../router/index'
Vue.use(Vuex);

const state = {
    //存储用户信息
    infoData: {},
    //存储动态生成路由表
    roleData:[]
}


const mutations = {
    //保存用户登录信息
    saveInfo(state, data) {
        state.infoData = data;
    },
    //保存路由表
    saveRole(state, data) {
        state.roleData = data;
    }
}

const actions = {
    //获取用户个人信息和路由
    getInfo({commit}){
        new Promise((resolve, reject)=>{
            request({
                method:'post',
                url:"/apis/member/findUserInfo",
                params: {
                    encrypt:Cookies.get('Authorization'),
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                let info = response.data.data;

                let infoData = {
                    userName: info.userName,
                    headImg: info.avatar,
                    loginDate: info.loginDate,
                    nickName: info.nickName,
                    roleName: response.data.map.role.roleName,
                }
                commit('saveInfo',infoData);
                resolve(response.data.map.roleAcls);
            })
        })
        .then((res)=>{
            //动态生成路由
            let newArr = [];
            for(let i = 0; i < res.length; i++){
                newArr.push({
                    path: res[i].path,
                    name: res[i].path.slice(1),
                    meta: { 
                        menuIndex: res[i].menuIndex,
                        title: res[i].label,
                    },
                    component: resolve => require(['@/' + res[i].componentPath + '.vue'], resolve),
                })
            }
            newArr.push({
                path: '/404',
                name:"404",
                meta: {
                    title: "404页面",
                    menuIndex: null
                },
                component:resolve => require(['@/views/member/404'], resolve)
            })
            dynamicRouter[0].children = newArr;
            commit('saveRole',newArr);
            router.addRoutes(dynamicRouter.concat([{
                path: '*',
                redirect:"/404"}
            ]));
        })
    }
}





//创建管理全局状态的对象
export default new Vuex.Store({
    modules:{
        tagsview
    },
    state,
    mutations,
    actions
})

