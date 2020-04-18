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
                                     :hide-required-asterisk=true style="width: 500px">
                                <el-form-item label="姓名" prop="name">
                                    <el-input v-model="createForm.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别" prop="sex">
                                    <el-select v-model="createForm.sex" style="width: 400px">
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
                                            placeholder="选择日期"
                                            style="width: 400px">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="民族" prop="nation">
                                    <el-input v-model="createForm.nation" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="政治面貌" prop="politicalStatus">
                                    <el-input v-model="createForm.politicalStatus" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="学历" prop="education">
                                    <el-input v-model="createForm.education" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="毕业院校" prop="school">
                                    <el-input v-model="createForm.school" auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="部门" prop="departmentId">
                                    <el-select v-model="createForm.departmentId"
                                               @change="updateDepartmentJobList"
                                               placeholder="请选择" style="width: 400px">
                                        <el-option
                                                v-for="item in departmentList"
                                                :key="item.departmentId"
                                                :label="item.name"
                                                :value="item.departmentId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="类型" prop="type">
                                    <el-select v-model="createForm.type" placeholder="请选择" style="width: 400px">
                                        <el-option
                                                v-for="item in typeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职务" prop="jobId">
                                    <el-select v-model="createForm.jobId"
                                               @change="updateGrade" style="width: 400px">
                                        <el-option
                                                v-for="item in departmentJobList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职级" prop="grade">
                                    <el-input v-model="createForm.grade" disabled auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="入职日期" prop="hireDate">
                                    <el-date-picker
                                            @blur="setContract"
                                            v-model="createForm.hireDate"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择日期"
                                            style="width: 400px">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="签约日期" prop="contractStart">
                                    <el-date-picker
                                            id="contractStart"
                                            v-model="createForm.contractStart"
                                            value-format="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择日期"
                                            style="width: 400px">
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
                                    <el-button type="primary" @click="createStaffInfo('createForm')">创 建</el-button>
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
                                        <el-button plain @click="schedule(scope.row)"
                                                   style="margin-right: 15px;">进 度
                                        </el-button>
                                        <el-button type="danger" plain @click="staffDel(scope.row)"
                                                   style="margin-right: 15px;">删 除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="员工调动">
                    <el-collapse>
                        <el-collapse-item title="一致性 Consistency" name="1">

                        </el-collapse-item>
                        <el-collapse-item title="反馈 Feedback" name="2">

                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="员工离职">
                </el-tab-pane>
            </el-tabs>
            <el-dialog
                    title="确认删除"
                    :visible.sync="showDeleteDialog"
                    width="30%">
                <span>确认要删除{{deleteStaffId}}的信息吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showDeleteDialog = false">取 消</el-button>
                    <el-button type="danger" @click="confirmDelete">删 除</el-button></span>
            </el-dialog>
            <el-drawer
                    title="入职进度"
                    :visible.sync="drawer"
                    direction="btt"
                    :show-close=false>
                <span>
                    <el-steps :active="stepNumber" simple finish-status="success" style="width: 1000px;margin: auto">
                        <el-step title="创建资料" description="建立新入职员工的档案资料。"></el-step>
                        <el-step title="设定薪资"></el-step>
                        <el-step title="激活账号"></el-step>
                    </el-steps>
                </span>
            </el-drawer>
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
                stepNumber: 1,
                drawer: false,
                deleteStaffId: '',
                showDeleteDialog: false,
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
                jobList: [],
                departmentList: [],
                departmentJobList: [],
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
                    nation: [
                        {required: true, message: '请输入民族', trigger: 'blur'},
                    ],
                    politicalStatus: [
                        {required: true, message: '请输入政治面貌', trigger: 'blur'},
                    ],
                    education: [
                        {required: true, message: '请输入学历', trigger: 'blur'},
                    ],
                    school: [
                        {required: true, message: '请输入毕业院校', trigger: 'blur'},
                    ],
                    departmentId: [
                        {required: true, message: '请选择部门', trigger: 'change'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
                    ],
                    jobId: [
                        {required: true, message: '请选择职务', trigger: 'change'},
                    ],
                    grade: [
                        {required: true, message: ' ', trigger: 'blur'},
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
            schedule(row) {
                if (row.status === 'create') {
                    this.stepNumber = 1;
                } else if (row.status === 'pending') {
                    this.stepNumber = 2;
                } else this.stepNumber = 3;
                this.drawer = true;
            },
            updateDepartmentJobList() {
                let list = [];
                for (let i = 0; i < this.jobList.length; i++) {
                    if (this.jobList[i].departmentId === this.createForm.departmentId) {
                        list.push(this.jobList[i]);
                    }
                }
                this.departmentJobList = list;
            },
            updateGrade() {
                let data;
                for (let i = 0; i < this.departmentJobList.length; i++) {
                    if (this.departmentJobList[i].id === this.createForm.jobId) {
                        data = this.departmentJobList[i].grade;
                        break;
                    }
                }
                this.createForm.grade = data;
            },
            createStaffInfo(createForm) {
                let that = this;
                this.$refs[createForm].validate((valid) => {
                    if (valid) {
                        that.$http.post("/staff/create", {
                            'name': that.createForm.name,
                            'sex': that.createForm.sex,
                            'birthday': that.createForm.birthday,
                            'nation': that.createForm.nation,
                            'politicalStatus': that.createForm.politicalStatus,
                            'education': that.createForm.education,
                            'school': that.createForm.school,
                            'departmentId': that.createForm.departmentId,
                            'type': that.createForm.type,
                            'jobId': that.createForm.jobId,
                            'grade': that.createForm.grade,
                            'hireDate': that.createForm.hireDate,
                            'contractStart': that.createForm.contractStart,
                            'contractLength': that.createForm.contractLength,
                            'email': that.createForm.email,
                            'phoneNumber': that.createForm.phoneNumber,
                            'address': that.createForm.address,
                        }).then(function (res) {
                                if (res.data.status === 'ok') {
                                    that.$message({message: "创建成功", type: "success"});
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
            confirmDelete() {
                let that = this;
                this.$http.post('/staff/pending/del', {'staffId': that.deleteStaffId}).then(function (res) {
                    if (res.data.status === 'ok') {
                        //TODO: 刷新组件
                        that.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } else
                        that.$message("删除失败！");
                });
                this.showDeleteDialog = false;
            },
            staffDel(row) {
                this.deleteStaffId = row.staffId;
                this.showDeleteDialog = true;
            },
            pendingFilter(value, row) {
                return row.departmentId === value;
            },
        },
        mounted: function () {
            let that = this;
            this.$http.get('/staff/job/list').then(function (res) {
                if (res.data.status === 'ok') {
                    that.jobList = JSON.parse(res.data.content);
                } else {
                    that.$message("加载出错，请稍后再试。");
                }
            });
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