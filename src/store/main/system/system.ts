import {
  getPageListRequest,
  postUserBannedRequest,
  postUserDeleteRequest,
  postUsersBannedRequest,
  postUsersDeleteRequest,
  postUserUntieDisableRequest,
  postUsersUntieDisableRequest,
  postUserResetPwdRequest,
  postUserKickOutRequest,
  postUserUpdatePwdRequest,
  putUserInfoModifyRequest,
  deletePageDeleteRequest,
  putInfoModifyRequest,
  postNewInfoRequest,
  deletePagesDeleteRequest
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
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
import { MessageNoticeFn } from '@/utils/MessageNoticeFn'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    bannedmsg: ''
  }),
  actions: {
    /**
     *  获取分页数据
     *
     * @param {string} pageName
     * @param {IQueryInfo} queryInfo
     */
    async getPageListAction(pageName: string, queryInfo: IQueryInfo) {
      const usersListResult = await getPageListRequest(pageName, queryInfo)
      console.log(usersListResult)
      const { total, records } = usersListResult.data
      this.usersList = records
      this.usersTotalCount = total
    },

    /**
     * 删除用户信息
     *postUserDeleteAction
     * @param {IUserDelete} deleteInfo
     */
    async postUserDeleteAction(deleteInfo: IUserDelete) {
      // 1.删除数据的操作
      const deleteResult = await postUserDeleteRequest(deleteInfo)
      console.log(deleteResult)
      // 2.重新请求数据
      this.getPageListAction('user', { current: 1, size: 10 })
    },

    // 删除多个用户
    async postUsersDeleteAction(deleteInfo: IUsersDelete) {
      // 1.删除数据的操作
      const UsersDeleteResult = await postUsersDeleteRequest(deleteInfo)
      console.log(UsersDeleteResult)
      MessageNoticeFn(UsersDeleteResult.code, UsersDeleteResult.msg)
      // 2.重新请求数据
      this.getPageListAction('user', { current: 1, size: 10 })
    },

    // 封禁账号
    async postUserBannedAction(bannedInfo: IUserBanned) {
      const bannedResult = await postUserBannedRequest(bannedInfo)
      console.log(bannedResult)
      MessageNoticeFn(bannedResult.code, bannedResult.msg)
      this.getPageListAction('user', { current: 1, size: 10 })
    },

    // 批量封禁
    async postUsersBannedAction(bannedInfo: IUsersBanned) {
      const bannedResult = await postUsersBannedRequest(bannedInfo)
      this.bannedmsg = bannedResult.msg
      MessageNoticeFn(bannedResult.code, bannedResult.msg)
      this.getPageListAction('user', { current: 1, size: 10 })
    },

    // 解封帐号
    async postUserUntieDisableAction(userId: number) {
      const untieDisableResult = await postUserUntieDisableRequest(userId)
      console.log(untieDisableResult)
      MessageNoticeFn(untieDisableResult.code, untieDisableResult.msg)
      this.getPageListAction('user', { current: 1, size: 10 })
    },

    // 批量解封
    async postUsersUntieDisableAction(userId: number[]) {
      const untieDisableResult = await postUsersUntieDisableRequest(userId)
      console.log(untieDisableResult)
      MessageNoticeFn(untieDisableResult.code, untieDisableResult.msg)
      this.getPageListAction('user', { current: 1, size: 10 })
    },

    // 重置密码
    async postUserResetPwdAction(userId: number) {
      const ResetPwdResult = await postUserResetPwdRequest(userId)
      MessageNoticeFn(ResetPwdResult.code, ResetPwdResult.msg)
    },

    // 修改密码
    async postUserUpdatePwdAction(updatePwd: IUpdatePwd) {
      const updatePwdResult = await postUserUpdatePwdRequest(updatePwd)
      MessageNoticeFn(updatePwdResult.code, updatePwdResult.msg)
    },

    // 强制下线
    async postUserKickOutAction(userId: number) {
      const kickOutResult = await postUserKickOutRequest(userId)
      MessageNoticeFn(kickOutResult.code, kickOutResult.msg)
    },

    // 修改用户数据
    async putUserInfoModifyAction(userInfo: IUserInfoModify) {
      const modifyResult = await putUserInfoModifyRequest(userInfo)
      console.log(modifyResult)
      this.getPageListAction('user', { current: 1, size: 10 })
    },
    // 以下代码为通用功能
    /**
     *  删除数据
     *  deletePageDeleteAction
     * @param {string} pageName
     * @param {number} id
     */
    async deletePageDeleteAction(pageName: string, id: number) {
      const deleteResult = await deletePageDeleteRequest(pageName, id)
      console.log(deleteResult)
      MessageNoticeFn(deleteResult.code, deleteResult.msg)
      this.getPageListAction(pageName, { current: 1, size: 10 })
    },

    /**
     *
     * 删除数据操作
     * @param {string} pageName
     * @param {string[]} ids
     */
    async deletePagesDeleteAction(pageName: string, ids: string[]) {
      const deletesResult = await deletePagesDeleteRequest(pageName, ids)
      console.log(deletesResult)
      MessageNoticeFn(deletesResult.code, deletesResult.msg)
      this.getPageListAction(pageName, { current: 1, size: 10 })
    },

    /**
     *  修改数据
     *
     * @param {string} pageName
     * @param {IModifyInfo} modifyInfo
     */
    async putInfoModifyAction(pageName: string, modifyInfo: IModifyInfo) {
      const modifyResut = await putInfoModifyRequest(pageName, modifyInfo)
      console.log(modifyResut)
      MessageNoticeFn(modifyResut.code, modifyResut.msg)
      this.getPageListAction(pageName, { current: 1, size: 10 })
    },

    /**
     *
     * 新建数据操作
     * @param {string} pageName
     * @param {*} newInfo
     */
    async postNewInfoAction(pageName: string, newInfo: any) {
      const newResult = await postNewInfoRequest(pageName, newInfo)
      console.log(newResult)
      MessageNoticeFn(newResult.code, newResult.msg)
      this.getPageListAction(pageName, { current: 1, size: 10 })
    }
  }
})

export default useSystemStore
