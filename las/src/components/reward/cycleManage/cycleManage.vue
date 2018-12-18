<template>
    <el-form  label-width="80px" label-position="left">
        <el-row>
            <el-col :span="24" align="right">
                <el-button type="primary" @click="showDialogAdd">添加周期</el-button>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="计算周期" align="center">
                    </el-table-column>
                    <el-table-column prop="beginDate" label="开始时间" align="center"> 
                    </el-table-column>
                    <el-table-column prop="endDate" label="结束时间" align="center">
                    </el-table-column>
                    <el-table-column prop="salesStatus" label="业绩状态" align="center">
                    </el-table-column>
                    <el-table-column prop="calStatus" label="奖金状态" align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="calTimes" label="计算次数" align="center" width="160px">
                    </el-table-column>
                    <el-table-column prop="bonusStatus" label="发放状态" align="center" width="160px">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="180px">
                        <template slot-scope="scope">
                            <el-button size="mini" type="success" :disabled="tableData[scope.$index].salesStatus=='已关闭'"  @click="showDialogChange(scope.row,scope.$index)">修改周期</el-button>
                            <el-button size="mini" type="warning" :disabled="tableData[scope.$index].calStatus!='未开始'" @click="showDialogSwitch(scope.row)">切换</el-button>
                            <el-button size="mini" type="danger" :disabled="tableData[scope.$index].salesStatus=='已关闭'" @click="showDialogDelete(scope.row)" class="delete">删除</el-button>
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

        <!-- 弹出层 -->
        <el-dialog title="确认修改该周期"  :visible.sync="DialogChange" width="450px" center>
            <el-form status-icon  :model="formChange" :rules="rules" ref="formChange"  label-width="80px" label-position="left">
                <el-form-item label="计算周期">
                    <el-input v-model="formChange.computingCycle" disabled></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="dateStart">
                    <el-date-picker 
                        v-model="formChange.dateStart" 
                        :picker-options="startDateChange" 
                        format="yyyy-MM-dd" 
                        value-format="yyyy-MM-dd"  
                        type="date" 
                        placeholder="选择日期"
                        :disabled="isStarted">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="dateEnd">
                    <el-date-picker v-model="formChange.dateEnd" :picker-options="endDateChange" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogChange = false">取 消</el-button>
                <el-button type="primary" @click="onChangeCycle('formChange')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="是否添加该周期"  :visible.sync="DialogAdd" width="450px" center>
            <el-form status-icon :rules="rules" :model="formAdd" ref="formAdd"  label-width="80px" label-position="left">
                <el-form-item label="选择年份" prop="year">
                    <el-date-picker v-model="formAdd.year" :picker-options="yearOpt" value-format="yyyy" format="yyyy" @change="onChangeYear"   type="year" placeholder="选择年份"></el-date-picker>
                </el-form-item>
                <el-form-item label="计算周期">
                    <el-input v-model="formAdd.computingCycle" disabled=""></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="dateStart">
                    <el-date-picker v-model="formAdd.dateStart" :picker-options="startDateAdd" format="yyyy-MM-dd" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="dateEnd">
                    <el-date-picker v-model="formAdd.dateEnd" :picker-options="endDateAdd"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogAdd = false">取 消</el-button>
                <el-button type="primary" @click="onAddCycle('formAdd')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="是否切换周期状态？"  :visible.sync="DialogSwitch" width="450px" center>
            <el-form label-width="80px" label-position="left">
                <el-form-item label="填入理由">
                    <el-input type="textarea" v-model="formSwitch.desc" :autosize="{ minRows: 4}"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogSwitch = false">取 消</el-button>
                <el-button type="primary" @click="onSwitchCycle('formSwitch')">确 定</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>


