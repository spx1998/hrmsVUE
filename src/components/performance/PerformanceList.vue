<template>
    <div style="margin: 10px">
        <div class="header">
            <b>绩效考勤</b>
            <i class="el-icon-arrow-right"></i>
            <b>考核清单</b>
        </div>
        <div class="body">
            <el-table :data="performanceList">
                <el-table-column
                        prop="staffId"
                        label="职工号">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
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
                <el-table-column align="right">
                    <template slot="header" slot-scope="scope">
                        <el-date-picker
                                v-model="month"
                                value-format="yyyyMM"
                                @change="getPerformanceListByMonth"
                                :clearable=false
                                type="month"
                                placeholder="选择月份"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </template>
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status===0" @click="showScore(scope.row)"
                                   style="margin-right: 15px;">
                            评 分
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="考核评分"
                       :visible.sync="showScoreForm"
                       :close-on-click-modal="false"
                       @close="showScoreForm=false"
                       width="35%">
                <el-form :model="scoreForm" ref="scoreForm" :rules="scoreRules" label-width="100px"
                         hide-required-asterisk style="padding:25px;">
                    <el-form-item label="员工工号" prop="staffId">
                        <el-input disabled v-model="scoreForm.staffId" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="评分" prop="score">
                        <el-input-number v-model="scoreForm.score" :step=5 controls-position="right" :min="0"
                                         :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="scoreForm.remark" type="textarea" :rows="4" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showScoreForm = false">取 消</el-button>
                    <el-button type="primary" @click="score('scoreForm')">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    export default {
        name: "PerformanceList",
        data() {
            return {
                showScoreForm: false,
                scoreForm: {},
                performanceList: [],
                month: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e7;
                    },
                },
                scoreRules: {
                    score: [
                        {required: true, message: '请输入评分', trigger: 'change'},
                    ],
                }
            }
        },
        methods: {
            score(form) {
                let that = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        that.$http.post("/performance/score", {
                            "staffId": that.scoreForm.staffId,
                            "performanceLevel": that.scoreForm.score,
                            "remark": that.scoreForm.remark,
                            "month": that.scoreForm.month
                        }).then(function (res) {
                            if (res.data.status === 'ok') {
                                //TODO: 刷新路由
                                that.$message({message: '完成评分', type: 'success'});
                                that.showScoreForm = false;
                            } else that.$message({message: '加载出错，请稍后再试', type: 'error'})
                        })
                    }
                })
            },
            showScore(row) {
                let date = new Date();
                let dateStr;
                if (date.getMonth() < 10) {
                    dateStr = "" + date.getFullYear() + "0" + (date.getMonth() + 1)
                } else
                    dateStr = "" + date.getFullYear() + "" + (date.getMonth() + 1)
                if (row.month === dateStr) {
                    this.showScoreForm = true;
                    this.$set(this.scoreForm, 'staffId', row.staffId);
                    this.$set(this.scoreForm, 'month', row.month);
                    this.$set(this.scoreForm, 'score', 60);
                } else this.$message("只可以为当前月份打分");
            },
            getPerformanceListByMonth() {
                let that = this;
                throw that.$http.get("/performance/month/list?month=" + that.month).then(function (res) {
                    if (res.data.status === 'ok') {
                        that.performanceList = JSON.parse(res.data.content);
                    } else that.$message({message: '加载出错，请稍后再试', type: 'error'})
                })
            }
        },
        mounted: function () {
            let that = this;
            that.$http.get('/performance/staff/list').then(function (res) {
                if (res.data.status === 'ok') {
                    that.performanceList = JSON.parse(res.data.content);
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