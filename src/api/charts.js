import request from '@/utils/request'
const deviceArea3 = '7'
/** 设备统计 */
export function fetchDeviceTotal(deviceArea4) {
  const deviceStatusCode = '01'
  return request({
    url: '/indexTotoal/getDeviceTotal',
    method: 'post',
    data: { deviceArea3, deviceArea4, deviceStatusCode }
  })
}
/** 任务，指令书，安全率统计 */
export function fetchTaskCommandTotal(deviceAreaName4) {
  return request({
    url: '/indexTotoal/getTaskCommandTotal',
    method: 'post',
    data: { deviceArea3, deviceAreaName4 }
  })
}
/** 设备类型统计 */
export function fetchDeviceTypeTotal(deviceArea4) {
  return request({
    url: '/indexTotoal/getDeviceTypeTotal',
    method: 'post',
    data: { deviceArea3, deviceArea4 }
  })
}

/** 任务统计 */
export function fetchTotalByMonth(deviceAreaName4) {
  return request({
    url: '/indexTotoal/getTaskCheckTotalByMonth',
    method: 'post',
    data: { deviceArea3, deviceAreaName4 }
  })
}
/** 单位统计 */
export function fectTotalCompany(useArea4) {
  return request({
    url: '/indexTotoal/getCompanyUseTotal',
    method: 'post',
    data: { useArea3: deviceArea3, useArea4 }
  })
}
