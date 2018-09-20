<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px" label-position="left">

        
        <el-row>
            <el-col :span="9">
                <el-form-item label="选择用户">
                    <el-button type="primary" icon="el-icon-search"  size="mini" @click="onSearch">搜索</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-button type="text" @click="onAllBing">批量绑定</el-button>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6">
                <el-form-item label="会员编号">
                    <el-col :span="18">
                        <el-input v-model="form.id" disabled></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-tag type="danger" size="small" v-if="!form.oldId" color="transparent">未绑定</el-tag>
                        <el-tag type="danger" size="small" v-if="form.oldId" color="transparent">已绑定</el-tag>
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
                    <el-input v-model="form.userId" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
                <el-form-item label="手机号">
                    <el-input v-model="form.tel" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <!-- 已绑定 -->
        <div v-show="form.oldId">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="已绑定账号">
                        <el-input v-model="form.oldId" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-form-item label="已绑定账号姓名">
                        <el-input v-model="form.oldName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="身份证号">
                        <el-input v-model="form.olduserId" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="新绑定账号:" class="serch-input" prop="newId">
                        <el-input  placeholder="请输入编号搜索" v-model="form.newId"></el-input>
                        <i class="el-icon-search" @click="onSearchInput"></i>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-form-item label="绑定账号姓名" prop="newName">
                        <el-input v-model="form.newName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="身份证号">
                        <el-input v-model="form.newUserId" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="备注" prop="desc">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>

        <!-- 未绑定 -->
        <div v-show="!form.oldId">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="推荐人姓名">
                        <el-input v-model="form.oldId" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-form-item label="推荐人身份证号">
                        <el-input v-model="form.oldName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="新绑定账号:" class="serch-input" prop="newId">
                        <el-input  placeholder="请输入编号搜索" v-model="form.newId"></el-input>
                        <i class="el-icon-search" @click="onSearchInput"></i>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-form-item label="绑定账号姓名" prop="newName">
                        <el-input v-model="form.newName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="老系统推荐人">
                        <el-input v-model="form.newUserId" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="1">
                    <el-form-item label="老系统推荐人身份证号" label-width="160px">
                        <el-input v-model="form.newUserId" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>

        <el-form-item>
            <el-button type="primary" size="mini" :loading="submitLoading" @click="onSubmit('form')">提交审核</el-button>
        </el-form-item>

        <dialog-com></dialog-com>
    </el-form>
</template>


