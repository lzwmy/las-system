<template>
    <el-form ref="form" :model="form" label-width="110px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" size="mini" @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员编号">
                    <el-col :span="18">
                        <el-input v-model="form.id" disabled></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-tag type="danger" size="small"  color="transparent">已绑定</el-tag>
                    </el-col>
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
                <el-form-item label="身份证号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="手机号">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="已绑定账号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="已绑定账号姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="身份证号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="手机号">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="新推荐人编号:" class="serch-input">
                    <el-input  placeholder="请输入编号搜索"></el-input>
                    <i class="el-icon-search"></i>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="绑定账号姓名">
                    <el-input v-model="form.name"></el-input>
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
            form: {
                id: "", //会员编号
                name: "", //姓名
                userType:"", //身份证号
                accountName: "", //户名
                accountNumber: "", //账号
                radio: "", //收款方式
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
.serch-input .el-form-item__content {
    position: relative;
}
.serch-input .el-icon-search {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 18px;
    color: #666;
    cursor: pointer;
}
.el-icon-search:hover {
    color: #409eff;
}
.el-tag--danger {
    border:none;
}
</style>
