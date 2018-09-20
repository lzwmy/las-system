<template>
    <div class="wrap">
        <slot name="header"></slot>
        <div class="rightContent">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item to="/">首页</el-breadcrumb-item> 
                <el-breadcrumb-item v-for="(item,index) in breadlist" :key="index" :to="item.path">{{item.title}}</el-breadcrumb-item> 
            </el-breadcrumb>

            <h2 class="title">{{title}}</h2>

            <div class="box-boder">
                <div class="box">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import util from "../../util/util.js";
export default {
    name: "content-com",
    data() {
        return {
            title: "",
            breadlist: "" //面包屑列表
        };
    },
    created() {
        this.getbreadlist();
    },
    mounted() {
        // this.breadlist = this.$route.matched.map(items => {
        //     return {
        //         title: items.name,
        //         path: items.path
        //     };
        // });
        // const first = matched[0];
        // if (first && (first.name !== '首页' || first.path !== '')) {
        //      matched = [{ name: '首页', path: '/index' }].concat(matched)

        // }
        // this.bread = this.$route.matched;
    },
    methods: {
        getbreadlist() {
            this.breadlist = this.$route.matched.map(items => {
                return {
                    title: items.name,
                    path: items.path
                };
            });
            this.title = this.breadlist[this.breadlist.length-1].title;
        }
    },
    watch: {
        $route() {
            this.getbreadlist(); 
        }
    }
};
</script>

<style scoped>
.wrap {
    width: 100%;
}
.rightContent {
    height: 100%;
    overflow:scroll;
    background: #f2f2f2;
}
.el-breadcrumb {
    padding: 20px;
    background: #fff;
}
.title {
    padding:0  0 20px 20px;
    font-size:20px;
    font-weight: 600;
    background: #fff;
}
.box-boder {
    padding:10px 0 30px 10px;
}
.box {
    padding: 30px;
    background: #fff;
}
</style>



