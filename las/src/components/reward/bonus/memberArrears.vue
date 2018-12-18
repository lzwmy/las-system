<template>
    <el-form  :model="form" label-width="90px" label-position="left">
        <el-row>
            <el-col :span="4" :xs="8" :sm="8" :md="5" :lg="4" :xl="4">
                <el-form-item label="会员编号:">
                    <el-input v-model="form.mCode"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="8" :sm="8" :md="5" :lg="4" :xl="4">
                <el-form-item label="会员昵称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="8" :sm="8" :md="5" :lg="4" :xl="4">
                <el-form-item label="状态:">
                    <el-select v-model="form.state" placeholder="请选择" >
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="正常" value="正常"></el-option>
                        <el-option label="异常" value="异常"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="8" :sm="8" :md="5" :lg="4" :xl="4">
                <el-button type="primary" @click="onSearch">查 询</el-button>
                <el-button @click="exportExcel('#memberTable','会员欠款表')">导 出</el-button>
            </el-col>
            <el-col :span="3" align="right" :xs="5" :sm="5" :md="4" :lg="3" :xl="3">
                <router-link to="/addArrears">
                    <el-button  type="primary">创建新单</el-button>
                </router-link>
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
                    <el-table-column prop="mCode" label="会员编号" align="center">
                    </el-table-column>
                    <el-table-column prop="mNickname" label="会员昵称" align="center">
                    </el-table-column>
                    <el-table-column prop="receivableBlance" label="会员欠款余额" align="center">
                    </el-table-column>
                    <el-table-column prop="currencyCode" label="币种" align="center">
                    </el-table-column>
                    <el-table-column prop="status" label="状态" align="center">
                    </el-table-column>
                    <el-table-column prop="bnsDeductPecent" label="自动扣减工资百分比" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="240px">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" @click="onShowDetails(scope.row)" style="padding:0 20px;">查看明细</el-button>
                            <el-button type="warning" size="mini" @click="DialogChangePercent(scope.row)">修改扣减比例</el-button>
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
                    :page-sizes="[10, 20, 30, 50,pageData.total]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 修改自动扣减工资比例弹出层 -->
        <el-dialog title="修改自动扣减工资比例?" :visible.sync="Dialog" width="400px" center>
            <el-row>
                <el-col :span="15">
                    <el-form-item>
                        <el-input v-model="percentage"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-form-item label-width="5px">
                    %
                    </el-form-item>
                </el-col>
            </el-row>  
            <span slot="footer" class="dialog-footer">
                <el-button @click="Dialog = false">取 消</el-button>
                <el-button type="primary" @click="onChangePercent">确 定</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>


<script>
import {ToExportExcel} from "../../../util/util.js";
export default {
    data() {
        return {
            Dialog:false,
            percentage:null,  //修改比例
            ChangeData:null, //修改数据
            loadingTable:false, //加载列表
            timeAll:[], //全部周期
            form: {
                mCode:"",  //编号
                name: "", //昵称
                state:"全部",   //发放状态
            },
            searchData: [], //搜索数据
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
            this.searchData = [];
            this.loadingTable = true; 
            let state = this.form.state;
            this.$request({
                method:'post',
                url:"/apis/member/findReceivableAll",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.mCode,
                    mNickname:this.form.name,
                    status:this.form.state=="全部"?0:(state=="正常"?1:2),
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(var i = 0; i< this.searchData.length; i++ ){
                        this.searchData[i].bnsDeductPecent = this.searchData[i].bnsDeductPecent + "%";
                        if(this.searchData[i].status==1){
                            this.searchData[i].status="正常";
                        }else if(this.searchData[i].status==2){
                            this.searchData[i].status="异常";
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
        exportExcel() {                  
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                new Promise((resolve,reject)=>{
                    this.pageData.pageSize = this.pageData.total;
                    this.onSearch();
                    setTimeout(()=>{
                        resolve();
                    },500)
                })
                .then(()=>{
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
                            "会员欠款表 .xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }
                    this.pageData.pageSize = 10;
                    this.onSearch();
                    return wbout;
                })
                
            }
        },
        //查看明细
        onShowDetails(row) {
            
        },
        //修改扣减比例弹出层
        DialogChangePercent(row) {
            this.Dialog = true;
            this.ChangeData = row;
        },
        //修改扣减比例
        onChangePercent() {
            // this.$request({
            //     method:'post',
            //     url:"/apis/member/AuditReceivable",
            //     params:{
            //         mCode:this.current.mCode,
            //         mNickname:this.current.mNickname,
            //         transNumber:this.current.transNumber,
            //         status:3
            //     }
            // })     
            // .then(response=>{
            //     if(response.data.code){
            //         this.$message({
            //             showClose: true,
            //             message: '审核成功',
            //             type: 'success'
            //         });
            //         this.onSearch();
            //     }else{
            //         this.$message({
            //             showClose: true,
            //             message: response.data.msg,
            //             type: 'error'
            //         });
            //     }
            //     setTimeout(()=>{
            //         this.Dialog = false;
            //     },200)
            // })
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
