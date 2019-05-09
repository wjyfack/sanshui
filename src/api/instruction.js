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
export function fetchRectify({ sourceCommandId,
  rectifyStatus,
  rectifyAuditInfo
}) {
  return request({
    url: '/taskCommand/command/audit',
    method: 'post',
    data: {
      sourceSySign,
      sourceCommandId,
      rectifyStatus,
      rectifyAuditInfo
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
/** 复查 */
export function fetchReview(data) {
  return request({
    url: '/taskCheck/review',
    method: 'post',
    data: data
  })
}
