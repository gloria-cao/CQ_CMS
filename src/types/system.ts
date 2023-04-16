// 声明分页查询类型
export interface IQueryInfo {
  current: number
  size: number
  userName?: string
  userPhone?: string
  status?: number
  identityCard?: string
  sex?: string
  createTime?: string
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
