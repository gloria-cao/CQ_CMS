import type { IUsersList } from "@/types"

// 声明类型
export interface ISystemState {
  usersList: IUsersList[]
  usersTotalCount: number
}

// export interface usersList {
//   userId: number
//   userName: string
//   password: any
//   openId: any
//   identityCard: string
//   headPortrait: string
//   userPhone: string
//   createTime: string
//   nickName: string
//   status: number
//   sex: number
//   userType: any
// }
