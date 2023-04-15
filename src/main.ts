import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.css'
import App from './App.vue'
import router from './router'
import pinia from './store'
import icons from './global/register-icons'
import cache from './global/loadLocalCache'
// import zhCn from './global/zhCn_Element'

const app = createApp(App)
app.use(icons)
// 全局配置
// app.use(zhCn)
app.use(pinia)
app.use(cache)
app.use(router)

app.mount('#app')
