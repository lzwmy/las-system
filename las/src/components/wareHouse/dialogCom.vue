<template>   
    <div>
        <!-- 查看清单 -->
        <el-dialog :title="title" :visible.sync="DialogTable" width="80%" center>
            <el-row>
                <el-col :span="24">
                    <el-table 
                        :data="searchData" 
                        v-loading="loadingTable" 
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                        <el-table-column type="index" prop="" label="序号" align="center">
                        </el-table-column>
                        <el-table-column prop="id" label="商品ID" align="center">
                        </el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" align="center">
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="规格" align="center" min-width="140">
                        </el-table-column>
                        <el-table-column prop="specName" label="sku" align="center">
                        </el-table-column>
                        <el-table-column prop="stockNow" label="现有库存数量" align="center">
                        </el-table-column>
                        <el-table-column prop="createTime" label="生产日期" align="center">
                        </el-table-column>
                        <el-table-column prop="day" label="保质期(天)" align="center">
                        </el-table-column>
                        <el-table-column prop="shelfLifeTime" label="到期日期" align="center">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="center">
                <el-col :span="8" align="center">
                    <el-pagination
                        :page-size="pageData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-sizes="[10, 20, 30, 50,999]"
                        :total="pageData.total"
                        :current-page="pageData.currentPage"
                        @current-change="onChangePage"  
                        @size-change="handleSizeChange">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-dialog>

        <!-- 选择附件 -->
        <el-dialog :title="title" :visible.sync="DialogImg" width="80%" center>
            <img :src="/apis/+imgPath" alt="附件" style="max-width:100%;">
        </el-dialog>

        <!-- 选择商品信息 -->
        <el-dialog :title="title" :visible.sync="DialogTableGoods" width="80%" center>
            <el-form label-width="90px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="搜索商品：">
                            <el-input v-model="goodsSearch" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商品ID：">
                            <el-input v-model="goodsID" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button type="primary" @click="onSearch">搜 索</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="24">
                    <el-table 
                        :data="goodsData" 
                        ref="multipleTable"
                        v-loading="loadingGoods" 
                        clearSelection
                        @selection-change="handleSelectionChange"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                        <el-table-column label="选择" type="selection" width="55" align="center">
                        </el-table-column>
                        <el-table-column prop="id" label="商品ID" align="center">
                        </el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" align="center">
                        </el-table-column>
                        <el-table-column prop="goodsSpec" label="规格" align="center" min-width="140">
                        </el-table-column>
                        <el-table-column prop="specName" label="sku" align="center">
                        </el-table-column>
                        <el-table-column prop="stock" label="现有库存数" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="createTime" label="生产日期" align="center" width="140">
                        </el-table-column>
                        <el-table-column prop="day" label="保质期(天)" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="shelfLifeTime" label="到期日期" align="center" width="140">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="center">
                <el-col :span="8" align="center">
                    <el-pagination
                        :page-size="pageDataGoods.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-sizes="[10, 20, 30, 50,999]"
                        :total="pageDataGoods.total"
                        :current-page="pageDataGoods.currentPage"
                        @current-change="onChangePage"  
                        @size-change="handleSizeChange">
                    </el-pagination>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogTableGoods = false">取 消</el-button>
                <el-button type="primary" @click="sendData">确 定</el-button>
            </span>
        </el-dialog>
    </div>    
</template>


