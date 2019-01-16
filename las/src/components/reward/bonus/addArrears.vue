<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="90px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" icon="el-icon-search"  @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员编号">
                    <el-input v-model="form.mcode" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="会员昵称">
                    <el-input v-model="form.nickname" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>  

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="身份证号">
                    <el-input v-model="form.IDCode" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>   

        <el-row>
            <el-col :span="6">
                <el-form-item label="币种">
                    <el-input v-model="form.currency" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="当前欠款">
                    <el-input v-model="form.arrears" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>    

        <el-row>
            <el-col :span="6">
                <template>
                    <el-form-item label="交易类型" label-width="110px">
                        <el-radio v-model="form.type" label="借款" @input="changeMoney">借款</el-radio>
                        <el-radio v-model="form.type" label="还款" @input="changeMoney">还款</el-radio>
                    </el-form-item>
                </template>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="默认提现卡">
                    <el-input v-model="form.bankCode" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>   

        <el-row>
            <el-col :span="6">
                <el-form-item label="交易金额" prop="money">
                    <el-input v-model="form.money" @input="changeMoney"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="交易后余额">
                    <el-input v-model="form.balance" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row> 

        <el-row>
            <el-col :span="4">
                <el-form-item label="自动扣减工资百分比" label-width="150px" prop="percentage">
                    <el-input v-model.number="form.percentage"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <el-form-item label-width="5px">
                   %
                </el-form-item>
            </el-col>
        </el-row>      
        
        <el-row>
            <el-col :span="2" :offset="1">
                <el-button type="primary" :loading="submitLoading" @click="onSubmit('form')">提交审核</el-button>
            </el-col>
            <el-col :span="2">
                <router-link to="/memberArrears">
                    <el-button>返 回</el-button>
                </router-link>
            </el-col>
        </el-row>

        <!-- 弹出层组件 -->
        <dialog-com ref="dialog" @searchData="getSearchData"></dialog-com>
    </el-form>
</template>


<script>
export default {
    data() {
        //自动扣减工资百分比验证
        var validate = (rule, value, callback) => {
            const reg = /^[1-9]{1,2}$/;
            let isRight = reg.test(value);
            if (!isRight) {
                callback(new Error('请输入小于100的正整数'));
            } else {
                callback();
            }
        };
        return {
            submitLoading:false,  //提交loading
            form: {
                mcode: "", //会员编号
                name: "", //会员昵称
                nickname: "", //会员姓名
                IDCode: "", //身份证号
                currency:"", //币种
                arrears:null, //当前欠款
                type: "借款", //交易类型
                bankCode: "", //默认提现卡
                money: null, //交易金额
                balance: "", //交易后余额
                percentage: "", //百分比
                oId:null,
            },
            //表单验证规则
            rules: {
                percentage: [
                    { validator: validate, trigger: ['blur','change'] }
                ],
                money: [{required: true,message: "请输入交易金额",trigger: ['blur','change']}]
            }
        };
    },
    methods: { 
        //向后台提交修改
        onSubmit(form) {
            if(!this.form.mcode) {     //未选择用户
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
                            url:"/apis/member/addReceivable",
                            params: {
                                mCode:this.form.mcode,
                                mNickname:this.form.nickname,
                                currencyCode:this.form.currency, 
                                receivableBlance:this.form.arrears,
                                trTypeCode:this.form.type=="借款"?"NR":"RR",
                                oId:this.form.oId,
                                amount:this.form.money,
                                blanceAfter:this.form.balance,
                                bnsDeductPecent:this.form.percentage
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                this.$refs.dialog.userDefined({
                                    icon:"success",
                                    title:"信息已成功提交！"
                                });
                            } else{
                                this.$refs.dialog.userDefined({
                                    icon:"error",
                                    title:response.data.msg
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
            this.form = {
                mcode: data.mCode, //会员编号
                name: data.mNickname, //会员昵称
                nickname: data.mName, //会员姓名
                IDCode: data.idCode, //身份证号
                currency:"", //币种
                arrears:"", //当前欠款
                type: "借款", //交易类型
                bankCode: "", //默认提现卡
                money: "", //交易金额
                balance: "", //交易后余额
                percentage: "", //百分比
            }
            this.getDetailed(data.mCode);
        },
        //获取会员欠款明细
        getDetailed(mCdoe) {
            this.$request({
                method:'get',
                url:"/apis/member/findReceivableByMCode",
                params: {
                    mCode:mCdoe,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.form.currency = response.data.data.currencyCode;
                    this.form.arrears = response.data.data.receivableBlance;
                    this.form.bankCode = response.data.data.bank.accCode;
                    this.form.percentage = response.data.data.bnsDeductPecent;
                    this.form.oId = response.data.data.bank.oId;
                }
            })
        },
        //计算交易金额
        changeMoney(data) {
            if(this.form.type=="借款"){
                this.form.balance = parseInt(this.form.arrears) - parseInt(this.form.money);
            }else {
                this.form.balance = parseInt(this.form.arrears) + parseInt(this.form.money);
            }
        }
    }
};
</script>

<style>
</style>
