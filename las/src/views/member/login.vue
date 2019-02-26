<template>
    <el-form :model="form" label-position="left" class="loginWrap">
        <div class="wrap">
            <div class="loginBox">
                <h1 class="text-center">乐安士后台管理系统</h1>
                <br>
                <br>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-input v-model="form.userName" placeholder="用户名：" prefix-icon="iconfont icon-yonghu" :class="form.userName!=''?'active':''"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  

                <el-row>
                    <el-col :span="24" align="center">
                        <el-form-item> 
                            <el-input :type="passwordType" v-model="form.passWord" placeholder="密 码：" prefix-icon="iconfont icon-mima" :class="form.passWord!=''?'active':''"></el-input>
                            <i class="el-icon-view" @click="onShowPW" ref="view"></i>
                        </el-form-item>
                    </el-col>
                </el-row> 

                <el-row type="flex">
                    <el-col :span="14">
                        <el-form-item> 
                            <el-input v-model="form.verificationCode" placeholder="验证码：" prefix-icon="iconfont icon-yanzhengma" :class="form.verificationCode.toLowerCase()==identifyCode.toLowerCase()?'active':''"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9" :offset="1">
                        <div class="code" @click="refreshCode">
                            <SIdentify :identifyCode="identifyCode"></SIdentify>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24" align="center">
                        <el-button type="primary" @click="test123" class="loginBtn" :loading="loadingBtn">登 陆</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-form>
</template>

<script>
import {staticRouter,dynamicRouter} from '../../router/index'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import SIdentify from './identify'

export default {
    data(){
        return{
            loadingBtn:false,
            passwordType:"password",
            form:{
                userName:"admin",
                passWord:"123456",
                verificationCode:""
            },
            secretKey:"FVSADSJKU566567E",//token密钥
            identifyCodes: "23456789ABCDEFGHJKLMNPQUVWXYZ",  //验证码的取值
            identifyCode: "",   //验证码
        }
    },
    components:{
        SIdentify
    },
    methods: {
        //随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        //重绘
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        //生成验证码
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
        },
        login(){
            if(this.form.userName != "admin" || this.form.passWord != "123456"){
                this.$message({
                    showClose: true,
                    message: "用户名或密码错误!",
                    type: 'error'
                });
            }else if(!this.form.verificationCode){
                this.$message({
                    showClose: true,
                    message: "请填写验证码!",
                    type: 'wraning'
                });
            }else if(this.form.verificationCode.toLowerCase() != this.identifyCode.toLowerCase()){
                this.$message({
                    showClose: true,
                    message: "验证码错误!",
                    type: 'error'
                });
            }else{
                this.loadingBtn = true;
                let date = new Date();
                date.setTime(date.getTime() + 12 * 60 * 60 * 1000); //登录过期时间为12小时
                //Authorization 加密算法/模式/补码方式： AES/ECB/PKCS7Padding
                let val = CryptoJS.AES.encrypt("ceshidata", this.secretKey,{
                    mode: CryptoJS.mode.ECB,  
                    padding: CryptoJS.pad.Pkcs7  
                });
                Cookies.set("Authorization", val, { expires: date });
                
                
                //动态生成路由
                let Authorization = window.localStorage.getItem('Authorization');
                let meunList = [];  //根据角色生成的路由
                let dRouter = dynamicRouter[0].children;    //本地路由表信息
                for (let i = 0; i < dynamicRouter[0].children.length; i++){
                    if(dRouter[i].meta){
                        for (let j = 0; j < dRouter[i].meta.permission.length; j++){
                            if (dRouter[i].meta.permission[j] == "admin" ){
                                meunList.push(dRouter[i]);
                            }
                        }
                    }
                }
    
                dynamicRouter[0].children = meunList;
                console.log(dynamicRouter)
                // this.$router.addRoutes(dynamicRouter.concat([{
                //     path: '*',
                //     redirect:"/404"}
                // ]));
                // setTimeout(()=>{
                //     this.$router.push('/');
                //     this.loadingBtn = false;
                //     this.refreshCode();
                // },500);  
            }
        },
        //密码显示隐藏
        onShowPW(){
            if(this.passwordType == "text"){
                this.$refs.view.style.color = "#333";
                this.passwordType = "password";
            }else{
                this.$refs.view.style.color = "#02c1b3";
                this.passwordType = "text";
            }
        },
        test123(){
            let date = new Date();
            date.setTime(date.getTime() + 12 * 60 * 60 * 1000); //登录过期时间为12小时
            //Authorization 加密算法/模式/补码方式： AES/ECB/PKCS7Padding
            let val = CryptoJS.AES.encrypt("ceshidata", this.secretKey,{
                mode: CryptoJS.mode.ECB,  
                padding: CryptoJS.pad.Pkcs7  
            });
            Cookies.set("Authorization", val, { expires: date });
            let arr = [
                {
                    path: '/addMemberList',
                    name:"addMemberList",
                    meta: {
                        menuIndex:'1-2',
                        title: "新增会员列表" ,
                    },
                    componentPath:'addMemberList',
                }, 
                {
                    path: '/memberList',
                    name:"memberList",
                    meta: { 
                        menuIndex:'1-3',
                        title: "会员列表",
                    },
                    componentPath:'mDetailed',
                },
                {
                    path: '/tree',
                    name:"tree",
                    meta: { 
                        menuIndex:'1-4',
                        title: "会员树状图",
                    },
                    componentPath:'tree',
                },
            ]
            for(let i = 0; i < arr.length; i++){
                arr[i].component = resolve => require(['@/components/manage/' + arr[i].componentPath + '.vue'], resolve);
                
            }
            arr.push({
                    path: '/404',
                    name:"404",
                    meta: {
                    title: "404页面",
                    },
                    component:resolve => require(['@/views/member/404'], resolve)
                })
            dynamicRouter[0].children = arr;
            
            setTimeout(()=>{
                this.$router.addRoutes(dynamicRouter.concat([{
                    path: '*',
                    redirect:"/404"}
                ]));
                this.$router.push('/');
            },1000)
        }
    },
    created(){
        this.makeCode(this.identifyCodes, 4);
    }
};
</script>

<style>
.loginWrap{
    height: 100%;
    background: url('../../../static/images/bg2.jpg') 100%;
}
.loginWrap .wrap{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginWrap .loginBox{
    width:380px;
    border-radius: 5px;
    padding:35px;
    background: #fff;
    box-shadow: 0 0 5px #d6d6d6;
}
.loginWrap h1{
    font-size:26px;
    color:#02c1b3;
}
.loginWrap .loginBtn{
    width:100%;
    height: 35px;
}
.loginWrap .el-input__inner{
    border:0px;
    border-bottom:1px solid #dcdfe6;
    border-radius: 0;
}
.loginWrap .el-icon-view{
    position: absolute;
    top:40%;
    right:2px;
    cursor: pointer;
}
.loginWrap .code{
    cursor: pointer;
}
.loginWrap .el-input.active .el-input__icon{
    color:#02c1b3;
}
</style>

