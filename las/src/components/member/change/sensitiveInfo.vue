<template>
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px" label-position="left">

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
                <el-form-item label="手机号码" prop="tel">
                    <el-input v-model="form.tel" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="form.nickname" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <template>
            <el-form-item label="默认收款方式" label-width="120px" >
                <el-radio v-model="form.withdrawDefault" label="银行卡">银行卡</el-radio>
            </el-form-item>
        </template>

        <el-row>
            <el-col :span="14">
                <el-form-item label="银行卡信息" label-width="100px">
                    <el-button type="text" @click="addBank">添加银行卡</el-button>
                    <el-table :data="allBankTable" border size="mini">
                        <el-table-column prop="bankCode" label="银行名称" align="center" width="150px">
                        </el-table-column>
                        <el-table-column prop="accCode" label="卡号" align="center"> 
                        </el-table-column>
                        <el-table-column prop="accName" label="账户名" align="center" width="150px">
                        </el-table-column>
                        <el-table-column prop="accType" label="类型" align="center" width="100px">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="80px">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="untieBank(scope.row)">解绑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>


        <el-row>
            <el-col :span="8">
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6}" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" size="mini"  @click="onSubmit('form')" :loading="submitLoading">提交审核</el-button>
        </el-form-item>

        <dialog-com></dialog-com>
    </el-form>
</template>


<script>
import util from "../../../util/util.js";
export default {
  data() {
    //手机号码验证
    var validateTel = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        let isTel = reg.test(value);
        if ( !isTel) {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    };
    return {
        bankTable:[],       //存储银行卡信息
        submitLoading:false,  //提交loading
        form: {
            id: "", //会员编号
            name: "", //姓名
            nickname:"", //昵称
            tel: "", //电话
            withdrawDefault: "银行卡", //收款方式
            desc: ""//备注
        },
        //表单验证
        rules: {
            nickname: [
                { required: true, message: "请输入昵称", trigger: "blur" },
                { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
            ],
            tel: [
                { required: true, message: "请输入手机号码", trigger: "blur" },
                { validator: validateTel, trigger: 'blur'}
            ] 
        },
        //全部银行卡数据
        allBankTable: []
    };
  },
  methods: {
    //提交表单
    onSubmit(form) {  
        if(!this.form.id) {    //未选择用户
            this.$message({
                showClose: true,
                message: '请先选择用户',
                type: 'error'
            });       
        }else{
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    this.$axios({
                        method:'post',
                        url:"/apis/member/updateByMBank",
                        params: {
                            mCode:this.form.id,
                            mName:this.form.name,
                            mobile:this.form.tel,
                            mNickname:this.form.nickname,
                            withdrawDefault:this.form.withdrawDefault,
                            mDesc:this.form.desc
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            util.$emit("userDefined","您的信息已提交，请耐心等待审核！")
                        } else{
                            util.$emit("userDefined",response.data.msg)
                        }
                        this.submitLoading = false;
                    }) 
                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入必整信息!',
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
    //获取全部银行卡信息
    getBankList() {
        this.$axios({
            method:'get',
            url:"/apis/member/findMBankByMCode",
            params: {
                mCode:this.form.id
            }
        })
        .then(response=>{
            if(response.data.code){
                this.allBankTable = [];
                let leng = response.data.data.memberBank.length;
                let data = response.data.data.memberBank;
                for(var i = 0; i < leng; i++){
                    let obj = data[i];
                    this.allBankTable.push(obj);
                }
            } else{
                console.log("获取银行卡信息失败");
            }
        })          
        
    },
    //解绑银行卡
    untieBank(row) {
        util.$emit("dialogUntieBank",{
            aId:row.oId,
            mCode:row.mCode
        });
    },
    //添加银行卡
    addBank() {
        if(this.form.id){
            util.$emit("DialogBank",this.form.id);
        }else {
            this.$message({
                showClose: true,
                message: '请先选择用户',
                type: 'error'
            });
        }
    }
  },
  created () {
    //接收选中会员信息
    util.$on("TabelData",(data)=>{
        this.form.desc = "";
        this.form.id = data.mCode;
        this.form.name = data.mName;
        this.form.tel = data.mobile;
        this.form.nickname = data.mNickname;
        this.getBankList();
    });
    //添加银行卡成功
    util.$on("addBankSuccess",()=>{
        this.getBankList();
    });
    //解绑银行卡成功
     util.$on("UntieBankSuccess",()=>{
         this.getBankList();
     })
  }
};
</script>

<style>
.address .el-form-item__label {
  text-align: center;
}
</style>
