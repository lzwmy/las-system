<template>
    <el-form  label-width="90px">
        <el-row>
            <el-col :span="24">
                <el-row type="flex" justify="center">
                        <el-col :span="4">
                            <el-form-item label="业务周期：">
                                <el-cascader
                                    expand-trigger="hover"
                                    separator=""
                                    :options="options"
                                    v-model="timeStart">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="至" label-width="40px">
                                <el-cascader
                                    expand-trigger="hover"
                                    separator=""
                                    :options="options"
                                    v-model="timeEnd">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="1" >
                        <el-button type="primary">查 询</el-button>
                        <el-button type="primary">导 出</el-button>
                    </el-col>
                </el-row>
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
                    <el-table-column prop="" label="业务周期" align="center" fixed>
                    </el-table-column>
                    <el-table-column prop="" label="总人数" align="center"> 
                    </el-table-column>
                    <el-table-column prop="" label="总订单数" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="总业绩" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="VIP辅导奖" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="零售奖"  align="center">
                    </el-table-column>
                    <el-table-column prop="" label="市场拓展奖(PV)" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="" label="拓展奖占比" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="领导奖(PV)" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="领导奖占比" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="特别奖(PV)" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="特别奖占比" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="总奖金(PV)" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="总奖金拨出率" align="center" width="120">
                    </el-table-column>
                    <el-table-column prop="" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="总奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="补发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="本期扣款" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="实发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放状态" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放人" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="发放时间" align="center">
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
            timeAll:[], //全部周期
            timeStart:[],    //开始周期
            timeEnd:[],    //结束周期
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            options: []     
        };
    },
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            //this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            //this.onSearch();
        },
        //获取全部周期
        onGetTime() {
            this.$axios({
                method:'get',
                url:"/apis/member/findPeriodAll",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let year = null;
                    let list = response.data.data.list;
                    list.map(item=>{
                        let obj1 = {
                            value : item.periodCode.slice(0,4),
                            label : item.periodCode.slice(0,4),
                            children : []
                        };
                        if(year != obj1['value']){
                            this.options.push(obj1);
                            year = obj1['value'];
                        }

                        this.options.forEach(element => {
                            if(element.value == item.periodCode.slice(0,4)){
                                let obj2 = {
                                    value: item.periodCode.slice(4,6),
                                    label: item.periodCode.slice(4,6)
                                }
                                element.children.push(obj2)
                            }
                        });
                    })
                }
            })
        },
        //改变周期
        handleChange() {

        }
    },
    created() {
        this.onGetTime()
    }
};
</script>


