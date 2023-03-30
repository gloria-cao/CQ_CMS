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
import { defineStore } from 'pinia'
import type { IMenuList, IUserInfo } from './types/login'

// 定义state类型
interface ILoginState {
  verifyCode: string
  token: string
  userId: number
  loginMsg: string
  menuList: IMenuList
  userInfo: IUserInfo
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    verifyCode: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userId: localCache.getCache(USERID ?? -1),
    loginMsg: '',
    menuList: localCache.getCache(MENULIST) ?? [],
    userInfo: localCache.getCache(USERINFO) ?? {}
  }),

  actions: {
    // 获取验证码
    async getVrifyCodeAction() {
      const verifyCodeResult = await getVerifyCodeRequest()
      const verifyCode = verifyCodeResult.data
      // 把数据存到state里面
      this.verifyCode = verifyCode
    },

    // 登录功能
    async accountLoginAction(account: IAcount) {
      const loginResult = await accountLoginRequest(account)
      const loginMsg = loginResult.msg

      this.loginMsg = loginMsg
      // 将服务器返回的错误信息进行展示
      if (
        loginResult.msg === '用户名不存在或密码错误' ||
        loginResult.msg === '验证码过期/不存在'
      ) {
      } else {
        const tokenValue = loginResult.data.tokenValue
        const userId = loginResult.data.loginId
        this.userId = userId
        this.token = tokenValue

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

        // 3.进行页面的跳转
        router.push('/home')
      }
    },

    // 注销登录
    async accountLogoutAction(userId: number) {
      const loutoutResult = await accountLogoutRequest(userId)
      console.log(loutoutResult)

      // 退出登陆成功返回登录页
      router.push('/login')
    }
  }
})

export default useLoginStore
