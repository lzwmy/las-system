<template>
    <div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="5" align="center">
                <h1 class="text-center">login test</h1>
                <el-button type="primary" @click="login">登 陆</el-button>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import {staticRouter,dynamicRouter} from '../../router/index'
export default {
    methods: {
        login(){
            this.$store.commit('changeLogin',{
                Authorization:"abcasfsdf"
            }) 
            
            this.$message({
                showClose: true,
                message: "登陆成功",
                type: 'success'
            });
            
            //动态生成路由
            let Authorization = window.localStorage.getItem('Authorization');
            let meunList = [];  //根据角色生成的路由
            let dRouter = dynamicRouter[0].children;    //本地路由表信息
            for (let i = 0; i < dynamicRouter[0].children.length; i++){
                if(dRouter[i].meta){
                    for (let j = 0; j < dRouter[i].meta.permission.length; j++){
                        if (dRouter[i].meta.permission[j] == "admin" ){
                            meunList.push(dRouter[i]);
                        }
                    }
                }
            }

        //    let abc = {
        //         path: '/power',
        //         name:"power",
        //         meta: { 
        //             title: "权限不足",
        //             permission:['admin'] 
        //         },
        //         component: "views/member/power"
        //         // component: resolve => require(['@/views/member/power'], resolve)
        //     }

        //     let b = {
        //         path: abc.path,
        //         name: abc.name,
        //         meta: abc.meta,
        //         component: resolve => require(['@/'+abc.component+'.vue'], resolve)
        //     }

        //     // meunList.push(b)
        //     console.log(meunList)

            dynamicRouter[0].children = meunList;
            this.$router.addRoutes(dynamicRouter.concat([{
                path: '*',
                redirect:"/404"}
            ]));  
            // window.sessionStorage.setItem("DRouter",JSON.stringify(dynamicRouter));
            this.$router.push('/');
        }   
    }
};
</script>

<style scoped>

</style>
