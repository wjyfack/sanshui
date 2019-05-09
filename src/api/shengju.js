import request from '@/utils/request'

/** 分页查设备信息 */
export function fetchDeviceList(data) {
  return request({
    url: '/provincial/getDeviceDaseList',
    method: 'post',
    data: { ...data }
  })
}
/** */
export function fetchChangeList(data) {
  return request({
    url: '/provincial/getDeviceChangeList',
    method: 'post',
    data: data
  })
}
