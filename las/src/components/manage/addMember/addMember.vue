<template>
    <div class="wrap">
        <el-form ref="formMember" :rules="rules" :model="formMember" label-width="90px" label-position="left">
            <!-- 推荐人信息 -->
            <div class="line demo-form-inline">
                <span>推荐人信息</span>
                <el-row>
                    <el-col :span="6" :xs="8" :sm="8" :md="8" :lg="7" :xl="6">
                        <el-form-item label="推荐人编号:" label-width="100px" class="serch-input" prop="sid">
                            <el-input v-model="formMember.sid" placeholder="请输入关键搜索" disabled></el-input>
                            <i class="el-icon-search" @click="onSearch(formMember.sid,'mCode')"></i>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1" :xs="7" :sm="7" :md="7" :lg="7" :xl="6">
                        <el-form-item label="推荐人昵称:" label-width="100px" class="serch-input" prop="snickname">
                            <el-input v-model="formMember.snickname" placeholder="请输入关键搜索" disabled></el-input>
                            <i class="el-icon-search" @click="onSearch(formMember.nickname,'mNickname')"></i>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1" :xs="7" :sm="7" :md="7" :lg="7" :xl="6">
                        <el-form-item label="推荐人姓名:" label-width="100px" class="serch-input" prop="sname">
                            <el-input v-model="formMember.sname" placeholder="请输入关键搜索" disabled></el-input>
                            <i class="el-icon-search" @click="onSearch(formMember.name,'mName')"></i>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>

            <!-- 会员基本信息 -->
            <div class="line">
                <span>会员基本信息</span>
                <el-row>
                    <el-col :span="8" :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                        <el-form-item label="会员姓名:" prop="name">
                            <el-input v-model="formMember.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="1"  :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                        <el-form-item label="昵称:" prop="nickname">
                            <el-input v-model="formMember.nickname" @input="checkNickName"></el-input>
                            <div class="el-form-item__error">{{nickNameTip}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="证件类型:">
                            <el-select v-model="formMember.IDType" placeholder="请选择类型">
                                <el-option label="居民身份证" value="1"></el-option>
                                <el-option label="护照" value="2"></el-option>
                                <el-option label="军官证" value="3"></el-option>
                                <el-option label="回乡证" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset="1" :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                        <el-form-item label="证件号码:">
                            <el-input v-model="formMember.IDNumber" @input="checkId"></el-input>
                            <div class="el-form-item__error">{{checkIdTip}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6" :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
                        <el-form-item label="性别:">
                            <el-radio-group v-model="formMember.sex">
                                <el-radio :label="0">男</el-radio>
                                <el-radio :label="1">女</el-radio>
                                <el-radio :label="-1">保密</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="出生日期:">
                            <el-date-picker type="date" placeholder="选择日期"  value-format="yyyy-MM-dd" v-model="formMember.date"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="手机号码:" prop="tel">
                            <el-input v-model.number="formMember.tel"  @input="checkTel" @keyup.native="inputNumber1($event)"></el-input>
                            <div class="el-form-item__error">{{checkIdTel}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="地址:" class="inline-block" prop="address1">
                            <div class="area">
                                <area-select type="text" :level="2" :placeholders="placeholders" v-model="formMember.address1" :data="pcaa"></area-select>
                            </div>
                        </el-form-item>
                        <el-form-item label="详细地址:" class="text-center inline-block" prop="detailed1">
                            <el-input v-model="formMember.detailed1" class="long-input"></el-input>
                        </el-form-item>
                        <el-form-item label="邮政编码:" prop="zipCode" class="text-center inline-block">
                            <el-input v-model.number="formMember.zipCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item label="Email:">
                            <el-input v-model="formMember.email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="微信号:">
                            <el-input v-model="formMember.wechat"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset="1">
                        <el-form-item label="QQ号:">
                            <el-input v-model.number="formMember.qq" @keyup.native="inputNumber2($event)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="4">
                        <el-form-item label="开户行:">
                            <el-select v-model="formMember.accountType" placeholder="请选择开户行">
                                <el-option label="中国工商银行" value="中国工商银行"></el-option>
                                <el-option label="中国农业银行" value="中国农业银行"></el-option>
                                <el-option label="中国建设银行" value="中国建设银行"></el-option>
                                <el-option label="中国银行" value="中国银行"></el-option>
                                <el-option label="招商银行" value="招商银行"></el-option>
                                <el-option label="中国民生银行" value="中国民生银行"></el-option>
                                <el-option label="中信银行" value="中信银行"></el-option>
                                <el-option label="交通银行" value="交通银行"></el-option>
                                <el-option label="兴业银行" value="兴业银行"></el-option>
                                <el-option label="上海浦东发展银行" value="上海浦东发展银行"></el-option>
                                <el-option label="华夏银行" value="华夏银行"></el-option>
                                <el-option label="深圳发展银行" value="深圳发展银行"></el-option>
                                <el-option label="广东发展银行" value="广东发展银行"></el-option>
                                <el-option label="中国邮政储蓄银行" value="中国邮政储蓄银行"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="分行:" label-width="45px" style="margin-left:5px;">
                            <el-input v-model="formMember.accountTypeDetailed"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="户名:">
                            <el-input v-model="formMember.accountName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="账号:">
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
                    <el-table-column prop="goodsId" label="产品编码" width="90" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsNum" label="数量" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" :disabled="scope.row.goodsNum==1" type="primary" plain @click="reduceBtn(scope.$index, scope.row)">-</el-button>
                            <span class="number-count">{{scope.row.goodsNum}}</span>
                            <el-button size="mini" type="primary" plain @click="addBtn(scope.$index, scope.row)">+</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="零售价" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.marketPrice).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="会员价" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.vipPrice).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.goodsNum * scope.row.marketPrice).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="PV" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.ppv).toFixed(2)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="总pv" align="center">
                        <template slot-scope="scope">
                            {{(scope.row.goodsNum * scope.row.ppv).toFixed(2)}}
                        </template>
                    </el-table-column>
                </el-table>

                <el-row>
                    <el-col :span="5" :offset="1">
                        <el-form-item label="订单汇总:"></el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总数量:">{{OrderSum}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总金额:">{{OrderPrice.toFixed(2)}}</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="总PV:">{{OrderPV.toFixed(2)}}</el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="发货方式:">
                            <el-radio-group v-model="formMember.mode">
                                <el-radio :label="0">自提</el-radio>
                                <el-radio :label="1">快递</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="formMember.mode=='1'">
                    <el-col :span="23" :offset="1">
                        <el-form-item class="inline-block">
                            <el-radio-group v-model="formMember.otherAddress">
                                <el-radio :label="0" :disabled="formMember.address1.length==0">地址与上述地址相同</el-radio>
                                <el-radio :label="1">其它地址:</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <template v-if="formMember.otherAddress==1">
                            <el-form-item class="inline-block" :prop="formMember.otherAddress==1?'address2':''">
                                <div class="area">
                                    <area-select type="text" :level="2" :placeholders="placeholders" v-model="formMember.address2" :data="pcaa"></area-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="详细地址:" class="inline-block" :prop="formMember.otherAddress==1?'detailed2':''">
                                <el-input class="long-input"  v-model="formMember.detailed2"></el-input>
                            </el-form-item>                                      
                        </template>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="收件人:" class="inline-block" prop="reName">
                            <el-input v-model="formMember.reName" class="inline-block"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系方式:" class="inline-block" prop="contact">
                            <el-input v-model="formMember.contact" class="inline-block"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                

            </div>
            <!-- 下一步|取消  -->
            
            <el-row>
                <el-col :span="24">
                    <el-form-item class="btn-center block">
                        <el-button @click="resetForm">重 置</el-button>
                            <el-button :offset="1" type="primary" :disabled="isdisabled" @click="onSubmit('formMember')">下一步</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>


