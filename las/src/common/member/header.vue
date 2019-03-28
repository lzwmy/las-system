<template>
    <div class="head">
        <el-header>
            <i class="el-icon-menu close" @click="onCloseTab"></i>
            <span>角色权限：{{infoData.roleName}}</span>
            <span>登录时间：{{infoData.loginDate}}</span>
            <span @click="toMessage">
                <el-badge :value="messageNum" :max="999" class="item" >
                    <i class="el-icon-bell"></i>
                </el-badge>
            </span>  
            <img :src="infoData.headImg" alt="头像" class="head-portrait">
            <el-dropdown @command="handleCommand" type="danger">
                <span style="display:inline-block; min-width:40px;">{{infoData.userName}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">个人资料</el-dropdown-item>
                    <el-dropdown-item command="2">修改密码</el-dropdown-item>
                    <el-dropdown-item command="0" divided>退出</el-dropdown-item>
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
            infoData:{},
            visitedViews:[],
            messageNum:0 //消息通知数量   
        };
    },
    methods: {
        onCloseTab() {
            this.$emit("closeTab");
        },
        //个人中心、登出操作
        handleCommand(command) {
            if(command==0){      
                this.$store.commit('clearInfo');   
                setTimeout(()=>{
                    this.$message({
                        showClose: true,
                        message: "已退出登录",
                        type: 'info'
                    });      
                    this.$router.push('/login');
                },300);
            }else if(command==1){
                this.$router.push('/info');
            }else if(command==2){
                this.$router.push('/changePAW')
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
                //更新头部标签页
                this.visitedViews = this.$store.state.tagsview.visitedviews;
            }else if(command==1){
                this.$store.dispatch('delVisitedViews',this.$route.path).then((views)=>{
                    let lastView = views.slice(-1)[0]//选取路由数组中的最后一位
                    if(lastView){
                        this.$router.push(lastView);
                    }else{
                        this.$router.push('/');
                    }
                })
                //更新头部标签页
                this.visitedViews = this.$store.state.tagsview.visitedviews;
            }else if(command==2){
                this.$store.commit('DEL_VISITED_ALL');
                this.$store.dispatch('addVisitedViews',this.$route);
                //更新头部标签页
                this.visitedViews = this.$store.state.tagsview.visitedviews;
            }
        },
        //消息通知
        toMessage(){
            this.$router.push('message');
        }
    },
    computed:{
        listenMessageNum(){
            return this.$store.state.messageNum;
        }
    },
    watch: {
        $route() {
            this.addViewTags();
            //保存最后一个访问的路由
            let lastRouter = {
                path:this.$route.path,
                name:this.$route.name,
                meta:this.$route.meta
            }
            sessionStorage.setItem('lastRouter',JSON.stringify(lastRouter))
            //更新头部标签页
            this.visitedViews = this.$store.state.tagsview.visitedviews;
        },
        listenMessageNum(newVal,oldVal){
            this.messageNum = newVal;
        }
    },
    created(){
        this.activePath = this.$route.path;
        this.infoData = this.$store.state.infoData;
        //更新头部标签页
        this.visitedViews = this.$store.state.tagsview.visitedviews;
        //获取通知数量
        this.messageNum = this.$store.state.messageNum;
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
    cursor: pointer;
}
.el-badge__content {
    border:none;
}
.head-portrait {
    width:30px;
    height: 30px;
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
