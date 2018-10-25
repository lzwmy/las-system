<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="14" class="top-title">
                <span>当前会员周期：<b>{{periodCode}}</b></span>  
                <span>写入业绩人数：{{number}}</span>
            </el-col>
            <el-col :span="4" align="right">
                <el-button type="primary"  @click="onCount" :disabled="submitDisable">计 算</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    v-loading="loadingTable" 
                    element-loading-text="请勿关闭或刷新页面,正在计算中。。。"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="mCode" fixed label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mName" label="会员昵称" align="center"> 
                    </el-table-column>
                    <el-table-column prop="ppv" label="当期个人购买PV" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="ppvRetail" label="当期个人零售PV" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="appvInit" label="初期个人累积PV" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="appvFinal" label="期末个人累计PV"  align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="ppvqualified" label="当前消费是否合格" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="rankInit" label="期初个人级别" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="rank" label="当期计算级别" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="rankRecordHigh" label="历史最高级别" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="layer" label="层级" align="center">
                    </el-table-column>
                    <el-table-column prop="leafYn" label="是否叶子" align="center">
                    </el-table-column>
                    <el-table-column prop="g7pv" label="G7PV" align="center">
                    </el-table-column>
                    <el-table-column prop="npv" label="NPV" align="center">
                    </el-table-column>
                    <el-table-column prop="gpvFlagship" label="旗舰GPV" align="center">
                    </el-table-column>
                    <el-table-column prop="groupRankMax" label="团队最高级别" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="ddRank2Number" label="直推代理人数" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="dlRank6Number" label="下属3级代理店网络数" align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="dlRank7Number" label="下属旗舰店网络数" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="dlRank8Number" label="下属高级旗舰店网络数" align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="tourismQualified" label="旅游奖" align="center">
                    </el-table-column>
                    <el-table-column prop="carQualified" label="车奖" align="center">
                    </el-table-column>
                    <el-table-column prop="dividendQualified" label="分红奖" align="center">
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
    </el-form>
</template>


<script>
export default {
    data() {
        return {
            submitDisable:false, 
            loadingTable:false, //加载列表
            periodCode:"",  //本期周期
            number:0,   //业绩人数
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
                total:null,
            },
        };
    },
    methods: {
        //查询
        onSearch() {
            this.loadingTable = true;  
            this.$axios({
                method:'post',
                url:"/apis/member/findQualificationAll",
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
                        this.number++;
                        //期初个人级别
                        if(this.tableData[i].rankInit==0){
                            this.tableData[i].rankInit = "普通会员";
                        }else if(this.tableData[i].rankInit==1){
                            this.tableData[i].rankInit = "VIP会员";
                        }else if(this.tableData[i].rankInit==2){
                            this.tableData[i].rankInit = "代理会员";
                        }else if(this.tableData[i].rankInit==3){
                            this.tableData[i].rankInit = "初级代理店";
                        }else if(this.tableData[i].rankInit==4){
                            this.tableData[i].rankInit = "一级代理店";
                        }else if(this.tableData[i].rankInit==5){
                            this.tableData[i].rankInit = "二级代理店";
                        }else if(this.tableData[i].rankInit==6){
                            this.tableData[i].rankInit = "三级代理店";
                        }else if(this.tableData[i].rankInit==7){
                            this.tableData[i].rankInit = "旗舰店";
                        }else if(this.tableData[i].rankInit==8){
                            this.tableData[i].rankInit = "高级旗舰店";
                        }else if(this.tableData[i].rankInit==9){
                            this.tableData[i].rankInit = "超级旗舰店";
                        }
                        //当期计算级别
                        if(this.tableData[i].rank==0){
                            this.tableData[i].rank = "普通会员";
                        }else if(this.tableData[i].rank==1){
                            this.tableData[i].rank = "VIP会员";
                        }else if(this.tableData[i].rank==2){
                            this.tableData[i].rank = "代理会员";
                        }else if(this.tableData[i].rank==3){
                            this.tableData[i].rank = "初级代理店";
                        }else if(this.tableData[i].rank==4){
                            this.tableData[i].rank = "一级代理店";
                        }else if(this.tableData[i].rank==5){
                            this.tableData[i].rank = "二级代理店";
                        }else if(this.tableData[i].rank==6){
                            this.tableData[i].rank = "三级代理店";
                        }else if(this.tableData[i].rank==7){
                            this.tableData[i].rank = "旗舰店";
                        }else if(this.tableData[i].rank==8){
                            this.tableData[i].rank = "高级旗舰店";
                        }else if(this.tableData[i].rank==9){
                            this.tableData[i].rank = "超级旗舰店";
                        }
                        //历史最高级别
                        if(this.tableData[i].rankRecordHigh==0){
                            this.tableData[i].rankRecordHigh = "普通会员";
                        }else if(this.tableData[i].rankRecordHigh==1){
                            this.tableData[i].rankRecordHigh = "VIP会员";
                        }else if(this.tableData[i].rankRecordHigh==2){
                            this.tableData[i].rankRecordHigh = "代理会员";
                        }else if(this.tableData[i].rankRecordHigh==3){
                            this.tableData[i].rankRecordHigh = "初级代理店";
                        }else if(this.tableData[i].rankRecordHigh==4){
                            this.tableData[i].rankRecordHigh = "一级代理店";
                        }else if(this.tableData[i].rankRecordHigh==5){
                            this.tableData[i].rankRecordHigh = "二级代理店";
                        }else if(this.tableData[i].rankRecordHigh==6){
                            this.tableData[i].rankRecordHigh = "三级代理店";
                        }else if(this.tableData[i].rankRecordHigh==7){
                            this.tableData[i].rankRecordHigh = "旗舰店";
                        }else if(this.tableData[i].rankRecordHigh==8){
                            this.tableData[i].rankRecordHigh = "高级旗舰店";
                        }else if(this.tableData[i].rankRecordHigh==9){
                            this.tableData[i].rankRecordHigh = "超级旗舰店";
                        }
                        //当前消费是否合格
                        if(this.tableData[i].ppvqualified==0){
                            this.tableData[i].ppvqualified = "不合格";
                        }else if(this.tableData[i].ppvqualified==1){
                            this.tableData[i].ppvqualified = "合格";
                        }
                        //是否叶子
                        if(this.tableData[i].leafYn==1){
                            this.tableData[i].leafYn = "是";
                        }else{
                            this.tableData[i].leafYn = "否";
                        }   
                        //旅游奖
                        if(this.tableData[i].tourismQualified==0){
                            this.tableData[i].tourismQualified = "不及格";
                        }else{
                            this.tableData[i].tourismQualified = "及格";
                        }   
                        //车奖
                        if(this.tableData[i].carQualified==0){
                            this.tableData[i].carQualified = "不及格";
                        }else{
                            this.tableData[i].carQualified = "及格";
                        }   
                        //分红奖
                        if(this.tableData[i].dividendQualified==0){
                            this.tableData[i].dividendQualified = "不及格";
                        }else{
                            this.tableData[i].dividendQualified = "及格";
                        }   
                    }
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //计算
        onCount() { 
            this.submitDisable = true; 
            this.loadingTable = true;
            this.$axios({
                method:'get',
                url:"/apis/member/countNowPeriod",
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
        }
    },
    created() {
        this.periodCode = this.$route.query.periodCode;
        this.onSearch();
    },
    updated() {
        for(var i in this.tableData){
            if(this.tableData[i].layer > 0){
                this.submitDisable = true; 
            }
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

