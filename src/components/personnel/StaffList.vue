<template>
    <div style="margin: 10px">
        <div class="header">
            <b>员工管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>职员列表</b>
        </div>
        <div class="body">
            <el-table
                    :data="staffList"
                    stripe
                    height="600"
                    style="width: 100%">
                <el-table-column
                        prop="staffId"
                        label="职工号"
                        sortable
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="departmentName"
                        label="部门"
                        width="150"
                        :filters="departmentFilterList"
                        :filter-method="staffFilter"
                        filter-placement="bottom-end">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        sortable
                        label="职级"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="phoneNumber"
                        label="电话"
                        width="150">
                </el-table-column>
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-row>
                            <el-col :span="18">
                                <el-input v-model="search" clearable placeholder="输入名称或职工号搜索"></el-input>
                            </el-col>
                            <el-col :span="2" :offset="0">
                                <el-button type="text" circle plain icon="el-icon-search"
                                           @click="searchStaff"></el-button>
                            </el-col>
                            <el-col :span="3" :offset="0">
                                <el-button type="text" circle plain icon="el-icon-close" @click="showList"></el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <template slot-scope="scope">
                        <el-button @click="staffDetail(scope.row)" style="margin-right: 15px;">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StaffList",
        data() {
            return {
                search: '',
                staffList: [],
                staffListData: [],
                departmentList: [],
                departmentFilterList: [],
                staffInfo: {},
            }
        },
        methods: {
            staffFilter(value, row) {
                return row.departmentId === value;
            },
            searchStaff() {
                if (this.search === '') {
                    return;
                }
                for (let i = 0; i < this.staffListData.length; i++) {
                    if (this.staffListData[i].staffId === this.search || this.staffListData[i].name === this.search) {
                        this.staffList = [this.staffListData[i]];
                        return;
                    }
                }
                this.staffList = [];
            },
            showList() {
                this.staffList = this.staffListData;
                this.search = '';
            },
            staffDetail(row) {
                this.$router.push({
                    path: `/staffDetail/${row.staffId}`,
                });
            },
        },
        mounted: function () {
            let that = this;
            this.$http.get("/staff/department/list",).then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    for (let i = 0; i < data.length; i++) {
                        that.departmentFilterList[i] = {'value': data[i].departmentId, 'text': data[i].name};
                    }
                    that.departmentList = data;
                } else {
                    that.$message("加载出错，请稍后再试。");
                }
            });
            this.$http.get("/staff/list",).then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < that.departmentList.length; j++) {
                            if (data[i].departmentId === that.departmentList[j].departmentId) {
                                data[i].departmentName = that.departmentList[j].name;
                            }
                        }
                    }
                    that.staffListData = JSON.parse(JSON.stringify(data));
                    that.staffList = JSON.parse(JSON.stringify(data));
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