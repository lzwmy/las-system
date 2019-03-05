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
                        :default-expand-all="false"
                        :data="treeData"
                        show-checkbox
                        ref="tree"
                        node-key="id"
                        :props="defaultProps">
                    </el-tree>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button @click="onReturn">返 回</el-button>
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
            selectKey:[],
            submitLoading:false,
            menuData:[],
            form: {
                name: "超级管理员",
                desc:"超级管理员，拥有全部权限"
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
                                    componentPath:"components/manage/addMember/components"
                                },
                                {
                                    id:5,
                                    label: '新会员订单',
                                    name:"payment",
                                    menuIndex:"1-1",
                                    componentPath:"components/manage/addMember/Payment"	
                                }
                            ]
                        },
                        {
                            id: 4,
                            label: '新增会员列表',
                            path:"/addMemberList",
                            menuIndex:"1-2",
                            componentPath:"components/manage/addMemberList"
                        },
                        {
                            id: 5,
                            label: '会员列表',
                            path:"/memberList",
                            menuIndex:"1-3",
                            componentPath:"components/manage/memberList"
                        },
                        {
                            id: 6,
                            label: '会员树状图',
                            path:"/tree",
                            menuIndex:"1-4",
                            componentPath:"components/manage/tree"
                        }, 
                        {
                            id: 7,
                            label: '修改会员信息',
                            children: [
                                {
                                    id: 8,
                                    label: '修改基本信息',
                                    path:"/basicInfo",
                                    menuIndex:"1-5-1",
                                    componentPath:"components/manage/change/basicInfo"
                                }, 
                                {
                                    id: 9,
                                    label: '修改敏感信息',
                                    path:"/sensitiveinfo",
                                    menuIndex:"1-5-2",
                                    componentPath:"components/manage/change/sensitiveinfo"
                                }, 
                                {
                                    id: 10,
                                    label: '会员更名',
                                    path:"/reName",
                                    menuIndex:"1-5-3",
                                    componentPath:"components/manage/change/reName"
                                }, 
                                {
                                    id: 11,
                                    label: '更改推荐人',
                                    path:"/changeReferee",
                                    menuIndex:"1-5-4",
                                    componentPath:"components/manage/change/changeReferee"
                                }, 
                                {
                                    id: 12,
                                    label: '更改会员级别',
                                    path:"/changeLevel",
                                    menuIndex:"1-5-5",
                                    componentPath:"components/manage/change/changeLevel"
                                }, 
                                {
                                    id: 13,
                                    label: '与老会员绑定',
                                    path:"/bindingOld",
                                    menuIndex:"1-5-6",
                                    componentPath:"components/manage/change/bindingOld"
                                }, 
                                {
                                    id: 14,
                                    label: '与老会员批量绑定',
                                    path:"/allBindingOld",
                                    menuIndex:"1-5-6",
                                    componentPath:"components/manage/change/allBindingOld"
                                }, 
                                {
                                    id: 15,
                                    label: '修改记录查询',
                                    path:"/queryRecord",
                                    menuIndex:"1-5-7",
                                    componentPath:"components/manage/change/queryRecord"
                                }, 
                                {
                                    id: 16,
                                    label: '审核管理',
                                    path:"/toExamine",
                                    menuIndex:"1-5-8",
                                    componentPath:"components/manage/change/toExamine"
                                }
                            ]
                        },
                        {
                            id: 17,
                            label: '会员状态维护',
                            children:[
                                {
                                        id: 18,
                                        label: '会员状态积分管理',
                                        path:"/mState",
                                        menuIndex:"1-6-1",
                                        componentPath:"components/manage/state/mState"
                                }, 
                                {
                                        id: 19,
                                        label: '会员冻结注销记录',
                                        path:"/mStateRecord",
                                        menuIndex:"1-6-2",
                                        componentPath:"components/manage/state/mStateRecord"
                                }, 
                                {
                                        id: 20,
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
                    id: 21,
                    label: '会员奖励',
                    children: [
                        {
                            id: 22,
                            label: '周期管理',
                            children:[
                                {
                                    id: 23,
                                    label: '周期管理',
                                    path:"/cycleManage",
                                    menuIndex:"2-1-1",
                                    componentPath:"components/reward/cycleManage/cycleManage"
                                },
                                {
                                    id: 24,
                                    label: '周期切换日志',
                                    path:"/cycleChangeLog",
                                    menuIndex:"2-1-2",
                                    componentPath:"components/reward/cycleManage/cycleChangeLog"
                                }
                            ]
                        },
                        {
                            id: 25,
                            label: '周期结算',
                            children:[
                                {
                                    id: 26,
                                    label: '本期会员资格表',
                                    path:"/qualification",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/qualification"
                                },
                                {
                                    id: 27,
                                    label: '业绩状态检查',
                                    path:"/perStatus",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/perStatus"
                                },
                                {
                                    id: 28,
                                    label: '本期会员业绩表',
                                    path:"/achievement",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/achievement"
                                },
                                {
                                    id: 29,
                                    label: '本期会员奖金表',
                                    path:"/bonus",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/bonus"
                                },
                                {
                                    id: 30,
                                    label: '奖金发放表审核',
                                    path:"/grantToExamine",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/grantToExamine"
                                },
                                {
                                    id: 31,
                                    label: '奖金表审核',
                                    path:"/toExamineC",
                                    menuIndex:"2-2-1",
                                    componentPath:"components/reward/cycleCount/toExamineC"
                                }
                            ]
                        },
                        {
                            id: 32,
                            label: '会员奖金表查询',
                            children:[
                                {
                                    id: 33,
                                    label: '历史奖金表',
                                    path:"/historicalBonus",
                                    menuIndex:"2-3-",
                                    componentPath:"components/reward/bonus/historicalBonus"
                                },
                                {
                                    id: 34,
                                    label: '奖金发放明细表',
                                    path:"/bonusgGant",
                                    menuIndex:"2-3-1",
                                    componentPath:"components/reward/bonus/bonusgGant"
                                },
                                {
                                    id: 35,
                                    label: '会员奖金明细表',
                                    path:"/memberBonus",
                                    menuIndex:"2-3-2",
                                    componentPath:"components/reward/bonus/memberBonus"
                                },
                                {
                                    id: 36,
                                    label: '推荐列表',
                                    path:"/recommend",
                                    menuIndex:"2-3-3",
                                    componentPath:"components/reward/bonus/recommend"
                                },
                                {
                                    id: 37,
                                    label: '会员欠款表',
                                    path:"/addArrears",
                                    menuIndex:"2-3-4",
                                    componentPath:"components/reward/bonus/addArrears"
                                },
                                {
                                    id: 38,
                                    label: '创建欠款单',
                                    path:"/addArrears",
                                    menuIndex:"2-3-5",
                                    componentPath:"components/reward/bonus/addArrears"
                                },
                                {
                                    id: 39,
                                    label: '会员欠款明细表',
                                    path:"/arrearsDetailed",
                                    menuIndex:"2-3-6",
                                    componentPath:"components/reward/bonus/arrearsDetailed"
                                },
                                {
                                    id: 40,
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
                    id: 41,
                    label: '会员积分管理',
                    children:[
                        {
                            id: 42,
                            label: '会员积分查询',
                            path:"/IntegralQuery",
                            menuIndex:"3-1",
                            componentPath:"components/Integral/IntegralQuery"
                        },
                        {
                            id: 43,
                            label: '会员规则设置',
                            path:"/IntegralRule",
                            menuIndex:"3-2",
                            componentPath:"components/Integral/IntegralRule"
                        },
                        {
                            id: 44,
                            label: '提现审核',
                            path:"/presentToExamine",
                            menuIndex:"3-3",
                            componentPath:"components/Integral/presentToExamine"
                        },
                        {
                            id: 45,
                            label: '提现记录',
                            path:"/presentRecord",
                            menuIndex:"3-4",
                            componentPath:"components/Integral/presentRecord"
                        }
                    ]
                },
                {
                    id: 46,
                    label: '账务管理',
                    children:[
                        {
                            id: 47,
                            label: '公司账户汇总',
                            path:"/companyAccount",
                            menuIndex:"4-1",
                            componentPath:"components/finance/companyAccount"
                        },
                        {
                            id: 48,
                            label: '会员账户余额汇总',
                            path:"/memberAccount",
                            menuIndex:"4-2",
                            componentPath:"components/finance/memberAccount"
                        }
                    ]
                },
                {
                    id: 49,
                    label: '库存管理',
                    children:[
                        {
                            id: 50,
                            label: '仓库管理',
                            path:"/WHManagement",
                            menuIndex:"5-1",
                            componentPath:"components/wareHouse/WHManagement"
                        },
                        {
                            id: 51,
                            label: '库存对账',
                            children:[
                                {
                                    id: 52,
                                    label: '创建调整单',
                                    path:"/createAdjust",
                                    menuIndex:"5-2-1",
                                    componentPath:"components/wareHouse/adjust/createAdjust"
                                },
                                {
                                    id: 53,
                                    label: '调整单审核',
                                    path:"/adjustToExamine",
                                    menuIndex:"5-2-2",
                                    componentPath:"components/wareHouse/adjust/adjustToExamine"
                                }
                            ]
                        },
                        {
                            id: 54,
                            label: '库存对账',
                            children:[
                                {
                                    id: 56,
                                    label: '创建调拨单',
                                    path:"/createAllocation",
                                    menuIndex:"5-3-1",
                                    componentPath:"components/wareHouse/allocation/createAllocation"
                                },
                                {
                                    id: 57,
                                    label: '调拨单审核',
                                    path:"/allocationToxamine",
                                    menuIndex:"5-3-2",
                                    componentPath:"components/wareHouse/allocation/allocationToxamine"
                                }
                            ]
                        },
                        {
                            id: 58,
                            label: '进货单审核',
                            path:"/stockToExamine",
                            menuIndex:"5-4",
                            componentPath:"components/wareHouse/stockToExamine"
                        },
                        {
                            id: 59,
                            label: '入库报表',
                            path:"/stockForm",
                            menuIndex:"5-5",
                            componentPath:"components/wareHouse/stockForm"
                        },
                        {
                            id: 60,
                            label: '出库报表',
                            path:"/outForm",
                            menuIndex:"5-6",
                            componentPath:"components/wareHouse/outForm"
                        },
                        {
                            id: 61,
                            label: '预警管理',
                            children:[
                                {
                                    id: 62,
                                    label: '库存预警',
                                    path:"/WHwarning",
                                    menuIndex:"5-7-1",
                                    componentPath:"components/wareHouse/warning/WHwarning"
                                },
                                {
                                    id: 63,
                                    label: '保质期预警',
                                    path:"/QGPwarning",
                                    menuIndex:"5-7-2",
                                    componentPath:"components/wareHouse/warning/QGPwarning"
                                }
                            ]
                        },
                        {
                            id: 64,
                            label: '进销存日报表',
                            path:"/dailyReport",
                            menuIndex:"5-8",
                            componentPath:"components/wareHouse/dailyReport"
                        },
                        {
                            id: 65,
                            label: '进销存月报表',
                            path:"/monthlyReport",
                            menuIndex:"5-9",
                            componentPath:"components/wareHouse/oumonthlyReporttForm"
                        }
                    ]
                },
                {
                    id: 66,
                    label: '系统设置',
                    children:[
                        {
                            id: 67,
                            label: '管理员列表',
                            path:"/managers",
                            menuIndex:"6-1",
                            componentPath:"components/set/managers"
                        },
                        {
                            id: 68,
                            label: '角色权限管理',
                            path:"/roleMenu",
                            menuIndex:"6-2",
                            componentPath:"components/set/roleMenu"
                        },
                        {
                            id: 69,
                            label: '消息通知',
                            path:"/message",
                            menuIndex:"6-3",
                            componentPath:"components/set/message"
                        }
                    ]
                }
            ]
        };
    },
    mounted(){
        //设置默认选中tree项
        this.$refs.tree.setCheckedKeys(this.selectKey);
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
                this.$request({
                    method:'post',
                    url:"/apis/member/addRole",
                    data: {
                        roleName:this.form.name,
                        roleDesc:this.form.desc,
                        map:JSON.stringify(sendData)
                    }
                })
                .then(response=>{
                    if(response.data.code){
                        this.$message({
                            showClose: true,
                            message: "修改成功!",
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: "修改失败!"+response.data.msg,
                            type: 'error'
                        });
                    }
                    this.submitLoading = false;
                })
            },300)
        },
        onReturn(){
            this.$router.push('/roleList');
        }
    },
    created() {
        // this.onSearch();
        let arr = [];
        for(let i = 0; i < 80; i++){
            arr.push(i);
        }
        this.selectKey = arr;
    }
};
</script>

