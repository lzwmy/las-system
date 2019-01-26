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
                <el-form-item label="会员编号"><el-input v-model="form.mCode" @keyup.enter.native="onSearch"></el-input></el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="10" :sm="10" :md="6" :lg="4" :xl="4">
                <el-form-item label="层数"><el-input v-model.number="form.layer" @keyup.native="inputNumber($event)" @keyup.enter.native="onSearch"></el-input></el-form-item>
            </el-col>
            <el-col :span="4" :offset="1" :xs="10" :sm="10" :md="6" :lg="4" :xl="4">
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="向下">
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
            <el-tree
                :data="searchData"
                :props="defaultProps"
                :highlight-current=true
                empty-text="暂无数据"
                accordion
                @node-click="handleNodeClick">
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
            options:[],
            form:{
                mCode:"",
                layer:null,
                timeStart:[]
            },
            loadingTable:false, //加载列表
            searchData: [], //列表数据
            // searchData: [{
            //     label: '一级 1',
            //     name:"2131232323",
            //     children: [{
            //         label: '二级 1-1',
            //             children: [{
            //                 label: '三级 1-1-1'
            //             }]
            //         }]
            //     }, 
            //     {
            //     label: '一级 2',
            //     children: [{
            //         label: '二级 2-1',
            //             children: [{
            //                 label: '三级 2-1-1'
            //             }]
            //     }, 
            //     {
            //         label: '二级 2-2',
            //             children: [{
            //                 label: '三级 2-2-1'
            //             }]
            //     }]
            //     }, {
            //     label: '一级 3',
            //     children: [{
            //         label: '二级 3-1',
            //             children: [{
            //                 label: '三级 3-1-1'
            //             }]
            //     }, 
            //     {
            //         label: '二级 3-2',
            //             children: [{
            //                 label: '三级 3-2-1'
            //             }]
            //     }]
            // }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        //限制input输入   
        inputNumber(e){
            this.form.layer = e.target.value.replace(/[^\d]/g,'');
        },
        //点击查询表
        onSearch() {
            // this.searchData = [];
            // this.loadingTable = true;  
            // this.$request({
            //     method:'post',
            //     url:"/apis//member/findTreeRea",
            //     params:{
            //         periodCode:"201811",
            //         mCode:"86723351",
            //         num:2,
            //         direction:"up",
            //         date:new Date().getTime()
            //     }
            // })     
            // .then(response=>{
            //     console.log(response.data)
            //     let data = response.data;
            //     let a = {
            //         name:{
            //             age:123
            //         }
            //     }
                
            //     // console.log(a['name']);
            //     // for(let key in response.data){
            //     //     console.log(response.data[key])
            //     // }
               
            //     // if(response.data.code){
            //     //     this.searchData = response.data;
            //     // }
            //     setTimeout(()=>{
            //         this.loadingTable = false;
            //     },200)
            // })
        },
        handleNodeClick(data) {
            console.log(data);
        }
       
    },
    created() {
        onGetTime(this.options);
        this.onSearch();
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

