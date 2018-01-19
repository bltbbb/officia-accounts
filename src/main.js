// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import router from './router'
import http from './axios/http'
import VueCookie from 'vue-cookie'
import './assets/css/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueCookie);

Vue.prototype.$http = http;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