<script>
import { pca, pcaa } from "area-data";
export default {
    name:"addMember",
    data() {
        //手机号
        let validateTel = (rule, value, callback) => {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            let isRight = reg.test(value);
            if(value==null || value==""){
                callback(new Error('请输入手机号码'));
            }else if(!isRight ) {
                callback(new Error('手机号码格式不正确'));
            } else {
                callback();
            }
        };
        return {
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa: pcaa,
            isdisabled:true,  //是否禁用确定按钮
            selectNum:"",  //选择推荐人
            timer:null,
            //会员基本信息
            formMember: {
                sid: "",
                snickname: "",
                sname: "",
                mCode:"", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                IDType: "1", //证件类型
                IDNumber: "", //证件号码
                sex: -1, //性别
                date: "", //出生日期
                tel: "", //手机号码
                address1: [],
                detailed1:"",
                zipCode: "", //邮编
                email: "", //邮箱
                wechat: "", //微信号
                qq: "", //qq号
                accountType: "", //开户行
                accountTypeDetailed: "", //开户行分行
                accountName: "", //户名
                accountNumber: "", //账号

                summary:null,
                number:null,
                sum:null,
                sumPV:null,
                mode:0,
                otherAddress:0,
                address2:[],
                detailed2:"",
                reName:"",
                contact:""
            },
            nickNameTip:"", //昵称存在时错误提示
            checkIdTip:"",  //证件号是否存在提示
            checkIdTel:"",  //手机号是否存在提示1
            //表单验证规则
            rules: {
                sid: [{required: true,message: "请输入推荐人编号",trigger: ['blur','change']}],
                name: [{required: true,message: "请输入会员姓名",trigger: ['blur','change']}],
                sname: [{required: true,message: "请输入推荐人姓名",trigger: ['blur','change']}],
                nickname: [{ required: true, message: "请输入请输入昵称", trigger: ['blur','change']}],
                snickname: [{ required: true, message: "请输入推荐人昵称", trigger: ['blur','change']}],
                tel: [{required: true,validator: validateTel,trigger: ['blur','change']}],
                address1: [{required: true,message: "选择地址",trigger: ['blur','change']}],
                address2: [{required: true,message: "选择收货地址",trigger: ['blur','change']}],
                detailed1: [{required: true,message: "选择输入详细地址",trigger: ['blur','change']}],
                detailed2: [{required: true,message: "选择输入详细地址",trigger: ['blur','change']}],
                reName: [{required: true,message: "请输入收件人姓名",trigger: ['blur','change']}],
                contact: [{required: true,validator: validateTel,trigger: ['blur','change']}],
            },
            //订单
            GoodsData: [
                {
                    goodsId: "2000001",
                    goodsName: "VIP启动包一",
                    goodsNum: 1,
                    marketPrice: 380.00,
                    vipPrice: 300.00,
                    ppv: 100.00
                },
                {
                    goodsId: "2000002",
                    goodsName: "VIP启动包二",
                    goodsNum: 1,
                    marketPrice: 380.00,
                    vipPrice: 300.00,
                    ppv: 100.00
                },
                
            ],
        };
    },
    computed: {
        //总数量 
        OrderSum:function(){
            let sum = 0;
            for(let i = 0; i < this.GoodsData.length; i++){
                sum += parseInt(this.GoodsData[i].goodsNum);
            }
            return sum;
        },
        //总金额
        OrderPrice:function(){
            let sum = 0;
            for(let i = 0; i < this.GoodsData.length; i++){
                sum += this.GoodsData[i].marketPrice * this.GoodsData[i].goodsNum;
            }
            return sum ;
        },
        //总PV
        OrderPV:function(){
            let sum = 0;
            for(let i = 0; i < this.GoodsData.length; i++){
                sum += this.GoodsData[i].ppv * this.GoodsData[i].goodsNum;
            }
            return sum;
        },
    },
    methods: {
        //限制input输入   
        inputNumber1(e){
            this.formMember.tel = e.target.value.replace(/[^\d]/g,'');
        },
        inputNumber2(e){
            this.formMember.qq = e.target.value.replace(/[^\d]/g,'');
        },
        //重置
        resetForm() { 
            this.formMember = {
                sid: "",
                snickname: "",
                sname: "",
                mCode:"", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                IDType: "1", //证件类型
                IDNumber: "", //证件号码
                sex: -1, //性别
                date: "", //出生日期
                tel: "", //手机号码
                address1: [],
                detailed1:"",
                zipCode: "", //邮编
                email: "", //邮箱
                wechat: "", //微信号
                qq: "", //qq号
                accountType: "", //开户行
                accountTypeDetailed: "", //开户行分行
                accountName: "", //户名
                accountNumber: "", //账号

                summary:null,
                number:null,
                sum:null,
                sumPV:null,
                mode:0,
                otherAddress:0,
                address2:[],
                detailed2:"",
                reName:"",
                contact:""
            },
            this.GoodsData = [
                {
                    goodsId: "2000001",
                    goodsName: "VIP启动包一",
                    goodsNum: 1,
                    marketPrice: 380.05,
                    vipPrice: 300.05,
                    ppv: 100.00
                },
                {
                    goodsId: "2000002",
                    goodsName: "VIP启动包二",
                    goodsNum: 1,
                    marketPrice: 380.05,
                    vipPrice: 300.05,
                    ppv: 100.00
                },
                
            ] 
        },
        //点击下一步提交表单
        onSubmit(form) {                           
            this.$refs[form].validate((valid) => {
                if(valid) {
                    //发货方式
                    if(this.formMember.otherAddress==0){
                        this.formMember.address2[0] = this.formMember.address1[0];
                        this.formMember.address2[1] = this.formMember.address1[1];
                        this.formMember.address2[2] = this.formMember.address1[2];
                        this.formMember.detailed2 = this.formMember.detailed1;
                    }
                    for(let i = 0; i < this.GoodsData.length; i++){
                        this.GoodsData[i].goodsNum = this.GoodsData[i].goodsNum.toString();
                        this.GoodsData[i].marketPrice = this.GoodsData[i].marketPrice.toString();
                        this.GoodsData[i].vipPrice = this.GoodsData[i].vipPrice.toString();
                        this.GoodsData[i].ppv = this.GoodsData[i].ppv.toString();
                    }
                    new Promise((resolve,reject)=>{
                        this.$request({
                            method:'post',
                            url:"/apis/memberAdd/addMember",
                            contentType: "application/json; charset=utf-8",
                            data: {
                                memberBasic:{
                                    mName:this.formMember.name,
                                    mNickname:this.formMember.nickname,
                                    idType:this.formMember.IDType.toString(),
                                    idCode:this.formMember.IDNumber,
                                    gender:this.formMember.sex.toString(),
                                    birthdate:this.formMember.date,
                                    mobile:this.formMember.tel,
                                    province:this.formMember.address1.length?this.formMember.address1[0]:"",
                                    city:this.formMember.address1.length?this.formMember.address1[1]:"",
                                    country:this.formMember.address1.length?this.formMember.address1[2]:"",
                                    detial:this.formMember.detailed1,
                                    addPost:this.formMember.zipCode,
                                    email:this.formMember.email,
                                    weChat:this.formMember.wechat,
                                    qq:this.formMember.qq
                                },
                                memberAddress:{
                                    addProvinceCode:this.formMember.address2.length?this.formMember.address2[0]:"",
                                    addCityCode:this.formMember.address2.length?this.formMember.address2[1]:"",
                                    addCountryCode:this.formMember.address2.length?this.formMember.address2[2]:"",
                                    addDetial:this.formMember.detailed2,
                                    mobile:this.formMember.contact,
                                    consigneeName:this.formMember.reName
                                },
                                memberRelation:{
                                    sponsorCode:this.formMember.sid,
                                    sponsorNickName:this.formMember.sname,
                                    sponsorName:this.formMember.snickname
                                },
                                memberBank:{
                                    bankCode:this.formMember.accountType,
                                    accName:this.formMember.accountName,
                                    accCode:this.formMember.accountNumber,
                                    bankDetail:this.formMember.accountTypeDetailed
                                },
                                orders:JSON.stringify(this.GoodsData),
                                deliveryMethod:this.formMember.mode.toString()
                            }                      
                        })
                        .then(response=>{
                            if(response.data.code){
                                this.formMember.mCode = response.data.data;
                                this.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'success'
                                }); 
                                resolve();
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'error'
                                }); 
                            }
                        })
                    }) 
                    .then(()=>{
                        clearTimeout(this.timer);
                        this.timer =  setTimeout(()=>{
                            let routeData = this.$router.push({
                                name: "addMemberForm",
                                params:{
                                    formMember:JSON.stringify(this.formMember),
                                    GoodsData:JSON.stringify(this.GoodsData),
                                    deliveryMethod:this.formMember.mode
                                }
                            });
                            this.resetForm();
                        },800)  
                    })
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
        //搜索推荐人信息
        onSearch(value,key) {
             this.$refs.dialog.onSearchDialog({
                value:value,
                key:key
             });         
        },
        //接收选中会员信息
        getSearchData(data) {
             this.formMember.sid = data.mCode;
             this.formMember.sname = data.mName;
             this.formMember.snickname = data.mNickname;
        },
        //数量增加
        addBtn(index, items) {
            items.goodsNum++;
            this.GoodsData[index].AllPv = items.goodsNum * this.GoodsData[index].ppv;
        },
        //数量减少
        reduceBtn(index, items) {
            if(items.goodsNum == 1) {
                return;
            }
            items.goodsNum--;
            this.GoodsData[index].AllPv = items.goodsNum * this.GoodsData[index].ppv;
        },
        //验证昵称是否存在
        checkNickName(){
            if(this.formMember.nickname !=""){
                this.$request({
                    method:'get',
                    url:"/apis/memberAdd/checkNickName",
                    params: {
                        mNickName:this.formMember.nickname,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.nickNameTip = "";
                        this.isdisabled = false;
                    }else{
                        this.nickNameTip = response.data.msg;
                        this.isdisabled = true;
                    }
                })
            }else{
                this.nickNameTip = "";
            }
        },
        //验证证件号是否存在
        checkId(){
            if(this.formMember.IDNumber !=""){
                this.$request({
                    method:'get',
                    url:"/apis/memberAdd/checkId",
                    params: {
                        idType:this.formMember.IDType,
                        idCode:this.formMember.IDNumber,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.checkIdTip = "";
                        this.isdisabled = false;
                    }else{
                        this.checkIdTip = response.data.msg;
                        this.isdisabled = true;
                    }
                })
            }else{
                this.checkIdTip = "";
                this.isdisabled = true;
            }
        },
        //验证手机号是否存在
        checkTel(){
            if(this.formMember.tel !=""){
                this.$request({
                    method:'get',
                    url:"/apis/memberAdd/checkPhone",
                    params: {
                        mobile:this.formMember.tel,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(response.data.code || response.data.msg=="请输入正确格式的手机号码"){
                        this.checkIdTel = "";
                        this.isdisabled = false;
                    }else{
                        this.checkIdTel = response.data.msg;
                        this.isdisabled = true;
                    }
                })
            }else{
                this.checkIdTel = "";
            }
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
