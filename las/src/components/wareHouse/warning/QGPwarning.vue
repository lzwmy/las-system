<template>
    <el-form label-width="90px" label-position="right">
        <el-row>
            <el-col :span="5" :xs="10" :sm="10" :md="6" :lg="5" :xl="5">
                <el-form-item label="仓库代码"><el-input v-model="form.WHCode" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :xs="10" :sm="10" :md="6" :lg="5" :xl="5">
                <el-form-item label="仓库名称"><el-input v-model="form.WHName" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch"  icon="el-icon-search">查 询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" :xs="10" :sm="10" :md="6" :lg="5" :xl="5">
                <el-form-item label="产品代码"><el-input v-model="form.PRCode" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :xs="10" :sm="10" :md="6" :lg="5" :xl="5">
                <el-form-item label="产品名称"><el-input v-model="form.PRName" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
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
                    <el-table-column prop="wareCode" label="仓库代码" align="center">
                    </el-table-column>
                    <el-table-column prop="wareName" label="仓库名称" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsCode" label="产品代码" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="specifications" label="规格值" align="center">
                    </el-table-column>
                    <el-table-column prop="specifications" label="规格" align="center">
                    </el-table-column>
                    <el-table-column prop="inventory" label="库存量" align="center">
                    </el-table-column>
                    <el-table-column prop="dayNumber" label="距N天报警" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="预警线" align="center">
                    </el-table-column>
                    <el-table-column prop="serial" label="入库单号" align="center">
                    </el-table-column>
                    <el-table-column prop="expirationDate" label="过期日" min-width="140" align="center">
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
    name:"QGPwarning",
    data() {
        return {
            form:{
                WHCode:"",
                WHName:"",
                PRCode:"",
                PRName:""
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
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
            this.$request({
                method:'post',
                url:"/apis/inventory/queryExpDateWarByConditions",
                params:{
                    wareCode:this.form.WHCode,
                    wareName:this.form.WHName,
                    goodsCode:this.form.PRCode,
                    goodsName:this.form.PRName,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
       
    },
    created() {
        this.onSearch();
    }
};
</script>


