<template>
    <el-form  label-width="90px"  ref="form" :model="form"  :rules="rules">
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="6" :xl="6">
                <el-form-item label="转出仓库" prop="wareNameFrom" class="search">
                    <el-input v-model="form.wareNameFrom" class="serch-input" disabled></el-input>
                    <i class="el-icon-search" @click="DialogShow(1)"></i>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="6" :xl="6">
                <el-form-item label="转入仓库" prop="wareNameTo" class="search">
                    <el-input v-model="form.wareNameTo" class="serch-input" disabled></el-input>
                    <i class="el-icon-search" @click="DialogShow(2)"></i>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-form-item label="上传附件" prop="file">
                    <el-upload 
                        action="/apis/member/uploadFile"
                        list-type="picture"
                        accept=".jpg, .png, .bmp"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        v-model="form.file"
                        :limit=1
                        :before-upload="beforeUpload">
                        <div slot="tip" class="el-upload__tip">只能上传一张格式为png/JPG/bmp文件</div>
                        <el-input><el-button slot="append" icon="el-icon-upload2"></el-button></el-input>
                    </el-upload>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="24" :md="10" :lg="6" :xl="6">
                <el-form-item label="备注" prop="desc">
                    <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24">
                <el-form-item label="商品信息">
                    <el-button type="primary" @click="DialogShowGoods" icon="el-icon-plus">增 加</el-button>
                    <el-button  icon="el-icon-refresh" @click="upload">刷 新</el-button>
                    <el-button type="danger" @click="deleteGoods" icon="el-icon-delete" :disabled="searchData.length==0">删 除</el-button>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table 
                    :data="searchData" 
                    @selection-change="handleSelectionChange"
                    v-loading="loadingTable" 
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
                    <el-table-column type="selection" align="center" width="50px">
                    </el-table-column>
                    <el-table-column type="index" prop="" label="序号" align="center">
                    </el-table-column>
                    <el-table-column prop="id" label="商品ID" align="center">
                    </el-table-column>
                    <el-table-column prop="gcName" label="商品名称" align="center">
                    </el-table-column>
                    <el-table-column prop="specName" label="规格" min-width="140">
                    </el-table-column>
                    <el-table-column prop="goodsAttr" label="sku" align="center">
                    </el-table-column>
                    <el-table-column prop="stock" label="现有库存数量" align="center">
                    </el-table-column>
                    <el-table-column label="出入库数量" align="center">
                        <template slot-scope="scope">
                            <el-input type="text" v-model="scope.row.stockInto"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="生产日期" align="center" min-width="100">
                        <template slot-scope="scope">
                            <el-date-picker 
                                v-model="scope.row.createTime" 
                                type="date" 
                                value-format="yyyy-MM-dd"
                                placeholder="请选择日期"
                                class="cell-date">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column prop="day" label="保质期(天)" align="center">
                    </el-table-column>
                    <el-table-column label="到期日期" align="center" min-width="100">
                        <template slot-scope="scope">
                            <el-date-picker 
                                v-model="scope.row.shelfLifeTime" 
                                type="date" 
                                value-format="yyyy-MM-dd"
                                placeholder="请选择日期"
                                class="cell-date">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <br/>
        <el-row>
            <el-col :span="24" align="center">
                <el-button type="primary" @click="createForm('form')" :disabled="searchData.length==0">创 建</el-button>
            </el-col>
        </el-row>

        <!-- 仓库对话框 -->
        <el-dialog :visible.sync="DialogTable" width="90%" center>
            <el-form label-width="70px" label-position="left">
                <el-row type="flex" justify="center">
                    <el-col :span="5">
                        <el-form-item label="仓库搜索">
                            <el-input v-model="WHCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" @click="onSearchWH" icon="el-icon-search">搜 索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-table 
                ref="multipleTable" 
                :data="tableData" 
                tooltip-effect="dark" 
                border
                @row-dblclick="rowDblclick"
                v-loading="loadingWH" 
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
                <el-table-column label="选择" type="" width="55" align="center">
                    <template slot-scope="scope">
                        <el-radio class="radio" v-model="selectNum" :disabled="scope.row.wareName==disabledSelect" :label="scope.$index" @change.native="getCurrentRow(scope.$index)">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="wareCode" label="仓库代码" align="center">
                </el-table-column>
                <el-table-column prop="wareName" label="仓库名称" align="center">
                </el-table-column>
                <el-table-column prop="place" label="仓库地点" align="center">
                </el-table-column>
                <el-table-column prop="createBy" label="创建人" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column prop="updateTime" label="最后修改时间" align="center">
                </el-table-column>
                <el-table-column prop="wareDesc" label="备注" align="center">
                </el-table-column>
            </el-table>
            <br>
            <el-row type="flex" justify="center">
                <el-col :span="8" align="center">
                    <el-pagination
                        :page-size="WHpageData.pageSize"
                        layout="total, sizes, prev, pager, next"
                        :page-sizes="[10,20,50,999]"
                        :total="WHpageData.total"
                        :current-page="WHpageData.currentPage"
                        @current-change="onWHChangePage"
                        @size-change="WHhandleSizeChange">
                    </el-pagination>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="DialogTable = false">取 消</el-button>
                <el-button type="primary" @click="onSend">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 弹出层组件 -->
        <tableCom ref="dialog" @goodsData="getGoodsData"></tableCom>

    </el-form>
