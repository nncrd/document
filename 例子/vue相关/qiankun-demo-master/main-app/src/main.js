import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element);
import { registerMicroApps, start } from 'qiankun'

Vue.config.productionTip = false

const microAppNum = 3
let apps = [];
for (let i = 1; i <= microAppNum; i++) {
  apps.push(
    {
      name: '子应用child0' + i,
      entry: 'http://localhost:90' + i + '0',
      //fetch,
      container: '#vue',
      activeRule: '/child0' + i,
      props: { param01: i }
    }
  );
}
const config = {
    beforeLoad: [
        app => {
            console.log("%c before load",
            'background:#0f0 ; padding: 1px; border-radius: 3px;  color: #fff',
            app);
        }
    ], // 挂载前回调
    beforeMount: [
        app => {
            console.log("%c before mount",
            'background:#f1f ; padding: 1px; border-radius: 3px;  color: #fff',
            app);
        }
    ], // 挂载后回调
    afterUnmount: [
        app => {
            console.log("%c after unload",
            'background:#a7a ; padding: 1px; border-radius: 3px;  color: #fff',
            app);
        }
    ] // 卸载后回调
  }
registerMicroApps(apps, config);
let option = { prefetch: false }
start();


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
