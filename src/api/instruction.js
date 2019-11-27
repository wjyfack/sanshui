import request from '@/utils/request'

const sourceSySign = 'sanshuiSafetyServer'
/** 获取指令书 */
export function fetchInstructionList(data) {
  return request({
    url: '/taskCommand/getCommandList',
    method: 'post',
    data: data
  })
}
/** 整改查看前的查询数据 */
export function fetchBeforeRectify(sourceCommandId) {
  return request({
    url: '/taskCommand/info',
    method: 'post',
    data: {
      sourceSySign,
      sourceCommandId
    }
  })
}
/** 整改查看（审核整改） */
export function fetchRectify(data) {
  return request({
    url: '/taskCommand/command/audit',
    method: 'post',
    data: {
      ...data,
      operateName: '监察指令书审核'
    }
  })
}
/** 移交前查数据 */
export function fetchBeforeTransfe(data) {
  return request({
    url: '/taskCommand/command/getForTransfe',
    method: 'post',
    data: {
      ...data
    }
  })
}

/** 移交里的保存 */
export function fetchTransferSave(data) {
  return request({
    url: '/taskCommand/command/transfe',
    method: 'post',
    data: data
  })
}
/** 闭环 */
export function fetchClosedLoop(data) {
  return request({
    url: '/taskCommand/closeCommand',
    method: 'post',
    data: data
  })
}
/** 复查前查数据 */
export function fetchBeforeReview(data) {
  return request({
    url: '/taskCheck/getTaskForReview',
    method: 'post',
    data: data
  })
}
/** 复查 */
export function fetchReview(data) {
  return request({
    url: '/taskCheck/review',
    method: 'post',
    data: data
  })
}
/** 各个指令书状态数量 */
export function fetchTaskCount(data, deviceArea3 = '7') {
  return request({
    url: '/taskCommand/getCommandCount',
    method: 'post',
    data: { ...data, deviceArea3 }
  })
}
/** 各个检查指令书状态数量 */
export function fetchCheckCount(deviceArea3 = '7') {
  return request({
    url: '/taskCommand/getAduitCommandCount',
    method: 'post',
    data: { deviceArea3 }
  })
}
/** 指令书审核 */
export function fetchTrialComm(data) {
  return request({
    url: '/taskCommand/trialCommand',
    method: 'post',
    data: data
  })
}
/** 指令书反审核 */
export function fetchAuditComm(data) {
  return request({
    url: '/taskCommand/counterAuditCommand',
    method: 'post',
    data: data
  })
}
/** 删除指令书 */
export function fetchDelComm(data) {
  return request({
    url: '/taskCommand/deleteCommand',
    method: 'post',
    data: data
  })
}
/** excel导出指令书 */
export function fetchExcelTaskCommand(data) {
  return request({
    url: '/excel/excel/export/taskCommand',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
/** 退回指令书 */
export function fetchbackCommand(data) {
  return request({
    url: '/taskCommand/returnCommand',
    method: 'post',
    data: data
  })
}
