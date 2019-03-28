<template>
    <el-form :model="form" label-width="80px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" icon="el-icon-search"  @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="会员编号">
                    <el-input v-model="form.mCode" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="会员昵称">
                    <el-input v-model="form.nickname" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row> 

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="会员姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="身份证号">
                    <el-input v-model="form.idCode" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>    

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="手机号">
                    <el-input v-model="form.tel" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>   

        <el-row>
            <el-col :span="4" :xs="7" :sm="7" :md="7" :lg="4" :xl="4">
                <el-form-item label="会员状态">
                    <el-input v-model="form.mState" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left:-40px;" v-if="usable">
                <el-form-item>
                    <el-button type="success" :disabled="form.mCode && form.mState=='冻结'" size="mini" @click="form.mCode && form.mState=='冻结'?'':DialogConfirm(0,'冻结')">冻 结</el-button>
                    <el-button type="warning" :disabled="form.mCode && form.mState!='冻结'"  size="mini" @click="form.mCode && form.mState!='冻结'?'':DialogConfirm(0,'解冻')">解 冻</el-button>
                    <el-button type="danger" :disabled="form.mCode && form.mState=='未激活'" size="mini" @click="form.mCode && form.mState=='未激活'?'':DialogConfirm(0,'未激活')">注 销</el-button>
                </el-form-item>
            </el-col>
        </el-row>  

        <el-row>
            <el-col :span="4" :xs="7" :sm="7" :md="7" :lg="4" :xl="4">
                <el-form-item label="积分状态">
                    <el-input v-model="form.integralState" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left:-40px;" v-if="usable"> 
                <el-form-item>
                    <el-button type="success" :disabled="form.mCode && form.integralState=='冻结'"  size="mini" @click="form.mCode && form.integralState=='冻结'?'':DialogConfirm(1,'冻结')">冻 结</el-button>
                    <el-button type="warning" :disabled="form.mCode && form.integralState!='冻结'"  size="mini" @click="form.mCode && form.integralState!='冻结'?'':DialogConfirm(1,'解冻')">解 冻</el-button>
                    <el-button type="danger" :disabled="form.mCode && form.integralState!='正常'"  size="mini" @click="onReset">重置密码</el-button>
                </el-form-item>
            </el-col>
        </el-row>  

        <el-row>
            <el-col :span="4" :xs="7" :sm="7" :md="7" :lg="4" :xl="4">
                <el-form-item label="奖励积分">
                    <el-input v-model="form.rewardIntegral" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left:-40px;" v-if="usable">
                <el-form-item>
                    <el-button type="success"  size="mini" @click="form.mCode && form.integralState!='正常'?'':showDialogChange('补偿积分','MUB')" :disabled="form.mCode && form.integralState!='正常'">补偿积分</el-button>
                    <el-button type="warning"  size="mini" @click="form.mCode && (form.integralState!='正常' || parseInt(form.rewardIntegral) <=0)?'':showDialogChange('扣减积分','MDB')" :disabled="form.mCode && (form.integralState!='正常' || parseInt(form.rewardIntegral) <=0)">扣减积分</el-button>
                </el-form-item>
            </el-col>
        </el-row>  
        <el-row>
            <el-col :span="4" :xs="7" :sm="7" :md="7" :lg="4" :xl="4">
                <el-form-item label="购物积分">
                    <el-input v-model="form.shopIntegral" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left:-40px;" v-if="usable">
                <el-form-item>
                    <el-button type="success"  size="mini" @click="form.mCode && form.integralState!='正常'?'':showDialogChange('补偿积分','MUW')" :disabled="form.mCode && form.integralState!='正常'">补偿积分</el-button>
                    <el-button type="warning"  size="mini" @click="form.mCode && (form.integralState!='正常' || parseInt(form.shopIntegral) <=0)?'':showDialogChange('扣减积分','MDW')" :disabled="form.mCode && (form.integralState!='正常' || parseInt(form.shopIntegral) <=0)">扣减积分</el-button>
                </el-form-item>
            </el-col>
        </el-row>  
        <el-row>
            <el-col :span="4" :xs="7" :sm="7" :md="7" :lg="4" :xl="4">
                <el-form-item label="换购积分" v-if="usable">
                    <el-input v-model="form.changeIntegral" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left:-40px;">
                <el-form-item>
                    <el-button type="success"  size="mini" @click="form.mCode && form.integralState!='正常'?'':showDialogChange('补偿积分','MUR')" :disabled="form.mCode && form.integralState!='正常'">补偿积分</el-button>
                    <el-button type="warning"  size="mini" @click="form.mCode && (form.integralState!='正常' || parseInt(form.changeIntegral) <=0)?'':showDialogChange('扣减积分','MDR')" :disabled="form.mCode && (form.integralState!='正常' || parseInt(form.changeIntegral) <=0)">扣减积分</el-button>
                </el-form-item>
            </el-col>
        </el-row>  


        <!-- 弹出层组件 -->
        <dialog-com ref="dialog" @searchData="getSearchData"></dialog-com>

        <!-- 操作状态弹出层 -->
        <el-dialog title="提示" :visible.sync="DialogState" width="400px" center>
            <p><b>{{stateForm.title}}</b></p>
            <br/>  
            <el-row>
                <el-col :span="24">
                    <el-form-item label="填入理由:" label-width="75px">
                        <el-input type="textarea" v-model="stateForm.desc" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                    </el-form-item>
                </el-col>
            </el-row> 
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DialogState = false">取 消</el-button>
                <el-button type="primary" @click="onConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 补偿积分，扣减积分弹出层 -->
        <el-dialog :title="DialogIntegralVal" :visible.sync="DialogIntegral" width="500px" center>
            <el-form status-icon :model="IntegralForm" ref="IntegralForm" :rules="rules" label-width="110px" label-position="left">
                <el-form-item :label="DialogIntegralVal+'数量：'" prop="CIntegral" v-if="DialogIntegralVal=='补偿积分'">
                    <el-input v-model.trim="IntegralForm.CIntegral"></el-input>
                </el-form-item>
                <el-form-item :label="DialogIntegralVal+'数量：'" prop="MIntegral" v-if="DialogIntegralVal=='扣减积分'">
                    <el-input v-model.trim="IntegralForm.MIntegral"></el-input>
                </el-form-item>
                 <el-form-item label="备注" prop="desc">
                    <el-input v-model.trim="IntegralForm.desc" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogIntegral = false">取 消</el-button>
                <el-button type="primary" @click="onChangeIntegral('IntegralForm')">确 定</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>


