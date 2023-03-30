import hyRequest from '..'
import type { IAcount } from '@/types'

// 登录

// 获取验证码
export function getVerifyCodeRequest() {
  return hyRequest.get({
    url: '/getVerifyCode'
  })
}

// 账户密码登录
export function accountLoginRequest(account: IAcount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 注销登录
export function accountLogoutRequest(userId: number) {
  return hyRequest.post({
    url: `/logout/${userId}`
    // headers: {
    //   token: localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

// 获取当前帐号的菜单数据
export function getMenuListByIdRequest(userId: number) {
  return hyRequest.get({
    url: `/getMenuListById?userId=${userId}`
  })
}

// 获取用户的基础信息 /getUserInfo/{userId}
export function getUserInfoRequest(userId: number) {
  return hyRequest.post({
    url: `/getUserInfo/${userId}`
  })
}
