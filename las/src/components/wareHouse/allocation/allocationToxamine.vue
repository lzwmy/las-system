<template>
    <el-form label-width="90px">
         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    id="memberTable" 
                    :cell-style="tableStyle" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="autohrizeTime" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column prop="wareNameOut" label="转出仓库名称" align="center">
                    </el-table-column>
                    <el-table-column prop="wareNameIn" label="转入仓库名称" align="center">
                    </el-table-column>
                    <el-table-column label="出入库清单" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="onRead(scope.row.wId)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="onEnclosure(scope.row.wId)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column prop="autohrizeBy" label="申请人" align="center">
                    </el-table-column>
                    <el-table-column prop="autohrizeDesc" label="备注" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="warning" size="mini" @click="DialogToExamineShow(scope.row)">审 核</el-button>
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

        <!-- 审核弹出层 -->
        <el-dialog title="是否通过审核?" :visible.sync="DialogToExamine" width="400px" center>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="onToExamine(-2)">驳 回</el-button>
                <el-button type="primary" @click="onToExamine(3)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 弹出层组件 -->
        <tableCom ref="dialog"></tableCom>
    </el-form>
</template>


<script>
import tableCom from '../dialogCom';
export default {
    name:"allocationToxamine",
    data() {
        return {
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            DialogToExamine:false,
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            }
        };
    },
    components:{
        tableCom
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
        //表格样式
        tableStyle({row,columnIndex}){
            if(row.status=="待审" && columnIndex==5){
                return 'color:red'
            }
        },
        //点击查询表
        onSearch() {
            this.searchData = [];
            this.loadingTable = true;  
            this.$request({
                method:'post',
                url:"/apis/member/findAllocation2",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let searchData = response.data.data.list;
                    searchData.forEach(ele => {
                        if(ele.status==-2){
                            ele.status = "拒绝";
                        }else if(ele.status=="-1"){
                            ele.status = "已取消";
                        }else if(ele.status=="1"){
                            ele.status = "新单";
                        }else if(ele.status=="2"){
                            ele.status = "待审";
                        }else if(ele.status=="3"){
                            ele.status = "已授权";
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
        //审核弹出框
        DialogToExamineShow(row){
            this.DialogToExamine = true;
            this.wId = row.wId;
        },
        //审核 
        onToExamine(state){
            let type = null;
            this.$request({
                method:'post',
                url:"/apis/member/updateAllocationStatu",
                params:{
                    wId:this.wId,
                    status:state,
                }
            })     
            .then(response=>{
                if(response.data.code){
                    type = "success";
                }else{
                    type = "error";
                }
                this.$message({
                    showClose: true,
                    message: response.data.msg,
                    type: type
                });
                this.onSearch();
                setTimeout(()=>{
                    this.DialogToExamine = false;
                },200)
            })
        },
        //查看清单
        onRead(wId){
            this.$refs.dialog.showTable(wId,2);
        },
       //查看附件
        onEnclosure(wId){
            this.$refs.dialog.showImg({
                wId:wId,
                sign:2
            });
        }
    },
    created() {
        this.onSearch();
    }
};
</script>


