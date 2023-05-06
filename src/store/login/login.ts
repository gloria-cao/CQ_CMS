import { LOGIN_TOKEN, MENULIST, USERID, USERINFO } from '@/global/constance'
import router from '@/router'
import {
  accountLoginRequest,
  accountLogoutRequest,
  getMenuListByIdRequest,
  getUserInfoRequest,
  getVerifyCodeRequest
} from '@/service/login/login'
import type { IAcount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import type { ILoginState } from './type'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    verifyCode: '',
    token: '',
    userId: localCache.getCache(USERID ?? -1),
    menuList: [],
    userInfo: {}
  }),

  actions: {
    // 获取验证码
    async getVrifyCodeAction() {
      const verifyCodeResult = await getVerifyCodeRequest()
      const verifyCode = verifyCodeResult.data
      this.verifyCode = verifyCode
    },

    // 登录功能
    async accountLoginAction(account: IAcount) {
      const loginResult = await accountLoginRequest(account)

      if (loginResult.code !== 20000) {
        ElNotification({
          title: 'Error',
          message: `${loginResult.msg}`,
          type: 'error'
        })
      } else {
        const tokenValue = loginResult.data.tokenValue
        const userId = loginResult.data.loginId
        this.userId = Number(userId)
        this.token = tokenValue
        ElNotification({
          title: 'Success',
          message: `${loginResult.msg}`,
          type: 'success'
        })

        // 1.进行本地缓存
        localCache.setCache(LOGIN_TOKEN, this.token)
        localCache.setCache(USERID, this.userId)

        // 2.1 获取当前帐号的菜单数据
        const menuListResult = await getMenuListByIdRequest(
          localCache.getCache(USERID)
        )
        this.menuList = menuListResult.data

        // 2.2 获取用户的基础信息
        const userInfoResult = await getUserInfoRequest(
          localCache.getCache(USERID)
        )
        this.userInfo = userInfoResult.data

        // 将数据存储到本地
        localCache.setCache(MENULIST, this.menuList)
        localCache.setCache(USERINFO, this.userInfo)

        // 添加动态路由
        const routes = mapMenusToRoutes(this.menuList)
        routes.forEach((route) => {
          router.addRoute('home', route)
        })

        // 3.进行页面的跳转
        router.push('/home')
      }
    },

    // 注销登录
    async accountLogoutAction(userId: number) {
      const loutoutResult = await accountLogoutRequest(userId)

      // 退出登陆成功返回登录页
      router.push('/login')
    },

    // 用户进行刷新默认加载数据，再次动态加载路由
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USERINFO)
      const menuList = localCache.getCache(MENULIST)
      if (token && userInfo && menuList) {
        this.token = token
        this.userInfo = userInfo
        this.menuList = menuList

        // 添加动态路由
        const routes = mapMenusToRoutes(menuList)
        routes.forEach((route) => {
          // const str = routes.path.split('/')
          router.addRoute('home', route)
        })
      }
    }
  }
})

export default useLoginStore
