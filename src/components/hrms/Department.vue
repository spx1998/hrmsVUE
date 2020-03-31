<template>
    <div style="margin: 10px">
        <div class="header">
            <b>HRMS管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>部门管理</b>
            <el-button plain style="float:right;height:40px;margin:20px 50px" @click="newDishForm=true">新增部门
            </el-button>
        </div>
        <div class="body">
            <el-table
                    :data="departmentList"
                    stripe
                    height="600"
                    style="width: 100%">
                <el-table-column
                        prop="departmentId"
                        label="部门编号"
                        sortable
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="部门名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="ministerName"
                        label="主管"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="number"
                        label="人数"
                        sortable
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="hrName"
                        label="对接HR"
                        width="200">
                </el-table-column>
                <el-table-column align="right" prop="button">
                    <el-button plain style="margin-right: 55px;" @click="">修改</el-button>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Department",
        data() {
            return {
                departmentList: [],
            }
        },
        methods: {},
        mounted: function () {
            let that = this;
            that.$http.get('/hrms/department/list').then(function (res) {
                if (res.data.status === 'ok') {
                    that.departmentList = JSON.parse(res.data.content);
                } else
                    that.$message("加载失败，稍后再试。");
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
    }
</style>