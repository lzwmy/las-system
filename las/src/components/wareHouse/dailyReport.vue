<template>
    <el-form label-width="90px" label-position="right">
        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="按日查询">
                    <el-date-picker 
                        v-model="form.time" 
                        type="daterange" 
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
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
                    <el-table-column prop="statisticalDate" label="日期" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="wareCode" label="仓库代码" align="center">
                    </el-table-column>
                    <el-table-column prop="wareName" label="仓库名称" align="center" width="140" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="goodId" label="商品ID" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="商品名称" align="center" width="180">
                    </el-table-column>
                    <el-table-column label="规格" align="center" width="90">
                        <template slot-scope="scope">
                            <p v-for="(item, index) in scope.row.specName" :key="index">{{item}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="specRetailPrice" label="销售价格" align="center">
                    </el-table-column>
                    <el-table-column prop="stockNow" label="昨日库存" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="stockInto" label="当日入库" align="center">
                    </el-table-column>
                    <el-table-column prop="stockOut" label="当日出库" align="center">
                    </el-table-column>
                    <el-table-column prop="stockOutSOT" label="当日已发货" align="center" width="110">
                    </el-table-column>
                    <el-table-column prop="stock" label="当日实际库存" align="center" width="110">
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
    name:"dailyReport",
    data() {
        return {
            form:{
                WHCode:"",
                time:[],
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
            let transTimeS = "";
            if(this.form.time[0]){
                transTimeS = this.form.time[0]+'/'+this.form.time[1];
            }else{
                transTimeS = "";
            }
            this.$request({
                method:'post',
                url:"/apis/financial/findDayORMouthInventoryINOROUTByTime",
                params:{
                    wareCode:this.form.WHCode,
                    transTimeS:transTimeS,
                    goodIdS:this.form.PRCode,
                    goodsName:this.form.PRName,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    summaryType:1,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    this.searchData.forEach((item)=>{
                        item.statisticalDate = item.statisticalDate.slice(0,10)
                        let _specName = JSON.parse(item.specName);
                        item.specName = [];
                        for(let i in _specName){
                            item.specName.push(_specName[i]);
                        }

                        this.$request({
                            method:'post',
                            url:"/apis/member/findWare",
                            params:{
                                wareCode:item.wareCode,
                                currentPage:1,
                                pageSize:99,
                                date:new Date().getTime()
                            }
                        })     
                        .then(response=>{
                            if(response.data.code){
                                item.wareName = response.data.data.list[0].wareName;
                            }
                        })
                    })
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


