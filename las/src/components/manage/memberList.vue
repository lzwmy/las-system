<template>
    <div class="wrap">
        <!-- 查询条件 -->
        <div class="line">
            <span>查询条件</span>
            <el-form ref="form" :model="searchFrom" label-width="70px" label-position="left">
                <el-row>
                    <el-col :span="5">
                        <el-col :span="13">
                            <el-form-item label="会员编号" label-width="70px">
                                <el-select v-model="searchFrom.id" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData1" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-input v-model="searchFrom.inputId"></el-input>
                        </el-col>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <el-col :span="13">
                            <el-form-item label="昵称">
                                <el-select v-model="searchFrom.nickname" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData1" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-input v-model="searchFrom.inputNickName"></el-input>
                        </el-col>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <el-col :span="13">
                            <el-form-item label="姓名">
                                <el-select v-model="searchFrom.name" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData1" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-input v-model="searchFrom.inputName"></el-input>
                        </el-col>
                    </el-col>

                    <el-col :span="5" :offset="1">
                        <el-col :span="13">
                            <el-form-item label="手机号码" label-width="70px">
                                <el-select v-model="searchFrom.tel" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData1" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-input v-model="searchFrom.inputTel"></el-input>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-col :span="13">
                            <el-form-item label="推荐编号">
                                <el-select v-model="searchFrom.grId" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData1" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-input v-model="searchFrom.inputGrId"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-col :span="13">
                            <el-form-item label="推荐昵称">
                                <el-select v-model="searchFrom.grname" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData1" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-input v-model="searchFrom.inputGrName"></el-input>
                        </el-col>
                    </el-col>
                    <el-col :span="5" :offset="1">                       
                        <el-col :span="12">
                            <el-form-item label="级别" label-width="50px" class="text-center">
                                <el-select v-model="searchFrom.levelFrom" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData3" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="至" label-width="50px" class="text-center">
                                <el-select v-model="searchFrom.levelTo" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData3" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-col :span="13">
                            <el-form-item label="状态">
                                <el-select v-model="searchFrom.ostatus" placeholder="请选择">
                                    <el-option v-for="(items,index) in selectData2" :key="index" :label="items" :value="items"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="加入期间">
                            <el-date-picker 
                                v-model="searchFrom.joioTime" 
                                type="daterange" 
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd-HH:mm:ss"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- 查询|详细|导出  -->
        <el-row>
            <el-col :span="8" >
                <el-pagination
                    :page-size="pageData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[2 ,10, 30, 50,pageData.total]"
                    :total="pageData.total"
                    :current-page="pageData.currentPage"
                    @current-change="onChangePage"  
                    @size-change="handleSizeChange">
                </el-pagination>
            </el-col>
            <el-col :span="12"> 
                <el-col :span="3"><el-button size="small" type="primary" @click="onSearch">查询</el-button></el-col>
                <el-col :span="3"><el-button size="small" @click="onDetail">详细</el-button></el-col>
                <el-col :span="3"><el-button size="small" type="success" @click="exportExcel">导出</el-button></el-col>       
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
            <el-table-column label="选择" type="" width="55" align="center">
                <template slot-scope="scope">
                    <el-radio class="radio" v-model="selectMember" :label="scope.row" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
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
            <el-table-column prop="updateDate" label="加入期间" align="center" width="90">
            </el-table-column>
            <el-table-column prop="mLevel" label="级别" align="center" width="120">
            </el-table-column>
            <el-table-column prop="mStatus" label="状态" align="center" width="50">
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
    </div>
</template>


<script>
import Vue from 'vue'
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    data() {
        return {
            loadingTable:false, //加载
            //查询条件选项
            selectData1: [
                "...",
                "等于",
                "大于等于",
                "大于",
                "小于等于",
                "小于",
                "包含"
            ],
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
                pageSize:2,
                total:null,
            },
            selectMember:"",   //选中会员
            //会员列表
            tableData: [],
            //设置时间范围
            pickerOptions: {
                shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, 
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    methods: {
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.getMemberinfo();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.getMemberinfo();
        },
        //点击查询
        onSearch() {
            //未输入条件
            let term = this.formSearch;
            if(term.inputId!=""||term.inputNickName!=""||term.inputName!=""||term.inputTel!=""||term.inputGrId!=""||term.inputGrName!=""){
                //向后台请求用户列表
                this.$axios.get("/apis/member/findByMCode", {
                    params:{
                        mCode:this.formSearch.inputId,
                    }
                })
                .then(response=>{
                    if(!response.data.data){
                        //触发自定义弹出层事件
                        util.$emit("userDefined",{
                                icon:"success",
                                title:"未搜到相关会员，请确认后重试"
                            });
                    }else {
                        this.searchData.push(response.data.data);
                    }
                })
            } else{
                //触发自定义弹出层事件
                util.$emit("userDefined",{
                    icon:"error",
                    title:response.data.msg
                });
    
            }
            
        },
        //表格数据导出
        exportExcel() {                  
            if(this.tableData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                new Promise((resolve,reject)=>{
                    this.pageData.pageSize = this.pageData.total;
                    this.getMemberinfo();
                    setTimeout(()=>{
                        resolve();
                    },500)
                })
                .then(()=>{
                    var wb = XLSX.utils.table_to_book(
                        document.querySelector("#memberTable")
                    );
                    var wbout = XLSX.write(wb, {
                        bookType: "xlsx",
                        bookSST: true,
                        type: "array"
                    });
                    try {
                        FileSaver.saveAs(
                            new Blob([wbout], { type: "application/octet-stream" }),
                            "会员列表.xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }
                    this.pageData.pageSize = 5;
                    this.getMemberinfo();
                    return wbout;
                })
                
            }
        },
        //向后台请求会员列表
        getMemberinfo() {
            this.loadingTable = true; 
            this.$axios({
                method:'post',
                url:"/apis/member/search",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.searchFrom.mCode,
                    mName:this.searchFrom.mName,
                    mobile:this.searchFrom.mobile,
                    mNickname:this.searchFrom.mNickname,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                this.tableData = response.data.data.list;
                this.pageData.total = response.data.data.total;
                for(let i = 0; i < response.data.data.list.length; i++){
                    //处理出生日期
                    this.tableData[i].birthdate = this.tableData[i].birthdate.slice(0,10);
                    //获取会员状态，级别
                    this.$axios({
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
                    this.$axios({
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
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
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
                    path:"/mdetailed",
                    params:{
                        mCode:this.selectMember.mCode
                    }
                })
            }
        }
    },
    created () {
        this.getMemberinfo();
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
