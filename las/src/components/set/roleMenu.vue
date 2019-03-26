<template>
    <el-form status-icon :model="form" ref="form" label-width="100px" :rules="rules">
        <el-row>
            <el-col :span="6" :xs="24" :sm="10" :md="6">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model.trim="form.roleName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6" :xs="24" :sm="10" :md="6">
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model.trim="form.roleDesc"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="资源菜单">
            <el-tree
                :default-expand-all="false"
                :data="treeData"
                show-checkbox
                ref="tree"
                node-key="id"
                :props="defaultProps">
            </el-tree>
        </el-form-item>
        <br/>
        <el-form-item label="数据操作权限">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="selectPowerArr">
                <el-checkbox v-for="(item,index) in powerArr" :label="item" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-row>
            <el-col :span="24">
                <el-button @click="onReturn">返 回</el-button>
                <el-button type="primary" @click="onSubmit('form',1)" v-if="!form.id" :loading="submitLoading">添 加</el-button>
                <el-button type="primary" @click="onSubmit('form',2)" v-if="form.id" :loading="submitLoading">修 改</el-button>
            </el-col>
        </el-row>
    </el-form>
</template>


<script>
import Cookies from 'js-cookie';
const powerArrAll = ['会员欠款表审核','会员修改审核','添加、编辑、删除、停用用户','添加、编辑、删除角色','取消新增会员订单','管理会员状态积分','周期管理操作','周期结算操作','仓库添加与删除'];
export default {
    name:"roleMenu",
    data() {
        return {
            selectKey:[],
            isRefresh:false,
            submitLoading:false,
            menuData:[],
            checkAll:false, //全选
            isIndeterminate: true,  //数据权限样控制
            selectPowerArr:[], //选中的数据权限
            powerArr:powerArrAll,  //全部数据权限
            form: {
                id:null,
                roleName: "",
                roleDesc:"",
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
                            children:[
                                {
                                    id: 3,
                                    label: '新增会员',
                                    path:"/addMember",
                                    menuIndex:"1-1",
                                    componentPath:"components/manage/addMember/addMember",
                                },
                                {
                                    id: 4,
                                    label: '新增会员加入单',
                                    path:"/addMemberForm",
                                    menuIndex:"1-1",
                                    componentPath:"components/manage/addMember/addMemberForm"
                                },
                                {
                                    id:5,
                                    label: '新会员订单',
                                    path:"/payment",
                                    menuIndex:"1-1",
                                    componentPath:"components/manage/addMember/payment"	
                                }
                            ]
                        },
                        {
                            id: 6,
                            label: '新增会员列表',
                            path:"/addMemberList",
                            menuIndex:"1-2",
                            componentPath:"components/manage/addMemberList"
                        },
                        {
                            id: 7,
                            label: '会员列表',
                            path:"/memberList",
                            menuIndex:"1-3",
                            componentPath:"components/manage/memberList"
                        },
                        {
                            id: 8,
                            label: '会员详细信息',
                            path:"/mDetailed",
                            menuIndex:"1-3",
                            componentPath:"components/manage/mDetailed"
                        },
                        {
                            id: 9,
                            label: '会员树状图',
                            path:"/tree",
                            menuIndex:"1-4",
                            componentPath:"components/manage/tree"
                        }, 
                        {
                            id: 10,
                            label: '修改会员信息',
                            children: [
                                {
                                    id: 11,
                                    label: '修改基本信息',
                                    path:"/basicInfo",
                                    menuIndex:"1-5-1",
                                    componentPath:"components/manage/change/basicInfo"
                                }, 
                                {
                                    id: 12,
                                    label: '修改敏感信息',
                                    path:"/sensitiveinfo",
                                    menuIndex:"1-5-2",
                                    componentPath:"components/manage/change/sensitiveInfo"
                                }, 
                                {
                                    id: 13,
                                    label: '会员更名',
                                    path:"/reName",
                                    menuIndex:"1-5-3",
                                    componentPath:"components/manage/change/reName"
                                }, 
                                {
                                    id: 14,
                                    label: '更改推荐人',
                                    path:"/changeReferee",
                                    menuIndex:"1-5-4",
                                    componentPath:"components/manage/change/changeReferee"
                                }, 
                                {
                                    id: 15,
                                    label: '更改会员级别',
                                    path:"/changeLevel",
                                    menuIndex:"1-5-5",
                                    componentPath:"components/manage/change/changeLevel"
                                }, 
                                {
                                    id: 16,
                                    label: '与老会员绑定',
                                    path:"/bindingOld",
                                    menuIndex:"1-5-6",
                                    componentPath:"components/manage/change/bindingOld"
                                }, 
                                {
                                    id: 17,
                                    label: '与老会员批量绑定',
                                    path:"/allBindingOld",
                                    menuIndex:"1-5-6",
                                    componentPath:"components/manage/change/allBindingOld"
                                }, 
                                {
                                    id: 18,
                                    label: '修改记录查询',
                                    path:"/queryRecord",
                                    menuIndex:"1-5-7",
                                    componentPath:"components/manage/change/queryRecord"
                                }, 
                                {
                                    id: 19,
                                    label: '审核管理',
                                    path:"/toExamine",
                                    menuIndex:"1-5-8",
                                    componentPath:"components/manage/change/toExamine"
                                }
                            ]
                        },
                        {
                            id: 20,
                            label: '会员状态维护',
                            children:[
                                {
                                        id: 21,
                                        label: '会员状态积分管理',
                                        path:"/mState",
                                        menuIndex:"1-6-1",
                                        componentPath:"components/manage/state/mState"
                                }, 
                                {
                                        id: 22,
                                        label: '会员冻结注销记录',
                                        path:"/mStateRecord",
                                        menuIndex:"1-6-2",
                                        componentPath:"components/manage/state/mStateRecord"
                                }, 
                                {
                                        id: 23,
                                        label: '会员积分冻结记录',
                                        path:"/mIntegralFreezing",
                                        menuIndex:"1-6-3",
                                        componentPath:"components/manage/state/mIntegralFreezing"
                                }
                            ]
                        }                        
                    ]
                }, 
                {
                    id: 24,
                    label: '会员奖励',
                    children: [
                        {
                            id: 25,
                            label: '周期管理',
                            children:[
                                {
                                    id: 26,
                                    label: '周期管理',
                                    path:"/cycleManage",
                                    menuIndex:"2-1-1",
                                    componentPath:"components/reward/cycleManage/cycleManage"
                                },
                                {
                                    id: 27,
                                    label: '周期切换日志',
                                    path:"/cycleChangeLog",
                                    menuIndex:"2-1-2",
                                    componentPath:"components/reward/cycleManage/cycleChangeLog"
                                }
                            ]
                        },
                        {
                            id: 28,
                            label: '周期结算',
                            children:[
                                {
                                    id: 29,
                                    label: '周期结算',
                                    path:"/cycleCount",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/cycleCount"
                                },
                                {
                                    id: 30,
                                    label: '业绩状态检查',
                                    path:"/perStatus",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/perStatus"
                                },
                                {
                                    id: 31,
                                    label: '本期会员业绩表',
                                    path:"/achievement",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/achievement"
                                },
                                {
                                    id: 32,
                                    label: '本期会员资格表',
                                    path:"/qualification",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/qualification"
                                },
                                {
                                    id: 33,
                                    label: '本期会员奖金表',
                                    path:"/bonus",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/bonus"
                                },
                                {
                                    id: 34,
                                    label: '奖金表审核',
                                    path:"/grantToExamine",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/grantToExamine"
                                },
                                {
                                    id: 35,
                                    label: '奖金发放表',
                                    path:"/grant",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/grant"
                                }
                            ]
                        },
                        {
                            id: 36,
                            label: '会员奖金表查询',
                            children:[
                                {
                                    id: 37,
                                    label: '历史奖金表',
                                    path:"/historicalBonus",
                                    menuIndex:"2-3-1",
                                    componentPath:"components/reward/bonus/historicalBonus"
                                },
                                {
                                    id: 38,
                                    label: '奖金发放明细表',
                                    path:"/bonusgGant",
                                    menuIndex:"2-3-2",
                                    componentPath:"components/reward/bonus/bonusgGant"
                                },
                                {
                                    id: 39,
                                    label: '会员奖金明细表',
                                    path:"/memberBonus",
                                    menuIndex:"2-3-3",
                                    componentPath:"components/reward/bonus/memberBonus"
                                },
                                {
                                    id: 40,
                                    label: '推荐列表',
                                    path:"/recommend",
                                    menuIndex:"2-3-4",
                                    componentPath:"components/reward/bonus/recommend"
                                },
                                {
                                    id: 41,
                                    label: '会员欠款表',
                                    path:"/memberArrears",
                                    menuIndex:"2-3-5",
                                    componentPath:"components/reward/bonus/memberArrears"
                                },
                                {
                                    id: 42,
                                    label: '创建欠款单',
                                    path:"/addArrears",
                                    menuIndex:"2-3-5",
                                    componentPath:"components/reward/bonus/addArrears"
                                },
                                {
                                    id: 43,
                                    label: '会员欠款明细表',
                                    path:"/arrearsDetailed",
                                    menuIndex:"2-3-6",
                                    componentPath:"components/reward/bonus/arrearsDetailed"
                                },
                                {
                                    id: 44,
                                    label: '会员欠款单申请审核',
                                    path:"/arrearsToExamine",
                                    menuIndex:"2-3-7",
                                    componentPath:"components/reward/bonus/arrearsToExamine"
                                }
                            ]
                        }
                    ]
                }, 
                {
                    id: 45,
                    label: '会员积分管理',
                    children:[
                        {
                            id: 46,
                            label: '会员积分查询',
                            path:"/IntegralQuery",
                            menuIndex:"3-1",
                            componentPath:"components/Integral/IntegralQuery"
                        },
                        {
                            id: 47,
                            label: '会员规则设置',
                            path:"/IntegralRule",
                            menuIndex:"3-2",
                            componentPath:"components/Integral/IntegralRule"
                        },
                        {
                            id: 48,
                            label: '提现审核',
                            path:"/presentToExamine",
                            menuIndex:"3-3",
                            componentPath:"components/Integral/presentToExamine"
                        },
                        {
                            id: 49,
                            label: '提现记录',
                            path:"/presentRecord",
                            menuIndex:"3-4",
                            componentPath:"components/Integral/presentRecord"
                        }
                    ]
                },
                {
                    id: 50,
                    label: '账务管理',
                    children:[
                        {
                            id: 51,
                            label: '公司账户汇总',
                            path:"/companyAccount",
                            menuIndex:"4-1",
                            componentPath:"components/finance/companyAccount"
                        },
                        {
                            id: 52,
                            label: '会员账户余额汇总',
                            path:"/memberAccount",
                            menuIndex:"4-2",
                            componentPath:"components/finance/memberAccount"
                        }
                    ]
                },
                {
                    id: 53,
                    label: '库存管理',
                    children:[
                        {
                            id: 54,
                            label: '仓库管理',
                            path:"/WHManagement",
                            menuIndex:"5-1",
                            componentPath:"components/wareHouse/WHManagement"
                        },
                        {
                            id: 55,
                            label: '库存对账',
                            children:[
                                {
                                    id: 56,
                                    label: '创建调整单',
                                    path:"/createAdjust",
                                    menuIndex:"5-2-1",
                                    componentPath:"components/wareHouse/adjust/createAdjust"
                                },
                                {
                                    id: 57,
                                    label: '调整单审核',
                                    path:"/adjustToExamine",
                                    menuIndex:"5-2-2",
                                    componentPath:"components/wareHouse/adjust/adjustToExamine"
                                }
                            ]
                        },
                        {
                            id: 58,
                            label: '库存对账',
                            children:[
                                {
                                    id: 59,
                                    label: '创建调拨单',
                                    path:"/createAllocation",
                                    menuIndex:"5-3-1",
                                    componentPath:"components/wareHouse/allocation/createAllocation"
                                },
                                {
                                    id: 60,
                                    label: '调拨单审核',
                                    path:"/allocationToxamine",
                                    menuIndex:"5-3-2",
                                    componentPath:"components/wareHouse/allocation/allocationToxamine"
                                }
                            ]
                        },
                        {
                            id: 61,
                            label: '进货单审核',
                            path:"/stockToExamine",
                            menuIndex:"5-4",
                            componentPath:"components/wareHouse/stockToExamine"
                        },
                        {
                            id: 62,
                            label: '入库报表',
                            path:"/stockForm",
                            menuIndex:"5-5",
                            componentPath:"components/wareHouse/stockForm"
                        },
                        {
                            id: 63,
                            label: '出库报表',
                            path:"/outForm",
                            menuIndex:"5-6",
                            componentPath:"components/wareHouse/outForm"
                        },
                        {
                            id: 64,
                            label: '预警管理',
                            children:[
                                {
                                    id: 65,
                                    label: '库存预警',
                                    path:"/WHwarning",
                                    menuIndex:"5-7-1",
                                    componentPath:"components/wareHouse/warning/WHwarning"
                                },
                                {
                                    id: 66,
                                    label: '保质期预警',
                                    path:"/QGPwarning",
                                    menuIndex:"5-7-2",
                                    componentPath:"components/wareHouse/warning/QGPwarning"
                                }
                            ]
                        },
                        {
                            id: 67,
                            label: '进销存日报表',
                            path:"/dailyReport",
                            menuIndex:"5-8",
                            componentPath:"components/wareHouse/dailyReport"
                        },
                        {
                            id: 68,
                            label: '进销存月报表',
                            path:"/monthlyReport",
                            menuIndex:"5-9",
                            componentPath:"components/wareHouse/monthlyReport"
                        }
                    ]
                },
                {
                    id: 69,
                    label: '系统设置',
                    children:[
                        {
                            id: 70,
                            label: '管理员列表',
                            path:"/managers",
                            menuIndex:"6-1",
                            componentPath:"components/set/managers"
                        },
                        {
                            id: 71,
                            label: '角色权限管理',
                            path:"/roleList",
                            menuIndex:"6-2",
                            componentPath:"components/set/roleList"
                        },
                        {
                            id: 72,
                            label: '角色权限操作',
                            path:"/roleMenu",
                            menuIndex:"6-2",
                            componentPath:"components/set/roleMenu"
                        },
                        {
                            id: 73,
                            label: '消息通知',
                            path:"/message",
                            menuIndex:"6-3",
                            componentPath:"components/set/message"
                        },
                        {
                            id: 74,
                            label: '个人资料',
                            path:"/info",
                            menuIndex:"6-4",
                            componentPath:"components/set/info"
                        },
                        {
                            id: 75,
                            label: '修改密码',
                            path:"/changePAW",
                            menuIndex:"6-5",
                            componentPath:"components/set/changePAW"
                        }
                    ]
                }
            ],
            //表单验证规则
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称',  trigger: ['blur','change']}
                ],
                roleDesc: [
                    { required: true, message: '请输入角色描述',  trigger: ['blur','change']}
                ]
            }
        };
    },
    watch:{
        selectKey(){
            this.$refs.tree.setCheckedKeys(this.selectKey);
        }
    },
    methods: {
        //数据权限全选 
        handleCheckAllChange(val) {
            this.selectPowerArr = val ? powerArrAll : [];
            this.isIndeterminate = false;
        },
        //保存
        onSubmit(form,val){
            this.$refs[form].validate((valid) => {
                if(valid) {
                    //1添加操作，2修改操作
                    let apiPath = val===1?"/apis/member/addRole":"/apis/member/updateRole";
                   
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
                    let params = {
                        roleName:this.form.roleName,
                        roleDesc:this.form.roleDesc,
                        map:JSON.stringify(sendData),
                        mapPower:JSON.stringify(this.selectPowerArr)
                    }
                    if(val===2){
                        params.roleId = this.form.id;
                    }
                    
                    setTimeout(()=>{
                        this.$request({
                            method:'post',
                            url:apiPath,
                            data:params
                        })
                        .then(response=>{
                            if(response.data.code){
                                this.$message({
                                    showClose: true,
                                    message: (val===1?'添加':'修改')+"成功!",
                                    type: 'success'
                                });
                                if(this.isRefresh){
                                    window.location.reload();
                                    this.$router.push('/roleList');
                                }
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: val===1?'添加':'修改'+"失败!"+response.data.msg,
                                    type: 'error'
                                });
                            }
                            this.submitLoading = false;
                        })
                    },300)
                }else{
                    this.$message({
                        showClose: true,
                        message: '请输入正确信息!',
                        type: 'error'
                    });
                    return false;
                }
            })
        },
        onReturn(){
            this.$router.push('/roleList');
        },
        onSearch(){
            this.$request({
                method:'get',
                url:"/apis/member/findRoleAndAclsInfo",
                params: {
                    id:this.form.id,
                    date:new Date().getTime()
                }
            })
            .then(response=>{
                let info = response.data.data.roleAcls;
                let newArr = [];
                for(let i = 0; i < info.length; i++){
                    newArr.push(info[i].idCode);
                }
                //初始化选中tree项
                this.selectKey = newArr;
            })
        }
    },
    created() {
        //上个页面传过来的用户信息,对象不为空
        if(Object.keys(this.$route.params).length!=0){
            let info = this.$route.params.data;
            this.form = {
                id: info.id,
                roleName: info.roleName,
                roleDesc: info.roleDesc,
            } 
            this.selectPowerArr = JSON.parse(info.power)
            //查询该角色权限，初始化选中tree项
            this.onSearch();
            //如果修改已登录的自身角色权限路由，需要页面刷新，更新路由
            if(this.form.roleName == this.$store.state.infoData.roleName){
                this.isRefresh = true;
            }

        }
    }
};
</script>

