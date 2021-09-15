import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { localStore } from '@/store/storage'
import { REDIRECT_URL } from '@/config'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
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
  { path: '/board', name: 'board', meta: { id: 12, title: '大屏看板', icon: 'el-icon-s-data' }, component: page('board/boardA.vue') },
  { path: '/form', name: 'form', meta: { id: 13, title: '表单组件', icon: 'el-icon-s-data' }, component: page('form/formA.vue') },
  { path: '/drag', name: 'drag', meta: { id: 14, title: '拖拽盒子', icon: 'el-icon-s-data' }, component: page('drag/index.vue') },
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
