<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="24" align="right">
                <el-button type="primary">发 放</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    border
                    v-loading="loadingTable" 
                    element-loading-text="正在计算中,请勿请行其它操作！"
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
                    :data="tableData" 
                    
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="" label="业务周期" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="会员编号" align="center"> 
                    </el-table-column>
                    <el-table-column prop="" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="当期奖金(PV)" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="当期奖金"  align="center">
                    </el-table-column>
                    <el-table-column prop="" label="应补发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="本期处理的扣款合计" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="应付奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放状态" align="center">
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
            
        }
    }
};
</script>
<style scoped>
.top-title span{
    display: inline-block;
    margin-right: 30px;
}
</style>

