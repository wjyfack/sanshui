import request from '@/utils/request'
import { systemKey, systemSign, refiyUrl } from '@/utils/config'

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
/**
 * 指令书模板
 */
export function fetchIntructionModel(isApp = '0', is_lock = '0') {
  return request({
    url: '/base/param/getletterTemplate',
    method: 'post',
    data: { isApp, is_lock }
  })
}
/** 接收任务部门 */

export function fetchDtName(deptIsRecive = '1') {
  return request({
    url: '/base/param/getDtNameTemplate',
    method: 'post',
    data: { deptIsRecive }
  })
}

/** 整改token */
export function fetchIdRefiy() {
  return request({
    baseURL: refiyUrl,
    url: '/open/api/system/vail',
    method: 'post',
    data: { systemKey, systemSign }
  })
}
/** excel导出设备 */
export function fetchExcelDevice(data) {
  return request({
    url: '/file/excel/export/device',
    responseType: 'blob',
    method: 'post',
    data: data
  })
}
export function fetchTaskDownload({ url, data }) {
  return request({
    url,
    responseType: 'blob',
    method: 'post',
    data: data
  })
}
/** 专项任务类型 */
export function getCheckType(data) {
  return request({
    url: '/base/param/getCheckType',
    method: 'post',
    data: data
  })
}
