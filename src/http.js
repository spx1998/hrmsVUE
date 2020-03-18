import axios from 'axios';
import router from './router';
import th from "element-ui/src/locale/lang/th";

// axios 配置
axios.defaults.timeout = 8000;
// axios.defaults.baseURL = '/api';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        let token = sessionStorage.getItem('token');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        const status=response.status;
        if (status === 403) {
            router.replace('/');
        }
        return response;
    },
    error => {
        if(error.response.status===403){
            //TODO: 上线需修改

            // if("http://127.0.0.1:8888/admin/list"===error.response.request.responseURL){
            //     router.replace('/noAuths');
            // }else
                router.replace('/');
        }
        /*else {
            this.$alert("出现未知错误，请稍后重试。");
        }*/
        return Promise.reject(error);
    }
);



export default axios;
