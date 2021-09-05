// 导入通用样式
import '@/assets/css/normalize.scss'
import '@/assets/css/init.scss'
// import 'nkxrb-vue/lib/nkxrb-ui.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import * as api from '@/utils/api.js'
import * as network from '@/utils/network.js'

// 只在开发环境引入
process.env.NODE_ENV === 'development' && require('../mock/api.js')

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$network = network

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
