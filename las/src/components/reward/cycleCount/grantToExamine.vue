<template>
    <el-form  label-width="80px" label-position="left">
        <el-row type="flex" justify="space-between">
            <el-col :span="24" align="right">
                <router-link to="/grant"><el-button>返 回</el-button></router-link>
            </el-col>
        </el-row>
        <br>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="tableData" 
                    border
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中!"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column prop="periodCode" label="业务周期" fixed align="center">
                    </el-table-column>
                    <el-table-column prop="customerNum" label="新人数" align="center"> 
                    </el-table-column>
                    <el-table-column prop="orderNum" label="业绩人数" align="center">
                    </el-table-column>
                    <el-table-column prop="performance" label="当期总奖金(PV)" align="center" width="140px">
                    </el-table-column>
                    <el-table-column prop="bonusNewVip" label="当期总奖金" align="center" width="120px">
                    </el-table-column>
                    <el-table-column prop="bonusRetail" label="应补发资金"  align="center" width="120px">
                    </el-table-column>
                    <el-table-column prop="bonusDevp" label="本期应处理的总扣款" align="center" width="150px">
                    </el-table-column>
                    <el-table-column prop="bonusDevpPercentage" label="本期总应付奖金" align="center" width="120px">
                    </el-table-column>
                    <el-table-column prop="reviewer" label="审核人" align="center">
                    </el-table-column>
                    <el-table-column prop="staus" label="审核状态" align="center">
                    </el-table-column>
                    <el-table-column prop="auditTime" label="审核时间" align="center" width="150px">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="90px">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" :disabled="scope.row.staus!='未审核'"  @click="showDialogToExamine(scope.row)">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-dialog title="是否通过审核？" :visible.sync="DialogToExamine" width="450px" center>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="onToExamine('拒绝')">拒 绝</el-button>
                <el-button type="primary" @click="onToExamine('通过')">通 过</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>


<script>
export default {
    data() {
        return {
            loadingTable:false, //加载列表
            DialogToExamine:false,
            form: {
                id: "", //会员编号
                name: "", //姓名
            },
            ToExamineCode:"", //审核周期
            //列表数据
            tableData: [],
        };
    },
    methods: {
        //查询
        onSearch() {
            this.loadingTable = true;  
            this.$request({
                method:'get',
                url:"/apis/bonus/findAuditBonus",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                console.log(response)
                if(response.data.code){ 
                    let tableData = response.data.data;
                    for(var i in tableData){
                       tableData[i].bonusDevpPercentage = tableData[i].bonusDevpPercentage + "%";
                       tableData[i].bonusLdPercentage = tableData[i].bonusLdPercentage + "%";
                       tableData[i].bonusSpecialPercentage = tableData[i].bonusSpecialPercentage + "%";
                       tableData[i].allocatePercentage = tableData[i].allocatePercentage + "%";
                       if(tableData[i].currencyCode=="CNY"){
                           tableData[i].currencyCode="人民币";
                       }
                       if(tableData[i].staus==-1){
                           tableData[i].staus="审核失败";
                       }else if(tableData[i].staus==0){
                           tableData[i].staus="未审核";
                       }else if(tableData[i].staus==1){
                           tableData[i].staus="审核通过";
                       }
                    }
                    this.tableData = tableData;
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //显示审核弹出层
        showDialogToExamine(row){
            this.DialogToExamine = true;
            this.ToExamineCode = row.periodCode;
        },
        //点击审核
        onToExamine(text){
            this.$request({
                method:'get',
                url:"/apis/bonus/auditBonus",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.$message({
                        showClose: true,
                        message: "周期:"+this.ToExamineCode+" 成功"+text,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                setTimeout(()=>{
                    this.DialogToExamine = false;
                },200)
            })
        }
        
    },
    created() {
        // this.onSearch();
    },
};
</script>
<style scoped>
.top-title span{
    display: inline-block;
    margin-right: 30px;
}
</style>

