import request from '@/utils/request'

/** 分页查检验意见通知书 */
export function fetchGetData(data) {
  return request({
    url: '/core/inspection/get',
    method: 'post',
    data: data
  })
}
/** 新增检验意见通知书 */
export function fetchAddData(data) {
  return request({
    url: '/core/inspection/add',
    method: 'post',
    data: data
  })
}
/** 新增前_分页查设备 */
export function findDeviceForInspection(data) {
  return request({
    url: '/core/inspection/findDeviceForInspection',
    method: 'post',
    data: data
  })
}

/** excel导出检验意见通知书 */
export function fetchExcel(data, fileType) {
  return request({
    url: '/excel/export/inspection/' + fileType,
    responseType: 'blob',
    method: 'post',
    data: data
  })
}
/** 检验意见通知书处理 */
export function fetchDeal(data) {
  return request({
    url: '/core/inspection/deal',
    method: 'post',
    data: data
  })
}
/** 编辑约检意见通知书 */
export function fetchEdit(data) {
  return request({
    url: '/core/inspection/edit',
    method: 'post',
    data: data
  })
}
/** 检验意见通知书详情 */
export function fetchInspectionDt(data) {
  return request({
    url: '/core/inspection/inspectionDt',
    method: 'post',
    data: data
  })
}
/** 检验意见通知书详情 */
export function fetchUpdateDevice(data) {
  return request({
    url: '/core/inspection/editDeviceAndCompany',
    method: 'post',
    data: data
  })
}
/** 检验意见通知书详情 */
export function fecthDel(data) {
  return request({
    url: '/core/inspection/delete',
    method: 'post',
    data: data
  })
}

