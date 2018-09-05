<template>
    <el-form ref="form" :model="form" label-width="100px" label-position="left">

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
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="加入日期">
                    <el-input v-model="form.joinData" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员状态">
                    <el-input v-model="form.memberStatu" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="会员级别">
                    <el-input v-model="form.memberLevel" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="推荐人编号">
                    <el-input v-model="form.refereeId" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="推荐人姓名">
                    <el-input v-model="form.refereeName" disabled></el-input>
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
                <el-form-item label="新推荐人姓名">
                    <el-input v-model="form.newRefereeName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="8">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remarks" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
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
            isChangeFrom:false,  //判断用户是否修改表单
            submitLoading:false,  //提交loading
            form: {
                id: "", //会员编号
                name: "", //姓名
                nickname: "", //昵称
                joinData:"",  //加入日期
                memberStatu:"",   //会员状态
                memberLevel:"", //会员级别
                refereeId:"",  //推荐人编号
                refereeName:"",  //推荐人姓名
                newRefereeId:"",  //新推荐人编号
                newRefereeName:"",  //新推荐人姓名
                remarks:"",  //备注
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
            this.showArea = false;  
            setTimeout(()=>{
                this.showArea = true;  
            },200)
        },
        //根据会员编号获取会员账户信息
        getMemberInfo() {
            this.$axios({
                method:'get',
                url:"/apis/member/findRelationByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                console.log(response)
                if(response.data.code){
                    this.form.memberStatu = response.data.data.mstatus;
                    this.form.memberLevel = response.data.data.rank;
                    this.form.refereeId = response.data.data.raCode;
                    this.form.refereeName = response.data.data.raNickName;
                    this.isChangeFrom = false;
                } else{
                    util.$emit("userDefined","数据获取失败!")
                }
            })    
        },
    },
    created() {
        //接收选中会员信息
        util.$on("TabelData",(data)=>{
            this.form.id = data.mcode;
            this.form.name = data.mname;
            this.form.nickname = data.mnickname;
            this.form.joinData = data.creationData;
            this.getMemberInfo();
            setTimeout(()=>{
                this.isChangeFrom = false;
            },500)
        });
    }
};
</script>

<style>
i.el-icon-plus{
    font-size: 32px;
    color: #c3c3c3;
}
.el-upload-dragger {
    width: 34px;
    height: 34px;
    line-height: 34px;
}
.el-upload--picture-card {
    width: 34px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #ccc;
}
.el-upload-list--picture-card .el-upload-list__item.is-success {
    width:36px;
    height: 36px;
}
.el-upload-list--picture-card .el-upload-list__item-status-label {
    right: -19px;
    top: -10px;
}
.el-upload-list--picture-card .el-upload-list__item-status-label i {
    transform: scale(0.8) rotate(-45deg);
}
.el-upload__tip {
    line-height: 20px;
}
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
</style>
