<template>
    <el-form  label-width="90px">
        <el-row>
            <el-col :span="24">
                <router-link to="/roleMenu">
                    <el-button type="primary" @click="onSearch" icon="el-icon-plus">添加角色</el-button>
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
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="name" label="角色">
                    </el-table-column>
                    <el-table-column prop="n" label="昵称">
                    </el-table-column>
                    <el-table-column prop="" label="角色">
                    </el-table-column>
                    <el-table-column prop="" label="角色描述">
                    </el-table-column>
                    <el-table-column prop="" label="状态">
                    </el-table-column>
                    <el-table-column prop="" label="创建时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button  size="mini" type="primary" @click="toRoleMenu">编 辑</el-button>
                            <el-button  size="mini" type="danger" @click="onRemove(scope.row)">删 除</el-button>
                            <el-button  size="mini" type="wraning" @click="onPause(scope.row)">停 用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>   
    </el-form>
</template>


<script>
export default {
    name:"mStateRecord",
    data() {
        return {
            loadingTable:false, //加载列表
            searchData: [{
                name:"admin",
                n:"王小虎"
            }], //列表数据
        };
    },
    methods: {
        //点击查询表
        onSearch() {
            
        },
        toRoleMenu(){
            this.$router.push('/roleMenu')
        },
        //删除角色
        onRemove(row){
            this.$confirm('是否删除角色： '+row.name+' ?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                 type: 'warning',
                center: true
            }).then(() => {

            })
        },
        //停用角色 
        onPause(row){
            this.$confirm('是否停用角色： '+row.name+' ?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {

            })
        }
    },
    created() {
        // this.onSearch();
    }
};
</script>

