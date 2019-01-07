<template>
    <el-form  :model="form" label-width="90px" label-position="left">
        <el-row>
            <el-col :span="8" :xs="10" :sm="10" :md="10" :lg="10" :xl="8">
                <el-row type="flex" justify="center">
                        <el-col :span="12">
                            <el-form-item label="业务周期：">
                                <el-cascader
                                    expand-trigger="hover"
                                    separator=""
                                    :clearable=true
                                    :options="options"
                                    v-model="form.timeStart">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="至" label-width="30px" style="padding-left:10px;">
                                <el-cascader
                                    expand-trigger="hover"
                                    separator=""
                                    :clearable=true
                                    :options="options"
                                    v-model="form.timeEnd">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                </el-row>
            </el-col>
            <el-col :span="4" :offset="1" :xs="8" :sm="8" :md="8" :lg="5" :xl="4">
                <el-form-item label="发放状态:">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option label="全部" value="9"></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                        <el-option label="已废除" value="-1"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','奖金发放明细表')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="会员编号:">
                    <el-input v-model="form.id" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="会员昵称:" @keyup.enter.native="onSearch">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="总奖金:">
                    {{sum}}
                </el-form-item>
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
                    <el-table-column prop="periodCode" label="业务周期" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusSum" label="当期奖金(PV)" align="center">
                    </el-table-column>
                    <el-table-column prop="currencyCode" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusSumMoney" label="当期奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusReissue" label="应补发奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="chargeSum" label="本期处理的扣款合计" align="center">
                    </el-table-column>
                    <el-table-column prop="payableSum" label="应付奖金" align="center">
                    </el-table-column>
                    <el-table-column prop="payStatus" label="发放状态" align="center">
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
import {ToExportExcel,onGetTime} from "../../../util/util.js";
export default {
    data() {
        return {
            loadingTable:false, //加载列表
            sum:0,  //总奖金
            form: {
                id:"",
                name: "", //昵称
                state:"1",   //发放状态
                timeStart:[],    //开始周期
                timeEnd:[],    //结束周期
            },
            //搜索数据
            searchData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            options: []   //全部周期         
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
        //点击查询修改记录
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            let timeStart = this.form.timeStart[0]+this.form.timeStart[1];
            let timeEnd = this.form.timeEnd[0]+this.form.timeEnd[1];
            this.$request({
                method:'post',
                url:"/apis/bonus/searchBonusPayment",
                params:{
                    mCode:this.form.id,
                    mNickName:this.form.name,
                    payStatus:this.form.state,
                    periodCodeLeft:timeStart?timeStart:"",
                    periodCodeRight:timeEnd?timeEnd:"",
                    currentPage:this.form.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(var i = 0; i< this.searchData.length; i++ ){
                        this.sum += this.searchData[i].bonusSumMoney;
                        if(this.searchData[i].payStatus==0){
                            this.searchData[i].payStatus="否";
                        }else if(this.searchData[i].payStatus==1){
                            this.searchData[i].payStatus="是";
                        }else if(this.searchData[i].payStatus==-1){
                            this.searchData[i].payStatus="已废除";
                        }
                    }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //表格数据导出
        exportExcel(dom,title) {  
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                ToExportExcel(dom,title);       
            }
        }
    },
    created() {
        this.onSearch();
        onGetTime(this.options);
    }
};
</script>

<style scoped>
</style>
