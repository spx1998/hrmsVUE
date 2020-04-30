<template>

    <div style="margin: 10px">
        <div class="header">
            <el-row>
                <el-col :span="20">
                    <b>绩效考勤</b>
                    <i class="el-icon-arrow-right"></i>
                    <b>我的假期</b></el-col>
                <el-col :span="4">
                    <el-button type="primary" plain @click="vacationApplication ">请 假</el-button>
                    <el-button type="warning" plain @click="cancelLeave">销 假</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="body">
            <div style="margin-bottom: -50px;transform-origin:  top;transform: scale(0.8,0.8)">
                <el-calendar>
                    <template
                            slot="dateCell"
                            slot-scope="{date, data}">
                        <div>
                            <el-row>
                                <el-col :span="16">
                                    {{ date.getDate() }}
                                </el-col>
                                <el-col :span="8">
                                    <div v-for="item in calendarData" class="is-selected">
                                        <div v-if="Date.parse(item)===Date.parse(date)">
                                            假
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

                    </template>
                </el-calendar>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Vacation",
        data() {
            return {
                showVacationForm: false,
                calendarData: [],
                vacationForm: {},
            }
        },
        methods: {
            vacationApplication() {
                this.$router.push("/vacation/application");
            },
            cancelLeave() {
                let that = this;
                let today = new Date();
                let formatDate1;
                let formatDate2;
                if (today.getMonth() + 1 < 10) {
                    formatDate1 = today.getFullYear() + "-0" + (today.getMonth() + 1);
                } else formatDate1 = today.getFullYear() + "-0" + (today.getMonth() + 1);
                if (today.getDate() < 10) {
                    formatDate1 = formatDate1 + "-0" + today.getDate();
                } else formatDate1 = formatDate1 + "-" + today.getDate();
                if (this.calendarData.includes(formatDate1)) {
                    let lastDate = new Date();
                    while (true) {
                        if (lastDate.getMonth() + 1 < 10) {
                            formatDate2 = lastDate.getFullYear() + "-0" + (lastDate.getMonth() + 1);
                        } else formatDate2 = lastDate.getFullYear() + "-0" + (lastDate.getMonth() + 1);
                        if (lastDate.getDate() < 10) {
                            formatDate2 = formatDate2 + "-0" + lastDate.getDate();
                        } else formatDate2 = formatDate2 + "-" + lastDate.getDate();
                        if (!this.calendarData.includes(formatDate2)) {
                            lastDate = new Date(lastDate.getTime() - 24 * 60 * 60 * 1000);
                            that.$http.post("/performance/vacation/cancel", {
                                "newDate": today,
                                "lastDate": lastDate
                            }).then(function (res) {
                                if (res.data.status === 'ok') {
                                    that.$message({message: "销假成功。", type: "success"})
                                } else that.$message({message: "加载出错，请稍后再试。", type: "error"});
                            })
                            return;
                        }
                        lastDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
                    }
                }
                that.$message({message: "当前没有处于假期中。"})

            }
            ,
        }
        ,
        mounted: function () {
            let that = this;
            that.$http.get("/performance/vacation/list").then(function (res) {
                if (res.data.status === 'ok') {
                    that.calendarData = JSON.parse(res.data.content);
                } else that.$message({message: "加载出错，请稍后再试。", type: "error"});
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
        height: 640px;

    }

    .is-selected {
        color: #ec0533;
    }
</style>