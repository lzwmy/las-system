<template>
    <div>
        <el-form ref="form" label-width="120px">
            <el-row>
                <el-col :span="9">
                    <el-form-item label="搜索老系统用户">
                        <el-button type="primary" @click="onSearch">批量搜索</el-button>
                        <el-button type="primary" @click="onBinding" :loading="submitLoading">绑定选中</el-button>
                        <el-button type="primary" @click="onAllBinding" :loading="submitLoading">绑定全部</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="success" @click="onBack">单个绑定</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-row>
            <el-col :span="16">
                <el-table :data="tableData" border @selection-change="onSelect">
                    <el-table-column type="selection" align="center" width="50px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="老系统会员编号" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="mName" label="姓名" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="idCode" label="身份证" align="center">
                    </el-table-column>
                    <el-table-column prop="creationer" label="推荐人姓名" align="center" width="130px">
                    </el-table-column>
                    <el-table-column prop="creationIp" label="推荐人身份证" align="center">
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
        <el-row type="flex" justify="center">
            <el-col :span="8" >
                <el-pagination
                    :page-size="searchFrom.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :page-sizes="[5, 10, 20, 999]"
                    :total="searchFrom.total"
                    :current-page="searchFrom.currentPage"
                    @current-change="onChangePage"
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>

        <!-- 弹出层组件 -->
        <dialog-com ref="dialog"></dialog-com>
    </div>
</template>


<script>
export default {
    name:"allBindingOld",
    data() {
        return {
            submitLoading:false,  //提交loading
            //搜索框搜索表单
            searchFrom:{
                currentPage:1,
                pageSize:5,
                total:0,
                mCode:"",
                mName:"",
                mobile:"",
                mNickname:""
            },
            mCode:"",
            tableData:[],
        };
    },
    methods: {
        //点击查询修改记录
        onSearch() {   
            this.$request({
                method:'post',
                url:"/apis/member/search",
                params:{
                    mCode:this.$route.query.code,
                    currentPage:1,
                    pageSize:10,
                    mName:"",
                    mobile:"",
                    mNickname:""
                }
            })     
            .then(response=>{
                if(response.data.data){
                    this.tableData = response.data.data.list;
                    for(var i = 0; i < this.tableData.length; i++){
                        this.tableData[i].code = this.$route.query.code;
                    }
                    this.searchFrom.total = response.data.data.total;
                }
            })
        },
        //改变页数
        onChangePage(currentPage) {
            this.searchFrom.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.searchFrom.pageSize = pageSize;
            this.onSearch();
        },
        //批量绑定
        onBinding() {
            if(this.tableData.length!=0) {     //未选择用户
                this.submitLoading = true;
                this.$request({
                    method:'post',
                    url:"/apis/member/updateBindingByMCode",
                    params: {
                        // mCode:this.form.id,		//会员编号
                        // mName:this.form.,		//会员姓名
                        // idType:this.form,		//证件类型
                        // idCode:this.form,		//证件号码
                        // sponsorName:this.form,		//推荐人姓名
                        // sponsorIdType:this.form,		//推荐人证件类型
                        // sponsorIdCode:this.form,		//推荐人证件号码
                        // raCode:this.form,		//老会员编号
                        // raName:this.form,		//老会员姓名
                        // raIdType:this.form,		//老会员证件类型
                        // raIdCode:this.form,		//老会员证件号码
                        // rasponsorName:this.form,		//老会员推荐人姓名
                        // rasponsorCode:this.form,     //编号
                        // rasponsorIdType:this.form,		//老会员推荐人证件类型
                        // rasponsorIdCode:this.form,		//老会员推荐人证件号码
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$refs.dialog.userDefined({
                            icon:"success",
                            title:"恭喜，批量绑定成功!"
                        });
                    } else{
                        this.$refs.dialog.userDefined({
                            icon:"error",
                            title:response.data.msg
                        });
                    }
                    this.submitLoading = false;
                })   
            }else {
                this.$message({
                    showClose: true,
                    message: '请先搜索用户',
                    type: 'error'
                });       
            }
        },
        //选中绑定
        onAllBinding() {

        },
        onSelect(val){
            console.log(val)
        },
        //返回上一个页面
        onBack() {
            this.$router.go(-1)
        }
    },
    created() {
        this.onSearch();
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
    border: none;
}
</style>
