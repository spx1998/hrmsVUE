<template>
    <div style="margin: 10px">
        <div class="header">
            <b>个人资料</b>
            <i class="el-icon-arrow-right"></i>
            <b>基本资料</b>
        </div>
        <div class="flexLayout">
            <div class="left">
                <el-form ref="baseInfo" :model="baseInfo" label-width="80px" style="padding:30px;width: 400px">
                    <el-form-item label="职工号">
                        <el-input v-model="baseInfo.staffId" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="baseInfo.name" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="baseInfo.sex" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input v-model="baseInfo.birthday" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-input  v-model="baseInfo.email" disabled auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input v-model="baseInfo.phoneNumber" disabled auto-complete="off"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="">修改资料</el-button>

                    </el-form-item>
                </el-form>
            </div>
           <div class="right"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StaffBaseInfo",
        data() {
            return {
                baseInfo:{},
            }
        },
        mounted: function () {
            let that =this;
            this.$http.get('/info/base').then(function (res) {
                if(res.data.status==='ok'){
                    let data = JSON.parse(res.data.content);
                    if(data.sex==="0"){
                        data.sex='男';
                    }else {
                        data.sex='女';
                    }
                    let birthday = data.birthday+"年";
                    birthday=birthday.replace(',','日');
                    var date = birthday.split(" ");
                    birthday = date[2]+date[0]+date[1];
                    data.birthday=birthday;
                    that.baseInfo = data;
                }else {
                    that.$alert("加载失败，请稍后再试。");
                }
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

    .flexLayout {

        display: flex;
        margin: 0;
        background-color: rgb(255, 255, 255);
        padding-left: 10px;
        line-height: 80px;
        height: 16cm;

    }

    .flexLayout .left {

        flex:0 0 600px;

        height: 100%;

    }

    .flexLayout .right {

        flex: 1;

        height: 100%;

    }
</style>