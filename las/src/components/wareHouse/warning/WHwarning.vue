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
                    <el-table-column prop="wareCode" label="仓库代码" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="wareName" label="仓库名称" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="goodsCode" label="产品代码" align="center" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="goodsName" label="产品名称" align="center" :show-overflow-tooltip="true" min-width="250">
                    </el-table-column>
                    <el-table-column label="规格值" align="center" width="100">
                        <template slot-scope="scope">
                            <p v-for="(item,index) in scope.row.specifications" :key="index">{{item}}</p>
                        </template>
                    </el-table-column> 
                    <el-table-column label="规格" align="center" width="100">
                        <template slot-scope="scope">
                            <p v-for="(item,index) in scope.row.specName" :key="index"> {{item}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="inventory" label="库存量" align="center" width="100">
                    </el-table-column>
                    <el-table-column label="预警线" align="center" width="100">
                        <template slot-scope="scope">
                            <el-input v-model.number="searchData[scope.$index].precautiousLine" @change="onChangePTL(scope.row)" @keyup.native="inputNumber($event)"></el-input>
                        </template>
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
                    :page-sizes="[15, 25, 30, 50,999]"
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
    name:"WHwarning",
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
                pageSize:15,
                total:0,
            }
        };
    },
    methods: {
        //限制input输入   
        inputNumber(e){
            e.target.value.replace(/[^\d]/g,'');
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
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            this.$request({
                method:'post',
                url:"/apis/inventory/findReInventoryWarningByConditions",
                params:{
                    wareCode:this.form.WHCode,
                    wareName:this.form.WHName,
                    goodsCode:this.form.PRCode,
                    goodsName:this.form.PRName,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    //规格和数量
                    let _goodsSpecName = response.data.map.specName;
                    let _goodsData = response.data.data.list;
                    let _specifications, _specName;
                    _goodsData.forEach((ele,index) => {
                        _specifications =  JSON.parse(_goodsData[index].specifications);
                        _specName =  JSON.parse(_goodsSpecName[index]);
                        _goodsData[index].specifications = [];
                        _goodsData[index].specName = [];
                        for(let key in _specifications){
                            _goodsData[index].specifications.push(_specifications[key]);
                        }
                        for(let key in _specName){
                            _goodsData[index].specName.push(_specName[key]);
                        }
                    });
                    this.searchData = response.data.data.list;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //修改预警线
        onChangePTL(row){
            this.$request({
                method:'post',
                url:"/apis/inventory/updatePrecautiousLine",
                params:{
                    wareCode:row.wareCode,
                    goodsCode:row.goodsCode,
                    specificationId:row.specificationId,
                    precautiousLine:parseInt(row.precautiousLine)?parseInt(row.precautiousLine):0,
                }
            })     
            .then(response=>{
                let type = "";
                if(response.data.code){
                    type = "success";
                }else{
                    type = "warning";
                }
                this.$message({
                    showClose: true,
                    message: response.data.msg,
                    type: type
                });
                this.onSearch();
            })
        }
       
    },
    created() {
        this.onSearch();
    }
};
</script>


