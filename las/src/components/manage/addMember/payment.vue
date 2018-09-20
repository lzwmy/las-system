<template>
    <div class="wrap">
        
        <h2 class="text-center">新增会员支付</h2><br>
        <el-row :gutter="20" type="flex" justify="start">
            <el-col :span="12">
                订单编号：con000001
            </el-col>
            <el-col :span="12">
                订单日期：1977年0101日
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="20" type="flex" justify="start">
            <el-col :span="12">
                会员编号：con000001
            </el-col>
            <el-col :span="12">
                姓名：张三丰
            </el-col>
        </el-row>
        <br>                                                  
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="4">
                订单金额： 
            </el-col>
            <el-col :span="4">
                380.00
            </el-col>
        </el-row>
        <br>  
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="4">
                优惠额：
            </el-col>
            <el-col :span="4">
                380.00
            </el-col>
        </el-row>
        <br>  
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="4">
                运费: 
            </el-col>
            <el-col :span="4">
                380.00
            </el-col>
        </el-row>
        <br>  
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="4">
                实际金额：
            </el-col>
            <el-col :span="4">
                380.00
            </el-col>
        </el-row>           
        <br>
        <el-form ref="form"  label-width="80px">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="付款方式">
                        <el-checkbox-group v-model="from.integral">
                        <el-checkbox label="购物积分" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="状态:">
                        <el-radio-group v-model="from.state">
                        <el-radio label="正常"></el-radio>
                        <el-radio label="冻结"></el-radio>
                        <el-radio label="未激活"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label-width="0px">
                        <el-button type="primary" size="mini" @click="showActivation">激活账户</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    账户余额：
                </el-col>
                <el-col :span="4">
                    0.00
                </el-col>
                <el-col :span="4">
                    <el-form-item label-width="0px">
                        <el-button  size="mini">奖励积分转入</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="4" >
                    <el-form-item label-width="0px">
                        <el-button size="mini">他人转入</el-button>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row :gutter="20">
                <el-col :span="9">
                    <el-form-item label="使用余额：" label-width="90px">
                        <el-input size="mini" v-model="from.balance"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label-width="0px">
                        <el-button  size="mini">密码验证</el-button>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row>
                <el-col :span="9">
                    <el-form-item label="余额应付：" label-width="90px">
                        <el-input size="mini" v-model="from.payment"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="支付方式:">
                        <el-radio-group v-model="from.way">
                            <el-radio label="现金"></el-radio>
                            <el-radio label="银行卡"></el-radio>
                            <el-radio label="支付宝"></el-radio>
                            <el-radio label="微信"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>                
            </el-row>
        </el-form>
        <br>
        <br>
        
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="3"><el-button type="success" @click="paySuccess">支付</el-button></el-col>
        </el-row>

        <dialog-payment></dialog-payment>

    </div>
</template>

<script>
import util from "../../../util/util.js";
import dialog from './dialog.vue'
export default {
    data() { 
        return {  
            from: {
                integral:false, //是否使用购物积分
                state:"", //状态
                balance: "", //使用余额
                payment: "", //余额应付
                way: "",  //支付方式
            }
        };
    },
    components: {
        [dialog.name]: dialog
    },
    created() {
        console.log(this.$route.params);
    },
    methods: {
        //激活账户弹出层
        showActivation() {
            util.$emit("showActivation");
        },
        //支付成功
        paySuccess() {
            util.$emit("showPaySuccess");
        }
        
    }
};
</script>

<style scoped>
.wrap {
    width: 730px;
    margin: 50px auto;
}
</style>
