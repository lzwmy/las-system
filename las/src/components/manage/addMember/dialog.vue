<template>
    <div class="wrap">
        <!-- 激活账户对话框 -->
        <el-dialog
            title="激活账户"
            :visible.sync="DialogActivation"
            width="500px"
            center>
          <el-form ref="form">
                  <el-row :gutter="20">
                    <el-col :span="5">
                        会员编号：
                    </el-col>
                    <el-col :span="12">
                    con000001
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="5">
                        昵称：
                    </el-col>
                    <el-col :span="12">
                        张三丰
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="5">
                        姓名：
                    </el-col>
                    <el-col :span="12">
                        张三丰
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="5">
                        证件号码：
                    </el-col>
                    <el-col :span="12">
                        11010019770101511
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="5">
                        账户状态：
                    </el-col>
                    <el-col :span="12">
                        未激活
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="5">
                        支付密码：
                    </el-col>
                    <el-col :span="12">
                        <el-input type="password" placeholder="请输入密码"></el-input>
                    </el-col>
                </el-row>
                
                <el-row :gutter="20">
                    <el-col :span="5">
                        再次输入：
                    </el-col>
                    <el-col :span="12">
                        <el-input type="password" placeholder="请输入密码"></el-input>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DialogActivation = false">激活账户</el-button>
            </span>
        </el-dialog>

        <!-- 支付成功弹出层 -->
        <el-dialog
            title="新会员支付成功"
            :visible.sync="DialogPaySuccess"
            width="400px"
            center>
            <el-form label-width="100px" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="6" :offset="4">
                        订单编号：
                    </el-col>
                    <el-col :span="6">
                        con000001
                    </el-col>
                </el-row>
                 
                <el-row :gutter="20">
                    <el-col :span="6" :offset="4">
                        会员编号：
                    </el-col>
                    <el-col :span="6">
                        con000001
                    </el-col>
                </el-row>
                   
                <el-row :gutter="20">
                    <el-col :span="6" :offset="4">
                        姓名：
                    </el-col>
                    <el-col :span="6">
                        张三丰
                    </el-col>
                </el-row>
                  
                <el-row :gutter="20">
                    <el-col :span="6" :offset="4">
                        订单日期：
                    </el-col>
                    <el-col :span="8">
                        2018年12月1日
                    </el-col>
                </el-row>
                   
                <el-row :gutter="20">
                    <el-col :span="6" :offset="4">
                        订单金额：
                    </el-col>
                    <el-col :span="6">
                        285.300
                    </el-col>
                </el-row>
                   
                <el-row :gutter="20" type="flex" justify="center">
                    <el-col :span="22">
                        订单支付已成功，系统将会员编号及密码发短信至会员手机号13988888888，请通知该会员及时登陆并修改密码。
                    </el-col>
                </el-row>
                                                   
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="DialogPaySuccess = false">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
// import util from "../../../util/util.js";
export default {
    name: "dialog-payment",
    data() {
        return {
            //激活账户弹出层是否可见
            DialogActivation:false,
            //支付成功
            DialogPaySuccess:false
        };
    },
    methods: {
        
    },
    mounted () {
        // //触发激活账户弹出层事件
        // util.$on("showActivation",(data)=>{
        //     this.DialogActivation = true;
        // }); 
        // util.$on("showPaySuccess",(data)=>{
        //     this.DialogPaySuccess = true;
        // });        
    }
};
</script>



<style>

</style>

