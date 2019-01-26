<template>
    <el-form  label-width="80px" label-position="left">
        <el-row>
            <el-col :span="24">
                <el-row type="flex" justify="center">
                    <el-col :span="5" :xs="10" :sm="10" :md="10" :lg="6" :xl="5">
                        <el-form-item label="业务周期">
                            <el-input clearable v-model="periodCode" placeholder="输入周期" @keyup.enter.native="onSearch"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1" >
                        <el-button type="primary" @click="onSearch"  icon="el-icon-search">查 询</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        
       <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="计算周期" align="center">
                    </el-table-column>
                    <el-table-column prop="actionCode" label="切换状态类型" align="center"> 
                    </el-table-column>
                    <el-table-column prop="valBefoerDesc" label="切换前状态" align="center">
                    </el-table-column>
                    <el-table-column prop="valAfterDesc" label="切换后状态" align="center">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="修改时间" sortable align="center">
                    </el-table-column>
                    <el-table-column prop="updateBy" label="切换人" align="center">
                    </el-table-column>
                    <el-table-column prop="updateMemo" label="修改备注" align="center">
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
    name:"cycleChangeLog",
    data() {
        return {
            loadingTable:false, //加载列表
            //列表数据
            tableData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
            //周期查询
            periodCode:""
        };
    },
    methods: {
        //查询所有业务周期
        onSearch() {
            this.loadingTable = true;  
            this.$request({
                method:'post',
                url:"/apis/member/findPeriodLogAll",
                params:{
                    periodCode:this.periodCode,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.pageData.total = response.data.data.total;
                    this.pageData.currentPage = response.data.data.pageNum;
                    this.pageData.pageSize = response.data.data.pageSize;
                    this.tableData = response.data.data.list;
                    for(var i in this.tableData){
                        if(this.tableData[i].actionCode=="SALES_STATUS"){
                            this.tableData[i].actionCode = "业绩状态";
                        }else if(this.tableData[i].actionCode=="CAL_STATUS"){
                            this.tableData[i].actionCode = "奖金状态";
                        }
                        else if(this.tableData[i].actionCode=="BONUS_STATUS"){
                            this.tableData[i].actionCode = "发放状态";
                        }
                    }
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
        }
    },
    created() {
        this.onSearch();
    }
};
</script>

