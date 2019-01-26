<template>
    <el-form  :model="form" ref="form" :rules="rules" label-width="200px">
        <el-row>
            <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="返佣计入奖励积分比例:">
                    <el-input v-model="form.rsCountBonusPoint" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
            <el-col :span="4" :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                <el-form-item label="修改为:" label-width="60px" prop="rsCountBonusPointChange">
                    <el-input v-model="form.rsCountBonusPointChange" @keyup.native="inputNumberCode1($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="奖励积分提现最低限额:" prop="bonusPointWdLimit">
                    <el-input v-model="form.bonusPointWdLimit"  @keyup.native="inputNumberCode2($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label-width="5px">奖励积分</el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="奖励积分提现手续费:" prop="bonusPointWd">
                    <el-input v-model="form.bonusPointWd" @keyup.native="inputNumberCode3($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="奖励积分转入购物积分比例:">
                    <el-input v-model="form.bonusPointShopping" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
            <el-col :span="4" :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                <el-form-item label="修改为:" label-width="60px" prop="bonusPointShoppingChange">
                    <el-input v-model="form.bonusPointShoppingChange" @keyup.native="inputNumberCode4($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="购物积分购物比例:">
                    <el-input v-model="form.shoppingPointSr" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
            <el-col :span="4" :xs="8" :sm="8" :md="8" :lg="4" :xl="4">
                <el-form-item label="修改为:" label-width="60px" prop="shoppingPointSrChange">
                    <el-input v-model="form.shoppingPointSrChange" @keyup.native="inputNumberCode5($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                <el-form-item label="购物积分转账手续费:" prop="tranksShoppingPoint">
                    <el-input v-model="form.tranksShoppingPoint"  @keyup.native="inputNumberCode6($event)"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">%</el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2" :offset="1">
                <el-button type="primary" @click="onSubmit('form')">保存设置</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
