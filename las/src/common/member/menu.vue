<template>
    <el-aside :class="isCollapse?'close':'open'">
        <div class="top">
            <h1>乐安士后台管理系统</h1>
            <span><img src="../../../static/images/logo.png" alt="logo"></span>
        </div>
        <el-menu  :default-active="activeItem"  background-color="#20222a" text-color="#f1f1f1" active-text-color="#02c1b3" :collapse="isCollapse" style="padding-bottom:100px;">
            <!-- <el-submenu index="1" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-huiyuan"></i>
                    <span slot="title">会员管理</span> 
                </template>
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
                    <router-link to="/tree">
                        <el-menu-item index="1-4">会员树状图</el-menu-item>
                    </router-link>
                </el-menu-item-group>
                <el-submenu index="1-5">
                    <template slot="title">修改会员信息</template>
                    <router-link to="/basicInfo">
                        <el-menu-item index="1-5-1">修改基本信息</el-menu-item>
                    </router-link>
                    <router-link to="/sensitiveinfo">
                        <el-menu-item index="1-5-2">修改敏感信息</el-menu-item>
                    </router-link>
                    <router-link to="/reName">
                        <el-menu-item index="1-5-3">会员更名</el-menu-item>
                    </router-link>
                    <router-link to="/changeReferee">
                        <el-menu-item index="1-5-4">更改推荐人</el-menu-item>
                    </router-link>
                    <router-link to="/changeLevel">
                        <el-menu-item index="1-5-5">更改会员级别</el-menu-item>
                    </router-link>
                    <router-link to="/bindingOld">
                        <el-menu-item index="1-5-6">与老会员绑定</el-menu-item>
                    </router-link>
                    <router-link to="/queryRecord">
                        <el-menu-item index="1-5-7">修改记录查询</el-menu-item>
                    </router-link>
                    <router-link to="/toExamine">
                        <el-menu-item index="1-5-8" :class="message1?'message':''">审核管理</el-menu-item>
                    </router-link>
                </el-submenu>
                <el-submenu index="1-6">
                    <template slot="title">会员状态维护</template>
                    <router-link to="/mState">
                        <el-menu-item index="1-6-1">会员状态积分管理</el-menu-item>
                    </router-link>
                    <router-link to="/mStateRecord">
                        <el-menu-item index="1-6-2">会员冻结注销记录</el-menu-item>
                    </router-link>
                    <router-link to="/mIntegralFreezing">
                        <el-menu-item index="1-6-3">会员积分冻结记录</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-submenu>
            <el-submenu index="2" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-jiangli-"></i>
                    <span slot="title">会员奖励</span> 
                </template>
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
                    <router-link to="/recommend">
                        <el-menu-item index="2-3-4">推荐列表</el-menu-item>
                    </router-link>
                    <router-link to="/memberArrears">
                        <el-menu-item index="2-3-5">会员欠款表</el-menu-item>
                    </router-link>
                    <router-link to="/arrearsDetailed">
                        <el-menu-item index="2-3-6">会员欠款明细表</el-menu-item>
                    </router-link>
                    <router-link to="/arrearsToExamine">
                        <el-menu-item index="2-3-7">会员欠款申请审核</el-menu-item>
                    </router-link>
                </el-submenu>
            </el-submenu>
            <el-submenu index="3" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-integral"></i>
                    <span slot="title">会员积分管理</span>
                </template>
                    <el-menu-item-group>
                        <router-link to="/IntegralQuery">
                            <el-menu-item index="3-1">会员积分查询</el-menu-item>
                        </router-link>
                        <router-link to="/IntegralRule">
                            <el-menu-item index="3-2">会员规则设置</el-menu-item>
                        </router-link>
                        <router-link to="/presentToExamine">
                            <el-menu-item index="3-3">会员提现审核</el-menu-item>
                        </router-link>
                        <router-link to="/presentRecord">
                            <el-menu-item index="3-4">提现记录</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-icon-"></i>
                    <span slot="title">财务管理</span>
                </template>
                    <el-menu-item-group>
                        <router-link to="/companyAccount">
                            <el-menu-item index="4-1">公司账户汇总</el-menu-item>
                        </router-link>
                        <router-link to="/memberAccount">
                            <el-menu-item index="4-2">会员账户余额汇总</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-navicon-kcgl"></i>
                    <span slot="title">库存管理</span>
                </template>
                    <el-menu-item-group>
                        <router-link to="/WHManagement">
                            <el-menu-item index="5-1">仓库管理</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                    <el-submenu index="5-2">
                        <template slot="title">库存对账</template>
                        <router-link to="/createAdjust">
                            <el-menu-item index="5-2-1">创建调整单</el-menu-item>
                        </router-link>
                        <router-link to="/adjustToExamine">
                            <el-menu-item index="5-2-2">调整单审核</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-submenu index="5-3">
                        <template slot="title">货物调拨</template>
                        <router-link to="/createAllocation">
                            <el-menu-item index="5-3-1">创建调拨单</el-menu-item>
                        </router-link>
                        <router-link to="/allocationToxamine">
                            <el-menu-item index="5-3-2">调拨单审核</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-menu-item-group>
                        <router-link to="/stockToExamine">
                            <el-menu-item index="5-4">进货单审核</el-menu-item>
                        </router-link>
                        <router-link to="/stockForm">
                            <el-menu-item index="5-5">入库报表</el-menu-item>
                        </router-link>
                        <router-link to="/outForm">
                            <el-menu-item index="5-6">出库报表</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                    <el-submenu index="5-7">
                        <template slot="title">预警管理</template>
                        <router-link to="/WHwarning">
                            <el-menu-item index="5-7-1">库存预警</el-menu-item>
                        </router-link>
                        <router-link to="/QGPwarning">
                            <el-menu-item index="5-7-2">保质期预警</el-menu-item>
                        </router-link>
                    </el-submenu>
                    <el-menu-item-group>
                        <router-link to="/dailyReport">
                            <el-menu-item index="5-8">进销存日报表</el-menu-item>
                        </router-link>
                        <router-link to="/monthlyReport">
                            <el-menu-item index="5-9">进销存月报表</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" class="menu-one">
                <template slot="title">
                    <i class="icon iconfont icon-xitongshezhipx"></i>
                    <span slot="title">系统设置</span>
                </template>
                    <el-menu-item-group>
                        <router-link to="/managers">
                            <el-menu-item index="6-1">管理员列表</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <router-link to="/roleList">
                            <el-menu-item index="6-2">角色权限管理</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
            </el-submenu> -->
            <!-- //测试 -->
            
            <el-submenu index="1" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-huiyuan"></i>
                    <span slot="title">会员管理</span> 
                </template>
                <el-menu-item-group v-for="(item,index) in menuData" :key="index">
                    <router-link v-if="item.meta.menuIndex.indexOf('1-') != -1 && item.meta.menuIndex.length == 3 && item.menuBar" :to="item.path">
                        <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                    </router-link>
                </el-menu-item-group>
                <el-submenu index="1-5">
                    <template slot="title">修改会员信息</template>
                    <div v-for="(item,index) in menuData" :key="index">
                        <router-link v-if="item.meta.menuIndex.indexOf('1-5-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
                            <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                        </router-link>
                    </div>
                </el-submenu>
                <el-submenu index="1-6">
                    <template slot="title">会员状态维护</template>
                    <div v-for="(item,index) in menuData" :key="index">
                        <router-link v-if="item.meta.menuIndex.indexOf('1-6-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
                            <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                        </router-link>
                    </div>
                </el-submenu>
            </el-submenu>

            <el-submenu index="2" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-jiangli-"></i>
                    <span slot="title">会员奖励</span> 
                </template>
                 <el-submenu index="2-1">
                    <template slot="title">周期管理</template>
                    <div v-for="(item,index) in menuData" :key="index">
                         <router-link v-if="item.meta.menuIndex.indexOf('2-1-') != -1 && item.meta.menuIndex.length == 5" :to="item.path">
                            <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                        </router-link>
                    </div>
                </el-submenu>
                <el-submenu index="2-2">
                        <template slot="title">周期奖励计算</template>
                        <router-link to="/cycleCount">
                            <el-menu-item index="2-2-1">周期结算</el-menu-item>
                        </router-link>
                    </el-submenu>
                <el-submenu index="2-3">
                    <template slot="title">会员奖金查询</template>
                    <div v-for="(item,index) in menuData" :key="index">
                         <router-link v-if="item.meta.menuIndex.indexOf('2-3-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
                            <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                        </router-link>
                    </div>
                </el-submenu>
            </el-submenu>

            <el-submenu index="3" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-integral"></i>
                    <span slot="title">会员积分管理</span>
                </template>
                <el-menu-item-group v-for="(item,index) in menuData" :key="index">
                        <router-link v-if="item.meta.menuIndex.indexOf('3-') != -1 && item.meta.menuIndex.length == 3 && item.menuBar" :to="item.path">
                        <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
            
            <el-submenu index="4" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-icon-"></i>
                    <span slot="title">财务管理</span>
                </template>
                    <el-menu-item-group v-for="(item,index) in menuData" :key="index">
                         <router-link v-if="item.meta.menuIndex.indexOf('4-') != -1 && item.meta.menuIndex.length == 3 && item.menuBar" :to="item.path">
                            <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
            </el-submenu>

            <el-submenu index="5" class="menu-one">
                <template slot="title">
                    <i class="iconfont icon-navicon-kcgl"></i>
                    <span slot="title">库存管理</span>
                </template>
                    <el-menu-item-group v-for="(item,index) in menuData" :key="index">
                         <router-link v-if="item.meta.menuIndex.indexOf('5-') != -1 && item.meta.menuIndex.length == 3 && item.menuBar" :to="item.path">
                            <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                    <el-submenu index="5-2">
                        <template slot="title">库存对账</template>
                        <div v-for="(item,index) in menuData" :key="index">
                            <router-link v-if="item.meta.menuIndex.indexOf('5-2-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
                                <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                            </router-link>
                        </div>
                    </el-submenu>
                    <el-submenu index="5-3">
                        <template slot="title">货物调拨</template>
                        <div v-for="(item,index) in menuData" :key="index">
                            <router-link v-if="item.meta.menuIndex.indexOf('5-3-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
                                <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                            </router-link>
                        </div>
                    </el-submenu>
                    <el-submenu index="5-7">
                        <template slot="title">预警管理</template>
                        <div v-for="(item,index) in menuData" :key="index">
                            <router-link v-if="item.meta.menuIndex.indexOf('5-7-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
                                <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                            </router-link>
                        </div>
                    </el-submenu>
            </el-submenu>

             <el-submenu index="6" class="menu-one">
                <template slot="title">
                    <i class="icon iconfont icon-xitongshezhipx"></i>
                    <span slot="title">系统设置</span>
                </template>
                <el-menu-item-group v-for="(item,index) in menuData" :key="index">
                        <router-link v-if="item.meta.menuIndex.indexOf('6-') != -1 && item.meta.menuIndex.length == 3 && item.menuBar" :to="item.path">
                        <el-menu-item :index="item.meta.menuIndex">{{item.meta.title}}</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
                    
        </el-menu>

    </el-aside>
