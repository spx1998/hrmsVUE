<template>
    <div class="forgetPwd">
        <el-card class="pwd-card" shadow="always">
            <div slot="header">
                <span>&#12288;忘记密码</span>
            </div>
            <el-form ref="forgetForm" :rules="rules" :model="forgetForm" label-width="80px">
                <el-form-item label="职工号" prop="staffID">
                    <el-input v-model="forgetForm.staffID" placeholder="请输入职工号"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="forgetForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-row>
                        <el-col :span="18">
                            <el-input v-model="forgetForm.email" placeholder="请输入电子邮箱"></el-input>
                        </el-col>
                        <el-col :span="3" :offset="1">
                            <el-button type="primary">验证</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="forgetForm.newPwd" placeholder="请输入新的密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirm">
                    <el-input v-model="forgetForm.confirm" placeholder="请再次输入新密码"></el-input>
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
    export default {
        name: "forgetPwd",
        data() {
            return {
                forgetForm: {
                    staffID: '',
                    username: '',
                    email: '',
                    newPwd: '',
                    confirm: '',
                    CAPTCHA: '',
                },
                rules: {
                    staffID: [
                        {required: true, message: '请输入职工号', trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入电子邮箱', trigger: 'blur'},
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
            changePwd(forgetForm){
                let that = this;
                // this.$refs[loginForm].validate((valid) => {
                this.$refs[forgetForm].validate((valid)=>{
                    if(valid){

                    }else {

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