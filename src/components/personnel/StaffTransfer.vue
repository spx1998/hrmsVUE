<template>
    <div style="margin: 10px">
        <div class="header">
            <b>员工管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>人事管理</b>
        </div>
        <div class="body">
            <el-tabs type="card" style="padding: 10px">
                <el-tab-pane label="员工入职">
                    <el-collapse accordion value="NewStaffList">
                        <el-collapse-item title="创建员工信息" name="CreateNewStaff">
                            <el-form :model="createForm" ref="createForm" label-width="100px" :rules="rules"
                                     style="width: 500px">
                                <el-form-item label="姓名" prop="name">
                                    <el-input v-model="createForm.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="sex">
                                    <el-select v-model="createForm.sex" placeholder="请选择">
                                        <el-option
                                                v-for="item in sexList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="生日" prop="birthday">
                                    <el-date-picker
                                            v-model="createForm.birthday"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="部门" prop="departmentId">
                                    <el-select v-model="createForm.departmentId" placeholder="请选择">
                                        <el-option
                                                v-for="item in departmentList"
                                                :key="item.departmentId"
                                                :label="item.name"
                                                :value="item.departmentId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="类型" prop="type">
                                    <el-select v-model="createForm.type" placeholder="请选择">
                                        <el-option
                                                v-for="item in typeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职级" prop="grade">
                                    <el-input v-model="createForm.grade" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="入职日期" prop="hireDate">
                                    <el-date-picker
                                            @blur="setContract"
                                            v-model="createForm.hireDate"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="签约日期" prop="contractStart">
                                    <el-date-picker
                                            id="contractStart"
                                            v-model="createForm.contractStart"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="合同年限" prop="contractLength">
                                    <el-input v-model="createForm.contractLength" auto-complete="off">
                                        <template slot="append">年</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="email" prop="email">
                                    <el-input v-model="createForm.email" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="phoneNumber">
                                    <el-input v-model="createForm.phoneNumber" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="住址" prop="address">
                                    <el-input v-model="createForm.address" type="textarea" :rows="4"
                                              auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="createStaffInfo('createForm')">创建</el-button>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>
                        <el-collapse-item title="待激活员工列表" name="NewStaffList">
                            <el-table
                                    :data="pendingList"
                                    stripe
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
                                        :filter-method="pendingFilter"
                                        filter-placement="bottom-end">
                                </el-table-column>
                                <el-table-column
                                        prop="hireDate"
                                        sortable
                                        label="入职时间"
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
                                    <template slot-scope="scope">
                                        <el-button type="danger" plain @click="staffDel(scope.row)"
                                                   style="margin-right: 15px;">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="员工调动">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="一致性 Consistency" name="1">

                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">

                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="员工离职">

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StaffTransfer",
        data() {
            let checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                sexList: [{
                    value: '0',
                    label: '男'
                }, {
                    value: '1',
                    label: '女'
                }],
                typeList: [{
                    value: '1',
                    label: '正式'
                }, {
                    value: '2',
                    label: '实习'
                }],
                departmentList: [],
                departmentFilterList: [],
                createForm: {departmentId: ''},
                pendingList: [],
                rules: {
                    name: [
                        {required: true, message: '请输入职工姓名', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'},
                    ],
                    birthday: [
                        {required: true, message: '请选择日期', trigger: 'blur'},
                    ],
                    departmentId: [
                        {required: true, message: '请选择部门', trigger: 'change'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
                    ],
                    grade: [
                        {required: true, message: '请输入职级', trigger: 'blur'},
                    ],
                    hireDate: [
                        {required: true, message: '请选择入职日期', trigger: 'change'},
                    ],
                    contractStart: [
                        {required: true, message: '请选择签约日期', trigger: 'change'},
                    ],
                    contractLength: [
                        {required: true, message: '请选择合同年限', trigger: 'change'},
                    ],
                    email: [
                        {required: true, message: '请输入email', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    phoneNumber: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkPhone, trigger: ['blur', 'change']}
                    ],
                },
            }
        },
        methods: {
            createStaffInfo(createForm) {

                let that = this;
                this.$refs[createForm].validate((valid) => {
                    if (valid) {
                        that.$http.post("/staff/create", {
                            'name': that.createForm.name,
                            'sex': that.createForm.sex,
                            'birthday': that.createForm.birthday,
                            'departmentId': that.createForm.departmentId,
                            'type': that.createForm.type,
                            'grade': that.createForm.grade,
                            'hireDate': that.createForm.hireDate,
                            'contractStart': that.createForm.contractStart,
                            'contractLength': that.createForm.contractLength,
                            'email': that.createForm.email,
                            'phoneNumber': that.createForm.phoneNumber,
                            'address': that.createForm.address,
                        }).then(function (res) {
                                if (res.data.status === 'ok') {
                                    that.$message("创建成功。");
                                } else {
                                    that.$message("创建出错，请稍后再试。");
                                }
                            }
                        )
                    }
                });
            },
            setContract() {
                this.$set(this.createForm, 'contractStart', this.createForm.hireDate);
                this.$set(this.createForm, 'contractLength', 3);
            },
            staffDel(row) {
                let that = this;
                this.$http.post('/staff/pending/del', {'staffId': row.staffId}).then(function (res) {
                    if (res.data.status === 'ok') {
                        //TODO: 刷新组件
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else
                        that.$message("删除失败！");

                });
            },
            pendingFilter(value, row) {
                return row.departmentId === value;
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
            this.$http.get("/staff/pending/list",).then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    for (let i = 0; i < data.length; i++) {
                        for (let j = 0; j < that.departmentList.length; j++) {
                            if (data[i].departmentId === that.departmentList[j].departmentId) {
                                data[i].departmentName = that.departmentList[j].name;
                            }
                        }
                    }
                    that.pendingList = JSON.parse(JSON.stringify(data));
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
        background-color: #FFFFFF;
    }
</style>