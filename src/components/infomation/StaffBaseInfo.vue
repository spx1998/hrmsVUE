<template>
    <div style="margin: 10px">
        <div class="header">
            <b>个人资料</b>
            <i class="el-icon-arrow-right"></i>
            <b>基本资料</b>
        </div>
        <div class="body">
            <div style="margin: auto">
                <el-form ref="baseInfo" :model="baseInfo" label-width="80px" style="padding:30px;width: 400px">
                    <el-form-item label="职工号">
                        <el-input v-model="baseInfo.staffId" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="baseInfo.name" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="baseInfo.sex" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input v-model="baseInfo.birthday" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-input v-model="baseInfo.email" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="baseInfo.phoneNumber" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="baseInfo.address" disabled type="textarea" :rows="4"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center">
                            <el-button type="primary" @click="showUpdateForm=true">修改资料</el-button>
                            <el-button type="text" circle icon="el-icon-info" @click="question"></el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-dialog title="修改资料" :visible.sync="showUpdateForm" :close-on-click-modal="false" width="35%">
            <el-form :model="updateForm" ref="updateForm" :rules="rules" label-width="100px"
                     style="padding:25px;">
                <el-form-item label="职工号">
                    <el-input v-model="updateForm.staffId" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="updateForm.name" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="updateForm.sex" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-input v-model="updateForm.birthday" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="updateForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="updateForm.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="住址" prop="address">
                    <el-input v-model="updateForm.address" type="textarea" :rows="4" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showUpdateForm = false">取 消</el-button>
                <el-button type="primary" @click="updateBaseInfo('updateForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import DateUtils from '../../FormatDate';

    export default {
        name: "StaffBaseInfo",
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                showUpdateForm: false,
                baseInfo: {},
                updateForm: {
                    staffId: '',
                    name: '',
                    sex: '',
                    birthday: '',
                    email: '',
                    phoneNumber: '',
                    address: ''
                },
                rules: {
                    phoneNumber: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入电子邮箱', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                }
            }
        },
        methods: {
            updateBaseInfo(updateForm) {
                let that = this;
                this.$refs[updateForm].validate((valid) => {
                    if (valid) {
                        if (that.updateForm.email === that.baseInfo.email && that.updateForm.phoneNumber === that.baseInfo.phoneNumber && that.updateForm.address === that.baseInfo.address) {
                            that.showUpdateForm = false;
                            return;
                        }
                        that.$http.post('/info/base/update', {
                            'staffId': that.updateForm.staffId,
                            'email': that.updateForm.email,
                            'phoneNumber': that.updateForm.phoneNumber,
                            'address': that.updateForm.address,
                        }).then(function (res) {
                            if (res.data.status === 'ok') {
                                //TODO:刷新界面的方法
                                that.showUpdateForm = false;
                            } else {
                                that.$message("修改失败，请稍后再试。");
                            }
                        })
                    }
                });
            },
            question() {
                this.$notify.info({
                    title: '修改说明',
                    dangerouslyUseHTMLString: true,
                    message: '1.此处修改的邮箱仅为联系邮箱，账号密码的绑定邮箱不会修改。<br/>' +
                        '2.修改邮箱、地址与电话号码之外的信息请与部门hr联系。',
                    duration: 8000
                });
            }
        },
        mounted: function () {
            let that = this;
            this.$http.get('/info/base').then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    if (data.sex === "0" || data.sex === 0) {
                        data.sex = '男';
                    } else {
                        data.sex = '女';
                    }

                    data.birthday = DateUtils.FormatDate(data.birthday);
                    that.baseInfo = data;
                    that.updateForm = JSON.parse(JSON.stringify(that.baseInfo));
                } else {
                    that.$alert("加载失败，请稍后再试。");
                }
            })
        }
    }
</script>

<style scoped>
    .header {
        margin: 0;
        background-color: rgb(245, 245, 245);
        color: #333;
        padding-left: 10px;
        line-height: 80px;
        height: 80px;
    }

    .body {

        display: flex;
        margin: 0;
        background-color: rgb(255, 255, 255);
        padding-left: 10px;
        line-height: 80px;
        height: 16cm;

    }

    .body .left {

        flex: 0 0 600px;

        height: 100%;

    }

    .body .right {

        flex: 1;

        height: 100%;

    }
</style>