import request from '@/utils/request'

/** 分页查设备信息 */
export function fetchDeviceList(data) {
  return request({
    url: '/provincial/getDeviceDaseList',
    method: 'post',
    data: { ...data }
  })
}
/** 分页查变更信息 */
export function fetchChangeList(data) {
  return request({
    url: '/provincial/getDeviceChangeList',
    method: 'post',
    data: data
  })
}
/** 分页查单位信息 */
export function fetchCompanyBase(data) {
  return request({
    url: '/provincial/getCompanyBase',
    method: 'post',
    data: data
  })
}
