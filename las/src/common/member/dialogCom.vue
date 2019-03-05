<template>
    <div class="wrap">
        <!-- 弹出搜索层 -->
        <el-dialog :visible.sync="DialogsearchUser" width="90%" center>
            <el-form label-width="70px" label-position="left">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="用户编号">
                            <el-input v-model.number="searchFrom.mCode" @keyup.enter.native="onSearchDialog"  @keyup.native="inputNumberCode($event)" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="姓名">
                            <el-input v-model="searchFrom.mName" @keyup.enter.native="onSearchDialog" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" @click="onSearchDialog()" icon="el-icon-search">搜 索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="手机号码">
                            <el-input v-model.number="searchFrom.mobile" @keyup.enter.native="onSearchDialog" @keyup.native="inputNumber($event)" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="1">
                        <el-form-item label="昵称">
                            <el-input v-model="searchFrom.mNickname" @keyup.enter.native="onSearchDialog" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table 
                ref="multipleTable" 
                :data="tableData" 
                tooltip-effect="dark" 
                border
                style="cursor: pointer;"
                @row-dblclick="rowDblclick"
                v-loading="loadingTable" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column label="选择" type="" width="55" align="center">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="selectNum" :disabled="scope.row.mCode==disabledSelect" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="mCode" label="编号" width="80" align="center" sortable>                   
                </el-table-column>
                <el-table-column prop="mName" label="姓名" width="90" align="center">
                </el-table-column>
                <el-table-column prop="mNickname" label="昵称" align="center">
                </el-table-column>
                 <el-table-column prop="refereeId" label="推荐人编号" align="center" width="100">
                </el-table-column>
                 <el-table-column prop="refereeName" label="推荐人姓名" align="center" width="100">
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
                <el-table-column prop="mLevel" label="级别" align="center" width="120">
                </el-table-column>
                <el-table-column prop="mStatus" label="状态" align="center" min-width="60">
                </el-table-column>
                <el-table-column prop="province" label="省" align="center" min-width="110">
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
                <el-col :span="8" align="center">
                    <el-pagination
                        :page-size="searchFrom.pageSize"
                        layout="total, sizes, prev, pager, next"
                        :page-sizes="[10, 20, 30, 999]"
                        :total="searchFrom.total"
                        :current-page="searchFrom.currentPage"
                        @current-change="onChangePage"
                        @size-change="handleSizeChange">
                    </el-pagination>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogsearchUser = false">取 消</el-button>
                <el-button type="primary" @click="sendData">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加银行卡弹出层 -->
        <el-dialog title="提示" :visible.sync="DialogBank" width="400px" center>
            <el-form :rules="rulesBank" :model="fromBank" ref="fromBank" label-width="70px" label-position="left">
                <el-form-item label="开户行" prop="type">
                    <el-select v-model.trim="fromBank.type" placeholder="请选择" >
                        <el-option v-for="(items,index) in fromBank.select" :key="index" :label="items" :value="items"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="户名" prop="name">
                    <el-input v-model.trim="fromBank.name" @keyup.native="inputChar($event)"></el-input>
                </el-form-item>
                
                <el-form-item label="账号" prop="number">
                    <el-input v-model.trim="fromBank.number"  @keyup.native="inputBank($event)"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogBank = false">取 消</el-button>
                <el-button type="primary" @click="onAddBank('fromBank')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加新地址弹出层 -->
        <el-dialog :title="DialogAddressTitle"  :visible.sync="DialogAddress" width="600px" center>
            <el-form status-icon :rules="rulesAddress" :model="fromAddress" ref="fromAddress" label-width="80px" label-position="left">
                <el-form-item label="地址" prop="address">
                    <div class="area" v-if="areaLoading">
                        <area-select type="text" :level="2" :placeholders="placeholders" v-model="fromAddress.address"  :data="pcaa"></area-select>
                    </div>
                </el-form-item>
                
                <el-form-item label="详细地址" prop="detial">
                    <el-input v-model.trim="fromAddress.detial"></el-input>
                </el-form-item>
                
                <el-form-item label="收货人" prop="name">
                    <el-input v-model.trim="fromAddress.name"></el-input>
                </el-form-item>
                
                <el-form-item label="手机号" prop="tel">
                    <el-input v-model.trim="fromAddress.tel"></el-input>
                </el-form-item>
                
                <el-form-item label="电话">
                    <el-input v-model="fromAddress.phone"></el-input>
                </el-form-item>
                
                <el-form-item label="设为默认地址" label-width="120px">
                    <el-radio-group v-model="fromAddress.defaultAdd">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogAddress = false">取 消</el-button>
                <el-button type="primary" v-if="BtnAddAddress" @click="onSendAddress('fromAddress')">确定添加</el-button>
                <el-button type="primary" v-if="BtnChangeAddress" @click="OnchangeAddress('fromAddress')">确定修改</el-button>
            </span>
        </el-dialog>


        <!-- 自定义标题弹出层 -->
        <el-dialog title="提示" :visible.sync="DialogCustom" width="300px" center>
            <p class="text-center custom">
                <i v-show="icontype=='success'" class="el-icon-success"></i>
                <i v-show="icontype=='error'" class="el-icon-error"></i>
                <i v-show="icontype=='warning'" class="el-icon-warning"></i>
                {{title}}
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DialogCustom = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 用户信息详情弹出层 -->
        <el-dialog title="用户信息修改详情" :visible.sync="DialogInfoChange" width="900px" center>
            <el-form status-icon  label-position="left" class="form-details">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会员编号:">
                            {{changeDetails.mCode}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="审批状态:">
                            <span class="diff">{{changeDetails.reviewStatus}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原姓名:">
                            {{changeDetails.mNameBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新姓名:">
                            <span :class="{'diff':changeDetails.mName!=changeDetails.mNameBefore}">{{changeDetails.mName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原昵称:">
                            {{changeDetails.mNicknameBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新昵称:">
                             <span :class="{'diff':changeDetails.mNicknameBefore!=changeDetails.mNickname}">{{changeDetails.mNickname}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原性别:">
                            {{changeDetails.genderBefore==0?'男':'女'}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新性别:">
                            <span :class="{'diff':changeDetails.genderBefore!=changeDetails.gender}">{{changeDetails.gender==0?'男':'女'}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原手机号码:">
                            {{changeDetails.mobileBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新手机号码:">
                           <span :class="{'diff':changeDetails.mobileBefore!=changeDetails.mobile}">{{changeDetails.mobile}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="微信号:">
                            {{changeDetails.weChatBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新微信号:">
                            <span :class="{'diff':changeDetails.weChatBefore!=changeDetails.weChat}">{{changeDetails.weChat}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原Email:">
                            {{changeDetails.emailBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新Email:">
                            <span :class="{'diff':changeDetails.emailBefore!=changeDetails.email}">{{changeDetails.email}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原邮编:">
                            {{changeDetails.addPostBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新邮编:">
                            <span :class="{'diff':changeDetails.addPostBefore!=changeDetails.addPost}">{{changeDetails.addPost}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原地址:">
                            {{changeDetails.provinceBefore}}-{{changeDetails.cityBefore}}-{{changeDetails.countryBefore}}-{{changeDetails.detialBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新地址:">
                            <span 
                                :class="{'diff':changeDetails.detialBefore!=changeDetails.detial||changeDetails.cityBefore!=changeDetails.city||changeDetails.provinceBefore!=changeDetails.province||changeDetails.countryBefore!=changeDetails.country}">
                                {{changeDetails.province}}-{{changeDetails.city}}-{{changeDetails.country}}-{{changeDetails.detial}}
                            </span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原开户行:">
                            {{changeDetails.bankdetailBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新开户行:">
                            <span :class="{'diff':changeDetails.bankdetailBefore!=changeDetails.bankdetail}">{{changeDetails.bankdetail}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原户名:">
                            {{changeDetails.accNameBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新户名:">
                            <span :class="{'diff':changeDetails.accNameBefore!=changeDetails.accName}">{{changeDetails.accName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原账号:">
                            {{changeDetails.accCodeBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新账号:">
                            <span :class="{'diff':changeDetails.accCodeBefore!=changeDetails.accCode}">{{changeDetails.accCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原证件类型:">
                            {{changeDetails.idTypeBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新证件类型:">
                            <span :class="{'diff':changeDetails.idTypeBefore!=changeDetails.idType}">{{changeDetails.idType}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原证件号码:">
                            {{changeDetails.idCodeBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新证件号码:">
                            <span :class="{'diff':changeDetails.idCodeBefore!=changeDetails.idCode}">{{changeDetails.idCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原推荐人编号:">
                            {{changeDetails.sponsorCodeBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新推荐人编号:">
                            <span :class="{'diff':changeDetails.sponsorCodeBefore!=changeDetails.sponsorCode}">{{changeDetails.sponsorCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原推荐人姓名:">
                            {{changeDetails.sponsorNameBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新推荐人姓名:">
                            <span :class="{'diff':changeDetails.sponsorNameBefore!=changeDetails.sponsorName}">{{changeDetails.sponsorName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原级别:">
                            {{changeDetails.rankBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新级别:">
                            <span :class="{'diff':changeDetails.rankBefore!=changeDetails.rank}">{{changeDetails.rank}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原绑定账号编号:">
                            {{changeDetails.raCodeBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新绑定账号编号:">
                            <span :class="{'diff':changeDetails.raCodeBefore!=changeDetails.raCode}">{{changeDetails.raCode}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="原绑定账号姓名:">
                            {{changeDetails.raNameBefore}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="新绑定账号姓名:">
                            <span :class="{'diff':changeDetails.raNameBefore!=changeDetails.raName}">{{changeDetails.raName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="证明材料:">
                            <img class="imglist" @click="showBigImg('/apis/'+items)" v-for="(items,index) in changeDetails.uploadPath" :key="index" :src="('/apis/')+items"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="修改人:">
                            {{changeDetails.updateBy}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="修改备注:">
                            <span class="diff">{{changeDetails.updateMemo}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="审核备注:">
                            <span class="diff" v-show="!isShowbtn">{{changeDetails.reviewMemo}}</span>
                            <el-input v-show="isShowbtn" v-model="changeDetails.reviewMemo" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer" v-show="isShowbtn">
                <el-button type="success" @click="onExaminePass">审核通过</el-button>
                <el-button type="danger" @click="onExamineReject">驳 回</el-button>
            </span>
        </el-dialog>

        <!-- 缩略图放大弹出层 -->
        <el-dialog title="证明材料" :visible.sync="DialogBigImg" width="80%" center>
            <img :src="BigImg" alt="" width="100%">
        </el-dialog>

    </div>

</template>


<script>
import Vue from 'vue'
import { pca, pcaa } from "area-data";
export default {
    name: "dialog-com",
    data() {
        //手机号码验证
        var validateTel = (rule, value, callback) => {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            let isTel = reg.test(value);
            if (!isTel) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        };
        return {
            placeholders: ["省", "市", "区"],
            pca: pca,
            pcaa,
            areaLoading:false,  //加载地址
            showHead:true,  //隐藏搜索层的搜索表单
            loadingTable:true, //加载列表
            selectNum:"",   //搜索框选中的用户下标
            disabledSelect:"",  //禁止选择的用户
            BtnAddAddress:false,  //是否显示添加新收货地址确定按钮
            BtnChangeAddress:false,  //是否显示修改收货地址确定按钮
            DialogAddress: false,  //是否显示添加新地址弹出层
            DialogAddressTitle:"", //地址弹出层标题
            DialogInfoChange: false,  //是否显示用户信息修改弹出层
            DialogBank: false,  //是否显示绑定银行卡弹出层
            DialogsearchUser: false,  //是否显示搜索用户弹出层
            DialogBigImg:false,  //是否显示缩略图放大弹出层
            BigImg:"", //缩略图
            DialogCustom: false,  //自定义弹出层
            title:"",   //自定义弹出层标题
            icontype:"",    //自定义弹出层图标
            tempData:null,
            tableData: [],  //会员列表数据
            changeDetails: {},  //修改详情数据
            isShowbtn:false, //修改详情是否有提交按钮
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
                pageSize:10,
                total:1,
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
            },
            
        };
    },
    watch: {
        DialogsearchUser(){
            //出初化搜索用户状态
            if(!this.DialogsearchUser){
                this.searchFrom.mCode = "";
                this.searchFrom.mName = "";
                this.searchFrom.mNickname = "";
                this.searchFrom.currentPage = 1;
            }
        }
    },
    methods: {  
        //限制input输入   
        inputNumber(e){
            let val = e.target.value;
            let reg = new RegExp("^[0-9]*$");
            let isNumber = reg.test(val);
            if(val>11 && isNumber){
                this.searchFrom.mobile = val.slice(0,11);
            }else{
                this.searchFrom.mobile = val.replace(/[^\d]/g,'');
            }
        },
        inputNumberCode(e){
            this.searchFrom.mCode = e.target.value.replace(/[^\d]/g,'');
        },
        inputChar(e){
            let val = e.target.value;
            if(val.length>8){
                this.fromBank.name = val.slice(0,8);
            }else{
                this.fromBank.name = val.replace(/[^\u4e00-\u9fa5]/g,'');
            }
        },
        inputBank(e){
            this.fromBank.number = e.target.value.replace(/[^\d]/g,'');
        },

        //搜索层多条件查询
        onSearchDialog(data) {
            if(data) {
                this.disabledSelect = data.currentMcode;
                if(data.key=="mCode"){
                    this.searchFrom.mCode = data.value;
                }else if(data.key=="mName"){
                    this.searchFrom.mName = data.value;
                }else if(data.key=="mNickname"){
                    this.searchFrom.mNickname = data.value;
                }
            }else{
                this.disabledSelect = "";
                
            }
            this.DialogsearchUser = true;
            this.selectNum = "";
            this.getMemberinfo();
        },
        //向后台请求会员列表
        getMemberinfo() {
            this.tableData = [];
            this.loadingTable = true; 
            this.$request({
                method:'post',
                url:"/apis/member/search",
                params:{
                    currentPage:this.searchFrom.currentPage,
                    pageSize:this.searchFrom.pageSize,
                    mCode:this.searchFrom.mCode,
                    mName:this.searchFrom.mName,
                    mobile:this.searchFrom.mobile,
                    mNickname:this.searchFrom.mNickname,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    if(response.data.data.list.length==0){
                        setTimeout(()=>{
                            this.loadingTable = false;
                        },200)
                        return;
                    }
                    this.tableData = response.data.data.list;
                    this.searchFrom.total = response.data.data.total;
                    for(let i = 0; i < response.data.data.list.length; i++){
                        //处理出生日期
                        if(this.tableData[i].birthdate){
                            this.tableData[i].birthdate = this.tableData[i].birthdate.slice(0,10);
                        }
                        if(this.tableData[i].creationData){
                            this.tableData[i].creationData = this.tableData[i].creationData.slice(0,10);
                        }
                        Promise.all([
                            //获取会员状态，级别
                                this.$request({
                                    method:'get',
                                    url:"/apis/member/findRelationByMCode",
                                    params:{
                                        mCode:response.data.data.list[i].mCode,
                                        date:new Date().getTime()
                                    }
                                })     
                                .then(response=>{ 
                                    if(response.data.code){
                                        this.tableData[i].mStatus = response.data.data.memberRelation.mStatus==0?'正常':(response.data.data.memberRelation.mStatus==1?'冻结':'未激活');
                                        this.tableData[i].mLevel = response.data.data.rankName;
                                        Vue.set(this.tableData,i,this.tableData[i])
                                    }
                                }),
                                //获取推荐人信息
                                this.$request({
                                    method:'get',
                                    url:"/apis/member/findRelationByMCode",
                                    params: {
                                        mCode:response.data.data.list[i].mCode,
                                        date:new Date().getTime()
                                    }
                                })
                                .then(response=>{
                                    if(response.data.code){
                                        this.tableData[i].refereeId = response.data.data.memberRelation.sponsorCode;
                                        this.tableData[i].refereeName = response.data.data.memberRelation.sponsorName;
                                        this.tableData[i].raSponsorStatus = response.data.data.memberRelation.raSponsorStatus;
                                        Vue.set(this.tableData,i,this.tableData[i])
                                    }
                                })
                        ])
                        .then(()=>{
                            setTimeout(()=>{
                                this.loadingTable = false;
                            },200)
                        })
                    }
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
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
        //搜索层选中数据,返回选中行下标
        getCurrentRow(val) {
            this.selectNum =val;
        },
        //双击某行
        rowDblclick(row){
            //被禁止选择的行
            if(row.mCode==this.disabledSelect){
                return ;
            }
            this.$emit("searchData",row);
            this.DialogsearchUser = false;
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
                this.$emit("searchData",this.tableData[this.selectNum]);
                this.DialogsearchUser = false;
            }
        },
        //监听添加新地址弹出层事件
        showDialogAddAddress(data){
            this.DialogAddressTitle = "添加地址";
            this.tempData = data;
            this.areaLoading = false;
            this.fromAddress = {
                address:[],
                detial:"",
                name:"",
                tel:"",
                phone:"",
                defaultAdd:"否"
            },
            setTimeout(()=>{
                this.areaLoading = true;
            },100)
            this.DialogAddress = true;
            this.BtnChangeAddress = false;
            this.BtnAddAddress = true;
        },
        //发送添加新地址事件
        onSendAddress(fromAddress) {
            this.$refs[fromAddress].validate((valid) => {
                if (valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/addMemAdd",
                        params: {
                            mCode: this.tempData.id,
                            consigneeName: this.fromAddress.name,
                            mobile: this.fromAddress.tel,
                            phone: this.fromAddress.phone,
                            addProvinceCode: this.fromAddress.address[0],
                            addCityCode: this.fromAddress.address[1],
                            addCountryCode: this.fromAddress.address[2],
                            addDetial: this.fromAddress.detial,
                            addPost: this.tempData.zipCode,
                            defaultAdd: this.fromAddress.defaultAdd=="是"?1:0
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                message: '添加新收货地址成功！',
                                type: 'success'
                            });
                            this.$emit("addAddress");
                        } else{
                            this.$message({
                                message: '添加新收货地址失败！',
                                type: 'error'
                            });
                        }
                    })  
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
        //修改地址事件
        showDialogAddressChange(data){
            this.DialogAddressTitle = "修改地址";
            this.BtnAddAddress = false;
            this.BtnChangeAddress = true;
            this.areaLoading = false;
            this.$request({
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
                    this.$message({
                        message: '获取修改地址失败!',
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.areaLoading = true;
                },100)
            })    
        },
        //修改收货地址事件
        OnchangeAddress(fromAddress) {
            this.DialogAddressTitle = "修改收货地址";
            this.$refs[fromAddress].validate((valid) => {
                if (valid) {
                    this.$request({
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
                            this.$emit("changeAddress");
                            this.DialogAddress = false;
                        } else{
                            this.$message({
                                message: '修改地址失败!',
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

        //监听添加银行卡弹窗事件
        showDialogBank(mid){
            this.fromBank.type = "",
            this.fromBank.name = "",
            this.fromBank.number = "",
            this.DialogBank = true;
            this.fromBank.mid = mid;
        },
        //添加银行卡
        onAddBank(fromBank) {
            this.$refs[fromBank].validate((valid) => {
                if (valid) {
                    this.$request({
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
                        this.$emit("addBank");
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

        //审核通过
        onExaminePass() {
            this.$request({
                method:'post',
                url:"/apis/member/updateEditById",
                params:{
                    rId:this.changeDetails.rId,
                    reviewStatus:2,
                    reviewMemo:this.changeDetails.reviewMemo
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message:"审核成功",
                        type: 'success'
                    }); 
                    this.$emit("changeDetail");
                }else {
                    this.$message({
                        showClose: true,
                        message:response.data.msg,
                        type: 'error'
                    });
                }
            })
            this.DialogInfoChange = false;
        },
        //驳回
        onExamineReject() {
            this.$request({
                method:'post',
                url:"/apis/member/updateEditById",
                params:{
                    rId:this.changeDetails.rId,
                    reviewStatus:1,
                    reviewMemo:this.changeDetails.reviewMemo
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message:"成功驳回",
                        type: 'success'
                    });
                    this.$emit("changeDetail");
                }else {
                    this.$message({
                        showClose: true,
                        message:response.data.msg,
                        type: 'error'
                    });
                }
            })
            this.DialogInfoChange = false;
        },
        //监听用户修改详情弹出层
        showDialoChangeDetails(data){
            this.changeDetails = null;
            this.DialogInfoChange = true;
            //有提交事件
            if(data.showSubmit){
                this.isShowbtn = true;
            }else {
                this.isShowbtn = false;
            }
            
            this.changeDetails = data.data;
            //证件类型
            if(this.changeDetails.idTypeBefore==1){
                this.changeDetails.idTypeBefore = "身份证";
            }else if(this.changeDetails.idTypeBefore==2){
                this.changeDetails.idTypeBefore = "护照";
            }else if(this.changeDetails.idTypeBefore==3){
                this.changeDetails.idTypeBefore = "军官证";
            }else if(this.changeDetails.idTypeBefore==4){
                this.changeDetails.idTypeBefore = "回乡证";
            }
            if(this.changeDetails.idType==1){
                this.changeDetails.idType = "身份证";
            }else if(this.changeDetails.idType==2){
                this.changeDetails.idType = "护照";
            }else if(this.changeDetails.idType==3){
                this.changeDetails.idType = "军官证";
            }else if(this.changeDetails.idType==4){
                this.changeDetails.idType = "回乡证";
            }
            //会员级别
            if(this.changeDetails.rank==0){
                this.changeDetails.rank = "普通会员";
            }else if(this.changeDetails.rank==1){
                this.changeDetails.rank = "VIP会员";
            }else if(this.changeDetails.rank==2){
                this.changeDetails.rank = "代理会员";
            }else if(this.changeDetails.rank==3){
                this.changeDetails.rank = "初级代理店";
            }else if(this.changeDetails.rank==4){
                this.changeDetails.rank = "一级代理店";
            }else if(this.changeDetails.rank==5){
                this.changeDetails.rank = "二级代理店";
            }else if(this.changeDetails.rank==6){
                this.changeDetails.rank = "三级代理店";
            }else if(this.changeDetails.rank==7){
                this.changeDetails.rank = "旗舰店";
            }else if(this.changeDetails.rank==8){
                this.changeDetails.rank = "高级旗舰店";
            }else if(this.changeDetails.rank==9){
                this.changeDetails.rank = "超级旗舰店";
            }
            if(this.changeDetails.rankBefore==0){
                this.changeDetails.rankBefore = "普通会员";
            }else if(this.changeDetails.rankBefore==1){
                this.changeDetails.rankBefore = "VIP会员";
            }else if(this.changeDetails.rankBefore==2){
                this.changeDetails.rankBefore = "代理会员";
            }else if(this.changeDetails.rankBefore==3){
                this.changeDetails.rankBefore = "初级代理店";
            }else if(this.changeDetails.rankBefore==4){
                this.changeDetails.rankBefore = "一级代理店";
            }else if(this.changeDetails.rankBefore==5){
                this.changeDetails.rankBefore = "二级代理店";
            }else if(this.changeDetails.rankBefore==6){
                this.changeDetails.rankBefore = "三级代理店";
            }else if(this.changeDetails.rankBefore==7){
                this.changeDetails.rankBefore = "旗舰店";
            }else if(this.changeDetails.rankBefore==8){
                this.changeDetails.rankBefore = "高级旗舰店";
            }else if(this.changeDetails.rankBefore==9){
                this.changeDetails.rankBefore = "超级旗舰店";
            }
            //处理证明材料
            if(data.data.uploadPath&&typeof(data.data.uploadPath)=="string"){
                this.changeDetails.uploadPath = data.data.uploadPath.split("||");
            }
        },
        //点击缩略图放大
        showBigImg(src) {
           this.DialogBigImg = true;
           this.BigImg = src;
        },
        //自定义弹出层事件
        userDefined(data){
            this.DialogCustom = true;
            this.icontype = data.icon;
            this.title = data.title;
        }
    }
};
</script>

<style>

.el-table__row .el-radio > .el-radio__label { 
    display: none;
}
.form-details span.diff{
    color:red;
}
.form-details .el-form-item {
    margin-bottom: 0;
}

</style>
