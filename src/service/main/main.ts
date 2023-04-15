import hyRequest from '..'
import type { ISafeOpen } from '@/types/global'

// 二次认证
export function postOpenSafeRequest(deleteInfo: ISafeOpen) {
  return hyRequest.post({
    url: '/user/openSafe',
    data: deleteInfo
  })
}
