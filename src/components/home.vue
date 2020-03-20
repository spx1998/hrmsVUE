<template>
    <div class="home">
        <el-row>
            <!--      <el-col :span="4" v-for="project in allprojects" :key="project.pid" :offset="1">-->
            <el-col :span="6" v-for="(o, index) in 9" :key="o" :offset="0"  style="margin-bottom:50px">
                <el-card :body-style="{ padding: '0px' }" class="card" shadow="always" @click="">
                    <img src="http://39.106.81.211:81/picture/hrms-home-1.png"
                         class="image" alt="">
                    <div class="cardTitle">
                        好吃的汉堡
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "home",
        data(){

        },
        method:{

        }
    }
</script>

<style scoped>
    .home{
        position: absolute;
        left:3.5%;
        top: 15%;
        /*background-color: #e6e7e4;*/
    }
    .card {
        width: 310px;
    }

    .image {
        width: 100%;
        display: block;
    }

    .cardTitle {
        padding: 18px;
        text-align: center;
    }
</style>
