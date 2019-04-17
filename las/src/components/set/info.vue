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
                        :headers="token"
                        :width="200"
                        :height="200"
                        :noRotate=false
                        url="/apis/member/uploadFile"
                        img-format="png">
                    </my-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <br/>
        <br/>
        <el-row>
            <el-col :span="10" style="padding-left:110px;">
                <el-button type="primary" @click="onChange('form')">确认修改</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
import myUpload from 'vue-image-crop-upload';
import Cookies from 'js-cookie';
export default {
    name:"info",
    data() {
        return {
            token:{},
            form:{
                id:null,
                name:"",
                nickname:"",
                imgPath:""
            },
            imgDataUrl:"",
            show: false,
            //表单验证规则
            rules: {
                name: [
                    { required: true, message: '请输入用户名',  trigger: ['blur']}
                ],
                nickname: [
                    { required: true, message: '请输入昵称',  trigger: ['blur']}
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
                this.show = false;
            }
        },
        cropUploadFail(status, field){
            this.$message({
                message: '状态:'+status+', 图片上传失败!',
                type: 'error'
            });
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
                            date:new Date().getTime()
                        }
                    })     
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: "修改成功",
                                type: 'success'
                            });
                            //修改头像
                            this.$store.commit('changeHeadImg',this.form.imgPath);
                        }else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
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
        this.form.imgPath = this.$store.state.infoData.headImg;
        this.imgDataUrl = this.$store.state.infoData.headImg;
        //上传添加token
        this.token = {
            token:Cookies.get('Authorization')
        }
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


