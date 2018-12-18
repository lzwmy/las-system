<template>
    <div class="wrap">
        <el-form ref="form" :rules="rules" :model="formMember" label-width="90px" label-position="left">
            <!-- 推荐人信息 -->
            <div class="line">
                <span>推荐人信息</span>
                <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                    <el-form-item label="推荐人编号:" class="serch-input">
                        <el-input v-model="formSearch.id" placeholder="请输入关键搜索"></el-input>
                        <i class="el-icon-search" @click="onSearch(formSearch.id,'mCode')"></i>
                    </el-form-item>
                    <el-form-item label="推荐人昵称:" class="serch-input">
                        <el-input v-model="formSearch.nickname" placeholder="请输入关键搜索"></el-input>
                        <i class="el-icon-search" @click="onSearch(formSearch.nickname,'mNickname')"></i>
                    </el-form-item>
                    <el-form-item label="推荐人姓名:" class="serch-input">
                        <el-input v-model="formSearch.name" placeholder="请输入关键搜索"></el-input>
                        <i class="el-icon-search" @click="onSearch(formSearch.name,'mName')"></i>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 会员基本信息 -->
            <div class="line">
                <span>会员基本信息</span>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="会员姓名:" prop="name">
                            <el-input v-model="formMember.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-form-item label="昵称:" prop="nickname">
                            <el-input v-model="formMember.nickname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="证件类型:">
                            <el-select v-model="formMember.IDType" placeholder="请选择类型" prop="IDType">
                                <el-option label="居民身份证" value="1"></el-option>
                                <el-option label="护照" value="2"></el-option>
                                <el-option label="军官证" value="3"></el-option>
                                <el-option label="回乡证" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="1">
                        <el-form-item label="证件号码:" prop="IDNumber">
                            <el-input v-model="formMember.IDNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="性别:">
                            <el-radio-group v-model="formMember.sex">
                                <el-radio :label="0">男</el-radio>
                                <el-radio :label="1">女</el-radio>
                                <el-radio :label="-1">保密</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">
                        <el-form-item label="出生日期:">
                            <el-date-picker type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" v-model="formMember.date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="手机号码:" prop="tel">
                            <el-input v-model.number="formMember.tel"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="地址:" class="inline-block">
                            <div class="area">
                                <area-select type="text" :level="2" :placeholders="placeholders" v-model="formMember.address" :data="pcaa"></area-select>
                            </div>
                        </el-form-item>
                        <el-form-item v-model="formMember.detailed" label="详细地址:" class="text-center inline-block">
                            <el-input class="long-input"></el-input>
                        </el-form-item>
                        <el-form-item label="邮政编码:" prop="zipCode" class="text-center inline-block">
                            <el-input v-model.number="formMember.zipCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item label="Email:" prop="email">
                            <el-input v-model="formMember.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="微信号:" prop="email">
                            <el-input v-model="formMember.wechat"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="QQ号:" prop="email">
                            <el-input v-model="formMember.qq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4">
                        <el-form-item label="开户行:" prop="email">
                            <el-select v-model="formMember.accountType" placeholder="请选择开户行">
                                <el-option label="中国工商银行" value=""></el-option>
                                <el-option label="中国农业银行" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="分行:" prop="email" label-width="60px" style="text-align:center;">
                            <el-input v-model="formMember.accountName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="户名:" prop="email">
                            <el-input v-model="formMember.accountName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="账号:" prop="email">
                            <el-input v-model="formMember.accountNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 弹出层组件 -->
                <dialog-com ref="dialog" @searchData="getSearchData"></dialog-com>          
            </div>

            <!-- 购货订单 -->
            <div class="line">
                <span>购货订单</span>
                <el-table :data="GoodsData" border center>
                    <el-table-column prop="code" label="产品编码" width="90" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="number" label="数量" align="center">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="reduceBtn(scope.$index, scope.row)">-</el-button>
                            <span class="number-count">{{scope.row.number}}</span>
                            <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="addBtn(scope.$index, scope.row)">+</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="零售价" align="center">
                    </el-table-column>
                    <el-table-column prop="MPrice" label="会员价" align="center">
                    </el-table-column>
                    <el-table-column prop="money" label="金额" align="center">
                    </el-table-column>
                    <el-table-column prop="PV" label="PV" align="center">
                    </el-table-column>
                    <el-table-column prop="AllPv" label="总PV" align="center">
                    </el-table-column>
                </el-table>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="订单总汇:">{{formGoods.summary}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总数量:">{{formGoods.number}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总金额:">{{formGoods.sum}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总PV:">{{formGoods.sumPV}}</el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="发货方式:">
                            <el-radio-group v-model="formGoods.mode">
                                <el-radio :label="0">自提</el-radio>
                                <el-radio :label="1">快递</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="formGoods.mode==1">
                    <el-col :span="23" :offset="1">
                        <el-form-item class="inline-block">
                            <el-radio-group v-model="formGoods.otherAddress">
                                <el-radio :label="0">地址与上述地址相同</el-radio>
                                <el-radio :label="1">其它地址:</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="formGoods.otherAddress==1">
                            <el-form-item class="inline-block">
                                <div class="area">
                                    <area-select type="text" :level="2" :placeholders="placeholders" v-model="formGoods.address" :data="pcaa"></area-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="详细地址:" v-model="formGoods.detailed" class="inline-block">
                                <el-input class="long-input"></el-input>
                            </el-form-item>                                      
                        </template>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="收件人:" class="inline-block">
                            <el-input v-model="formGoods.name" class="inline-block"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系方式:" class="inline-block">
                            <el-input v-model="formGoods.contact" class="inline-block"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                

            </div>
            <!-- 下一步|取消  -->
            
            <el-row>
                <el-col :span="24">
                    <el-form-item class="btn-center block">
                        <el-button @click="resetForm">取消</el-button>
                            <el-button :offset="1" type="primary" @click="onSubmit('form')">下一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>


<script>
import util from "../../../util/util.js";
import { pca, pcaa } from "area-data";
export default {
    data() {
        return {
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa: pcaa,
            isdisabled:true,  //是否禁用确定按钮
            //推荐人信息
            formSearch: {
                id: "",
                nickname: "",
                name: ""
            },
            //储存推荐人列表数据
            formData:[],
            selectNum:"",  //选择推荐人
            //会员基本信息
            formMember: {
                id:"", //会员编号
                name: "张三", //姓名
                nickname: "小张", //昵称
                IDType: "居民身份证", //证件类型
                IDNumber: "12321321321321321", //证件号码
                sex: -1, //性别
                date: "", //出生日期
                tel: "18807258866", //手机号码
                address: [],
                detailed:"",
                zipCode: "125556", //邮编
                email: "12312321@163.com", //邮箱
                wechat: "981665165dsfds", //微信号
                qq: "123213", //qq号
                accountType: "中国工商银行", //开户行
                accountName: "张三", //户名
                accountNumber: "12321312" //账号
            },
            //商品信息
            formGoods:{
                summary:null,
                number:null,
                sum:null,
                sumPV:null,
                mode:0,
                otherAddress:0,
                address:[],
                detailed:"",
                name:"",
                contact:""
            },
            //表单验证规则
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入会员姓名",
                        trigger: "blur"
                    }
                ],
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" }
                ],
                IDType: [
                    {
                        required: true,
                        message: "请选择证件类型",
                        trigger: "blur"
                    }
                ],
                IDNumber: [
                    {
                        required: true,
                        message: "请输入证件号码",
                        trigger: "blur"
                    }
                ],
                tel: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "change"
                    },
                    {
                        type: "number",
                        message: "手机号必须为数字",
                        trigger: "change"
                    }
                ]
            },
            //订单
            GoodsData: [
                {
                    code: "V01001",
                    name: "VIP启动包一",
                    number: 1,
                    price: 380.003,
                    MPrice: 300.0,
                    money: 380.0,
                    PV: 0.0,
                    AllPv: 0.0
                },
                
            ],
        };
    },
    methods: {
        //取消表单
        resetForm() {            
        },
        //点击下一步提交表单
        onSubmit(form) {
            this.$refs[form].validate((valid) => {
                if(valid) {
                    //发货方式
                    if(this.formGoods.otherAddress==0){
                        this.formGoods.address[0] = this.formMember.address[0];
                        this.formGoods.address[1] = this.formMember.address[1];
                        this.formGoods.address[2] = this.formMember.address[2];
                        this.formGoods.detailed = this.formMember.detailed;
                    }
                    this.$request({
                        method:'post',
                        url:"/apis/memberAdd/addMember",
                        params: {
                            referrerCode:this.formSearch.id,
                            referrerNickName:this.formSearch.name,
                            referrerName:this.formSearch.nickname,
                            mName:this.formMember.name,
                            mNickName:this.formMember.nickname,
                            idType:parseInt(this.formMember.IDType),
                            idCode:this.formMember.IDNumber,
                            gender:this.formMember.sex,
                            birthdate:this.formMember.data,
                            mobile:this.formMember.tel,
                            province:this.formMember.address[0],
                            city:this.formMember.address[1],
                            country:this.formMember.address[2],
                            detial:this.formMember.detailed,
                            addPost:this.formMember.zipCode,
                            email:this.formMember.email,
                            weChat:this.formMember.wechat,
                            qq:this.formMember.qq,
                            bankCode:this.formMember.accountType,
                            accName:this.formMember.accountName,
                            accCode:this.formMember.accountNumber,

                            goodsCode:this.GoodsData[0].code,
                            goodsName:this.GoodsData[0].name,
                            number:this.GoodsData[0].number,
                            priceRetail:this.GoodsData[0].price,
                            priceVip:this.GoodsData[0].MPrice,
                            totalMoney:this.GoodsData[0].money,
                            pvPrice:this.GoodsData[0].PV,
                            totalPv:this.GoodsData[0].AllPv,
                            deliveryMethod:this.formGoods.mode,
                            consigneeProvince:this.formGoods.address[0],
                            consigneeCity:this.formGoods.address[1],
                            consigneeCountry:this.formGoods.address[2],
                            consigneeDetial:this.formGoods.detailed,
                            consigneeName:this.formGoods.name,
                            consigneeMobile:this.formGoods.contact,
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                           console.log(response)
                        } else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            }); 
                        }
                    })    
                    let routeData = this.$router.resolve({
                        path: "/addMemberForm",
                        query:{id:this.formMember.id}
                    });
                    window.open(routeData.href, '_blank');
                }else{
                    this.$message({
                        showClose: true,
                        message: '请输入必填信息!',
                        type: 'error'
                    }); 
                    return false;
                }
            })
        },
        //选中数据
        getCurrentRow(val) {
            this.selectNum = val;
            this.isdisabled = false;
        },
        //发送选中数据
        sendData() {
            this.searchUser = false;
            this.formSearch.name = this.formData[this.selectNum].mname;
            this.formSearch.nickname = this.formData[this.selectNum].mnickname;
        },
        //搜索推荐人信息
        onSearch(value,key) {
             this.$refs.dialog.onSearchDialog({
                value:value,
                key:key
             });         
        },
        //接收先中会员信息
        getSearchData(data) {
             this.formSearch.id = data.id;
             this.formSearch.name = data.mName;
             this.formSearch.nickname = data.mNickname;
        },
        //数量增加
        addBtn(index, items) {
            items.number++;
        },
        //数量减少
        reduceBtn(index, items) {
            if(items.number === 0) {
                return;
            }
            items.number--;
        },
    }
};
</script>

<style>
.line {
    width: 100%;
    position: relative;
    display: inline-block;
    border: 1px solid #888;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
}

.line > span {
    position: absolute;
    top: -10px;
    padding: 0 10px;
    background: #fff;
}
.serch-input .el-form-item__content {
    position: relative;
}
.serch-input .el-icon-search {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 18px;
    color: #666;
    cursor: pointer;
}
.el-icon-search:hover {
    color: #409eff;
}
.area-select.medium {
    width: 90px;
    margin-top: 7px;
}
.area .area-select-wrap .area-select {
    height: 28px;
}
.area-select-wrap .area-selected-trigger {
    line-height: 28px;
    text-align: center;
    padding: 0;
}
.text-center .el-form-item__label {
    text-align: center;
}

.number-count {
    padding: 0 10px;
}
.btn-center .el-form-item__content {
    display: flex;
    justify-content: space-around;
}
.wrap .el-button--primary.is-plain {
    height: 22px;
    line-height: 22px;
    padding: 0px 10px;
}
</style>
