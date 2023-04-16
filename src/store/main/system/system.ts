import {
  getUsersList1Request,
  getUsersList2Request,
  postUserBannedRequest,
  postUserDeleteRequest,
  postUsersBannedRequest,
  postUsersDeleteRequest,
  postUserUntieDisableRequest,
  postUsersUntieDisableRequest
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import type {
  IQueryInfo,
  IUserDelete,
  IUsersDelete,
  IUserBanned,
  IUsersBanned
} from '@/types'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    bannedmsg: ''
  }),
  actions: {
    // 获取用户列表后面参数
    async getUsersList1Action(queryInfo: IQueryInfo) {
      const usersListResult = await getUsersList1Request(queryInfo)
      const { total, records } = usersListResult.data
      this.usersList = records
      this.usersTotalCount = total
    },
    async getUsersList2Action(queryInfo: IQueryInfo) {
      const usersListResult = await getUsersList2Request(queryInfo)
      const { total, records } = usersListResult.data
      this.usersList = records
      this.usersTotalCount = total
    },

    // 删除单个用户信息
    async postUserDeleteAction(deleteInfo: IUserDelete) {
      // 1.删除数据的操作
      const deleteResult = await postUserDeleteRequest(deleteInfo)
      console.log(deleteResult)
      // 2.重新请求数据
      this.getUsersList1Action({ current: 1, size: 10 })
    },

    // 删除多个用户操作
    async postUsersDeleteAction(deleteInfo: IUsersDelete) {
      // 1.删除数据的操作
      const UsersDeleteResult = await postUsersDeleteRequest(deleteInfo)
      console.log(UsersDeleteResult)
      // 2.重新请求数据
      this.getUsersList1Action({ current: 1, size: 10 })
    },

    // 封禁单个账户
    async postUserBannedAction(bannedInfo: IUserBanned) {
      const bannedResult = await postUserBannedRequest(bannedInfo)
      console.log(bannedResult)
      this.getUsersList1Action({ current: 1, size: 10 })
    },

    // 批量封禁
    async postUsersBannedAction(bannedInfo: IUsersBanned) {
      const bannedResult = await postUsersBannedRequest(bannedInfo)
      this.bannedmsg = bannedResult.msg
      this.getUsersList1Action({ current: 1, size: 10 })
    },

    // 解封帐号
    async postUserUntieDisableAction(userId: number) {
      const untieDisableResult = await postUserUntieDisableRequest(userId)
      console.log(untieDisableResult)
      this.getUsersList1Action({ current: 1, size: 10 })
    },

    // 批量解封
    async postUsersUntieDisableAction(userId: number[]) {
      const untieDisableResult = await postUsersUntieDisableRequest(userId)
      console.log(untieDisableResult)
      this.getUsersList1Action({ current: 1, size: 10 })
    }
  }
})

export default useSystemStore
