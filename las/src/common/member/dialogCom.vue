<template>
    <div class="wrap">

        <!-- 弹出搜索层 -->
        <el-dialog :visible.sync="searchUser" width="90%" center>
            <el-form label-width="70px" label-position="left">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="用户编号">
                            <el-input size="mini" v-model="searchFrom.mCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="姓名">
                            <el-input size="mini" v-model="searchFrom.mName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="onSearchDialog">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="手机号码">
                            <el-input size="mini" v-model="searchFrom.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="昵称">
                            <el-input size="mini" v-model="searchFrom.mNickname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table 
                ref="multipleTable" 
                :data="tableData" 
                tooltip-effect="dark" 
                border
                v-loading="loadingTable" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column label="选择" type="" width="55" align="center">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="mCode" label="编号" width="80" align="center" sortable>                   
                </el-table-column>
                <el-table-column prop="mName" label="姓名" width="90" align="center">
                </el-table-column>
                <el-table-column prop="mNickname" label="昵称" align="center">
                </el-table-column>
                 <el-table-column prop="mId" label="推荐人编号" align="center" width="100">
                </el-table-column>
                 <el-table-column prop="" label="推荐人昵称" align="center" width="100">
                </el-table-column>
                 <el-table-column prop="mobile" label="手机号码" align="center" width="100">
                </el-table-column>
                 <el-table-column label="性别" width="50" align="center">
                     <template slot-scope="scope">
                         {{scope.row.gender==0?'男':'女'}}
                    </template>
                </el-table-column>
                 <el-table-column prop="birthdate" label="出生日期" align="center" width="90">
                </el-table-column> 
                <el-table-column prop="creationData" label="加入日期" align="center" width="90">
                </el-table-column>
                <el-table-column prop="updateDate" label="加入期间" align="center" width="90">
                </el-table-column>
                <el-table-column prop="mStatus" label="级别" align="center" width="50">
                </el-table-column>
                <el-table-column prop="mLevel" label="状态" align="center" width="80">
                </el-table-column>
                <el-table-column prop="province" label="省" align="center">
                </el-table-column>
                <el-table-column prop="city" label="市" align="center">
                </el-table-column>
                <el-table-column prop="country" label="区县" align="center">
                </el-table-column>
                <el-table-column prop="detial" label="详细地址" align="center" width="200">
                </el-table-column>
                <el-table-column prop="addPost" label="邮编" width="70" align="center">
                </el-table-column>
            </el-table>
            <br>
            <el-row type="flex" justify="center">
                <el-col :span="8" >
                    <el-pagination
                        :page-size="searchFrom.pageSize"
                        layout="total, sizes, prev, pager, next"
                        :page-sizes="[2, 3, 4, 5]"
                        :total="searchFrom.total"
                        :current-page="searchFrom.currentPage"
                        @current-change="onChangePage"
                        @size-change="handleSizeChange">
                    </el-pagination>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="searchUser = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="sendData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 成功提交弹出层 -->
        <el-dialog title="提示" :visible.sync="DialogVisible" width="300px" center>
            <p class="text-center">恭喜，信息已修改成功！</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="DialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加银行卡弹出层 -->
        <el-dialog title="提示" :visible.sync="DialogBank" width="400px" center>
            <el-form :rules="rulesBank" :model="fromBank" ref="fromBank" label-width="70px" label-position="left">
                <el-form-item label="开户行" prop="type">
                    <el-select v-model="fromBank.type" placeholder="请选择" >
                        <el-option v-for="(items,index) in fromBank.select" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="户名" prop="name">
                    <el-input v-model="fromBank.name"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="账号" prop="number">
                    <el-input v-model="fromBank.number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="DialogBank = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="onAddBank('fromBank')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加新地址弹出层 -->
        <el-dialog title="添加新地址"  :visible.sync="DialogAddress" width="600px" center>
            <el-form status-icon :rules="rulesAddress" :model="fromAddress" ref="fromAddress" label-width="80px" label-position="left">
                <el-form-item label="地址" class="inline-block" prop="address">
                    <div class="area" >
                        <area-select type="text" :level="2" :placeholders="placeholders" v-model="fromAddress.address"  :data="pcaa"></area-select>
                    </div>
                </el-form-item>
                <br><br>
                <el-form-item label="详细地址" prop="detial">
                    <el-input v-model="fromAddress.detial"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="收货人" prop="name">
                    <el-input v-model="fromAddress.name"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="手机号" prop="tel">
                    <el-input v-model="fromAddress.tel"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="电话">
                    <el-input v-model="fromAddress.phone"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="设为默认地址" label-width="120px">
                    <el-radio-group v-model="fromAddress.defaultAdd">
                        <el-radio label="是" ></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="DialogAddress = false">取 消</el-button>
                <el-button type="primary" size="mini" v-if="BtnAddAddress" @click="onSendAddress('fromAddress')">确定添加</el-button>
                <el-button type="primary" size="mini" v-if="BtnChangeAddress" @click="OnchangeAddress('fromAddress')">确定修改</el-button>
            </span>
        </el-dialog>

        <!-- 删除地址弹出层 -->
        <el-dialog title="删除地址" :visible.sync="DialogRemoveAddress" width="300px" center>
            <span>是否删除该地址！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="DialogRemoveAddress = false">取消</el-button>
                <el-button type="primary" size="mini" @click="onRemoveAddress">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 解绑银行卡弹出层 -->
        <el-dialog title="解绑银行卡" :visible.sync="DialogUntieBank" width="300px" center>
            <span>是否解绑银行卡！</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="DialogUntieBank = false">取消</el-button>
                <el-button type="primary" size="mini" @click="onUntieBank">确 定</el-button>
            </span>
        </el-dialog>

        

        <!-- 自定义弹出层 -->
        <el-dialog title="提示" :visible.sync="onClose" width="300px" center>
            <p class="text-center">{{title}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="onClose = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>


<script>
import Vue from 'vue'
import util from "../../util/util.js";
import { pca, pcaa } from "area-data";
export default {
    name: "dialog-com",
    data() {
        //手机号码验证
        var validateTel = (rule, value, callback) => {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            let isTel = reg.test(value);
            if ( !isTel) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        return {
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa,
            showHead:true,  //隐藏搜索层的搜索表单
            loadingTable:true, //加载列表
            selectNum:"",
            BtnAddAddress:false,  //是否显示添加新收货地址确定按钮
            BtnChangeAddress:false,  //是否显示修改收货地址确定按钮
            DialogVisible: false,  //是否显示提交层
            DialogRemoveAddress: false,  //是否显示删除地址弹出层
            DialogUntieBank:false,  //是否显示解绑银行卡弹出层
            DialogAddress: false,  //是否显示添加新地址弹出层
            onClose: false,  //自定义弹出层
            title:"",   //自定义弹出层标题
            searchUser: false,  //是否显示搜索用户层
            DialogBank: false,  //是否显示绑定银行卡层
            radio: "",  //默认按钮
            tempData:null,
            tableData: [],  //会员列表数据
            //新添银行卡
            fromBank:{
                type:"",
                name:"",
                number:"",
                select: ['中国工商银行','中国农业银行','中国建设银行','中国银行','招商银行','中国民生银行','中国光大银行','中信银行','交通银行','兴业银行','上海浦东发展银行','华夏银行','深圳发展银行','广东发展银行','中国邮政储蓄银行']
            },
            //添加新地址表单
            fromAddress: {
                address:[],
                detial:"",
                name:"",
                tel:"",
                phone:"",
                defaultAdd:"否"
            },
            //搜索框搜索表单
            searchFrom:{
                currentPage:1,
                pageSize:5,
                total:null,
                mCode:"",
                mName:"",
                mobile:"",
                mNickname:""
            },
            //收货地址表单验证规则
            rulesAddress: {
                address: [
                    { required: true, message: "请选择收货地址", trigger: ['blur','change'] },
                ],
                detial: [
                    { required: true, message: "请输入详细地址", trigger:['blur','change'] },
                    { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: ['blur','change'] }
                ],
                name: [
                    { required: true, message: "请输入收货人", trigger: ['blur','change'] },
                    { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: ['blur','change'] }
                    ], 
                tel: [
                    { required: true, message: "请输入手机号", trigger: ['blur','change'] },
                    { validator: validateTel, trigger: ['blur','change']}    
                ]
            },
            //银行卡表单验证规则
            rulesBank: {
                type: [
                    { required: true, message: "请选择开户行", trigger: ['blur','change'] },
                ],
                name: [
                    { required: true, message: "请输入户名", trigger: ['blur','change'] },
                    { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: ['blur','change'] }
                ],
                number: [
                    { required: true, message: "请输入账号", trigger: ['blur','change'] },
                    { min: 16, max: 19, message: "长度为16位到19位", trigger: ['blur','change'] }
                ]
            }
            
        };
    },
    methods: {       
        //搜索层多条件查询
        onSearchDialog() {
            this.loadingTable = true; 
            this.getMemberinfo();
        },
        //改变页数
        onChangePage(currentPage) {
            this.searchFrom.currentPage = currentPage;
            this.getMemberinfo();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.searchFrom.pageSize = pageSize;
            this.getMemberinfo();
        },
        //向后台请求会员列表
        getMemberinfo() {
            this.$axios({
                method:'post',
                url:"/apis/member/search",
                params:{
                    currentPage:this.searchFrom.currentPage,
                    pageSize:this.searchFrom.pageSize,
                    mCode:this.searchFrom.mCode,
                    mName:this.searchFrom.mName,
                    mobile:this.searchFrom.mobile,
                    mNickname:this.searchFrom.mNickname
                }
            })     
            .then(response=>{
                this.tableData = response.data.data.list;
                this.searchFrom.total = response.data.data.total;
                for(let i = 0; i < response.data.data.list.length; i++){
                    this.$axios({
                        method:'get',
                        url:"/apis/member/findRelationByMCode",
                        params:{
                            mCode:response.data.data.list[i].mCode,
                        }
                    })     
                    .then(response=>{ 
                        if(response.data.code){
                            this.tableData[i].mStatus = response.data.data.mStatus;
                            this.tableData[i].mLevel = response.data.data.rank;
                            Vue.set(this.tableData,i,this.tableData[i])
                        }
                    })
                    
                }
                this.loadingTable = false;
            })
        },
        //搜索层选中数据,返回选中行下标
        getCurrentRow(val) {
            this.selectNum =val;
        },
        //搜索框发送选中数据
        sendData() {
            //如果未选择数据
            if(this.selectNum===""){
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }else {
                util.$emit("TabelData",this.tableData[this.selectNum]);
                this.searchUser = false;
            }
        },


        //发送添加新地址事件
        onSendAddress(fromAddress) {
            this.$refs[fromAddress].validate((valid) => {
                if (valid) {
                    util.$emit("Addaddress",this.fromAddress)
                    this.DialogAddress = false;
                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入必填信息!',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        //修改收货地址事件
        OnchangeAddress(fromAddress) {
            this.$refs[fromAddress].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method:'post',
                        url:"/apis/member/editMemAdd",
                        params: {
                            aId:this.fromAddress.aId,
                            mCode:this.fromAddress.mCode,
                            consigneeName:this.fromAddress.name,
                            mobile:this.fromAddress.tel,
                            phone:this.fromAddress.phone,
                            addProvinceCode:this.fromAddress.address[0],
                            addCityCode:this.fromAddress.address[1],
                            addCountryCode:this.fromAddress.address[2],
                            addDetial:this.fromAddress.detial,
                            addPost:this.fromAddress.addPost,
                            defaultAdd:this.fromAddress.defaultAdd=="是"?1:0
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            util.$emit("addressChangeSuccess");
                            this.DialogAddress = false;
                        } else{
                            console.log("修改地址失败");
                        }
                    })   

                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入必填信息!',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        //删除地址事件
        onRemoveAddress() {
            this.$axios({
                method:'get',
                url:"/apis/member/delMemAddByAId",
                params: {
                    aId:this.fromAddress.aId,
                    mCode:this.fromAddress.mCode
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        message: '成功删除该地址!',
                        type: 'success'
                    });
                    util.$emit("RemoveAddressSuccess");
                    this.DialogRemoveAddress = false;
                } else{
                    this.$message({
                        showClose: true,
                        message: '服务器未响应!',
                        type: 'error'
                    });
                }
            })    
        },


        //添加银行卡
        onAddBank(fromBank) {
            this.$refs[fromBank].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method:'post',
                        url:"/apis/member/addBankByMCode",
                        params: {
                            mCode:this.fromBank.mid,
                            bankCode:this.fromBank.type,
                            accName:this.fromBank.name,
                            accCode:this.fromBank.number
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: '添加银行卡成功!',
                                type: 'success'
                            });
                        this.DialogBank = false;
                        util.$emit("addBankSuccess");
                        } else{
                            this.$message({
                                showClose: true,
                                message: '服务器未响应!',
                                type: 'error'
                            });
                        }
                    }) 
                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入必填信息!',
                        type: 'error'
                    });
                    return false;
                }
            });
              
        },
        //解绑银行卡
        onUntieBank() {
            console.log(this.tempData.aId)
            this.$axios({
                method:'get',
                url:"/apis/member/delBankByOid",
                params: {
                    oId:this.tempData.aId,
                    mCode:this.tempData.mCode
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: '解绑银行卡成功!',
                        type: 'success'
                    });
                    util.$emit("UntieBankSuccess")
                    this.DialogUntieBank = false;
                } else{
                    console.log("获取修改地址失败");
                }
            }) 
        }

    },
    created (){
        //监听提交弹窗事件
        util.$on("showdialog",()=>{
            this.DialogVisible = true;
        });

        //监听自定义弹出层事件
        util.$on("userDefined",(val)=>{
            this.onClose = true;
            this.title = val;
        })


        //监听添加新地址弹出层事件
        util.$on("DialogAddAddress",()=>{
            this.fromAddress = {
                address:[],
                detial:"",
                name:"",
                tel:"",
                phone:"",
                defaultAdd:"否"
            },
            this.DialogAddress = true;
            this.BtnChangeAddress = false;
            this.BtnAddAddress = true;
        })
        //监听删除地址弹出层事件
        util.$on("DialogAddressRemove",(data)=>{
            this.DialogRemoveAddress = true;
            this.fromAddress.aId = data.aId,
            this.fromAddress.mCode = data.mCode
        })
        //监听修改地址弹出层事件
        util.$on("DialogAddressChange",(data)=>{
            this.BtnAddAddress = false;
            this.BtnChangeAddress = true;
            this.$axios({
                method:'get',
                url:"/apis/member/findMemAddByMCode",
                params: {
                    aId:data.aId,
                    mCode:data.mCode
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.fromAddress.aId = response.data.data.aId,
                    this.fromAddress.mCode = response.data.data.mCode,
                    this.fromAddress.addPost = response.data.data.addPost,
                    this.fromAddress.address[0] = response.data.data.addProvinceCode,
                    this.fromAddress.address[1] = response.data.data.addCityCode,
                    this.fromAddress.address[2] = response.data.data.addCountryCode,
                    this.fromAddress.detial = response.data.data.addDetial,
                    this.fromAddress.name = response.data.data.consigneeName,
                    this.fromAddress.tel = response.data.data.mobile,
                    this.fromAddress.phone = response.data.data.phone,
                    this.fromAddress.defaultAdd = response.data.data.defaultAdd==1?'是':'否',
                    this.DialogAddress = true;
                } else{
                    console.log("获取修改地址失败");
                }
            })    
        })


        //监听搜索弹窗事件
        util.$on("searchdialog",(val)=>{
            this.searchUser = true;
            this.getMemberinfo();
        });


        //监听添加银行卡弹窗事件
        util.$on("DialogBank",(mid)=>{
            this.fromBank.type = "",
            this.fromBank.name = "",
            this.fromBank.number = "",
            this.DialogBank = true;
            this.fromBank.mid = mid;
        });
        //监听解绑银行卡弹出层
        util.$on("dialogUntieBank",(data)=>{
            this.tempData = data;
            this.DialogUntieBank = true;
        });
    } 
};
</script>

<style>
.el-dialog__wrapper .el-form-item {
    margin-bottom: 0px;
}
.el-radio > .el-radio__label {
    display: none;
}
</style>
