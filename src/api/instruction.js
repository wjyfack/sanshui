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
export function fetchBeforeTransfe(id) {
  return request({
    url: '/taskCommand/command/getForTransfe',
    method: 'post',
    data: {
      id
    }
  })
}