</template>


<script>
import tableCom from '../dialogCom';
export default {
    data() {
        return {
            form:{
                wareNameFrom:"",
                wareNameTo:"",
                file:[], //附件
                desc:""
            },
            getWHType:null, //选择仓库类型
            disabledSelect:false, //禁止选择仓库
            loadingTable:false, //加载列表
            searchData: [], //商品列表数据
            deleteGoodsData:[] , //删除商品数据 

            loadingWH:false, //加载仓库列表
            DialogTable:false, //仓库对话框
            WHCode:"",    //仓库代码搜索
            tableData: [],  //仓库数据
            selectNum:null,
            //仓库分页数据
            WHpageData:{
                currentPage:1,
                pageSize:10,
                total:null,
            },
            //表单验证规则
            rules: {
                wareNameFrom: [
                    { required: true, message: "请选择入库地点", trigger: ['blur','change'] },
                ],
                wareNameTo: [
                    { required: true, message: "请选择入库地点", trigger: ['blur','change'] },
                ],
                file: [
                    { required: true, message: "请选择附件", trigger: ['blur','change'] },
                ],
                desc: [
                    { required: true, message: "请输入备注", trigger: ['blur','change'] },
                ],
            }
        };
    },
    components:{
        tableCom
    },
    methods: {
        //改变仓库页数
        onWHChangePage(currentPage) {
            this.WHpageData.currentPage = currentPage;
            this.onSearchWH();
        },
        //仓库每页条数改变
        WHhandleSizeChange(pageSize) {
            this.WHpageData.pageSize = pageSize;
            this.onSearchWH();
        },
        //仓库搜索弹框
        DialogShow(val){
            this.DialogTable = true;
            this.selectNum = null;
            this.getWHType = val;
            if(val==1){
                this.disabledSelect = "";
            }else if(val==2){
                this.disabledSelect = this.form.wareNameFrom;
            }
            this.onSearchWH();
        },
        //仓库搜索
        onSearchWH() {
            this.tableData = [];
            this.loadingWH = true;  
            this.$request({
                method:'post',
                url:"/apis/member/findWare",
                params:{
                    wareCode:this.WHCode,
                    currentPage:this.WHpageData.currentPage,
                    pageSize:this.WHpageData.pageSize,
                    date:new Date().getTime()
                }
            })     
            .then(response=>{
                if(response.data.code){
                    this.tableData = response.data.data.list;
                    for(let i in this.tableData){
                        this.tableData[i].place = this.tableData[i].provinceCode+"-"+this.tableData[i].cityCode+"-"+this.tableData[i].countryCode+"-"+this.tableData[i].wareDetial;
                    }
                    this.WHpageData.currentPage = response.data.data.pageNum,
                    this.WHpageData.pageSize = response.data.data.pageSize,
                    this.WHpageData.total = response.data.data.total
                }
                setTimeout(()=>{
                    this.loadingWH = false;
                },200)
            })
        },
        //双击仓库某行
        rowDblclick(row){
            if(row.wareName==this.disabledSelect){
                return;
            }
            if(this.getWHType==1){
                this.form.wareNameFrom = row.wareName;
            }else if(this.getWHType==2){
                this.form.wareNameTo = row.wareName;
            }
            this.DialogTable = false;
        },
        //搜索层选中数据,返回选中行下标
        getCurrentRow(val) {
            this.selectNum = val;
        },
        //选中数据 
        onSend(){
            //如果未选择数据
            if(this.selectNum==null){
                this.$message({
                    showClose: true,
                    message: '请先选择仓库',
                    type: 'error'
                });
            }else {
                if(this.getWHType==1){
                    this.form.wareNameFrom = this.tableData[this.selectNum].wareName;
                }else if(this.getWHType==2){
                    this.form.wareNameTo = this.tableData[this.selectNum].wareName;
                }
                this.DialogTable = false;
            }
        },
        //图片上传成功
        uploadSuccess(response) {
            if(response.code){
                this.form.file = response.data;
            }
        },
        //图片上传失败
        uploadError() {
            this.$message({
                showClose: true,
                message: '服务器未响应,上传失败',
                type: 'error'
            });
        },
        //上传文件之前验证类型和大小
        beforeUpload(file) {
            const fileType = file.type=="image/jpeg"||file.type=="image/png"||file.type=="image/bmp";
            if(!fileType){
                this.$message({
                    showClose: true,
                    message: '只能上传png/JPG/bmp文件',
                    type: 'error'
                });
            }
            return fileType;
        },
        //显示商品信息弹框
        DialogShowGoods(){
            this.$refs.dialog.DialogShowGoods(); 
        },
        //接收商品
        getGoodsData(data){
            this.searchData = data;
            //出入库数量默认为1
            for(let i = 0; i < this.searchData.length; i++){
                this.searchData[i].stockInto = 1;
            }
        },
        //选中删除商品
        handleSelectionChange(row) {
            this.deleteGoodsData = row;
        },
        //刷新
        upload(){
            this.loadingTable = true;
            setTimeout(()=>{
                this.loadingTable = false;
            },800)
        },
        //删除商品
        deleteGoods(){
            if(this.deleteGoodsData.length!=0){
                this.loadingTable = true;
                let deletedata = this.deleteGoodsData;
                let goodsdata = this.searchData;
                let arr = [];
                //选中商品id
                for(let i in deletedata){
                    arr.push(deletedata[i].id);
                }
    
                for(let i in arr){
                    for(let j in goodsdata){
                        if(arr[i]==goodsdata[j].id){
                            goodsdata.splice(j,1);
                        }
                    }
                }
                setTimeout(()=>{
                    this.$message({
                        showClose: true,
                        message: '删除成功!',
                        type: 'success'
                    });
                    this.$refs.dialog.delectGoods();
                    this.loadingTable = false;
                },500)
            }else{
                this.$message({
                    showClose: true,
                    message: '请先选择删除的商品!',
                    type: 'wraning'
                });
            }
        },
        //创建调整单
        createForm(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let success = true;
                    new Promise((resolve,reject)=>{
                        this.$request({
                            method:'post',
                            url:"/apis/member/addAllocation",
                            params:{
                                wareNameIn:this.form.wareNameFrom,
                                wareNameOut:this.form.wareNameTo,
                                attachAdd:this.form.file,
                                autohrizeDesc:this.form.desc
                            }
                        })     
                        .then(response=>{
                            resolve(response.data.msg);
                        });
                    })
                    .then((wid)=>{
                        new Promise((resolve,reject)=>{
                            for(let i = 0; i < this.tableData.length; i++){
                                this.$request({
                                    method:'post',
                                    url:"/apis/member/addGA",
                                    params:{
                                        wId:parseInt(wid),
                                        sign:2,
                                        goodId:parseInt(this.searchData[i].id),
                                        goodsName:this.searchData[i].gcName,
                                        goodsAttr:this.searchData[i].goodsAttr,
                                        goodsSpec:this.searchData[i].specName,
                                        stockNow:parseInt(this.searchData[i].stock),
                                        stockInto:parseInt(this.searchData[i].stockInto),
                                        createTime:this.searchData[i].createTime,
                                        qualityTime:parseInt(this.searchData[i].day),
                                        shelfLifeTime:this.searchData[i].shelfLifeTime
                                    }
                                })     
                                .then(response=>{
                                    if(!response.data.code){
                                        success = false;
                                    }
                                })
                            }
                            resolve(success);
                        })
                        .then((result)=>{
                            if(result){
                                this.$message({
                                    showClose: true,
                                    message: '调拨单创建成功!',
                                    type: 'success'
                                });
                                setTimeout(()=>{
                                    this.onreset();
                                },800)
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: '调拨单创建失败!',
                                    type: 'error'
                                });
                            }
                        })
                    })                                                           
                }else{
                    this.$message({
                        showClose: true,
                        message: '请输入必填信息!',
                        type: 'error'
                    });
                    return false;
                }
            })
        },
        //出初化数据 
        onreset(){
            this.searchData = [];
            this.tableData = [];
            this.form = {
                wareNameFrom:"",
                wareNameTo:"",
                file:[], //附件
                desc:""
            }
        }
    }
};
</script>

<style>
.serch-input .el-form-item__content{
    position: relative;
}
.search .el-icon-search{
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 18px;
    color: #666;
    cursor: pointer;
}
.cell-date .el-input__prefix{
    top:-6px;
}

</style>



