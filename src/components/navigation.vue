<template>
    <div class="flexLayout">
        <div class="left">
            <el-menu
                    default-active="0"
                    class="el-menu-vertical-demo"
                    router
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b" style="position: absolute;height: 100%;width:200px">
                <div v-for="item in navData" :key="item.modName">
                    <el-submenu :index="item.modName">
                        <template slot="title">
                            <span>{{item.modName}}</span>
                        </template>
                        <el-menu-item :index="sub.path" v-for="sub in item.submodName" :key="sub">
                            <template slot="title">
                                <span>{{sub.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
        <div class="right">
            <div>
                <transition name="move" mode="out-in">
                    <!--这里的router-view用来渲染子页面-->
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "navigation",
        data() {
            return {
                navData: [],
            }
        },
        methods: {},
        mounted: function () {
            let that = this;
            this.$http.get("/navigate").then(function (res) {
                if (res.data.status === 'ok') {
                    that.navData = JSON.parse(res.data.content);
                } else {
                    that.$alert("加载出错，将为您退出登录，请您稍后再试。");
                }
            });

        }
    }
</script>

<style scoped>
    @import "../assets/css/nav.css";
    @import "../assets/font/iconfont.css";

    .flexLayout {

        display: flex;

        height: 100%;

        width: 100%;

    }

    .flexLayout .left {

        flex: 0 0 200px;

        height: 100%;

    }

    .flexLayout .right {

        flex: 1;

        height: 100%;

    }
</style>

<!--<template>-->
<!--    <div class="home">-->

<!--        <el-row>-->
<!--            &lt;!&ndash;      <el-col :span="4" v-for="project in allprojects" :key="project.pid" :offset="1">&ndash;&gt;-->
<!--            <el-col :span="6" v-for="data in navigation" :key="data.moduleId" :offset="0" style="margin-bottom:50px">-->
<!--                <el-card :body-style="{ padding: '0px' }" class="card" shadow="always"-->
<!--                         @click.native="navigateTo(data.name)">-->
<!--                    <img :src="data.url"-->
<!--                         class="image" alt="">-->
<!--                    <div class="cardTitle">-->
<!--                        {{data.name}}-->
<!--                    </div>-->
<!--                </el-card>-->
<!--            </el-col>-->
<!--        </el-row>-->

<!--    </div>-->
<!--</template>-->

<!--<script type="text/javascript">-->
<!--    export default {-->
<!--        data() {-->
<!--            return {-->
<!--                navigation: [],-->
<!--            }-->

<!--        },-->
<!--        methods: {},-->
<!--        mounted: function () {-->
<!--            let that = this;-->
<!--            this.$http.get('/navigate').then(function (res) {-->
<!--                if (res.data.status === 'ok') {-->
<!--                    that.navigetion = JSON.parse(res.data.content);-->
<!--                    console.log(12312312)-->
<!--                } else {-->
<!--                    that.$alert("加载出错，将为您退出登录，请您稍后再试。");-->
<!--                }-->
<!--            })-->
<!--        }-->
<!--    }-->

<!--</script>-->

<!--<style scoped>-->

<!--    .home {-->
<!--        position: absolute;-->
<!--        left: 3.5%;-->
<!--        top: 15%;-->
<!--        /*background-color: #e6e7e4;*/-->
<!--    }-->

<!--    .card {-->
<!--        width: 310px;-->
<!--    }-->

<!--    .image {-->
<!--        width: 290px;-->
<!--        height: 290px;-->
<!--        display: block;-->
<!--        margin: auto;-->
<!--    }-->

<!--    .cardTitle {-->
<!--        padding: 18px;-->
<!--        text-align: center;-->
<!--    }-->


<!--</style>-->