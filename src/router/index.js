import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/common/login";
import home from "../components/common/home";
import forgetPwd from "../components/common/forgetPwd";
import navigation from "@/components/common/navigation";
import StaffBaseInfo from "@/components/infomation/StaffBaseInfo";
import StaffCareerInfo from "@/components/infomation/StaffCareerInfo";
import StaffList from "@/components/personnel/StaffList";
import StaffDetail from "@/components/personnel/StaffDetail";
import StaffTransfer from "@/components/personnel/StaffTransfer";
import Department from "@/components/hrms/Department";
import Authority from "@/components/hrms/Authority";
import Advertise from "@/components/personnel/Advertise";
import PerformanceList from "@/components/performance/PerformanceList";
import PerformanceHistory from "@/components/performance/PerformanceHistory";
import Vacation from "@/components/performance/Vacation";
import VacationApplication from "@/components/performance/VacationApplication";
import Approve from "@/components/message/Approve";
import Unread from "@/components/message/Unread";
import Message from "@/components/message/Message";
import ApplicationDetail from "@/components/message/ApplicationDetail";

Vue.use(Router);
const index = [
        {
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/home',
            name: 'home',
            component: home,
        },
        {
            path: '/forgetPwd',
            name: 'forgetPwd',
            component: forgetPwd,
        },

        {
            path: '/navigation',
            name: 'navigation',
            component: navigation,
            children: [
                {
                    path: '/个人资料',
                    name: 'StaffBaseInfo',
                    component: StaffBaseInfo,
                },
                {
                    path: '/baseinfo',
                    name: 'StaffBaseInfo',
                    component: StaffBaseInfo,
                },
                {
                    path: '/careerinfo',
                    name: 'StaffCareerInfo',
                    component: StaffCareerInfo,
                },
                {
                    path: '/stafflist',
                    name: 'StaffList',
                    component: StaffList,
                },
                {
                    path: '/员工管理',
                    name: 'StaffList',
                    component: StaffList,
                },
                {
                    path: '/staffdetail/:staffId',
                    name: 'StaffDetail',
                    component: StaffDetail,
                },
                {
                    path: '/stafftransfer',
                    name: 'StaffTransfer',
                    component: StaffTransfer,
                },
                {
                    path: '/HRMS管理',
                    name: 'Department',
                    component: Department,
                },
                {
                    path: '/department',
                    name: 'Department',
                    component: Department,
                }, {
                    path: '/authority',
                    name: 'Authority',
                    component: Authority,
                }, {
                    path: '/advertise',
                    name: 'Advertise',
                    component: Advertise,
                }, {
                    path: '/performancelist',
                    name: 'PerformanceList',
                    component: PerformanceList,
                }, {
                    path: '/performancehistory',
                    name: 'PerformanceHistory',
                    component: PerformanceHistory,
                }, {
                    path: '/绩效考勤',
                    name: 'Vacation',
                    component: Vacation,
                }, {
                    path: '/vacation',
                    name: 'Vacation',
                    component: Vacation,
                }, {
                    path: '/vacation/application',
                    name: VacationApplication,
                    component: VacationApplication,
                }, {
                    path: '/approve',
                    name: Approve,
                    component: Approve,
                }, {
                    path: '/unread',
                    name: Unread,
                    component: Unread,
                }, {
                    path: '/message',
                    name: Message,
                    component: Message,
                }, {
                    path: '/消息中心',
                    name: Unread,
                    component: Unread,
                }, {
                    path: '/applicationdetail/:id',
                    name: ApplicationDetail,
                    component: ApplicationDetail,
                },

            ]
        }
    ]
;
export default new Router({
    routes: index
})
