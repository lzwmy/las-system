<template>
    <el-form label-width="90px" label-position="right">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="按月份查询">
                    <el-date-picker 
                        v-model="form.time" 
                        type="month" 
                        value-format="yyyy-MM"
                        placeholder="请选择月份">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5" :xs="10" :sm="10" :md="6" :lg="5" :xl="5">
                <el-form-item label="仓库代码"><el-input v-model="form.WHCode" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
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
                    <el-table-column prop="wareName" label="仓库名称" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="goodsCode" label="产品代码" align="center">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="产品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="specifications" label="规格" align="center">
                    </el-table-column>
                    <el-table-column prop="batch" label="批次" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="price" label="销售价格" align="center">
                    </el-table-column>
                    <el-table-column prop="lMonthAble" label="上月可用量" align="center" width="90">
                    </el-table-column>
                    <el-table-column prop="lMonthTotalDelivery" label="上月累计待发货数" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="lMonthRealInventory" label="上月实际库存" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="monthIn" label="当月入库" align="center">
                    </el-table-column>
                    <el-table-column prop="monthOut" label="当月出库" align="center">
                    </el-table-column>
                    <el-table-column prop="monthDelivery" label="当月已发货" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="monthReadyDelivery" label="当月待发货" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="monthTotalReadyDelivery" label="当月累计待发货数" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="monthAble" label="当月可用量" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="monthRealInventory" label="当月实际库存" align="center" width="110">
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
    data() {
        return {
            form:{
                WHCode:"",
                time:"",
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
                url:"/apis/inventory/queryInMonthReByConditions",
                params:{
                    wareCode:this.form.WHCode,
                    monthTime:this.form.time?this.form.time.replace(/\-/g,''):"",
                    goodsCode:this.form.PRCode,
                    goodsName:this.form.PRName,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
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


