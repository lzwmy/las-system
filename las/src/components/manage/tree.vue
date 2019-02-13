<template>
    <el-form label-width="80px" label-position="left">
        <el-row>
            <el-col :span="4" :xs="9" :sm="9" :md="9" :lg="4" :xl="4">
                <el-form-item label="业务周期">
                    <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="form.timeStart">
                    </el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="10" :sm="10" :md="6" :lg="4" :xl="4">
                <el-form-item label="会员编号"><el-input v-model="form.mCode" @keyup.enter.native="onSearch" clearable></el-input></el-form-item>
            </el-col>
            <!-- <el-col :span="4" :offset="1" :xs="10" :sm="10" :md="6" :lg="4" :xl="4">
                <el-form-item label="层数"><el-input v-model.number="form.layer" @keyup.native="inputNumber($event)" @keyup.enter.native="onSearch"></el-input></el-form-item>
            </el-col> -->
            <el-col :span="4" :offset="1" :xs="10" :sm="10" :md="6" :lg="4" :xl="4">
                <el-form-item label="类型">
                    <el-select v-model="form.type">
                        <el-option label="向下" value="向下"></el-option>
                        <el-option label="向上" value="向上"></el-option>
                    </el-select>  
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
            </el-col>
        </el-row>
        <div class="line">
            <!-- <el-tree
                :data="searchData"
                :props="defaultProps"
                lazy
                :load="loadNode"
                :highlight-current=true
                empty-text="暂无数据"
                accordion
                @node-click="handleNodeClick">
            </el-tree> -->
            <el-tree
                :data="searchDate"
                :props="defaultProps"
                lazy
                :load="loadNode"
                @node-expand="handleNodeClick"
                ref="tree">
            </el-tree>
        </div>
    </el-form>
</template>


<script>
import {onGetTime} from "../../util/util.js";
export default {
    name:"tree",
    data() {
        return {
            options:[], //周期
            form:{
                mCode:"01000002",
                type:"向下",
                timeStart:[]
            },
            searchDate:[],
            loadingTable:false, //加载列表
            defaultProps: {
                children: 'children',
                label: 'label',
                isLeaf: 'leaf'
            },
            mCode:""  //展开某会员的推荐人或被推荐人
        };
    },
    methods: {
        //限制input输入   
        inputNumber(e){
            this.form.layer = e.target.value.replace(/[^\d]/g,'');
        },
        onSearch(){
            let url = "";
            if(this.form.type=="向下"){
                url = "member/findTreeReaDown";
            }else{
                url = "member/findTreeReaUp";
            }
            this.searchDate = [];
            this.$request({
                method:'post',
                url:"/apis/"+url,
                params:{
                    periodCode:this.form.timeStart[0]?this.form.timeStart[0]+this.form.timeStart[1]:"",
                    mCode:this.form.mCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    if(!Array.isArray(response.data.data)){
                        let arr = [];
                        arr.push(response.data.data);
                        this.searchDate = arr;
                    }else{
                        this.searchDate = response.data.data;
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    }); 
                }
            });
        },
        handleNodeClick(data){
            if(this.form.type=="向下"){
                this.mCode = data.mCode;
            }else{
                this.mCode = data.sponsorCode;
            }
        },
        loadNode(node, resolve){
            console.log(node)
            if(node.isLeaf){
                return resolve([{ label: '无' }]);
            }
            if (node.level > 1){
                return resolve([]);
            } 

            let url = "";
            if(this.form.type=="向下"){
                url = "member/findTreeReaDown";
            }else{
                url = "member/findTreeReaUp";
            }
            setTimeout(() => {
                this.$request({
                    method:'post',
                    url:"/apis/"+url,
                    params:{
                        periodCode:this.form.timeStart[0]?this.form.timeStart[0]+this.form.timeStart[1]:"",
                        mCode:this.mCode,
                        date:new Date().getTime()
                    }
                })     
                .then(response=>{
                    if(!Array.isArray(response.data.data)){
                        let arr = [];
                        arr.push(response.data.data);
                        resolve(arr);
                    }else{
                        resolve(response.data.data);
                    }
                });
            }, 500);
        }

       
    },
    created() {
        onGetTime(this.options);
    }
};
</script>

<style scoped>
.line{
    min-height: 600px;
    width: 100%;
    position: relative;
    display: inline-block;
    border: 1px solid #888;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
}
</style>

