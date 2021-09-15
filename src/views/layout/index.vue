<template>
  <el-container style="height: 100vh;">
    <!-- 头部 -->
    <el-header class="sys-header">
      <my-header></my-header>
    </el-header>

    <el-container>
      <!-- 左侧导航 -->
      <el-aside width="180px" class="sys-aside hidden-md-and-down">
        <my-nav></my-nav>
      </el-aside>

      <!-- 主内容区 -->
      <el-main>
        <!-- 路由面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,i) in breadcrumbList" :key="i">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <transition mode="out-in" name="view-fade">
          <router-view class="page-container" />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css' // 引入el基于断点的隐藏类
import Vue from 'vue'
import MyHeader from './header.vue'
import { Container, Header, Aside, Main, Breadcrumb, BreadcrumbItem } from 'element-ui'
import { mapState } from 'vuex'
import { LOGOUT } from '@/store/mutation-types'
import MyNav from './nav.vue'
Vue.use(Container).use(Header).use(Main).use(Aside).use(Breadcrumb).use(BreadcrumbItem)

export default {
  name: 'Layout',
  components: { MyHeader, MyNav },
  computed: {
    ...mapState({
      avatar: state => state.user.avatar,
      username: state => state.user.username
    }),
    breadcrumbList: function () {
      if (this.$route.name === 'home') {
        return []
      }
      return this.$route.matched.filter(item => {
        return item.meta.title
      })
    }
  },
  data () {
    return {
      showResetPas: false,
      passwordFormFields: [
        { prop: 'oldPassword', span: 24, label: '旧密码', maxlength: 30, type: 'password', rules: ['required'] },
        { prop: 'password', span: 24, label: '新密码', maxlength: 30, type: 'password', rules: ['required'] },
        { prop: 'repassword', span: 24, label: '确认密码', maxlength: 30, type: 'password', rules: ['required'] }
      ]
    }
  },
  methods: {
    handleCommand (command) {
      this[command]()
    },
    resetPassword () {
      this.showResetPas = true
    },
    resetPs (item) {
      if (item.password && item.password !== item.repassword) {
        this.$message.warning('两次输入的密码不一致！')
        return
      }
      this.$network.post(`/sys/user/editpwd?oldpwd=${item.oldPassword}&newpwd=${item.password}`).then(res => {
        this.$message.success('修改成功，请重新登录账号')
        this.$network.post('/logout')
        this.$store.commit(LOGOUT)
        this.$router.push('/login')
      })
    },
    logoutUser () {
      this.$network.post('/logout')
      this.$store.commit(LOGOUT)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
  .sys-header {
    box-shadow: 0px 0px 10px 0px #333;
  }
  .sys-aside {
    background-color: #333;
    overflow: hidden;
    box-shadow: 0px 5px 10px 0px #333;
  }
  .page-container {
    height: calc(100% - 20px);
  }
</style>
