<template>
    <div class="wrap">
        <slot name="header"></slot>
        <div class="rightContent">
            <div class="fixed">
                <div class="tags-view-container" ref="tags">
                    <div class="tags-view-wrap" ref="tagsview">
                        <router-link v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"  class="tags-view-item" :class="isActive(tag)?'active':''">
                            {{tag.name}}
                            <span class='el-icon-close' @click.prevent.stop="delSelectTag(tag)"></span>
                        </router-link>
                    </div>
                    
                </div>
                <div class="operation">
                    <div class="wrap-btn">
                        <span class="el-icon-arrow-left" @click="moveLeft"></span>
                        <span class="el-icon-arrow-right" @click="moveRight"></span>
                    </div>
                    <el-dropdown @command="handleCommand">
                        <span>关闭操作 <i class="el-icon-caret-bottom"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">关闭当前页</el-dropdown-item>
                            <el-dropdown-item command="2">关闭全部页</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>      
            </div>

            <div class="box-boder">
                    <h2 class="title">{{title}}</h2>
                <div class="box">
                    <router-view class="child-view"></router-view> 
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
            title: "会员列表",
            btnLeft:false,
            btnRight:true
        };
    },
    computed:{
        visitedViews(){//store中取值
            return this.$store.state.tagsview.visitedviews;
        }
    },
    methods: {
        //判断页签的路由是否为当前路由
        isActive(route){
            return route.path == this.$route.path;
        },
        //路由改变时执行的方法
        addViewTags(){
            let tagsWidth = this.$refs.tags.offsetWidth - 240;
            let tagsviewsWidth = this.$refs.tagsview.offsetWidth;
            let offsetLeft = this.$refs.tagsview.offsetLeft;
            // console.log(tagsviewsWidth+offsetLeft)
            console.log(offsetLeft)
            this.title = this.$route.name?this.$route.name:"无标题";
            if(this.$route.name){
                //标签页宽度大于于容器宽度时
                // if(tagsviewsWidth+offsetLeft >= tagsWidth){
                //     console.log("走1")
                //     this.$refs.tagsview.style.left = offsetLeft - tagsWidth/2 + 'px';
                // }else if(offsetLeft > 0){
                //     console.log("走2")
                //     this.$refs.tagsview.style.left = offsetLeft + tagsWidth/2 + 'px';
                // }
                const route = this.$route;
                this.$store.dispatch('addVisitedViews',route);
            }
        }, 
        //先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
        delSelectTag(route){
            this.$store.dispatch('delVisitedViews',route).then((views)=>{
                if(this.isActive(route)){//只有在关闭当前打开的标签页才会有影响
                    let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                    if(lastView){
                        this.$router.push(lastView);
                    }else{
                        this.$router.push('/');
                    }
                }
            })
        },
        //关闭全部标签页
        handleCommand(command) {
            if(command==2){
                this.$store.commit('DEL_VISITED_ALL');
            }else if(command==1){
                this.$store.dispatch('delVisitedViews',this.$route).then((views)=>{
                    if(this.isActive(this.$route)){//只有在关闭当前打开的标签页才会有影响
                        let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                        if(lastView){
                            this.$router.push(lastView);
                        }else{
                            this.$router.push('/');
                        }
                    }
                })
            }
            
        },
        //标签左移动
        moveLeft(){
            let tagsWidth = this.$refs.tags.offsetWidth-240;
            let offsetLeft = this.$refs.tagsview.offsetLeft;
            if(offsetLeft>=0){
                this.$refs.tagsview.style.left = '0px';
                return;
            }
            this.$refs.tagsview.style.left = offsetLeft + tagsWidth/2 + 'px';
        },
        moveRight(){
            let tagsWidth = this.$refs.tags.offsetWidth -240;
            let tagsviewsWidth = this.$refs.tagsview.offsetWidth;
            let offsetLeft = this.$refs.tagsview.offsetLeft;
            //标签页宽度小于容器宽度时
            if(tagsWidth >= tagsviewsWidth){
                this.$refs.tagsview.style.left = '0px';
            }else if(tagsviewsWidth+offsetLeft > tagsWidth){
                //标签页宽度大于容器宽度时
                this.$refs.tagsview.style.left = offsetLeft - tagsWidth/2 + 'px';
            }
        }
    },
    watch: {
        $route() {
            this.addViewTags();
        }
    }
};
</script>

<style scoped>
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
    margin-top:40px;
    padding:10px 0 30px 10px;
}
.wrap .box {
    padding: 30px 30px 100px;
    background: #fff;
}
.wrap .fixed{
    padding:5px 10px;
    background:#fff;
    position: fixed;
    height: 40px;
    width: 100%;
    z-index: 99;
    box-shadow: 0 2px 3px #e4e0e0;
}
.wrap .tags-view-container{
    position: relative;
    height: 26px;
    overflow: hidden;
}
.wrap .tags-view-wrap{
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    overflow: hidden;
    transition: all .2s;
}
.wrap .tags-view-wrap a{
    font-size:12px;
    display: inline-block;
    color:#666;
    margin:0 2px;
    padding:4px 5px;
    border:1px solid #ccc;
    border-radius: 2px;
    transition: all .3s;
}
.wrap .tags-view-wrap a:not(.active):hover{
    color:#333;
}
.wrap .operation{
    position: fixed;
    top:55px;
    right:0;
    width:150px;
    height: 45px;
    background: #fff;
    border-left:1px solid #eaeaea;
    z-index: 100;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.wrap .operation .wrap-btn span{
    cursor: pointer;
}   
.wrap .tags-view-wrap .active{
    background: #02c1b3;
    border-color:#02c1b3;
    color:#fff;
}
.wrap .tags-view-wrap .active::before{
    content:"";
    display: inline-block;
    width:7px;
    height: 7px;
    background: #fff;
    border-radius: 50%;
}
.wrap .tags-view-wrap .tags-view-item .el-icon-close{
    border-radius: 50%;
    padding: 1px;
    display: inline-block;
    transition: all .2s;
}
.wrap .tags-view-wrap .tags-view-item .el-icon-close:hover{
    color:#fff;
    background: #FF5722;
}


</style>



