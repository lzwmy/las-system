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
import {router,dynamicRouter} from '../../router/index'
export default {
    methods: {
        login(){
            this.$store.commit('changeLogin',{
                Authorization:"abcasfsdf"
            }) 
            this.$router.push('/');
            this.$message({
                showClose: true,
                message: "登陆成功",
                type: 'success'
            });
            


            // let Authorization = window.localStorage.getItem('Authorization');
            // let meunList = [];
           
            
            // if(Authorization!="" && Authorization!="null"){
            //     for (let i = 0;i < dynamicRouter.length; i++){
            //         if(dynamicRouter[i].children){
            //             for (let j = 0; j < dynamicRouter[i].children.length; j++){
            //                 if(dynamicRouter[i].children[j].meta){
            //                     for (let k = 0; k < dynamicRouter[i].children[j].meta.permission.length; k++){
            //                         if (dynamicRouter[i].children[j].meta.permission[k] == "admin"){
            //                             console.log(1)
            //                             let arr = [];
                                        
            //                             arr.push(dynamicRouter[i].children[j]);
            //                             // dR[i].children = [];
            //                             // dR[i].children.push(arr);
            //                             dR.push(dynamicRouter[i].children[j]);
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }


                

                

                // for (let i = 0;i < dynamicRouter.length; i++){
                //     meunList.push(dynamicRouter[i]);
                // }
                // this.$router.addRoutes(meunList);
                


                

                
            
        }
        
    }
};
</script>

<style scoped>

</style>
