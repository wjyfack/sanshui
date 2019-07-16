import request from '@/utils/request'

/** 分页查询指令书模板 */
export function fetchLetterTemp(data) {
  return request({
    url: '/letterTemplate/getLetterTemplateList',
    method: 'post',
    data: data
  })
}
/** 新增指令书模板 */
export function fetchLetterAdd(data) {
  return request({
    url: '/letterTemplate/addLetterTemplate',
    method: 'post',
    data: data
  })
}
/** 编辑指令书模板 */
export function fetchLetterEdit(data) {
  return request({
    url: '/letterTemplate/editLetterTemplate',
    method: 'post',
    data: data
  })
}
/** 分页查用户信息 */
export function fetchUserList(data) {
  return request({
    url: '/manager/getUserList',
    method: 'post',
    data: data
  })
}
/** 编辑用户 */
export function fetchUserUpdate(data) {
  return request({
    url: '/manager/update',
    method: 'post',
    data: data
  })
}
/** 新增用户 */
export function fetchUserAdd(data) {
  return request({
    url: '/manager/add',
    method: 'post',
    data: data
  })
}
/** 初始化密码 */
export function fetchinitPwd(data) {
  return request({
    url: '/manager/initPwd',
    method: 'post',
    data: data
  })
}
/** 分页查违法条例 */
export function fetchTaskIllegalList(data) {
  return request({
    url: '/taskIllegal/getTaskIllegalList',
    method: 'post',
    data: data
  })
}
/** 新增违法条例 */
export function fetchAddTaskIllegal(data) {
  return request({
    url: '/taskIllegal/addTaskIllegal',
    method: 'post',
    data: data
  })
}
/** 编辑违法条例 */
export function fetchEditTaskIllegal(data) {
  return request({
    url: '/taskIllegal/editTaskIllegal',
    method: 'post',
    data: data
  })
}

// 分页查指令书基础
export function fetchGetLetterBaseList(data) {
  return request({
    url: '/letterBase/getLetterBaseList',
    method: 'post',
    data: data
  })
}
// 新增指令书基础信息
export function fetchAddLetterBaseList(data) {
  return request({
    url: '/letterBase/addLetterBase',
    method: 'post',
    data: data
  })
}
// 编辑指令书基础信息
export function fetchEditLetterBaseList(data) {
  return request({
    url: '/letterBase/editLetterBase',
    method: 'post',
    data: data
  })
}
