import request from '@/utils/request'

/** 获取指令书 */
export function fetchInstructionList(data) {
  return request({
    url: '/taskCommand/getCommandList',
    method: 'post',
    data: data
  })
}
