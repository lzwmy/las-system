<template>
    <div class="head">
        <el-header>
            <i class="el-icon-menu close" @click="onCloseTab"></i>
            <span>用户：客服A</span>
            <span>权限：客服组</span>
            <span>当前业务期：201812</span>
            <span>登录时间：{{time}}</span>
            <span>
                <el-badge :value="20" :max="10" class="item">
                    <i class="el-icon-bell"></i>
                </el-badge>
            </span>  
            <img src="http://via.placeholder.com/30x30" alt="头像" class="head-portrait">
            <el-dropdown @command="handleCommand" type="danger">
                <span>王小虎</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">个人中心</el-dropdown-item>
                    <el-dropdown-item command="2" divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>

        <div class="tag-wrap">
            <div class="tags-view-container" ref="tags">
                <el-tabs v-model="activePath" :closable=true @tab-click="handleClick" @tab-remove="delSelectTag">
                    <el-tab-pane
                        v-for="(item,index) in Array.from(visitedViews)"
                        :key="index"
                        :label="item.meta.title"
                        :name="item.path">
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="operation">
                <el-dropdown  size="small" @command="handleTags">
                    <span>关闭操作 <i class="el-icon-caret-bottom"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">关闭当前页</el-dropdown-item>
                        <el-dropdown-item command="2">关闭其它页</el-dropdown-item>
                        <el-dropdown-item command="3">关闭全部页</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>       
        </div>
    </div>
</template>

<script>
export default {
    name: "header-com",
    data() {
        return {
            activePath:"/memberList",
            title: "会员列表",
            time:null,
            timer:null
        };
    },
    computed:{
        visitedViews(){//store中取值
            return this.$store.state.tagsview.visitedviews;
        }
    },
    mounted(){
        let _this = this;
        this.timer = setInterval(() => {
            let date = new Date();
            _this.time = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() +"  "+ date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
        }, 1000);
    },
    methods: {
        onCloseTab() {
            this.$emit("closeTab");
        },
        handleCommand(command) {
            if(command==2){
                this.$store.commit('changeLogin',{
                    Authorization:null
                }) 
                window.location.reload();
                this.$router.push('/login');
            }else if(command==1){
                this.$router.push('/info');
            }
        },

        handleClick(tab, event) {
            this.activePath = tab.name;
            let routerObj = {
                path:tab.name,
                name:tab.name.slice(1),
                meta:{
                    meta:tab.label
                }
            }
            this.$router.push(tab.name);
        },
        //路由改变时执行的方法
        addViewTags(){
            this.activePath = this.$route.path;
            if(this.$route.path){
                const route = this.$route;
                this.$store.dispatch('addVisitedViews',route);
            }
        }, 
        //先提交删除数据的方法,数组删除出掉数据后，如果关闭的是当前打开的路由需要将路由改为数组最后一次push进去的路由
        delSelectTag(targetName){
            this.$store.dispatch('delVisitedViews', targetName ).then((views)=>{
                let lastView = views.slice(-1)[0]//选取路由数组中的最后一位

                if(lastView){
                    this.$router.push(lastView);
                }else{
                    this.$router.push('/');
                }
            })
        },
        //关闭标签页操作
        handleTags(command) {
            if(command==3){
                this.$store.commit('DEL_VISITED_ALL');
                this.activePath = '/memberList';
                this.$store.dispatch('addVisitedViews',
                    {
                        path: '/memberList',
                        name:"memberList",
                        meta: { 
                            title: "会员列表" 
                        }
                    }
                );
                this.$router.push('/');
            }else if(command==1){
                this.$store.dispatch('delVisitedViews',this.$route.path).then((views)=>{
                    let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                    if(lastView){
                        this.$router.push(lastView);
                    }else{
                        this.$router.push('/');
                    }
                })
            }else if(command==2){
                this.$store.commit('DEL_VISITED_ALL');
                this.$store.dispatch('addVisitedViews',this.$route);
            }
        }
    },
    watch: {
        $route() {
            this.addViewTags();
        }
    },
    beforeDestroy(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
};
</script>

<style>
.head{
    position: relative;
    height: 94px;
}
.el-header {
    background: #fff;
    color: #333;
    height: 54px !important;
    font-size: 12px;
    margin-bottom: 5px;
    box-shadow: 0 0 2px #c1c1c1;
    display:flex;
    align-items: center;
    justify-content: flex-end;
}
.el-header > span {
    margin: 0 30px;
    font-size: 14px;
}
i.close{
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    font-size:25px;
    color:#02C1B2;
    cursor: pointer;
}
.el-icon-bell {
    font-size:24px;
    position: relative;
}
.el-badge__content {
    border:none;
}
.head-portrait {
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
}

.tag-wrap{
    padding:5px 10px;
    background:#fff;
    position: absolute;
    height: 40px;
    width: 100%;
    z-index: 99;
    box-shadow: 0 2px 3px #e4e0e0;
} 
.tag-wrap .tags-view-container{
    padding-right:100px;
}
.head .el-tabs__nav-next,
.head .el-tabs__nav-prev{
    line-height: 28px;
    font-size:20px;
}
.head .el-tabs__item{
    font-size:12px;
    display: inline-block;
    color:#666;
    margin:0 2px;
    padding:0 4px !important;
    height: 28px;
    line-height: 28px;
    border:1px solid #ccc;
    border-radius: 2px;
}
.head .el-tabs__item.is-active{
    background: #02c1b3;
    border-color:#02c1b3;
    color:#fff;
}
.head .el-tabs__item:not(.is-active):hover{
    color:#333;
} 
.head .el-tabs__nav-wrap::after,
.head .el-tabs__active-bar{
    display: none;
}
.head .operation{
    position: absolute;
    top:0;
    right:0;
    width:100px;
    height: 40px;
    background: #fff;
    border-left:1px solid #eaeaea;
    z-index: 99;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.head .operation .wrap-btn span{
    cursor: pointer;
}   
.head .tags-view-wrap .active{
    background: #02c1b3;
    border-color:#02c1b3;
    color:#fff;
}
.head .tags-view-wrap .active::before{
    content:"";
    display: inline-block;
    width:7px;
    height: 7px;
    background: #fff;
    border-radius: 50%;
}
.head .el-tabs .el-icon-close:hover{
    color:#fff;
    background: #FF5722;
}

</style>
