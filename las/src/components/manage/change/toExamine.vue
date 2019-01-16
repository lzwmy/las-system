<template>
    <el-form  :model="form" label-width="80px" label-position="left">
        <el-row>
            <el-col :span="4" :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="6" :sm="6" :md="6" :lg="4" :xl="4">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="创建时间">
                    <el-date-picker 
                        v-model="form.time" 
                        type="daterange" 
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions"
                        @change="onChangeDate">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="2">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查询</el-button>
                <el-button @click="exportExcel('#memberTable','审核管理')" icon="el-icon-download">导出</el-button>
            </el-col>
        </el-row>      

    <el-row>
        <el-col :span="24">
            <el-table 
                :data="searchData" 
                border 
                id="memberTable" 
                :cell-style="tableStyle" 
                v-loading="loadingTable" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column type="index" align="center" width="50px">
                </el-table-column>
                <el-table-column prop="mCode" label="会员编号" sortable align="center" width="140px">
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态" align="center" width="130px"> 
                </el-table-column>
                <el-table-column prop="mName" label="会员姓名" align="center" width="130px">
                </el-table-column>
                <el-table-column prop="updateType" label="修改类型" align="center" width="140px">
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" sortable align="center" width="140px">
                </el-table-column>
                <el-table-column prop="" label="操作人" align="center" width="130px">
                </el-table-column>
                <el-table-column prop="" label="审批人" align="center" width="130px">
                </el-table-column>
                <el-table-column prop="updateMemo" label="修改备注" align="center">
                </el-table-column>
                <el-table-column prop="" label="审核备注" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" width="110px">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" @click="onShowDetails(scope.row)">审核</el-button>
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
                :page-sizes="[10, 20, 30, 50,999]"
                :total="pageData.total"
                :current-page="pageData.currentPage"
                @current-change="onChangePage"  
                @size-change="handleSizeChange">
            </el-pagination>
        </el-col>
    </el-row>

    <!-- 弹出层组件 -->
    <dialog-com ref="dialog" @changeDetail="ChangeDetailsSuccess"></dialog-com>

    </el-form>
</template>


<script>
import {ToExportExcel} from "../../../util/util.js";
export default {
    data() {
        return {
            loadingTable:true, //加载列表
            form: {
                id: "", //会员编号
                name: "", //姓名
                time: ["",""] //时间
            },
            //搜索数据
            searchData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            //设置时间范围
            pickerOptions: {
                shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, 
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.form.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //选中日期回调
        onChangeDate(data) {
            if(data) {
                this.form.time[0] = data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate()+' '+data[0].getHours()+':'+data[0].getMinutes()+':'+ data[0].getSeconds()
                this.form.time[1] = data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate()+' '+data[1].getHours()+':'+data[1].getMinutes()+':'+ data[1].getSeconds()
            }
       },
        //点击查询修改记录
        onSearch() {
            this.loadingTable = true;  
            this.$request({
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
        //表格样式
        tableStyle({columnIndex}){
            if(columnIndex==2){
                return 'color:red'
            }
        },
        //点击审核查看详情
        onShowDetails(data) {
            this.$refs.dialog.showDialoChangeDetails({
                data:data,
                showSubmit:true
            });
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
        //审核成功
        ChangeDetailsSuccess(){
            this.onSearch();
        }
    },
    created() {
        this.onSearch();
    }
};
</script>

<style>
</style>