</template>

<script>
import util from "../../util/util.js";
export default {
    name: "menu-com",
    data() {
        return {
            MenuWidth:220,
            isCollapse:false, //菜单默认展开
            activeItem:'1-3',
            message1:false,
            menuTitle:['修改会员信息','会员状态维护','会员奖励','周期管理','周期奖励计算','会员奖金查询','会员积分管理','财务管理','库存管理','库存对账','货物调拨','预警管理','系统设置'],
            menuData:[
                '会员管理',
                {
                    label: '会员管理',
                    meta:{
                        path:"/addMember",
                        menuIndex:"1-1",
                    }
                }
            ]
        }
    },
    methods: {
        onCloseTab(){
            this.isCollapse = !this.isCollapse;
        }
        
    },
    watch:{
        $route(to,from){
            this.activeItem = this.$route.meta.menuIndex;
        }
    },
    created(){
        let menuData = this.$store.state.roleData;
        this.menuData = menuData;
        console.log(menuData)
        // let arr = [];
        // let j = 0; 
        // for(let i = 1; i < menuData.length; i++){
        //     if(typeof(menuData[i]) != 'string'){
        //         let ind = menuData[i].meta.menuIndex;
        //         if(ind.substr(ind.length-1,1)=='1'){
        //             menuData.splice(i,0,this.menuTitle[j]);
        //             j++;
        //         }
        //     }
        // }
        // console.log(menuData)
    }
};
</script>