<script>
export default {
    data() {
        return {
            loadingTable:false, //加载清单
            loadingGoods:false, //商品列表
            searchData: [], //清单数据
            title:"", //table标题
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
            DialogTable:false,
            wId:null,  //清单ID

            DialogImg:false, //附件对话框
            imgPath:"",  //附件图片
            
            goodsSearch:"",  //商品名称
            goodsID:"",  //商品ID
            selectGoodsData: [],  //选中商品数据 
            DialogTableGoods:false,     //商品信息对话框
            goodsData: [],  //商品数据
            //仓库分页数据
            pageDataGoods:{
                currentPage:1,
                pageSize:10,
                total:0,
            },
        };
    },
    methods: {
        //显示清单
        showTable(wId){
            this.wId = wId;
            this.$request({
                method:'post',
                url:"/apis/member/findGAByWId",
                params:{
                    wId:this.wId,
                    currentPage:this.pageDataGoods.currentPage,
                    pageSize:this.pageDataGoods.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.loadingTable = true;
                    this.DialogTable = true;
                    this.searchData = response.data.data.list;
                    for(let i = 0; i < this.searchData.length; i++){
                        let time1 = this.searchData[i].createTime;
                        time1 = time1.substring(0,19);    
                        time1 = time1.replace(/-/g,'/'); 
                        let createTime = new Date(time1).getTime();

                        let  time2 = this.searchData[i].shelfLifeTime;
                        time2 = time2.substring(0,19);    
                        time2 = time2.replace(/-/g,'/'); 
                        let shelfLifeTime = new Date(time2).getTime();

                        let time = shelfLifeTime - createTime;
                        this.searchData[i].day = Math.floor(time/(3600 * 24 * 1000));
                    }
                    this.pageData.currentPage = response.data.data.pageNum,
                    this.pageData.pageSize = response.data.data.pageSize,
                    this.pageData.total = response.data.data.total
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'wraning'
                    });
                }
                setTimeout(()=>{
                    this.loadingTable = false;
                },200)
            })
        },
        //改变页数
        onChangePage(currentPage) {
            this.pageData.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.onSearch();
        },
        //改变页数
        onChangePageGoods(currentPage) {
            this.pageDataGoods.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        onChangePageGoods(pageSize) {
            this.pageDataGoods.pageSize = pageSize;
            this.onSearch();
        },
        //点击查询商品信息
        onSearch() {
            this.goodsData = [];
            this.loadingGoods = true;  
            this.$request({
                method:'post',
                url:"/apis/member/findGoods",
                params:{
                    id:this.goodsID,
                    goodsName:this.goodsSearch,
                    currentPage:this.pageDataGoods.currentPage,
                    pageSize:this.pageDataGoods.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.goodsData = response.data.data.list;
                    for(let i = 0; i < this.goodsData.length; i++){
                        if(this.goodsData[i].createTime && this.goodsData[i].shelfLifeTime){
                            let time1 = this.goodsData[i].createTime;
                            time1 = time1.substring(0,19).replace(/-/g,'/');
                            let createTime = new Date(time1).getTime();
    
                            let  time2 = this.goodsData[i].shelfLifeTime;
                            time2 = time2.substring(0,19).replace(/-/g,'/'); ;    
                            let shelfLifeTime = new Date(time2).getTime();
    
                            let time = shelfLifeTime - createTime;
                            this.goodsData[i].day = Math.floor(time/(3600 * 24 * 1000));
                        }
                    }
                    this.pageDataGoods.currentPage = response.data.data.pageNum,
                    this.pageDataGoods.pageSize = response.data.data.pageSize,
                    this.pageDataGoods.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingGoods = false;
                },200)
            })
        },
        //显示商品信息弹框
        DialogShowGoods(arr){
            this.DialogTableGoods = true;
        },
        //删除已选中商品
        delectGoods(){
            this.$refs.multipleTable.clearSelection();
        },
         //搜索层选中数据
        handleSelectionChange(row) {
            this.selectGoodsData = row;
        },
        //搜索框发送选中数据
        sendData() {
            //如果未选择数据
            if(this.selectGoodsData.length == 0){
                this.$message({
                    showClose: true,
                    message: '请先选择商品',
                    type: 'warning'
                });
            }else {
                this.$emit("goodsData",this.selectGoodsData);
                this.DialogTableGoods = false;
            }
        },

        //显示附件
        showImg(data){
            this.$request({
                method:'post',
                url:"/apis/member/findWareAddressByWId",
                params:{
                    wId:data.wId,
                    sign:data.sign,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.msg){
                    this.DialogImg = true;
                    this.imgPath = response.data.msg;
                }else{
                    this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'wraning'
                    });
                }
            })
            
        }
    },
    created() {
        this.onSearch();
    }
};
</script>

