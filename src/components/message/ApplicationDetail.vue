<template>
    <div style="margin: 10px">
        <div class="header">
            <b>消息中心</b>
            <i class="el-icon-arrow-right"></i>
            <b>申请详情</b>
        </div>
        <div class="body">
            <el-form ref="application" v-model="applicationForm" label-width="80px"
                     style="padding:30px;width: 400px;height:550px;" :hide-required-asterisk="true">
                <el-form-item label="姓名" prop="applicantName">
                    <el-input v-model="applicationForm.applicantName" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-input v-model="applicationForm.type" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="原因" prop="reason">
                    <el-input v-model="applicationForm.reason" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="申请时间" prop="createTime">
                    <el-input v-model="applicationForm.createTime" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" prop="startDate">
                    <el-input v-model="applicationForm.startDate" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-input v-model="applicationForm.endDate" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="content">
                    <el-input v-model="applicationForm.content" disabled type="textarea" :rows="6"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="text-align:center">
                        <el-button type="success" plain @click="agree">同 意</el-button>
                        <el-button type="danger" plain @click="reject">拒 绝</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ApplicationDetail",
        data() {
            return {
                applicationForm: {},
                reasonList: [],
            }
        },
        methods: {
            reject() {
                let that = this;
                this.$http.post('/application/reject/' + this.$route.params.id).then(function (res) {
                    if (res.data.status === 'ok') {
                        that.$message("已拒绝该申请");
                    } else {
                        that.$message("加载出错，请稍后再试。");
                    }
                });
                that.$router.push("/approve");
            },
            agree() {
                let that = this;
                this.$http.post('/application/agree/' + this.$route.params.id).then(function (res) {
                    if (res.data.status === 'ok') {
                        that.$message("已同意该申请");
                    } else {
                        that.$message("加载出错，请稍后再试。");
                    }
                });
                that.$router.push("/approve");

            },
        },
        mounted: function () {
            let that = this;
            this.$http.get('/application/reason/list').then(function (res) {
                if (res.data.status === 'ok') {
                    that.reasonList = JSON.parse(res.data.content);
                } else {
                    that.$message("加载出错，请稍后再试。");
                }
            });
            this.$http.get('/application/detail?id=' + this.$route.params.id).then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    if (data.type === 1) {
                        data.type = "请假";
                    }
                    if (data.type === 2) {
                        data.type = "补贴";
                    }
                    if (data.type === 3) {
                        data.type = "调动";
                    }
                    if (data.type === 4) {
                        data.type = "离职";
                    }
                    for (let i = 0; i < that.reasonList.length; i++) {
                        if (that.reasonList[i].id.toString() === data.reason.toString()) {
                            data.reason = that.reasonList[i].name;
                            break;
                        }
                    }
                    that.applicationForm = data;
                } else {
                    that.$message("加载出错，请稍后再试。");
                }
            });

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
        height: 630px;

    }
</style>