<script>
export default {
    data() {
        return {
            loadingTable:false, //加载列表
            DialogChange:false, 
            DialogAdd:false,
            DialogSwitch:false,
            isStarted:false, //已开始，禁用改变开始时间
            cycleDelete:"", //删除周期
            //列表数据
            tableData: [],
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            formChange:{
                computingCycle:"",  //周期
                selectStart:"", //选择开始时间范围
                selectEnd:"",   //选择结束时间范围
                dateStart:"",   //开始时间
                dateEnd:"",     //结束时间
            },
            formAdd:{
                year:"",
                computingCycle:"",
                prePeriod:"", //前一周期
                selectStart:"", 
                dateStart:"",
                dateEnd:"",
            },
            formSwitch:{
                computingCycle:"",
                desc:""
            },
            //表单验证规则
            rules: {
                year: [
                    { required: true, message: "请选择年份", trigger: 'blur' }
                ],
                dateStart: [
                    { required: true, message: "请选择开始时间", trigger: 'blur' }
                ],
                dateEnd: [
                    { required: true, message: "请选择结束时间", trigger: 'blur' }
                ]
            },
            /*
            *时间选择器限制范围
            */
           yearOpt:{
                disabledDate: (time)=> {
                    let curDate = (new Date()).getTime();
                    let Year =  1 * 365 * 24 * 3600 * 1000;
                    let endYear = curDate + Year;
                    return time.getTime() < new Date() || time.getTime() >= endYear;
                }
            },
            startDateAdd:{
                disabledDate: (time)=> {
                    let date = this.formAdd.dateEnd.split("-");
                    let selectStart = this.formAdd.selectStart.split("-");
                    return time.getTime() >= new Date( date[0], date[1]-1, date[2]) || time.getTime() <= new Date( selectStart[0],selectStart[1]-1,selectStart[2]);
                }
            },
            endDateAdd: {
                disabledDate: (time)=> {
                    let date = this.formAdd.dateStart.split("-");
                    return time.getTime() <= new Date( date[0], date[1]-1, date[2]);
                }
            },
            startDateChange:{
                disabledDate: (time)=> {
                    let date = this.formChange.dateEnd.split("-");
                    let selectStart = this.formChange.selectStart.split("-");
                    return time.getTime() <= new Date( selectStart[0],selectStart[1]-1,selectStart[2]) || time.getTime() >= new Date( date[0], date[1]-1, date[2]);
                }
            },
            endDateChange: {
                disabledDate: (time)=> {
                    let date = this.formChange.dateStart.split("-");
                    if(this.formChange.selectEnd!=""){
                        let selectEnd = this.formChange.selectEnd.split("-");
                        return time.getTime() <= new Date( date[0], date[1]-1, date[2]) || time.getTime() >= new Date( selectEnd[0],selectEnd[1]-1,selectEnd[2]);
                    }else {
                        //如果为选择第一个,则不限制结束日期
                        return time.getTime() <= new Date( date[0], date[1]-1, date[2]);
                    }
                }
            },
        };
    },
    methods: {
        //查询所有业务周期
        onSearch() {
            this.loadingTable = true;  
            this.$request({
                method:'get',
                url:"/apis/member/findPeriodAll",
                params:{
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.pageData.currentPage = response.data.data.pageNum;
                    this.pageData.pageSize = response.data.data.pageSize;
                    this.pageData.total = response.data.data.total;
                    let list = response.data.data.list;
                    for(let i= 0; i < list.length; i++){
                        //处理日期
                        list[i].beginDate = list[i].beginDate.slice(0,10);
                        list[i].endDate = list[i].endDate.slice(0,10);
                        //奖金状态
                        if(list[i].calStatus==0){
                            list[i].calStatus = "未开始";
                        }else if(list[i].calStatus==1){
                            list[i].calStatus = "计算中";
                        }else if(list[i].calStatus==2){
                            list[i].calStatus = "临时发布核对中";
                        }else if(list[i].calStatus==3){
                            list[i].calStatus = "正式发布";
                        }
                        //业绩状态
                        if(list[i].salesStatus==0){
                            list[i].salesStatus = "未开始";
                        }else if(list[i].salesStatus==1){
                            list[i].salesStatus = "已开始";
                        }else if(list[i].salesStatus==2){
                            list[i].salesStatus = "外部关闭补录中";
                        }else if(list[i].salesStatus==3){
                            list[i].salesStatus = "已关闭";
                        }
                        //发放状态
                        if(list[i].bonusStatus==0){
                            list[i].bonusStatus = "未放出";
                        }else if(list[i].bonusStatus==1){
                            list[i].bonusStatus = "已放出";
                        }
                    }
                    this.pageData.currentPage = response.data.data.pageNum;
                    this.pageData.pageSize = response.data.data.pageSize;
                    this.tableData = response.data.data.list;
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
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
        //显示添加周期弹框
        showDialogAdd() {
            this.DialogAdd = true;
            //已有周期的情况下  
            if(this.tableData.length >0){
                let curYear = parseInt(this.tableData[0].periodCode/100);   //上一个添加周期年份
                let number = parseInt(this.tableData[0].periodCode.substr(4,2))+1;   //添加周期+1
    
                this.formAdd.computingCycle =  ""+ curYear + number;  //计算周期
                this.formAdd.selectStart = this.tableData[0].endDate; //上一周期结束时间
                this.formAdd.prePeriod = this.tableData[0].periodCode;  //前一周期
                this.formAdd.year = String(curYear);
            }else {
                let date = new Date();
                this.formAdd.computingCycle =  date.getFullYear() + "01";  //计算周期
                this.formAdd.selectStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(); //上一周期结束时间
                this.formAdd.prePeriod = date.getFullYear()+"00";  //前一周期
                this.formAdd.year = String(date.getFullYear())
            }   
            this.formAdd.dateStart = "";
            this.formAdd.dateEnd = "";
        },
        //改变年份
        onChangeYear(val) {
            //选择另一年,且该周期年份不存在，则周期序号从零开始
            let isNewYear = false;
            for(var i = 0; i < this.tableData.length; i++){
                let year = parseInt(this.tableData[0].periodCode/100);
                if(year !=val){
                    isNewYear = true; 
                    break;
                }
            }
            if(val!=(new Date().getFullYear())&&isNewYear){
                this.formAdd.computingCycle = val +"01";
            }else {
                //周期序号正常排序
                let number = parseInt(this.tableData[0].periodCode.substr(4,2))+1;
                this.formAdd.computingCycle = ""+val + number ;
            }
        },
            
        //添加周期
        onAddCycle(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/addPeriod",
                        params: {
                            periodCode:this.formAdd.computingCycle,
                            beginDateS:this.formAdd.dateStart,
                            endDateS:this.formAdd.dateEnd,
                            prePeriod:this.formAdd.prePeriod
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: '添加周期成功!',
                                type: 'success'
                            });
                            this.onSearch(); 
                        } else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                        this.DialogAdd = false;
                    }) 
                }else {
                    this.$message({
                        showClose: true,
                        message: '请输入必整信息!',
                        type: 'error'
                    }); 
                    return false;
                }
            });
        },

        //显示修改周期弹框
        showDialogChange(row,index) {
            this.formChange.selectStart = "";
            this.formChange.selectEnd = "";
            this.DialogChange = true;
            //判断是否可以修改开始时间
            if(row.salesStatus=='已开始'){
                this.isStarted = true;
            }else {
                this.isStarted = false;
            }
            //选择不为第1个
            if(index!=0){
                this.formChange.selectStart = this.tableData[index+1].endDate; //本周期开始时间(范围在本周期结束之前)
                this.formChange.selectEnd = this.tableData[index-1].beginDate; //本周期结束时间(范围在上周期开始之前)
            }else {
                this.formChange.selectStart = this.tableData[index+1].endDate; //本周期开始时间(范围在本周期结束之前)
            }
            this.formChange.computingCycle = row.periodCode;
            this.formChange.dateStart = row.beginDate;
            this.formChange.dateEnd = row.endDate;
        },
        //修改周期
        onChangeCycle(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.$request({
                        method:'post',
                        url:"/apis/member/editPeriod",
                        params: {
                            periodCode:this.formChange.computingCycle,
                            beginDateS:this.formChange.dateStart,
                            endDateS:this.formChange.dateEnd,
                        }
                    })
                    .then(response=>{
                        if(response.data.code){
                            this.$message({
                                showClose: true,
                                message: '修改周期成功!',
                                type: 'success'
                            }); 
                            this.onSearch();
                        } else{
                            this.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'error'
                            });
                        }
                        this.DialogChange = false;
                    }) 
                }else {
                    this.$message({
                        showClose: true,
                        message: '请输入必整信息!',
                        type: 'error'
                    }); 
                    return false;
                }
            });
        },
        //显示切换周期弹框
        showDialogSwitch(row) {
            this.DialogSwitch = true;
            this.formSwitch.computingCycle = row.periodCode;
            this.formSwitch.desc = "";
        },
        //切换周期弹框
        onSwitchCycle(form) {
            this.$request({
                method:'post',
                url:"/apis/member/editPeriodStatu",
                params: {
                    periodCode:this.formSwitch.computingCycle,
                    updateMemo:this.formSwitch.desc
                }
            })
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: '切换周期状态成功!',
                        type: 'success'
                    }); 
                    this.onSearch();
                } else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                    this.DialogSwitch = false;
            }) 
        },
        //删除周期弹框
        showDialogDelete(row) {
            this.cycleDelete = row.periodCode;
            this.$confirm('是否删除该周期?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.onDelete();
            }).catch(() => {});
        },
        //删除周期
        onDelete() {
             this.$request({
                    method:'get',
                    url:"/apis/member/delPeriod",
                    params: {
                        periodCode:this.cycleDelete
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: '删除周期成功!',
                            type: 'success'
                        }); 
                        this.onSearch();
                    } else{
                        this.$message({
                            showClose: true,
                            message: response.data.msg,
                            type: 'error'
                        });
                    }
                }) 
        }
    },
    created() {
        this.onSearch();
    }
};
</script>

<style scoped>
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width:100%;
}
</style>
