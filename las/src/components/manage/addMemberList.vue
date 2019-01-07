<template>
    <el-form  :model="form" label-width="80px" label-position="left">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="下单时间">
                    <el-date-picker 
                        v-model="form.time" 
                        type="daterange" 
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions"
                        @change="onChangeDate">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" :xs="8" :sm="8" :md="8" :lg="6" :xl="5">
                <el-form-item label="会员姓名">
                    <el-input v-model="form.name" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查询</el-button>
                <el-button @click="exportExcel('#memberTable','新增会员列表')" icon="el-icon-download">导出</el-button>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="5" :xs="10" :sm="10" :md="10" :lg="6" :xl="5">
                <el-form-item label="手机号">
                    <el-input v-model.number="form.tel" @keyup.native="inputNumber($event)" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2" :xs="10" :sm="10" :md="10" :lg="6" :xl="5">
                <el-form-item label="订单状态">
                    <el-select v-model="form.state" placeholder="-1" >
                        <el-option label="全部" value="-1"></el-option>
                        <el-option label="待付款" value="0"></el-option>
                        <el-option label="已付款" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>          

        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="orderSn" label="订单号" align="center" min-width="180px">
                    </el-table-column>
                    <el-table-column prop="buyerId" label="会员编号" align="center" min-width="160px">
                    </el-table-column>
                    <el-table-column prop="buyerName" label="会员姓名" align="center" min-width="100px"> 
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称" align="center" min-width="80px">
                    </el-table-column>
                    <el-table-column prop="sponsorCode" label="推荐人编号" align="center" min-width="90px">
                    </el-table-column>
                    <el-table-column prop="sponsorName" label="推荐人姓名" align="center" min-width="90px">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号码" align="center" min-width="100px">
                    </el-table-column>
                    <el-table-column prop="orderTotalPrice" label="订单金额" align="center" min-width="100px">
                    </el-table-column>
                    <el-table-column prop="shippingFee" label="运费" align="center">
                    </el-table-column>
                    <el-table-column prop="ppv" label="订单总PV值" align="center" min-width="100px">
                    </el-table-column>
                    <el-table-column prop="pointRmbNum" label="购物积分支付" align="center" min-width="110px">
                    </el-table-column>
                    <el-table-column prop="orderAmount" label="实付金额" align="center">
                    </el-table-column>
                    <el-table-column prop="orderType" label="订单类型" align="center" min-width="120">
                    </el-table-column>
                    <el-table-column prop="orderState" label="订单状态" align="center">
                    </el-table-column>
                    <el-table-column prop="paymentName" label="支付方式" align="center" min-width="120px">
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="paymentTime" label="支付时间" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="140px">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="onShow(scope.row.buyerId)">查 看</el-button>
                            <el-button type="danger" size="mini" @click="onCancel(scope.row.orderSn)" :disabled="scope.row.orderState=='已取消'">取 消</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="8" align="center">
                <el-pagination
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 50,pageData.total]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 查看订单详情 -->
        <el-dialog title="订单" :visible.sync="Dialog" width="900px" center>
            <div id="content">
                <el-row type="flex" justify="start">
                    <el-col :span="6">
                        会员编号：{{memberBasic.mCode}}
                    </el-col>
                    <el-col :span="4">
                        姓名：{{memberBasic.mName}}
                    </el-col>
                    <el-col :span="4">
                        昵称：{{memberBasic.mNickname}}
                    </el-col>
                    <el-col :span="6">
                        推荐人编号：{{memberRelation.sponsorCode}}
                    </el-col>
                    <el-col :span="5">
                        推荐人昵称：{{memberRelation.sponsorName}}
                    </el-col>
                </el-row>
                <br>
                <el-row :gutter="20" type="flex" justify="start">
                    <el-col :span="6">
                        证件类型：{{memberBasic.idType}}
                    </el-col>
                    <el-col :span="7">
                        证件号码：{{memberBasic.idCode}}
                    </el-col>
                    <el-col :span="3">
                        性别：{{memberBasic.gender}}
                    </el-col>
                    <el-col :span="6">
                        出生日期：{{memberBasic.birthdate}}
                    </el-col>
                </el-row>
                <br>
                <el-row :gutter="20" type="flex" justify="start">
                    <el-col :span="6">
                        手机号码: {{memberBasic.mobile}}
                    </el-col>
                    <el-col :span="6">
                        微信号：{{memberBasic.weChat}}
                    </el-col>
                    <el-col :span="7">
                        Email: {{memberBasic.email}}
                    </el-col>
                    <el-col :span="4">
                        QQ:{{memberBasic.qq}}
                    </el-col>
                </el-row>
                <br>
                <el-row type="flex" justify="start">
                    <el-col :span="10">
                        地址：{{memberBasic.province}}-{{memberBasic.city}}-{{memberBasic.country}}-{{memberBasic.detial}}
                    </el-col>
                    <el-col :span="4">
                        邮编：{{memberBasic.addPost}}
                    </el-col>
                </el-row>
                <br>
                <el-row :gutter="20" type="flex" justify="start">
                    <el-col :span="10">
                        银行：{{memberBasic.accountType}}-{{memberBasic.accountTypeDetailed}}
                    </el-col>
                    <el-col :span="4">
                        户名：{{memberBasic.accountName}}
                    </el-col>
                    <el-col :span="8">
                        账号：{{memberBasic.accountNumber}}
                    </el-col>
                </el-row>
                <br>
                <el-row :gutter="20" type="flex" justify="start">
                    <el-col :span="4">
                        购货信息：
                    </el-col>
                </el-row>
                <br>
                <el-row type="flex" justify="start">
                    <el-col :span="10" :offset="1">
                        订单编号：{{memberBasic.orderSn}}
                    </el-col>
                    <el-col :span="10">
                        订单日期：{{memberBasic.createTime}}     
                    </el-col>
                </el-row>
                <br>
                <el-table :data="GoodsData" center>
                    <el-table-column prop="goodsId" label="产品编码" width="90" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsNum" label="数量" align="center">
                    </el-table-column>
                    <el-table-column prop="marketPrice" label="零售价" align="center">
                    </el-table-column>
                    <el-table-column prop="vipPrice" label="会员价" align="center">
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                        <template slot-scope="scope">
                            {{scope.row.goodsNum * scope.row.marketPrice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ppv" label="PV" align="center">
                    </el-table-column>
                    <el-table-column label="总pv" align="center">
                        <template slot-scope="scope">
                            {{scope.row.goodsNum * scope.row.ppv}}
                        </template>
                    </el-table-column>
                </el-table>
                <br/>
                <el-row type="flex" justify="start">
                    <el-col :span="6" :offset="18">
                        数量： {{OrderSum}}
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col :span="6" :offset="18">
                        商品金额： {{OrderPrice}}
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col :span="6" :offset="18">
                        总PV: {{OrderPV}}
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col :span="6" :offset="18">
                        运费： {{memberBasic.shippingFee}}
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start">
                    <el-col :span="6" :offset="18">
                        合计： {{OrderPrice+memberBasic.shippingFee}}
                    </el-col>
                </el-row>
                <br>
                <el-row type="flex" justify="start">
                    <el-col :span="6">
                        发货方式：  {{memberBasic.shippingName}}        
                    </el-col>
                    <el-col :span="18">
                        地址：{{memberBasic.address2?memberBasic.address2[0] + '-' + memberBasic.address2[0] + '-' + memberBasic.address2[0]+'-':""}}{{memberBasic.detailed2}}  
                    </el-col>
                </el-row>
                <br>
                <el-row type="flex" justify="start">
                    <el-col :span="6">
                        收件人: {{memberBasic.buyerName}}              
                    </el-col>
                    <el-col :span="18">
                        联系方式： {{memberBasic.buyerPhone}}        
                    </el-col>
                </el-row>
                <br>
                <br>
                <el-row type="flex" justify="end">
                    <el-col :span="6">
                        注册日期:  {{memberBasic.createTime}}                             
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

    </el-form>
</template>


<script>
import Vue from 'vue'
import {ToExportExcel} from "../../util/util.js";
export default {
    data() {
        return {
            Dialog:false,
            loadingTable:false, //加载列表
            form: {
                time: ["",""], //时间
                name: "", //姓名
                tel: "", //手机号
                state: "-1" //状态
            },
            //搜索数据
            searchData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            //设置时间范围
            pickerOptions: {
                shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, 
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            //订单详情
            GoodsData:[],  
            memberBasic:{},
            memberAccount:{},
            memberRelation:{},
            memberBank:[],
            memberAddress:[],
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
        inputNumber(e){
            let val = e.target.value;
            let reg = new RegExp("^[0-9]*$");
            let isNumber = reg.test(val);
            if(val>11 && isNumber){
                this.form.tel = val.slice(0,11);
            }else{
                this.form.tel = val.replace(/[^\d]/g,'');
            }
        },
        //改变页数
        onChangePage(currentPage) {
            this.form.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //选中日期回调
        onChangeDate( data) {
            if(data) {
                this.form.time[0] = data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate()+' '+data[0].getHours()+':'+data[0].getMinutes()+':'+ data[0].getSeconds()
                this.form.time[1] = data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate()+' '+data[1].getHours()+':'+data[1].getMinutes()+':'+ data[1].getSeconds()
            }
       },
        //点击查询修改记录
        onSearch() {
            this.loadingTable = true;  
            //时间
            let timeStart = "";
            let timeEnd = "";
            if(this.form.time){
                timeStart = this.form.time[0];
                timeEnd = this.form.time[1];
            }
            this.$request({
                method:'post',
                url:"/apis/memberAdd/queryNewMember",
                params:{
                    timeLeft:timeStart,
                    timeRight:timeEnd,
                    buyerName:this.form.name,
                    buyerPhone:this.form.tel,
                    paymentState:parseInt(this.form.state),
                    currentPage:this.form.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let searchData = response.data.data.list;
                    for(let i = 0; i< searchData.length; i++ ){
                        if(searchData[i].orderType==0){
                            searchData[i].orderType="普通";
                        }else if(searchData[i].orderType==1){
                            searchData[i].orderType="团购";
                        }else if(searchData[i].orderType==3){
                            searchData[i].orderType="秒杀";
                        }else if(searchData[i].orderType==3){
                            searchData[i].orderType="秒杀";
                        }else if(searchData[i].orderType==4){
                            searchData[i].orderType="促销";
                        }else if(searchData[i].orderType==5){
                            searchData[i].orderType="混合";
                        }else if(searchData[i].orderType==6){
                            searchData[i].orderType="会员激活订单";
                        }
                        if(searchData[i].orderState==0){
                            searchData[i].orderState="已取消";
                        }else if(searchData[i].orderState==5){
                            searchData[i].orderState="待审核";
                        }else if(searchData[i].orderState==10){
                            searchData[i].orderState="待付款";
                        }else if(searchData[i].orderState==20){
                            searchData[i].orderState="待发货";
                        }else if(searchData[i].orderState==30){
                            searchData[i].orderState="待收货";
                        }else if(searchData[i].orderState==40){
                            searchData[i].orderState="交易完成";
                        }else if(searchData[i].orderState==50){
                            searchData[i].orderState="已提交";
                        }else if(searchData[i].orderState==60){
                            searchData[i].orderState="已确认";
                        }
                        //获取昵称、手机号
                        this.$request({
                            method:'post',
                            url:"/apis/member/search",
                            params: {
                                mCode:searchData[i].buyerId,
                                date:new Date().getTime()
                            }
                        })
                        .then(response=>{
                            if(response.data.code && response.data.data.list.length > 0){
                                let list = response.data.data.list;
                                searchData[i].mNickname = list[0].mNickname;
                                searchData[i].mobile = list[0].mobile;
                                Vue.set(this.searchData,i,searchData[i]);
                            }
                        });
                        //获取推荐人信息
                        this.$request({
                            method:'get',
                            url:"/apis/member/findRelationByMCode",
                            params: {
                                mCode:searchData[i].buyerId,
                                date:new Date().getTime()
                            }
                        })
                        .then(response=>{
                            console.log(response)
                            if(response.data.code){
                                searchData[i].sponsorCode = response.data.data.memberRelation.sponsorCode;
                                searchData[i].sponsorName = response.data.data.memberRelation.sponsorName;
                                Vue.set(this.searchData,i,searchData[i])
                            }
                        })
                    }
                    this.searchData = searchData;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //点击查看详情
        onShow(mCode) {
            this.$request({
                method:'get',
                url:"/apis/member/queryMemDetail",
                params: {
                    mCode:mCode
                }
            })
            .then(response=>{
                console.log(response)
                if(response.data.data.order.length!=0){
                    this.Dialog = true;
                    this.memberBasic = response.data.data.memberBasic;
                    this.memberAccount = response.data.data.memberAccount;
                    this.memberRelation = response.data.data.memberRelation;
                    this.memberBank = response.data.data.memberBank;
                    this.memberAddress = response.data.data.memberAddress;
                    this.GoodsData = response.data.data.order;
                    this.memberBasic.orderSn = response.data.data.order[0].orderSn;
                    this.memberBasic.createTime = response.data.data.order[0].createTime.slice(0,10);
                    this.memberBasic.shippingName = response.data.data.order[0].shippingName;
                    this.memberBasic.buyerName = response.data.data.order[0].buyerName;
                    this.memberBasic.buyerPhone = response.data.data.order[0].buyerPhone;
                    this.memberBasic.birthdate = this.memberBasic.birthdate.slice(0,10);

                    if(this.memberBasic.idType=="1"){
                        this.memberBasic.idType = "居民身份证";
                    }else if(this.memberBasic.idType=="2"){
                        this.memberBasic.idType = "女";
                    }else if(this.memberBasic.idType=="3"){
                        this.memberBasic.idType = "军官证";
                    }else if(this.memberBasic.idType=="4"){
                        this.memberBasic.idType = "回乡证";
                    }

                    if(this.memberBasic.gender=="0"){
                        this.memberBasic.gender = "男";
                    }else if(this.memberBasic.gender=="1"){
                        this.memberBasic.gender = "女";
                    }else if(this.memberBasic.gender=="-1"){
                        this.formMember.gender = "保密";
                    }

                    if(this.deliveryMethod=="0"){
                        this.deliveryMethod = "自提";
                    }else if(this.deliveryMethod=="1"){
                        this.deliveryMethod = "快递";
                    }
                } else{
                    this.$message({
                        showClose: true,
                        message: "暂无订单信息",
                        type: 'wraning'
                    });
                }
            })   
        },
        //表格数据导出
        exportExcel(dom,title) {  
            if(this.tableData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                ToExportExcel(dom,title);       
            }
        },
        //取消
        onCancel(orderSn){
            this.$confirm('是否取消 '+orderSn+' 订单?', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: '取 消',
            type: 'warning',
            center: true
            }).then(() => {
                this.$request({
                    method:'get',
                    url:"/apis/member/cancelOrder",
                    params: {
                        orderSn:orderSn
                    }
                })
                .then(response=>{
                     console.log(response)
                    if(response.data.code){
                        this.$message({
                            message: '成功取消该订单!',
                            type: 'success'
                        });
                        this.onSearch();
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
    created() {
        this.onSearch();
    }
};
</script>


