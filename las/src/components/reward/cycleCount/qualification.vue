<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="14" class="top-title">
                <span>当前会员周期：<b>{{periodCode}}</b></span>  
                <span>孤儿数：{{OrphanNum}}</span>
                <span>业绩人数：{{achNum}}</span>
            </el-col>
            <el-col :span="4" align="right">
                <el-button type="success" v-show="showOrphan" @click="onOrphan">显示孤儿</el-button>
                <el-button type="success" v-show="showAll" @click="onAll">显示全部</el-button>
                <el-button type="primary" :disabled="submitDisable"  @click="submitDisable?'':onCount">计 算</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    max-height="600"
                    v-loading="loadingTable" 
                    :element-loading-text="loadingText"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="mCode" label="会员编号" fixed align="center">
                    </el-table-column>
                    <el-table-column prop="mName" label="会员昵称" min-width="130" align="center"> 
                    </el-table-column>
                    <el-table-column prop="sponsorCode" label="推荐人编号" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="sponsorName" label="推荐人姓名" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="mStatus" label="会员状态" align="center">
                    </el-table-column>
                    <el-table-column prop="raStatus" label="关联公司绑定状态"  align="center"  width="150">
                    </el-table-column>
                    <el-table-column prop="raShopYn" label="开店状态" align="center">
                    </el-table-column>
                    <el-table-column prop="rankInit" label="期初个人级别" align="center"  width="110">
                    </el-table-column>
                    <el-table-column prop="ppv" label="当期个人购买PV" align="center"  width="140">
                    </el-table-column>
                    <el-table-column prop="ppvRetail" label="当期个人零售PV" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="appvInit" label="初期个人积累PV" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="appvFinal" label="期末个人累计PV" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="retailInit" label="个人零售购买的期初值" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="retail" label="个人零售购买额" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="retailFinal" label="个人零售购买的期末值" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="ppvqualified" label="个人消费是否合格" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="rank" label="个人级别升级" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="orphan" label="是否孤儿" align="center">
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
import util from "../../../util/util.js";
export default {
    name:"qualification",
    data() {
        return {
            submitDisable:false, 
            showOrphan:true, //显示孤儿
            showAll:false,   //显示全部
            OrphanNum:0,    //孤儿数
            achNum:0,    //业绩人数
            loadingTable:false, //加载列表
            loadingText:"",
            periodCode:"",  //本期周期
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
        //查询所有业务周期
        onSearch() {
            this.loadingTable = true;  
            this.loadingText = "拼命加载中。。。";
            this.$request({
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
                    // if(response.data.data.list.length!=0){
                    //     this.submitDisable = true;
                    // }
                    this.OrphanNum = response.data.map.countOrphan;
                    this.achNum = response.data.map.totalPeople;
                    this.tableData = response.data.data.list;
                    this.pageData.total = response.data.data.total;
                    this.pageData.currentPage = response.data.data.pageNum;
                    this.pageData.pageSize = response.data.data.pageSize;
                    this.tableData = response.data.data.list;
                    for(var i in this.tableData){
                        //会员状态
                        if(this.tableData[i].mStatus==0){
                            this.tableData[i].mStatus = "注销";
                        }else if(this.tableData[i].mStatus==1){
                            this.tableData[i].mStatus = "正常";
                        }else if(this.tableData[i].mStatus==2){
                            this.tableData[i].mStatus = "冻结";
                        }
                        //关联公司状态
                        if(this.tableData[i].raStatus==0){
                            this.tableData[i].raStatus = "未绑定";
                        }else if(this.tableData[i].raStatus==1){
                            this.tableData[i].raStatus = "已绑定";
                        }
                        //开店状态
                        if(this.tableData[i].raShopYn==0){
                            this.tableData[i].raShopYn = "未开店";
                        }else if(this.tableData[i].raShopYn==1){
                            this.tableData[i].raShopYn = "已开店";
                        }
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
                        //个人升级后级别
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
                        //个人消费是否合格
                        if(this.tableData[i].ppvqualified==0){
                            this.tableData[i].ppvqualified = "不合格";
                        }else if(this.tableData[i].ppvqualified==1){
                            this.tableData[i].ppvqualified = "合格";
                        }
                        //是否孤儿
                        if(this.tableData[i].orphan==0){
                            this.tableData[i].orphan = "是";
                        }else{
                            this.tableData[i].orphan = "否";
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
            this.loadingTable = true;
            this.loadingText  = "请勿关闭或刷新页面,正在计算中。。。";
            this.$request({
                method:'get',
                url:"/apis/member/countNowQualification",
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
                    this.loadingTable = false;
                }
            })
        },
        //显示孤儿
        onOrphan() {
            let tempDate = [];
            for(var i in this.tableData){
                if(this.tableData[i].orphan=="是"){
                    tempDate.push(this.tableData[i]);
                }
            }
            this.tableData = tempDate;
            this.showOrphan = false;
            this.showAll = true;
        },
        //显示全部
        onAll() {
            this.onSearch();
            this.showAll = false;
            this.showOrphan = true;
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
        }
    },
    created() {
        this.periodCode = this.$route.query.periodCode;
        this.onSearch();
    }
};
</script>
<style scoped>
.top-title span{
    display: inline-block;
    margin-right: 30px;
}
</style>

