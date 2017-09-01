import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import axios from 'axios'
import './config/rem'
import 'normalize.css'

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

Vue.prototype.$ajax = axios;
new Vue({
  //el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
