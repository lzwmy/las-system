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
                        <el-table-column prop="goodId" label="商品ID" align="center" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" align="center" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="规格值" align="center" width="100" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <p v-for="(item,index) in scope.row.specGoodsSpec" :key="index">{{item}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格" align="center" width="100" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <p v-for="(item,index) in scope.row.specName" :key="index"> {{item}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="stockNow" label="原有库存数" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="stockInto" label="出入库数" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="createTime" label="生产日期" align="center" width="140"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="qualityTime" label="保质期(天)" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="shelfLifeTime" label="到期日期" align="center" width="140"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="precautiousLine" label="预警线" align="center" width="140"  :show-overflow-tooltip="true">
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
            <img :src="imgPath" alt="附件" style="max-width:100%;">
        </el-dialog>

        <!-- 选择商品信息 -->
        <el-dialog :title="title" :visible.sync="DialogTableGoods" width="80%" center>
            <el-form label-width="90px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="搜索商品：">
                            <el-input v-model="goodsSearch" @keyup.enter.native="onSearch" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商品ID：">
                            <el-input v-model="goodsID" @keyup.enter.native="onSearch" clearable></el-input>
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
                        @row-click="selectRow"
                        @selection-change="handleSelectionChange"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                        <el-table-column label="选择" type="selection" width="55" align="center" :selectable="selectable">
                        </el-table-column>
                        <el-table-column prop="goodsId" label="商品ID" align="center" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" align="center" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="规格值" align="center" width="100">
                            <template slot-scope="scope">
                                <p v-for="(item,index) in scope.row.specGoodsSpec2" :key="index">{{item}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格" align="center" width="100">
                            <template slot-scope="scope">
                                <p v-for="(item,index) in scope.row.specName2" :key="index"> {{item}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="inventory" label="现有库存数" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="createTime" label="生产日期" align="center" width="140"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="shelfLife" label="保质期(天)" align="center" width="90">
                        </el-table-column>
                        <el-table-column prop="shelfLifeTime" label="到期日期" align="center" width="140"  :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="precautiousLine" label="预警线" align="center" width="140"  :show-overflow-tooltip="true">
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
                        @current-change="onChangePageGoods"  
                        @size-change="handleSizeChangeGoods">
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
import {removeRepeat} from '../../util/util';
export default {
    data() {
        return {
            loadingTable:false, //加载清单
            loadingGoods:false, //商品列表
            searchData: [], //清单数据
            currentWid:"", //当前清单Wid
            currentSign:"", //当前清单sign
            title:"", //table标题
            //分页数据
            pageData:{
                currentPage:1,
                pageSize:10,
                total:0
            },
            DialogTable:false,

            DialogImg:false, //附件对话框
            imgPath:"",  //附件图片
            
            goodsSearch:"",  //商品名称
            goodsID:"",  //商品ID
            wareCode:"",  //仓库代码（搜索商品用）
            selectGoodsData: [],  //选中商品数据 
            receiveGoodsId:[], //已选中商品ID
            receiveGoodsData:[], //已选中商品数据
            DialogTableGoods:false,     //商品信息对话框
            goodsData: [],  //商品数据
            //商品分页数据
            pageDataGoods:{
                currentPage:1,
                pageSize:20,
                total:0,
            },
        };
    },
    methods: {
        //显示清单
        showTable(wId,sign){
            this.currentWid = wId;
            this.currentSign = sign;
            this.$request({
                method:'post',
                url:"/apis/member/findGAByWId",
                params:{
                    wId: wId,
                    sign: sign,
                    currentPage:this.pageData.currentPage,
                    pageSize:this.pageData.pageSize
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.loadingTable = true;
                    this.DialogTable = true;
                    let _searchData = response.data.data.list;
                    let _specName, _specGoodsSpec;
                    for(let i = 0, len = _searchData.length; i < len; i++){
                        //规格和数量
                        _specGoodsSpec = JSON.parse(_searchData[i].goodsSpec);
                        _specName = JSON.parse(_searchData[i].specName);
                        _searchData[i].specGoodsSpec = [];
                        _searchData[i].specName = [];
                        for(let key in _specGoodsSpec){
                            _searchData[i].specGoodsSpec.push(_specGoodsSpec[key]);
                        }
                        for(let key in _specName){
                            _searchData[i].specName.push(_specName[key]);
                        }
                    }
                    this.searchData = _searchData;
                    this.pageData.currentPage = response.data.data.pageNum;
                    this.pageData.total = response.data.data.total;
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
            this.showTable(this.currentWid,this.currentSign);
        },
        //每页条数改变
        handleSizeChange(pageSize) {
            this.pageData.pageSize = pageSize;
            this.showTable(this.currentWid,this.currentSign);
        },
        //改变页数
        onChangePageGoods(currentPage) {
            this.pageDataGoods.currentPage = currentPage;
            this.onSearch();
        },
        //每页条数改变
        handleSizeChangeGoods(pageSize) {
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
                    wareCode:this.wareCode
                }
            })     
            .then(response=>{
                if(response.data.code){
                    let _goodsData = response.data.data.list;
                    let _goodsDatasName = response.data.map.goodsName;
                    let _goodsDatasInventory = response.data.map.inventory;
                    let _goodsDatasPrecautiousLine = response.data.map.precautiousLine;
                    let _goodsDatasCreateTime = response.data.map.createTime;
                    let _specName, _specGoodsSpec;
                    for(let i = 0, len = _goodsData.length; i < len; i++){
                        _goodsData[i].goodsName = _goodsDatasName[i];
                        _goodsData[i].inventory = _goodsDatasInventory[i];
                        _goodsData[i].precautiousLine = _goodsDatasPrecautiousLine[i];
                        _goodsData[i].createTime = _goodsDatasCreateTime[i];

                        //如果有保质期存在时
                        if(_goodsData[i].shelfLife){
                            //生产日期转成时间戳
                            let startTime = _goodsData[i].createTime.substring(0,19).replace(/-/g,'/');
                            startTime = new Date(startTime).getTime();
                            //结束日期：生产日期时间戳 + 保质期时间戳
                            let endTime = (_goodsData[i].shelfLife * 24  * 3600 * 1000 )  + startTime;
                            let time = new Date(endTime);
                            _goodsData[i].shelfLifeTime = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                        }

                        //规格和数量
                        _specGoodsSpec = JSON.parse(_goodsData[i].specGoodsSpec);
                        _specName = JSON.parse(_goodsData[i].specName);
                        _goodsData[i].specGoodsSpec2 = [];
                        _goodsData[i].specName2 = [];
                        for(let key in _specGoodsSpec){
                            _goodsData[i].specGoodsSpec2.push(_specGoodsSpec[key]);
                        }
                        for(let key in _specName){
                            _goodsData[i].specName2.push(_specName[key]);
                        }
                    }
                    this.goodsData = _goodsData;
                    this.pageDataGoods.currentPage = response.data.data.pageNum;
                    this.pageDataGoods.total = response.data.data.total;
                }
                setTimeout(()=>{
                    this.loadingGoods = false;
                },200)
            })
        },
        //显示商品信息弹框
        DialogShowGoods(wareCode,receiveGoodsData){
            this.DialogTableGoods = true;
            this.wareCode = wareCode;
            this.pageDataGoods.currentPage = 1;

            //如果有已存在商品
            if(receiveGoodsData.length != 0){
                //保存已有商品id
                this.receiveGoodsId = receiveGoodsData.map((item)=>{
                    return item.id;
                })
                //保存已有商品
                this.receiveGoodsData = receiveGoodsData;
            }else{
                this.receiveGoodsData = [];
                this.receiveGoodsId = [];
            }
            this.onSearch();
        },
        //商品列表项是否可选(已有商品不可选) 
        selectable(row,index){
            if(this.receiveGoodsId.indexOf(row.id) != -1){
    			return 0;
    		}else{
    			return 1;
    		}
        },
        //点击某行选中
        selectRow(row){
            if(this.receiveGoodsId.indexOf(row.id) != -1){
                return;
            }

            this.$refs.multipleTable.toggleRowSelection(row)
        },
        //搜索层选中数据
        handleSelectionChange(row) {
            // console.log(row)
            // let arr = removeRepeat(this.selectGoodsData.concat(row),'id');
            this.selectGoodsData = row;
            // console.log(this.selectGoodsData)
        },
        //搜索框发送选中数据
        sendData() {
            let data = this.receiveGoodsData.concat(this.selectGoodsData);
            this.$emit("goodsData",data);
            this.DialogTableGoods = false;
        },
        //显示附件
        showImg(data){
            this.$request({
                method:'post',
                url:"/apis/member/findWareAddressByWId",
                params:{
                    wId:data.wId,
                    sign:data.sign
                }
            })     
            .then(response=>{
                if(response.data.code){
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
    }
};
</script>

