<template>
    <div style="margin: 10px">
        <div class="header">
            <b>个人资料</b>
            <i class="el-icon-arrow-right"></i>
            <b>职业资料</b>
        </div>
        <div class="body">
            <div style="margin: auto">
                <el-form ref="careerInfo" :model="careerInfo" label-width="80px" style="padding:30px;width: 400px">
                    <el-form-item label="职工号">
                        <el-input v-model="careerInfo.staffId" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="careerInfo.name" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-input v-model="careerInfo.departmentName" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职务">
                        <el-input v-model="careerInfo.jobName" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-input v-model="careerInfo.hireDate" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工龄">
                        <el-input v-model="careerInfo.seniority" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-input v-model="careerInfo.contractStart" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="到期日期">
                        <el-input v-model="careerInfo.contractEnd" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center">
                            <el-button type="info" @click="updateInfo">修改资料</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import DateUtils from '../../FormatDate';

    export default {
        name: "StaffCareerInfo",
        data() {
            return {
                careerInfo: {},
            }
        },
        methods:{
          updateInfo(){
              this.$notify.info({
                  title: '修改说明',
                  dangerouslyUseHTMLString: true,
                  message: '职业相关资料请联系部门hr修改。',
                  duration: 8000
              });
          }
        },
        mounted: function () {
            let that = this;
            this.$http.get('/info/career').then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    data.hireDate = DateUtils.FormatDate(data.hireDate);
                    data.contractStart = DateUtils.FormatDate(data.contractStart);
                    data.contractEnd = DateUtils.FormatDate(data.contractEnd);
                    that.careerInfo = data;
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