<template>
    <el-form ref="form" :rules="rules"  :model="form" label-width="100px" label-position="left">

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
                <el-form-item label="修改后姓名">
                    <el-input v-model="form.changeName" @change="changeForm"></el-input>
                </el-form-item>
            </el-col>        
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="身份类型">
                    <el-select v-model="form.IDType" placeholder="请选择" @change="changeForm">
                        <el-option label="居民身份证" value="居民身份证"></el-option>
                        <el-option label="护照" value="护照"></el-option>
                        <el-option label="军官照" value="军官照"></el-option>
                        <el-option label="港澳台回乡证" value="港澳台回乡证"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="证件号码">
                    <el-input v-model="form.IDNumber" @change="changeForm"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20">
                <el-form-item label="证明材料">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                      :file-list="form.proofMaterial" 
                      @change="changeForm">
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
                    <el-input v-model="form.changeNickname" @change="changeForm"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="修改手机号">
                    <el-input v-model="form.changeMobile" @change="changeForm"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="16">
                <el-form-item label="银行卡操作">
                    <el-button type="text" @click="addBank">添加新银行卡</el-button>
                    <el-button type="text" @click="onDialogRemoveBank" v-show="showRemoveBank">禁用所有已绑定银行卡</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="银行卡列表">
                    <el-table  border size="mini" :data="allBankTable">
                        <el-table-column prop="bankCode" label="银行名称" align="center" width="160px">
                        </el-table-column>
                        <el-table-column prop="accCode" label="卡号" align="center"> 
                        </el-table-column>
                        <el-table-column prop="accName" label="账户名" align="center" width="100px">
                        </el-table-column>
                        <el-table-column prop="accType" label="类型" align="center" width="80px">
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="16">
                <el-form-item label="现有地址列表">
                    <el-button type="text" @click="onDialogAddress">查看列表</el-button>
                    <el-button type="text" @click="onDialogRemoveAddress" v-show="showRemoveAddress">禁用所有已有地址</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="添加地址" class="inline-block" prop="addAddress">
                    <div class="area">
                        <area-select type="text" @change="changeForm" :level="2" :placeholders="placeholders" v-model="form.addAddress" :data="pcaa"></area-select>
                    </div>
                </el-form-item>
                <el-form-item  label="详细地址" label-width="100px" class="text-center inline-block" prop="detial">
                    <el-input class="long-input" v-model="form.detial"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="备注" prop="remarks">
                    <el-input @change="changeForm" v-model="form.remarks" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" size="mini" @click="onSubmit('form')" :loading="submitLoading">提交审核</el-button>
        </el-form-item>

        <dialog-com></dialog-com>


        <!-- 查看现有地址列表弹出层 -->
        <el-dialog title="现有地址列表" :visible.sync="dialogAddressList" width="550px" center>
            <el-table  border size="mini" :data="allAddressTable">
                <el-table-column label="地址" align="center" type="index" width="60">
                </el-table-column>
                <el-table-column prop="address" label="地址列表" align="center"> 
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 禁用所有已有地址 -->
        <el-dialog title="提示" :visible.sync="dialogRemoveAddress" width="300px" center>
            <p class="text-center">是否禁用所有已有地址！</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="dialogRemoveAddress = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="onRemoveAddress">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 禁用所有已绑定银行卡弹出层 -->
        <el-dialog title="提示" :visible.sync="dialogRemoveBank" width="300px" center>
            <p class="text-center">是否禁用所有已绑定银行卡！</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="dialogRemoveBank = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="onRemoveBank">确 定</el-button>
            </span>
        </el-dialog>

    </el-form>
</template>


