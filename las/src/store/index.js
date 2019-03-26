import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import request from "../util/request.js";
import router from '../router'
import tagsview from './tagsview.js'
import {dynamicRouter} from '../router/index'
Vue.use(Vuex);

const state = {
    //存储用户信息
    infoData: {},
    //存储动态生成路由表
    roleData:[],
    //存储数据操作权限
    powerArr:[],
    //存储消息通知
    message:[],
    //存储消息通知总数
    messageNum:0
}


const mutations = {
    //保存用户登录信息
    saveInfo(state, data) {
        state.infoData = data;
    },
    //保存路由表
    saveRole(state, data) {
        state.roleData = data;
    },
    //保存消息通知
    saveMessage(state, data) {
        state.message = data.message;
        state.messageNum = data.messageNum;
    },
    //修改头像
    changeHeadImg(state, data){
        state.infoData.headImg = data;
    },
    //修改昵称
    changeNickName(state, data){
        state.infoData.nickName = data;
    },
    //保存数据权限数组
    savePower(state, data){
        state.powerArr = data;
    },
    //清空动态路由
    clearRouter(state){
        state.roleData = [];
        dynamicRouter[0].children = [];
        router.addRoutes(dynamicRouter);
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
                if(response.data.code){
                    let info = response.data.data;
                    commit('savePower',JSON.parse(response.data.map.role.power));
                    let infoData = {
                        id: info.id,
                        userName: info.userName,
                        headImg: info.avatar,
                        loginDate: info.loginDate,
                        nickName: info.nickName,
                        roleName: response.data.map.role.roleName,
                    }
                    commit('saveInfo',infoData);
                    resolve(response.data.map.roleAcls);
                    Message({
                        showClose: true,
                        message: "登录成功,欢迎 "+info.userName +" 进入后台系统",
                        type: 'success'
                    });
                }else{
                    Message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'info'
                    });
                    router.push('/login');
                }
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
                    menuIndex: '0'
                },
                component:resolve => require(['@/views/member/404'], resolve)
            })
            dynamicRouter[0].children = [];
            dynamicRouter[0].children = newArr;
            commit('saveRole',newArr);
            router.addRoutes(dynamicRouter.concat([{
                path: '*',
                redirect:"/404"}
            ]));
        })
    },
    //获取消息通知
    getMessage({commit}){
        request({
            method:'get',
            url:"/apis/member/notification",
        })
        .then(response=>{
            let num = 0;
            if(response.data.code){
                let res = response.data.data;
                num = res.待审会员修改记录.length + res.待审会员账户交易.length + res.待审借款还款申请.length + res.待审借款还款申请.length + res.待审调拨单.length + res.待审调整单.length;
                commit('saveMessage',{
                    message:[
                        {
                            mes:"会员修改记录 待审",
                            num:res.待审会员修改记录.length,
                            path:'/toExamine'
                        },
                        {
                            mes:"会员账户交易 待审",
                            num:res.待审会员账户交易.length,
                            path:'/presentToExamine'
                        },
                        {
                            mes:"借款还款申请 待审",
                            num:res.待审借款还款申请.length,
                            path:'/arrearsToExamine'
                        },
                        {
                            mes:"调拨单 待审",
                            num:res.待审调拨单.length,
                            path:'/allocationToxamine'
                        },
                        {
                            mes:"调整单 待审",
                            num:res.待审调整单.length,
                            path:'/adjustToExamine'
                        }
                    ],
                    messageNum:num
                }
            );
            }
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

