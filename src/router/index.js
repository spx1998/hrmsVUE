import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import home from "../components/home";
import forgetPwd from "../components/forgetPwd";
import navigation from "@/components/navigation";
import StaffBaseInfo from "@/components/StaffBaseInfo";
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
        children:[
            {
                path:'/个人资料',
                name:'StaffBaseInfo',
                component:StaffBaseInfo,
            },
            {
                path:'/baseinfo',
                name:'StaffBaseInfo',
                component:StaffBaseInfo,
            }
        ]
    }
];
export default new Router({
    routes: index
})
