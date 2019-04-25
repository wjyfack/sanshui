import request from '@/utils/request'

export function fetchDeviceType(isApp = '0') {
  return request({
    url: '/deviceType/ss/getDeviceType',
    method: 'post',
    data: { isApp }
  })
}
/**
 * 上次现场图片
 */
export function fetchSendPhoto(file) {
  return request({
    url: '/file/upload/ScenePictures',
    method: 'post',
    data: { file },
    params: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
