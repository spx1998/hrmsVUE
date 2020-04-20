<template>
    <div style="margin: 10px">
        <div class="header">
            <b>HRMS管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>部门管理</b>
        </div>
        <div class="body">
            <el-tabs v-model="tabs" type="card" style="padding: 10px" @tab-click="handleTab">
                <el-tab-pane label="部门列表" name="list">
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
                                width="150">
                        </el-table-column>
                        <el-table-column align="right" prop="button">
                            <template scope="scope">
                                <el-button plain @click="openChangeForm(scope.row)" style="margin-right: 15px;">修 改
                                </el-button>
                                <el-button type="danger" plain @click="delDepartment(scope.row)"
                                           style="margin-right: 15px;">删 除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="新增部门" name="add">
                    <el-collapse accordion value="CreateNewDepartment">
                        <el-collapse-item title="创建部门信息" name="CreateNewDepartment">
                            <el-form :model="createForm" ref="createForm" :rules="rules" label-width="100px"
                                     :hide-required-asterisk=true style="width: 500px">
                                <el-form-item label="部门名称" prop="name">
                                    <el-input v-model="createForm.name" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="分类" prop="type">
                                    <el-select v-model="createForm.type" placeholder="请选择" style="width: 400px">
                                        <el-option
                                                v-for="item in typeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="主管工号" prop="ministerId">
                                    <el-input v-model="createForm.ministerId" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="主管姓名" prop="ministerName">
                                    <el-input v-model="createForm.ministerName" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="HR工号" prop="hrId">
                                    <el-input v-model="createForm.hrId" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="HR姓名" prop="hrName">
                                    <el-input v-model="createForm.hrName" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="tabs='list',resetForm('createForm')">取 消</el-button>
                                    <el-button type="primary" @click="createDepartment('createForm')">确 定</el-button>
                                </el-form-item>

                            </el-form>
                        </el-collapse-item>
                        <el-collapse-item title="新建部门列表" name="NewDepartmentList">
                            <el-table
                                    :data="buildingList"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="departmentId"
                                        label="部门编号"
                                        sortable
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="部门名称"
                                        width="150">
                                </el-table-column>
                                <el-table-column align="right">
                                    <template slot-scope="scope">
                                        <el-button plain @click="schedule(scope.row)"
                                                   style="margin-right: 15px;">进 度
                                        </el-button>
                                        <el-button type="danger" plain @click="delDepartment(scope.row)"
                                                   style="margin-right: 15px;">删 除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="职位管理" name="jobs">
                    <el-row style="height: 550px">
                        <el-col :span="12">
                            <div style="padding: 30px">
                                <el-card class="box-card" style="height: 500px">
                                    <div slot="header" class="clearfix">
                                        <span>部门列表</span>
                                        <span style="margin-left: 320px;color: #a5a5a5"> <i class="el-icon-warning-outline"/>
                                            表示未激活的新建部门</span>

                                    </div>
                                    <div>
                                        <el-table :data="allDepartmentList" :show-header="false"
                                                  :highlight-current-row="true" @row-click="getJobList">
                                            <el-table-column prop="name">
                                            </el-table-column>
                                            <el-table-column prop="status" width="40">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-warning-outline"
                                                       v-if="scope.row.status==='create'"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>

                                    </div>
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div style="padding: 30px">
                                <el-card class="box-card" style="height: 500px">
                                    <div slot="header" class="clearfix">
                                        <span>职位列表</span>
                                        <el-button style="float: right; padding: 3px 0" type="text"
                                                   @click="showJobForm">新增职位
                                        </el-button>
                                    </div>
                                    <div>
                                        <el-table :data="jobList" :show-header="false"
                                                  :highlight-current-row="true">
                                            <el-table-column prop="name">
                                                <template slot-scope="scope">
                                                    <el-popover trigger="hover" placement="top">
                                                        <p>名称: {{ scope.row.name }}</p>
                                                        <p>职级: {{ scope.row.grade }}</p>
                                                        <div slot="reference" class="name-wrapper">
                                                            {{ scope.row.name }}
                                                        </div>
                                                    </el-popover>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="delete" width="40">
                                                <template slot-scope="scope">
                                                    <i class="el-icon-delete" @click="deleteJobInfo(scope.row)"></i>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog
                title="确认删除"
                :visible.sync="showDeleteDialog"
                width="30%">
            <span>确认要删除{{deleteDepartment.departmentId}}的信息吗？</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="showDeleteDialog = false">取 消</el-button>
                    <el-button type="danger" @click="confirmDelete">删 除</el-button></span>
        </el-dialog>
        <el-dialog title="修改部门信息"
                   :visible.sync="showChangeForm"
                   :close-on-click-modal="false"
                   @close="showChangeForm=false,resetForm('changeForm')"
                   width="35%">
            <el-form :model="changeForm" ref="changeForm" :rules="changeRules" hide-required-asterisk
                     label-width="100px"
                     style="padding:25px;">
                <el-form-item label="部门编号" prop="departmentId">
                    <el-input v-model="changeForm.departmentId" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="changeForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="hr工号" prop="hrId">
                    <el-input v-model="changeForm.hrId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="hr名称" prop="hrName">
                    <el-input v-model="changeForm.hrName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showChangeForm = false">取 消</el-button>
                <el-button type="primary" @click="updateDepartment('changeForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增职位"
                   :visible.sync="showCreateJobForm"
                   :close-on-click-modal="false"
                   @close="showCreateJobForm=false, resetForm('createJobForm')"
                   width="35%">
            <el-form :model="createJobForm" ref="createJobForm" :rules="createJobRules" label-width="100px"
                     hide-required-asterisk style="padding:25px;">
                <el-form-item label="部门编号" prop="departmentId">
                    <el-input disabled v-model="selectedDepartmentId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职位名称" prop="name">
                    <el-input v-model="createJobForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职级" prop="grade">
                    <el-select v-model="createJobForm.grade">
                        <el-option
                                v-for="item in gradeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showCreateJobForm = false">取 消</el-button>
                <el-button type="primary" @click="createJobInfo('createJobForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-drawer
                title="入职进度"
                :visible.sync="drawer"
                direction="btt"
                :show-close=false>
                <span>
                    <el-steps :active="stepNumber" simple finish-status="success" style="width: 1000px;margin: auto">
                        <el-step title="创建资料" description="建立新入职员工的档案资料。"></el-step>
                        <el-step title="设置职位"></el-step>
                        <el-step title="完成"></el-step>
                    </el-steps>
                </span>
        </el-drawer>
        <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </el-popover>
    </div>
