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
                            <i :class="item.icon"></i>
                            <span>{{item.modName}}</span>
                        </template>
                        <el-menu-item :index="sub.path" v-for="sub in item.submodName" :key="sub.name">
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
