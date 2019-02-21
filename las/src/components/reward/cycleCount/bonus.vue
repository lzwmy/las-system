<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="14" class="top-title">
                <span>当前会员周期：<b>{{periodCode}}</b></span>  
                <span>总奖励PV：{{sum}}</span>
                <span>推荐VIP总奖金：{{sumVIP}}</span>
            </el-col>
            <el-col :span="4" align="right">
                <el-button type="primary" @click="submitDisable?'':onCount" :disabled="submitDisable">计 算</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    v-loading="loadingTable" 
                    :element-loading-text="loadingText"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="业务周期" fixed align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center"> 
                    </el-table-column>
                    <el-table-column prop="" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusRetail" label="零售奖励" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusNewVip" label="推荐VIP奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevp1" label="市场拓展奖1代"  align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevp2" label="市场拓展奖2代" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevpShare" label="市场拓展奖分红" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevpSum" label="市场拓展奖合计" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusLdDirect" label="领导奖直接奖励" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="bonusLdIndirect" label="领导奖间接奖励" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="bonusLdSupport" label="领导奖同级支持奖" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="bonusLdSum" label="领导奖合计" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="chargeService" label="服务费扣款" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="bonusSum" label="总奖励合计" align="center" width="110">
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
    name:"bonus",
    data() {
        return {
            submitDisable:false, 
            loadingTable:false, //加载列表
            periodCode:"",  //本期周期
            loadingText:"",
            sumVIP:0,   //VIP总奖励
            sum:0,   //总奖励
            form: {
                id: "", //会员编号
                name: "", //姓名
            },
            //列表数据
            tableData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
        };
    },
    methods: {
        //查询
        onSearch() {
            this.loadingTable = true;  
            this.loadingText = "拼命加载中。。。";
            this.$request({
                method:'post',
                url:"/apis/bonus/findBonus",
                params:{
                    periodCode:this.periodCode,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){ 
                    this.tableData = response.data.data.list;
                    this.pageData.total = response.data.data.total;
                    this.pageData.currentPage = response.data.data.pageNum;
                    this.pageData.pageSize = response.data.data.pageSize;
                    this.tableData = response.data.data.list;
                    for(var i in this.tableData){
                        this.sumVIP += this.tableData[i].bonusNewVip;
                        this.sum += this.tableData[i].bonusSum;
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
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
        //计算
        onCount() { 
            this.submitDisable = true; 
            this.loadingTable = true;
            this.loadingText  = "请勿关闭或刷新页面,正在计算中。。。";
            this.$request({
                method:'get',
                url:"/apis/bonus/countBonusByPeriod",
                params:{
                    periodCode:this.periodCode,
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
                        this.onSearch();  
                    },1000)
                }else {
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            })
        }    
    },
    created() {
        this.periodCode = this.$route.query.periodCode;
        this.onSearch();
    },
    updated() {
        if(this.tableData.length==0){
            this.submitDisable = false;
        }else {
            this.submitDisable = true;
        }
    }
};
</script>
<style scoped>
.top-title span{
    display: inline-block;
    margin-right: 30px;
}
</style>

