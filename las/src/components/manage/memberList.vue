<template>
    <div class="wrap">
        <!-- 查询条件 -->
        <div class="line">
            <span>查询条件</span>
            <el-form ref="form" :model="searchFrom" label-width="70px" label-position="left">
                <el-row>
                    <el-col :span="5" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="会员编号" label-width="70px">
                            <el-input v-model.number="searchFrom.inputId" @keyup.enter.native="onSearch"   @keyup.native="inputNumberCode($event)" clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="昵称">
                            <el-input v-model="searchFrom.inputNickName" @keyup.enter.native="onSearch" clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="姓名">
                            <el-input v-model="searchFrom.inputName" @keyup.enter.native="onSearch" clearable></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="手机号码" label-width="70px">
                            <el-input v-model.number="searchFrom.inputTel" @keyup.native="inputNumber($event)" @keyup.enter.native="onSearch" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="推荐编号">
                            <el-input v-model="searchFrom.inputGrId" @keyup.enter.native="onSearch"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="推荐昵称">
                            <el-input v-model="searchFrom.inputGrName" @keyup.enter.native="onSearch"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">                       
                        <el-col :span="12">
                            <el-form-item label="级别" label-width="50px" class="text-center">
                                <el-select v-model="searchFrom.levelFrom" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData3" :key="index" :label="items" :value="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="至" label-width="50px" class="text-center">
                                <el-select v-model="searchFrom.levelTo" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData3" :key="index" :label="items" :value="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-col :span="13">
                            <el-form-item label="状态">
                                <el-select v-model="searchFrom.ostatus" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData2" :key="index" :label="items" :value="index" @keyup.enter.native="onSearch"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                        <el-form-item label="加入期间">
                            <el-date-picker 
                                v-model="searchFrom.joioTime" 
                                type="month" 
                                placeholder="全部">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" :offset="1"><el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button></el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 查询|详细|导出  -->
        <el-row>
            <el-col :span="24" align="right"> 
                <el-button @click="onDetail" icon="el-icon-tickets">详 细</el-button>
                <el-button type="success" @click="exportExcel('#memberTable','会员列表表')" icon="el-icon-download">导 出</el-button>      
            </el-col>
        </el-row>
        <br/>
        <!-- 会员列表 -->
        <el-table 
            ref="multipleTable" 
            id="memberTable"
            :data="tableData" 
            tooltip-effect="dark" 
            border
            v-loading="loadingTable" 
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading">
            <el-table-column label="选择" type="" width="50" align="center">
                <template slot-scope="scope">
                    <el-radio class="radio" v-model="selectMember" :label="scope.row" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="mCode" label="编号" width="80" align="center" sortable>                   
            </el-table-column>
            <el-table-column prop="mName" label="姓名" width="70" align="center">
            </el-table-column>
            <el-table-column prop="mNickname" label="昵称" align="center">
            </el-table-column>
                <el-table-column prop="sponsorCode" label="推荐人编号" align="center" width="100">
            </el-table-column>
                <el-table-column prop="refereeName" label="推荐人昵称" align="center" width="100">
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
            <el-table-column prop="creationPeriod" label="加入期间" align="center" width="90">
            </el-table-column>
            <el-table-column prop="mLevel" label="级别" align="center" width="90">
            </el-table-column>
            <el-table-column prop="mStatus" label="状态" align="center" width="50">
            </el-table-column>
            <el-table-column prop="province" label="省" align="center" min-width="120">
            </el-table-column>
            <el-table-column prop="city" label="市" align="center">
            </el-table-column>
            <el-table-column prop="country" label="区县" align="center">
            </el-table-column>
            <el-table-column prop="detial" label="详细地址" align="center" width="200">
            </el-table-column>
            <el-table-column prop="addPost" label="邮编" width="65" align="center">
            </el-table-column>
        </el-table>
        <br/>
        <el-row type="flex" justify="center">
            <el-col :span="8" align="center">
                <el-pagination
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 50,pageData.total]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>