export default {
    name:"IntegralRule",
    data() {
        //百分比验证
        var validate = (rule, value, callback) => {
            // const reg = /^[0-9]*[1-9][0-9]*$/;
            const reg = /^\d+(\.\d+)?$/;
            let isRight = reg.test(value);
            if ( value!=null && !isRight ) {
                callback(new Error('请输入正确数字格式'));
            } else {
                callback();
            }
        };
        return {
            form: {
                rsCountBonusPoint:"", //返佣计入奖励积分比例:
                rsCountBonusPointChange:"", //返佣计入奖励积分比例修改
                bonusPointWdLimit:"",     //奖励积分提现最低限额
                bonusPointWd:"",  //奖励积分提现手续费
                bonusPointShopping:"", //奖励积分转入购物积分比例
                bonusPointShoppingChange:"", //奖励积分转入购物积分比例修改
                shoppingPointSr:"",   //购物积分购物比例
                shoppingPointSrChange:"",   //购物积分购物比例修改
                tranksShoppingPoint:""    //购物积分转账手续费
            },
            oldRule:{}, //修改前规则 
            //表单验证规则
            rules: {
                rsCountBonusPointChange: [
                    { validator: validate, trigger: ['blur','change']}
                ],
                bonusPointWdLimit: [
                    { validator: validate, trigger: ['blur','change']}
                ],
                bonusPointWd: [
                    { validator: validate, trigger: ['blur','change']}
                ],
                bonusPointShoppingChange: [
                    { validator: validate, trigger: ['blur','change']}
                ],
                shoppingPointSrChange: [
                    { validator: validate, trigger: ['blur','change']}
                ],
                tranksShoppingPoint: [
                    { validator: validate, trigger: ['blur','change']}
                ]
            }
        };
    },
    methods: {
        inputNumberCode1(e){
            this.form.rsCountBonusPointChange = e.target.value.replace(/[^\d.]/g,'');
        },
        inputNumberCode2(e){
            this.form.bonusPointWdLimit = e.target.value.replace(/[^\d.]/g,'');
        },
        inputNumberCode3(e){
            this.form.bonusPointWd = e.target.value.replace(/[^\d.]/g,'');
        },
        inputNumberCode4(e){
            this.form.bonusPointShoppingChange = e.target.value.replace(/[^\d.]/g,'');
        },
        inputNumberCode5(e){
            this.form.shoppingPointSrChange = e.target.value.replace(/[^\d.]/g,'');
        },
        inputNumberCode6(e){
            this.form.tranksShoppingPoint = e.target.value.replace(/[^\d.]/g,'');
        },
        //查询规则 
        onSearch() {
            this.form = {
                rsCountBonusPoint:"", 
                rsCountBonusPointChange:"", 
                bonusPointWdLimit:"",     
                bonusPointWd:"",  
                bonusPointShopping:"", 
                bonusPointShoppingChange:"", 
                shoppingPointSr:"",   
                shoppingPointSrChange:"",   
                tranksShoppingPoint:""   
            },
            this.$request({
                method:'get',
                url:"/apis/member/findRule",
                params: {
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.form.rsCountBonusPoint = response.data.data.rsCountBonusPoint;
                    this.form.rsCountBonusPointChange = response.data.data.rsCountBonusPoint;
                    this.form.bonusPointWdLimit = response.data.data.bonusPointWdLimit;
                    this.form.bonusPointWd = response.data.data.bonusPointWd;
                    this.form.bonusPointShopping = response.data.data.bonusPointShopping;
                    this.form.bonusPointShoppingChange = response.data.data.bonusPointShopping;
                    this.form.shoppingPointSr = response.data.data.shoppingPointSr;
                    this.form.shoppingPointSrChange = response.data.data.shoppingPointSr;
                    this.form.tranksShoppingPoint = response.data.data.tranksShoppingPoint;

                    this.oldRule = JSON.parse(JSON.stringify(this.form));
                }
            })
        },
        //提交修改
        onSubmit(form){
            
            //未修改
            if(JSON.stringify(this.oldRule)===JSON.stringify(this.form)){
                this.$message({
                    showClose: true,
                    message: '该规则已存在!',
                    type: 'error'
                }); 
            }else{
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定要保存该修改？', '提示', {
                            confirmButtonText: '确 定',
                            cancelButtonText: '取 消',
                            type: 'warning',
                            center: true
                        }).then(() => {
                            this.$request({
                                method:'post',
                                url:"/apis/member/updateRule",
                                params: {
                                    rsCountBonusPoint:this.form.rsCountBonusPointChange?this.form.rsCountBonusPointChange.toString():this.form.rsCountBonusPoint.toString(), 
                                    bonusPointWdLimit:this.form.bonusPointWdLimit.toString(),   
                                    bonusPointWd:this.form.bonusPointWd.toString(), 
                                    bonusPointShopping:this.form.bonusPointShoppingChange?this.form.bonusPointShoppingChange.toString():this.form.bonusPointShopping.toString(), 
                                    shoppingPointSr:this.form.shoppingPointSrChange?this.form.shoppingPointSrChange.toString():this.form.shoppingPointSr.toString(),   
                                    tranksShoppingPoint:this.form.tranksShoppingPoint.toString(), 
                                    date:new Date().getTime()
                                }
                            })     
                            .then(response=>{
                                if(response.data.code){
                                    this.$message({
                                        showClose: true,
                                        message: '积分规则修改成功!',
                                        type: 'success'
                                    }); 
                                }else{
                                    this.$message({
                                        showClose: true,
                                        message: '积分规则修改失败!',
                                        type: 'error'
                                    }); 
                                }
                                this.onSearch()
                            })
                        }).catch(() => {});
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
        }
    },
    created() {
        this.onSearch();
    }
};
</script>

<style scoped>
.el-tabs .el-form-item {
    margin-bottom: 0px;
}
</style>
