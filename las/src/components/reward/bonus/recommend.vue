<template>
    <el-form label-width="90px">
        <el-row>
            <el-col :span="8" :xs="10" :sm="10" :md="8" :lg="8">
                <el-form-item label="按时间查询">               
                    <el-col :span="7">
                        <el-select v-model="form.type" placeholder="1">
                            <el-option label="推荐时间" value="1"></el-option>
                            <el-option label="返佣时间" value="0"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="17">
                        <el-date-picker 
                            v-model="form.time" 
                            type="daterange" 
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '23:59:59']"
                            :picker-options="pickerOptions"
                            @change="onChangeDate"
                            style="margin-top:6px;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="10" :sm="10" :md="6" :lg="5" :xl="5">
                <el-form-item label="推荐人编号"><el-input v-model="form.code"></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','推荐列表')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="推荐人昵称"><el-input v-model="form.nickname" @keyup.enter.native="onSearch"></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="被推荐人会员编号" label-width="140px"><el-input v-model="form.Rcode" @keyup.enter.native="onSearch"></el-input></el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="被推荐人昵称" label-width="140px"><el-input v-model="form.Rnickname" @keyup.enter.native="onSearch"></el-input></el-form-item>
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
                    <el-table-column prop="" label="推荐人会员编号" align="center" min-width="140">
                    </el-table-column>
                    <el-table-column prop="" label="推荐人昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="会员等级" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="推荐时间" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="规格" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="被推荐人编号" align="center" min-width="140">
                    </el-table-column>
                    <el-table-column prop="" label="被推荐人昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="推荐好友注册数量" align="center" min-width="140">
                    </el-table-column>
                    <el-table-column prop="" label="消费金额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="返佣金额" align="center">
                    </el-table-column>
                    <el-table-column prop="" label="返佣时间" align="center">
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
            form:{
                type:"1",
                time:[],
                code:"",
                nickname:"",
                Rcode:"",
                Rnickname:""
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
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
            this.pageData.currentPage = currentPage;
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
                let month1 = data[0].getMonth()+1<10? "0"+ (data[0].getMonth()+1): data[0].getMonth()+1;
                let month2 = data[1].getMonth()+1<10? "0"+ (data[1].getMonth()+1): data[1].getMonth()+1;
                let day1 = data[0].getDate()<10? "0"+ data[0].getDate(): data[0].getDate();
                let day2 = data[1].getDate()<10? "0"+ data[1].getDate(): data[1].getDate();
                this.form.time[0] = data[0].getFullYear()+'-'+month1+'-'+ day1;
                this.form.time[1] = data[1].getFullYear()+'-'+month2+'-'+ day2;
            }
        },
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            this.$request({
                method:'post',
                url:"/apis/bonus/queryNewVipDetail",
                params:{
                    timeType:parseInt(this.form.type),
                    timeLeft:this.form.time?this.form.time[0]:"",
                    timeRight:this.form.time?this.form.time[1]:"",
                    electionCode:this.form.code,
                    electionNickname:this.form.nickname,
                    refereesCode:this.form.Rcode,
                    refereesNickname:this.form.Rnickname,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                console.log(response)
                if(response.data.code){
                    this.searchData = response.data.data.list;
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
    }
};
</script>


