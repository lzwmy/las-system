<template>
    <el-aside>
        <div class="top">
            <h1>乐安士后台管理系统</h1>
        </div>
        <el-menu :default-openeds="['2', '2-3']" background-color="#20222a" text-color="#f1f1f1" active-text-color="#02c1b3">
            <el-submenu index="2" class="menu-one">
                <template slot="title">
                    <i class="el-icon-message"></i>会员管理</template>
                <el-menu-item-group>
                    <router-link to="/addMember">
                        <el-menu-item index="2-1">新增会员</el-menu-item>
                    </router-link>
                    <router-link to="/memberList">
                        <el-menu-item index="2-2">会员列表</el-menu-item>
                    </router-link>
                </el-menu-item-group>
                <el-submenu index="2-3">
                    <template slot="title">修改会员信息</template>
                    <router-link to="/basicInfo">
                        <el-menu-item index="2-3-1">修改基本信息</el-menu-item>
                    </router-link>
                    <router-link to="/sensitiveinfo">
                        <el-menu-item index="2-3-2">修改敏感信息</el-menu-item>
                    </router-link>
                    <router-link to="/reName">
                        <el-menu-item index="2-3-3">会员更名</el-menu-item>
                    </router-link>
                    <router-link to="/changeReferee">
                        <el-menu-item index="2-3-4">更改推荐人</el-menu-item>
                    </router-link>
                    <router-link to="/changeLevel">
                        <el-menu-item index="2-3-5">更改会员级别</el-menu-item>
                    </router-link>
                    <router-link to="/bindingOld">
                        <el-menu-item index="2-3-6">与老会员绑定</el-menu-item>
                    </router-link>
                    <router-link to="/queryRecord">
                        <el-menu-item index="2-3-7">修改记录查询</el-menu-item>
                    </router-link>
                    <router-link to="/toExamine">
                        <el-menu-item index="2-3-8">审核管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="2-4">
                    <template slot="title">会员状态维护</template>
                    <router-link to="/">
                        <el-menu-item index="2-4-1">会员登陆密码重置</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-4-2">会员积分账户激活</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-4-3">会员支付密码修改</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-4-4">会员冻结与解冻</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-4-5">会员冻结记录</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-4-6">积分账户冻结与解冻</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-4-7">积分冻结记录</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-3-8">会员注稍</el-menu-item>
                    </router-link>
                    <router-link to="/">
                        <el-menu-item index="2-3-9">会员注销记录</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
import util from "../../util/util.js";
export default {
    name: "menu-com",
    methods: {}
};
</script>

<style>
.top {
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #20222a;
}
.top h1 {
    background: #979797;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
    font-weight: normal;
}
.main .el-menu {
    border: none;
    height: 100%;
    width: 238px;
    padding-right: 10px;
    overflow: auto;
}
.main .el-submenu__title i {
    color: #fff;
}
.main .el-aside {
    width: 220px !important;
    overflow: hidden;
    padding-bottom: 55px;
}

.main .el-submenu .el-menu-item,
.main .el-menu-item,
.main .el-submenu__title {
    height: 40px;
    line-height: 40px;
}
.menu-one > .el-submenu__title {
    background: #20222a;
}
</style>
