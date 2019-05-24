<template>
    <div>
        
        <el-form :model="formSearch" label-width="80px">
            <el-row>
                <el-col :span="4" :xs="6" :sm="6">
                    <el-form-item label="用户名">
                        <el-input v-model.trim="formSearch.userName" clearable></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :xs="6" :sm="6">
                    <el-form-item label="角色">
                        <el-select v-model="formSearch.roleName">
                            <el-option label="全部" value="-1"></el-option>
                            <el-option :label="itmes.roleName" :value="itmes.id" v-for="(itmes,index) in dataRole" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :xs="6" :sm="6">
                    <el-form-item label="状态">
                        <el-select v-model="formSearch.state">
                            <el-option label="全部" value="3"></el-option>
                            <el-option label="启用" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :offset="1" :xs="5" :sm="5">
                    <el-button type="primary" @click="onSearch">搜 索</el-button>
                    <el-button type="primary" @click="DialogShow" v-if="usable" class="btn-edit">添加用户</el-button>
                </el-col>
            </el-row>
        </el-form>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    v-loading="loadingTable" 
                    border
                    :cell-style="cellStyle"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="userName" label="用户名">
                    </el-table-column>
                    <el-table-column prop="nickName" label="昵称">
                    </el-table-column>
                    <el-table-column prop="roleName" label="角色">
                    </el-table-column>
                    <el-table-column prop="roleDesc" label="角色描述" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="isEnabled" label="状态">
                    </el-table-column>
                    <el-table-column prop="createDate" label="创建时间" sortable>
                    </el-table-column>
                    <el-table-column v-if="usable" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="success"  class="btn-edit" @click="diologEdit(scope.row)">编 辑</el-button>
                            <el-button  size="mini" type="wraning" v-if="!scope.row.blockUp" @click="scope.row.blockUp?'':onBlockUp(scope.row.id,scope.row.userName)">停 用</el-button>
                            <el-button  size="mini" type="success" v-if="!scope.row.enable" @click="scope.row.enable?'':onEnable(scope.row.id,scope.row.userName)">启 用</el-button>
                            <el-button  size="mini" type="danger"  @click="onDelete(scope.row.id,scope.row.userName)">删 除</el-button>
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

        <!-- 添加管理员弹出层 -->
        <el-dialog title="添加管理员" :visible.sync="DialogAddManagers" width="450px" center>
            <el-form :model="form" ref="form" :rules="rules" label-width="80px" label-position="left">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model.trim="form.userName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model.trim="form.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="角色设置" prop="roleName">
                            <el-select v-model="form.roleName" @change="selectGet">
                                <el-option :label="itmes.roleName" :value="itmes.id" :disabled="itmes.roleName=='超级管理员'" v-for="(itmes,index) in dataRole" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogAddManagers = false">取 消</el-button>
                <el-button type="primary" @click="onAddManagers('form')">添 加</el-button>
            </span>
        </el-dialog>

        <!-- 编辑管理员弹出层 -->
        <el-dialog title="编辑管理员" :visible.sync="DialogEditManagers" width="450px" center>
            <el-form :model="formEdit" label-width="70px" label-position="left">
                <el-form-item label="用户名">
                    <el-input v-model.trim="formEdit.userName" disabled></el-input>
                </el-form-item>
                <el-form-item label="角色设置">
                    <el-select v-model="formEdit.roleName" @change="selectChange">
                        <el-option :label="itmes.roleName" :value="itmes.id" :disabled="itmes.roleName=='超级管理员'" v-for="(itmes,index) in dataRole" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model.trim="formEdit.state" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogEditManagers = false">取 消</el-button>
                <el-button type="primary" @click="onEdit">添 加</el-button>
            </span>
        </el-dialog> 
    </div>
</template>


