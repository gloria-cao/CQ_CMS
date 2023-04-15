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
