<template>
    <el-form  :model="form" label-width="90px" label-position="left">
        <el-row>
            <el-col :span="8">
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
            <el-col :span="4" :offset="1">
                <el-form-item label="奖励类型:">
                    <el-select v-model="form.state" placeholder="请选择" >
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="零售奖励" value="零售奖励"></el-option>
                        <el-option label="推荐PV奖" value="推荐PV奖"></el-option>
                        <el-option label="市场拓展奖" value="市场拓展奖"></el-option>
                        <el-option label="领导奖" value="领导奖"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="onSearch">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','会员奖金明细表')">导 出</el-button>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="4">
                <el-form-item label="会员编号:">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="姓名:" label-width="50px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="总奖励PV:">
                    123
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
                    <el-table-column prop="mCode" label="业务周期" fixed align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="零售奖励" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="推荐VIP奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="市场拓展奖1代" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="市场拓展奖2代" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="市场拓展奖分红" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="市场拓展奖合计" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="领导奖直接奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="领导奖间接奖励" align="center" width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="领导奖同级支持奖" align="center" width="140">
                    </el-table-column>
                    <el-table-column prop="mCode" label="领导奖合计" align="center"  width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="服务费捐款" align="center"  width="130">
                    </el-table-column>
                    <el-table-column prop="mCode" label="总奖励合计" align="center"  width="130">
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
import {ToExportExcel} from "../../../util/util.js";
export default {
    data() {
        return {
            loadingTable:false, //加载列表
            form: {
                id:"",
                name: "", //姓名
                state:"全部",   //发放状态
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
        //点击查询修改记录
        onSearch() {
            this.loadingTable = true;  
            this.$axios({
                method:'post',
                url:"/apis/member/findEditStatus",
                params:{
                    currentPage:this.form.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mName:this.form.name,
                    updateType:this.form.type,
                    reviewStatus:this.form.state,
                    updateTimeStar:this.form.time?this.form.time[0]:"",
                    updateTimeEnd:this.form.time?this.form.time[1]:"",
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(var i = 0; i< this.searchData.length; i++ ){
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
        //this.onSearch();
        this.onGetTime();
    }
};
</script>

<style scoped>
</style>
