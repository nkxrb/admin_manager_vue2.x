import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { localStore } from '@/store/storage'
import { REDIRECT_URL } from '@/config'
import Login from '@/views/login/index.vue'
import Layout from '@/views/Layout.vue'
import EmptyView from '@/views/EmptyView.vue'

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法,解决路由重复访问报错问题
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const page = name => () => import('../views/' + name)

const pageRoutes = [
  { path: '/', name: 'home', meta: { id: 11, title: '首页', icon: 'el-icon-s-home' }, component: page('home/index.vue') },
  { path: '/dutyInfo', name: 'dutyInfo', meta: { title: '线上号源', icon: '' }, component: page('medical/doctor/dutyInfo.vue') },
  {
    path: '/medical',
    name: 'medical',
    meta: { id: 12, title: '医疗信息', icon: 'el-icon-s-cooperation' },
    component: EmptyView,
    children: [
      { path: '/publichos', name: 'publichos', meta: { id: 120, title: '公立医院', icon: '' }, component: page('medical/hospital/publicHos.vue') },
      { path: '/hospital', name: 'hospital', meta: { id: 121, title: '医院管理', icon: '' }, component: page('medical/hospital/index.vue') },
      {
        path: '/hospitalOffice',
        name: 'offices',
        meta: { id: 122, title: '科室管理', icon: '' },
        component: EmptyView,
        children: [
          { path: '/hospitalOffice', name: 'hospitalOffice', meta: { id: 1221, title: '医院科室', icon: '' }, component: page('medical/offices/hospitalOffice.vue') },
          { path: '/standardOffice', name: 'standardOffice', meta: { id: 1222, title: '标准科室', icon: '' }, component: page('medical/offices/standardOffice.vue') }
        ]
      },
      {
        path: '/doctor',
        name: 'doctor',
        meta: { id: 123, title: '医生管理', icon: '' },
        component: EmptyView,
        children: [
          { path: '/doctorInfo', name: 'doctorInfo', meta: { id: 1231, title: '医生信息', icon: '' }, component: page('medical/doctor/doctorInfo.vue') },
          { path: '/suspendInfo', name: 'suspendInfo', meta: { id: 1232, title: '停诊信息', icon: '' }, component: page('medical/doctor/suspendInfo.vue') }
          // { path: '/insurance', name: 'insurance', meta: { title: '医保优惠', icon: '' }, component: page('medical/doctor/insurance.vue') },
          // { path: '/recommend', name: 'recommend', meta: { title: '推荐医生', icon: '' }, component: page('medical/doctor/recommend.vue') }
        ]
      },
      { path: '/disease', name: 'disease', meta: { id: 124, title: '疾病管理', icon: '' }, component: page('medical/disease/index.vue') }
    ]
  },
  {
    path: '/myapply',
    name: 'myapply',
    meta: { id: 13, title: '我的申请', icon: 'el-icon-s-help' },
    component: EmptyView,
    children: [
      { path: '/hospitalApply', name: 'hospitalApply', meta: { id: 131, title: '医院申请', icon: '' }, component: page('medical/myapply/hospitalApply.vue') },
      { path: '/officeApply', name: 'officeApply', meta: { id: 132, title: '科室申请', icon: '' }, component: page('medical/myapply/officeApply.vue') },
      { path: '/doctorApply', name: 'doctorApply', meta: { id: 133, title: '医生申请', icon: '' }, component: page('medical/myapply/doctorApply.vue') }
    ]
  },
  {
    path: '/examine',
    name: 'examine',
    meta: { id: 14, title: '审核管理', icon: 'el-icon-s-claim' },
    component: EmptyView,
    children: [
      { path: '/examineHospital', name: 'examineHospital', meta: { id: 141, title: '审核医院', icon: '' }, component: page('examine/examineHospital.vue') },
      { path: '/examineOffice', name: 'examineOffice', meta: { id: 142, title: '审核科室', icon: '' }, component: page('examine/examineOffice.vue') },
      { path: '/examineDoctor', name: 'examineDoctor', meta: { id: 143, title: '审核医生', icon: '' }, component: page('examine/examineDoctor.vue') }
    ]
  },
  {
    path: '/operate',
    name: 'operate',
    meta: { id: 17, title: '运营管理', icon: 'el-icon-s-management' },
    component: EmptyView,
    children: [
      { path: '/banner', name: 'banner', meta: { id: 171, title: 'banner管理', icon: '' }, component: page('operate/banner.vue') },
      { path: '/evaluate', name: 'evaluate', meta: { id: 172, title: '评价管理', icon: '' }, component: page('operate/evaluate.vue') }
    ]
  },
  {
    path: '/count',
    name: 'count',
    meta: { id: 15, title: '统计管理', icon: 'el-icon-s-data' },
    component: EmptyView,
    children: [
      { path: '/reservationCount', name: 'reservationCount', meta: { id: 151, title: '预约统计', icon: '' }, component: page('count/reservationCount.vue') },
      { path: '/hosOrderCount', name: 'hosOrderCount', meta: { id: 152, title: '预约统计', icon: '' }, component: page('count/hosOrderCount.vue') }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    meta: { id: 16, title: '系统管理', icon: 'el-icon-s-tools' },
    component: EmptyView,
    children: [
      { path: '/userInfo', name: 'userInfo', meta: { id: 161, title: '用户管理', icon: '' }, component: page('setting/userInfo.vue') },
      { path: '/roleInfo', name: 'roleInfo', meta: { id: 162, title: '角色管理', icon: '' }, component: page('setting/roleInfo.vue') },
      { path: '/permissionInfo', name: 'permissionInfo', meta: { id: 163, title: '资源管理', icon: '' }, component: page('setting/permissionInfo.vue') }
    ]
  }
]

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      noPermission: true
    }
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: pageRoutes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    y: 0
  }),
  routes
})

// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否为不鉴权路由
  if (!store.getters.isLogin && !to.meta.noPermission) {
    // 存储重定向页面
    localStore.set(REDIRECT_URL, from.path || '/')
    next('/login')
  } else if (to.meta && store.state.user && store.state.user.menus && store.state.user.menus.includes(to.meta.id)) {
    // next('/login')
    next()
  }

  next()
})

export default router

export { pageRoutes }
