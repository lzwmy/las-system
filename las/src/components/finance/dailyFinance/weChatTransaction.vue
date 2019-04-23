<template>
    <el-form  :model="form" label-width="90px">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="按支付时间">
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
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="订单号">
                    <el-input v-model="form.orderSn" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="交易号">
                    <el-input v-model="form.weChatOutSn" clearable></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="交易类型">
                    <el-select placeholder="全部" v-model="form.tradingType">
                        <el-option label="全部" value="9"></el-option>
                        <el-option label="支付" value="1"></el-option>
                        <el-option label="退款" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="对账结果">
                    <el-select placeholder="全部" v-model="form.checkStatus">
                        <el-option label="全部" value="9"></el-option>
                        <el-option label="成功" value="1"></el-option>
                        <el-option label="失败" value="2"></el-option>
                        <el-option label="未处理" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','微信交易日对账')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    :cell-style="tableStyle" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="tradingTime" label="交易时间" fixed align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="payTime" label="支付时间" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="orderSn" label="商户订单号" align="center">
                    </el-table-column>
                    <el-table-column prop="weChatOutSn" label="微信支付单号" align="center">
                    </el-table-column>
                    <el-table-column prop="tradingType" label="交易类型" align="center">
                    </el-table-column>
                    <el-table-column prop="status" label="交易状态" align="center" >
                    </el-table-column>
                    <el-table-column prop="orderAmount" label="订单金额" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="checkStatus" label="微信对账结果" align="center">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button :disabled="scope.row.status == '已完成'" @click="onChangeSuccess(scope.row)"  size="mini" type="danger">修改为完成</el-button>
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
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../../util/util.js";
export default {
    name:"weChatTransaction",
    data() {
        return {
            form: {
                time:[],
                orderSn: "",  //订单号
                weChatOutSn: "",  //交易号
                tradingType: "9",  //交易类型
                checkStatus: "1",    //对账结果
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
        //表格样式
        tableStyle({row,columnIndex}){
            if(columnIndex==5 && row.checkStatus != "未完成"){
                return 'color:red'
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
            this.$request({
                method:'post',
                url:"/apis/financial/findWeChatDailyCheckByCon",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize: this.pageData.pageSize,
                    payTimeLeft: this.form.time[0]?this.form.time[0]:'',
                    payTimeRight: this.form.time[1]?this.form.time[1]:'',
                    orderSn: this.form.orderSn,
                    weChatOutSn: this.form.weChatOutSn,
                    tradingType: this.form.tradingType,
                    checkStatus: this.form.checkStatus,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    this.searchData.forEach((item)=>{
                        item.tradingTime = item.tradingTime.slice(0,10);
                        if(item.tradingType == 1){
                            item.tradingType = "支付";
                        }else if(item.tradingType ==2){
                            item.tradingType = "退款";
                        }
                        if(item.status == 1){
                            item.status = "未完成";
                        }else if(item.status ==2){
                            item.status = "已完成";
                        }
                        if(item.checkStatus == 1){
                            item.checkStatus = "成功";
                        }else if(item.checkStatus ==2){
                            item.checkStatus = "失败";
                        }else if(item.checkStatus ==0){
                            item.checkStatus = "未处理";
                        }
                        item.tradingTime = item.tradingTime.slice(0,10);
                    })
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }else{
                    this.$message({
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //修改为完成
        onChangeSuccess(row){
            this.$confirm('是否修改为完成?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                
            }).catch(() => {});
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
        if(this.$route.query.time){
            this.form.time = [this.$route.query.time,this.$route.query.time];
        }
    }
};
</script>


