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
            <el-col :span="4" :xs="9" :offset="1" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="会员编号:">
                    <el-input v-model="form.id" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','会员奖金明细表')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="会员昵称:">
                    <el-input v-model="form.name" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="9" :sm="9" :md="9" :lg="5" :xl="4">
                <el-form-item label="总奖励PV:">
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
                    <el-table-column prop="periodCode" label="业务周期" fixed align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusRetail" label="零售奖励" align="center">
                    </el-table-column>
                    <el-table-column prop="bonusNewVip" label="推荐VIP奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevp1" label="市场拓展奖1代" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevp2" label="市场拓展奖2代" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevpShare" label="市场拓展奖分红" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusDevpSum" label="市场拓展奖合计" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusLdDirect" label="领导奖直接奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusLdIndirect" label="领导奖间接奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="bonusLdSupport" label="领导奖同级支持奖" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="bonusLdSum" label="领导奖合计" align="center"  width="130">
                    </el-table-column>
                    <el-table-column prop="chargeService" label="服务费捐款" align="center"  width="130">
                    </el-table-column>
                    <el-table-column prop="bonusSum" label="总奖励合计" align="center"  width="130">
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
import Vue from 'vue'
import {ToExportExcel,onGetTime} from "../../../util/util.js";
export default {
    name:"memberBonus",
    data() {
        return {
            loadingTable:false, //加载列表
            sum:0,  //总奖励PV
            form: {
                id:"",
                name: "", //昵称
                timeStart:[],    //开始周期
                timeEnd:[],    //结束周期
            },
            
            //搜索数据
            searchData: [],
            options: [],   //全部周期    
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
        //点击查询修改记录
        onSearch() {
            this.sum = 0;
            this.loadingTable = true; 
            let timeStart = this.form.timeStart[0]+this.form.timeStart[1];
            let timeEnd = this.form.timeEnd[0]+this.form.timeEnd[1]; 
            this.$request({
                method:'post',
                url:"/apis/bonus/searchBounsMaster",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mNickName:this.form.name,
                    periodCodeLeft:timeStart?timeStart:"",
                    periodCodeRight:timeEnd?timeEnd:"",
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(let i = 0; i< this.searchData.length; i++ ){
                        this.sum += this.searchData[i].bonusSum;
                        if(this.searchData[i].reviewStatus==0){
                            this.searchData[i].reviewStatus="待审";
                        }else if(this.searchData[i].reviewStatus==1){
                            this.searchData[i].reviewStatus="驳回";
                        }else if(this.searchData[i].reviewStatus==2){
                            this.searchData[i].reviewStatus="审核通过";
                        }else{
                            this.searchData[i].reviewStatus="无需审核";
                        }

                        if(this.searchData[i].updateType==0){
                            this.searchData[i].updateType="修改基本信息";
                        }else if(this.searchData[i].updateType==1){
                            this.searchData[i].updateType="修改敏感信息";
                        }else if(this.searchData[i].updateType==2){
                            this.searchData[i].updateType="会员更名";
                        }else if(this.searchData[i].updateType==3){
                            this.searchData[i].updateType="更改推荐人";
                        }else if(this.searchData[i].updateType==4){
                            this.searchData[i].updateType="更改会员级别";
                        }else if(this.searchData[i].updateType==5){
                            this.searchData[i].updateType="与老会员绑定";
                        }else{
                            this.searchData[i].updateType="";
                        }

                        //获取昵称
                        this.$request({
                            method:'post',
                            url:"/apis/member/search",
                            params: {
                                mCode:this.searchData[i].mCode,
                                date:new Date().getTime()
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                this.searchData[i].mNickname = response.data.data.list[0].mNickname;
                                Vue.set(this.searchData,i,this.searchData[i]);
                            }
                        });
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
        },
    },
    created() {
        this.onSearch();
        //获取全部周期
        onGetTime(this.options);
    }
};
</script>

<style scoped>
</style>
