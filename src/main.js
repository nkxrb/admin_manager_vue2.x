// 导入通用样式
import '@/assets/css/normalize.scss'
import '@/assets/css/init.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'nkxrb-vue/lib/nkxrb-ui.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import { NkForm } from 'nkxrb-vue'
import KTable from '@/components/KTable.vue'
import SelectHospital from '@/components/SelectHospital.vue'

import * as api from '@/utils/api.js'
import * as network from '@/utils/network.js'
import * as validate from '@/utils/validate.js'

// 只在开发环境引入
process.env.NODE_ENV === 'development' && require('../mock/api.js')

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(NkForm)

Vue.component(KTable.name, KTable)
Vue.component(SelectHospital.name, SelectHospital)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$network = network
Vue.prototype.$validate = validate

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
