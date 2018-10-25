<template>
    <el-form ref="form" :rules="rules"  :model="form" label-width="100px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" icon="el-icon-search"  @click="onSearch">搜索</el-button>
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
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="加入日期">
                    <el-input v-model="form.joinData" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员状态">
                    <el-input v-model="form.memberStatu" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="会员级别">
                    <el-input v-model="form.memberLevel" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="手机号码">
                    <el-input v-model="form.mobile" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="欠款余额">
                    <el-input v-model="form.arrearsBalance" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="积分账户状态">
                    <el-input v-model="form.accountState" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="奖励积分余额">
                    <el-input v-model="form.bonusPointsBalance" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="购物积分余额">
                    <el-input v-model="form.shoppingBalance" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="换购积分余额">
                    <el-input v-model="form.replacementBalance" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="修改后姓名" prop="changeName">
                    <el-input v-model="form.changeName"></el-input>
                </el-form-item>
            </el-col>        
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="身份类型" prop="IDType">
                    <el-select v-model="form.IDType" placeholder="请选择">
                        <el-option label="居民身份证" value="1"></el-option>
                        <el-option label="护照" value="2"></el-option>
                        <el-option label="军官照" value="3"></el-option>
                        <el-option label="港澳台回乡证" value="4"></el-option>
                        <el-option label="其它" value="9"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="证件号码" prop="IDNumber">
                    <el-input v-model="form.IDNumber" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20">
                <el-form-item label="证明材料" prop="file" v-show="form.id">
                    <el-upload 
                        action="/apis/member/uploadFile"
                        list-type="picture"
                        accept=".jpg, .png, .bmp"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        v-model="form.file"
                        :file-list="form.proofMaterial"
                        :before-upload="beforeUpload">
                        <div slot="tip" class="el-upload__tip">只能上传png/JPG/bmp文件，且单张不超过5M</div>
                        <i class="el-icon-plus"></i>                       
                    </el-upload>
                    <el-dialog >
                        <img width="100%" alt="">
                    </el-dialog>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="修改昵称">
                    <el-input v-model="form.changeNickname" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="修改手机号">
                    <el-input v-model="form.changeMobile" ></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="16">
                <el-form-item label="银行卡操作">
                    <el-button type="success" size="mini"  @click="addBank">添加新银行卡</el-button>
                    <el-button  type="success" size="danger" @click="onDialogRemoveBank" v-show="showRemoveBank">禁用所有已绑定银行卡</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16">
                <el-form-item label="银行卡列表">
                    <el-table  
                        border             
                        :data="allBankTable"
                        v-loading="loadingTableBank" 
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                        <el-table-column prop="bankCode" label="银行名称" align="center">
                        </el-table-column>
                        <el-table-column prop="accCode" label="卡号" align="center"> 
                        </el-table-column>
                        <el-table-column prop="accName" label="账户名" align="center">
                        </el-table-column>
                        <el-table-column prop="accType" label="类型" align="center">
                        </el-table-column>
                        <el-table-column prop="defaultBank" label="默认银行卡" align="center">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="110px">
                            <template slot-scope="scope">
                                <el-button  size="mini" type="primary"  @click="setDefaultBank(scope.row)">设为默认</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="16">
                <el-form-item label="地址操作">
                    <el-button type="success" size="mini" @click="addAddress">添加新地址</el-button>
                    <el-button type="danger" size="mini" @click="onDialogRemoveAddress" v-show="showRemoveAddress">禁用所有已有地址</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="16">
                <el-form-item label="现有地址列表">
                    <el-table  
                        border 
                        :data="allAddressTable"
                        v-loading="loadingTableAddress" 
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                        <el-table-column label="#" align="center" type="index" width="60">
                        </el-table-column>
                        <el-table-column prop="address" label="地址列表" align="center"> 
                        </el-table-column>
                        <el-table-column prop="defaultAdd" label="默认地址" align="center" width="120px">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="110px">
                            <template slot-scope="scope">
                                <el-button  size="mini" type="primary"  @click="setDefaultAddress(scope.row)">设为默认</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="备注" prop="remarks">
                    <el-input  v-model="form.remarks" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">提交审核</el-button>
        </el-form-item>

         <!-- 弹出层组件 -->
        <dialog-com ref="dialog" @searchData="getSearchData" @addAddress="getAddress" @addBank="getAddBank"></dialog-com>

    </el-form>
