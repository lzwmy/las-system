<template>
    <el-header>
        <i class="el-icon-menu close" @click="onCloseTab"></i>
        <span>用户：客服A</span>
        <span>权限：客服组</span>
        <span>当前业务期：201812</span>
        <span>登录时间：20181011 9:10</span>
        <span>
            <el-badge :value="20" :max="10" class="item">
                <i class="el-icon-bell"></i>
            </el-badge>
        </span>  
        <img src="http://via.placeholder.com/30x30" alt="头像" class="head-portrait">
        <el-dropdown @command="handleCommand">
            <span>王小虎</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">个人中心</el-dropdown-item>
                <el-dropdown-item command="2">切换用户</el-dropdown-item>
                <el-dropdown-item command="3">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
export default {
    name: "header-com",
    methods:{
        onCloseTab() {
            this.$emit("closeTab");
        },
        handleCommand(command) {
            if(command==3){
                this.$store.commit('changeLogin',{
                    Authorization:null
                }) 
                this.$router.push('/login');
            }
        }
        
    }
};
</script>

<style>
.el-header {
    background: #fff;
    color: #333;
    height: 54px !important;
    font-size: 12px;
    margin-bottom: 5px;
    box-shadow: 0 0 2px #c1c1c1;
    display:flex;
    align-items: center;
    justify-content: flex-end;
}
.el-header > span {
    margin: 0 30px;
    font-size: 14px;
}
i.close{
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    font-size:25px;
    color:#02C1B2;
    cursor: pointer;
}
.el-icon-bell {
    font-size:24px;
    position: relative;
}
.el-badge__content {
    border:none;
}
.head-portrait {
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
}
</style>
