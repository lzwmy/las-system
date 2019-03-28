<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" icon="el-icon-search"  @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>      

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="当前级别:">
                    <el-input v-model="form.currentType"  disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="调整后级别" prop="nextType">
                    <el-select v-model.trim="form.nextType" placeholder="请选择">
                        <el-option v-for="(items,index) in select" :key="index" :label="items" :value="items" :disabled="form.currentType==items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8" :xs="24" :sm="24" :md="18" :lg="8" :xl="8">
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model.trim="form.desc" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" :loading="submitLoading" @click="onSubmit('form')">提交审核</el-button>
        </el-form-item>

        <!-- 弹出层组件 -->
        <dialog-com ref="dialog" @searchData="getSearchData"></dialog-com>
    </el-form>
</template>


<script>
export default {
    name:"changeLevel",
    data() {
        return {
            submitLoading:false,  //提交loading
            select:['普通会员','VIP会员','代理会员','初级代理店','一级代理店','二级代理店','三级代理店','旗舰店','高级旗舰店','超级旗舰店'],
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
                    { required: true, message: "请选择调整后级别", trigger: ['blur'] },
                ],
                desc: [
                    { required: true, message: "请填写备注", trigger: ['blur'] },
                ]
            }
        };
    },
    methods: { 
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
                        this.submitLoading = true;
                        this.$request({
                            method:'post',
                            url:"/apis/member/updateRelationByMCode",
                            params: {
                                mCode:this.form.id,
                                mName:this.form.name,
                                rankName:this.form.currentType, 
                                rankNameNew:this.form.nextType,
                                mDesc:this.form.desc
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                this.$alert('您的信息已提交，请耐心等待审核!', '提示', {
                                    confirmButtonText: '确定',
                                    type:"success",
                                    callback: action => {
                                        //重置
                                        this.form = {
                                            id: "", //会员编号
                                            name: "", //姓名
                                            currentType:"", //当前级别
                                            nextType:"", //调整后级别
                                            desc: "" //备注
                                        }
                                    }
                                });
                                this.$store.dispatch('getMessage');
                            } else{
                                this.$alert(response.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    type:"warning",
                                    callback: action => {}
                                });
                            }
                            this.submitLoading = false;
                        })
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
            this.$refs.dialog.onSearchDialog();
        },
        //接收先中会员信息
        getSearchData(data) {
            this.form.currentType = "";
            this.form.nextType = "";
            this.form.desc = "";
            this.form.id = data.mCode;
            this.form.name = data.mName;
            this.form.currentType = data.mLevel;
        }
    }
};
</script>

<style>
</style>
