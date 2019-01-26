<template>
    <el-form :model="form" label-width="90px">
        <el-row>
            <el-col :span="6" :xs="24" :sm="10" :md="6">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="10" :md="6">
                <el-form-item label="角色描述">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="24">
                <el-form-item label="资源菜单">
                    <el-tree
                        :default-expand-all="true"
                        :data="treeData"
                        show-checkbox
                        ref="tree"
                        node-key="id"
                        :props="defaultProps"
                        @check-change="getCurrentKey">
                    </el-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button @click="onRest">重 置</el-button>
                <el-button type="primary" @click="onSubmit" :loading="submitLoading">保 存</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
export default {
    name:"mStateRecord",
    data() {
        return {
            submitLoading:false,
            menuData:[],
            form: {
                name: "",
                desc:""
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treeData: [
                {
                    id: 1,
                    label: '会员管理',
                    children: [
                        {
                            id: 2,
                            label: '新增会员',
                            path:"/addMember",
                            component:"components/manage/addMember/addMember",
                            children:[
                                {
                                    id: 3,
                                    label: '新增会员加入单',
                                    path:"/addMemberForm",
                                    component:"components",
                                    children:[
                                        {
                                            id:44,
                                            label: '新会员订单',
                                            name:"payment",
                                            component:"Payment"	
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            id: 3,
                            label: '新增会员列表',
                            path:"/addMember",
                            component:"components"
                        },
                        {
                            id: 4,
                            label: '会员列表',
                            path:"/addMember",
                            component:"components"
                        },
                        {
                            id: 5,
                            label: '会员树状图',
                            path:"/addMember",
                            component:"components"
                        }, 
                        {
                            id: 6,
                            label: '修改会员信息',
                            children: [
                                {
                                    id: 7,
                                    label: '修改基本信息',
                                    path:"/addMember",
                                    component:"components"
                                }, 
                                {
                                    id: 8,
                                    label: '修改敏感信息',
                                    path:"/addMember",
                                    component:"components"
                                }, 
                                {
                                    id: 8,
                                    label: '会员更名',
                                    path:"/reName",
                                    component:"reName"
                                }, 
                                {
                                    id: 8,
                                    label: '更改推荐人',
                                    path:"/changeReferee",
                                    component:"changeReferee"
                                }, 
                                {
                                    id: 8,
                                    label: '更改会员级别',
                                    path:"/changeLevel",
                                    component:"changeLevel"
                                }, 
                                {
                                    id: 8,
                                    label: '与老会员绑定',
                                    path:"/bindingOld",
                                    component:"bindingOld"
                                }, 
                                {
                                    id: 8,
                                    label: '与老会员批量绑定',
                                    path:"/allBindingOld",
                                    component:"allBindingOld"
                                }, 
                                {
                                    id: 8,
                                    label: '修改记录查询',
                                    path:"/queryRecord",
                                    component:"queryRecord"
                                }, 
                                {
                                    id: 8,
                                    label: '审核管理',
                                    path:"/toExamine",
                                    component:"toExamine"
                                }
                            ]
                        },
                        {
                            id: 5,
                            label: '会员状态维护',
                            children:[
                                {
                                        id: 5,
                                        label: '会员状态',
                                        path:"/mState",
                                        component:"mState"
                                }, 
                                {
                                        id: 5,
                                        label: '会员冻结注销记录',
                                        path:"/mStateRecord",
                                        component:"mStateRecord"
                                }, 
                                {
                                        id: 5,
                                        label: '会员积分冻结记录',
                                        path:"/mIntegralFreezing",
                                        component:"mIntegralFreezing"
                                }
                            ]
                        }                        
                    ]
                }, 
                {
                    id: 9,
                    label: '会员奖励',
                    children: [
                        {
                            id: 4,
                            label: '周期管理',
                            children:[
                                {
                                    id: 4,
                                    label: '周期管理',
                                    path:"/cycleManage",
                                    component:"cycleManage"
                                },
                                {
                                    id: 4,
                                    label: '周期切换日志',
                                    path:"/cycleChangeLog",
                                    component:"cycleChangeLog"
                                }
                            ]
                        },
                        {
                            id: 4,
                            label: '周期结算',
                            children:[
                                {
                                    id: 4,
                                    label: '本期会员资格表',
                                    path:"/qualification",
                                    component:"qualification"
                                },
                                {
                                    id: 4,
                                    label: '业绩状态检查',
                                    path:"/perStatus",
                                    component:"perStatus"
                                },
                                {
                                    id: 4,
                                    label: '业绩状态检查',
                                    path:"/perStatus",
                                    component:"perStatus"
                                },
                                {
                                    id: 4,
                                    label: '业绩状态检查',
                                    path:"/perStatus",
                                    component:"perStatus"
                                }
                            ]
                        }
                        
                    ]
                }, 
            ]
        };
    },
    mounted(){
        //设置默认选中tree项
        this.$refs.tree.setCheckedKeys([1,2,3,4,5,6,7,20]);
    },
    methods: {
        //点击查询表
        onSearch() {
            
        },
        //保存
        onSubmit(){
            this.submitLoading = true;
            let keyArr = this.$refs.tree.getCheckedKeys();  //tree所有选中项的key值
            let newArr = [];  //保存菜单项所有子菜单
            let sendData = [];  //发送给后台菜单

            //查询所有子菜单项
            let flat = function (arr){
                for (let i = 0; i < arr.length; i++) {
                    if(arr[i].hasOwnProperty("children")){
                        flat(arr[i].children);
                    }else if(arr[i].path){
                        newArr.push(arr[i]);
                    }
                }
            }
            flat(this.treeData);

            //找出所有子菜单项里被选中的项
            for (let m = 0; m < newArr.length; m++) {
                for (let n = 0; n < keyArr.length; n++) {
                    if(keyArr[n]==newArr[m].id){
                        sendData.push(newArr[m]);
                    }
                }
            }
            
        
            setTimeout(()=>{
                console.log(sendData)
                this.submitLoading = false;
            },1000)
        },
        onRest(){

        }
    },
    created() {
        // this.onSearch();
        
    }
};
</script>

