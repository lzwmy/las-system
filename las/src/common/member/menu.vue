<template>
    <el-aside :class="isCollapse?'close':'open'">
        <div class="top">
            <h1>乐安士后台管理系统</h1>
            <span><img src="../../../static/images/logo.png" alt="logo"></span>
        </div>
        <el-menu  :default-active="activeItem"  background-color="#20222a" text-color="#f1f1f1" active-text-color="#02c1b3" :collapse="isCollapse" style="padding-bottom:100px;"> 
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
                <el-submenu index="1-7">
                    <template slot="title">老系统会员数据绑定</template>
                    <div v-for="(item,index) in menuData" :key="index">
                        <router-link v-if="item.meta.menuIndex.indexOf('1-7-') != -1 && item.meta.menuIndex.length == 5 && item.menuBar" :to="item.path">
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
        this.menuData = this.$store.state.roleData;
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
