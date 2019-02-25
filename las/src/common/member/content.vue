<template>
    <div class="wrap">
        <slot name="header"></slot>
        <div class="rightContent">
            <div class="box-boder">
                <h2 class="title">{{title}}</h2>
                <div class="box">
                    <keep-alive :include="keepAlive">
                        <!-- <router-view class="child-view"></router-view>  -->
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "content-com",
    data() {
        return {
            title:"",
            keepAlive:[]
        };
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



