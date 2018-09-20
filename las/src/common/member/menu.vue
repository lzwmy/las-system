<template>
    <el-aside>
        <div class="top">
            <h1>乐安士后台管理系统</h1>
        </div>
        <el-menu :default-openeds="['1', '2']" background-color="#20222a" text-color="#f1f1f1" active-text-color="#02c1b3">
            <el-submenu index="1" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-guanli"></i> 会员管理</template>
                <el-menu-item-group>
                    <router-link to="/addMember">
                        <el-menu-item index="1-1">新增会员</el-menu-item>
                    </router-link>
                    <router-link to="/addMemberList">
                        <el-menu-item index="1-2">新增会员列表</el-menu-item>
                    </router-link>
                    <router-link to="/memberList">
                        <el-menu-item index="1-3">会员列表</el-menu-item>
                    </router-link>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">修改会员信息</template>
                    <router-link to="/basicInfo">
                        <el-menu-item index="1-4-1">修改基本信息</el-menu-item>
                    </router-link>
                    <router-link to="/sensitiveinfo">
                        <el-menu-item index="1-4-2">修改敏感信息</el-menu-item>
                    </router-link>
                    <router-link to="/reName">
                        <el-menu-item index="1-4-3">会员更名</el-menu-item>
                    </router-link>
                    <router-link to="/changeReferee">
                        <el-menu-item index="1-4-4">更改推荐人</el-menu-item>
                    </router-link>
                    <router-link to="/changeLevel">
                        <el-menu-item index="1-4-5">更改会员级别</el-menu-item>
                    </router-link>
                    <router-link to="/bindingOld">
                        <el-menu-item index="1-4-6">与老会员绑定</el-menu-item>
                    </router-link>
                    <router-link to="/queryRecord">
                        <el-menu-item index="1-4-7">修改记录查询</el-menu-item>
                    </router-link>
                    <router-link to="/toExamine">
                        <el-menu-item index="1-4-8">审核管理</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-jiangli"></i> 会员奖励</template>
                 <el-submenu index="2-1">
                    <template slot="title">周期管理</template>
                    <router-link to="/cycleManage">
                        <el-menu-item index="2-1-1">周期管理</el-menu-item>
                    </router-link>
                    <router-link to="/cycleChangeLog">
                        <el-menu-item index="2-1-2">周期切换日志</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="2-2">
                        <template slot="title">周期奖励计算</template>
                        <router-link to="/cycleCount">
                            <el-menu-item index="2-2-1">周期结算</el-menu-item>
                        </router-link>
                    </el-submenu>
                <el-submenu index="2-3">
                    <template slot="title">会员奖金查询</template>
                    <router-link to="/historicalBonus">
                        <el-menu-item index="2-3-1">历史奖金表</el-menu-item>
                    </router-link>
                    <router-link to="/bonusgGant">
                        <el-menu-item index="2-3-2">奖金发放明细表</el-menu-item>
                    </router-link>
                    <router-link to="/memberBonus">
                        <el-menu-item index="2-3-3">会员奖金明细表</el-menu-item>
                    </router-link>
                    <router-link to="/memberArrears">
                        <el-menu-item index="2-3-4">会员欠款表</el-menu-item>
                    </router-link>
                    <router-link to="/arrearsDetailed">
                        <el-menu-item index="2-3-5-1">会员欠款明细表</el-menu-item>
                    </router-link>
                    <router-link to="/arrearsToExamine">
                        <el-menu-item index="2-3-6">会员欠款申请审核</el-menu-item>
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
    background: #20222a !important;
}
.main .el-submenu__icon-arrow {
    font-size: 16px;
}
.main .el-icon-arrow-down:before {
    content:"\E60B";
}
.main .el-menu .el-menu-item,
.main .el-submenu__title{
    background: #000 !important;
}
.main .menu-one > .el-submenu__title{
    background: #20222a !important;
}
</style>
