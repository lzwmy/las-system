<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="14" class="top-title">
                <span>当前会员周期：<b>201808</b></span>  
                <span>总奖励PV：127</span>
                <span>推荐VIP总奖金：127</span>
            </el-col>
            <el-col :span="4" align="right">
                <el-button @click="back">返 回</el-button>
                <el-button type="primary">计 算</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    size="mini" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="" label="业务周期" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="会员编号" align="center" width="100px"> 
                    </el-table-column>
                    <el-table-column prop="" label="会员昵称" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="零售奖励" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="推荐VIP奖励" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="市场拓展奖1代"  align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="市场拓展奖2代" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="市场拓展奖分红" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="市场拓展奖合计" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="领导奖直接奖励" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="领导奖间接奖励" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="领导奖同级支持奖" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="领导奖合计" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="服务费扣款" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="总奖励合计" align="center">
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
            loadingTable:false, //加载列表
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
        //改变页数
        onChangePage(currentPage) {
            this.form.currentPage = currentPage;
            //this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            //this.onSearch();
        },
        //点击审核查看详情
        onShowDetails(data) {
            
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        }
        
    },
    created() {
        
    }
};
</script>
<style scoped>
.top-title span{
    display: inline-block;
    margin-right: 30px;
}
</style>

