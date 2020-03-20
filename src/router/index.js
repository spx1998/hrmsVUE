import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import home from "../components/home";
import forgetPwd from "../components/forgetPwd";
import navigation from "@/components/navigation";
Vue.use(Router);
const index = [
    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/home',
        name:'home',
        component:home,
    },
    {
        path:'/forgetPwd',
        name:'forgetPwd',
        component:forgetPwd,
    },
    {
        path:'/navigation',
        name:'navigation',
        component:navigation,

    }
];
export default new Router({
    routes: index
})