<script>
import util from "../../../util/util.js";
import { pca, pcaa } from "area-data";
export default {
    data() {
        return {
            isChangeFrom:false,  //判断用户是否修改表单
            submitLoading:false,  //提交loading
            dialogBankList: false,  //是否显示银行卡列表弹出层
            dialogRemoveBank: false, //是否禁用所有已绑定银行卡弹出层
            dialogAddressList:false,  //是否显示现有地址列表弹出层
            dialogRemoveAddress:false,  //是否禁用所有已有地址弹出层
            showRemoveBank: false, //是否禁用所有已绑定银行卡按钮
            showRemoveAddress: false, //是否禁用所有已有地址按钮
            showArea:true,
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
                    type:""
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
                IDType:"居民身份证",  //证件类型
                IDNumber:"",  //证件号码
                proofMaterial:[ //证明材料
                    {
                        name: 'food.jpeg',
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                    {
                        name: 'food2.jpeg', 
                        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                    }
                ],
                changeNickname:"",  //修改昵称
                changeMobile:"",  //修改手机号码
                addAddress:[],  //添加地址
                detial:"", //详细地址
                remarks:"",  //备注

            },
            //表单验证规则
            rules: {
                addAddress: [
                    { required: true, message: "请输入地址", trigger: ['blur','change'] },
                ],
                detial: [
                    { required: true, message: "请输入详细地址", trigger: ['blur','change'] },
                ],
                remarks: [
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
            }else if(!this.isChangeFrom){
                this.$message({
                    showClose: true,
                    message: '该信息已存在，请匆重复提交!',
                    type: 'error'
                }); 
            }else{
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        //转换身份类型为数字
                        switch(this.form.IDType){
                            case "居民身份证": 
                                this.form.IDType = 1 ;
                                break;
                            case "护照": 
                                this.form.IDType = 2 ;
                                break;
                            case "军官证": 
                                this.form.IDType = 3 ;
                                break;
                            case "港澳台回乡证": 
                                this.form.IDType = 4 ;
                                break;
                            case "其它": 
                                this.form.IDType = 5 ;
                                break;
                        }
                        this.submitLoading = true;
                        this.$axios({
                            method:'post',
                            url:"/apis/member/updateIdByMCodeAndMName",
                            params: {
                                mCode:this.form.id,
                                mName:this.form.name,
                                newMName:this.form.nickname,
                                idType: this.form.IDType,
                                idCode: this.form.IDNumber,
                                mNickname: this.form.nickname,
                                mobile: this.form.mobile,
                                province: this.form.addAddress[0],
                                city: this.form.addAddress[1],
                                country: this.form.addAddress[2],
                                detial: this.form.detial,
                                mDesc:this.form.remarks
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                util.$emit("userDefined","修改成功,等待审核!");
                                this.submitLoading = false;
                                this.isChangeFrom = false;
                            } else{
                                util.$emit("userDefined","提交失败!")
                                this.submitLoading = false;
                            }
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
            util.$emit("searchdialog");  
            this.showArea = false;  
            setTimeout(()=>{
                this.showArea = true;  
            },200)
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
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.form.arrearsBalance = response.data.data.bonusBlance;
                    this.form.accountState = response.data.data.bonusStatus;
                    this.form.bonusPointsBalance = response.data.data.bonusBlance;
                    this.form.shoppingBalance = response.data.data.bonusBlance;
                    this.form.replacementBalance = response.data.data.redemptionBlance;
                    this.isChangeFrom = false;
                } else{
                    util.$emit("userDefined","获取会员账户信息失败!")
                }
            })    
        },
        //获取银行卡列表
        getBankList() {
            this.$axios({
                method:'get',
                url:"/apis/member/findMBankByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.data.memberBank.length != 0){
                    this.showRemoveBank = true; 
                    this.allBankTable = response.data.data.memberBank;
                }else {
                    this.showRemoveBank = false; 
                }
            }) 
        },
        //显示禁用所有银行卡弹出层
        onDialogRemoveBank() {
            if(this.form.id){
                this.dialogRemoveBank = true;
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
                this.dialogRemoveBank = false;
            }) 
        },
        //添加银行卡
        addBank() {
            if(this.form.id){
                util.$emit("DialogBank",this.form.id);
                this.isChangeFrom = true;
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },

        //显示地址列表弹出层
        onDialogAddress() {
            if(this.form.id){
                this.dialogAddressList = true;
                this.getAddressList();
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },
        //获取现有地址
        getAddressList() {
            this.$axios({
                method:'get',
                url:"/apis/member/findAddAllByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.data.length!=0){
                    this.showRemoveAddress = true;
                    this.allAddressTable = [];
                    for(var i = 0; i < response.data.data.length; i++){
                        let obj = {
                            address:response.data.data[i].addProvinceCode+"-"+response.data.data[i].addCityCode+"-"+response.data.data[i].addCountryCode+"-"+response.data.data[i].addDetial
                        }
                        this.allAddressTable.push(obj);
                    }
                } else{
                    //现有地址有空
                    this.allAddressTable = [];
                    this.showRemoveAddress = false;
                }
            })  
        },
        //显示禁用所有已有地址弹出层
        onDialogRemoveAddress() {
            if(this.form.id){
                this.dialogRemoveAddress = true;
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
                    this.dialogRemoveAddress = false;
                    this.showRemoveAddress = false;
                    this.isChangeFrom = true;
                }else {
                    this.$message({
                        showClose: true,
                        message: '请求未响应!',
                        type: 'error'
                    });
                }
                this.DialogRemoveBank = false;
            }) 
        }
    },
    created() {   
        //接收选中会员信息
        util.$on("TabelData",(data)=>{
            this.form.id = data.mCode;
            this.form.name = data.mName;
            this.form.nickname = data.mNickname;
            this.form.joinData = data.creationData;
            this.form.memberStatu = data.idType;
            this.form.memberLevel = data.idType;
            this.form.mobile = data.mobile;
            this.getBankList();
            this.getAddressList();
            setTimeout(()=>{
                this.isChangeFrom = false;
            },500)
        });
        //添加银行卡成功
        util.$on("addBankSuccess",()=>{
            this.getBankList();
            this.isChangeFrom = true;
        });
    }
};
</script>

<style>
i.el-icon-plus{
    font-size: 32px;
    color: #c3c3c3;
}
.el-upload-dragger {
    width: 34px;
    height: 34px;
    line-height: 34px;
}
.el-upload--picture-card {
    width: 34px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #ccc;
}
.el-upload-list--picture-card .el-upload-list__item.is-success {
    width:36px;
    height: 36px;
}
.el-upload-list--picture-card .el-upload-list__item-status-label {
    right: -19px;
    top: -10px;
}
.el-upload-list--picture-card .el-upload-list__item-status-label i {
    transform: scale(0.8) rotate(-45deg);
}
.el-upload__tip {
    line-height: 20px;
}
.area-select.medium {
    width: 100px;
    margin-top: 7px;
}
.area-select-wrap .area-selected-trigger{
  line-height: 28px;
  text-align: center;
  padding: 0;
}
.area-select:hover{
    border-color: #409EFF;
}
</style>
