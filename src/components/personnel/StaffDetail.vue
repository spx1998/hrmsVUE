<template>
    <div style="margin: 10px">
        <div class="header">
            <b>员工管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>职员详情</b>
        </div>
        <div class="body">
            <div style="margin: auto">
                <el-form ref="staffDetail" :model="staffDetail" label-width="80px" style="padding:30px;width: 400px">
                    <el-form-item label="职工号">
                        <el-input v-model="staffDetail.staffId" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="staffDetail.name" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="staffDetail.sex" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input v-model="staffDetail.birthday" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="staffDetail.departmentName" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职级">
                        <el-input v-model="staffDetail.grade" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-input v-model="staffDetail.hireDate" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工龄">
                        <el-input v-model="staffDetail.seniority" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-input v-model="staffDetail.contractStart" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="到期日期">
                        <el-input v-model="staffDetail.contractEnd" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-input v-model="staffDetail.email" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="staffDetail.phoneNumber" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="staffDetail.address" disabled type="textarea" :rows="4"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center">
                            <el-button type="primary" plain @click="back">返回</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import DateUtils from "@/FormatDate";

    export default {
        name: "StaffDetail",
        data() {
            return {
                staffDetail: {},
            }
        },
        methods: {
            back(){
                this.$router.push('/stafflist');
            }
        },
        mounted: function () {
            let that = this;
            this.$http.get('/staff/info?staffId=' + this.$route.params.staffId).then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    console.log(data);
                    if (data.sex === "0" || data.sex === 0) {
                        data.sex = '男';
                    } else {
                        data.sex = '女';
                    }
                    data.birthday = DateUtils.FormatDate(data.birthday);
                    data.hireDate = DateUtils.FormatDate(data.hireDate);
                    data.contractStart = DateUtils.FormatDate(data.contractStart);
                    data.contractEnd = DateUtils.FormatDate(data.contractEnd);
                    that.staffDetail = data;
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
    }
</style>