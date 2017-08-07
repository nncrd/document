const router = [{
  path: '/',
  name: 'Register',
  component:resolve => require(['../components/RegisterVux.vue'], resolve)
},{
  path: '/SuccessMsg',
  name: 'SuccessMsg',
  component:resolve => require(['../components/SuccessMsg.vue'], resolve)
},{
  path: '/EventReporter',
  name: 'EventReporter',
  component:resolve => require(['../components/EventReporter.vue'], resolve)
}]
export default router
