<template>
    <div style="margin: 10px">
        <div class="header">
            <b>绩效考勤</b>
            <i class="el-icon-arrow-right"></i>
            <b>申请假期</b>
        </div>
        <div class="body">
            <el-form :model="vacationForm" ref="createJobForm" :rules="vacationRules" label-width="80px"
                     hide-required-asterisk style="padding:40px; width: 580px">
                <el-form-item label="原因" prop="reason">
                    <el-select v-model="vacationForm.reason" style="width: 500px">
                        <el-option
                                v-for="item in reasonList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" prop="startDate">
                    <el-date-picker
                            v-model="vacationForm.startDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期" style="width: 500px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endDate">
                    <el-date-picker
                            v-model="vacationForm.endDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期" style="width: 500px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="抄送" prop="copy">
                    <el-input v-model="vacationForm.copy" auto-complete="off"
                              placeholder="请输入接收人的工号，多个工号之间用；隔开"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="content">
                    <el-input v-model="vacationForm.content" type="textarea" :rows="6"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="vacationApplication">申 请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VacationApplication",
        data() {
            return {
                vacationForm: {},
                reasonList: [],
                vacationRules: {
                    reason: [
                        {required: true, message: '请选择原因', trigger: 'change'},
                    ],
                    startDate: [
                        {required: true, message: '请选择日期', trigger: 'blur'},
                    ],
                    endDate: [
                        {required: true, message: '请选择日期', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请输入详情说明', trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            vacationApplication() {
                let that = this;
                that.$http.post("/performance/vacation/application", {
                    "reason": that.vacationForm.reason,
                    "startDate": that.vacationForm.startDate,
                    "endDate": that.vacationForm.endDate,
                    "copy": that.vacationForm.copy,
                    "content": that.vacationForm.content,
                }).then(function (res) {
                    if (res.data.status === 'ok') {
                        that.$message({type: "success", message: "申请成功！"});
                        that.$router.push("/vacation");
                    } else {
                        that.$message("加载出错，请稍后再试。");
                    }
                })
            }
        },
        mounted: function () {
            let that = this;
            that.$http.get("/performance/vacation/reason/list").then(function (res) {
                if (res.data.status === 'ok') {
                    that.reasonList = JSON.parse(res.data.content);
                } else {
                    that.$message("加载出错，请稍后再试。");
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
        height: 600px;

    }
</style>