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
            <el-col :span="24" style="paading-left:110px;">
                <el-button type="primary" @click="onChange('form')">确认修改</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
export default {
    name:"changePAW",
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
                name:"",
                passwordOld:"",
                password1:"",
                password12:"",
            },
            show: false,
            //表单验证规则
            rules: {
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
    methods: {
        //修改
        onChange(form){
            this.$refs[form].validate((valid) => {
                if(valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/updateUser",
                        params: {
                            id:parseInt(this.form.id),
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
    }
};
</script>


