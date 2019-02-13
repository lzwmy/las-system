<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="DialogShow" icon="el-icon-plus">添加管理员</el-button>
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
                    <el-table-column prop="name" label="账号">
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
                            <el-button  size="mini" type="danger" >删 除</el-button>
                            <el-button  size="mini" type="wraning" >停 用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>  

        <!-- 添加管理员弹出层 -->
        <el-dialog title="添加管理员" :visible.sync="DialogAddManagers" width="450px" center>
            <el-form :model="form" label-width="70px" label-position="left">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="密码" prop="name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="角色设置" >
                            <el-select v-model="form.marg">
                                <el-option label="普通客服" value="普通客服"></el-option>
                                <el-option label="研发人员" value="研发人员"></el-option>
                                <el-option label="超级管理员" value="超级管理员"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogAddManagers = false">取 消</el-button>
                <el-button type="primary" @click="onAddManagers()">添 加</el-button>
            </span>
        </el-dialog> 
    </div>
</template>


<script>
export default {
    name:"mStateRecord",
    data() {
        return {
            loadingTable:false, //加载列表
            DialogAddManagers:false,
            searchData: [{
                name:"admin",
                n:"王小虎"
            }], //列表数据
            form:{
                name:"",
                marg:"普通客服"
            }
        };
    },
    methods: {
        //点击查询表
        DialogShow() {
            this.DialogAddManagers = true;
        },
        onAddManagers(){
            this.DialogAddManagers = false;
        }
    },
    created() {
        // this.onSearch();
    }
};
</script>

<style scoped>
.el-select{
    display: block;
}
</style>

