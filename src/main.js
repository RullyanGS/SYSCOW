import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'
import VueMask from 'v-mask'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  VueMask,
  render: h => h(App),
}).$mount('#app')
