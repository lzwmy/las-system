<template>
    <el-form  :model="form" label-width="90px">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="周期时间">
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
                    <el-input v-model="form.id" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3" :xs="9" :sm="9" :md="9" :lg="5" :xl="3">
                <el-form-item label="会员昵称:">
                    <el-input v-model="form.name" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','会员欠款单申请审核')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="交易单号:">
                    <el-input v-model="form.code" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="交易类型:">
                    <el-select v-model="form.type" placeholder="请选择" >
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="欠款" value="1"></el-option>
                        <el-option label="还款" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="交易标志:">
                    <el-select v-model="form.state" placeholder="请选择" >
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="新单" value="1"></el-option>
                        <el-option label="已申请" value="2"></el-option>
                        <el-option label="已授权" value="3"></el-option>
                        <el-option label="取消" value="-1"></el-option>
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
                    <el-table-column prop="transNumber" label="交易流水号" fixed align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="batchNumber" label="批记录号" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="trTypeCode" label="交易类型" align="center">
                    </el-table-column>
                    <el-table-column prop="trSourceType" label="交易渠道" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="accType" label="账户类型" align="center">
                    </el-table-column>
                    <el-table-column prop="bankCode" label="银行名称" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="accCode" label="账户号码" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="currencyCode" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="blanceBefore" label="交易前余额" align="center" width="90">
                    </el-table-column>
                    <el-table-column prop="amount" label="交易金额" align="center">
                    </el-table-column>
                    <el-table-column prop="blanceAfter" label="交易后余额" align="center" width="90">
                    </el-table-column>
                    <el-table-column prop="transDate" label="交易时间" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="transRepiod" label="交易业务周期" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="transDesc" label="交易说明" align="center">
                    </el-table-column>
                    <el-table-column prop="status" label="交易标志" align="center">
                    </el-table-column>
                    <el-table-column prop="washedYn" label="冲正标志" align="center">
                    </el-table-column>
                    <el-table-column prop="orignTransNumber" label="原始单号" align="center">
                    </el-table-column>
                    <el-table-column prop="creationBy" label="创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="transDate" label="创建时间" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="updateBy" label="更新人" align="center">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="autohrizeBy" label="授权人" align="center">
                    </el-table-column>
                    <el-table-column prop="autohrizeTime" label="授权时间" align="center" width="150">
                    </el-table-column>
                    <el-table-column prop="autohrizeDesc" label="授权说明" align="center">
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
                    :page-sizes="[10, 20, 30, 50,999]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../../util/util.js";
export default {
    data() {
        return {
            form: {
                id:"", //编号
                name: "", //昵称
                timeStart:[],    //开始周期
                timeEnd:[],    //结束周期
                code:null,  //交易单号
                type:"0",  //交易类型
                state:"0"   //交易标志
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
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
            }     
        };
    },
    methods: {
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
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            let transTimeS = "";
            let type = "";
            if(this.form.type=="0"){
                type= "";
            }else if(this.form.type=="1"){
                type= "NR";
            }else if(this.form.type=="2"){
                type="RR";
            }
        
            if(this.form.time && this.form.time[0]!=""){
                transTimeS = this.form.time[0]+'/'+this.form.time[1];
            }else{
                transTimeS = "";
            }
    
            this.$request({
                method:'post',
                url:"/apis/member/findReceivableDetailAll",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mNickname:this.form.name,
                    transTimeS:transTimeS,
                    transNumber:this.form.code,
                    status:parseInt(this.form.state),
                    trTypeCode:type,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let searchData = response.data.data.list;
                    for(var i = 0; i< searchData.length; i++ ){
                        if(searchData[i].trTypeCode=="NR"){
                            searchData[i].trTypeCode="欠款";
                        }else if(searchData[i].trTypeCode=="RR"){
                            searchData[i].trTypeCode="还款";
                        }

                        if(searchData[i].trSourceType=="CMP"){
                            searchData[i].trSourceType="公司";
                        }else if(searchData[i].trSourceType=="OBB"){
                            searchData[i].trSourceType="其它会员奖金余额";
                        }else if(searchData[i].trSourceType=="OWB"){
                            searchData[i].trSourceType="其它会员购物积分";
                        }else if(searchData[i].trSourceType=="SBB"){
                            searchData[i].trSourceType="本人积分账户余额";
                        }else if(searchData[i].trSourceType=="SWB"){
                            searchData[i].trSourceType="本人购物积分余额";
                        }else if(searchData[i].trSourceType=="BNK"){
                            searchData[i].trSourceType="银行(包括第三访支付)";
                        }else if(searchData[i].trSourceType=="CSH"){
                            searchData[i].trSourceType="现金";
                        }

                        if(searchData[i].status==-1){
                            searchData[i].status="取消";
                        }else if(searchData[i].status==1){
                            searchData[i].status="新单";
                        }else if(searchData[i].status==2){
                            searchData[i].status="已申请";
                        }else if(searchData[i].status==3){
                            searchData[i].status="已授权";
                        }

                        if(searchData[i].washedYn==0){
                            searchData[i].washedYn = "否";
                        }else{
                            searchData[i].washedYn = "是";
                        }

                        //获取银行卡列表
                        let tempData = searchData[i];
                        this.$request({
                            method:'get',
                            url:"/apis/member/findMBankByMCode",
                            params: {
                                mCode:searchData[i].mCode,
                                date:new Date().getTime()
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                let memberBank = response.data.data.memberBank;
                                let trBankOid = tempData.trBankOid;
                                for(let j in memberBank){
                                    if(memberBank[j].oId==trBankOid){
                                        tempData.bankCode = memberBank[j].bankCode;
                                        tempData.accCode = memberBank[j].accCode;
                                        tempData.accType = memberBank[j].accType;
                                    }
                                }
                            }
                        })
                        //银行信息
                        searchData[i].bankCode = tempData.bankCode ;
                        searchData[i].accCode = tempData.accCode ;
                        searchData[i].accType = tempData.accType ;
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
    },
    created() {
        if(this.$route.query.mCode){
            this.form.id = this.$route.query.mCode;
            this.form.name = this.$route.query.mNickname;
        }
        this.onSearch();
    }
};
</script>

<style scoped>
</style>
