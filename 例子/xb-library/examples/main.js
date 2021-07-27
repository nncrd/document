import { createApp } from 'vue'
import App from './App.vue'

// 导入组件库
import library from './../packages'
const xbApp = createApp(App)
xbApp.use(library)
xbApp.mount('#app')
