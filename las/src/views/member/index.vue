<template>
    <el-container class="main">
        <!-- 左边菜单栏 -->
        <menu-com ref="menu"></menu-com>

        <el-container class="Content">
            <div class="wrap">
                    <!-- 头部信息 -->
                <header-com @closeTab="onCloseTab"></header-com>
                    <!-- <content-com> -->
                <div class="rightContent">
                    <div class="box-boder">
                        <h2 class="title">{{title}}</h2>
                        <div class="box">
                            <keep-alive :include="keepAlive">
                                <router-view class="child-view"></router-view> 
                            </keep-alive>
                        </div>
                    </div>
                </div>
                <!-- </content-com> -->
            </div>
        </el-container>

    </el-container>

</template>

<script>
import MenuCom from "../../common/member/menu";
import HeaderCom from "../../common/member/header";
import ContentCom from "../../common/member/content";

export default {
    name: "index",
    components: {
        [MenuCom.name]: MenuCom,
        [HeaderCom.name]: HeaderCom,
        [ContentCom.name]: ContentCom
    },
    data() {
        return {
            title:"",
            keepAlive:[]
        }
    },
    methods: {
        onCloseTab(){
            this.$refs.menu.onCloseTab();
        }
    },
    watch:{
        $route() {
            this.keepAlive = this.$store.state.tagsview.keepAlive;
            this.title = this.$route.meta.title;
        }
    },
    created(){
        this.title = this.$route.meta.title;
    }
};
</script>

<style>
.main {
    height: 100%;
}
.main .Content {
    overflow: hidden;
}
.wrap {
    width: 100%;
}
.wrap .rightContent {
    height: 100%;
    overflow:scroll;
    background: #f2f2f2;
}
.wrap .el-breadcrumb {
    padding: 20px;
    background: #fff;
}
.wrap .title {
    padding:10px;
    font-size:20px;
    font-weight: 600;
    background: #fff;
    border-bottom: 1px solid #eae9e9;
}
.wrap .box-boder {
    padding:15px 0 30px 10px;
}
.wrap .box {
    padding: 30px 30px 100px;
    background: #fff;
}

</style>
