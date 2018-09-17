<template>
    <div class="wrap">
        <!-- 推荐人信息 -->
        <div class="line">
            <span>推荐人信息</span>
            <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-form-item label="推荐人编号:" class="serch-input">
                    <el-input v-model="formSearch.id" placeholder="请输入关键搜索"></el-input>
                    <i class="el-icon-search" @click="searchCode"></i>
                </el-form-item>
                <el-form-item label="推荐人昵称:" class="serch-input">
                    <el-input v-model="formSearch.nickname" placeholder="请输入关键搜索"></el-input>
                    <i class="el-icon-search" @click="onSearch2"></i>
                </el-form-item>
                <el-form-item label="推荐人姓名:" class="serch-input">
                    <el-input v-model="formSearch.name" placeholder="请输入关键搜索"></el-input>
                    <i class="el-icon-search" @click="onSearch3"></i>
                </el-form-item>
            </el-form>
        </div>

        <!-- 会员基本信息 -->
        <div class="line">
            <span>会员基本信息</span>
            <el-form ref="form" :rules="rules" :model="formMember" label-width="90px" label-position="left">
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
                                <el-option label="居民身份证" value=""></el-option>
                                <el-option label="护照" value=""></el-option>
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
                                <el-radio label="男"></el-radio>
                                <el-radio label="女"></el-radio>
                                <el-radio label="保密"></el-radio>
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
                        <el-form-item v-model="formMember.address" label="详细地址:" class="text-center inline-block">
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
                    <el-col :span="7">
                        <el-form-item label="开户行:" prop="email">
                            <el-select v-model="formMember.accountType" placeholder="请选择开户行">
                                <el-option label="中国工商银行" value=""></el-option>
                                <el-option label="中国农业银行" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="户名:" prop="email">
                            <el-input v-model="formMember.accountName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="账号:" prop="email">
                            <el-input v-model="formMember.accountNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 弹出层组件 -->
                <dialog-com></dialog-com>

            </el-form>
        </div>

        <!-- 购货订单 -->
        <div class="line">
            <span>购货订单</span>
            <el-table :data="tableData" border center>
                <el-table-column prop="date" label="产品编码" width="90" align="center">
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

            <el-form :model="formSearch">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="订单总汇:">123</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总数量:">123</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总金额:">123</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总PV:">123</el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="发货方式:">
                            <el-radio-group v-model="formMember.sex">
                                <el-radio label="自提"></el-radio>
                                <el-radio label="快递"></el-radio>
                                <el-radio label="地址与上述地址相同"></el-radio>
                                <el-radio label="其它地址："></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <div class="area">
                                <area-select type="text" :level="2" :placeholders="placeholders" v-model="formMember.address" :data="pcaa"></area-select>
                            </div>
                        </el-form-item>                                      
                        <el-form-item label="详细地址:" class="text-center">
                            <el-input class="long-input"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <br/>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="收件人:" class="inline-block">
                            <el-input v-model="formSearch.id" class="inline-block"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系方式:" class="inline-block">
                            <el-input v-model="formSearch.nickname" class="inline-block"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

        </div>
        <!-- 下一步|取消  -->
        <el-form>
            <el-row>
                <el-col :span="24">
                    <el-form-item class="btn-center block">
                        <el-button @click="resetForm">取消</el-button>
                            <el-button :offset="1" type="primary" @click="onSubmit">下一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!-- 弹出搜索层 -->
        <el-dialog :visible.sync="searchUser" width="80%" center>
            <el-table 
                ref="multipleTable" 
                :data="formData" 
                tooltip-effect="dark" 
                border 
                size="mini"
                v-loading="loadingTable" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                 <el-table-column label="选择" type="" width="55">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="mcode" label="编号" width="90" align="center" sortable>                   
                </el-table-column>
                <el-table-column prop="mname" label="姓名" width="90" align="center">
                </el-table-column>
                <el-table-column prop="mnickname" label="昵称" align="center">
                </el-table-column>
                 <el-table-column prop="mid" label="推荐人编号" align="center" >
                </el-table-column>
                 <el-table-column prop="address" label="推荐人编昵称" align="center">
                </el-table-column>
                 <el-table-column prop="mobile" label="手机号码" align="center" width="140">
                </el-table-column>
                 <el-table-column prop="gender" label="性别" width="50" align="center">
                </el-table-column>
                 <el-table-column prop="" label="出生日期" align="center">
                </el-table-column> 
                <el-table-column prop="" label="加入日期" align="center">
                </el-table-column>
                <el-table-column prop="idType" label="加入期间" align="center">
                </el-table-column>
                <el-table-column prop="idType" label="级别" align="center">
                </el-table-column>
                <el-table-column prop="idType" label="状态" align="center" width="50">
                </el-table-column>
                <el-table-column prop="province" label="省" align="center">
                </el-table-column>
                <el-table-column prop="city" label="市" align="center">
                </el-table-column>
                <el-table-column prop="country" label="区县" align="center">
                </el-table-column>
                <el-table-column prop="detial" label="详细地址" align="center" width="200">
                </el-table-column>
                <el-table-column prop="addPost" label="邮编" width="70" align="center">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="searchUser = false">取 消</el-button>
                <el-button type="primary" size="mini" :disabled="isdisabled" @click="sendData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 弹出层组件 -->
        <dialog-com></dialog-com>


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
            searchUser: false,  //是否显示搜索用户层
            isdisabled:true,  //是否禁用确定按钮
            loadingTable:true, //加载列表
            radio:"",
            //搜索会员表单
            searchFrom:{
                mCode:"",
                mName:"",
                mobile:"",
                mNickname:""
            },
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
                sex: "保密", //性别
                date: "1990-12-12",
                tel: "18807258866", //手机号码
                address: [],
                zipCode: "125556", //邮编
                email: "12312321@163.com", //邮箱
                wechat: "981665165dsfds", //微信号
                qq: "123213", //qq号
                accountType: "中国工商银行", //开户行
                accountName: "张三", //户名
                accountNumber: "12321312" //账号
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
            tableData: [
                {
                    date: "V01001",
                    name: "VIP启动包一",
                    number: 1,
                    price: 380.003,
                    MPrice: 300.0,
                    money: 380.0,
                    PV: 0.0,
                    AllPv: 0.0
                },
                {
                    date: "V01001",
                    name: "VIP启动包一",
                    number: 1,
                    price: 380.0,
                    MPrice: 300.0,
                    money: 380.0,
                    PV: 0.0,
                    AllPv: 0.0
                }
            ],
        };
    },
    methods: {
        //取消表单
        resetForm() {            
        },
        //点击下一步提交表单
        onSubmit() {
            let routeData = this.$router.resolve({
                path: "/addMemberList",
                query:{id:this.formMember.id}
            });
            window.open(routeData.href, '_blank');
        },
        //搜索推荐人编号
        searchCode() {
            //向后台请求用户列表
            this.$axios.get("/apis/member/findByMCode", {
                params:{
                    mCode:this.formSearch.id,
                }
            })
            .then(response=>{
                if(!response.data.data){
                    //推荐人编号未找到，触发自定义弹出层事件
                    util.$emit("userDefined","未搜到推荐人编号，请确认后重试123s")
                }else {
                    this.formData.push(response.data.data);
                    this.searchUser = true;    
                    this.loadingTable = false;
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
        //搜索推荐人昵称
        onSearch2() {
            this.searchUser = true;
        },
        //搜索推荐人姓名
        onSearch3() {
            this.searchUser = true;
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
.el-form--inline .el-form-item {
    margin-bottom: 0;
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
