<template>
    <el-container class="main">
        <!-- 左边菜单栏 -->
        <menu-com ref="menu"></menu-com>

        <el-container class="Content">
                <!-- 右边内容区域 -->
                <content-com>
                    <!-- 头部信息 -->
                    <header-com slot="header" @closeTab="onCloseTab"></header-com>
                </content-com>
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
            
        }
    },
    methods: {
        onCloseTab(){
            this.$refs.menu.onCloseTab();
        }
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

</style>
