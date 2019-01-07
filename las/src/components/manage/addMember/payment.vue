<template>
    <div class="wrap">
        <p>订单编号：{{form.orderId}}</p>   
        <p>会员编号：{{form.mCode}}</p>
        <p>登录手机：{{form.tel}}</p>
        <p>姓名：{{form.name}}</p>
        <p>订单日期：{{form.date}}</p>
        <p>订单金额：{{form.price}}</p>
        <p>订单支付已生成成功，请使用手机号登录App设置密码，并在订单里完成支付！</p>
        <router-link to="/">
            <el-button type="success">返回</el-button>
        </router-link>
    </div>
</template>

<script>
export default {
    data() { 
        return {  
            form:{}
        };
    },
    created() {
        this.form = this.$route.params;
    }
};
</script>

<style scoped>
.wrap{
    width:400px;
    margin:100px auto;
}
.wrap p{
    margin:15px 0;
    color:#555;
}

</style>
