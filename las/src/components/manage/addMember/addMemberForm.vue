<template>
    <div class="wrap">
        <div id="content">
            <h2 class="text-center">新会员加入单</h2><br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    <span>会员编号:</span> {{formMember.mCode}}
                </el-col>
                <el-col :span="4">
                    <span>姓名：</span>{{formMember.name}}
                </el-col>
                <el-col :span="4">
                    <span>昵称：</span>{{formMember.nickname}}
                </el-col>
                <el-col :span="6">
                    <span>推荐人编号：</span>{{formMember.sid}}
                </el-col>
                <el-col :span="5">
                    <span>推荐人昵称：</span>{{formMember.snickname}}
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    <span>证件类型：</span>{{formMember.IDType}}
                </el-col>
                <el-col :span="7">
                    <span>证件号码：</span>{{formMember.IDNumber}}
                </el-col>
                <el-col :span="3">
                    <span>性别：</span>{{formMember.sex}}
                </el-col>
                <el-col :span="6">
                    <span>出生日期：</span>{{formMember.date}}
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    <span>手机号码: </span>{{formMember.tel}}
                </el-col>
                <el-col :span="6">
                    <span>微信号：</span>{{formMember.wechat}}
                </el-col>
                <el-col :span="7">
                    <span>Email: </span>{{formMember.email}}
                </el-col>
                <el-col :span="4">
                    <span>QQ:</span>{{formMember.qq}}
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="16">
                    <span>地址：</span>{{formMember.address1?formMember.address1[0] + '-' + formMember.address1[1] + '-' + formMember.address1[2]+'-':""}}{{formMember.detailed1}}
                </el-col>
                <el-col :span="4">
                    <span>邮编：</span>{{formMember.zipCode}}
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="10">
                    <span>银行：</span>{{formMember.accountType}}-{{formMember.accountTypeDetailed}}
                </el-col>
                <el-col :span="4">
                    <span>户名：</span>{{formMember.accountName}}
                </el-col>
                <el-col :span="8">
                    <span>账号：</span>{{formMember.accountNumber}}
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4">
                    <span>购货信息：</span>
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="start">
                <el-col :span="10" :offset="1">
                    <span>订单编号：</span>{{formMember.orderSn}}
                </el-col>
                <el-col :span="10">
                    <span>订单日期：</span>{{date}}
                </el-col>
            </el-row>
            <br>
            <el-table :data="GoodsData" center>
                <el-table-column prop="goodsId" label="产品编码" width="90" align="center">
                </el-table-column>
                <el-table-column prop="goodsName" label="产品名称" align="center">
                </el-table-column>
                <el-table-column prop="goodsNum" label="数量" align="center">
                </el-table-column>
                <el-table-column prop="marketPrice" label="零售价" align="center">
                </el-table-column>
                <el-table-column prop="vipPrice" label="会员价" align="center">
                </el-table-column>
                <el-table-column label="金额" align="center">
                    <template slot-scope="scope">
                        {{scope.row.goodsNum * scope.row.marketPrice}}
                    </template>
                </el-table-column>
                <el-table-column prop="ppv" label="PV" align="center">
                </el-table-column>
                <el-table-column label="总pv" align="center">
                    <template slot-scope="scope">
                        {{scope.row.goodsNum * scope.row.ppv}}
                    </template>
                </el-table-column>
            </el-table>
            <br/>
            <el-row type="flex" justify="start">
                <el-col :span="6" :offset="18">
                    <span>数量：</span> {{OrderSum}}
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="6" :offset="18">
                    <span>商品金额：</span> {{OrderPrice}}
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="6" :offset="18">
                    <span>总PV: </span>{{OrderPV}}
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="6" :offset="18">
                    <span>运费：</span> {{formMember.shippingFee}}
                </el-col>
            </el-row>
            <el-row type="flex" justify="start">
                <el-col :span="6" :offset="18">
                    <span>合计：</span> {{OrderPrice+formMember.shippingFee}}
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="start">
                <el-col :span="6">
                    <span>发货方式：</span>{{deliveryMethod}}        
                </el-col>
                <el-col :span="18">
                    <span>地址：</span>{{formMember.address2?formMember.address2[0] + '-' + formMember.address2[1] + '-' + formMember.address2[2]+'-':""}}{{formMember.detailed2}}  
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="start">
                <el-col :span="6">
                    <span>收件人: </span>{{formMember.reName}}              
                </el-col>
                <el-col :span="18">
                    <span>联系方式: </span> {{formMember.contact}}        
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="0" type="flex" justify="start">
                <el-col :span="10">
                    <template>
                        <el-checkbox v-model="checked">本人已阅读背面有关《会员加入须知事项》，且保证所填资料真实可靠。</el-checkbox>
                    </template>
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="10" :offset="3">
                    <span>注册日期: </span> {{date}}                             
                </el-col>
                <el-col :span="6">
                    <span>签字：</span>  
                </el-col>
            </el-row>
            <br>
            <br>           
        </div>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="3"><el-button type="primary" @click="printContent">打印</el-button></el-col>
            <el-col :span="3"><el-button type="success" :disabled="!checked" @click="onNext">下一步</el-button></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() { 
        return {
            date:null,
            deliveryMethod:"", //发货方式
            checked:false,
            GoodsData:[],
            //会员基本信息
            formMember: {
                sid: "",
                snickname: "",
                sname: "",
                mCode:"",
                name: "", //姓名
                nickname: "", //昵称
                IDType: "1", //证件类型
                IDNumber: "", //证件号码
                sex: -1, //性别
                date: "", //出生日期
                tel: "", //手机号码
                address1: [],
                detailed1:"",
                zipCode: "", //邮编
                email: "", //邮箱
                wechat: "", //微信号
                qq: "", //qq号
                accountType: "", //开户行
                accountTypeDetailed: "", //开户行分行
                accountName: "", //户名
                accountNumber: "", //账号
                orderSn:"",  //订单编号
                shippingFee:null,  //运费

                summary:null,
                number:null,
                sum:null,
                sumPV:null,
                mode:0,
                otherAddress:0,
                address2:[],
                detailed2:"",
                reName:"",
                contact:""
            },

        }; 
    },
    computed: {
        //总数量 
        OrderSum:function(){
            let sum = 0;
            for(let i = 0; i < this.GoodsData.length; i++){
                sum += parseInt(this.GoodsData[i].goodsNum);
            }
            return sum;
        },
        //总金额
        OrderPrice:function(){
            let sum = 0;
            for(let i = 0; i < this.GoodsData.length; i++){
                sum += this.GoodsData[i].marketPrice * this.GoodsData[i].goodsNum;
            }
            return sum ;
        },
        //总PV
        OrderPV:function(){
            let sum = 0;
            for(let i = 0; i < this.GoodsData.length; i++){
                sum += this.GoodsData[i].ppv * this.GoodsData[i].goodsNum;
            }
            return sum;
        },
    },
    created() {
        let datetime = new Date();
        this.date = datetime.getFullYear() + " 年 " + (datetime.getMonth()+1) + " 月 " + datetime.getDate() + " 日";
        this.formMember = JSON.parse(this.$route.params.formMember);
        this.GoodsData = JSON.parse(this.$route.params.GoodsData);
        this.deliveryMethod = this.$route.params.deliveryMethod;

        this.$request({
            method:'get',
            url:"/apis/member/queryMemDetail",
            params: {
                mCode:this.formMember.mCode
            }
        })
        .then(response=>{
            if(response.data.data.order.length!=0){
                this.formMember.orderSn = response.data.data.order[0].orderSn;
                this.formMember.shippingFee = response.data.data.order[0].shippingFee;
            }
        }) 


        if(this.formMember.IDType=="1"){
            this.formMember.IDType = "居民身份证";
        }else if(this.formMember.IDType=="2"){
            this.formMember.IDType = "女";
        }else if(this.formMember.IDType=="3"){
            this.formMember.IDType = "军官证";
        }else if(this.formMember.IDType=="4"){
            this.formMember.IDType = "回乡证";
        }

        if(this.formMember.sex=="0"){
            this.formMember.sex = "男";
        }else if(this.formMember.sex=="1"){
            this.formMember.sex = "女";
        }else if(this.formMember.sex=="-1"){
            this.formMember.sex = "保密";
        }

        if(this.deliveryMethod=="0"){
            this.deliveryMethod = "自提";
        }else if(this.deliveryMethod=="1"){
            this.deliveryMethod = "快递";
        }

        for(let i in formMember){
            if(this.memberBasic[i]==""){
                this.memberBasic[i]= "无";
            }
        }
    },
    methods: {
        //打印
        printContent(e){
            let subOutputRankPrint = document.getElementById('content');
            //去掉页眉和页脚
            function remove_ie_header_and_footer() {
                var hkey_path;
                hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
                try {
                    var RegWsh = new ActiveXObject("WScript.Shell");
                    RegWsh.RegWrite(hkey_path + "header", "");
                    RegWsh.RegWrite(hkey_path + "footer", "");
                } catch (e) {}
            }
            remove_ie_header_and_footer();
            let newContent =subOutputRankPrint.innerHTML;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            window.print();
            document.body.innerHTML = oldContent;
            return false;
        },    
        //下一步，进入支付页面
        onNext() {
            if(this.checked){
                this.$router.push({
                    name:"新会员订单",
                    params:{
                        orderId:this.formMember.orderSn,
                        mCode:this.formMember.mCode,
                        tel:this.formMember.tel,
                        name:this.formMember.name,
                        date:this.date,
                        price:this.OrderPrice
                    }
                });
            }
        }    
        
    }
};
</script>

<style scoped>
.wrap {
    width: 800px;
    margin: 50px auto;
}
.el-col {
    font-size: 14px;
}
#content .el-col{
    color:#000;
}
#content span{
    color:#999;
}
</style>
