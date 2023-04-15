import type { IQueryInfo, IUserDelete, IUsersDelete } from '@/types'
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
