<template>
    <el-form status-icon :rules="rules" :model="form" ref="form" label-width="80px" label-position="left">

        <el-form-item label="选择用户">
            <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
        </el-form-item>

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="会员编号">
                    <el-input v-model="form.id" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item label="会员头像">
                    <img :src="form.mAvatar" alt="" class="head-img">
                    <el-button type="warning" size="mini" @click="onRest" v-if="form.id">重置头像</el-button>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="昵称"  prop="nickname">
                    <el-input v-model.trim="form.nickname"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="性别">
                     <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                        <el-option label="保密" value="保密"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>


        <el-row>
            <el-col :span="6" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="Email">
                    <el-input v-model.trim="form.email"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1" :xs="10" :sm="10" :md="10" :lg="7" :xl="6">
                <el-form-item label="邮编">
                    <el-input v-model.number="form.zipCode"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item label="地址" class="inline-block" >
                    <div class="area" v-if="showArea">
                        <area-select type="text" :level="2" :placeholders="placeholders" v-model="form.address" :data="pcaa"></area-select>
                    </div>
                </el-form-item>
                <el-form-item label="详细地址" label-width="80px" class="text-center inline-block" >
                    <el-input v-model="form.detial" class="long-input"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="18" :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <el-form-item label="收货地址">
                    <el-button type="success" size="mini" @click="addAddress">添加新地址</el-button>
                    <el-table 
                        :data="addressTable" 
                        border 
                        size="mini"
                        v-loading="loadingTable" 
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                        <el-table-column type="index" align="center" width="50px">
                        </el-table-column>
                        <el-table-column prop="address" label="地址列表" align="center" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="name" label="收货人" align="center" width="100px"> 
                        </el-table-column>
                        <el-table-column prop="tel" label="手机号" align="center" width="150px">
                        </el-table-column>
                        <el-table-column prop="type" label="默认地址" align="center" width="110px" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="250px">
                            <template slot-scope="scope">
                                <el-button  size="mini" type="success"  @click="changeAddress(scope.row)">修改</el-button>
                                <el-button  size="mini" type="danger"  @click="removeAddress(scope.row)">删除</el-button>
                                <el-button  size="mini" type="primary"  @click="setDefaultAddress(scope.row)">设为默认</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="10" :xl="8">
                <el-form-item label="备注">
                    <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :loading="submitLoading">修改</el-button>
        </el-form-item>
    
        <!-- 弹出层组件 -->
        <dialog-com ref="dialog" @searchData="getSearchData" @addAddress="getAddress" @changeAddress="getChangeAddress"></dialog-com>

    </el-form>
</template>


