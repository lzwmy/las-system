<template>
    <el-form  :model="form" label-width="80px" label-position="left">


        <el-row>
            <el-col :span="4">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="创建时间">
                    <el-date-picker format="yyyy-MM-dd" v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
                <el-button size="mini" >导出</el-button>
            </el-col>
        </el-row>      

    <el-row>
        <el-col :span="20">
            <el-table :data="searchData" border size="mini">
                <el-table-column type="selection" align="center" width="50px">
                </el-table-column>
                <el-table-column prop="mCode" label="会员编号" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="reviewStatus" label="审核状态" align="center" width="100px"> 
                </el-table-column>
                <el-table-column prop="mName" label="会员姓名" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="updateType" label="修改类型" align="center" width="120px">
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" align="center" width="160px">
                </el-table-column>
                <el-table-column prop="" label="操作人" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="" label="审批人" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="updateMemo" label="修改备注" align="center">
                </el-table-column>
                <el-table-column prop="" label="审核备注" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="onShowDetails(scope.row)">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <el-pagination
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="100">
                </el-pagination>      
            </el-col>
        </el-row>

         <!-- 弹出层组件 -->
        <dialog-com></dialog-com>

    </el-form>
</template>


<script>
import util from "../../../util/util.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    data() {
        return {
            form: {
                id: "", //会员编号
                name: "", //姓名
                time: "" //创建时间
            },
            //搜索数据
            searchData: []
        };
    },
    methods: {
        //点击查询修改记录
        onSearch() {   
            this.$axios({
                method:'post',
                url:"/apis/member/findEditStatus",
                params:{
                    mCode:this.form.id,
                    mName:this.form.name,
                    updateTimeS:this.form.time
                }
            })     
            .then(response=>{
                if(response.data.data){
                    this.searchData = response.data.data;
                    // this.pageData.currentPage = response.data.data.pageNum,
                    // this.pageData.pageSize = response.data.data.pageSize,
                    // this.pageData.total = response.data.data.total
                }else {
                    
                }
            })
        },
        //点击审核查看详情
        onShowDetails(data) {
            util.$emit("DialoChangeDetails",{
                data:data,
                showSubmit:true
            });
        },
    },
    created() {
        this.onSearch();
    }
};
</script>

<style>
</style>
