import request from '@/utils/request'
const deviceArea3 = '7'
/** 设备统计 */
export function fetchDeviceTotal(deviceAreaName4) {
  return request({
    url: '/indexTotoal/getDeviceTotal',
    method: 'post',
    data: { deviceArea3, deviceAreaName4 }
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
export function fetchDeviceTypeTotal(deviceAreaName4) {
  return request({
    url: '/indexTotoal/getDeviceTypeTotal',
    method: 'post',
    data: { deviceArea3, deviceAreaName4 }
  })
}

/** 设备类型统计 */
export function fetchTotalByMonth(deviceAreaName4) {
  return request({
    url: '/indexTotoal/getTaskCheckTotalByMonth',
    method: 'post',
    data: { deviceArea3, deviceAreaName4 }
  })
}