<script>
export default {
    name:"mState",
    data() {
        //百分比验证
        var validate = (rule, value, callback) => {
            const reg = /^\d+(\.\d+)?$/;
            let isRight = reg.test(value);
            if ( value!=null && !isRight ) {
                callback(new Error('请输入正确数字格式'));
            } else {
                callback();
            }
        };
        return {
            usable:false,
            DialogState:false, //状态弹出层
            DialogIntegral:false, //修改积分弹出层
            DialogIntegralVal:"", //修改积分标题
            form: {
                mCode: "", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                idCode:"", //身份证号
                tel:"", //手机号
                mState: "", //会员状态
                integralState: "", //积分状态
                rewardIntegral: "", //奖励积分
                shopIntegral: "", //购物积分
                changeIntegral: "" //换购积分
            },
            stateForm: {
                title:"", //状态标题
                state:"", //操作会员状态或积分状态
                type:"", //操作类型
                statusAfter:null, //状态改变后
                desc:"", //填入理由
            },
            IntegralForm:{
                CIntegral:"", //补偿积分
                MIntegral:"", //扣减积分
                desc:""
            },
            updateType:'',  //修改积分的状态
            //表单验证规则
            rules: {
                CIntegral: [
                    { validator: validate, trigger: ['blur'] }
                ],
                MIntegral: [
                    { validator: validate, trigger: ['blur'] }
                ],
                desc:[
                    { required: true, message: "请输入备注", trigger: ['blur'] }
                ]   
            }
        };
    },
    methods: { 
        //点击搜索按钮
        onSearch() {
            this.$refs.dialog.onSearchDialog();
        },
        //状态弹框
        DialogConfirm(val,title) {
            this.stateForm.statusAfter = null;
            this.stateForm.desc = "";
            this.DialogState = true;
            this.stateForm.state = val;
            this.stateForm.type = title;
            //操作会员状态
            if(this.stateForm.state==0){
                if(title=="冻结"){
                    this.stateForm.title = "确认冻结该用户?"
                    this.stateForm.statusAfter = 1;
                }else if(title=="解冻"){
                    this.stateForm.title = "确认解冻该用户?"
                    this.stateForm.statusAfter = 0;
                }else if(title=="未激活"){
                    this.stateForm.title = "确认注销该用户?"
                    this.stateForm.statusAfter = 2;
                }
            }else{  
                //操作积分状态
                if(title=="冻结"){
                    this.title = "确认冻结该用户积分?"
                    this.stateForm.statusAfter = 1;
                }else if(title=="解冻"){
                    this.title = "确认解冻该用户积分?"
                    this.stateForm.statusAfter = 0;
                }else if(title=="未激活"){
                    this.title = "确认注销该用户积分?"
                    this.stateForm.statusAfter = 2;
                }
            }
        },
        //状态确定操作
        onConfirm() {
            //操作会员状态
            let statusBefore = null;
            if(this.stateForm.state==0){
                statusBefore = this.form.mState=="未激活"?2:(this.form.mState=="正常"?0:1);
            }else{
                //操作积分状态
                statusBefore = this.form.integralState=="正常"?0:(this.form.integralState=="冻结"?1:2);
            }
            this.$request({
                method:'post',
                url:"/apis/member/updateStatusByMCode",
                params:{
                    mCode:this.form.mCode,
                    mNickname:this.form.nickname,
                    statusType:this.stateForm.state==0?"MM":"MR",
                    statusBefore:statusBefore,
                    statusAfter:this.stateForm.statusAfter,
                    updateDesc:this.stateForm.desc
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: '操作会员状态成功',
                        type: 'success'
                    });
                    //更新会员状态
                    this.searchState();
                    this.$request({
                        method:'get',
                        url:"/apis/member/findRelationByMCode",
                        params:{
                            mCode:this.form.mCode,
                            date:new Date().getTime()
                        }
                    })     
                    .then(response=>{ 
                        if(response.data.code){
                            let state = response.data.data.memberRelation.mStatus;
                            if(state == 0){
                                this.form.mState = "正常";
                            }else if(state == 1){
                                this.form.mState = "冻结";
                            }else{
                                this.form.mState = "未激活";
                            }
                        }
                    })
                }else {
                    this.$message({
                    showClose: true,
                    message: response.data.msg,
                    type: 'error'
                });
                }
            })
            setTimeout(()=>{
                this.DialogState = false;
            },200)
        },
        //重置密码
        onReset() {
            if(!this.form.mCode) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });       
            }else{
                this.$confirm('确认要重置密码?', '提示', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$request({
                        method:'post',
                        url:"/apis/member/resetPasswordByMCode",
                        params: {
                            mCode:this.form.mCode
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                message: '密码已重置!',
                                type: 'success'
                            });
                           this.searchState();
                        } else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })    
                }).catch(() => {});
            }
        },
        //修改积分弹出层
        showDialogChange(title,type){
            this.IntegralForm = {
                CIntegral:"", 
                MIntegral:"",
                desc:""
            }
            if(!this.form.mCode) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });       
            }else{
                this.DialogIntegral = true;
                this.DialogIntegralVal = title;
                this.updateType = type;
            }
        },
        //修改积分
        onChangeIntegral(form) {
            this.$refs[form].validate((valid) => {
                if (valid){
                    //输入积分
                    let updateNumber = null;
                    if(this.DialogIntegralVal.indexOf('补偿') != -1){
                        updateNumber = this.IntegralForm.CIntegral;
                    }else{
                        updateNumber = this.IntegralForm.MIntegral;
                    }
                    this.$request({
                        method:'post',
                        url:"/apis/member/updatePointByMCode",
                        params: {
                            mCode:this.form.mCode,
                            mNickname:this.form.nickname,
                            updateType:this.updateType,
                            updateNumber:parseInt(updateNumber),
                            autohrizeDesc:this.IntegralForm.desc
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                message: this.DialogIntegralVal+'成功!',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })
                    this.DialogIntegral = false;
                    setTimeout(()=>{
                        //重新获取新积分
                        this.$request({
                            method:'get',
                            url:"/apis/member/findMemAccountByMCode",
                            params:{
                                mCode:this.form.mCode,
                                date:new Date().getTime()
                            }
                        })     
                        .then(response=>{
                            console.log(response)
                            if(response.data.code){
                                this.form.rewardIntegral = response.data.data.bonusBlance;
                                this.form.shopIntegral = response.data.data.walletBlance;
                                this.form.changeIntegral = response.data.data.redemptionBlance;
                            }
                        })   
                    },800)
                        
                }else {
                    this.$message({
                        showClose: true,
                        message: '请输入正确信息!',
                        type: 'error'
                    }); 
                    return false;
                }
            })
        },
        //接收先中会员信息
        getSearchData(data) {
            this.form= {
                mCode: data.mCode, //会员编号
                name: data.mName, //姓名
                nickname: data.mNickname, //昵称
                idCode:data.idCode, //身份证号
                tel:data.mobile, //手机号
                mState: data.mStatus, //会员状态
                integralState: "", //积分状态
                rewardIntegral: "", //奖励积分
                shopIntegral: "", //购物积分
                changeIntegral: "" //换购积分
            }
            this.searchState();
        },
        //查找会员积分状态
        searchState(){
            this.$request({
                method:'get',
                url:"/apis/member/findMemAccountByMCode",
                params:{
                    mCode:this.form.mCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let data = response.data.data;
                    if(data.bonusStatus == 0){
                        this.form.integralState = "正常";
                    }else if(data.bonusStatus == 1){
                        this.form.integralState = "冻结";
                    }else{
                        this.form.integralState = "未激活";
                    }
                    
                    this.form.rewardIntegral = data.bonusBlance;
                    this.form.shopIntegral = data.walletBlance;
                    this.form.changeIntegral = data.redemptionBlance;
                }
            })
        }
    },
    created(){
        //判断是否操作权限
        if(this.$store.state.powerArr.indexOf("管理会员状态积分") != -1){
            this.usable = true;
        }else{
            this.usable = false;
        }
    }
};
</script>

<style>
</style>
