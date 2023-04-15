import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import type { App } from 'vue'

function zhCnElement(app: App<Element>) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}

export default zhCnElement
