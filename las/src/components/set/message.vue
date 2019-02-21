<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    v-loading="loadingTable" 
                    border
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="content" label="消息内容">
                    </el-table-column>
                    <el-table-column prop="time" label="时间" width="300">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="8" align="center">
                <el-pagination
                    :page-size="searchFrom.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :page-sizes="[10, 20, 30, 999]"
                    :total="searchFrom.total"
                    :current-page="searchFrom.currentPage"
                    @current-change="onChangePage"
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    name:"message",
    data() {
        return {
            loadingTable:false,
            searchData:[{
                content:"有待审核会员更名消息",
                time:"2019/21/23"
            }],
            searchFrom:{
                currentPage:1,
                pageSize:10,
                total:0
            }
        };
    },
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.searchFrom.currentPage = currentPage;
            this.getMemberinfo();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.searchFrom.pageSize = pageSize;
        },
    },
    created() {
       
    }
};
</script>

<style>

</style>

