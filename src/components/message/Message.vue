<template>
    <div style="margin: 10px">
        <div class="header">
            <b>消息中心</b>
            <i class="el-icon-arrow-right"></i>
            <b>全部消息</b>
        </div>
        <div class="body">
            <el-table :data="messageList" @row-click="readMessage" :show-header="false">
                <el-table-column prop="content" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTime" width="130">
                </el-table-column>
                <el-table-column prop="icon" width="50">
                    <template slot-scope="scope">
                        <el-badge is-dot class="item" v-if="scope.row.status==='unread'"></el-badge>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
                title="消息"
                :visible.sync="showMessage"
                width="30%">
            <span>{{message.content}}</span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                showMessage: false,
                messageList: [],
                message: {},
            }
        },
        methods: {
            readMessage(row) {
                this.message = row;
                this.showMessage = true;
                let that = this;
                that.$http.post("/message/read", {"id": row.id}).then(function (res) {
                        if (res.data.status === 'ok') {
                            that.message = JSON.parse(res.data.content);
                        } else that.$message({message: '加载出错，请稍后再试', type: 'error'})
                    }
                )
            }
        },
        mounted: function () {
            let that = this;
            that.$http.get("/message/all").then(function (res) {
                    if (res.data.status === 'ok') {
                        that.messageList = JSON.parse(res.data.content);
                    } else that.$message({message: '加载出错，请稍后再试', type: 'error'})
                }
            )
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
        height: 630px;

    }
</style>