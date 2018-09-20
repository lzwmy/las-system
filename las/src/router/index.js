import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/member/index.vue'
// 会员管理
import AddMember from '@/components/manage/addMember/addMember.vue'
import AddMemberList from '@/components/manage/addMemberList.vue'
import Mdetailed from '@/components/manage/mDetailed.vue'
//import AddMemberList2 from '@/components/manage/addMember/addMemberList.vue'
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
//会员奖励
import CycleManage from '@/components/reward/cycleManage/cycleManage.vue' 
import CycleChangeLog from '@/components/reward/cycleManage/cycleChangeLog.vue' 
import CycleCount from '@/components/reward/cycleCount/cycleCount.vue' 
import PerStatus from '@/components/reward/cycleCount/PerStatus.vue' 
import Qualification from '@/components/reward/cycleCount/qualification.vue' 
import Achievement from '@/components/reward/cycleCount/achievement.vue' 
import Bonus from '@/components/reward/cycleCount/bonus.vue' 
import ToExamineC from '@/components/reward/cycleCount/toExamine.vue' 
import Grant from '@/components/reward/cycleCount/grant.vue' 
import HistoricalBonus from '@/components/reward/bonus/historicalBonus.vue' 
import BonusgGant from '@/components/reward/bonus/bonusgGant.vue' 
import MemberBonus from '@/components/reward/bonus/memberBonus.vue' 
import MemberArrears from '@/components/reward/bonus/memberArrears.vue' 
import ArrearsDetailed from '@/components/reward/bonus/arrearsDetailed.vue' 
import ArrearsToExamine from '@/components/reward/bonus/arrearsToExamine.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/member',
      name:"会员管理",
      component:Index,
      children: [
        {
          path: '/addMember',
          name:"新增会员",
          component:AddMember        
        }, 
        {
          path: '/addMemberList',
          name:"新增会员列表",
          component:AddMemberList
        }, 
        {
          path: '/memberList',
          name:"会员列表",
          component:MemberList
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
          name:"与老会员绑量绑定",
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
        }  
      ]	
    },
    {
      path: '/member',
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
          path: '/perStatus',
          name:"业绩状态检查",
          component:PerStatus	
        },
        {
          path: '/qualification',
          name:"本期会员资格表",
          component:Qualification	
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
          path: '/memberArrears',
          name:"会员欠款表",
          component:MemberArrears	
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
      path: '/addMemberList',
      name:"addMemberList",
      component:AddMemberList	
    },
    {
      path: '/Payment',
      name:"Payment",
      component:Payment	
    },
    {
			path: '/',
			redirect: '/member'
    },
    {
			path: '*',
			redirect: '/home'
    }
  ]
})
