<template>
    <div class="wrap">
        <!-- 查询条件 -->
        <div class="line">
            <span>查询条件</span>
            <el-form ref="form" :model="searchFrom" label-width="70px" label-position="left">
                <el-collapse value="1">
                    <el-collapse-item title="" name="1">
                        <div>
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
                                    <el-form-item label="手机号码" label-width="70px">
                                        <el-input v-model.number="searchFrom.inputTel" @keyup.native="inputNumber($event)" @keyup.enter.native="onSearch" clearable></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6" :offset="1">
                                    <el-button type="primary" @click="onSearch" icon="el-icon-search">查 询</el-button>
                                    <el-button type="success" @click="exportExcel('#memberTable','会员列表表')" icon="el-icon-download">导 出</el-button>      
                                </el-col>
                            </el-row>                                                      
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="" name="2">
                        <div>
                            <el-row>
                                <el-col :span="5" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                                    <el-form-item label="推荐编号">
                                        <el-input v-model="searchFrom.inputGrId" @keyup.enter.native="onSearch" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                                    <el-form-item label="推荐昵称">
                                        <el-input v-model="searchFrom.inputGrName" @keyup.enter.native="onSearch" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">                       
                                    <el-col :span="12">
                                        <el-form-item label="级别" label-width="50px" class="text-center">
                                            <el-select v-model="searchFrom.levelFrom" placeholder="全部">
                                                <el-option v-for="(items,index) in selectData3" :key="index" :label="items.name" :value="items.val"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="至" label-width="50px" class="text-center">
                                            <el-select v-model="searchFrom.levelTo" placeholder="全部">
                                                <el-option v-for="(items,index) in selectData3" :key="index" :label="items.name" :value="items.val"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-col>
                                <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                                    <el-col :span="13">
                                        <el-form-item label="状态">
                                            <el-select v-model="searchFrom.ostatus" placeholder="全部">
                                                <el-option v-for="(items,index) in selectData2" :key="index" :label="items.name" :value="items.val" @keyup.enter.native="onSearch"></el-option>
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
                                            value-format="yyyy-MM"
                                            placeholder="全部">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5" :offset="1" :xs="11" :sm="11" :md="11" :lg="5" :xl="5">
                                    <el-form-item label="姓名" label-width="70px">
                                        <el-input v-model.number="searchFrom.inputName" @keyup.native="inputNumberCode($event)" @keyup.enter.native="onSearch" clearable></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
        </div>
        
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
            <el-table-column prop="mCode" label="编号" width="80" align="center" sortable :show-overflow-tooltip="true">                   
            </el-table-column>
            <el-table-column prop="mName" label="姓名" width="70" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="mNickname" label="昵称" align="center" :show-overflow-tooltip="true">
            </el-table-column>
                <el-table-column prop="sponsorCode" label="推荐人编号" align="center" width="100" :show-overflow-tooltip="true">
            </el-table-column>
                <el-table-column prop="refereeName" label="推荐人昵称" align="center" width="100" :show-overflow-tooltip="true">
            </el-table-column>
                <el-table-column prop="mobile" label="手机号码" align="center" width="100" :show-overflow-tooltip="true">
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
            <el-table-column prop="rank" label="级别" align="center" width="90" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="mStatus" label="状态" align="center" width="50">
            </el-table-column>
            <el-table-column prop="province" label="省" align="center" min-width="120" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="city" label="市" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="country" label="区县" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="detial" label="详细地址" align="center" width="200" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="addPost" label="邮编" width="65" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="操作" type="" width="50" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="onDetail(scope.row.mCode)">详细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br/>
        <el-row type="flex" justify="center">
            <el-col :span="8" align="center">
                <el-pagination
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 50,999]"
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
import {ToExportExcel} from "../../util/util.js";
export default {
    name:"memberList",
    data() {
        return {
            loadingTable:false, //加载
            //查询条件选项
            selectData2: [{
                name:"全部",
                val:"",
            },
            {
                name:"正常",
                val:"0",
            },
            {
                name:"冻结",
                val:"1",
            },
            {
                name:"注销",
                val:"2",
            }],
            selectData3: [
                {
                    name:"全部",
                    val:""
                },
                {
                    name:"普通会员",
                    val:"0"
                },{
                    name:"vip会员",
                    val:"1"
                },{
                    name:"代理会员",
                    val:"2"
                },{
                    name:"初级代理店",
                    val:"3"
                },{
                    name:"一级代理店",
                    val:"4"
                },{
                    name:"二级代理店",
                    val:"5"
                },{
                    name:"三级代理店",
                    val:"6"
                },{
                    name:"旗舰店",
                    val:"7"
                },{
                    name:"高级旗舰店",
                    val:"8"
                },{
                    name:"超级旗舰店",
                    val:"9"
                }
            ],
            //查询条件
            searchFrom: {
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
                total:0,
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
                    mCode:this.searchFrom.inputId,
                    mNickName:this.searchFrom.inputNickName,
                    mName:this.searchFrom.inputName,
                    mobile:this.searchFrom.inputTel,
                    sponsorCode:this.searchFrom.inputGrId,
                    sponsorNickName:this.searchFrom.inputGrName,
                    rankLeft:this.searchFrom.levelFrom,
                    rankRight:this.searchFrom.levelTo,
                    mStatus: this.searchFrom.ostatus,
                    creationData:this.searchFrom.joioTime,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                if(response.data.code){
                    let tableData = response.data.data.list;
                    for(let i = 0; i < tableData.length; i++){
                        if(tableData[i].mStatus==0){
                            tableData[i].mStatus = "正常";
                        }else if(tableData[i].mStatus==1){
                            tableData[i].mStatus = "冻结";
                        }else if(tableData[i].mStatus==2){
                            tableData[i].mStatus = "注销";
                        }

                        for (let j = 0, len = this.selectData3.length; j < len; j++) {
                            if(this.selectData3[j].val === tableData[i].rank.toString()){
                                tableData[i].rank = this.selectData3[j].name; 
                                break;
                            }
                        }
                        
                        //处理日期
                        tableData[i].birthdate = tableData[i].birthdate?tableData[i].birthdate.slice(0,10):"无";
                        tableData[i].creationData = tableData[i].creationData?tableData[i].creationData.slice(0,10):"无";
                        //获取推荐人信息
                        this.$request({
                            method:'get',
                            url:"/apis/member/findRelationByMCode",
                            params: {
                                mCode:tableData[i].mCode,
                                date:new Date().getTime()
                            }
                        })
                        .then(response=>{
                            if(response.data.code){
                                tableData[i].refereeId = response.data.data.memberRelation.sponsorCode;
                                tableData[i].refereeName = response.data.data.memberRelation.sponsorName;
                            }
                        }) 
                    }
                    this.tableData = tableData;  
                    this.pageData.currentPage = response.data.data.pageNum,
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
        onDetail(mCode) {
            this.$router.push({
                name:"mDetailed",
                params:{
                    mCode:mCode
                }
            })
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
    padding: 10px;
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
.line .el-collapse .el-collapse-item:first-child .el-collapse-item__header{
    display: none;
}
.line .el-collapse .el-collapse-item:first-child .el-collapse-item__content{
    padding-top: 20px;
}
.line .el-collapse-item__content{
    padding-bottom:0;
}
.line .el-collapse-item__header{
    height: 40px;
    line-height: 40px;
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
