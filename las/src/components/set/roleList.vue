<template>
    <el-form  label-width="90px">
        <el-row>
            <el-col :span="24">
                <router-link to="/roleMenu">
                    <el-button type="primary" v-if="usable" @click="onSearch" icon="el-icon-plus">添加角色</el-button>
                </router-link>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    v-loading="loadingTable" 
                    border
                    :cell-style="tableStyle" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="roleName" label="角色"></el-table-column>
                    <el-table-column prop="roleDesc" label="角色描述" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createDate" label="创建时间"></el-table-column>
                    <el-table-column prop="creator" label="创建人"></el-table-column>
                    <el-table-column label="操作" v-if="usable">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" @click="toRoleMenu(scope.row)">编 辑</el-button>
                            <el-button  size="mini" type="danger" @click="onRemove(scope.row)">删 除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
export default {
    name:"roleList",
    data() {
        return {
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            usable:false, //按钮是否可用
        };
    },
    methods: {
        //点击查询所有角色表
        onSearch() {
            this.loadingTable = true;
            this.$request({
                method:'get',
                url:"/apis/member/findRoleAll",
                params: {
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data;
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
        toRoleMenu(row){
            this.$router.push({
                name:'roleMenu',
                params:{
                    data:row
                }
            })
        },
        //表格样式(只在超级管理员才有操作自身权限)
        tableStyle({row,columnIndex,rowIndex}){
            if(rowIndex==0 && columnIndex == 4){
                if(this.$store.state.infoData.roleName != '超级管理员'){
                    return 'display:none;'
                }
            }
        },
        //删除角色
        onRemove(row){
            this.$confirm('是否删除角色： '+row.roleName+' ?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                 type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'get',
                    url:"/apis/member/delRole",
                    params: {
                        id:row.id,
                        date:new Date().getTime()
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: "删除"+row.roleName+"成功!",
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
            })
        }
    },
    created() {
        this.onSearch();
        //判断是否操作权限
        if(this.$store.state.powerArr.indexOf("添加、编辑、删除角色") != -1){
            this.usable = true;
        }else{
            this.usable = false;
        }
    }
};
</script>

