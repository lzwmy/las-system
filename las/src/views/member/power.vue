<template>
    <div class="box">
        <i class="icon iconfont icon-kulian"></i>
        <div class="text">
            <span>权限不足</span>
            <!-- <span class="t">0</span>
            <span>4</span> -->
        </div>
    </div>

</template>



<style scoped>

.wrap .box {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding:60px;
}
.wrap .box i{
    display: block;
    font-size:300px;
    font-weight: 300;
    color:#393D49;
}


.wrap .box .text{
    width:100%;
    text-align: center;
    font-size: 100px;
    line-height: 100px;
    color: #009688;
    font-weight: 500;
    font-family: Arial;
}
.wrap .box .text::before{
    content:"";
    display: block;
    margin:30px auto;
    width:500px;
    height: 5px;
    background: #009688;
}
.wrap .box .text span.t{
    display: inline-block;
    animation: rotate 1s  infinite linear;
}
@keyframes rotate {
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
}
</style>
