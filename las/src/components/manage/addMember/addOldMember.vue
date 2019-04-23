<template>
    <div class="wrap">
        <el-form ref="formMember" :rules="rules" :model="formMember" label-width="90px" label-position="left">
            <!-- 老会员登录 -->
            <div class="login" v-if="!oldMember.loginSuccess">
                <el-row type="flex" justify="center">
                    <el-col :span="6" :xs="8" :sm="8" :md="8" :lg="7" :xl="6">
                        <el-form-item label="老系统编号:" label-width="100px" class="serch-input">
                            <el-input v-model.trim="oldMember.mCode" ref="autoFocus" @keyup.enter.native="login"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="6" :xs="8" :sm="8" :md="8" :lg="7" :xl="6">    
                        <el-form-item label="二级密码:" label-width="100px" class="serch-input">
                            <el-input :type="oldMember.passwordType" v-model.trim="oldMember.mPassWord" @keyup.enter.native="login"></el-input>
                            <i class="el-icon-view" @click="onShowPW" ref="view" :class="oldMember.passwordType=='text'?'active':''"></i>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="6" :xs="8" :sm="8" :md="8" :lg="7" :xl="6"> 
                        <el-form-item class="btn-center block">
                            <el-button type="success" @click="login" :loading="loadingLogin">登 录</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            
            <!-- 老会员注册 -->
            <div class="info" v-if="oldMember.loginSuccess">
                <!-- 老系统账号信息 -->
                <div class="line demo-form-inline">
                    <span>老系统账号信息</span>
                    <el-row>
                        <el-col :span="6" :xs="8" :sm="8" :md="8" :lg="7" :xl="6">
                            <el-form-item label="老系统编号:" label-width="100px" class="serch-input" prop="oldCode">
                                <el-input v-model.trim="formMember.oldCode" placeholder="请输入关键搜索" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="1" :xs="7" :sm="7" :md="7" :lg="7" :xl="6">
                            <el-form-item label="老系统昵称:" label-width="100px" class="serch-input" prop="oldNickname">
                                <el-input v-model.trim="formMember.oldNickname" placeholder="请输入关键搜索" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="1" :xs="7" :sm="7" :md="7" :lg="7" :xl="6">
                            <el-form-item label="老系统会员状态:" label-width="130px" class="serch-input" prop="oldState">
                                <el-input v-model.trim="formMember.oldState" placeholder="请输入关键搜索" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <!-- 会员基本信息 -->
                <div class="line">
                    <span>会员基本信息</span>
                    <el-row>
                        <el-col :span="8" :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                            <el-form-item label="会员编号:" prop="mCode">
                                <el-input v-model.trim="formMember.mCode" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1"  :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                            <el-form-item label="会员昵称:" prop="nickname">
                                <el-input v-model.trim="formMember.nickname" @input="checkNickName"></el-input>
                                <div class="el-form-item__error">{{nickNameTip}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8" :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                            <el-form-item label="会员姓名:" prop="name">
                                <el-input v-model.trim="formMember.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1"  :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                            <el-form-item label="手机号码:" prop="tel">
                                <el-input v-model.trim="formMember.tel"  @input="checkTel" @keyup.native="inputNumber($event)"></el-input>
                                <div class="el-form-item__error">{{checkIdTel}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="证件类型:" prop="IDType">
                                <el-select v-model="formMember.IDType" placeholder="居民身份证">
                                    <el-option label="居民身份证" value="1"></el-option>
                                    <el-option label="护照" value="2"></el-option>
                                    <el-option label="军官证" value="3"></el-option>
                                    <el-option label="回乡证" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" :offset="1" :xs="11" :sm="11" :md="11" :lg="8" :xl="8">
                            <el-form-item label="证件号码:" prop="IDNumber">
                                <el-input v-model.trim="formMember.IDNumber" @input="checkId"></el-input>
                                <div class="el-form-item__error">{{checkIdTip}}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="地址:" class="inline-block">
                                <div class="area" v-if="addressReset">
                                    <area-select type="text" :level="2" :placeholders="placeholders" v-model="formMember.address1" :data="pcaa"></area-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="详细地址:" class="text-center inline-block">
                                <el-input v-model.trim="formMember.detailed1" class="long-input"></el-input>
                            </el-form-item>
                            <el-form-item label="邮政编码:" prop="zipCode" class="text-center inline-block">
                                <el-input v-model.number="formMember.zipCode" @keyup.native="inputNumber3($event)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <!-- <el-col :span="6">
                            <el-form-item label="当前会员级别:" label-width="100px">
                                <el-input v-model="formMember.level" disabled></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="6">
                            <el-form-item label="推荐人编号:">
                                <el-input v-model="formMember.sid" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="6" :offset="1">
                            <el-form-item label="推荐人昵称:">
                                <el-input v-model.number="formMember.snickname" disabled></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>

                    <!-- 弹出层组件 -->
                    <dialog-com ref="dialog" @searchData="getSearchData"></dialog-com>          
                </div>

                <!-- 购货订单 -->
                <div class="line" v-if="!isOpenShopStatus">
                    <span>购货订单</span>
                    <el-table :data="GoodsData" border center>
                        <el-table-column prop="goodsId" label="产品编码" align="center">
                        </el-table-column>
                        <el-table-column prop="goodsName" label="产品名称" align="center">
                        </el-table-column>
                        <el-table-column prop="goodsNum" label="数量" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primary" plain @click="reduceBtn(scope.$index, scope.row)">-</el-button>
                                <span class="number-count">{{scope.row.goodsNum}}</span>
                                <el-button size="mini" type="primary" plain @click="addBtn(scope.$index, scope.row)">+</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="零售价" align="center">
                            <template slot-scope="scope">
                                {{scope.row.marketPrice}}
                            </template>
                        </el-table-column>
                        <el-table-column label="会员价" align="center">
                            <template slot-scope="scope">
                                {{scope.row.vipPrice}}
                            </template>
                        </el-table-column>
                        <el-table-column label="金额" align="center">
                            <template slot-scope="scope">
                                {{(scope.row.goodsNum * scope.row.marketPrice).toFixed(2)}}
                            </template>
                        </el-table-column>
                        <el-table-column label="PV" align="center">
                            <template slot-scope="scope">
                                {{scope.row.ppv}}
                            </template>
                        </el-table-column>
                        <el-table-column label="总pv" align="center">
                            <template slot-scope="scope">
                                {{scope.row.goodsNum * scope.row.ppv}}
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
                                    <el-input class="long-input"  v-model.trim="formMember.detailed2"></el-input>
                                </el-form-item>                                      
                            </template>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="收件人:" class="inline-block" prop="reName">
                                <el-input v-model.trim="formMember.reName" class="inline-block"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系方式:" class="inline-block" prop="contact">
                                <el-input v-model.trim="formMember.contact" class="inline-block"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    

                </div>

                <!-- 下一步|取消  -->
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="btn-center block">
                            <el-button @click="oldMember.loginSuccess = false">返 回</el-button>
                                <el-button :offset="1" type="primary" :loading="loadingBtn" :disabled="isdisabled" @click="isdisabled?'':onSubmit('formMember')">下一步</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>


<script>
import { pca, pcaa } from "area-data";
export default {
    name:"addOldMember",
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
            loadingBtn:false,
            loadingLogin:false,
            selectNum:"",  //选择推荐人
            timer:null,
            //老会员登录
            oldMember:{
                mCode:"",
                mPassWord:"",
                passwordType:"password", //input type
                loginSuccess:false, //老员会登录状态
            },
            //会员基本信息
            formMember: {
                oldCode: "", //老会员编号
                oldNickname: "",    //老会员昵称
                oldState: "",       //老会员状态
                mCode:"", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                IDType: "1", //证件类型
                IDNumber: "", //证件号码
                tel: "", //手机号码
                address1: [],
                detailed1:"",
                zipCode: "", //邮编
                // level:"", //当前会员级别
                sid:"", //推荐人编号
                // snickname:"", //推荐人昵称

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
            addressReset:true, //重新渲染地址框
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
                IDNumber: [{required: true,message: "请输入证件号码",trigger: ['blur','change']}],
            },
            //订单
            isOpenShopStatus:false,  //开店状态
            GoodsData: [],
            //老系统会员状态 1.正常开店 0 临时 -1冻结  -2终止
            oldStatus:[
                {name:"正常开店",value:1},
                {name:"临时",value:0},
                {name:"冻结",value:-1},
                {name:"终止",value:-2},
            ]
        };
    },
    mounted(){
        this.$refs.autoFocus.focus();
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
        inputNumber(e){
            this.formMember.tel = e.target.value.replace(/[^\d]/g,'');
        },
        //限制input输入   
        inputNumber3(e){
            let val = e.target.value;
            let reg = new RegExp("^[0-9]*$");
            let isNumber = reg.test(val);
            if(val>6 && isNumber){
                this.formMember.zipCode = val.slice(0,6);
            }else{
                this.formMember.zipCode = val.replace(/[^\d]/g,'');
            }
        },
        //密码显示隐藏
        onShowPW(){
            if(this.oldMember.passwordType == "text"){
                this.oldMember.passwordType = "password";
            }else{
                this.oldMember.passwordType = "text";
            }
        },
        //老会员登录
        login(){
            if(!this.oldMember.mCode){
                this.$message({
                    showClose: true,
                    message: "请输入老系统编号",
                    type: 'info'
                }); 
                return;
            }
            if(!this.oldMember.mPassWord){
                this.$message({
                    showClose: true,
                    message: "请输入二级密码",
                    type: 'info'
                }); 
                return;
            }
            this.loadingLogin = true;
            this.$request({
                method:'post',
                url:"/apis/memberAdd/oldMemberCheck",
                params: {
                    raMCode:this.oldMember.mCode,
                    password:this.oldMember.mPassWord
                }                      
            })
            .then(response=>{
                if(response.data.code){
                    let data = response.data.data.OldSysRelation;
                    let sid = response.data.data.referees;
                    for (const item of this.oldStatus) {
                        if(data.oldStatus==item.value){
                            data.oldStatus = item.name;
                            break;
                        }
                    }
                    this.formMember.oldCode = data.oldMCode;
                    this.formMember.oldNickname = data.oldNickName;
                    this.formMember.oldState = data.oldStatus;
                    if(this.formMember.oldState=="正常开店"){
                        this.isOpenShopStatus = true;
                    }
                    this.formMember.mCode = data.newMCode;
                    // this.formMember.level = data.oldMCode;
                    this.formMember.sid = sid;
                    // this.formMember.snickname = data.oldMCode;
                    setTimeout(()=>{
                        this.oldMember.loginSuccess = true;
                    },400)
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    }); 
                }
                setTimeout(()=>{
                    this.loadingLogin = false;
                },400)
            })
            
        },
        //重置
        resetForm() { 
            this.getBootPack();
            this.addressReset = false;
            this.formMember = {
                oldCode: "", //老会员编号
                oldNickname: "",    //老会员昵称
                oldState: "",       //老会员状态
                mCode:"", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                IDType: "1", //证件类型
                IDNumber: "", //证件号码
                tel: "", //手机号码
                address1: [],
                detailed1:"",
                zipCode: "", //邮编
                // level:"", //当前会员级别
                sid:"", //推荐人编号
                // sNickname:"", //推荐人昵称

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
            setTimeout(()=>{
                this.addressReset = true;
            },30)
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
                        this.loadingBtn = true;
                        let _oldStatus;
                        for (const item of this.oldStatus) {
                            if(this.formMember.oldState == item.name){
                                _oldStatus = item.value;
                                break;
                            }
                        }
                        this.$request({
                            method:'post',
                            url:"/apis/memberAdd/addOldMember",
                            data: {
                                memberBasic:{
                                    mName:this.formMember.name,
                                    mNickname:this.formMember.nickname,
                                    idType:this.formMember.IDType.toString(),
                                    idCode:this.formMember.IDNumber,
                                    mobile:this.formMember.tel,
                                    province:this.formMember.address1.length?this.formMember.address1[0]:"",
                                    city:this.formMember.address1.length?this.formMember.address1[1]:"",
                                    country:this.formMember.address1.length?this.formMember.address1[2]:"",
                                    detial:this.formMember.detailed1,
                                    addPost:this.formMember.zipCode.toString(),
                                    oldMCode:this.formMember.oldCode,
                                    oldNickName:this.formMember.oldNickname,
                                    oldStatus: _oldStatus.toString(),
                                    newMCode:this.formMember.mCode,
                                },
                                memberAddress:{
                                    addProvinceCode:this.formMember.address2.length?this.formMember.address2[0]:"",
                                    addCityCode:this.formMember.address2.length?this.formMember.address2[1]:"",
                                    addCountryCode:this.formMember.address2.length?this.formMember.address2[2]:"",
                                    addDetial:this.formMember.detailed2,
                                    consigneeName:this.formMember.reName,
                                    consigneeMobile:this.formMember.contact,
                                },
                                memberRelation:{
                                    sponsorCode:this.formMember.sid,
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
                            setTimeout(()=>{
                                this.loadingBtn = false;
                            },400)
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
                            this.oldMember.loginSuccess = false;
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
            if(this.OrderSum ==1 || items.goodsNum == 0) {
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
        //获取启动包数据
        getBootPack(){
            let packID = ['6521658246569136128','6521658830655328256'];
            let arr = [];
            for(let i = 0, len = packID.length; i < len; i++){
                this.$request({
                    method:'post',
                    url:"/apis/member/findGoods",
                    params:{
                        id:packID[i],
                        goodsName:"",
                        currentPage:1,
                        pageSize:99,
                        wareCode:"20191228",
                        date:new Date().getTime()
                    }
                })     
                .then(response=>{
                    if(response.data.code){
                        let obj = {
                            goodsId: response.data.data.list[0].id,
                            goodsName: response.data.map.goodsName[0],
                            goodsNum: 1,
                            marketPrice: response.data.data.list[0].specRetailPrice.toFixed(2),
                            vipPrice: response.data.data.list[0].specMemberPrice.toFixed(2),
                            ppv: response.data.data.list[0].ppv
                        }
                        arr.push(obj);
                    }else{
                        this.$message({
                            showClose: true,
                            message: "启动包获取失败",
                            type: 'error'
                        });
                    }
                })
            }
            this.GoodsData = arr;
        }
    },
    created(){
        this.getBootPack();
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
.wrap .el-icon-view{
    position: absolute;
    top:38%;
    right:10px;
    cursor: pointer;
}
.wrap .el-icon-view.active{
    color:#02c1b3;
}

</style>
