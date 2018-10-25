<template>
    <el-form  :model="form" label-width="80px" label-position="left">
        <el-row>
            <el-col :span="6">
                <el-form-item label="下单时间">
                    <el-date-picker 
                        v-model="form.time" 
                        type="daterange" 
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions"
                        @change="onChangeDate">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="1">
                <el-form-item label="会员姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="exportExcel">导出</el-button>
            </el-col>
        </el-row> 
        <el-row>
            <el-col :span="5">
                <el-form-item label="手机号">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5" :offset="2">
                <el-form-item label="订单状态">
                    <el-select v-model="form.state" placeholder="请选择" >
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="待付款" value="待付款"></el-option>
                        <el-option label="已付款" value="已付款"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>          

        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    
                    id="memberTable" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="mCode" label="订单号" align="center" width="80px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员编号" align="center" width="80px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员姓名" align="center" width="80px"> 
                    </el-table-column>
                    <el-table-column prop="mCode" label="会员昵称" align="center" width="80px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="推荐人编号" align="center" width="90px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="推荐人昵称" align="center" width="90px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="手机号码" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="订单金额" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="运费" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="订单总PV值" align="center" width="100px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="购物积分支付" align="center" width="110px">
                    </el-table-column>
                    <el-table-column prop="mCode" label="实付金额" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="订单类型" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="订单状态" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="支付方式" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="下单时间" align="center">
                    </el-table-column>
                    <el-table-column prop="mCode" label="支付时间" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="140px">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onShowDetails(scope.row)">查看</el-button>
                            <el-button type="text" @click="onShowDetails(scope.row)">修改</el-button>
                            <el-button type="text" @click="onShowDetails(scope.row)" class="cancel">取消</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br>
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

        <!-- 弹出层组件 -->
        <dialog-com></dialog-com>

    </el-form>
</template>


<script>
export default {
    data() {
        let time1 = new Date();
        return {
            loadingTable:false, //加载列表
            form: {
                time: ["",""], //时间
                name: "", //姓名
                tel: "", //手机号
                state: "" //状态
            },
            //搜索数据
            searchData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
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
            this.form.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //选中日期回调
        onChangeDate( data) {
            if(data) {
                this.form.time[0] = data[0].getFullYear()+'-'+(data[0].getMonth()+1)+'-'+data[0].getDate()+' '+data[0].getHours()+':'+data[0].getMinutes()+':'+ data[0].getSeconds()
                this.form.time[1] = data[1].getFullYear()+'-'+(data[1].getMonth()+1)+'-'+data[1].getDate()+' '+data[1].getHours()+':'+data[1].getMinutes()+':'+ data[1].getSeconds()
            }
       },
        //点击查询修改记录
        onSearch() {
            this.loadingTable = true;  
            //时间
            let timeStart = "";
            let timeEnd = "";
            if(this.form.time){
                timeStart = this.form.time[0];
                timeEnd = this.form.time[1];
            }
            this.$axios({
                method:'post',
                url:"/apis/member/findEditStatus",
                params:{
                    currentPage:this.form.currentPage,
                    pageSize:this.pageData.pageSize,
                    mCode:this.form.id,
                    mName:this.form.name,
                    updateType:this.form.type,
                    reviewStatus:this.form.state,
                    updateTimeStar:timeStart,
                    updateTimeEnd:timeEnd,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.searchData = response.data.data.list;
                    for(var i = 0; i< this.searchData.length; i++ ){
                        if(this.searchData[i].reviewStatus==0){
                            this.searchData[i].reviewStatus="待审";
                        }else if(this.searchData[i].reviewStatus==1){
                            this.searchData[i].reviewStatus="驳回";
                        }else if(this.searchData[i].reviewStatus==2){
                            this.searchData[i].reviewStatus="审核通过";
                        }else{
                            this.searchData[i].reviewStatus="无需审核";
                        }

                        if(this.searchData[i].updateType==0){
                            this.searchData[i].updateType="修改基本信息";
                        }else if(this.searchData[i].updateType==1){
                            this.searchData[i].updateType="修改敏感信息";
                        }else if(this.searchData[i].updateType==2){
                            this.searchData[i].updateType="会员更名";
                        }else if(this.searchData[i].updateType==3){
                            this.searchData[i].updateType="更改推荐人";
                        }else if(this.searchData[i].updateType==4){
                            this.searchData[i].updateType="更改会员级别";
                        }else if(this.searchData[i].updateType==5){
                            this.searchData[i].updateType="与老会员绑定";
                        }else{
                            this.searchData[i].updateType="";
                        }
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
        //点击审核查看详情
        onShowDetails(data) {
            // util.$emit("DialoChangeDetails",{
            //     data:data,
            //     showSubmit:true
            // });
        },
        //表格数据导出
        exportExcel() {                  
            if(this.searchData.length==0){
                this.$message({
                    showClose: true,
                    message: '数据为空，无法导出',
                    type: 'warning'
                });
            }else {
                new Promise((resolve,reject)=>{
                    this.pageData.pageSize = this.pageData.total;
                    this.onSearch();
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
                            "新增会员列表.xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }
                    this.pageData.pageSize = 10;
                    this.onSearch();
                    return wbout;
                })
                
            }
        },
    },
    created() {
        //this.onSearch();
        util.$on("ChangeDetailsSuccess",()=>{
            this.onSearch();
        });
    }
};
</script>

<style scoped>
.cancel{
    color: red;
}
</style>