<script>
export default {
    name:"managers",
    data() {
        return {
            loadingTable:false, //加载列表
            DialogAddManagers:false,
            DialogEditManagers:false,
            formSearch:{
                userName:"",
                roleName:"-1",
                state:"3"
            },
            //添加form
            form:{
                userName:"",
                password:"",
                roleName:"",
                roleId:null
            },
            //编辑form
            formEdit:{
                userName:"",
                password:"",
                roleName:"",
                roleId2:null
            },
            dataRole:[], //角色列表
            searchData: [], //列表数据
            authority:['超级管理员','管理员'], //可操作的权限
            usable:false, //按钮是否可用
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:20,
                total:0,
            },
            //表单验证规则
            rules: {
                userName: [
                    { required: true, message: '请输入用户名',  trigger: ['blur']}
                ],
                password: [
                    { required: true, message: '请输入密码',  trigger: ['blur']}
                ],
                roleName: [
                    { required: true, message: '请选择角色',  trigger: ['blur']}
                ]
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
        //添加用户弹窗
        DialogShow() {
            this.DialogAddManagers = true;
        },
        //添加用户角色选择器
        selectGet(val){
            this.form.roleId = val;
        },
        //编辑用户角色
        selectChange(val){
            this.formEdit.roleId2 = val;
        },
        //添加用户
        onAddManagers(form){
            this.$refs[form].validate((valid) => {
                if(valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/addUser",
                        params: {
                            roleId:parseInt(this.form.roleId),
                            userName:this.form.userName,
                            passWord:this.form.password,
                            date:new Date().getTime()
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: "用户添加成功",
                                type: 'success'
                            });
                            this.onSearch();
                        }else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                    })
                    this.DialogAddManagers = false;
                }else{
                    this.$message({
                        showClose: true,
                        message: '请输入正确信息!',
                        type: 'error'
                    });
                    return false;
                }
            })
        },
        //查询管理员列表
        onSearch(){
            this.loadingTable = true;
            this.$request({
                method:'get',
                url:"/apis/member/findUserAll",
                params: {
                    userName:this.formSearch.userName,
                    roleId2:parseInt(this.formSearch.roleName),
                    isEnabled:parseInt(this.formSearch.state),
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    let list = response.data.data.list;
                    for(let i = 0; i < list.length; i++){
                        if(list[i].isEnabled){
                            list[i].isEnabled = "已启用";
                            list[i].enable = true;
                        }else{
                            list[i].isEnabled = "已停用";
                            list[i].blockUp = true;
                        }
                        
                        if(response.data.map.role[i]){
                            list[i].roleName = response.data.map.role[i].roleName;
                            list[i].roleDesc = response.data.map.role[i].roleDesc;
                        }
                    }
                    this.searchData = list;
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.total = response.data.data.total
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },100)
            })
        },
        //删除管理员
        onDelete(id,userName){
            this.$confirm('是否删除 '+userName+" 管理员", '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'get',
                    url:"/apis/member/delUser",
                    params: {
                        id:id,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: "删除操作成功!",
                            type: 'success'
                        });
                    }else{
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
        //停用管理员
        onBlockUp(id,userName){
            this.$confirm('是否停用 '+userName+" 管理员", '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.handleUser(id);
            }).catch(() => {});
        },
        //启用管理员
        onEnable(id,userName){
            this.$confirm('是否启用 '+userName+" 管理员", '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.handleUser(id);
            }).catch(() => {});
        },
        //管理员停用或启用操作
        handleUser(id){
            this.$request({
                method:'get',
                url:"/apis/member/stopOrStartUser",
                params: {
                    id:id,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: "操作成功!",
                        type: 'success'
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                this.onSearch();
            })
        },
        //单元格样式
        cellStyle({row,columnIndex,rowIndex}){
            if(columnIndex == 4 && row.isEnabled == '已停用'){
                return 'color:red;'
            }
            if(rowIndex==0 && columnIndex == 6){
                if(this.$store.state.infoData.roleName != '超级管理员'){
                    return 'display:none;'
                }
            }
        },
        //查询所有角色
        onSearchRole(){
            this.$request({
                method:'get',
                url:"/apis/member/findRoleAll",
                params: {
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.dataRole = response.data.data;
                    this.form.roleName = response.data.data[0].roleName;
                    this.form.roleId = response.data.data[0].id;
                    this.onSearch();
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        //弹窗编辑管理员
        diologEdit(row){
            this.DialogEditManagers = true;
            this.formEdit = {
                id:row.id,
                userName:row.userName,
                roleName:row.roleName,
                roleId2:row.roleId2,
                state:row.isEnabled
            }
        },
        //编辑管理员
        onEdit(){
            this.$request({
                method:'post',
                url:"/apis/member/updateUserRole",
                params: {
                    id:this.formEdit.id,
                    roleId:this.formEdit.roleId2
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message:"修改管理员成功！",
                        type: 'success'
                    });
                    //如果修改已登录的自身角色，需要页面刷新，更新路由
                    if(this.formEdit.userName === this.$store.state.infoData.userName){
                        window.location.reload();
                        return;
                    }
                    this.onSearch();
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                this.DialogEditManagers = false;
            })
        }
    },
    created() {
        this.onSearch();
        this.onSearchRole();
        //判断是否操作权限
        if(this.$store.state.powerArr.indexOf("添加、编辑、删除角色") != -1){
            this.usable = true;
        }else{
            this.usable = false;
        }
    }
};
</script>

<style scoped>
.el-select{
    display: block;
}
.btn-edit{
    background: #8bc34a;
    border-color: #8bc34a;
}
</style>

