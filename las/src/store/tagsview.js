const tagsview = {
    state:{
        //存放所有浏览过的且不重复的路由数据
        visitedviews:[
            {
                path: '/memberList',
                name:"memberList",
                meta: { 
                    title: "会员列表" 
                },
            },
        ],
        //缓存组件的name，用于keep-alive的include
        keepAlive:['memberList'],
        //需要缓存组件的name
        unkeepAlive:['/addMember','/addMemberForm','/payment','/basicInfo','/sensitiveinfo','/reName','/changeReferee','/changeLevel','/bindingOld','/createAdjust','/createAllocation','/info']
    },
    mutations:{
        //打开新页签--添加路由数据
        ADD_VISITED_VIEWS:(state,view)=>{
            if(state.visitedviews.some(v=>v.path == view.path)){
                return;
            }
            //不缓存的组件则过滤
            let isAdd = false;  //判断是否添加到缓存组件里
            for(let i = 0; i < state.unkeepAlive.length; i++){
                if(view.path == state.unkeepAlive[i]){
                    isAdd = true;
                    break;
                }
            }

            if(isAdd){
                state.keepAlive.push(view.name);
            }

            state.visitedviews.push({
                path:view.path,
                name:view.name,
                meta:view.meta
            })
        },

        //关闭页签--删除路由数据
        DEL_VISITED_VIEWS:(state,path)=>{
            //删除缓存组件
            for(let i = 0; i < state.keepAlive.length; i++){
                if(state.keepAlive[i] == path.slice(1)){
                    state.keepAlive.splice(i,1);
                    break;
                }
            }
            //删除路由数组
            for(let i in state.visitedviews){
                if(state.visitedviews[i].path == path){
                    state.visitedviews.splice(i,1);
                    break;
                }
            }
        },

        //关闭全部页签--删除路由数据
        DEL_VISITED_ALL:(state)=>{
            state.visitedviews = [];
            state.keepAlive = ['memberList'];
        },

        
    },
    actions:{
        //调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
        addVisitedViews({commit},view){
            commit('ADD_VISITED_VIEWS',view);
        },

        //删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
        delVisitedViews({commit,state},view){
            //commit('DEL_VISITED_VIEWS',view)
            return new Promise((resolve)=>{//resolve方法：未来成功后回掉的方法
                commit('DEL_VISITED_VIEWS',view);
                resolve([...state.visitedviews]);
            })
        }
  
    }
  }


  export default tagsview;