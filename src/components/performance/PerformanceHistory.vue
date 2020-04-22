<template>
    <div style="margin: 10px">
        <div class="header">
            <b>绩效考勤</b>
            <i class="el-icon-arrow-right"></i>
            <b>历史绩效</b>
        </div>
        <div class="body">
            <el-table :data="performanceList">
                <el-table-column
                        prop="month"
                        sortable
                        label="月 份">
                </el-table-column>
                <el-table-column
                        prop="performanceLevel"
                        label="绩效评分"
                        sortable>
                    <template slot-scope="scope">
                        {{scope.row.performanceLevel}}
                        <el-tag v-if="scope.row.status===0">未评分</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="remark"
                        label="备注">
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "PerformanceHistory",
        data() {
            return {
                performanceList: [],
            }
        },
        mounted: function () {
            let that = this;
            that.$http.get('/performance/history').then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content).reverse();
                    for (let i = 0; i < data.length; i++) {
                        data[i].month = data[i].month.slice(0,4)+"年"+data[i].month.slice(4,6)+"月";
                    }
                    that.performanceList = data;
                } else that.$message({message: '加载出错，请稍后再试', type: 'error'})
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
        height: 600px;
    }
</style>