<template>
    <el-container class="main">
        <!-- 左边菜单栏 -->
        <menu-com ref="menu"></menu-com>

        <el-container class="Content">
            <div class="wrap">
                <!-- 头部信息 -->
                <header-com slot="header" @closeTab="onCloseTab"></header-com>
                <div class="rightContent">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item to="/"><i class="iconfont icon-shouye"></i> 首页</el-breadcrumb-item> 
                        <el-breadcrumb-item >404</el-breadcrumb-item> 
                    </el-breadcrumb>

                    <div class="box-boder">
                        <div class="box">
                            <i class="icon iconfont icon-kulian"></i>
                            <div class="text">
                                <span>4</span>
                                <span class="t">0</span>
                                <span>4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-container>

    </el-container>

</template>

<script>
import MenuCom from "../../common/member/menu";
import HeaderCom from "../../common/member/header";

export default {
    name: "index",
    components: {
        [MenuCom.name]: MenuCom,
        [HeaderCom.name]: HeaderCom
    },
    methods: {
        onCloseTab(){
            this.$refs.menu.onCloseTab();
        }
    }
};
</script>

<style scoped>
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
    color:#666;
}

.wrap .box-boder {
    padding:10px 0 30px 10px;
}
.wrap .el-breadcrumb__inner.is-link{
    font-weight: bold;
    color: #303133;
}
.wrap .box {
    background: #f2f2f2;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding:60px;
}
.wrap .box i{
    display: block;
    font-size:300px;
    font-weight: 300;
    color:#393D49;
}


.wrap .box .text{
    width:100%;
    text-align: center;
    font-size: 100px;
    line-height: 100px;
    color: #009688;
    font-weight: 500;
    font-family: Arial;
}
.wrap .box .text::before{
    content:"";
    display: block;
    margin:30px auto;
    width:500px;
    height: 5px;
    background: #009688;
}
.wrap .box .text span.t{
    display: inline-block;
    animation: rotate 1s  infinite linear;
}
@keyframes rotate {
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
}
</style>
