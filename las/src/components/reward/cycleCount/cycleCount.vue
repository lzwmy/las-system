<template>
    <div>
        <el-form>
            <el-form-item label="当前周期">
                <el-select v-model="periodCode" placeholder="请选择" @change="selectChange" @focus="onFocus">
                    <el-option v-for="(item,index) in selectItem" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
           
        <el-row :gutter="24">
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-card shadow="always">
                    <h4>业绩状态检查</h4>
                    <p :class="salesStatus=='还未统计'?'no':''">{{salesStatus}}</p>
                    <div class="botom-btn">
                        <router-link tag="a" target="_blank" :to="{path:'/perStatus',query:{periodCode:periodCode}}">
                            <el-button type="primary" @click="updata">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-card shadow="always">
                    <h4>本期会员资格表</h4>
                    <p :class="qualification=='还未统计'?'no':''">{{qualification}}</p>
                    <div class="botom-btn">
                        <el-button type="danger" @click="DialogBack('本期会员资格表')" v-if="qualification=='统计完成' && achievement!='统计完成'">回 滚</el-button>
                        <router-link tag="a" target="_blank" :to="{path:'/qualification',query:{periodCode:periodCode}}">
                            <el-button type="primary" @click="updata">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24">
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-card shadow="always">
                    <h4>本期会员业绩表</h4>
                    <p :class="achievement=='还未统计'?'no':''">{{achievement}}</p>
                    <div class="botom-btn">
                        <el-button type="danger" @click="DialogBack('本期会员业绩表')" v-if="achievement=='统计完成' && Bonus!='统计完成'">回 滚</el-button>
                        <router-link tag="a" target="_blank" :to="{path:'/achievement',query:{periodCode:periodCode}}">
                            <el-button type="primary" @click="updata">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-card shadow="always">
                    <h4>本期会员奖金表</h4>
                    <p :class="Bonus=='还未统计'?'no':''">{{Bonus}}</p>
                    <div class="botom-btn">
                        <el-button type="danger" @click="DialogBack('本期会员奖金表')" v-if="Bonus=='统计完成' && BonusAudit!='统计完成'">回 滚</el-button>
                        <router-link tag="a" target="_blank" :to="{path:'/bonus',query:{periodCode:periodCode}}">
                            <el-button type="primary" @click="updata">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24">
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-card shadow="always">
                    <h4>奖金表审核</h4>
                    <p :class="BonusAudit=='还未统计'?'no':''">{{BonusAudit}}</p>
                    <div class="botom-btn">
                        <el-button type="danger" @click="DialogBack('奖金表审核')" v-if="BonusAudit=='统计完成' && grant!='统计完成'">回 滚</el-button>
                        <router-link tag="a" target="_blank" :to="{path:'/toExamineC',query:{periodCode:periodCode}}">
                            <el-button type="primary" @click="updata">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                <el-card shadow="always">
                    <h4>奖金发放表</h4>
                    <p :class="grant=='还未统计'?'no':''">{{grant}}</p>
                    <div class="botom-btn">
                        <el-button type="danger" @click="DialogBack('奖金发放表')" v-if="grant=='统计完成'">回 滚</el-button>
                        <router-link tag="a" target="_blank" :to="{path:'/grant',query:{periodCode:periodCode}}">
                            <el-button type="primary" @click="updata">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import util from "../../../util/util.js";
export default {
    data() {
        return {
            Dialog:false,  
            periodCode:"", //当前周期
            selectItem:[],  //周期列表
            data:{},  //
            salesStatus:"",  //  业绩状态检查状态
            qualification:"",//会员资格表状态
            achievement:"", //会员业绩表状态
            Bonus:"", //会员奖金表状态
            BonusAudit:"",  //奖金表审核状态
            grant:"",   //奖金发放表状态
            title:"", //回滚的状态
            timer:null //定时刷新周期状态
        };
    },
    methods: {
        //点击下拉框
        onFocus(event){
            window.clearInterval(this.timer);
        },
        //改变周期
        selectChange(val){
            window.clearInterval(this.timer);
            this.periodCode = val;
            this.onStatus();
        },
        //查询状态
        onStatus(){
            this.$request({
                method:'get',
                url:"/apis/bonus/showStatuses",
                params:{
                    periodCode:this.periodCode,
                    date:new Date().getTime()
                }
            })      
            .then(response=>{
                if(response.data.code){ 
                    this.salesStatus = response.data.data.Order==1?"统计完成":"还未统计";
                    this.qualification = response.data.data.MemberQualification==1?"统计完成":"还未统计";
                    this.achievement = response.data.data.Result==1?"统计完成":"还未统计";
                    this.Bonus = response.data.data.Bonus==1?"统计完成":"还未统计";
                    this.BonusAudit = response.data.data.BonusAudit==1?"统计完成":"还未统计";
                    this.grant = response.data.data.BonusPayment==1?"统计完成":"还未统计";
                }
            })
        },
        //查询所有可结算周期
        onSearch() {
            this.selectItem = [];
            this.$request({
                method:'get',
                url:"/apis/member/findPeriodAll",
                params:{
                    currentPage:1,
                    pageSize:1000,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.list = response.data.data.list
                    for(let i in this.list){
                        if(this.list[i].salesStatus >=2){
                            this.selectItem.push(this.list[i].periodCode);
                        }
                    }
                    this.periodCode = this.selectItem[0];
                }
                this.onStatus()
            })
        },
        //回滚弹框
        DialogBack(title) {
            this.title = title;
            this.$confirm('是否回滚'+title+'?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: '取 消',
                type: 'warning',
                center: true
            }).then(() => {
                this.onBack();
            }).catch(() => {});
        },
        //回滚操作
        onBack(){
            let apis = "";
            if(this.title=="本期会员资格表"){
                apis = "member/backNowPeriodQualf";
            }else if(this.title=="本期会员业绩表"){
                apis = "member/backNowPeriod";
            }else if (this.title=="本期会员奖金表"){
                apis = "bonus/rollBackBonus";
            }else if (this.title=="奖金表审核"){
                apis = "bonus/rollBackAuditBonus";
            }

            this.$request({
                method:'get',
                url:"/apis/"+apis,
                params:{
                    periodCode:this.periodCode,
                }
            })      
            .then(response=>{
                if(response.data.code) {
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'success'
                    });
                    this.onSearch();  
                }else {
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
            })
        },
        //更新周期状态
        updata() {
            this.timer = window.setInterval(()=>{
                this.onStatus();
            },3000);
        }
    },
    created() {
        this.onSearch();
    },
    destroyed() {
        window.clearInterval(this.timer);
    }
};
</script>

<style scoped>
.botom-btn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.el-card__body p{
    text-indent: 150px;
    line-height: 100px;
    color:#2196f3;
}
.el-card__body p.no{
    color:red;
}
.botom-btn > a {
    margin-left: 15px;
}
.el-dialog__body .el-select {
    display: block;
}
.el-row .el-col{
    padding:12px;
}
</style>
