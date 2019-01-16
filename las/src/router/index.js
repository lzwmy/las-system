import Vue from 'vue'
import Router from 'vue-router'

import login from '@/views/member/login.vue'
import Index from '@/views/member/index.vue'
import page404 from '@/views/member/404.vue'
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
const router =  new Router({
  routes: [
    {
			path: '/',
			redirect: '/memberList'
    },
    {
      path: '/',
      name:"会员管理",
      component:Index,
      children: [
        {
          path: '/addMember',
          name:"新增会员",
          meta: {
            permission:['admin']
          },
          component:AddMember        
        }, 
        {
          path: '/addMemberForm',
          name:"新增会员加入单",
          component:AddMemberForm	
        },
        {
          path: '/Payment',
          name:"新会员订单",
          component:Payment	
        },
        {
          path: '/addMemberList',
          name:"新增会员列表",
          meta: {
            permission:['user']
          },
          component:AddMemberList
        }, 
        {
          path: '/memberList',
          name:"会员列表",
          component:MemberList
        },
        {
          path: '/tree',
          name:"会员树状图",
          component:Tree
        },
        {
          path: '/mdetailed',
          name:"会员详细信息",
          component:Mdetailed	
        },
        {
          path: '/basicInfo',
          name:"修改基本信息",
          component:BasicInfo	
        },
        {
          path: '/sensitiveinfo',
          name:"修改敏感信息",
          component:Sensitiveinfo	
        },
        {
          path: '/reName',
          name:"会员更名",
          component:ReName	
        },
        {
          path: '/changeReferee',
          name:"更改推荐人",
          component:ChangeReferee	
        },
        {
          path: '/changeLevel',
          name:"更改会员级别",
          component:ChangeLevel	
        },
        {
          path: '/bindingOld',
          name:"与老会员绑定",
          component:BindingOld	
        },
        {
          path: '/allBindingOld',
          name:"与老会员批量绑定",
          component:AllBindingOld	
        },
        {
          path: '/queryRecord',
          name:"修改记录查询",
          component:QueryRecord	
        },
        {
          path: '/toExamine',
          name:"审核管理",
          component:ToExamine	
        },
        {
          path: '/mState',
          name:"会员状态",
          component:MState	
        },
        {
          path: '/mStateRecord',
          name:"会员冻结注销记录",
          component:MStateRecord	
        },
        {
          path: '/mIntegralFreezing',
          name:"会员积分冻结记录",
          component:MIntegralFreezing	
        }
      ]	
    },
    {
      path: '/',
      name:"会员奖励",
      component:Index,
      children: [
        {
          path: '/cycleManage',
          name:"周期管理",
          component:CycleManage	
        },
        {
          path: '/cycleChangeLog',
          name:"周期切换日志",
          component:CycleChangeLog	
        },
        {
          path: '/cycleCount',
          name:"周期结算",
          component:CycleCount
        },
        {
          path: '/qualification',
          name:"本期会员资格表",
          component:Qualification	
        },
        {
          path: '/perStatus',
          name:"业绩状态检查",
          component:PerStatus	
        },
        {
          path: '/achievement',
          name:"本期会员业绩表",
          component:Achievement	
        },
        {
          path: '/bonus',
          name:"本期会员奖金表",
          component:Bonus	
        },
        {
          path: '/grantToExamine',
          name:"奖金发放表审核",
          component:GrantToExamine	
        },
        {
          path: '/toExamineC',
          name:"奖金表审核",
          component:ToExamineC	
        },
        {
          path: '/grant',
          name:"奖金发放表",
          component:Grant	
        },
        {
          path: '/historicalBonus',
          name:"历史奖金表",
          component:HistoricalBonus	
        },
        {
          path: '/bonusgGant',
          name:"奖金发放明细表",
          component:BonusgGant	
        },
        {
          path: '/memberBonus',
          name:"会员奖金明细表",
          component:MemberBonus	
        },
        {
          path: '/recommend',
          name:"推荐列表",
          component:Recommend	
        },
        {
          path: '/memberArrears',
          name:"会员欠款表",
          component:MemberArrears	
        },
        {
          path: '/addArrears',
          name:"创建欠款单",
          component:AddArrears	
        },
        {
          path: '/arrearsDetailed',
          name:"会员欠款明细表",
          component:ArrearsDetailed	
        },
        {
          path: '/arrearsToExamine',
          name:"会员欠款单申请审核",
          component:ArrearsToExamine	
        }
      ]	
    },
    {
      path: '/',
      name:"会员积分管理",
      component:Index,
      children: [
        {
          path: '/IntegralQuery',
          name:"会员积分查询",
          component:IntegralQuery	
        },
        {
          path: '/IntegralRule',
          name:"会员规则设置",
          component:IntegralRule	
        },
        {
          path: '/presentToExamine',
          name:"提现审核",
          component:PresentToExamine	
        },
        {
          path: '/presentRecord',
          name:"提现记录",
          component:PresentRecord	
        },
      ]
    },
    {
      path: '/',
      name:"财务管理",
      component:Index,
      children: [
        {
          path: '/companyAccount',
          name:"公司账户汇总",
          meta: {
            permission:['admin']
          },
          component:CompanyAccount	
        },
        {
          path: '/memberAccount',
          name:"会员账户余额汇总",
          component:MemberAccount	
        }
      ]
    },
    {
      path: '/',
      name:"库存管理",
      component:Index,
      children: [
        {
          path: '/WHManagement',
          name:"仓库管理",
          component:WHManagement	
        },
        {
          path: '/stockToExamine',
          name:"进货单审核",
          component:StockToExamine	
        },
        {
          path: '/stockForm',
          name:"入库报表",
          component:StockForm	
        },
        {
          path: '/outForm',
          name:"出库报表",
          component:OutForm	
        },
        {
          path: '/WHwarning',
          name:"库存预警",
          component:WHwarning	
        },
        {
          path: '/QGPwarning',
          name:"保质期预警",
          component:QGPwarning	
        },
        {
          path: '/createAdjust',
          name:"创建调整单",
          component:CreateAdjust	
        },
        {
          path: '/adjustToExamine',
          name:"调整单审核",
          component:AdjustToExamine	
        },
        {
          path: '/createAllocation',
          name:"创建调拨单",
          component:CreateAllocation	
        },
        {
          path: '/allocationToxamine',
          name:"调拨单审核",
          component:AllocationToxamine	
        },
        {
          path: '/dailyReport',
          name:"进销存日报表",
          component:DailyReport	
        },
        {
          path: '/monthlyReport',
          name:"进销存月报表",
          component:MonthlyReport	
        }
      ]
    },
    {
      path: '/login',
      name:"login",
      component:login	
    },
    {
      path: '*',
      name:"404",
      component:page404
    }
  ]
})

// 动态路由
export const dynamicRouter = [
  
]


const whiteList = ['/login', '/regist']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  let Authorization = window.localStorage.getItem('Authorization');
  if(Authorization!="" && Authorization!="null" || whiteList.indexOf(to.path) !== -1){ 
      next();
  } else {
      if(to.path=='/login'){ 
          next();
      } else {
          next('/login');
      }
  }
})



export default router;