<script>
import Vue from 'vue';
import {ToExportExcel} from "../../util/util.js";
export default {
    data() {
        return {
            loadingTable:false, //加载
            //查询条件选项
            selectData2: ["全部", "正常", "冻结", "注销"],
            selectData3: [
                "全部",
                "普通会员",
                "vip会员",
                "代理会员",
                "初级代理店",
                "一级代理店",
                "二级代理店",
                "三级代理店",
                "旗舰店",
                "高级旗舰店",
                "超级旗舰店"
            ],
            //查询条件
            searchFrom: {
                id: "", //会员编号
                nickname: "", //昵称
                name: "", //姓名
                tel: "", //手机号码
                grId: "", //推荐编号
                grname: "", //推荐昵称
                ostatus: "", //状态
                joioTime: "", //加入期间
                levelFrom: "", //级别from
                levelTo: "", //级别to
                inputId: "", //输入会员编号
                inputNickName: "", //输入昵称
                inputName: "", //输入姓名
                inputTel: "", //输入手机号
                inputGrId: "", //输入推荐编号
                inputGrName: "" //输入推荐昵称
            },
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:1,
            },
            selectMember:"",   //选中会员
            //会员列表
            tableData: [],
        };
    },
    methods: {
        //限制input输入   
        inputNumber(e){
            let val = e.target.value;
            let reg = new RegExp("^[0-9]*$");
            let isNumber = reg.test(val);
            if(val>11 && isNumber){
                this.searchFrom.inputTel = val.slice(0,11);
            }else{
                this.searchFrom.inputTel = val.replace(/[^\d]/g,'');
            }
        },
        inputNumberCode(e){
            console.log(e.target.value)
            this.searchFrom.inputId = e.target.value.replace(/[^\d]/g,'');
        },
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //点击查询
        onSearch() {
            this.loadingTable = true;
            this.$request({
                method:'post',
                url:"/apis/member/queryMemberByConditions",
                params: {
                    mCode:this.searchFrom.id,
                    mNickName:this.searchFrom.nickname,
                    mName:this.searchFrom.name,
                    mobile:this.searchFrom.tel,
                    sponsorCode:this.searchFrom.grId,
                    sponsorNickName:this.searchFrom.grname,
                    rankLeft:this.searchFrom.levelFrom,
                    rankRight:this.searchFrom.levelTo,
                    mStatus:this.searchFrom.ostatus,
                    creationData:this.searchFrom.joioTime,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.tableData = response.data.data.list;
                    for(let i = 0; i < this.tableData.length; i++){
                    //处理出生日期
                    this.tableData[i].birthdate = this.tableData[i].birthdate?this.tableData[i].birthdate.slice(0,10):"无";
                    this.tableData[i].creationData = this.tableData[i].birthdate?this.tableData[i].creationData.slice(0,10):"无";
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
                            this.tableData[i].mStatus = response.data.data.memberRelation.rank==1?'正常':(response.data.data.memberRelation.rank==2?'冻结':'注销');
                            this.tableData[i].mLevel = response.data.data.rankName;
                            Vue.set(this.tableData,i,this.tableData[i])
                        }
                    })
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
                            Vue.set(this.tableData,i,this.tableData[i])
                        }
                    })   
                    
                }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
            
        },
        //表格数据导出
        exportExcel(dom,title) {  
            if(this.tableData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                ToExportExcel(dom,title);       
            }
        },
        //选择列表某一行
        getCurrentRow(row){
            this.selectMember = row;
        },
        //详细信息
        onDetail() {
            if(!this.selectMember){
                this.$message({
                    showClose: true,
                    message: '请先选择用户',
                    type: 'error'
                });
            }else {
                this.$router.push({
                    name:"会员详细信息",
                    params:{
                        mCode:this.selectMember.mCode
                    }
                })
            }
        }
    },
    created () {
        this.onSearch();
    }
};
</script>

<style>
.line {
    width: 100%;
    position: relative;
    display: inline-block;
    border: 1px solid #888;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
}

.line > span {
    position: absolute;
    top: -10px;
    padding: 0 10px;
    background: #fff;
}
.line .el-input__inner {
    margin-top: 7px;
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
.area-select.medium {
    width: 90px;
}
.text-center .el-form-item__label {
    text-align: center;
}
.text-center .long-input {
    min-width: 400px;
}
.number-count {
    padding: 0 10px;
}
.btn-center .el-form-item__content {
    display: flex;
    justify-content: space-around;
}
</style>
