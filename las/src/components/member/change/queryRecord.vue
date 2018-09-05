<template>
    <el-form  :model="form" label-width="80px" label-position="left">


        <el-row>
            <el-col :span="4">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="信息修改类型:" label-width="100px">
                    <el-select v-model="form.type" placeholder="请选择">
                        <el-option v-for="(items,index) in select1" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>      

        <el-row>
            <el-col :span="4">
                <el-form-item label="审核状态">
                    <el-select v-model="form.state" placeholder="请选择">
                        <el-option v-for="(items,index) in select2" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-form-item label="创建时间" v-model="form.time">
                    <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
                <el-button size="mini" >导出</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20">
                <el-table :data="searchData" border size="mini">
                    <el-table-column type="index" align="center" width="50px">
                    </el-table-column>
                     <el-table-column prop="mcode" label="会员编号" align="center" width="100px">
                    </el-table-column>
                    <el-table-column label="审核状态" align="center" width="100px"> 
                    </el-table-column>
                    <el-table-column label="会员姓名" align="center" width="100px">
                    </el-table-column>
                    <el-table-column label="修改类型" align="center" width="120px">
                    </el-table-column>
                    <el-table-column label="修改时间" align="center" width="160px">
                    </el-table-column>
                    <el-table-column label="操作人" align="center" width="100px">
                    </el-table-column>
                    <el-table-column label="审批人" align="center" width="100px">
                    </el-table-column>
                    <el-table-column label="修改备注" align="center">
                    </el-table-column>
                    <el-table-column label="审核备注" align="center">
                    </el-table-column>
                    <el-table-column label="修改详情" align="center" width="100px">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <el-pagination
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="100">
                </el-pagination>    
            </el-col>
        </el-row>


    </el-form>
</template>


<script>
export default {
    data() {
        return {
            VisibleImg: "",
            select1:['全部','修改基本信息','修改敏感信息','会员更名','更改推荐人','更改会员级别','与老会员绑定'],
            select2:['全部','无需审核','待审','审核通过','已驳回'],
            form: {
                id: "", //会员编号
                name: "", //姓名
                type:"", //信息修改类型
                state:"", //审核状态
                time: "" //创建时间
            },
            //修改记录数据
            searchData: []
        };
    },
    methods: {
        //向后台请求修改记录
        onSubmit() {   
            this.$axios({
                method:'post',
                url:"/apis/member/findEditById",
                params:{
                    rId:this.form.id,
                }
            })     
            .then(response=>{
                //存在修改记录
                if(response.data.data){
                    this.searchData = response.data.data;
                }else {

                }
            })
        },
    }
};
</script>

<style>
</style>
