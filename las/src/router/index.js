import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

import login from '@/views/member/login.vue'
import Index from '@/views/member/index.vue'
import page404 from '@/views/member/404.vue'
import power from '@/views/member/power.vue'
import Info from '@/components/set/info.vue'
import Managers from '@/components/set/managers.vue'
import RoleMenu from '@/components/set/roleMenu.vue'
import RoleList from '@/components/set/roleList.vue'
import Message from '@/components/set/message.vue'

// 会员管理
import AddMember from '@/components/manage/addMember/addMember.vue'
import AddMemberList from '@/components/manage/addMemberList.vue'
import Mdetailed from '@/components/manage/mDetailed.vue'
import Tree from '@/components/manage/tree.vue'
import AddMemberForm from '@/components/manage/addMember/addMemberForm.vue'
import Payment from '@/components/manage/addMember/payment.vue'
import MemberList from '@/components/manage/memberList.vue'
import BasicInfo from '@/components/manage/change/basicInfo.vue'
import Sensitiveinfo from '@/components/manage/change/sensitiveinfo.vue' 
import ReName from '@/components/manage/change/reName.vue' 
import ChangeReferee from '@/components/manage/change/changeReferee.vue' 
import ChangeLevel from '@/components/manage/change/changeLevel.vue' 
import BindingOld from '@/components/manage/change/bindingOld.vue' 
import AllBindingOld from '@/components/manage/change/allBindingOld.vue' 
import QueryRecord from '@/components/manage/change/queryRecord.vue' 
import ToExamine from '@/components/manage/change/toExamine.vue' 
import MState from '@/components/manage/state/mState.vue' 
import MStateRecord from '@/components/manage/state/mStateRecord.vue' 
import MIntegralFreezing from '@/components/manage/state/mIntegralFreezing.vue' 
//会员奖励
import CycleManage from '@/components/reward/cycleManage/cycleManage.vue' 
import CycleChangeLog from '@/components/reward/cycleManage/cycleChangeLog.vue' 
import CycleCount from '@/components/reward/cycleCount/cycleCount.vue' 
import PerStatus from '@/components/reward/cycleCount/PerStatus.vue' 
import Qualification from '@/components/reward/cycleCount/qualification.vue' 
import Achievement from '@/components/reward/cycleCount/achievement.vue' 
import Bonus from '@/components/reward/cycleCount/bonus.vue' 
import GrantToExamine from '@/components/reward/cycleCount/grantToExamine.vue' 
import ToExamineC from '@/components/reward/cycleCount/toExamine.vue' 
import Grant from '@/components/reward/cycleCount/grant.vue' 
import HistoricalBonus from '@/components/reward/bonus/historicalBonus.vue' 
import BonusgGant from '@/components/reward/bonus/bonusgGant.vue' 
import MemberBonus from '@/components/reward/bonus/memberBonus.vue' 
import AddArrears from '@/components/reward/bonus/addArrears.vue' 
import MemberArrears from '@/components/reward/bonus/memberArrears.vue' 
import ArrearsDetailed from '@/components/reward/bonus/arrearsDetailed.vue' 
import ArrearsToExamine from '@/components/reward/bonus/arrearsToExamine.vue' 
import Recommend from '@/components/reward/bonus/recommend.vue' 
//会员积分管理
import IntegralQuery from '@/components/Integral/IntegralQuery.vue' 
import IntegralRule from '@/components/Integral/IntegralRule.vue' 
import PresentRecord from '@/components/Integral/presentRecord.vue' 
import PresentToExamine from '@/components/Integral/presentToExamine.vue' 
//账务管理
import CompanyAccount from '@/components/finance/companyAccount.vue' 
import MemberAccount from '@/components/finance/memberAccount.vue' 
//库存管理
import WHManagement from '@/components/wareHouse/WHManagement.vue' 
import StockToExamine from '@/components/wareHouse/stockToExamine.vue' 
import StockForm from '@/components/wareHouse/stockForm.vue' 
import OutForm from '@/components/wareHouse/outForm.vue' 
import WHwarning from '@/components/wareHouse/warning/WHwarning.vue' 
import QGPwarning from '@/components/wareHouse/warning/QGPwarning.vue' 
import CreateAdjust from '@/components/wareHouse/adjust/createAdjust.vue' 
import AdjustToExamine from '@/components/wareHouse/adjust/adjustToExamine.vue' 
import AllocationToxamine from '@/components/wareHouse/allocation/allocationToxamine.vue' 
import CreateAllocation from '@/components/wareHouse/allocation/createAllocation.vue' 
import DailyReport from '@/components/wareHouse/dailyReport.vue' 
import MonthlyReport from '@/components/wareHouse/monthlyReport.vue' 



