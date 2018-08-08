import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/view/HelloWorld'
import HelloWorld2 from '@/components/view/HelloWorld2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/2',
      name: 'HelloWorld2',
      component: HelloWorld2
    }
  ]
})
