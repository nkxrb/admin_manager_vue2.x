<template>
  <!--背景图-->
  <div class="login-bg">
    <div class="login-div">
      <div style="font-size: 32px;color: #333333;">后台管理系统</div>
      <el-form ref="accountForm" :model="accountForm" :rules="rules">
        <el-form-item prop="username" class="login-form-item">
          <el-input size="medium" class="login-input" v-model.trim="accountForm.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-form-item">
          <el-input size="medium" class="login-input" v-model="accountForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
        </el-form-item>
        <el-button class="login-btn" @click="login">登录</el-button>
      </el-form>
      <div style="color: #999999;font-size: 16px;text-align: center;">如果您没有账号，请联系官方运维人员</div>
    </div>
  </div>
</template>
<script>
import { LOGIN, SET_USERINFO } from '@/store/mutation-types'
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      accountForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      checked: false
    }
  },
  methods: {
    login () {
      this.$refs.accountForm.validate(valid => {
        if (valid) {
          debugger
          const params = {
            username: this.accountForm.username,
            password: this.accountForm.password
          }
          this.logining = true
          this.$network.post('/login', params).then(res => {
            debugger
            // 登录成功，配置token
            const { token, roleId, username, permissions, menuIds } = res.data
            console.log(menuIds)
            this.$store.commit(LOGIN, {
              accessToken: token,
              roleId: roleId,
              permissions: permissions,
              menuIds: menuIds
            })
            this.$store.commit(SET_USERINFO, {
              username: username
            })
            this.logining = false
          })
        } else {
          this.$message.warning('用户名和密码不能为空')
        }
      })
    }
  }
}
</script>
<style scoped>
  .login-bg {
    background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
    /* background: url("../assets/login_bg.png") no-repeat; */
    height: 100vh;
    width: 100vw;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-div {
    width: 410px;
    height: 307px;
    border: 1px solid #fff;
    border-radius: 30px;
    background-color: #ffffff;
    text-align: center;
    padding: 30px;
  }

  .login-btn {
    margin: 30px auto;
    border-radius: 40px;
    height: 40px;
    width: 80%;
    background-color: #4388ee;
    text-align: center;
    font-size: 18px;
    color: #ffffff;
  }

  .login-form-item {
    width: 80%;
    margin: 0 auto;
  }

  .login-input {
    margin-top: 30px;
    width: 100%;
  }

  .el-input__inner {
    border: 0 solid;
    border-bottom: 1px solid #f0f0f0;
  }

  input {
    border: unset;
  }
</style>
