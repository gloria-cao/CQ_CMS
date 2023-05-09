import dayjs from 'dayjs'

/**
 *
 *  1.传输GMT时间，返回距离当前的秒数
 *  正常时间格式转Unix时间戳(毫秒)
 * @export gmtToSeconde
 * @param {string} gmtTime
 * @return {*}
 */
export function gmtToSeconde(gmtTime: string) {
  const checkTime = dayjs(gmtTime).unix()
  var nowDay = dayjs().unix()
  const bannedTime = checkTime - nowDay
  return bannedTime
}
