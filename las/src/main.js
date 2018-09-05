import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-area-linkage/dist/index.css'
import AreaLinkage from 'vue-area-linkage'
import store from './store'

Vue.prototype.$axios = axios
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
