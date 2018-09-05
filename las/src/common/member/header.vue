<template>
    <el-header>
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
        <el-dropdown>
            <span>王小虎</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>切换用户</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<script>
export default {
    name: "header-com"
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
