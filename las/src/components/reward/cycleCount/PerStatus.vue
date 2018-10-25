<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="13">
                <span>当前会员周期：<b>201808</b></span>  
            </el-col>
            <el-col :span="5" align="right">
                <el-button @click="back">返 回</el-button>
                <el-button type="primary">关闭业绩</el-button>
                <el-button type="primary">计 算</el-button>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    v-loading="loadingTable" 
                    element-loading-text="正在计算中,请勿请行其它操作！"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="" label="业务周期" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="" label="新人数" align="center" width="130px"> 
                    </el-table-column>
                    <el-table-column prop="" label="业绩人数" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="" label="业绩内订单数" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="" label="上期转入订单数" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="" label="本期有效订单"  align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="" label="本期新订单未付款" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="" label="本期总销售额" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="" label="本期总PV" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
       <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    border
                    
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="" label="订单号" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="会员编号" align="center" width="100px"> 
                    </el-table-column>
                    <el-table-column prop="" label="业绩人数" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="" label="订单类型" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="" label="下单时间" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="" label="支付时间"  align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="" label="是否付款" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="应付金额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="实付金额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="PV值" sortable align="center">
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

