<template>
    <div>
        <el-form ref="form" label-width="90px" label-position="left">
            <el-row>
                <el-col :span="5">
                    <el-form-item label="会员编号">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="姓名">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="昵称">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="推荐人编号">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="推荐人昵称">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="加入日期">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="性别">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="证件类型">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="证件号码">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="手机号码">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="微信号">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="Email">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <el-form-item label="地址">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="省" label-width="30px" style="margin-left:10px;">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="市" label-width="30px"  style="margin-left:10px;">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="区" label-width="30px"  style="margin-left:10px;">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="邮编">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="会员级别">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="会员状态">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="奖励积分状态" label-width="110px">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="奖励积分余额" label-width="110px">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="关联绑定状态" label-width="110px">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="关联绑定状态" label-width="110px">
                        <el-input v-model="form.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <br/>
        <el-row>
            <el-col :span="10">
                <el-table>
                    <el-table-column label="会员银行卡列表" align="center">
                        <el-table-column label="银行名称"  align="center"></el-table-column>
                        <el-table-column label="卡号"  align="center"></el-table-column>
                        <el-table-column label="账户名" width="120" align="center"></el-table-column>
                        <el-table-column label="类型" width="120" align="center"></el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-table>
                    <el-table-column label="会员收货地址列表" align="center">
                        <el-table-column label="地址列表"  align="center"></el-table-column>
                        <el-table-column label="收货人" width="150" align="center"></el-table-column>
                        <el-table-column label="手机号" width="150"  align="center"></el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-table>
                    <el-table-column label="#" align="center">
                        <template slot-scope="scope">
                            <el-radio class="radio"  :label="scope.$index">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="会员编号" align="center"></el-table-column>
                    <el-table-column label="会员昵称" align="center"></el-table-column>
                    <el-table-column label="订单类型" align="center"></el-table-column>
                    <el-table-column label="订单来源" align="center"></el-table-column>
                    <el-table-column label="订单编号" align="center"></el-table-column>
                    <el-table-column label="订单日期" align="center"></el-table-column>
                    <el-table-column label="商品件数" align="center"></el-table-column>
                    <el-table-column label="商品金额" align="center"></el-table-column>
                    <el-table-column label="运费" align="center"></el-table-column>
                    <el-table-column label="订单总金额" align="center" width="140px"></el-table-column>
                    <el-table-column label="付款状态" align="center"></el-table-column>
                    <el-table-column label="付款时间" align="center"></el-table-column>
                    <el-table-column label="总PV" align="center"></el-table-column>
                    <el-table-column label="订单状态" align="center"></el-table-column>
                    <el-table-column label="业绩周期" align="center"></el-table-column>
                    <el-table-column label="发运方式" align="center"></el-table-column>
                    <el-table-column label="发运状态" align="center"></el-table-column>
                    <el-table-column label="快递单号" align="center"></el-table-column>
                    <el-table-column label="评价状态" align="center"></el-table-column>
                    <el-table-column label="售后状态" align="center"></el-table-column>
                    <el-table-column label="收货人" align="center"></el-table-column>
                    <el-table-column label="联系电话" align="center"></el-table-column>
                    <el-table-column label="省" align="center"></el-table-column>
                    <el-table-column label="市" align="center"></el-table-column>
                    <el-table-column label="县区" align="center"></el-table-column>
                    <el-table-column label="详细地址" align="center" width="260px"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                mCode:""
            }
        }
    }
}
</script>
