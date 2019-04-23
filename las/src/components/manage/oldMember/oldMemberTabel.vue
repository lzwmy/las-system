<template>
    <el-form  :model="form" label-width="90px">
        <el-row>
            <el-col :span="5" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="老系统编号:">
                    <el-input v-model="form.oldCode" @keyup.enter.native="onSearch"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5"  :offset="1" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="老系统昵称:" @keyup.enter.native="onSearch">
                    <el-input v-model="form.oldNickname"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="同步批号:" @keyup.enter.native="onSearch">
                    <el-input v-model="form.synchroCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','老会员绑定数据明细表')" icon="el-icon-download">导 出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="新会员编号:" @keyup.enter.native="onSearch">
                    <el-input v-model="form.newCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1" :xs="7" :sm="7" :md="7" :lg="5" :xl="5">
                <el-form-item label="会员状态:" @keyup.enter.native="onSearch">
                    <el-select v-model="form.state" placeholder="全部">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="正常开店" value="正常开店"></el-option>
                        <el-option label="临时" value="临时"></el-option>
                        <el-option label="冻结" value="冻结"></el-option>
                        <el-option label="终止" value="终止"></el-option>
                    </el-select>
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
                    <el-table-column prop="oldMCode" label="老系统会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="oldNickName" label="老系统昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="creationBy" label="老系统直接推荐人ID" align="center">
                    </el-table-column>
                    <el-table-column prop="oldStatus" label="老系统会员状态" align="center">
                    </el-table-column>
                    <el-table-column prop="newMCode" label="绑定的新系统会员号" align="center">
                    </el-table-column>
                    <el-table-column prop="creationTime" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column prop="creationBy" label="创建者" align="center">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="修改时间" align="center">
                    </el-table-column>
                    <el-table-column prop="updateBy" label="最新修改者" align="center">
                    </el-table-column>
                    <el-table-column prop="bitchId" label="同步批号" align="center">
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
import {ToExportExcel} from "../../../util/util.js";
export default {
    name:"oldMemberTabel",
    data() {
        return {
            form: {
                oldCode:"", //老系统编号
                oldNickname: "", //老系统昵称
                synchroCode: "", //同步批号
                newCode: "", //新会员昵称
                state: "全部", //会员状态
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
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
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            let oldStatus;
            if(this.form.state == "全部"){
                oldStatus = 9;
            }else if(this.form.state == "正常开店"){
                oldStatus = 1;
            }else if(this.form.state == "临时"){
                oldStatus = 0;
            }else if(this.form.state == "冻结"){
                oldStatus = -1;
            }else if(this.form.state == "终止"){
                oldStatus = -2;
            }
            this.$request({
                method:'post',
                url:"/apis/member/searchBadingDetailByConditions",
                params:{
                    oldMCode:this.form.oldCode,
                    oldNickName:this.form.oldNickname,
                    bitchId:this.form.synchroCode,
                    newMCode:this.form.newCode,
                    oldStatus: oldStatus,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let searchData = response.data.data.list;
                    searchData.forEach(ele => {
                        if(ele.oldStatus == 1){
                            ele.oldStatus = "正常开店";
                        }else if(ele.oldStatus == 0){
                            ele.oldStatus = "临时";
                        }else if(ele.oldStatus == -1){
                            ele.oldStatus = "冻结";
                        }else if(ele.oldStatus == -2){
                            ele.oldStatus = "终止";
                        }
                    });
                    this.searchData = searchData;
                    this.pageData.currentPage = response.data.data.pageNum,
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

