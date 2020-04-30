<template>
    <div style="margin: 10px">
        <div class="header">
            <b>消息中心</b>
            <i class="el-icon-arrow-right"></i>
            <b>待我审批</b>
        </div>
        <div class="body">
            <el-table :data="application" @row-click="detail">
                <el-table-column prop="type" sortable label="类型" width="180">
                </el-table-column>
                <el-table-column prop="applicantName" sortable label="名称" width="180">
                </el-table-column>
                <el-table-column prop="createTime" sortable label="时间" width="180">
                </el-table-column>
                <el-table-column prop="content" label="内容">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Approve",
        data() {
            return {
                application: [],
            }
        },
        methods: {
            detail(row) {
                this.$router.push({
                    path: `/applicationdetail/${row.id}`,
                });
            }
        },
        mounted: function () {
            let that = this;
            that.$http.get("/message/application").then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].type === 1) {
                            data[i].type = "请假";
                        }
                        if (data[i].type === 2) {
                            data[i].type = "补贴";
                        }
                        if (data[i].type === 3) {
                            data[i].type = "调动";
                        }
                        if (data[i].type === 4) {
                            data[i].type = "离职";
                        }
                    }
                    that.application = data;
                } else that.$message({message: '加载出错，请稍后再试', type: 'error'})
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