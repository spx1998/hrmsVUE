<template>
    <div class="login">
        <el-card class="login-card" shadow="always">
            <div slot="header">
                <span>&#12288;登录</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="contactUs">联系我们</el-button>
            </div>
            <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="55px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="loginForm.account" placeholder="请输入用户名或者职工号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('loginForm')">登录</el-button>
                    &#12288;
                    <el-button type="text" @click="forgetPassword">忘记密码</el-button>
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
                    account: '',
                    password: '',
                },
                rules: {
                    account: [
                        {required: true, message: '请输入用户名或职工号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            login(loginForm) {
                let that = this;
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        this.$http.post('/login', "account=" + that.loginForm.account + "&password=" + that.loginForm.password)
                            .then(function (res) {
                                if (res.data.status === 'ok') {
                                    sessionStorage.setItem("token", res.data.content);
                                    // Vue.prototype.$token=res.data.content;
                                    that.$router.push("home");
                                } else if (res.data.status === 'wrong') {
                                    that.$alert("账号或密码错误，请重新输入！");
                                } else {
                                    that.alert("登陆失败，请稍后重试。");
                                }
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            contactUs() {
                this.$alert('请到XX层人事处或致电XXXXXXXXXXX联系我们。', '联系我们', {
                    confirmButtonText: '确定'
                });
            },
            forgetPassword() {
                this.$router.push("forgetPwd")
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

</style>
