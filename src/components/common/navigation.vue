<template>
    <div class="page">
        <div class="head">
            <div style="height: 60px;">
                <h3 style="margin-left: 15px;color: #FFFFFF">人力资源管理系统</h3>
            </div>
            <div style="margin-left: 80%;margin-top: 10px">
                <el-button type="text" style="color: #FFFFFF" @click="showUpdatePwd=true">修改密码</el-button>
                <el-button type="text" style="color: #e40a04" @click="logout">退出登录</el-button>
            </div>
        </div>
        <div class="body">
            <div class="left">
                <el-menu
                        default-active="0"
                        class="el-menu-vertical-demo"
                        :unique-opened="true"
                        router
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        style="position: absolute;height: 100%;width:200px">
                    <div v-for="item in navData" :key="item.modName">
                        <el-submenu :index="item.modName">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.modName}}</span>
                            </template>
                            <el-menu-item :index="sub.path" v-for="sub in item.submodName" :key="sub.name">
                                <template slot="title">
                                    <span>{{sub.name}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </div>
                </el-menu>
            </div>
            <div class="right">
                <div>
                    <transition name="move" mode="out-in">
                        <!--这里的router-view用来渲染子页面-->
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
        <el-dialog title="修改密码"
                   :visible.sync="showUpdatePwd"
                   :destroy-on-close="true"
                   @close="showUpdatePwd=false,resetForm()"
                   width="35%">
            <el-form :model="updatePwdForm" ref="updatePwdForm" label-width="120px">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input type="password" v-model="updatePwdForm.oldPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input type="password" v-model="updatePwdForm.newPwd" autosize auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="repeat">
                    <el-input type="password" v-model="updatePwdForm.repeat" autosize auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showUpdatePwd = false">取 消</el-button>
                <el-button type="primary" @click="updatePwd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {Decrypt, Encrypt} from '../../crypto';

    export default {
        name: "navigation",
        data() {
            return {
                showUpdatePwd: false,
                navData: [],
                updatePwdForm: {
                    oldPwd: '',
                    newPwd: '',
                    repeat: ''
                }
            }
        },
        methods: {
            logout() {
                sessionStorage.removeItem("token");
                this.$router.push("/");
            },
            updatePwd() {
                //TODO:  判断密码格式
                let that = this;
                if (that.updatePwdForm.oldPwd === '' || that.updatePwdForm.newPwd === '' || that.updatePwdForm.repeat === '') {
                    that.$message.error("请输入完整！");
                    that.updatePwdForm = [];
                    return;
                }
                if (that.updatePwdForm.newPwd !== that.updatePwdForm.repeat) {
                    that.$message.error("两次密码输入不一致！");
                    that.updatePwdForm = [];
                    return;
                }
                //TODO:待修改 无data
                this.$http.post("/pwd/change", {
                    'oldPwd': Encrypt(that.updatePwdForm.oldPwd),
                    'newPwd': Encrypt(that.updatePwdForm.newPwd)
                })
                    .then(function (res) {
                        if (res.data.status === 'ok') {
                            that.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        }
                        if (res.data.status === 'error') {
                            that.$message({
                                type: 'error',
                                message: '修改失败!'
                            });
                        }
                        if (res.data.status === 'wrong') {
                            that.$message({
                                type: 'error',
                                message: '原密码错误!'
                            });
                        }
                        //TODO:刷新方式需修改
                        // setTimeout(function () {
                        //     that.$router.go(0);
                        // },150)
                    }).catch();
            },
            resetForm() {
                this.updatePwdForm = [];
            }
        },
        mounted: function () {
            let that = this;
            this.$http.get("/navigate").then(function (res) {
                if (res.data.status === 'ok') {
                    that.navData = JSON.parse(res.data.content);
                } else {
                    that.$alert("加载出错，将为您退出登录，请您稍后再试。");
                }
            });

        }
    }
</script>

<style scoped>
    @import "../../assets/css/nav.css";
    @import "../../assets/font/iconfont.css";

    .page {
        display: flex;

        flex-direction: column;
        align-content: flex-start;

        height: 100%;

        width: 100%;


    }

    .head {
        display: flex;
        background-color: #474f57;
    }

    .body {
        flex: 1;
        display: flex;

        height: 100%;

        width: 100%;

    }

    .body .left {

        flex: 0 0 200px;

        height: 100%;

    }

    .body .right {

        flex: 1;

        height: 100%;

    }
</style>
