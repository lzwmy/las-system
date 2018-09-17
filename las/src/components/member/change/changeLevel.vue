<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" size="mini" @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>      

        <el-row>
            <el-col :span="6">
                <el-form-item label="当前级别:">
                    <el-input v-model="form.currentType"  disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="调整后级别" prop="nextType">
                    <el-select v-model="form.nextType" placeholder="请选择" @change="changeForm">
                        <el-option v-for="(items,index) in select" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" @change="changeForm" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" size="mini" @click="onSubmit('form')">提交审核</el-button>
        </el-form-item>

        <dialog-com></dialog-com>
    </el-form>
</template>


<script>
import util from "../../../util/util.js";
export default {
    data() {
        return {
            isChangeFrom:false,  //判断用户是否修改表单
            submitLoading:false,  //提交loading
            select:['普通会员','VIP会员','代理会员','一级代理店','二级代理店','三级代理店','旗舰店','高级旗舰店','超级旗舰店'],
            form: {
                id: "", //会员编号
                name: "", //姓名
                currentType:"", //当前级别
                nextType:"", //调整后级别
                desc: "" //备注
            },
            //表单验证规则
            rules: {
                nextType: [
                    { required: true, message: "请选择调整后级别", trigger: ['blur','change'] },
                ],
                desc: [
                    { required: true, message: "请填写备注", trigger: ['blur','change'] },
                ]
            }
        };
    },
    methods: {
        //判断用户是否修改表单 
        changeForm() {
            this.isChangeFrom = true;
        },
        //向后台提交修改
        onSubmit(form) {
            if(!this.form.id) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });       
            }else{
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        if(!this.isChangeFrom){
                            this.$message({
                                showClose: true,
                                message: '该信息已存在，请匆重复提交!',
                                type: 'error'
                            }); 
                        }else {
                            //转换身份类型为数字
                            switch(this.form.nextType){
                                case "普通会员": 
                                    this.form.nextType = 1 ;
                                    break;
                                case "VIP会员": 
                                    this.form.nextType = 2 ;
                                    break;
                                case "代理会员": 
                                    this.form.nextType = 3 ;
                                    break;
                                case "一级代理店": 
                                    this.form.nextType = 4 ;
                                    break;
                                case "二级代理店": 
                                    this.form.nextType = 5 ;
                                    break;
                            }
                            this.submitLoading = true;
                            this.$axios({
                                method:'post',
                                url:"/apis/member/updateRelationByMCode",
                                params: {
                                    mCode:this.form.id,
                                    mName:this.form.name,
                                    rank:this.form.currentType, 
                                    rankNew:this.form.nextType,
                                    mDesc:this.form.desc
                                }
                            })
                            .then(response=>{
                                console.log(response)
                                if(response.data.code){
                                    util.$emit("userDefined","提交成功,正在等待审核!");
                                    this.submitLoading = false;
                                    this.isChangeFrom = false;
                                } else{
                                    util.$emit("userDefined","提交失败!")
                                    this.submitLoading = false;
                                }
                            })
                        }                      
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请输入必填信息!',
                            type: 'error'
                        });
                        return false;
                    }
                }); 
            }
        },
        //点击搜索按钮
        onSearch() {
            util.$emit("searchdialog");
        },
        //根据会员编号获取会员级别
        getMemberInfo() {
            this.$axios({
                method:'get',
                url:"/apis/member/findRelationByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.form.currentType = response.data.data.rank;
                }
            })    
        },
    },
    created() {
        //接收选中会员信息
        util.$on("TabelData",(data)=>{
            this.form.id = data.mCode;
            this.form.name = data.mName;
            this.getMemberInfo();
            setTimeout(()=>{
                this.isChangeFrom = false;
            },500)
        });
    }
};
</script>

<style>
</style>