<script>
import { pca, pcaa } from "area-data";
export default {
    name:"basicInfo",
    data() {
        //邮编验证
        var validateZipCode = (rule, value, callback) => {
            const reg = /^\d{6}$/;
            let isZipCode = reg.test(value);
            if (!isZipCode) {
                callback(new Error('请输入正确的邮编'));
            } else {
                callback();
            }
        };
        //邮箱验证
        var validateZipEmail = (rule, value, callback) => {
            const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            let isZipCode = reg.test(value);
            if (!isZipCode) {
                callback(new Error('请输入正确的邮箱'));
            } else {
                callback();
            }
        };
        return {
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa,
            submitLoading:false,  //提交loading
            loadingTable:false,   
            DialogVisible: false,
            showArea:true,
            searchUser: false,
            radio: "",
            oldForm:{},
            form: {
                id: "", //会员编号
                name: "", //姓名
                mAvatar:"",
                nickname: "", //昵称
                sex: "", //性别
                email: "", //邮箱
                zipCode: "", //邮编
                address: [], //地址
                detial:"", //详细地址
                desc: "" //备注
            },
            //表单验证规则
            rules: {
                nickname: [
                    { required: true, message: "请输入昵称", trigger: ['blur'] },
                    { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: ['blur'] }
                ],
            },
            //收货地址表格
            addressTable:[],
        };
    },
    methods: {
        //向后台提交修改
        onSubmit(form) {
            if(!this.form.id) {     //未选择用户
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });       
            }else{
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        //未更改表单和地址
                        if(JSON.stringify(this.form)===JSON.stringify(this.oldForm)){
                            this.$message({
                                showClose: true,
                                message: '该信息已存在，请匆重复提交!',
                                type: 'error'
                            }); 
                        }
                        else {
                            this.submitLoading = true;
                            let sex = null;
                            if(this.form.sex=="男"){
                                sex = 0;
                            }else if(this.form.sex=="女"){
                                sex = 1
                            }else{
                                sex = null;
                            }
                            this.$request({
                                method:'post',
                                url:"/apis/member/updateByMCodeAndMName",
                                params: {
                                    mCode:this.form.id,
                                    mName:this.form.name,
                                    mNickname:this.form.nickname,
                                    gender:sex,
                                    email:this.form.email,
                                    province:this.form.address[0],
                                    city:this.form.address[1],
                                    country:this.form.address[2],
                                    detial:this.form.detial,
                                    addPost:this.form.zipCode,
                                    mDesc:this.form.desc
                                }
                            })
                            .then(response=>{
                                if(response.data.code){
                                    this.$alert('信息已修改成功!', '提示', {
                                        confirmButtonText: '确定',
                                        type:"success",
                                        callback: action => {
                                            //重置
                                            this.addressTable = [];
                                            this.showArea = false;
                                            setTimeout(()=>{
                                                this.showArea = true;
                                            },300);
                                            this.form = {
                                                id: "", //会员编号
                                                name: "", //姓名
                                                mAvatar:"",
                                                nickname: "", //昵称
                                                sex: "", //性别
                                                email: "", //邮箱
                                                zipCode: "", //邮编
                                                address: [], //地址
                                                detial:"", //详细地址
                                                desc: "" //备注
                                            }
                                        }
                                    });
                                } else{
                                    this.$alert(response.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        type:"warning",
                                        callback: action => {}
                                    });
                                }
                                this.submitLoading = false;
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
        
        // 添加新地址
        addAddress() {
            if(this.form.id){
                this.$refs.dialog.showDialogAddAddress({
                    id:this.form.id,
                    zipCode:this.form.zipCode
                });
            }else {
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }
        },
        //删除某条收货地址
        removeAddress(row) {
            this.$confirm('是否删除该地址?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$request({
                    method:'get',
                    url:"/apis/member/delMemAddByAId",
                    params: {
                        aId:row.id,
                        mCode:this.form.id
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            message: '成功删除该地址!',
                            type: 'success'
                        });
                        this.getAddressList();
                    } else{
                        this.$message({
                            showClose: true,
                            message: '服务器未响应!',
                            type: 'error'
                        });
                    }
                })    
            }).catch(() => {});
        },
        //点击修改收货地址
        changeAddress(row) {
            this.$refs.dialog.showDialogAddressChange({
                aId:row.id,
                mCode:this.form.id
            });
        },
        //点击搜索按钮
        onSearch() {
            this.$refs.dialog.onSearchDialog();
        },
        //获取收货地址
        getAddressList() {
            this.loadingTable = true;
            this.$request({
                method:'get',
                url:"/apis/member/findAddAllByMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.addressTable = [];
                    for(var i = 0; i < response.data.data.length; i++){
                        let obj = {
                            address:response.data.data[i].addProvinceCode+"-"+response.data.data[i].addCityCode+"-"+response.data.data[i].addCountryCode+"-"+response.data.data[i].addDetial,
                            name:response.data.data[i].consigneeName,
                            tel:response.data.data[i].mobile,
                            type:response.data.data[i].defaultAdd==1?'默认':'',
                            id:response.data.data[i].aId
                        }
                        this.addressTable.push(obj);
                    }

                } else{
                    this.$message({
                        message: '获取收货地址失败!',
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })          
            
        },
        //设置默认地址
        setDefaultAddress(data) {
            this.$request({
                method:'post',
                url:"/apis/member/defAddByAIdAndMCode",
                params: {
                    aId:data.id,
                    mCode:this.form.id,
                    defaultAdd:1
                }
            })
            .then(response=>{
                if(response.data.code){
                    //重新获取收货地址
                    this.getAddressList();
                } else{
                    this.$message({
                        message: '设置默认地址失败!',
                        type: 'error'
                    });
                }
            })          
        },
        //接收先中会员信息
        getSearchData(data) {
            this.form.address = [];  
            this.showArea = false;
            this.form.aId = data.mId,
            this.form.id = data.mCode;
            this.form.name = data.mName;
            this.form.nickname = data.mNickname;
            this.form.sex = data.gender==0?'男':'女';
            this.form.email = data.email;
            this.form.mAvatar = data.mAvatar;
            setTimeout(()=>{
                this.showArea = true;
                this.form.address = [data.province,data.city,data.country];
            },300)
            this.form.detial = data.detial;
            this.form.zipCode = data.addPost;
            this.oldForm = JSON.parse(JSON.stringify(this.form));
            //获取收货地址
            this.getAddressList();
        },
        //成功添加新地址事件
        getAddress(data){
            //重新获取全部收货地址
            this.getAddressList();
        },
        //成功修改地址事件
        getChangeAddress() {
            this.getAddressList();
        },
        //重置头像
        onRest(){
            this.$request({
                method:'get',
                url:"/apis/member/updateBasicMCode",
                params: {
                    mCode:this.form.id
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        message: '已重置头像!',
                        type: 'success'
                    });
                    this.form.mAvatar = 'http://pm30n5q6j.bkt.clouddn.com/12f96cb5d9284a45bedc3aec1db096ca.PNG';
                }
            })
        }
    }
};
</script>

<style scoped>
    .head-img{
        border:1px solid #ccc;
        width:50px;
        height: 50px;
        display: inline-block;
        margin-right:18px;
        border-radius: 50%;
        vertical-align: middle;
    }
</style>
