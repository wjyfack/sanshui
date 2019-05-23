import request from '@/utils/request'

/** 分页查询单位（单位管理） */
export function fetchCompanyBase(data) {
  return request({
    url: '/company/getCompanyList',
    method: 'post',
    data: data
  })
}
/** 编辑前查询单位 */
export function fetchCompanyForEdit(data) {
  return request({
    url: '/company/getCompanyForEdit',
    method: 'post',
    data: data
  })
}
/** 新增单位 */
export function fetchAddCompanyUse(data) {
  return request({
    url: '/company/addCompanyUse',
    method: 'post',
    data: data
  })
}
/** 编辑单位（同时可新增设备） */
export function fetchEditCompanyUse(data) {
  return request({
    url: '/company/name/editCompanyUse',
    method: 'post',
    data: data
  })
}
