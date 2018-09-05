import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/member/index.vue'
import AddMember from '@/components/member/addMember/addMember.vue'
import AddMemberList from '@/components/member/addMember/addMemberList.vue'
import Payment from '@/components/member/addMember/payment.vue'
import MemberList from '@/components/member/memberList.vue'
import BasicInfo from '@/components/member/change/basicInfo.vue'
import Sensitiveinfo from '@/components/member/change/sensitiveinfo.vue' 
import ReName from '@/components/member/change/reName.vue' 
import ChangeReferee from '@/components/member/change/changeReferee.vue' 
import ChangeLevel from '@/components/member/change/changeLevel.vue' 
import BindingOld from '@/components/member/change/bindingOld.vue' 
import QueryRecord from '@/components/member/change/queryRecord.vue' 
import ToExamine from '@/components/member/change/toExamine.vue' 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/member',
      name:"会员管理",
      component: Index,
      children: [ 
        {
          path: '/addMember',
          name:"新增会员",
          component:AddMember,
          children: [
            
          ]	
        },      
        {
          path: '/memberList',
          name:"会员列表",
          component:MemberList	
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
