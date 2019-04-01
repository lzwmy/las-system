<template>
    <el-form  label-width="90px">
        <el-row>
            <el-col :span="24">
                <el-row type="flex" justify="center">
                        <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                            <el-form-item label="业务周期：">
                                <el-cascader
                                    expand-trigger="hover"
                                    separator=""
                                    :options="options"
                                    v-model="timeStart">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                            <el-form-item label="至" label-width="40px">
                                <el-cascader
                                    expand-trigger="hover"
                                    separator=""
                                    :options="options"
                                    v-model="timeEnd">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1" >
                        <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                        <el-button @click="exportExcel('#memberTable','历史奖金表')" icon="el-icon-download">导 出</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    border
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="业务周期" align="center" fixed>
                    </el-table-column>
                    <el-table-column prop="customerNum" label="总人数" align="center"> 
                    </el-table-column>
                    <el-table-column prop="orderNum" label="总订单数" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="总业绩" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusNewVip" label="VIP辅导奖" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusRetail" label="零售奖"  align="center">
                    </el-table-column>
                    <el-table-column prop="bonusDevp" label="市场拓展奖(PV)" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevpPercentage" label="拓展奖占比" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusLD" label="领导奖(PV)" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusLDPercentage" label="领导奖占比" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusSpec" label="特别奖(PV)" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bonusSpecPercentage" label="特别奖占比" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="bounsSumPv" label="总奖金(PV)" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="总奖金拨出率" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="currencyCode" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="总奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="补发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="本期扣款" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="实发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放状态" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放人" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放时间" align="center">
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
import {ToExportExcel,onGetTime} from "../../../util/util.js";
export default {
    name:"historicalBonus",
    data() {
        return {
            loadingTable:false, //加载列表
            tableData: [],      //列表数据
            timeStart:[],    //开始周期
            timeEnd:[],    //结束周期
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
            options: []     //全部周期
        };
    },
    methods: {
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
       
         //点击查询修改记录
        onSearch() {
            this.tableData = [];
            this.loadingTable = true;  
            let timeStart = this.timeStart[0]+this.timeStart[1];
            let timeEnd = this.timeEnd[0]+this.timeEnd[1];
            this.$request({
                method:'post',
                url:"/apis/bonus/viewBonusPaymentStatistical",
                params:{
                    periodCodeLeft:timeStart?timeStart:"",
                    periodCodeRight:timeEnd?timeEnd:"",
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.tableData = response.data.data.list;
                    for(var i = 0; i< this.tableData.length; i++ ){
                        if(this.tableData[i].currencyCode=="CNY"){
                            this.tableData[i].currencyCode="人民币";
                        }
                        this.tableData[i].bonusDevpPercentage = this.tableData[i].bonusDevpPercentage+"%";
                        this.tableData[i].bonusLDPercentage = this.tableData[i].bonusLDPercentage+"%";
                        this.tableData[i].bonusSpecPercentage = this.tableData[i].bonusSpecPercentage+"%";
                    }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'warning'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        }
    },
    created() {
        onGetTime(this.options);
        this.onSearch();
    }
};
</script>