Vue.use(Router)



// 静态路由
const staticRouter =  new Router({
  routes: [
    {
      path: '/login',
      name:"login",
      component:login	
    }
  ]
})
export const dynamicRouter = [
  {
    path: '/',
    name:"会员管理",
    component:Index,
    redirect: '/memberList',
    children: [
      
    ]
  }
]

// 动态路由
// export const dynamicRouter = [
//   {
//     path: '/',
//     name:"会员管理",
//     component:Index,
//     redirect: '/memberList',
//     children: [
//       {
//         path: '/404',
//         name:"404",
//         meta: {
//           title: "404页面",
//         },
//         component:page404
//       },
//       {
//         path: '/addMember',
//         name:"addMember",
//         meta: {
//           title: "新增会员",
//           permission:['admin']
//         },
//         component:AddMember
//         // component: resolve => require(['@/components/manage/addMember/addMember.vue'], resolve)
//       },
//       {
//         path: '/info',
//         name:"info",
//         meta: { 
//           title: "个人中心",
//           permission:['admin'] 
//         },
//         component:Info
//       },
//       {
//         path: '/managers',
//         name:"managers",
//         meta: { 
//           title: "管理员列表",
//           permission:['admin'] 
//         },
//         component:Managers
//       },
//       {
//         path: '/roleMenu',
//         name:"roleMenu",
//         meta: { 
//           title: "角色权限管理",
//           permission:['admin'] 
//         },
//         component:RoleMenu
//       },
//       {
//         path: '/roleList',
//         name:"roleList",
//         meta: { 
//           title: "角色权限管理",
//           permission:['admin'] 
//         },
//         component:RoleList
//       },
//       {
//         path: '/message',
//         name:"message",
//         meta: { 
//           title: "消息通知",
//           permission:['admin'] 
//         },
//         component:Message
//       },
//       {
//         path: '/addMemberForm',
//         name:"addMemberForm",
//         meta: { 
//           title: "新增会员加入单", 
//           permission:['admin']
//         },
//         component:AddMemberForm	
//       },
//       {
//         path: '/payment',
//         name:"payment",
//         meta: { 
//           title: "新会员订单",
//           permission:['admin'] 
//         },
//         component:Payment	
//       },
//       {
//         path: '/addMemberList',
//         name:"addMemberList",
//         meta: {
//           menuIndex:'1-2',
//           title: "新增会员列表" ,
//           permission:['admin']
//         },
//         component:AddMemberList
//       }, 
//       {
//         path: '/memberList',
//         name:"memberList",
//         meta: { 
//           title: "会员列表",
//           permission:['admin']
//         },
//         component:MemberList
//       },
//       {
//         path: '/tree',
//         name:"tree",
//         meta: { 
//           title: "会员树状图",
//           permission:['admin'] 
//         },
//         component:Tree
//       },
//       {
//         path: '/mdetailed',
//         name:"mdetailed",
//         meta: { 
//           title: "会员详细信息",
//           permission:['admin'] 
//         },
//         component:Mdetailed	
//       },
//       // {
//       //   path: '/basicInfo',
//       //   name:"basicInfo",
//       //   meta: { 
//       //     menuIndex:'1-5-1',
//       //     title: "修改基本信息",
//       //     permission:['admin']  
//       //   },
//       //   component:BasicInfo	
//       // },
//       {
//         path: '/sensitiveinfo',
//         name:"sensitiveinfo",
//         meta: { 
//           menuIndex:'1-5-2',
//           title: "修改敏感信息",
//           permission:['admin']  
//         },
//         component:Sensitiveinfo	
//       },
//       {
//         path: '/reName',
//         name:"reName",
//         meta: { 
//           menuIndex:'1-5-3',
//           title: "会员更名",
//           permission:['admin']  
//         },
//         component:ReName	
//       },
//       {
//         path: '/changeReferee',
//         name:"changeReferee",
//         meta: { 
//           menuIndex:'1-5-4',
//           title: "更改推荐人",
//           permission:['admin']  
//         },
//         component:ChangeReferee	
//       },
//       {
//         path: '/changeLevel',
//         name:"changeLevel",
//         meta: { 
//           title: "更改会员级别",
//           permission:['admin']  
//         },
//         component:ChangeLevel	
//       },
//       {
//         path: '/bindingOld',
//         name:"bindingOld",
//         meta: { 
//           title: "与老会员绑定",
//           permission:['admin']  
//         },
//         component:BindingOld	
//       },
//       {
//         path: '/allBindingOld',
//         name:"allBindingOld",
//         meta: { 
//           title: "与老会员批量绑定",
//           permission:['admin']  
//         },
//         component:AllBindingOld	
//       },
//       {
//         path: '/queryRecord',
//         name:"queryRecord",
//         meta: { 
//           title: "修改记录查询",
//           permission:['admin']  
//         },
//         component:QueryRecord	
//       },
//       {
//         path: '/toExamine',
//         name:"toExamine",
//         meta: { 
//           title: "审核管理",
//           permission:['admin']  
//         },
//         component:ToExamine	
//       },
//       {
//         path: '/mState',
//         name:"mState",
//         meta: { 
//           title: "会员状态积分管理",
//           permission:['admin']  
//         },
//         component:MState
//       },
//       {
//         path: '/mStateRecord',
//         name:"mStateRecord",
//         meta: { 
//           title: "会员冻结注销记录",
//           permission:['admin']  
//         },
//         component:MStateRecord	
//       },
//       {
//         path: '/mIntegralFreezing',
//         name:"mIntegralFreezing",
//         meta: { 
//           title: "会员积分冻结记录",
//           permission:['admin']  
//         },
//         component:MIntegralFreezing	
//       },
//       //会员奖励
//       {
//         path: '/cycleManage',
//         name:"cycleManage",
//         meta: { 
//           title: "周期管理",
//           permission:['admin']  
//         },
//         component:CycleManage	
//       },
//       {
//         path: '/cycleChangeLog',
//         name:"cycleChangeLog",
//         meta: { 
//           title: "周期切换日志",
//           permission:['admin']  
//         },
//         component:CycleChangeLog	
//       },
//       {
//         path: '/cycleCount',
//         name:"cycleCount",
//         meta: { 
//           title: "周期结算",
//           permission:['admin']  
//         },
//         component:CycleCount
//       },
//       {
//         path: '/qualification',
//         name:"qualification",
//         meta: { 
//           title: "本期会员资格表",
//           permission:['admin']  
//         },
//         component:Qualification	
//       },
//       {
//         path: '/perStatus',
//         name:"perStatus",
//         meta: { 
//           title: "业绩状态检查",
//           permission:['admin']  
//         },
//         component:PerStatus	
//       },
//       {
//         path: '/achievement',
//         name:"achievement",
//         meta: { 
//           title: "本期会员业绩表",
//           permission:['admin']  
//         },
//         component:Achievement	
//       },
//       {
//         path: '/bonus',
//         name:"bonus",
//         meta: { 
//           title: "本期会员奖金表",
//           permission:['admin']  
//         },
//         component:Bonus	
//       },
//       {
//         path: '/grantToExamine',
//         name:"grantToExamine",
//         meta: { 
//           title: "奖金发放表审核",
//           permission:['admin']  
//         },
//         component:GrantToExamine	
//       },
//       {
//         path: '/toExamineC',
//         name:"toExamineC",
//         meta: { 
//           title: "奖金表审核",
//           permission:['admin']  
//         },
//         component:ToExamineC	
//       },
//       {
//         path: '/grant',
//         name:"grant",
//         meta: { 
//           title: "奖金发放表",
//           permission:['admin']  
//         },
//         component:Grant	
//       },
//       {
//         path: '/historicalBonus',
//         name:"historicalBonus",
//         meta: { 
//           title: "历史奖金表",
//           permission:['admin']  
//         },
//         component:HistoricalBonus	
//       },
//       {
//         path: '/bonusgGant',
//         name:"bonusgGant",
//         meta: { 
//           title: "奖金发放明细表",
//           permission:['admin']  
//         },
//         component:BonusgGant	
//       },
//       {
//         path: '/memberBonus',
//         name:"memberBonus",
//         meta: { 
//           title: "会员奖金明细表",
//           permission:['admin']  
//         },
//         component:MemberBonus	
//       },
//       {
//         path: '/recommend',
//         name:"recommend",
//         meta: { 
//           title: "推荐列表",
//           permission:['admin']  
//         },
//         component:Recommend	
//       },
//       {
//         path: '/memberArrears',
//         name:"memberArrears",
//         meta: { 
//           title: "会员欠款表",
//           permission:['admin']  
//         },
//         component:MemberArrears	
//       },
//       {
//         path: '/addArrears',
//         name:"addArrears",
//         meta: { 
//           title: "创建欠款单",
//           permission:['admin']  
//         },
//         component:AddArrears	
//       },
//       {
//         path: '/arrearsDetailed',
//         name:"arrearsDetailed",
//         meta: { 
//           title: "会员欠款明细表",
//           permission:['admin']  
//         },
//         component:ArrearsDetailed	
//       },
//       {
//         path: '/arrearsToExamine',
//         name:"arrearsToExamine",
//         meta: { 
//           title: "会员欠款单申请审核",
//           permission:['admin']  
//         },
//         component:ArrearsToExamine	
//       },
//       //会员积分管理
//       {
//         path: '/IntegralQuery',
//         name:"IntegralQuery",
//         meta: { 
//           title: "会员积分查询",
//           permission:['admin'] 
//         },
//         component:IntegralQuery	
//       },
//       {
//         path: '/IntegralRule',
//         name:"IntegralRule",
//         meta: { 
//           title: "会员规则设置",
//           permission:['admin'] 
//         },
//         component:IntegralRule	
//       },
//       {
//         path: '/presentToExamine',
//         name:"presentToExamine",
//         meta: { 
//           title: "提现审核",
//           permission:['admin'] 
//         },
//         component:PresentToExamine	
//       },
//       {
//         path: '/presentRecord',
//         name:"presentRecord",
//         meta: { 
//           title: "提现记录",
//           permission:['admin'] 
//         },
//         component:PresentRecord	
//       },
//       //账务管理
//       {
//         path: '/companyAccount',
//         name:"companyAccount",
//         meta: {
//           title:"公司账户汇总",
//           permission:['admin']
//         },
//         component:CompanyAccount	
//       },
//       {
//         path: '/memberAccount',
//         name:"memberAccount",
//         meta: { 
//           title: "会员账户余额汇总",
//           permission:['admin'] 
//         },
//         component:MemberAccount	
//       },
//       //库存管理
//       {
//         path: '/WHManagement',
//         name:"WHManagement",
//         meta: { 
//           title: "仓库管理",
//           permission:['admin'] 
//         },
//         component:WHManagement	
//       },
//       {
//         path: '/stockToExamine',
//         name:"stockToExamine",
//         meta: { 
//           title: "进货单审核",
//           permission:['admin'] 
//         },
//         component:StockToExamine	
//       },
//       {
//         path: '/stockForm',
//         name:"stockForm",
//         meta: { 
//           title: "入库报表",
//           permission:['admin'] 
//         },
//         component:StockForm	
//       },
//       {
//         path: '/outForm',
//         name:"outForm",
//         meta: { 
//           title: "出库报表",
//           permission:['admin'] 
//         },
//         component:OutForm	
//       },
//       {
//         path: '/WHwarning',
//         name:"WHwarning",
//         meta: { 
//           title: "库存预警",
//           permission:['admin'] 
//         },
//         component:WHwarning	
//       },
//       {
//         path: '/QGPwarning',
//         name:"QGPwarning",
//         meta: { 
//           title: "保质期预警",
//           permission:['admin'] 
//         },
//         component:QGPwarning	
//       },
//       {
//         path: '/createAdjust',
//         name:"createAdjust",
//         meta: { 
//           title: "创建调整单",
//           permission:['admin'] 
//         },
//         component:CreateAdjust	
//       },
//       {
//         path: '/adjustToExamine',
//         name:"adjustToExamine",
//         meta: { 
//           title: "调整单审核",
//           permission:['admin'] 
//         },
//         component:AdjustToExamine	
//       },
//       {
//         path: '/createAllocation',
//         name:"createAllocation",
//         meta: { 
//           title: "创建调拨单",
//           permission:['admin'] 
//         },
//         component:CreateAllocation	
//       },
//       {
//         path: '/allocationToxamine',
//         name:"allocationToxamine",
//         meta: { 
//           title: "调拨单审核",
//           permission:['admin'] 
//         },
//         component:AllocationToxamine	
//       },
//       {
//         path: '/dailyReport',
//         name:"dailyReport",
//         meta: { 
//           title: "进销存日报表",
//           permission:['admin'] 
//         },
//         component:DailyReport	
//       },
//       {
//         path: '/monthlyReport',
//         name:"monthlyReport",
//         meta: { 
//           title: "进销存月报表",
//           permission:['admin'] 
//         },
//         component:MonthlyReport	
//       }
//     ]
//   }
// ]


