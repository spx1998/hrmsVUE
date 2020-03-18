<template>
  <div class="login">
    <el-card class="login-card" shadow="always">
      <div slot="header">
        <span>&#12288;登录</span>
        <el-button style="float: right; padding: 3px 0" type="text">联系我们</el-button>
      </div>
      <el-form ref="form" :model="loginForm" label-width="55px" >
        <el-form-item label="用户名">
          <el-input v-model="loginForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          &#12288;
          <el-button type="text">忘记密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          userName: '',
          password: '',
        }
      }
    },
    methods: {
      login() {
        this.$router.push('home');
      }
    }
  }
</script>
<style scoped>
  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 150px;
  }

  .login-card {
    width: 450px;
  }

  .login-button {

  }
</style>
