import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import home from "../components/home";
import forgetPwd from "../components/forgetPwd";
import navigation from "@/components/navigation";
import StaffBaseInfo from "@/components/infomation/StaffBaseInfo";
import StaffCareerInfo from "@/components/infomation/StaffCareerInfo";
import StaffList from "@/components/personnel/StaffList";
import StaffDetail from "@/components/personnel/StaffDetail";
import StaffTransfer from "@/components/personnel/StaffTransfer";
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
            },
            {
                path:'/careerinfo',
                name:'StaffCareerInfo',
                component:StaffCareerInfo,
            },
            {
                path:'/stafflist',
                name:'StaffList',
                component:StaffList,
            },
            {
                path:'/员工管理',
                name:'StaffList',
                component:StaffList,
            },
            {
                path:'/staffdetail/:staffId',
                name:'StaffDetail',
                component:StaffDetail,
            },
            {
                path:'/stafftransfer',
                name:'StaffTransfer',
                component:StaffTransfer,
            }
        ]
    }
];
export default new Router({
    routes: index
})
