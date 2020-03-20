<template>
    <div class="forgetPwd">
        <el-card class="pwd-card" shadow="always">
            <div slot="header">
                <span>&#12288;忘记密码</span>
            </div>
            <el-form ref="forgetForm" :rules="rules" :model="forgetForm" label-width="80px">
                <el-form-item label="职工号" prop="staffId">
                    <el-input v-model="forgetForm.staffId" placeholder="请输入职工号"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="forgetForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="18">
                        <el-form-item label="电子邮箱" prop="email">
                            <el-input v-model="forgetForm.email" placeholder="请输入电子邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3" :offset="2">
                        <el-button type="primary" @click="checkEmail('forgetForm')">验证</el-button>
                    </el-col>
                </el-row>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="forgetForm.newPwd" placeholder="请输入新的密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm">
                    <el-input type="password" v-model="forgetForm.confirm" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="CAPTCHA">
                    <el-input v-model="forgetForm.CAPTCHA" placeholder="请输入您收到的验证码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changePwd('forgetForm')">修改密码</el-button>

                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import login from "@/components/login";

    export default {
        name: "forgetPwd",
        data() {
            return {
                forgetForm: {
                    staffId: '',
                    username: '',
                    email: '',
                    newPwd: '',
                    confirm: '',
                    CAPTCHA: '',
                },
                rules: {
                    staffId: [
                        {required: true, message: '请输入职工号', trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入电子邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    newPwd: [
                        {required: true, message: '请输入新的密码', trigger: 'blur'},
                    ],
                    confirm: [
                        {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    ],
                    CAPTCHA: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ],
                }
            };

        },
        methods: {
            checkEmail(forgetForm) {
                let that = this;
                this.$refs[forgetForm].validateField('email', valid => {
                    //TODO:此处若验证通过valid为"",若不通过值为message的内容。
                    if (valid === '') {
                        that.$http.post('/pwd/email', "email=" + that.forgetForm.email).then(
                            function (res) {
                                if (res.data.status === 'ok') {
                                    that.message("发送成功，请到您的邮箱内查收。");
                                } else if (res.data.status === 'wrong') {
                                    that.$alert("请验证邮箱是否正确或稍后再试。", "发送失败");
                                } else {
                                    that.$alert("发送失败，请稍后再试。", "发送失败");
                                }
                            }
                        )
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            changePwd(forgetForm) {
                let that = this;
                this.$refs[forgetForm].validate((valid) => {
                    if (valid) {
                        if (that.forgetForm.newPwd !== that.forgetForm.confirm) {
                            this.$message({message: '两次输入的密码不同！', type: 'warning'});
                            return;
                        }
                        that.$http.post('/pwd/forget',{
                            'staffId':that.forgetForm.staffId,
                            'username':that.forgetForm.username,
                            'email':that.forgetForm.email,
                            'newPwd':that.forgetForm.newPwd,
                            'CAPTCHA':that.forgetForm.CAPTCHA,
                        }).then(function (res) {
                            if(res.data.status==='ok'){
                                that.$message({
                                    message:'修改密码成功！',
                                    type:'success'
                                })
                                setTimeout(()=>{
                                    that.$router.push(login);
                                },1000);
                            }else if(res.data.status==='wrong'){
                                that.$alert(res.data.content,"修改失败")
                            }else{
                                that.$alert("修改失败，请稍后再试。","修改失败")
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .forgetPwd {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
    }

    .pwd-card {
        width: 480px;
    }
</style>