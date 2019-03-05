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
                            <el-input v-model="form.userName" placeholder="用户名：" prefix-icon="iconfont icon-yonghu" :class="form.userName!=''?'active':''" @keyup.native="inputLimit1($event)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  

                <el-row>
                    <el-col :span="24" align="center">
                        <el-form-item> 
                            <el-input :type="passwordType" v-model="form.passWord" placeholder="密 码：" prefix-icon="iconfont icon-mima" :class="form.passWord!=''?'active':''" @keyup.native="inputLimit2($event)"></el-input>
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
                        <el-button type="primary" @click="login" class="loginBtn" :loading="loadingBtn">登 陆</el-button>
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
            key:"ZUES_EDU", //DES 密钥
            identifyCodes: "23456789ABCDEFGHJKLMNPQUVWXYZ",  //验证码的取值
            identifyCode: "",   //验证码
        }
    },
    components:{
        SIdentify
    },
    methods: {
        //限制input输入   
        inputLimit1(e){
            let val = e.target.value;
            this.form.userName = val.replace(/^ +| +$/g,'');
        },
        inputLimit2(e){
            let val = e.target.value;
            this.form.passWord = val.replace(/^ +| +$/g,'');
        },
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
        //DES  ECB模式解密
        decryptByDESModeEBC(ciphertext){
            var keyHex = CryptoJS.enc.Utf8.parse(this.key);
            var decrypted = CryptoJS.DES.decrypt(
                {ciphertext: CryptoJS.enc.Hex.parse(ciphertext)},
                keyHex,{
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
            return decrypted.toString(CryptoJS.enc.Utf8);
        },
        login(){
            if(!this.form.userName || !this.form.userName.replace(/\s+/g,"")){
                this.$message({
                    showClose: true,
                    message: "请输入用户名!",
                    type: 'error'
                });
            }else if(!this.form.passWord || !this.form.passWord.replace(/\s+/g,"")){
                this.$message({
                    showClose: true,
                    message: "请输入密码!",
                    type: 'error'
                });
            }
            // else if(!this.form.verificationCode){
            //     this.$message({
            //         showClose: true,
            //         message: "请填写验证码!",
            //         type: 'wraning'
            //     });
            // }else if(this.form.verificationCode.toLowerCase() != this.identifyCode.toLowerCase()){
            //     this.$message({
            //         showClose: true,
            //         message: "验证码错误!",
            //         type: 'error'
            //     });
            // }
            else{
                this.loginSuccess();
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
        //登录成功
        loginSuccess(){
            this.loadingBtn = true;
            new Promise((resolve, reject)=>{
                //登录操作
                this.$request({
                    method:'post',
                    url:"/apis/login/loginUser",
                    params: {
                        userName:this.form.userName,
                        passWord:CryptoJS.MD5(this.form.passWord).toString(),
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(!response.data.code){
                        this.$message({
                            showClose: true,
                            message: "用户名或密码错误!",
                            type: 'error'
                        });
                        return;
                    }

                    //保存token到cookie中
                    let date = new Date();
                    date.setTime(date.getTime() + 12 * 60 * 60 * 1000); //登录过期时间为12小时
                    Cookies.set("Authorization", response.data.data[0], { expires: date });
                    resolve(response.data.data[0]);
                })
            })
            .then((token)=>{
                //登录成功之后用token获取到用户信息
                this.$request({
                    method:'post',
                    url:"/apis/member/findUserInfo",
                    params: {
                        encrypt:token,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    console.log(response)
                    let info = response.data.data;
                    let role = response.data.map.roleAcls;
                    let infoData = {
                        userName: info.userName,
                        headImg: info.avatar,
                        loginDate: info.loginDate,
                        roleName: response.data.map.role.roleName,
                    }
                    //保存用户信息
                    this.$store.commit('saveInfo',infoData)
                    //动态创建路由表
                    this.createRole(role);
                    //进入后台系统
                    setTimeout(()=>{
                        this.$router.push('/');
                        this.$message({
                            showClose: true,
                            message: "登录成功!",
                            type: 'success'
                        });
                        this.loadingBtn = false;
                        this.refreshCode();
                    },500);  
                })
            })
        },
        //创建路由表
        createRole(role){
            /**动态生成路由 */
            for(let i = 0; i < role.length; i++){
                // role[i].component = resolve => require(['@/' + arr[i].componentPath + '.vue'], resolve);
                role[i] = {
                    path: role[i].path,
                    name: role[i].path.slice(1),
                    meta: { 
                        menuIndex: role[i].menuIndex,
                        title: role[i].label,
                    },
                    component: resolve => require(['@/' + role[i].componentPath + '.vue'], resolve),
                }
            }
            role.push({
                    path: '/404',
                    name:"404",
                    meta: {
                        title: "404页面",
                        menuIndex: null
                    },
                    component:resolve => require(['@/views/member/404'], resolve)
                })
            //保存路由信息
            this.$store.commit('saveRole',role)
            dynamicRouter[0].children = role;
            this.$router.addRoutes(dynamicRouter.concat([{
                path: '*',
                redirect:"/404"}
            ]));
        },
        test123(){
            
            let arr = [
                {
                    path: '/addMemberList',
                    name:"addMemberList",
                    meta: {
                        menuIndex:'1-2',
                        title: "新增会员列表" ,
                    },
                    componentPath:'components/manage/addMemberList',
                }, 
                {
                    path: '/memberList',
                    name:"memberList",
                    meta: { 
                        menuIndex:'1-3',
                        title: "会员列表",
                    },
                    componentPath:'components/manage/mDetailed',
                },
                {
                    path: '/tree',
                    name:"tree",
                    meta: { 
                        menuIndex:'1-4',
                        title: "会员树状图",
                    },
                    componentPath:'components/manage/tree',
                },
            ]
            for(let i = 0; i < arr.length; i++){
                arr[i].component = resolve => require(['@/' + arr[i].componentPath + '.vue'], resolve);
                
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

