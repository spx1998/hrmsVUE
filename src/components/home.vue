<template>
    <div class="page">
        <div class="head">
            <div style="height: 60px;">
                <h3 style="margin-left: 15px;color: #FFFFFF">人力资源管理系统</h3>
            </div>
            <div style="margin-left: 84%;margin-top: 10px">
                <el-button type="text" style="color: #e40a04" @click="logout">退出登录</el-button>
            </div>
        </div>
        <div class="home">
            <el-row>
                <!--      <el-col :span="4" v-for="project in allprojects" :key="project.pid" :offset="1">-->
                <el-col :span="6" v-for="data in homeData" :key="data.moduleId" :offset="0" style="margin-bottom:50px">
                    <el-card :body-style="{ padding: '0px' }" class="card" shadow="always"
                             @click.native="navigateTo(data.name)">
                        <img :src="data.url"
                             class="image">
                        <div class="cardTitle">
                            {{data.name}}
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        beforeCreate() {
            document.querySelector('body').setAttribute('style', 'background:#e6e7e4')
        },
        beforeDestroy() {
            document.querySelector('body').setAttribute('style', '')
        },
        data() {
            return {
                preUrl: 'http://39.106.81.211:81',
                homeData: [],

            }
        },
        methods: {
            navigateTo(name) {
                this.$router.push(name);
            },
            logout(){
                sessionStorage.removeItem("token");
                this.$router.push("/");
            },

        },
        mounted: function () {
            let that = this;
            this.$http.get("/home").then(function (res) {
                if (res.data.status === 'ok') {
                    let data = JSON.parse(res.data.content);
                    for (let i = 0; i < data.length; i++) {
                        data[i].url = that.preUrl + data[i].url;
                    }
                    that.homeData = data;
                } else {
                    that.$alert("加载出错，将为您退出登录，请您稍后再试。");
                }
            });

        }
    }
</script>

<style scoped>
    .page {
        display: flex;

        flex-direction: column;
        align-content: flex-start;

        height: 100%;

        width: 100%;


    }

    .head {
        display: flex;
        background-color: #474f57;
    }
    .home {
        position: absolute;
        left: 3.5%;
        top: 15%;
        /*background-color: #e6e7e4;*/
    }

    .card {
        width: 310px;
    }

    .image {
        width: 280px;
        height: 280px;
        display: block;
        margin: auto;
    }

    .cardTitle {
        padding: 18px;
        text-align: center;
    }
</style>
