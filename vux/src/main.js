// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Register from './components/RegisterVux'
import SuccessMsg from './components/SuccessMsg'
import EventReporter from './components/EventReporter'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Register
},{
  path: '/SuccessMsg',
  name: 'SuccessMsg',
  component: SuccessMsg
},{
  path: '/EventReporter',
  name: 'EventReporter',
  component: EventReporter
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  //render: h => h(App)
  template: '<App/>',
  components: { App }
}).$mount('#app-box')
