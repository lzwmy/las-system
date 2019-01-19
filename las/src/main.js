import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import  '../theme/index.css'
import ElementUI from 'element-ui'
import 'vue-area-linkage/dist/index.css'
import AreaLinkage from 'vue-area-linkage'
import request from "./util/request.js";
import store from './store'

Vue.prototype.$request = request
Vue.use(ElementUI)
Vue.use(AreaLinkage)

import dialogCom from './common/member/dialogCom.vue'

Vue.component(dialogCom.name, dialogCom);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


