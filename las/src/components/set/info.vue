<template>
    <el-form label-width="100px" label-position="left">
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="用户名:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="昵称：">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="修改密码：">
                    <el-input type="password" v-model="form.password1"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="7" :xl="6">
                <el-form-item label="确认密码：">
                    <el-input type="password" v-model="form.password2"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <br/>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-button @click="onRest">重 置</el-button>
                <el-button type="primary">修 改</el-button>
            </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="修改头像：">
                    <el-upload 
                        action="/apis/member/uploadFile"
                        list-type="picture-card"
                        accept=".jpg, .png, .bmp"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        v-model="form.file"
                        :limit=1
                        :before-upload="beforeUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row> -->
    </el-form>
</template>


<script>
import {onGetTime} from "../../util/util.js";
export default {
    name:"info",
    data() {
        return {
            form:{
                name:"admin",
                nickname:"王小虎",
                password1:"",
                password12:"",
            }
            
        };
    },
    methods: {
        //重置
        onRest(){
            this.form.password1 = "";
            this.form.password2 = "";
        },
        //图片上传成功
        uploadSuccess(response) {
            if(response.code){
                this.form.file = response.data;
            }
        },
        //图片上传失败
        uploadError() {
            this.$message({
                showClose: true,
                message: '服务器未响应,上传失败',
                type: 'error'
            });
        },
        //上传文件之前验证类型和大小
        beforeUpload(file) {
            const fileType = file.type=="image/jpeg"||file.type=="image/png"||file.type=="image/bmp";
            if(!fileType){
                this.$message({
                    showClose: true,
                    message: '只能上传png/JPG/bmp文件',
                    type: 'error'
                });
            }
            return fileType;
        }
    },
    created() {
       
    }
};
</script>

<style>

</style>

