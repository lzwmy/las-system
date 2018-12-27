<template>
    <el-form label-width="90px">
         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="类型" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="仓库名称" align="center">
                    </el-table-column>
                    <el-table-column label="出入库清单" align="center">
                        <template slot-scope="scope">
                            <el-button type="text">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" align="center">
                        <template slot-scope="scope">
                            <el-button type="text">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="状态" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="申请人" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="备注" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="操作" align="center">
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
            form:{
                whCode:"",
                whName:"",
                time:[],
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
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
            if(this.form.time && this.form.time[0]!=""){
                transTimeS = this.form.time[0]+'/'+this.form.time[1];
            }else{
                transTimeS = "";
            }
            this.$request({
                method:'post',
                url:"/apis/member/findCompanyTotal",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    transTimeS:transTimeS,
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
        // this.onSearch();
    }
};
</script>