</template>

<script>
    export default {
        name: "Department",
        data() {
            return {
                showCreateJobForm: false,
                showDeleteDialog: false,
                showChangeForm: false,
                drawer: false,
                createJobForm: {},
                allJobList: [],
                allDepartmentList: [],
                stepNumber: 1,
                deleteDepartment: {},
                tabs: 'list',
                changeForm: {},
                departmentList: [],
                jobList: [],
                selectedDepartmentId: '',
                selectedDepartmentStatus: '',
                gradeList: [
                    {'value': '1', 'label': '1'}, {
                        'value': '2', 'label': '2'
                    }, {'value': '3', 'label': '3'},
                    {'value': '4', 'label': '4'}
                ],
                typeList: [
                    {'value': '1', 'label': '职能线'}, {
                        'value': '2', 'label': '服务线'
                    }, {'value': '3', 'label': '业务线'}],
                createForm: {},
                buildingList: [],
                rules: {
                    name: [
                        {required: true, message: '请输入部门名称', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'},
                    ],
                    ministerId: [
                        {required: true, message: '请输入主管工号', trigger: 'blur'},
                    ],
                    ministerName: [
                        {required: true, message: '请输入主管姓名', trigger: 'blur'},
                    ],
                    hrId: [
                        {required: true, message: '请输入hr工号', trigger: 'blur'},
                    ],
                    hrName: [
                        {required: true, message: '请输入hr姓名', trigger: 'blur'},
                    ],

                },
                changeRules: {
                    departmentId: [
                        {required: true, message: '', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入部门名称', trigger: 'blur'},
                    ],
                    hrId: [
                        {required: true, message: '请输入hr工号', trigger: 'blur'},
                    ],
                    hrName: [
                        {required: true, message: '请输入hr名称', trigger: 'blur'},
                    ],
                },
                createJobRules: {
                    name: [
                        {required: true, message: '请输入职位名称', trigger: 'blur'},
                    ],
                    grade: [
                        {required: true, message: '请选择职级', trigger: 'change'},
                    ],
                }
            }
        },
        methods: {
            deleteJobInfo(row) {
                let that = this;
                that.$http.post("/hrms/job/del", {'id': row.id}).then(function (res) {
                    if (res.data.status === 'ok') {
                        //TODO:刷新组件
                    } else if (res.data.status === 'wrong') {
                        that.$message({message: "该职位人数不为0，无法删除。", type: "warning"})
                    } else {
                        that.$message({message: "删除失败，请稍后再试。", type: "error"})
                    }
                })
            },
            showJobForm() {
                if (this.selectedDepartmentId === '') {
                    this.$message({message: '请选择一个部门。', type: 'warning'})
                } else
                    this.showCreateJobForm = true;
            },
            createJobInfo(form) {
                let that = this;
                that.$refs[form].validate((valid) => {
                    if (valid) {
                        that.$http.post("/hrms/job/create", {
                            'departmentId': that.selectedDepartmentId,
                            'status': that.selectedDepartmentStatus,
                            'name': that.createJobForm.name,
                            'grade': that.createJobForm.grade,
                        }).then(function (res) {
                            that.showCreateJobForm = false;
                            if (res.data.status === 'ok') {
                                //TODO:刷新组件
                            } else {
                                that.$message({message: "创建失败，请稍后再试。", type: "error"})
                            }
                        })
                    }
                });
            },
            getJobList(row) {
                let list = [];
                for (let i = 0; i < this.allJobList.length; i++) {
                    if (this.allJobList[i].departmentId === row.departmentId) {
                        list.push(this.allJobList[i]);
                    }
                }
                this.selectedDepartmentId = row.departmentId;
                this.selectedDepartmentStatus = row.status;
                this.jobList = list;
            },
            schedule(row) {
                if (row.status === 'create') {
                    this.stepNumber = 1;
                }
                this.drawer = true;
            },
            handleTab(tab) {
                let that = this;
                if (tab.name === 'list') {
                    that.$http.get('/hrms/department/list').then(function (res) {
                        if (res.data.status === 'ok') {
                            that.departmentList = JSON.parse(res.data.content);
                        } else
                            that.$message("加载失败，稍后再试。");
                    })
                }
                if (tab.name === 'add') {
                    that.$http.get("/hrms/building/list").then(function (res) {
                        if (res.data.status === 'ok') {
                            that.buildingList = JSON.parse(res.data.content);
                        } else {
                            that.$message("加载出错，请稍后再试。");
                        }
                    })
                }
                if (tab.name === 'jobs') {
                    that.$http.get("/hrms/department/list/all").then(function (res) {
                        if (res.data.status === 'ok') {
                            that.allDepartmentList = JSON.parse(res.data.content);
                        } else {
                            that.$message("加载出错，请稍后再试。");
                        }
                    })
                    that.$http.get("/hrms/job/list").then(function (res) {
                        if (res.data.status === 'ok') {
                            that.allJobList = JSON.parse(res.data.content);
                        } else {
                            that.$message("加载出错，请稍后再试。");
                        }
                    })
                }
            },
            resetForm(form) {
                this.$refs[form].clearValidate();
                this.$refs[form].resetFields()
            },
            createDepartment(createForm) {
                let that = this;
                this.$refs[createForm].validate((valid) => {
                    if (valid) {
                        that.$http.post("/hrms/department/create", {
                            'name': that.createForm.name,
                            'type': that.createForm.type,
                            'ministerId': that.createForm.ministerId,
                            'ministerName': that.createForm.ministerName,
                            'hrId': that.createForm.hrId,
                            'hrName': that.createForm.hrName,
                        }).then(function (res) {
                            if (res.data.status === 'ok') {
                                //TODO: 刷新组件
                                that.$message({
                                    message: '创建成功！',
                                    type: 'success'
                                });
                            } else if (res.data.status === 'wrong') {
                                that.$message({
                                    message: '输入信息不匹配，请检查输入值！',
                                    type: 'warning'
                                });
                            } else {
                                that.$message({
                                    message: '创建失败，请稍后再试。',
                                    type: 'error'
                                });
                            }
                        })
                    }
                });

            },
            openChangeForm(row) {
                this.$set(this.changeForm, 'departmentId', row.departmentId);
                this.$set(this.changeForm, 'name', row.name);
                this.$set(this.changeForm, 'hrId', row.hrId);
                this.$set(this.changeForm, 'hrName', row.hrName);
                this.showChangeForm = true;
            },
            updateDepartment(changeForm) {
                let that = this;
                that.$refs[changeForm].validate((valid) => {
                    if (valid) {
                        that.$http.post("/hrms/department/update", {
                            'departmentId': that.changeForm.departmentId,
                            'name': that.changeForm.name,
                            'hrId': that.changeForm.hrId,
                            'hrName': that.changeForm.hrName,
                        }).then(function (res) {
                            if (res.data.status === 'ok') {
                                //TODO:刷新组件
                                that.showChangeForm = false;
                            } else {
                                that.$message({message: "创建失败，请稍后再试。", type: "error"})
                            }
                        })
                    }
                });
            },
            delDepartment(row) {
                this.deleteDepartment = row;
                this.showDeleteDialog = true;
            },
            confirmDelete() {
                let that = this;
                if (this.deleteDepartment.status === 'enable') {
                    this.$http.post('/hrms/department/del', {'departmentId': that.deleteDepartment.departmentId}).then(function (res) {
                        if (res.data.status === 'ok') {
                            //TODO: 刷新组件
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else if (res.data.status === 'wrong') {
                            that.$message({
                                message: '该部门人数不为0或存在未入职员工，删除失败。',
                                type: 'warning'
                            });
                        } else
                            that.$message({
                                message: '删除失败，请稍后再试。',
                                type: 'error'
                            });
                    });
                } else if (this.deleteDepartment.status === 'create') {
                    this.$http.post('/hrms/building/del', {'departmentId': that.deleteDepartment.departmentId}).then(function (res) {
                        if (res.data.status === 'ok') {
                            //TODO: 刷新组件
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        } else
                            that.$message({
                                message: '删除失败，请稍后再试。',
                                type: 'warning'
                            });
                    });
                }
                this.showDeleteDialog = false;
            },

        },
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
        background-color: #FFFFFF;
        /* display: flex;
         margin: 0;
         background-color: rgb(255, 255, 255);
         padding-left: 10px;
         line-height: 80px;*/
    }
</style>