import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// Global
import VueTheMask from 'vue-the-mask'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueTheMask,
        VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
