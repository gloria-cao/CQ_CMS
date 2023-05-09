import { postOpenSafeRequest } from '@/service/main/main'
import type { ISafeOpen } from '@/types/global'
import { defineStore } from 'pinia'
import { MessageNoticeFn } from '@/utils/MessageNoticeFn'

const useMainStore = defineStore('main', {
  state: () => ({}),
  actions: {
    // 进行二次验证
    async postOpenSafeAction(deleteInfo: ISafeOpen) {
      const openSafeResult = await postOpenSafeRequest(deleteInfo)
      console.log(openSafeResult)
      MessageNoticeFn(openSafeResult.code, openSafeResult.msg)
    }
  }
})

export default useMainStore