<script>
import util from "../../../util/util.js";
export default {
    data() {
        return {
            submitLoading:false,  //提交loading
            form: {
                id: "", //会员编号
                name: "", //姓名
                userId:"", //身份证号
                tel:"",     //手机号
                oldId:"",   //已绑定账号
                oldName:"",     //已绑定账号姓名
                olduserId:"",   //已绑定会员身份证号
                newId:"",   //新推荐人编号
                newName:"",     //新推荐人姓名
                newUserId:"",     //新推荐人身份证号
                newUserType:"",     //新推荐人身份证类型
                desc: "", //备注
                RefereeId:"", //推荐人编号
                RefereeName:"", //推荐人姓名
                RefereeCode:"", //推荐人身份证号
            },
            //表单验证规则
            rules:{
                newId: [
                    { required: true, message: "请选择新推荐人", trigger: ['blur','change'] },
                ],
                newName: [
                    { required: true, message: "请选择新推荐人", trigger: ['blur','change'] },
                ],
                desc: [
                    { required: true, message: "请填写备注", trigger: ['blur','change'] },
                ]
            }
        };
    },
    methods: {
        //点击批量绑定
        onAllBing() {
            if(!this.form.id) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });   
            }else {
                this.$router.push({
                    name: `与老会员绑量绑定`,
                    query: {
                        code: this.form.id
                    }
                })
            }
        },
        //向后台提交修改
        onSubmit(form) {
            if(!this.form.id) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });       
            }else {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.submitLoading = true;
                        if(this.form.oldId) {
                            this.$axios({
                                method:'post',
                                url:"/apis/member/updateBindingByMCode",
                                params: {
                                    mCode:this.form.id,
                                    mName:this.form.name,
                                    raCode:this.form.oldId, 
                                    raName:this.form.oldName,
                                    raCodeNew:this.form.newId,
                                    raNameNew:this.form.newName,
                                    raIdCode:this.form.newUserId,
                                    raIdType:this.form.newUserType,
                                    mDesc:this.form.desc
                                }
                            })
                            .then(response=>{
                                if(response.data.code){
                                    util.$emit("userDefined",{
                                        icon:"success",
                                        title:"修改成功,等待审核!"
                                    });
                                    this.submitLoading = false;
                                } else{
                                    util.$emit("userDefined",{
                                        icon:"error",
                                        title:response.data.msg
                                    });
                                    this.submitLoading = false;
                                }
                            })   
                        }else {
                            this.$axios({
                                method:'post',
                                url:"/apis/member/addBinding",
                                params: {
                                    mCode:this.form.id,
                                    rasponsorCode:this.form.RefereeId,
                                    rasponsorIdCode:this.form.RefereeCode,
                                    rasponsorName:this.form.RefereeName,
                                    raCode:this.form.newId,
                                    raName:this.form.newName,
                                    raIdType:this.form.newUserType,
                                    raIdCode:this.form.newUserId,
                                }
                            })
                            .then(response=>{
                                if(response.data.code){
                                    util.$emit("userDefined",{
                                        icon:"success",
                                        title:"修改成功,等待审核!"
                                    });
                                    this.submitLoading = false;
                                } else{
                                    util.$emit("userDefined",{
                                        icon:"error",
                                        title:response.data.msg
                                    });
                                    this.submitLoading = false;
                                }
                            }) 
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: '请输入必填信息!',
                            type: 'error'
                        });
                        return false;
                    }
                }); 
            }
        },
        //点击搜索按钮
        onSearch() {
            util.$emit("searchdialog");
        },
        //根据新推荐人编号进行搜索
        onSearchInput() {
            if(!this.form.id) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });       
            }else{
                this.isInputSearch = true;
                util.$emit("searchdialog",this.form.newRefereeId);  
            }
        },
         //根据编号查找会员及与老会员关系信息
        getMemberInfo() {
            this.form.oldId = "";
            this.form.oldName = "";
            this.form.olduserId = "";
            this.$axios({
                method:'get',
                url:"/apis/member/findBindingByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.form.oldId = response.data.data.rdRaBinding.raCode;
                    this.form.oldName = response.data.data.rdRaBinding.raName;
                    this.form.olduserId = response.data.data.rdRaBinding.raIdCode;
                }
            })    
        }
    },
    created() {
        //接收选中会员信息
        util.$on("TabelData",(data)=>{
            if(this.isInputSearch) {
                this.form.newId = data.mCode;
                this.form.newName = data.mName;
                this.form.newUserId = data.idCode;
                this.form.newUserType = data.idType;
            }else {
                this.form.oldId ="";
                this.form.oldName = "";
                this.form.olduserId = "";
                this.form.newId = "";
                this.form.newName = "";
                this.form.newUserId = "";
                this.form.newUserType = "";
                this.form.desc = "";
                this.form.RefereeId = "";
                this.form.RefereeName = "";
                this.form.RefereeCode = "";

                this.form.id = data.mCode;
                this.form.name = data.mName;
                this.form.userId = data.idCode;
                this.form.tel = data.mobile;
                this.getMemberInfo();
            }
        });
    }
};
</script>

<style>
.wrap .serch-input .el-form-item__content {
    position: relative;
}
.wrap .serch-input .el-icon-search {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 18px;
    color: #666;
    cursor: pointer;
}
.wrap .el-tag--danger {
    border:none;
}
</style>