// const whiteList = ['/login', '/regist','/power','/404']; // 不重定向白名单
staticRouter.beforeEach((to, from, next) => {
  //获取登录用户唯一标识
  let Authorization = null;
  if(Cookies.get('Authorization')){
    let bytes = CryptoJS.AES.decrypt(Cookies.get('Authorization').toString(), 'FVSADSJKU566567E',{
      mode: CryptoJS.mode.ECB,  
      padding: CryptoJS.pad.Pkcs7  
    });
    Authorization = bytes.toString(CryptoJS.enc.Utf8); 
  }


  //当页面刷新操作动态路由失效
  // if(Authorization!="null" && staticRouter.resolve({name: 'basicInfo'}).route.matched.length == 0){
    // if(Authorization!="null" && Authorization){
    //   console.log("1232132")
    // //   console.log("添加路由")
    // //   let meunList = [];  //根据角色生成的路由
    // //   let dRouter = dynamicRouter[0].children;    //本地路由表信息
    // //   for (let i = 0; i < dynamicRouter[0].children.length; i++){
    // //       if(dRouter[i].meta){
    // //           for (let j = 0; j < dRouter[i].meta.permission.length; j++){
    // //               if (dRouter[i].meta.permission[j] == "admin" ){
    // //                   meunList.push(dRouter[i]);
    // //               }
    // //           }
    // //       }
    // //   }
    // //   dynamicRouter[0].children = meunList;
    // //   console.log(dynamicRouter)
    // //   staticRouter.addRoutes(dynamicRouter.concat([{
    // //     path: '*',
    // //     redirect:"/404"}
    // //   ])); 
    // //   staticRouter.push('/');
    // }

  // console.log((Authorization=="" || Authorization =="null" || whiteList.indexOf(to.path) != -1))
  if(Authorization!="null" && Authorization){ 
    next();
  }else{
    if(to.path=='/login'){ 
        next();
    } else {
        next('/login');
    }
  }
})



export default staticRouter;