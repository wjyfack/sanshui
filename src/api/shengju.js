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
/**  */
export function fetchDeviceDetail(deviceIds) {
  return request({
    url: '/provincial/getDeviceChangeDt',
    method: 'post',
    data: { deviceIds }
  })
}

/** excel导出单位数据 */
export function fetchExcelUnit(data) {
  let fromData = {}
  if (data.fileType === '1') {
    fromData = data.arr
  } else {
    fromData.org_name = data.org_name
  }
  return request({
    url: `/excel/export/province_companyUse/${data.fileType}`,
    method: 'post',
    responseType: 'blob',
    data: fromData
  })
}
/** excel导出设备基础数据 */
export function fetchExcelDeviceBase(data) {
  let fromData = {}
  if (data.fileType === '1') {
    fromData = data.arr
  } else {
    fromData.use_org_name = data.use_org_name
    fromData.equ_kind = data.equ_kind
    fromData.equ_type = data.equ_type
  }
  fromData.area_code = '440607'
  return request({
    url: `/excel/export/province_deviceBase/${data.fileType}`,
    method: 'post',
    responseType: 'blob',
    data: fromData
  })
}
/** excel导出设备变更信息 */
export function fetchExcelDeviceChange(data) {
  let fromData = {}
  if (data.fileType === '1') {
    fromData = data.arr
  } else {
    fromData.apply_type = data.apply_type
    fromData.out_org_name = data.out_org_name
  }
  fromData.area_code = '440607'
  return request({
    url: `/excel/export/province_deviceBase/${data.fileType}`,
    method: 'post',
    responseType: 'blob',
    data: fromData
  })
}

