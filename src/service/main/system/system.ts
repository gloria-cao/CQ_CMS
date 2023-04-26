import type {
  IQueryInfo,
  IUserDelete,
  IUsersDelete,
  IUserBanned,
  IUsersBanned,
  IUpdatePwd,
  IUserInfoModify,
  IModifyInfo
} from '@/types'
import hyRequest from '../..'

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

/**
 *
 * 获取分页数据
 * @export getPageListRequest
 * @param {string} pageName 页面名称
 * @param {IQueryInfo} queryInfo 数据
 * @return {*}
 */
export function getPageListRequest(pageName: string, queryInfo: IQueryInfo) {
  const arr = Object.keys(queryInfo)
  if (arr.length === 2) {
    return hyRequest.get({
      url: `/${pageName}/list?current=${queryInfo.current}&size=${queryInfo.size}`
    })
  } else {
    if (pageName === 'user') {
      return hyRequest.get({
        url: `/${pageName}/list?current=${queryInfo.current}&size=${queryInfo.size}&userName=${queryInfo.userName}&userPhone=${queryInfo.userPhone}&status=${queryInfo.status}&identityCard=${queryInfo.identityCard}&sex=${queryInfo.sex}&createTime=${queryInfo.createTime}`
      })
    } else if (pageName === 'role') {
      return hyRequest.get({
        url: `/${pageName}/list?current=${queryInfo.current}&size=${queryInfo.size}&roleName=${queryInfo.roleName}&remark=${queryInfo.remark}&createBy=${queryInfo.createBy}&createTime=${queryInfo.createTime}`
      })
    } else if (pageName === 'merchantType') {
      return hyRequest.get({
        url: `/${pageName}/list?current=${queryInfo.current}&size=${queryInfo.size}&typeName=${queryInfo.typeName}`
      })
    } else if (pageName === 'user/banned') {
      return hyRequest.get({
        url: `/${pageName}/list?current=${queryInfo.current}&size=${queryInfo.size}&userName=${queryInfo.userName}&unlockTime=${queryInfo.unlockTime}&createTime=${queryInfo.createTime}`
      })
    } else if (pageName === 'system/log') {
      return hyRequest.get({
        url: `/${pageName}/list?current=${queryInfo.current}&size=${queryInfo.size}&logUrl=${queryInfo.logUrl}&logStatus=${queryInfo.logStatus}&createTime=${queryInfo.createTime}&endTime=${queryInfo.endTime}`
      })
    }
  }
}

/**
 *
 *  删除单条数据
 * @export deletePageDeleteRequest
 * @param {string} pageName
 * @param {number} id
 * @return {*}
 */
export function deletePageDeleteRequest(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

/**
 *
 *  批量删除用户数据，因为url没有共性，所以用pageName不同来加以区分
 * @export
 * @param {string} pageName
 * @param {string[]} ids
 * @return {*}
 */
export function deletePagesDeleteRequest(pageName: string, ids: string[]) {
  console.log(pageName)
  if (pageName === 'merchantType') {
    return hyRequest.post({
      url: `${pageName}/batchDelete`,
      data: ids
    })
  }
}

/**
 *
 *  修改表格数据
 * @export
 * @param {string} pageName
 * @param {IModifyInfo} modifyInfo
 * @return {*}
 */
export function putInfoModifyRequest(
  pageName: string,
  modifyInfo: IModifyInfo
) {
  return hyRequest.put({
    url: `/${pageName}`,
    data: modifyInfo
  })
}

/**
 *
 *  新增用户信息
 * @export
 * @param {string} pageName
 * @param {*} newInfo
 * @return {*}
 */
export function postNewInfoRequest(pageName: string, newInfo: any) {
  return hyRequest.post({
    url: `${pageName}`,
    data: newInfo
  })
}
