/**
 *
 * 请求后台返回的信息告诉用户
 * @export ElMessageInfo
 * @param {number} code
 * @param {string} message
 */
export function MessageNoticeFn(code: number, message: string) {
  // 请求失败
  if (code !== 20000) {
    ElNotification({
      title: 'Error',
      message: `${message}`,
      type: 'error'
    })
  } else {
    // 请求成功
    ElNotification({
      title: 'Success',
      message: `${message}`,
      type: 'success'
    })
  }
}
