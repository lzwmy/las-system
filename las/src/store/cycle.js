
// const state = {
// 	locValue: {
// 		longitude: null,
// 		latitude: null
// 	}
// }

// const mutations = {
// 	modityLocation(state, params) {
// 		state.locValue = params;
// 	}
// }

// const actions = {
// 	getLocation(context) {
// 		//执行百度地图定位
// 		 getUserLocation().then((result)=>{
// 			context.commit('modityLocation',{
// 				longitude:result.center.lng,
// 				latitude: result.center.lat
// 			})
// 		})
// 		// setTimeout(()=>{
// 		// 	context.commit('modityLocation', {
// 		// 		longitude: '114.059563',
// 		// 		latitude: '22.54286'
// 		// 	})
// 		// },2000)
// 	},
// 	//用户修改地址
// 	userSelectLocation(context, params) {
// 		context.commit('modityLocation', params)
// 	}
// }

// export default {
// 	namespaced: true,
// 	state,
// 	mutations,
// 	actions
// }