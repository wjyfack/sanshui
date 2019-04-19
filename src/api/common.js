import request from '@/utils/request'

export function fetchDeviceType(isApp = '0') {
  return request({
    url: '/deviceType/ss/getDeviceType',
    method: 'post',
    data: { isApp }
  })
}
