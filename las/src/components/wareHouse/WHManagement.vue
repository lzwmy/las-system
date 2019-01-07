<template>
    <el-form label-width="90px">
        <el-row>
            <el-col :span="4" :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
                <el-form-item label="仓库搜索"><el-input v-model="whCode" @keyup.enter.native="onSearch"></el-input></el-form-item>
            </el-col>
            <el-col :span="10" :offset="1" >
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                <el-button type="warning" @click="showDialogWH" icon="el-icon-plus">添加新仓库</el-button>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="wareCode" label="仓库代码" align="center">
                    </el-table-column>
                    <el-table-column prop="wareName" label="仓库名称" align="center">
                    </el-table-column>
                    <el-table-column prop="place" label="仓库地点" align="center">
                    </el-table-column>
                    <el-table-column prop="createBy" label="创建人" align="center">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="最后修改时间" align="center">
                    </el-table-column>
                    <el-table-column prop="wareDesc" label="备注" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="onDelete(scope.row.wareCode)">删 除</el-button>
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


        <!-- 添加新仓库弹出层 -->
        <el-dialog title="添加新仓库" :visible.sync="DialogWH" width="550px" center>
            <el-form status-icon :rules="rules" :model="WHform" ref="WHform" label-width="80px" label-position="left">
                <el-form-item label="仓库名称" prop="name">
                    <el-input v-model="WHform.name"></el-input>
                </el-form-item>
                
                <el-form-item label="仓库地点" prop="place">
                    <div class="area">
                        <area-select type="text" :level="2" :placeholders="placeholders" v-model="WHform.place" :data="pcaa"></area-select>
                    </div>
                    <el-input v-model="WHform.detial" class="long-input"></el-input>
                </el-form-item>
                
                <el-form-item label="备注">
                    <el-input v-model="WHform.desc" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogWH = false">取 消</el-button>
                <el-button type="primary" @click="onAddWH('WHform')">确 定</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>


<script>
import { pca, pcaa } from "area-data";
export default {
    data() {
        return {
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa,
            whCode:"",//仓库代码
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            DialogWH:false,
            WHform:{
                name:"",
                place:[],
                detial:"",
                desc:""
            },
            //表单验证规则
            rules: {
                name: [
                    { required: true, message: "请输入仓库名称", trigger: ['blur','change'] },
                ],
                place: [
                    { required: true, message: "请输入仓库地址", trigger: ['blur','change'] },
                ]
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
            this.$request({
                method:'post',
                url:"/apis/member/findWare",
                params:{
                    wareCode:this.whCode,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(let i in this.searchData){
                        this.searchData[i].place = this.searchData[i].provinceCode+"-"+this.searchData[i].cityCode+"-"+this.searchData[i].countryCode+"-"+this.searchData[i].wareDetial;
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
        onDelete(wareCode){
            this.$confirm('是否删除选中仓库?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'get',
                    url:"/apis/member/delWare",
                    params: {
                        wareCode:wareCode,
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: '仓库删除成功！',
                            type: 'success'
                        }); 
                    } else{
                        this.$message({
                            showClose: true,
                            message: response.data.msg,
                            type: 'error'
                        }); 
                    }
                    this.onSearch();
                })    
            }).catch(() => {});
        },
        //新仓库弹出框
        showDialogWH(){
            this.DialogWH = true;
            this.WHform = {
                name:"",
                place:[],
                detial:"",
                desc:""
            }
        },
        //新仓库添加
        onAddWH(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/addWare",
                        params: {
                            wareName:this.WHform.name,
                            provinceCode:this.WHform.place[0],
                            cityCode:this.WHform.place[1],
                            countryCode:this.WHform.place[2],
                            wareDetial:this.WHform.detial,
                            wareDesc:this.WHform.desc
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: '新仓库添加成功！',
                                type: 'success'
                            }); 
                        } else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            }); 
                        }
                        this.DialogWH = false;
                        this.onSearch();
                    })    
                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入必填信息!',
                        type: 'error'
                    }); 
                    return false;
                }
            });
        }
       
    },
    created() {
        this.onSearch();
    }
};
</script>


