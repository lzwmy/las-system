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
                <el-form-item label="创建时间">
                    <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" size="mini">查询</el-button>
                <el-button size="mini" >导出</el-button>
            </el-col>
        </el-row>      

    <el-row>
        <el-col :span="20">
            <el-table :data="searchData" border size="mini">
                <el-table-column type="selection" align="center" width="50px">
                </el-table-column>
                <el-table-column prop="id" label="会员编号" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="name" label="审核状态" align="center" width="100px"> 
                </el-table-column>
                <el-table-column prop="name" label="会员姓名" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="name" label="修改类型" align="center" width="120px">
                </el-table-column>
                <el-table-column prop="name" label="修改时间" align="center" width="160px">
                </el-table-column>
                <el-table-column prop="name" label="操作人" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="name" label="审批人" align="center" width="100px">
                </el-table-column>
                <el-table-column prop="name" label="修改备注" align="center">
                </el-table-column>
                <el-table-column prop="name" label="审核备注" align="center">
                </el-table-column>
                <el-table-column prop="name" label="操作" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">审核</el-button>
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
            form: {
                id: "33434", //会员编号
                name: "张三", //姓名
                currentType:"", //当前级别
                nextType:"", //调整后级别
                accountName: "张三", //户名
                accountNumber: "465615611516511", //账号
                radio: "1", //收款方式
                desc: "" //备注
            },
            //搜索数据
            searchData: [
                {
                    id:"cd0002320",
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    methods: {
        
    }
};
</script>

<style>
</style>
