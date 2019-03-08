<template>
    <el-form status-icon :model="form" ref="form" :rules="rules" label-width="110px" label-position="left">
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="用户名:" prop="name">
                    <el-input v-model.trim="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="昵称：" prop="nickname">
                    <el-input v-model.trim="form.nickname"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="修改头像：">
                    <img :src="imgDataUrl" class="img-head">
                    <el-button @click="toggleShow">修改头像</el-button>
                    <my-upload field="file"
                        @crop-success="cropSuccess"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="show"
                        :width="200"
                        :height="200"
                        :noRotate=false
                        url="/apis/member/uploadFile"
                        img-format="png">
                    </my-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="旧密码：" prop="passwordOld">
                    <el-input type="password" v-model.trim="form.passwordOld"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="新密码：" prop="password1">
                    <el-input type="password" v-model.trim="form.password1"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="确认新密码：" prop="password2">
                    <el-input type="password" v-model.trim="form.password2"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <br/>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-button @click="onRest">重 置</el-button>
                <el-button type="primary" @click="onChange('form')">修 改</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
import myUpload from 'vue-image-crop-upload';
export default {
    name:"info",
    data() {
        //两次新密码校验
        var validate = (rule, value, callback) => {
            if (value==null || value=='') {
                callback(new Error('请输入确认新密码!'));
            } else if(value != this.form.password1) {
                callback(new Error('新密码与确认新密码不相同!'));
            }else{
                callback();
            }
        };
        return {
            form:{
                id:null,
                name:"Lin",
                nickname:"Lin",
                imgPath:"",
                passwordOld:"",
                password1:"",
                password12:"",
            },
            imgDataUrl:"https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png",
            show: false,
            //表单验证规则
            rules: {
                name: [
                    { required: true, message: '请输入用户名',  trigger: ['blur','change']}
                ],
                nickname: [
                    { required: true, message: '请输入昵称',  trigger: ['blur','change']}
                ],
                passwordOld: [
                    { required: true, message: '请输入旧密码',  trigger: ['blur','change']}
                ],
                password1: [
                    { required: true, message: '请输入新密码',  trigger: ['blur','change']}
                ],
                password2: [
                    { validator: validate,  trigger: ['blur','change']}
                ]
            }
        };
    },
    components: {
        'my-upload': myUpload
    },
    methods: {
        //裁切弹窗
        toggleShow() {
            this.show = true;
        },
        cropSuccess(imgDataUrl, field){
            this.imgDataUrl = imgDataUrl;
        },
        //图片上传成功
        cropUploadSuccess(jsonData, field){
            if(jsonData.code){
                this.form.imgPath = jsonData.data;
            }
        },
        cropUploadFail(status, field){
            this.$message({
                message: '状态:'+status+', 图片上传失败!',
                type: 'error'
            });
        },
        //重置
        onRest(){
            this.form.passwordOld = "",
            this.form.password1 = "";
            this.form.password2 = "";
        },
        //修改
        onChange(form){
            this.$refs[form].validate((valid) => {
                if(valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/updateUser",
                        params: {
                            id:parseInt(this.form.id),
                            nickName:this.form.nickname,
                            avatar:this.form.imgPath,
                            passWord:this.form.passwordOld,
                            newPassWord:this.form.password1,
                            date:new Date().getTime()
                        }
                    })     
                    .then(response=>{
                        console.log(response)
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: '请输入正确信息!',
                        type: 'error'
                    });
                    return false;
                }
            })
        }
        
    },
    created() {
        this.form.id = this.$store.state.infoData.id;
        this.form.name = this.$store.state.infoData.userName;
        this.form.nickname = this.$store.state.infoData.nickName;
        this.form.imgPath = this.$store.state.infoData.avatar;
    }
};
</script>

<style scoped>
    .img-head{
        display: inline-block;
        width:100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 50px;
        border:1px solid #ccc;
        vertical-align: middle;
    }
</style>


