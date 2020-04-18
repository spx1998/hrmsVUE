<template>
    <div style="margin: 10px">
        <div class="header">
            <b>员工管理</b>
            <i class="el-icon-arrow-right"></i>
            <b>职员详情</b>
        </div>
        <div class="body">
            <div style="margin: auto ">
                <el-form ref="staffDetail" :model="staffDetail" label-width="80px"
                         :hide-required-asterisk="true" :rules="rules" style="padding:30px;width: 400px;height:550px;">
                    <el-form-item label="职工号" prop="staffId">
                        <el-input v-model="staffDetail.staffId" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="staffDetail.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="staffDetail.sex">
                            <el-option
                                    v-for="item in sexList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="departmentId">
                        <el-select v-model="staffDetail.departmentId"
                                   @change="updateDepartmentJobList">
                            <el-option
                                    v-for="item in departmentList"
                                    :key="item.departmentId"
                                    :label="item.name"
                                    :value="item.departmentId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务" prop="jobId">
                        <el-select v-model="staffDetail.jobId"
                                   @change="updateGrade">
                            <el-option
                                    v-for="item in departmentJobList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职级" prop="grade">
                        <el-input v-model="staffDetail.grade" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="民族" prop="nation">
                        <el-input v-model="staffDetail.nation" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker
                                v-model="staffDetail.birthday"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :placeholder=staffDetail.birthday>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="政治面貌" prop="politicalStatus">
                        <el-input v-model="staffDetail.politicalStatus" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学历" prop="education">
                        <el-input v-model="staffDetail.education" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业院校" prop="school">
                        <el-input v-model="staffDetail.school" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-input v-model="staffDetail.hireDate" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工龄">
                        <el-input v-model="staffDetail.seniority" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="签约日期">
                        <el-input v-model="staffDetail.contractStart" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="到期日期">
                        <el-input v-model="staffDetail.contractEnd" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="email" prop="email">
                        <el-input v-model="staffDetail.email" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phoneNumber">
                        <el-input v-model="staffDetail.phoneNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="staffDetail.address" type="textarea" :rows="4"
                                  auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="text-align:center">
                            <el-button type="primary" @click="updateStaff">修 改</el-button>
                            <el-button type="primary" plain @click="back">返 回</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import DateUtils from "@/FormatDate";

    export default {
        name: "StaffDetail",
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
                    value: 0,
                    label: '男'
                }, {
                    value: 1,
                    label: '女'
                }],
                jobList: [],
                departmentList: [],
                departmentJobList: [],
                staffDetail: {},
                rules: {
                    staffId: [
                        {required: true, message: '请输入职工工号', trigger: 'blur'},
                    ],
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
                    jobId: [
                        {required: true, message: '请选择职务', trigger: 'change'},
                    ],
                    email: [
                        {required: true, message: '请输入email', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    phoneNumber: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkPhone, trigger: ['blur', 'change']}
                    ],
                    nation: [
                        {required: true, message: '请输入民族', trigger: 'change'},
                    ],
                    politicalStatus: [
                        {required: true, message: '请输入政治面貌', trigger: 'change'},
                    ],
                    education: [
                        {required: true, message: '请输入学历', trigger: 'change'},
                    ],
                    school: [
                        {required: true, message: '请输入毕业院校', trigger: 'change'},
                    ],
                },
            }
        },
        methods: {
            updateDepartmentJobList() {
                let list = [];
                for (let i = 0; i < this.jobList.length; i++) {
                    if (this.jobList[i].departmentId === this.staffDetail.departmentId) {
                        list.push(this.jobList[i]);
                    }
                }
                this.departmentJobList = list;
            },
            updateGrade() {
                let data;
                for (let i = 0; i < this.departmentJobList.length; i++) {
                    if (this.departmentJobList[i].id === this.staffDetail.jobId) {
                        data = this.departmentJobList[i].grade;
                        break;
                    }
                }
                this.staffDetail.grade = data;
            },
            back() {
                this.$router.push('/stafflist');
            },
            updateStaff() {
                let that = this;
                this.$http.post('/staff/update', {
                    'staffId': that.staffDetail.staffId,
                    'name': that.staffDetail.name,
                    'sex': that.staffDetail.sex,
                    'nation': that.staffDetail.nation,
                    'school': that.staffDetail.school,
                    'birthday': that.staffDetail.birthday,
                    'education': that.staffDetail.education,
                    'politicalStatus': that.staffDetail.politicalStatus,
                    'email': that.staffDetail.email,
                    'phoneNumber': that.staffDetail.phoneNumber,
                    'address': that.staffDetail.address,
                    'departmentId': that.staffDetail.departmentId,
                    'jobId': that.staffDetail.jobId,
                    'grade': that.staffDetail.grade,
                }).then((res) => {
                    if (res.data.status === 'ok') {
                        this.$message({message: "修改成功", type: "success"});
                    } else {
                        this.$message("修改失败");
                    }
                })
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
            this.$http.get('/staff/department/list').then(function (res) {
                if (res.data.status === 'ok') {
                    that.departmentList = JSON.parse(res.data.content);
                } else {
                    that.$message("加载出错，请稍后再试。");
                }
            });
            this.$http.get('/staff/info?staffId=' + this.$route.params.staffId).then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    for (let i = 0; i < that.jobList.length; i++) {
                        if (that.jobList[i].id === data.jobId) {
                            data.jobName = that.jobList[i].name;
                            break;
                        }
                    }
                    for (let i = 0; i < that.departmentList.length; i++) {
                        if (that.departmentList[i].departmentId === data.departmentId) {
                            data.departmentName = that.departmentList[i].name;
                            break;
                        }
                    }
                    for (let i = 0; i < that.jobList.length; i++) {
                        if (that.jobList[i].departmentId === data.departmentId) {
                            that.departmentJobList.push(that.jobList[i]);
                        }
                    }
                    data.hireDate = DateUtils.FormatDate(data.hireDate);
                    data.contractStart = DateUtils.FormatDate(data.contractStart);
                    data.contractEnd = DateUtils.FormatDate(data.contractEnd);
                    that.staffDetail = data;
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
        height: 600px;
        overflow: scroll;
    }
</style>