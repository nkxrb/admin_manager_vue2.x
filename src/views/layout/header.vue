<template>
  <div class="my-header">
    <img class="logo" src="../../assets/img/nkxrb.png" />
    <div>
      <el-dropdown @command="localChange" class="sys-locale">
        <span class="username pointer">
          {{langName}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="lang in Object.keys(langs)" :key="lang" :command="lang">{{langs[lang]}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown @command="handleCommand" class="user-info">
        <div slot="default" class="pointer">
          <img class="avatar" src="../../assets/img/avatar.jpg" />
          <span class="username">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="resetPassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logoutUser">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { loadLanguageAsync } from '@/i18n'
import locales from '@/i18n/locales.json'
import { mapState } from 'vuex'
import { LOGOUT } from '@/store/mutation-types'
import Vue from 'vue'
import { Dropdown, DropdownItem, DropdownMenu } from 'element-ui'
Vue.use(Dropdown).use(DropdownItem).use(DropdownMenu)

export default {
  name: 'MyHeader',
  computed: {
    ...mapState({
      avatar: state => state.user.avatar,
      username: state => state.user.username
    }),
    langs: function () {
      return locales
    }
  },
  data () {
    return {
      showResetPas: false,
      langName: '简体中文',
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
    },
    localChange (command) {
      this.langName = this.langs[command]
      loadLanguageAsync(command)
    }
  }
}
</script>
<style scoped lang="scss">
  .my-header {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    width: 80px;
    align-self: center;
  }
  .user-info {
  }
  .sys-locale {
    margin-right: 16px;
  }
  .avatar {
    border-radius: 20px;
    height: 30px;
    width: 30px;
    margin-right: 6px;
    vertical-align: bottom;
  }
  .username {
    vertical-align: 8px;
  }
</style>
