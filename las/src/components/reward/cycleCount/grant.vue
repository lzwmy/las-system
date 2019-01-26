<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="24" align="right">
                <el-button type="primary" @click="onCount">计 算</el-button>
                <el-button type="danger">预发布</el-button>
                <router-link :to="{path:'/grantToExamine',query:{periodCode:periodCode}}"><el-button type="warning">奖金发放审核</el-button></router-link>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData1" 
                    border
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中。。。"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="" label="业务周期" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="新人数" align="center"> 
                    </el-table-column>
                    <el-table-column prop="" label="业绩人数" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="当前总奖金(PV)" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="当期总奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="应补发奖金"  align="center">
                    </el-table-column>
                    <el-table-column prop="" label="本期应处理的总捐款" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="本期总应付奖金" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData2" 
                    id="memberTable" 
                    v-loading="loadingTable" 
                    :element-loading-text="loadingText"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="业务周期" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusSum" label="当期奖金(PV)" align="center">
                    </el-table-column>
                    <el-table-column prop="currencyCode" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusSumMoney" label="当期奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusReissue" label="应补发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="chargeSum" label="本期处理的扣款合计" align="center">
                    </el-table-column>
                    <el-table-column prop="payableSum" label="应付奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="payStatus" label="发放状态" align="center">
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
    name:"grant",
    data() {
        return {
            periodCode:"",
            loadingTable:false, //加载列表
            loadingText:"",
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
        //查询奖金发放
        onSearch() {
            this.$request({
                method:'get',
                url:"/apis/bonus/findRdBonPaySta",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                console.log(response)
                if(response.data.code){ 
                    let tableData = response.data.data;
                    for(var i in tableData){
                       tableData[i].bonusDevpPercentage = tableData[i].bonusDevpPercentage + "%";
                       tableData[i].bonusLdPercentage = tableData[i].bonusLdPercentage + "%";
                       tableData[i].bonusSpecialPercentage = tableData[i].bonusSpecialPercentage + "%";
                       tableData[i].allocatePercentage = tableData[i].allocatePercentage + "%";
                       if(tableData[i].currencyCode=="CNY"){
                           tableData[i].currencyCode="人民币";
                       }
                       if(tableData[i].staus==-1){
                           tableData[i].staus="审核失败";
                       }else if(tableData[i].staus==0){
                           tableData[i].staus="未审核";
                       }else if(tableData[i].staus==1){
                           tableData[i].staus="审核通过";
                       }
                    }
                    this.tableData1 = tableData;
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        //查询奖金发放明细
        onSearchDetail() {
            this.loadingTable = true; 
            this.loadingText  = "拼命加载中。。。"; 
           this.$request({
                method:'post',
                url:"/apis/bonus/findBonus",
                params:{
                    pageSize:this.periodCode,
                    currentPage:1,
                    pageSize:1000,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.tableData2 = response.data.data.list;
                    for(var i = 0; i< this.tableData2.length; i++ ){
                        this.sum += this.tableData2[i].bonusSumMoney;
                        if(this.tableData2[i].payStatus==0){
                            this.tableData2[i].payStatus="否";
                        }else if(this.tableData2[i].payStatus==1){
                            this.tableData2[i].payStatus="是";
                        }else if(this.tableData2[i].payStatus==-1){
                            this.tableData2[i].payStatus="已废除";
                        }
                    }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //改变页数
        onChangePage(currentPage) {
            this.form.currentPage = currentPage;
            this.onSearchDetail();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearchDetail();
        },
       //计算
        onCount() { 
            this.loadingTable = true;
            this.loadingText  = "请勿关闭或刷新页面,正在计算中。。。";
            this.$request({
                method:'get',
                url:"/apis/bonus/countBonusByPeriod",
                params:{
                    periodCode:this.periodCode
                }
            })     
            .then(response=>{
                if(response.data.code){
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
                    this.loadingTable = false;
                }
            })
        },
    },
    created(){
        this.periodCode = this.$route.query.periodCode;
        this.onSearch();
        this.onSearchDetail();
    }
};
</script>
<style scoped>
.top-title span{
    display: inline-block;
    margin-right: 30px;
}
</style>

