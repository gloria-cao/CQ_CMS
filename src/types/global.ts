// 多个文件夹都会使用的
// 二次认证
export interface ISafeOpen {
  password?: string
  safeType?: string
  ids?: string[]
}

export interface IUsersList {
  userId: number
  userName: string
  password: any
  openId: any
  identityCard: string
  headPortrait: string
  userPhone: string
  createTime: string
  nickName: string
  status: number
  sex: number
  userType: any
}
