<template>
    <el-form ref="form" :model="form" label-width="110px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" size="mini" @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>      

        <el-row>
            <el-col :span="6">
                <el-form-item label="当前级别:">
                    <el-select v-model="form.currentType" placeholder="请选择">
                        <el-option v-for="(items,index) in select" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="调整后级别">
                    <el-select v-model="form.nextType" placeholder="请选择">
                        <el-option v-for="(items,index) in select" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="备注">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" size="mini" @click="onSubmit">提交审核</el-button>
        </el-form-item>

        <dialog-com></dialog-com>
    </el-form>
</template>


<script>
import util from "../../../util/util.js";
export default {
    data() {
        return {
            VisibleImg: "",
            select:['全部','普通会员','VIP会员','代理会员','一级代理店','二级代理店','三级代理店','旗舰店','高级旗舰店','超级旗舰店'],
            form: {
                id: "33434", //会员编号
                name: "张三", //姓名
                currentType:"", //当前级别
                nextType:"", //调整后级别
                accountName: "张三", //户名
                accountNumber: "465615611516511", //账号
                radio: "1", //收款方式
                desc: "" //备注
            }
        };
    },
    methods: {
        //提交表单
        onSubmit() {
            util.$emit("showdialog");
        },
        //点击搜索按钮
        onSearch() {
            util.$emit("searchdialog");
        }
    }
};
</script>

<style>
</style>
