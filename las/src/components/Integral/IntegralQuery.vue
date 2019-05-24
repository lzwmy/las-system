<template>
    <el-form  :model="form" label-width="90px">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="按时间查询">
                    <el-date-picker 
                        v-model="form.time" 
                        type="daterange" 
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions"
                        @change="onChangeDate">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="3" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="3">
                <el-form-item label="会员编号:">
                    <el-input v-model="form.id" @keyup.enter.native="onSearch" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3" :xs="9" :sm="9" :md="9" :lg="5" :xl="3">
                <el-form-item label="会员昵称:">
                    <el-input v-model="form.nickname" @keyup.enter.native="onSearch" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','会员积分')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="交易单号:">
                    <el-input v-model="form.code" @keyup.native="inputNumber1($event)" @keyup.enter.native="onSearch" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" v-show="activeTag=='first'||activeTag=='third'" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="批记录号:">
                    <el-input v-model="form.recordNumber" @keyup.native="inputNumber2($event)" @keyup.enter.native="onSearch" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="交易类型:">
                    <el-cascader
                        expand-trigger="hover"
                        :options="formSelect"
                        v-model="form.type"
                        @change="onTypeChange">
                    </el-cascader>
                </el-form-item>
            </el-col>
        </el-row>

        <template>
            <el-tabs v-model="activeTag" @tab-click="handleClick">
                <el-tab-pane label="奖励积分" name="first">
                    <el-form  :model="formIntegral" label-width="100px">
                        <el-row v-if="showInfo">
                            <el-col :span="4">
                                <el-form-item label="会员编号:">
                                    <el-input v-model="formIntegral.id" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="会员昵称:">
                                    <el-input v-model="formIntegral.nickname" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="积分状态:">
                                    <el-input v-model="formIntegral.state" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="showInfo">
                            <el-col :span="4">
                                <el-form-item label="奖励积分:">
                                    <el-input v-model="formIntegral.reward" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="购物积分:">
                                    <el-input v-model="formIntegral.shopping" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="换购积分:">
                                    <el-input v-model="formIntegral.redemption" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="奖励积分转入:">
                                    <el-input v-model="formIntegral.rewardInto" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="奖励积分转出:">
                                    <el-input v-model="formIntegral.rewardOut" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="购物积分" name="second">
                    <el-form  :model="formIntegral" label-width="100px">
                        <el-row v-if="showInfo">
                            <el-col :span="4">
                                <el-form-item label="会员编号:">
                                    <el-input v-model="formIntegral.id" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="会员昵称:">
                                    <el-input v-model="formIntegral.nickname" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="积分状态:">
                                    <el-input v-model="formIntegral.state" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="form.id">
                            <el-col :span="4">
                                <el-form-item label="奖励积分:">
                                    <el-input v-model="formIntegral.reward" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="购物积分:">
                                    <el-input v-model="formIntegral.shopping" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="换购积分:">
                                    <el-input v-model="formIntegral.redemption" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="购物积分转入:">
                                    <el-input v-model="formIntegral.shoppingInto" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="购物积分转出:">
                                    <el-input v-model="formIntegral.shoppingOut" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="换购积分" name="third">
                    <el-form  :model="formIntegral" label-width="100px">
                        <el-row v-if="showInfo">
                            <el-col :span="4">
                                <el-form-item label="会员编号:">
                                    <el-input v-model="formIntegral.id" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="会员昵称:">
                                    <el-input v-model="formIntegral.nickname" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="积分状态:">
                                    <el-input v-model="formIntegral.state" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="showInfo">
                            <el-col :span="4">
                                <el-form-item label="奖励积分:">
                                    <el-input v-model="formIntegral.reward" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="购物积分:">
                                    <el-input v-model="formIntegral.shopping" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="换购积分:">
                                    <el-input v-model="formIntegral.redemption" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4">
                                <el-form-item label="换购积分转入:">
                                    <el-input v-model="formIntegral.redemptionInto" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" :offset="1">
                                <el-form-item label="换购积分转出:">
                                    <el-input v-model="formIntegral.redemptionOut" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </template> 
        <br/>      

         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="transNumber" label="交易流水号" fixed width="100">
                    </el-table-column>
                    <el-table-column prop="batchNumber" label="批记录号">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号">
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称">
                    </el-table-column>
                    <el-table-column prop="transDate" label="交易时间" width="160">
                    </el-table-column>
                    <el-table-column prop="transPeriod" label="交易业务周期" width="110">
                    </el-table-column>
                    <el-table-column prop="transTypeCode" label="交易类型" min-width="100">
                    </el-table-column>
                    <el-table-column v-if="activeTag=='second'" prop="trMmCode" label="交易会员号">
                    </el-table-column>
                    <el-table-column v-if="activeTag=='second'" prop="trMnickname" label="交易会员昵称" width="110">
                    </el-table-column>
                    <el-table-column prop="blanceBefore" label="交易前余额" width="100">
                    </el-table-column>
                    <el-table-column prop="amount" label="交易金额">
                    </el-table-column>
                    <el-table-column prop="blanceAfter" label="交易后余额" width="100">
                    </el-table-column>
                    <el-table-column prop="autohrizeBy" label="操作人">
                    </el-table-column>
                    <el-table-column label="备注" align="left" width="200px">
                        <template slot-scope="scope">
                            <p class="detailed">{{scope.row.transTypeCode}}</p>
                            <el-button  v-show="scope.row.transTypeCode.length >= 8"  size="mini" type="text"  @click="showDetailed(scope.row.transTypeCode)">详细</el-button>
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
                    :page-sizes="[10, 20, 30, 50, 999]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>

        <el-dialog
            title="备注"
            :visible.sync="dialogDesc"
            width="30%"
            >
            <span>{{desc}}</span>
        </el-dialog>
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../util/util.js";
export default {
    name:"IntegralQuery",
    data() {
        return {
            dialogDesc:false, //查看详细备注
            desc:"", //详细备注
            showInfo:false,  //是否显示个人信息
            activeTag:"first", //默认标签页
            formSelect:[], //下拉项
            formSelect1:[
                {
                    label:"全部",
                    value:"全部"
                },
                {
                    value:"转入",
                    label:"转入",
                    children:[
                        {
                            label:"全部转入",
                            value:"INTOALL"
                        },
                        {
                            label:"奖金转入",
                            value:"BA"
                        },
                        {
                            label:"充值",
                            value:"RC"
                        },
                        {
                            label:"公司补发奖金",
                            value:"RB"
                        },
                        {
                            label:"补偿积分",
                            value:"MUB"
                        }
                    ]
                },
                {
                    label:"转出",
                    value:"转出",
                    children:[
                        {
                            label:"全部转出",
                            value:"OUTALL"
                        },
                        {
                            label:"取现",
                            value:"WD"
                        },
                        {
                            label:"转购物积分",
                            value:"SP"
                        },
                        {
                            label:"归还欠款",
                            value:"RR"
                        },
                        {
                            label:"补扣积分",
                            value:"MDB"
                        }
                    ]
                }
            ],
            formSelect2:[
                {
                    label:"全部",
                    value:"全部"
                },
                {
                    label:"转入",
                    value:"转入",
                    children:[
                        {
                            label:"全部转入",
                            value:"INTOALL"
                        },
                        {
                            label:"奖金积分转换",
                            value:"BT"
                        },
                        {
                            label:"他人转入",
                            value:"TF"
                        },
                        {
                            label:"订单退款",
                            value:"OT"
                        },
                        {
                            label:"补偿积分",
                            value:"MDR"
                        }
                    ]
                },
                {
                    label:"转出",
                    value:"转出",
                    children:[
                        {
                            label:"全部转出",
                            value:"OUTALL"
                        },
                        {
                            label:"转出——订单支付",
                            value:"OP"
                        },
                        {
                            label:"转出——转给他人",
                            value:"TT"
                        },
                        {
                            label:"补扣积分",
                            value:"MDW"
                        }
                    ]
                }
            ],
            formSelect3:[
                {
                    label:"全部",
                    value:"全部"
                },
                {
                    label:"转入",
                    value:"转入",
                    children: [
                        {
                            label:"全部转入",
                            value:"INTOALL"
                        },
                        {
                            label:"评论商品",
                            value:"PC"
                        },
                        {
                            label:"补偿积分",
                            value:"MDW"
                        }
                    ]
                },
                {
                    label:"转出",
                    value:"转出",
                    children: [
                        {
                            label:"全部转出",
                            value:"OUTALL"
                        },
                        {
                            label:"换购商品",
                            value:"EG"
                        },
                        {
                            label:"补扣积分",
                            value:"MDR"
                        }
                    ]
                }
            ],
            form: {
                id:"", //编号
                nickname: "", //昵称
                timeStart:[],    //开始周期
                timeEnd:[],    //结束周期
                code:null,  //交易单号
                recordNumber:null,  //批记录号
                type:[],  //交易类型
                typeCode:"" //交易类型值
            },
            
            //积分表单
            formIntegral: {
                id:"", //编号
                nickname: "", //昵称
                state: "", //积分状态
                reward: "", //奖励积分
                shopping: "", //购物积分
                redemption: "", //换购积分
                rewardInto: "", //奖励积分转入
                rewardOut: "", //奖励积分转出
                shoppingInto: "", //购物积分转入
                shoppingOut: "", //购物积分转出
                redemptionInto: "", //换购积分转入
                redemptionOut: ""//换购积分转出
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
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
            }     
        };
    },
    methods: {
        //限制input输入   
        inputNumber1(e){
            let val = e.target.value;
            this.form.code = val.replace(/[^\d]/g,'');           
        },
        inputNumber2(e){
            let val = e.target.value;
            this.form.recordNumber = val.replace(/[^\d]/g,'');
        },
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //改变标签页
        handleClick(tab) {
            if(tab.label=="奖励积分"){
                this.form.type=[]
                this.formSelect = this.formSelect1;
            }else if(tab.label=="购物积分"){
                this.form.type=[]
                this.formSelect = this.formSelect2;
            }else if(tab.label=="换购积分"){
                this.form.type=[]
                this.formSelect = this.formSelect3;
            }
            this.onSearch();
            if(this.form.id){
                this.findMIntegral();
            }
        },
        //交易类型选择
        onTypeChange(arr){
            //选择非全部
            if(arr[1]){
                this.form.typeCode = arr[1];
            }else{
                this.form.typeCode = "";
            }
        },
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            let transTimeS = "";
            if(this.form.time && this.form.time[0]!=""){
                transTimeS = this.form.time[0]+'/'+this.form.time[1];
            }else{
                transTimeS = "";
            }
            if(this.form.id){
                this.findMIntegral();
            }
            this.$request({
                method:'post',
                url:"/apis/member/findAccountLog",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mNickname:this.form.nickname,
                    transNumber:this.form.code,
                    transTimeS:transTimeS,
                    batchNumber:this.form.recordNumber,
                    transTypeCode:this.form.typeCode,
                    typeS:this.activeTag=="first"?"BOP":(this.activeTag=="second"?"SHP":"PUI")
                }
            })     
            .then(response=>{
                if(response.data.code){
                    if(response.data.map.mCode){
                        this.showInfo = true;
                    }else{
                        this.showInfo = false;
                    }
                    let searchData = response.data.data.list;
                    for(var i = 0; i< searchData.length; i++ ){
                        if(searchData[i].transTypeCode=="BA"){
                            searchData[i].transTypeCode="奖金转入";
                        }else if(searchData[i].transTypeCode=="RC"){
                            searchData[i].transTypeCode="充值";
                        }else if(searchData[i].transTypeCode=="RB"){
                            searchData[i].transTypeCode="公司补发奖金";
                        }else if(searchData[i].transTypeCode=="WD"){
                            searchData[i].transTypeCode="取现";
                        }else if(searchData[i].transTypeCode=="SP"){
                            searchData[i].transTypeCode="转购物积分";
                        }else if(searchData[i].transTypeCode=="RR"){
                            searchData[i].transTypeCode="归还欠款";
                        }else if(searchData[i].transTypeCode=="BT"){
                            searchData[i].transTypeCode="奖励积分转换";
                        }else if(searchData[i].transTypeCode=="TF"){
                            searchData[i].transTypeCode="他人转入";
                        }else if(searchData[i].transTypeCode=="OT"){
                            searchData[i].transTypeCode="订单退款";
                        }else if(searchData[i].transTypeCode=="OP"){
                            searchData[i].transTypeCode="订单支付";
                        }else if(searchData[i].transTypeCode=="TT"){
                            searchData[i].transTypeCode="转给他人";
                        }else if(searchData[i].transTypeCode=="PC"){
                            searchData[i].transTypeCode="购买商品并评论";
                        }else if(searchData[i].transTypeCode=="EG"){
                            searchData[i].transTypeCode="换购商品";
                        }else if(searchData[i].transTypeCode=="MUR"){
                            searchData[i].transTypeCode="补偿换购积分";
                        }else if(searchData[i].transTypeCode=="MDR"){
                            searchData[i].transTypeCode="补扣换购积分";
                        }else if(searchData[i].transTypeCode=="MUW"){
                            searchData[i].transTypeCode="补偿购物积分";
                        }else if(searchData[i].transTypeCode=="MDW"){
                            searchData[i].transTypeCode="补扣购物积分";
                        }else if(searchData[i].transTypeCode=="MUB"){
                            searchData[i].transTypeCode="补偿奖励积分";
                        }else if(searchData[i].transTypeCode=="MDB"){
                            searchData[i].transTypeCode="补扣奖励积分";
                        }
                    }
                    //奖励积分
                    if(this.activeTag=="first"){
                        this.formIntegral.rewardInto = response.data.map.intoAll;
                        this.formIntegral.rewardOut = response.data.map.outAll;
                    }else if(this.activeTag=="second"){
                        this.formIntegral.shoppingInto = response.data.map.intoAll;
                        this.formIntegral.shoppingOut = response.data.map.outAll;
                    }else if(this.activeTag=="third"){
                        this.formIntegral.redemptionInto = response.data.map.intoAll;
                        this.formIntegral.redemptionOut = response.data.map.outAll;
                    }
                    //查找会员昵称
                    if(this.activeTag == 'second'){
                        searchData.forEach(ele => {
                            this.$request({
                                method:'post',
                                url:"/apis/member/search",
                                params:{
                                    mCode:ele.mCode,
                                    currentPage:1,
                                    pageSize:1,
                                    mName:"",
                                    mobile:"",
                                    mNickname:""
                                }
                            })     
                            .then(response=>{ 
                                if(response.data.code){
                                    ele.trMnickname = response.data.data.list[0].mNickname;
                                }
                            })
                        })
                    }
                    this.searchData = searchData;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
       //选中日期回调
        onChangeDate(data) {
            if(data) {
                let month1 = data[0].getMonth()+1<10? "0"+ (data[0].getMonth()+1): data[0].getMonth()+1;
                let month2 = data[1].getMonth()+1<10? "0"+ (data[1].getMonth()+1): data[1].getMonth()+1;
                let day1 = data[0].getDate()<10? "0"+ data[0].getDate(): data[0].getDate();
                let day2 = data[1].getDate()<10? "0"+ data[1].getDate(): data[1].getDate();
                this.form.time[0] = data[0].getFullYear()+'-'+month1+'-'+ day1;
                this.form.time[1] = data[1].getFullYear()+'-'+month2+'-'+ day2;
            }
       },
       //根据编号查询会员积分
       findMIntegral() {
           this.formIntegral={
                id:"", //编号
                nickname: "", //昵称
                state: "", //积分状态
                reward: "", //奖励积分
                shopping: "", //购物积分
                redemption: "", //换购积分
                rewardInto: "", //奖励积分转入
                rewardOut: "", //奖励积分转出
                shoppingInto: "", //购物积分转入
                shoppingOut: "", //购物积分转出
                redemptionInto: "", //换购积分转入
                redemptionOut: ""//换购积分转出
            };
           this.$request({
                method:'get',
                url:"/apis/member/findMemAccountByMCode",
                params:{
                    mCode:this.form.id
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.formIntegral.state = response.data.data.bonusStatus==0?"正常":(response.data.data.bonusStatus==1?"冻结":"未激活");
                    this.formIntegral.reward = response.data.data.bonusBlance;
                    this.formIntegral.shopping = response.data.data.walletBlance;
                    this.formIntegral.redemption = response.data.data.redemptionBlance;
                }else{
                    this.$message({
                        showClose: true,
                        message: '该会员没有积分信息',
                        type: 'warning'
                    });
                }
            })

            this.$request({
                method:'get',
                url:"/apis/member/findByMCode",
                params:{
                    mCode:this.form.id
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.formIntegral.id = response.data.data.memberBasic.mCode;
                    this.formIntegral.nickname = response.data.data.memberBasic.mNickname;
                }
            })
       },
        //表格数据导出
        exportExcel(dom,title) {  
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                ToExportExcel(dom,title);       
            }
        },
        //查看详细备注
        showDetailed(desc){
            this.dialogDesc = true;
            this.desc = desc;
        }
    },
    created() {
        this.formSelect = this.formSelect1;
        this.onSearch();
    }
};
</script>

<style scoped>
.el-tabs .el-form-item {
    margin-bottom: 0px;
}
.detailed{
    width:138px;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis; 
}
.detailedBtn{
    padding:0;
}
</style>
