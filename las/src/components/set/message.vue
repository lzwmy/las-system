<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    v-loading="loadingTable"
                    border 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column label="消息通知">
                        <template slot-scope="scope" v-show="scope.row.num != 0">
                            <router-link :to="scope.row.path" style="display:block;">您有 <span style="color:red;font-weight:bold;">{{scope.row.num}}</span> 条{{scope.row.mes}}</router-link> 
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    name:"message",
    data() {
        return {
            loadingTable:false,
            searchData:[],
            searchFrom:{
                currentPage:1,
                pageSize:10,
                total:0
            }
        };
    },
    methods:{
        
    },
    mounted() {
        this.searchData = this.$store.state.message.filter(item =>{
            return item.num !=0;
        })
    }
};
</script>

<style>
</style>

