<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="13">
                <span>当前会员周期：<b>{{periodCode}}</b></span>  
            </el-col>
            <el-col :span="5" align="right">
                <el-button type="primary" @click="onCount" :disabled="submitDisable">计 算</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-table 
                    :data="tableData1" 
                    v-loading="loadingTable1" 
                    element-loading-text="拼命加载中！"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="业务周期" align="center" min-width="130px">
                    </el-table-column>
                    <el-table-column prop="periodNew" label="新人数" align="center" min-width="130px"> 
                    </el-table-column>
                    <el-table-column prop="periodTotal" label="业绩人数" align="center" min-width="130px">
                    </el-table-column>
                    <el-table-column prop="periodOrderNumber" label="业绩内订单数" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="preperiodOrder" label="上期转入订单数" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="periodOrderVaild" label="本期有效订单"  align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="periodOrderInvaild" label="本期新订单未付款" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="periodSalesTotal" label="本期总销售额" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="periodPvTotal" label="本期总PV" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br><br><br>
       <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData2" 
                    border
                    v-loading="loadingTable2" 
                    :element-loading-text="loadingText"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="orderSn" label="订单号" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="buyerId" label="会员编号" align="center" min-width="100px"> 
                    </el-table-column>
                    <el-table-column prop="orderType" label="订单类型" align="center">
                    </el-table-column>
                    <el-table-column prop="createTime" label="下单时间" align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="paymentTime" label="支付时间"  align="center" min-width="140px">
                    </el-table-column>
                    <el-table-column prop="paymentState" label="是否付款" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsAmount" label="应付金额" align="center">
                    </el-table-column>
                    <el-table-column prop="orderAmount" label="实付金额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="PV值" sortable align="center">
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
export default {
    name:"perStatus",
    data() {
        return {
            submitDisable:false, 
            loadingTable1:false, //加载列表
            loadingTable2:false, //加载列表
            loadingText:"",
            periodCode:"",  //本期周期
            //列表数据
            tableData1: [],
            tableData2: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
        };
    },
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.onSearch2();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch2();
        },
        onSearch1() {
            this.tableData1 = [];
            this.loadingTable1 = true;
            this.$request({
                method:'post',
                url:"/apis/member/findSysPeriodStatus",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){ 
                    this.tableData1.push(response.data.data);
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable1 = false;
                },200)
            })
        },
        onSearch2() {
            this.tableData2 = [];
            this.loadingTable2 = true;
            this.loadingText  = "请勿关闭或刷新页面,正在计算中。。。";
            this.$request({
                method:'post',
                url:"/apis/member/findPeriodOrder",
                params:{
                    periodCode:this.periodCode,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){ 
                    let tableData = response.data.data.list;
                    for(var i in tableData){
                        if(tableData[i].paymentState==0){
                           tableData[i].paymentState="未付款";
                        }else if(tableData[i].paymentState==1){
                            tableData[i].paymentState="已付款";
                        }

                       if(tableData[i].orderType==0){
                           tableData[i].orderType="普通";
                       }else if(tableData[i].orderType==1){
                           tableData[i].orderType="团购";
                       }else if(tableData[i].orderType==3){
                           tableData[i].orderType="秒杀";
                       }else if(tableData[i].orderType==4){
                           tableData[i].orderType="促销";
                       }else if(tableData[i].orderType==5){
                           tableData[i].orderType="混合";
                       }
                    }
                    this.tableData2 = tableData;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable2 = false;
                },200)
            })
        },
        //计算
        onCount() { 
            this.loadingTable1 = true;
            this.loadingTable2 = true;
            this.submitDisable = true;
            this.loadingText  = "正在计算中.....，请忽关闭当前页面!";
            this.$request({
                method:'post',
                url:"/apis/member/countPeriodOrder",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code) {
                    setTimeout(()=>{
                        this.$message({
                            showClose: true,
                            message: '计算成功！',
                            type: 'success'
                        });
                    },200);
                    // this.tableData1 = [];
                    // this.tableData1.push(response.data.data)
                    this.onSearch1();
                    this.onSearch2();
                }else {
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable1 = false;
                    this.loadingTable2 = false;
                    this.submitDisable = false;
                },200)
            })
        },
        //查看是否关闭业绩
        onClose(){
            this.$request({
                method:'post',
                url:"/apis/member/selectPeriodStatus",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){ 
                    if(response.data.data==3){
                        this.submitDisable = true;
                        setTimeout(()=>{
                            this.$message({
                                showClose: true,
                                message: '当前周期业绩状态已关闭',
                                type: 'wraning'
                            });
                        },500);
                    }
                }else{
                   
                }
            })
        },
    },
    created() {
        this.periodCode = this.$route.query.periodCode;
        this.onSearch1();
        this.onSearch2();
        this.onClose();
    }
};
</script>

