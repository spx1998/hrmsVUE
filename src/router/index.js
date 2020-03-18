import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import home from "../components/home";
Vue.use(Router)
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
    }
]
export default new Router({
    routes: index
})