</template>


<script>
import { pca, pcaa } from "area-data";
export default {
    data() {
        return {
            select:['普通会员','VIP会员','代理会员','一级代理店','二级代理店','三级代理店','旗舰店','高级旗舰店','超级旗舰店'],
            submitLoading:false,  //提交loading
            loadingTableBank:false,
            loadingTableAddress:false,
            dialogBankList: false,  //是否显示银行卡列表弹出层
            dialogAddressList:false,  //是否显示现有地址列表弹出层
            showRemoveBank: false, //是否禁用所有已绑定银行卡按钮
            showRemoveAddress: false, //是否禁用所有已有地址按钮
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa,
            allBankTable: [],  //银行卡列表
            allAddressTable: [],   //地址列表
            //新添加银行卡数据
            newBankTable:[
                {
                    bankName:"",
                    bankId:"",
                    name:"",
                    type:"",
                }
            ],
            form: {
                id: "", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                joinData:"",  //加入日期
                memberStatu:"",   //会员状态
                memberLevel:"", //会员级别
                mobile:"",  //手机号码
                arrearsBalance:"",  //欠款余额
                accountState:"",    //账户状态
                bonusPointsBalance:"",  //奖励积分余额
                shoppingBalance:"",  //购物积分余额
                replacementBalance:"",  //换购积分余额
                changeName:"",  //修改后姓名
                IDType:"",  //证件类型
                IDNumber:"",  //证件号码
                proofMaterial:[], //证明材料列表展示
                file:[], //存储服务器返回图片路径
                changeNickname:"",  //修改昵称
                changeMobile:"",  //修改手机号码
                addAddress:[],  //添加地址
                detial:"", //详细地址
                remarks:"",  //备注

            },
            //表单验证规则
            rules: {
                changeName: [
                    { required: true, message: "请输入修改后姓名", trigger: ['blur','change'] },
                ],
                IDType: [
                    { required: true, message: "请选择身份类型", trigger: ['blur','change'] },
                ],
                IDNumber: [
                    { required: true, message: "请输入证件号码", trigger: ['blur','change'] },
                ],
                file: [
                     { required: true, message: "请选择证明材料", trigger: ['blur','change'] },
                ],
                remarks: [
                    { required: true, message: "请填写备注", trigger: ['blur','change'] },
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
                        this.$axios({
                            method:'post',
                            url:"/apis/member/updateIdByMCodeAndMName",
                            params: {
                                mCode:this.form.id,
                                mName:this.form.name,
                                idType: parseInt(this.form.IDType),
                                idCode: this.form.IDNumber,
                                mNickname: this.form.nickname,
                                mobile: this.form.mobile,
                                newMName:this.form.changeName,
                                uploadPath:this.form.file.join("||"),
                                mDesc:this.form.remarks
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                this.$refs.dialog.userDefined({
                                    icon:"success",
                                    title:"修改成功,等待审核!"
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
        //接收选中会员信息
        getSearchData(data) {
            this.form.proofMaterial = [];
            this.form.file = [];
            this.form.addAddress = [];
            this.form.IDType = "";
            this.form.changeName = "";
            this.form.IDNumber = "";
            this.form.changeNickname = "";
            this.form.changeMobile = "";
            this.form.detial = "";
            this.form.remarks = "";
            this.allBankTable = [];
            this.allAddressTable = [];


            this.form.id = data.mCode;
            this.form.IDType = data.idType.toString();
            this.form.name = data.mName;
            this.form.nickname = data.mNickname;
            this.form.IDNumber = data.idCode;
            this.form.joinData = data.creationData;
            this.form.memberStatu = data.mStatus;
            this.form.memberLevel = data.mLevel;
            this.form.mobile = data.mobile;
            this.form.addPost = data.addPost;
            this.getMemberInfo();
            this.getBankList();
            this.getAddressList();
        },
        //根据会员编号获取会员账户信息
        getMemberInfo() {
            this.form.arrearsBalance = "";
            this.form.accountState = "";
            this.form.bonusPointsBalance = "";
            this.form.shoppingBalance = "";
            this.form.replacementBalance = "";
            this.$axios({
                method:'get',
                url:"/apis/member/findMemAccountByMCode",
                params: {
                    mCode:this.form.id,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.form.arrearsBalance = response.data.data.bonusBlance;
                    this.form.accountState = response.data.data.bonusStatus;
                    this.form.bonusPointsBalance = response.data.data.bonusBlance;
                    this.form.shoppingBalance = response.data.data.walletBlance;
                    this.form.replacementBalance = response.data.data.redemptionBlance;
                    this.isChangeFrom = false;
                }
            })    
        },
        //获取银行卡列表
        getBankList() {
            this.loadingTableBank = true;
            this.$axios({
                method:'get',
                url:"/apis/member/findMBankByMCode",
                params: {
                    mCode:this.form.id,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.data.memberBank.length != 0){
                    this.showRemoveBank = true; 
                    this.allBankTable = response.data.data.memberBank;
                    for(let i in this.allBankTable){
                        if(this.allBankTable[i].defaultBank==0){
                            this.allBankTable[i].defaultBank="";
                        }else{
                            this.allBankTable[i].defaultBank="默认";
                        }
                    }
                }else {
                    this.showRemoveBank = false; 
                }
                setTimeout(()=>{
                    this.loadingTableBank = false;
                },200)
            }) 
        },
        //禁用所有银行卡
        onDialogRemoveBank() {
            if(this.form.id){
                this.$confirm('是否禁用所有已绑定银行卡?', '提示', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning',
                    center: true
                }).then(() => {
                     this.onRemoveBank();
                }).catch(() => {});
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },
        //禁用所有银行卡
        onRemoveBank() {
            this.$axios({
                method:'get',
                url:"/apis/member/outAllBankByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: '禁用所有银行卡成功!',
                        type: 'success'
                    });
                    this.allBankTable = [];
                    this.showRemoveBank = false; 
                    this.isChangeFrom = true;
                }else {
                    this.$message({
                        showClose: true,
                        message: '请求未响应!',
                        type: 'error'
                    });
                }
            }) 
        },
        //添加银行卡
        addBank() {
            if(this.form.id){
                this.$refs.dialog.showDialogBank(this.form.id);
                this.isChangeFrom = true;
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },
        //设置默认银行卡
        setDefaultBank(data) {
            this.$axios({
                method:'post',
                url:"/apis/member/defBankByOid",
                params: {
                    oId:data.oId,
                    mCode:this.form.id,
                    defaultBank:1
                }
            })
            .then(response=>{
                if(response.data.code){
                    //重新获取收货地址
                    this.getBankList();
                } else{
                    this.$message({
                        showClose: true,
                        message: '设置默认银行卡失败',
                        type: 'error'
                    });
                }
            })          
        },
        //添加银行卡成功
        getAddBank(){
            this.getBankList();
        },
        //添加新地址
        addAddress() {
            if(this.form.id){
                this.$refs.dialog.showDialogAddAddress({
                    id:this.form.id,
                    zipCode:this.form.addPost
                });
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },
        //监听成功添加新地址事件
        getAddress(data){
            //重新获取全部收货地址
            this.getAddressList();
        },
        //获取现有地址
        getAddressList() {
            this.loadingTableAddress = true;
            this.$axios({
                method:'get',
                url:"/apis/member/findAddAllByMCode",
                params: {
                    mCode:this.form.id,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.data.length!=0){
                    this.showRemoveAddress = true;
                    this.allAddressTable = [];
                    this.allAddressTable = response.data.data;
                    for(var i = 0; i < this.allAddressTable.length; i++){
                        this.allAddressTable[i].address = this.allAddressTable[i].addProvinceCode+"-"+this.allAddressTable[i].addCityCode+"-"+this.allAddressTable[i].addCountryCode+"-"+this.allAddressTable[i].addDetial;
                        this.allAddressTable[i].defaultAdd = this.allAddressTable[i].defaultAdd==0?"":"默认";
                    }
                } else{
                    //现有地址有空
                    this.allAddressTable = [];
                    this.showRemoveAddress = false;
                }
                setTimeout(()=>{
                    this.loadingTableAddress = false;
                },200)
            })  
        },
        //默认地址
        setDefaultAddress(data) {
            this.$axios({
                method:'post',
                url:"/apis/member/defAddByAIdAndMCode",
                params: {
                    aId:data.aId,
                    mCode:this.form.id,
                    defaultAdd:1
                }
            })
            .then(response=>{
                if(response.data.code){
                    //重新获取收货地址
                    this.getAddressList();
                } else{
                    this.$message({
                        showClose: true,
                        message: '设置默认地址失败',
                        type: 'error'
                    });
                }
            })    
        },
        //显示禁用所有已有地址弹出层
        onDialogRemoveAddress() {
            if(this.form.id){
                this.$confirm('禁用所有已有地址?', '提示', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning',
                    center: true
                }).then(() => {
                     this.onRemoveAddress();
                }).catch(() => {});
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },
        //禁用所有已有地址
        onRemoveAddress() {
            this.$axios({
                method:'get',
                url:"/apis/member/outAllAddByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: '禁用已有地址成功!',
                        type: 'success'
                    });
                    this.allAddressTable = [];
                    this.showRemoveAddress = false;
                    this.isChangeFrom = true;
                }else {
                    this.$message({
                        showClose: true,
                        message: '请求未响应!',
                        type: 'error'
                    });
                }
            }) 
        },
        //图片上传成功
        uploadSuccess(response) {
            if(response.code){
                this.form.file.push(response.data)
            }
            this.$message({
                showClose: true,
                message: '上传成功',
                type: 'success'
            });
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
            const fileSize = file.size / 1024 / 1024 <= 5;
            if(!fileType){
                this.$message({
                    showClose: true,
                    message: '只能上传png/JPG/bmp文件',
                    type: 'error'
                });
            }
            if(!fileSize){
                this.$message({
                    showClose: true,
                    message: '单张不超过5M',
                    type: 'error'
                });
            }
            return fileType && fileSize;
        }
    }
};
</script>

<style>
.wrap i.el-icon-plus{
    font-size: 32px;
    color: #c3c3c3;
}
.wrap .el-upload-dragger {
    width: 34px;
    height: 34px;
    line-height: 34px;
}
.wrap .el-upload--picture {
    width: 34px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #ccc;
}
.wrap .el-upload-list--picture .el-upload-list__item.is-success {
    display: inline-block;
    margin-right: 10px;
    padding:0;
    width:46px;
    height: 46px;
}
.wrap .el-upload-list--picture .el-upload-list__item.is-success img{
    width:100%;
    height: 100%;
    z-index: 0;
    margin: 0;
}
.wrap .el-upload-list__item .el-icon-close {
    right: -19px;
    top: -10px;
    opacity: 1;
    text-align: center;
    line-height: 36px;
    width: 46px;
    font-size: 12px;
    height: 26px;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
    color:#fff;
    background:red;
}
.wrap .el-upload-list__item .el-icon-close:before {
    transform: rotate(-45deg);
    display: inline-block;
}
.wrap .el-upload-list--picture .el-upload-list__item-status-label {
    right: -19px;
    top: -10px;
}
.wrap .el-upload-list--picture-card .el-upload-list__item-status-label i {
    transform: scale(0.8) rotate(-45deg);
}
.wrap .el-upload__tip {
    line-height: 20px;
    display: inline-block;
    margin-left: 10px;
}
.wrap .el-icon-close-tip{
    opacity: 0;
}
.wrap .area-select.medium {
    width: 100px;
    margin-top: 7px;
}
.wrap .area-select-wrap .area-selected-trigger{
  line-height: 28px;
  text-align: center;
  padding: 0;
}
.wrap .area-select:hover{
    border-color: #409EFF;
}
</style>
