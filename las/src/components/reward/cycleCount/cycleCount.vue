<template>
    <div>
        <el-form>
            <el-form-item label="当前周期">
                <el-select v-model="periodCode" placeholder="请选择" @change="selectChange">
                    <el-option v-for="(item,index) in selectItem" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
           
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="always">
                    <h4>业绩状态检查</h4>
                    <p>{{salesStatus}}</p>
                    <div class="botom-btn">
                        <router-link to="/perStatus">
                            <el-button type="primary">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <h4>本期会员资格表</h4>
                    <p>{{qualification}}</p>
                    <div class="botom-btn">
                        <el-button type="success" @click="DialogBack('本期会员资格表')">回 滚</el-button>
                        <router-link :to="{path:'/qualification',query:{periodCode:periodCode}}">
                            <el-button type="primary">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="always">
                    <h4>本期会员业绩表</h4>
                    <p>还未统计</p>
                    <div class="botom-btn">
                        <el-button type="success">回 滚</el-button>
                        <router-link to="/achievement">
                            <el-button type="primary">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <h4>本期会员奖金表</h4>
                    <p>还未统计</p>
                    <div class="botom-btn">
                        <el-button type="success">回 滚</el-button>
                        <router-link to="/bonus">
                            <el-button type="primary">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="always">
                    <h4>奖金表审核</h4>
                    <p>还未统计</p>
                    <div class="botom-btn">
                        <el-button type="success">回 滚</el-button>
                        <router-link to="/toExamineC">
                            <el-button type="primary">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always">
                    <h4>奖金发放表</h4>
                    <p>还未统计</p>
                    <div class="botom-btn">
                        <el-button type="success">回 滚</el-button>
                        <router-link to="/grant">
                            <el-button type="primary">查 看</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 回滚弹出层 -->
        <el-dialog title="确认回滚计算?" :visible.sync="Dialog" width="400px" center>
            <el-form :model="fromBack" label-width="70px" label-position="left">
                <el-form-item label="当前状态">
                    <el-input v-model="fromBack.currentStatus" disabled></el-input>
                </el-form-item>
                <el-form-item label="回滚状态">
                    <el-select v-model="fromBack.Status" placeholder="请选择" >
                        <el-option label="本期会员奖金表" value="本期会员奖金表"></el-option>
                        <el-option label="本期会员业绩表" value="本期会员业绩表"></el-option>
                        <el-option label="本期会员资格表" value="本期会员资格表"></el-option>
                        <el-option label="业绩状态检查" value="业绩状态检查"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="修改备注">
                    <el-input type="textarea" :autosize="{minRows: 2}" v-model="fromBack.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="Dialog = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="onBack">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
export default {
    data() {
        return {
            Dialog:false,  
            periodCode:"", //当前周期
            selectItem:[],  //周期列表
            data:{},  //
            salesStatus:"",  //  业绩状态检查
            qualification:"",//会员资格表
            //回滚
            fromBack:{  
                currentStatus:"",
                Status:"",
                desc:"",
            }
        };
    },
    methods: {
        //改变周期
        selectChange(val){
            this.periodCode = val;
            this.onStatus()
        },
        //查询状态
        onStatus(){
            //会员资格表
            this.$axios({
                method:'post',
                url:"/apis/member/findQualificationAll",
                params:{
                    periodCode:this.periodCode,
                    currentPage:1,
                    pageSize:100,
                    date:new Date().getTime()
                }
            })      
            .then(response=>{
                if(response.data.code){  
                    this.qualification = "统计完成"
                }else{
                    this.qualification = "还未统计"
                }
            })
        },
        //查询所有可结算周期
        onSearch() {
            this.$axios({
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
            })
        },
        //回滚弹框
        DialogBack(title) {
            this.Dialog = true;
            this.fromBack.currentStatus = title;
        },
        //回滚
        onBack(){
            this.Dialog = false;
        }
    },
    created() {
        this.onSearch();
        this.onStatus()
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
}
.botom-btn > a {
    margin-left: 15px;
}
.el-dialog__body .el-select {
    display: block;
}
</style>
