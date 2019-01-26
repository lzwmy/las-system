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
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','公司账户汇总')" icon="el-icon-download">导 出</el-button>
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
                    <el-table-column prop="countDate" label="统计日期" fixed align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="orderWd" label="订单现金收入" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="cashRepayment" label="现金还款" align="center">
                    </el-table-column>
                    <el-table-column prop="cashOutlayTotal" label="总现金收入" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusRr" label="奖励积分还款" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusBt" label="奖励积分-转购物积分" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="bonusWd" label="奖励积分提现" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="bonusIncomeTotal" label="总奖励积分收入" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="shoppingIncomeTotal" label="总购物积分收入" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="exchangeIncomeTotal" label="总换购积分收入" align="center"  width="130">
                    </el-table-column>
                    <el-table-column prop="wd" label="提现" align="center">
                    </el-table-column>
                    <el-table-column prop="nr" label="借款" align="center">
                    </el-table-column>
                    <el-table-column prop="cashOt" label="退款" align="center">
                    </el-table-column>
                    <el-table-column prop="cashOutlayTotal" label="总现金支出" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusOutlayTotal" label="总奖励积分支出" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="bt" label="奖励积分转购物积分" align="center"  width="160">
                    </el-table-column>
                    <el-table-column prop="ot" label="订单退积分" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="shoppingOutlayTotal" label="总购物积分支出" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="exchangeOutlayTotal" label="总换购积分支出" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="cashBalance" label="现金结余" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusBalance" label="奖励积分结余" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="shoppingBalance" label="购物积分结余" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="exchangeBalance" label="换购积分结余" align="center" width="120">
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
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../util/util.js";
export default {
    name:"companyAccount",
    data() {
        return {
            form: {
                timeStart:[],    //开始周期
                timeEnd:[],    //结束周期
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
            if(this.form.time && this.form.time[0]!=""){
                transTimeS = this.form.time[0]+'/'+this.form.time[1];
            }else{
                transTimeS = "";
            }
            this.$request({
                method:'post',
                url:"/apis/member/findCompanyTotal",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    transTimeS:transTimeS,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
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
        this.onSearch();
    }
};
</script>


