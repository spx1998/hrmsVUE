<template>
    <div style="margin: 10px">
        <div class="header">
            <b>HRMS管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>部门管理</b>
        </div>
        <div class="body">
            <el-tabs v-model="tabs" type="card" style="padding: 10px">
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
                                width="200">
                        </el-table-column>
                        <el-table-column align="right" prop="button">
                            <template scope="scope">
                                <el-button plain @click="openChangeForm(scope.row)" style="margin-right: 55px;">修改
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="新增部门" name="add">
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
                </el-tab-pane>
                <el-tab-pane label="职位管理" name="jobs">
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="修改Hr"
                   :visible.sync="showChangeForm"
                   :close-on-click-modal="false"
                   @close="showChangeForm=false,resetForm('changeForm')"
                   width="35%">
            <el-form :model="changeForm" ref="changeForm" :rules="changeRules" label-width="100px"
                     style="padding:25px;">
                <el-form-item label="hr工号" prop="hrId">
                    <el-input v-model="changeForm.hrId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="hr名称" prop="hrName">
                    <el-input v-model="changeForm.hrName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showChangeForm = false">取 消</el-button>
                <el-button type="primary" @click="changeHr('changeForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Department",
        data() {
            return {
                tabs: 'list',
                showCreateForm: false,
                showChangeForm: false,
                changeForm: {},
                departmentList: [],
                typeList: [
                    {'value': '1', 'label': '职能线'}, {
                        'value': '2', 'label': '服务线'
                    }, {'value': '3', 'label': '业务线'}],
                createForm: {},
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
                    hrId: [
                        {required: true, message: '请输入hr工号', trigger: 'blur'},
                    ],
                    hrName: [
                        {required: true, message: '请输入hr名称', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
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
                            //TODO: 刷新组件
                        })
                    }
                });

            },
            openChangeForm(row) {
                this.changeForm.departmentId = row.departmentId;
                this.showChangeForm = true;
            },
            changeHr(changeForm) {
                let that = this;
                that.$refs[changeForm].validate((valid) => {
                    if (valid) {
                        that.$http.post("/hrms/department/changehr", {
                            'departmentId': that.changeForm.departmentId,
                            'hrId': that.changeForm.hrId,
                            'hrName': that.changeForm.hrName,
                        }).then(function (res) {
                            //TODO:刷新组件
                        })
                    }
                });
            }
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