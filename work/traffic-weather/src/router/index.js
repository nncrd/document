import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/view/Main'
import HelloWorld2 from '@/components/view/HelloWorld2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/2',
      name: 'HelloWorld2',
      component: HelloWorld2
    }
  ]
})
