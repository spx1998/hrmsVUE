import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import VueRouter from 'vue-router'
import router from './router'

import http from './http';  //此处问http文件的路径

Vue.prototype.$http = http;
Vue.config.productionTip = false
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
