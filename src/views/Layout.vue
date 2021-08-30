<template>
  <div class="leek-layout">
    <!-- 左侧菜单 -->
    <div class="leek-l">
      <leek-menu></leek-menu>
    </div>
    <!-- 右侧内容 -->
    <div class="leek-r">
      <!-- 顶部面板信息 -->
      <div class="leek-r-top">
        <!-- 路由面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item,i) in breadcrumbList" :key="i">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 登录信息 -->
        <div class="user-info">
          <div class="avatar-div">
            <img style="width:100%;" src="../assets/img/avatar.jpg" />
          </div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link pointer">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="logoutUser">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <nk-form title="修改密码" width="400px" label-width="80px" :visible.sync="showResetPas" :fields="passwordFormFields" :data="{}" @submit="resetPs"></nk-form>

      </div>
      <!-- 子页面内容 -->
      <main class="leek-main">
        <transition mode="out-in" name="view-fade">
          <router-view />
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { LOGOUT } from '@/store/mutation-types'
import LeekMenu from './Menu.vue'
export default {
  name: 'Layout',
  components: { LeekMenu },
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
  .leek-layout {
    height: 100vh;
    width: 100%;
    min-width: 1100px;
    display: flex;
    .leek-l {
      width: 180px;
      height: 100%;
      overflow: hidden;
    }
    .leek-r {
      width: calc(100% - 180px);
      height: 100%;
    }
    .leek-r-top {
      padding: 0 20px;
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      .user-info {
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: space-between;
        .avatar-div {
          overflow: hidden;
          border-radius: 20px;
          height: 30px;
          width: 30px;
          margin-right: 10px;
        }
      }
    }
    .leek-main {
      padding: 20px;
      height: calc(100% - 90px);
      overflow-y: auto;
    }
    .view-fade-enter-active {
      transition: all 0.5s ease;
    }
    .view-fade-leave-active {
      transition: all 0.5s cubic-bezier(1, 0.2, 0.8, 1);
    }
    .view-fade-enter, .view-fade-leave-to/* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @media screen and (max-width: 1100px) {
    .leek-layout {
      height: calc(100vh - 10px);
    }
  }
</style>
