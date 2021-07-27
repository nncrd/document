/*
 * @Author: jing.chen
 * @Date: 2020-10-29 17:15:53
 * @LastEditors: jing.chen
 * @LastEditTime: 2020-10-29 17:19:06
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.config.productionTip = false

let install = null;
function render(props) {
  install = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else {
  render();
}
export async function bootstrap(props) {

}

export async function mount(props) {
  render(props);
}
export async function unmount(props) {
  install.$destroy();
}