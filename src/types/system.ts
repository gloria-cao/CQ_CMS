/**
 *
 *  声明分页查询类型
 * @export IQueryInfo
 * @interface IQueryInfo
 */
export interface IQueryInfo {
  current: number
  size: number
  userName?: string
  userPhone?: string
  status?: number
  identityCard?: string
  sex?: string
  createTime?: string
  roleName?: string
  remark?: string
  createBy?: string
  unlockTime?: string
  logUrl?: string
  logStatus?: number
  endTime?: string
  typeName?: string
}

// 删除单条数据
export interface IUserDelete {
  userId: number
  safeType: string
}

// 删除多条数据
export interface IUsersDelete {
  ids: string[]
  safeType: string
}

// 封禁单个帐号
export interface IUserBanned {
  id: number
  bannedTime: number
}

// 封禁多个帐号
export interface IUsersBanned {
  bannedTime: number
  userIdList: number[]
}

// 修改用户密码
export interface IUpdatePwd {
  userId: number
  newPassword: string
  oldPassword: string
}

// 修改用户信息
export interface IUserInfoModify {
  userId: number
  headPortrait?: string
  identityCard?: string
  nickName?: string
  sex?: number
  userName?: string
  userPhone?: string
}

/**
 *
 *  修改信息汇总
 * @export
 * @interface IModifyInfo
 */
export interface IModifyInfo {
  roleId?: number
  roleName?: string
  remark?: string
  manageId?: number
  typeName?: string
}