<style>  
.el-aside .top {
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #20222a;
}
.el-aside.open .top h1 {
    background: #979797;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
    font-weight: normal;
}
.el-aside .top img{
    max-width:70px;
}
.el-aside.open .top span,
.el-aside.close .top h1{
    display: none;
}
.el-aside.close .top span{
    display: block;
}
.main .el-aside .el-menu {
    border: none;
    height: 100%;
    padding-right: 10px;
    overflow: hidden;
    transition: all .5s ease;
}
.main .el-aside.open .el-menu {
    width: 238px;
    overflow: auto;
}
.main .el-aside.close .el-menu {
    width: auto;
    overflow: hidden;
}
.main .el-aside .el-submenu__title i {
    color: #fff;
}
.main .el-aside{
    transition: all .5s ease;
}
.main .el-aside.open{
    width:220px !important;
    overflow: hidden;
    padding-bottom: 55px;
}
.main .el-aside.close {
    width:55px !important;
    overflow: hidden;
}
.el-menu-item-group__title{
    display: none;
}
.main .el-submenu .el-menu-item,
.main .el-menu-item,
.main .el-submenu__title {
    height: 40px;
    line-height: 40px;
}
.main .el-menu-item.message::after{
    content: "";
    display: inline-block;
    width:8px;
    height: 8px;
    background: red;
    border-radius: 50%;
    margin-left:5px; 
}
.menu-one > .el-submenu__title {
    background: #20222a !important;
}
.menu-one.el-submenu.is-active > .el-submenu__title{
    border-left:3px solid #02c1b3;
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
    border-bottom: 1px solid #000;
}
.main .el-submenu.is-active .el-submenu__title {
    border-bottom-color: #20222a; 
}

body > .el-menu--vertical > .el-menu--popup{
    margin-left:15px;
}
.el-menu--popup .el-menu-item,
.el-menu--popup .el-submenu__title {
    height: 36px;
    line-height: 36px;
}
</style>
