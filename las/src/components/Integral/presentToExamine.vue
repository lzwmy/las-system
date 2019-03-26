<template>
    <el-form  label-width="90px">
        <el-form-item label="选择操作:">
            <el-button type="primary" @click="onPassAll">批量通过</el-button>
        </el-form-item>
                     
         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    :cell-style="tableStyle" 
                    element-loading-spinner="el-icon-loading"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="transDate" label="申请时间" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column prop="blanceBefore" label="当前余额" align="center">
                    </el-table-column>
                    <el-table-column prop="amount" label="提现金额" align="center">
                    </el-table-column>
                    <el-table-column prop="blanceAfter" label="提现后余额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="提现手续费" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="实际可提额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="提现方式" align="center">
                    </el-table-column>
                    <el-table-column prop="bankCode" label="银行名称" align="center">
                    </el-table-column>
                    <el-table-column prop="accCode" label="账号" align="center" width="160">
                    </el-table-column>
                    <el-table-column prop="accName" label="账户名" align="center">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="140px">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="onPass(scope.row)">通 过</el-button>
                            <el-button type="danger" size="mini" @click="onReject(scope.row)">拒 绝</el-button>
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
                    :page-sizes="[10, 20, 30, 999]"
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
    name:"presentToExamine",
    data() {
        return {
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            selectData: [], //选中行数据 
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
                url:"/apis/member/findAccountLogWDALL",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:"",
                    mNickname:"",
                    transTimeS:"",
                    transNumber:null,
                    status:2,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                console.log(response)
                if(response.data.code){
                    let searchData = response.data.data.list;
                    for(var i = 0; i< searchData.length; i++ ){
                        if(searchData[i].status==-2){
                            searchData[i].status="拒绝";
                        }else if(searchData[i].status==-1){
                            searchData[i].status="已取消";
                        }else if(searchData[i].status==1){
                            searchData[i].status="新单";
                        }else if(searchData[i].status==2){
                            searchData[i].status="待审";
                        }else if(searchData[i].status==3){
                            searchData[i].status="通过";
                        }
                        //银行信息
                        // searchData[i].bankCode = response.data.map.bank[i].bankCode;
                        // searchData[i].accCode = response.data.map.bank[i].accCode;
                        // searchData[i].accName = response.data.map.bank[i].accName;
                    }
                    this.searchData = searchData;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //表格样式
        tableStyle({row,columnIndex}){
            if(columnIndex==4&&row.status=='待审'){
                return 'color:red'
            }
        },
        //点击拒绝
        onReject(row){
            this.$confirm('确认拒绝该用户提现申请？', '拒绝', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'post',
                    url:"/apis/member/updateAccLogWDOne",
                    params: {
                        mCode:row.mCode,
                        transNumber:row.transNumber,
                        status:-2,
                        date:new Date().getTime()
                    }
                })     
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: '拒绝该用户提现成功!',
                            type: 'success'
                        }); 
                    }else{
                        this.$message({
                            showClose: true,
                            message: '拒绝该用户提现失败!',
                            type: 'error'
                        }); 
                    }
                    this.onSearch()
                })
            }).catch(() => {});
        },
        //点击通过
        onPass(row){
            this.$confirm('确认通过该用户提现申请？', '通过', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'post',
                    url:"/apis/member/updateAccLogWDOne",
                    params: {
                        mCode:row.mCode,
                        transNumber:row.transNumber,
                        status:3,
                        date:new Date().getTime()
                    }
                })     
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: '该用户提现申请通过成功!',
                            type: 'success'
                        }); 
                    }else{
                        this.$message({
                            showClose: true,
                            message: '该用户提现申请通过失败!',
                            type: 'error'
                        }); 
                    }
                    this.onSearch()
                })
            }).catch(() => {});
        },
        //选中行
        handleSelectionChange(row) {
            this.selectData = row;
            let tempData = "";
            for(let i = 0; i < row.length; i++){
                tempData += row[i].transNumber+"/";
            }
            this.selectData = tempData;
        },
        //批量通过
        onPassAll(){
            if(this.selectData.length>1){
                this.$confirm('确认批量通过选中项用户提现申请？', '批量通过', {
                    confirmButtonText: '确 定',
                    cancelButtonText: '取 消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$request({
                        method:'post',
                        url:"/apis/member/updateAccLogWDAll",
                        params: {
                            transS:this.selectData,
                            date:new Date().getTime()
                        }
                    })     
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: '选中项用户提现申请通过成功!',
                                type: 'success'
                            }); 
                        }else{
                            this.$message({
                                showClose: true,
                                message: '选中项用户提现申请通过失败!',
                                type: 'error'
                            }); 
                        }
                        this.onSearch()
                    })
                }).catch(() => {});
            }else if(this.selectData.length==0){
                this.$message({
                    showClose: true,
                    message: '暂无审核项!',
                    type: 'error'
                }); 
            }else if(this.selectData.length<1){
                this.$message({
                    showClose: true,
                    message: '暂无审核项!',
                    type: 'error'
                }); 
            }
        }
    },
    created() {
        this.onSearch();
    }
};
</script>

<style scoped>
</style>
