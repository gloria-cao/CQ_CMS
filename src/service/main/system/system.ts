import type {
  IQueryInfo,
  IUserDelete,
  IUsersDelete,
  IUserBanned,
  IUsersBanned,
  IUpdatePwd,
  IUserInfoModify
} from '@/types'
import hyRequest from '../..'

// 获取用户列表，没有携带后面的参数
export function getUsersList1Request(queryInfo: IQueryInfo) {
  return hyRequest.get({
    url: `/user/list?current=${queryInfo.current}&size=${queryInfo.size}`
  })
}
// 携带后面的参数
export function getUsersList2Request(queryInfo: IQueryInfo) {
  return hyRequest.get({
    url: `/user/list?current=${queryInfo.current}&size=${queryInfo.size}&userName=${queryInfo.userName}&userPhone=${queryInfo.userPhone}&status=${queryInfo.status}&identityCard=${queryInfo.identityCard}&sex=${queryInfo.sex}&createTime=${queryInfo.createTime}`
  })
}

// 删除单个用户数据
export function postUserDeleteRequest(deleteInfo: IUserDelete) {
  return hyRequest.post({
    url: '/user/delete',
    data: deleteInfo
  })
}

// 批量删除用户操作
export function postUsersDeleteRequest(deleteInfo: IUsersDelete) {
  return hyRequest.post({
    url: '/user/deleteBatch',
    data: deleteInfo
  })
}
// 封禁账户 /user/banned
export function postUserBannedRequest(bannedInfo: IUserBanned) {
  return hyRequest.post({
    url: '/user/banned',
    data: bannedInfo
  })
}

// 批量封禁 /user/batch/banned
export function postUsersBannedRequest(bannedInfo: IUsersBanned) {
  return hyRequest.post({
    url: '/user/batch/banned',
    data: bannedInfo
  })
}

// 解封帐号 /user/untieDisable/{userId}
export function postUserUntieDisableRequest(userId: number) {
  return hyRequest.post({
    url: `/user/untieDisable/${userId}`
  })
}

// 批量解封 /user/batchUntieDisable
export function postUsersUntieDisableRequest(userId: number[]) {
  return hyRequest.post({
    url: '/user/batchUntieDisable',
    data: userId
  })
}

// 重置密码 /user/resetPassword/{userId}
export function postUserResetPwdRequest(userId: number) {
  return hyRequest.post({
    url: `/user/resetPassword/${userId}`
  })
}

// 修改密码 /user/updatePassword
export function postUserUpdatePwdRequest(updateInfo: IUpdatePwd) {
  return hyRequest.post({
    url: '/user/updatePassword',
    data: updateInfo
  })
}

// 强制下线 /user/kickOut/{userId}
export function postUserKickOutRequest(userId: number) {
  return hyRequest.post({
    url: `/user/kickOut/${userId}`
  })
}

// 修改数据 /user
export function putUserInfoModifyRequest(userInfo: IUserInfoModify) {
  return hyRequest.put({
    url: '/user',
    data: userInfo
  })
}
