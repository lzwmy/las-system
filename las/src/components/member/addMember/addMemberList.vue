<template>
    <div class="wrap">
        <div id="content">
            <h2 class="text-center">新会员加入单</h2><br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    会员编号：con000001
                </el-col>
                <el-col :span="4">
                    姓名：张三丰
                </el-col>
                <el-col :span="4">
                    昵称：三丰真人
                </el-col>
                <el-col :span="6">
                    推荐人编号：con000000
                </el-col>
                <el-col :span="5">
                    推荐人昵称：乐安士
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    证件类型：居民身份证
                </el-col>
                <el-col :span="7">
                    证件号码：36071599884523
                </el-col>
                <el-col :span="3">
                    性别：男
                </el-col>
                <el-col :span="6">
                    出生日期：1977年0101日
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    手机号码: 13988888888
                </el-col>
                <el-col :span="6">
                    微信号：13988888888
                </el-col>
                <el-col :span="7">
                    Email: sanfeng888@qq.com
                </el-col>
                <el-col :span="4">
                    QQ:515112121
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="16">
                    地址：广东省深圳市南山区南山大道188号亿利达大厦2-108
                </el-col>
                <el-col :span="4">
                    邮编：000000
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6">
                    银行：中国工商银行
                </el-col>
                <el-col :span="4">
                    户名：张三丰
                </el-col>
                <el-col :span="8">
                    账号：6201 xxxx xxxx xxxx 911
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4">
                    购货信息：
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="6" :offset="1">
                    订单编号：0001000001
                </el-col>
                <el-col :span="7">
                    订单日期：2018年12月1日
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="3" :offset="1">
                    商口编码
                </el-col>
                <el-col :span="3">
                    商品名称
                </el-col>
                <el-col :span="3">
                    单价
                </el-col>
                <el-col :span="3">
                    数量
                </el-col>
                <el-col :span="3">
                    金额
                </el-col>
                <el-col :span="3">
                    PV值
                </el-col>
                <el-col :span="3">
                    总PV
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="3" :offset="1">
                    V01001
                </el-col>
                <el-col :span="3">
                    VIP启动包一
                </el-col>
                <el-col :span="3">
                    380.00
                </el-col>
                <el-col :span="3">
                    1
                </el-col>
                <el-col :span="3">
                    380.00
                </el-col>
                <el-col :span="3">
                    0
                </el-col>
                <el-col :span="3">
                    0
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4" :offset="18">
                    数量： 1
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4" :offset="18">
                    商品金额： 380.00
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4" :offset="18">
                    总PV: 0.00
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4" :offset="18">
                    运费： 10.00
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4" :offset="18">
                    合计： 390.00
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4">
                    发货方式：  快递        
                </el-col>
                <el-col :span="20">
                    地址： 广东省深圳市南山区南山大道188号亿利达大厦2-108
                </el-col>
            </el-row>
            <br>
            <el-row :gutter="20" type="flex" justify="start">
                <el-col :span="4" :offset="4">
                    收件人: 张三丰              
                </el-col>
                <el-col :span="6">
                    联系方式： 13988888888    
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
                    注册日期:  2018年12月1日                             
                </el-col>
                <el-col :span="6">
                    签字：   
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
            checked:false
        };
    },
    created() {
        console.log(this.$route.params);
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
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
        },    
        //下一步，进入支付页面
        onNext() {
            if(this.checked){
                this.$router.push({
                    name:"Payment",
                    params:{
                        id:123
                    }
                });
            }
        }    
        
    }
};
</script>

<style scoped>
.wrap {
    width: 730px;
    margin: 50px auto;
}
.el-col {
    font-size: 14px;
}
</style>
