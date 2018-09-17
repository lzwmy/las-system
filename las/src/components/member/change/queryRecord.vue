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
                <el-form-item label="信息修改类型:" label-width="100px">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option v-for="(items,index) in select1" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>      

        <el-row>
            <el-col :span="4">
                <el-form-item label="审核状态">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option v-for="(items,index) in select2" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="创建时间">
                    <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" size="mini" @click="onSearch">查询</el-button>
                <el-button size="mini" @click="exportExcel">导出</el-button>{{this.form.time}}
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20">
                <el-table :data="searchData" border size="mini" id="memberTable" >
                    <el-table-column type="index" align="center" width="50px">
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
                    <el-table-column label="修改详情" align="center" width="100px">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="onShowDetails(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="8" >
                <el-pagination
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :page-sizes="[2, 3, 4, 5]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"
                    @size-change="handleSizeChange">
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
            VisibleImg: "",
            select1:['全部','修改基本信息','修改敏感信息','会员更名','更改推荐人','更改会员级别','与老会员绑定'],
            select2:['全部','无需审核','待审','审核通过','已驳回'],
            form: {
                currentPage: "",  //当前页
                id: "", //会员编号
                name: "", //姓名
                type:"", //信息修改类型
                state:"", //审核状态
                time: "" //创建时间
            },
            //修改记录数据
            searchData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:5,
                total:null,
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
            // this.searchFrom.pageSize = pageSize;
            // this.queryRecord();
        },
        //点击查询修改记录
        onSearch() {   
            this.$axios({
                method:'post',
                url:"/apis/member/findEditAll",
                params:{
                    currentPage:this.form.currentPage,
                    mCode:this.form.id,
                    mName:this.form.name,
                    updateType:this.form.type,
                    reviewStatus:this.form.state,
                    updateTimeS:this.form.time
                }
            })     
            .then(response=>{
                console.log(response)
                if(response.data.data){
                    this.searchData = response.data.data.list;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }else {

                }
            })
        },
        //点击查看详情
        onShowDetails(data) {
            util.$emit("DialoChangeDetails",{
                data:data,
                showSubmit:false
            });
        },
        //表格数据导出
        exportExcel() {
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                var wb = XLSX.utils.table_to_book(
                    document.querySelector("#memberTable")
                );
                var wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    FileSaver.saveAs(
                        new Blob([wbout], { type: "application/octet-stream" }),
                        "修改记录列表.xlsx"
                    );
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, wbout);
                }
                return wbout;
            }
        },
    },
    created() {
        this.onSearch();
    }
};
</script>

<style>
</style>
