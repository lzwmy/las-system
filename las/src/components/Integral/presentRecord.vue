<template>
    <el-form  :model="form" label-width="90px">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="交易时间">
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
                    <el-input v-model="form.name" @keyup.enter.native="onSearch" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','提现记录')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="交易单号:">
                    <el-input v-model="form.code" @keyup.native="inputNumber($event)" @keyup.enter.native="onSearch" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="状态:">
                    <el-select v-model="form.status" placeholder="请选择" >
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="待审核" value="2"></el-option>
                        <el-option label="已通过" value="3"></el-option>
                        <el-option label="已拒绝" value="-1"></el-option>
                    </el-select>
                </el-form-item>
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
                    <el-table-column prop="transDate" label="申请时间" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column prop="blanceBefore" label="当前余额" align="center">
                    </el-table-column>
                    <el-table-column prop="amount" label="提现金额" align="center">
                    </el-table-column>
                    <el-table-column prop="blanceAfter" label="提现后余额" align="center">
                    </el-table-column>
                    <el-table-column prop="presentationFeeNow" label="提现手续费" align="center">
                    </el-table-column>
                    <el-table-column prop="actualWithdrawals" label="实际可提额" align="center">
                    </el-table-column>
                    <el-table-column prop="autohrizeBy" label="审核人" align="center">
                    </el-table-column>
                    <el-table-column prop="autohrizeTime" label="审核时间" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="accType" label="提现方式" align="center">
                    </el-table-column>
                    <el-table-column prop="bankDetail" label="银行名称" align="center">
                    </el-table-column>
                    <el-table-column prop="accCode" label="账号" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="accName" label="账户名" align="center">
                    </el-table-column>
                    <el-table-column prop="accStatus" label="提现状态" align="center">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="120px">
                        <template slot-scope="scope">
                            <el-button type="warning" :disabled="scope.row.status=='待审' || scope.row.accStatus=='成功'" size="mini" @click="onChangeFinish(scope.row)">修改为完成</el-button>
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
import {ToExportExcel} from "../../util/util.js";
export default {
    name:"presentRecord",
    data() {
        return {
            form: {
                id:"", //编号
                name: "", //昵称
                timeStart:[],    //开始周期
                timeEnd:[],    //结束周期
                code:null,  //交易单号
                status:"0"  //状态
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
        inputNumber(e){
            let val = e.target.value;
            this.form.code = val.replace(/[^\d]/g,'');           
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
                url:"/apis/member/findAccountLogWDALL",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mNickname:this.form.name,
                    transTimeS:transTimeS,
                    transNumber:this.form.code,
                    status:parseInt(this.form.status)
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let searchData = response.data.data.list;
                    searchData.forEach((item)=>{
                        if(item.status==-2){
                            item.status="已拒绝";
                        }else if(item.status==-1){
                            item.status="已取消";
                        }else if(item.status==1){
                            item.status="新单";
                        }else if(item.status==2){
                            item.status="待审";
                        }else if(item.status==3){
                            item.status="已通过";
                        }

                        if(item.accStatus== 0){
                            item.accStatus = '未完成'
                        }else if(item.accStatus== 1){
                            item.accStatus = '失败'
                        }else if(item.accStatus== 2){
                            item.accStatus = '成功'
                        }
                    })

                    let bank = response.data.map.bank;
                    for(let i = 0; i< bank.length; i++ ){
                        //银行信息
                        searchData[i].accName = bank[i].accName;
                        searchData[i].accCode = bank[i].accCode;
                        searchData[i].bankDetail = bank[i].bankDetail;
                        searchData[i].accType = bank[i].accType;
                        if(bank[i].accType == 1){
                            searchData[i].accType = "储蓄卡";
                        }else if(bank[i].accType == 2){
                            searchData[i].accType = "信用卡";
                        }else if(bank[i].accType == 3){
                            searchData[i].accType = "微信";
                        }else if(bank[i].accType == 4){
                            searchData[i].accType = "支付宝";
                        }
                    }
                    this.searchData = searchData;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total;
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //表格样式
        tableStyle({row,columnIndex}){
            if(columnIndex== 15 &&row.accStatus=='未完成'){
                return 'color:red'
            }
        },
        //修改为完成操作
        onChangeFinish(row){
            let status,accStatus;
            if(row.status=='已拒绝'){
                status= -2;
            }else if(row.status=='已取消'){
                status= -1;
            }else if(row.status=='新单'){
                status= 1;
            }else if(row.status=="待审"){
                status= 2;
            }else if(row.status=='已通过'){
                status= 3;
            }

            this.$confirm('确认修改为完成？', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'post',
                    url:"/apis/member/updateAccLogACCStatus",
                    params:{
                        mCode:row.mCode,
                        transNumber:row.transNumber,
                        status:status,
                        accStatus:2
                    }
                })     
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: "操作成功",
                            type: 'success'
                        });
                        this.onSearch();
                    }else{
                        this.$message({
                            showClose: true,
                            message: response.data.msg,
                            type: 'error'
                        });
                    }
                })
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
    }
};
</script>

<style scoped>
</style>
