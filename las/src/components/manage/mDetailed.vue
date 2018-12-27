<template>
    <div>
        <el-form label-width="90px" label-position="left">
            <el-row>
                <el-col :span="5">
                    <el-form-item label="会员编号">
                        <el-input v-model="memberBasic.mCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="姓名">
                        <el-input v-model="memberBasic.mName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="昵称">
                        <el-input v-model="memberBasic.mNickname" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="推荐人编号">
                        <el-input v-model="memberBasic.sponsorCode" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="推荐人昵称">
                        <el-input v-model="memberBasic.sponsorName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="加入日期">
                        <el-input v-model="memberBasic.creationData" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="性别">
                        <el-input v-model="memberBasic.gender" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="证件类型">
                        <el-input v-model="memberBasic.idType" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="证件号码">
                        <el-input v-model="memberBasic.idCode" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="手机号码">
                        <el-input v-model="memberBasic.mobile" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="微信号">
                        <el-input v-model="memberBasic.weChat" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="Email">
                        <el-input v-model="memberBasic.email" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <el-form-item label="地址">
                        <el-input v-model="memberBasic.province" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="省" label-width="30px" style="margin-left:10px;">
                        <el-input v-model="memberBasic.city" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label="市" label-width="30px"  style="margin-left:10px;">
                        <el-input v-model="memberBasic.country" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="区" label-width="30px"  style="margin-left:10px;">
                        <el-input v-model="memberBasic.detial" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="邮编">
                        <el-input v-model="memberBasic.addPost" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="会员级别">
                        <el-input v-model="memberBasic.rank" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="会员状态">
                        <el-input v-model="memberBasic.mStatus" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="关联绑定状态" label-width="110px">
                        <el-input v-model="memberBasic.raSponsorStatus" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="老系统开店状态" label-width="110px">
                        <el-input v-model="memberBasic.raShopYn" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="关联公司绑定状态" label-width="140px">
                        <el-input v-model="memberBasic.raStatus" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="关联公司昵称" label-width="110px">
                        <el-input v-model="memberBasic.raNickName" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="1">
                    <el-form-item label="关联绑定日" label-width="110px">
                        <el-input v-model="memberBasic.raBindingDate" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4">
                    <el-form-item label="积分状态" label-width="110px">
                        <el-input v-model="memberBasic.bonusStatus" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="奖励积分余额" label-width="110px">
                        <el-input v-model="memberBasic.bonusBlance" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="购物积分余额" label-width="110px">
                        <el-input v-model="memberBasic.walletBlance" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-form-item label="换购积分余额" label-width="110px">
                        <el-input v-model="memberBasic.redemptionBlance" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <br/>
        <el-row>
            <el-col :span="11">
                <el-table :data="memberBank">
                    <el-table-column label="会员银行卡列表" align="center">
                        <el-table-column label="银行名称" prop="bankCode" align="center"></el-table-column>
                        <el-table-column label="卡号" prop="accCode" min-width="150" align="center"></el-table-column>
                        <el-table-column label="账户名" prop="accName"  align="center"></el-table-column>
                        <el-table-column label="类型" prop="accType" align="center"></el-table-column>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12" :offset="1">
                <el-table :data="memberAddress">
                    <el-table-column label="会员收货地址列表" align="center">
                        <el-table-column label="地址列表" prop="address" min-width="160" align="center"></el-table-column>
                        <el-table-column label="收货人" prop="consigneeName" align="center"></el-table-column>
                        <el-table-column label="手机号" prop="mobile"  align="center"></el-table-column>
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
                    <el-table-column label="会员编号" align="center" prop="buyerId"></el-table-column>
                    <el-table-column label="会员昵称" align="center" prop="buyerName"></el-table-column>
                    <el-table-column label="订单类型" align="center" prop="orderType"></el-table-column>
                    <el-table-column label="订单来源" align="center" prop="orderPlatform"></el-table-column>
                    <el-table-column label="订单编号" align="center" prop="orderSn"></el-table-column>
                    <el-table-column label="订单日期" align="center" prop="createTime"></el-table-column>
                    <el-table-column label="商品件数" align="center" prop=""></el-table-column>
                    <el-table-column label="商品金额" align="center" prop="goodsAmount"></el-table-column>
                    <el-table-column label="运费" align="center" prop="shippingFee"></el-table-column>
                    <el-table-column label="订单总金额" align="center" prop="orderTotalPrice" min-width="140px"></el-table-column>
                    <el-table-column label="付款状态" align="center" prop="paymentState"></el-table-column>
                    <el-table-column label="付款时间" align="center" prop="paymentTime"></el-table-column>
                    <el-table-column label="总PV" align="center" prop="ppv"></el-table-column>
                    <el-table-column label="订单状态" align="center" prop=""></el-table-column>
                    <el-table-column label="业绩周期" align="center" prop="createPeriod"></el-table-column>
                    <el-table-column label="发运方式" align="center" prop="shippingName"></el-table-column>
                    <el-table-column label="发运状态" align="center" prop=""></el-table-column>
                    <el-table-column label="快递单号" align="center" prop="shippingCode"></el-table-column>
                    <el-table-column label="评价状态" align="center" prop="evaluationStatus"></el-table-column>
                    <el-table-column label="售后状态" align="center" prop=""></el-table-column>
                    <el-table-column label="收货人" align="center" prop=""></el-table-column>
                    <el-table-column label="联系电话" align="center" prop=""></el-table-column>
                    <el-table-column label="省" align="center" prop=""></el-table-column>
                    <el-table-column label="市" align="center" prop=""></el-table-column>
                    <el-table-column label="县区" align="center" prop=""></el-table-column>
                    <el-table-column label="详细地址" align="center" prop="" width="260px"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            memberBasic:{},  //会员基础信息
            memberBank:[],  //会员银行卡信息
            memberAddress:[],  //会员地址信息
            order:[]  //订单信息
        }
    },
    created(){
        this.$request({
            method:'get',
            url:"/apis/member/queryMemDetail",
            params: {
                mCode:this.$route.params.mCode,
                date:new Date().getTime()
            }
        })
        .then(response=>{
            if(response.data.code){
                let memberBasic = response.data.data.memberBasic;   
                let memberRelation = response.data.data.memberRelation;   
                let memberAccount = response.data.data.memberAccount;   
                this.memberBank = response.data.data.memberBank;   
                this.memberAddress = response.data.data.memberAddress;
                this.order = response.data.data.order;
                if(memberBasic.idType == 1){
                    memberBasic.idType = "居民身份证";
                }else if(memberBasic.idType == 2){
                    memberBasic.idType = "护照";
                }else if(memberBasic.idType == 3){
                    memberBasic.idType = "军官证";
                }else if(memberBasic.idType == 4){
                    memberBasic.idType = "回乡证";
                }
                
                if(memberRelation.rank == 0){
                    memberRelation.rank = "普通会员";
                }else if(memberRelation.rank == 1){
                    memberRelation.rank = "VIP会员";
                }else if(memberRelation.rank == 2){
                    memberRelation.rank = "代理会员";
                }else if(memberRelation.rank == 3){
                    memberRelation.rank = "初级代理店";
                }else if(memberRelation.rank == 4){
                    memberRelation.rank = "一级代理店";
                }else if(memberRelation.rank == 5){
                    memberRelation.rank = "二级代理店";
                }else if(memberRelation.rank == 6){
                    memberRelation.rank = "三级代理店";
                }else if(memberRelation.rank == 7){
                    memberRelation.rank = "旗舰店";
                }else if(memberRelation.rank == 8){
                    memberRelation.rank = "高级旗舰店";
                }else if(memberRelation.rank == 9){
                    memberRelation.rank = "超级旗舰店";
                }

                this.memberBasic = {
                    mCode:memberBasic.mCode,
                    mName:memberBasic.mName,
                    mNickname:memberBasic.mNickname,
                    sponsorCode:memberRelation.sponsorCode,
                    sponsorName:memberRelation.sponsorName,
                    creationData:memberBasic.creationData,
                    gender:memberBasic.gender==0?"男":"女",
                    idType:memberBasic.idType,
                    idCode:memberBasic.idCode,
                    mobile:memberBasic.mobile,
                    weChat:memberBasic.weChat,
                    email:memberBasic.email,
                    province:memberBasic.province,
                    city:memberBasic.city,
                    country:memberBasic.country,
                    detial:memberBasic.detial,
                    addPost:memberBasic.addPost,
                    rank:memberRelation.rank,
                    mStatus:memberRelation.mStatus==0?"正常":(memberRelation.mStatus==1?"冻结":"未激活"),
                    raSponsorStatus:memberRelation.mStatus==0?"临时状态":"永久状态",
                    raShopYn:memberRelation.raShopYn==1?"已开店":"未开店",
                    raStatus:memberRelation.raStatus==1?"已绑定":"未绑定",
                    raNickName:memberRelation.raNickName,
                    raBindingDate:memberRelation.raBindingDate,
                    bonusStatus:memberAccount?(memberAccount.bonusStatus==1?"正常":(memberAccount.bonusStatus==2?"冻结":"未激活")):"",
                    bonusBlance:memberAccount?memberAccount.bonusBlance:"",
                    walletBlance:memberAccount?memberAccount.walletBlance:"",
                    redemptionBlance:memberAccount?memberAccount.redemptionBlance:"",
                }

                for(let i = 0; i < this.memberAddress.length; i++){
                    this.memberAddress[i].address = this.memberAddress[i].addProvinceCode+"-"+this.memberAddress[i].addCityCode+"-"+this.memberAddress[i].addCountryCode+"-"+this.memberAddress[i].addDetial;
                }
                for(let i = 0; i < this.order.length; i++){
                    if(this.order[i].orderPlatform == 0){
                        this.order[i].orderPlatform = "PC";
                    }else if(this.order[i].orderPlatform == 1){
                        this.order[i].orderPlatform = "安卓";
                    }else if(this.order[i].orderPlatform == 2){
                        this.order[i].orderPlatform = "IOS";
                    }
                    if(this.order[i].paymentState == 0){
                        this.order[i].paymentState = "未付款";
                    }else if(this.order[i].paymentState == 1){
                        this.order[i].paymentState = "已付款";
                    }
                    if(this.order[i].evaluationStatus == 0){
                        this.order[i].evaluationStatus = "未评价";
                    }else if(this.order[i].evaluationStatus == 1){
                        this.order[i].evaluationStatus = "已评价";
                    }
                    
                }
               
            }
        })  
    }
}
</script>
