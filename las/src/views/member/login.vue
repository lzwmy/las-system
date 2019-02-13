<template>
    <el-form :model="form" label-position="left" class="loginWrap">
        <div class="wrap">
            <div class="loginBox">
                <h1 class="text-center">乐安士后台管理系统</h1>
                <br>
                <br>
                <el-row type="flex" justify="center">
                    <el-col :span="24">
                        <el-form-item>
                            <el-input v-model="form.userName" placeholder="用户名："></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row type="flex" justify="center">
                    <el-col :span="24" align="center">
                        <el-form-item> 
                            <el-input :type="passwordType" v-model="form.passWord" placeholder="密 码："></el-input>
                            <i class="el-icon-view" @click="onShowPW" ref="view"></i>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row type="flex" justify="center">
                    <el-col :span="24" align="left">
                        <el-form-item label="记住密码"> 
                            <el-switch v-model="remember"></el-switch>
                        </el-form-item>
                        <div class="code" @click="refreshCode">
                            <SIdentify :identifyCode="identifyCode"></SIdentify>
                        </div>
                    </el-col>
                </el-row> 

                <el-row type="flex" justify="center">
                    <el-col :span="24" align="center">
                        <el-button type="primary" @click="login" class="loginBtn">登 陆</el-button>
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
            passwordType:"password",
            remember:false,  //是否记住密码
            form:{
                userName:"admin",
                passWord:"123456"
            },
            secretKey1:"MD5REFDG345DDFSFGHEFQWEWE879VDVDVS",//登录密码密钥
            secretKey2:"EREF232GDHDFVSADSJKU566567EREREDFD",//token密钥
            identifyCodes: "1234567890",
            identifyCode: ""
        }
    },
    components:{
        SIdentify
    },
    watch:{
        remember(){
            if(this.remember){
                //记住密码,使用CryptoJS方法加密
                let val = CryptoJS.AES.encrypt(this.form.passWord, this.secretKey1);
                window.localStorage.setItem("remember",val);
            }else{
                window.localStorage.setItem("remember",null);
            }
        }
    },
    methods: {
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            console.log(this.identifyCode);
        
        },

        login(){
            if(this.form.userName != "admin" || this.form.passWord != "123456"){
                this.$message({
                    showClose: true,
                    message: "用户名或密码错误!",
                    type: 'error'
                });
            }else{
                let date = new Date();
                date.setTime(date.getTime() + 12 * 60 * 60 * 1000); //登录过期时间为12小时
                let val = CryptoJS.AES.encrypt("ceshidata", this.secretKey2);
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
                this.$router.addRoutes(dynamicRouter.concat([{
                    path: '*',
                    redirect:"/404"}
                ]));  
                this.$router.push('/');
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
        }  
    },
    created(){
        //判断是否已有记住密码
        if(window.localStorage.getItem("remember")!="null"){
            this.remember = true;
            //拿到拿到加密后的密码并解密
            if(window.localStorage.getItem("remember")){
                let bytes = CryptoJS.AES.decrypt(window.localStorage.getItem("remember").toString(), this.secretKey1);
                let passWord = bytes.toString(CryptoJS.enc.Utf8); 
                this.form.passWord = passWord;
            }
        }else{
            this.form.passWord = "";
        }
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
</style>
