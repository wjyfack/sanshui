import request from '@/utils/request'
/*
// 获取任务列表
  页大小	pageSize
  第几页	pageNum
  任务编号	checkNo
  指令书编号	commandNo
  使用单位	companyUseName
  所属镇街	deviceAreaName4
  使用登记证	deviceCertNo
  任务状态	taskStatus
  状态	checkTypeId
  任务派发部门	checkAddDeptName
  任务日期1	updateTime
  任务日期2	commandAddDate
  检查任务状态	checkStatus
  回收站	isRecovery
  排序	orderType
*/
export function fetchTaskList(data) {
  return request({
    url: '/taskCheck/getTaskList',
    method: 'post',
    data: data
  })
}
/**
 *  派发任务前查数据
 * 任务表id	ids 18,19
*/
export function fetchBeforeDistribute(ids) {
  return request({
    url: '/taskCheck/getTaskCheck1',
    method: 'post',
    data: { ids }
  })
}

/**
 *  派发任务
 * 任务id	id
任务要求	checkIntro
反馈时间	checkResultEndDate
检验类型	checkTypeId
接收部门id	checkDeptId
接收部门	checkDeptName

*/
export function fetchDistributeTask(arr) {
  return request({
    url: '/taskCheck/updateTaskCheck2',
    method: 'post',
    data: { arr }
  })
}

/**
 *  任务详情
 * 任务编号	checkNo
*/
export function fetchtaskDetail(checkNo) {
  return request({
    url: '/taskCheck/getTaskDeviceDt',
    method: 'post',
    data: { checkNo }
  })
}

/**
 *  操作任务
 * 	arr
*/
export function fetchtaskOpt(arr) {
  return request({
    url: '/taskCheck/updateTaskCheck3',
    method: 'post',
    data: { arr }
  })
}

/**
 * 新增任务
 * 	data
*/
export function fetchAddTask(data) {
  return request({
    url: '/taskCheck/addTaskCheck2',
    method: 'post',
    data: data
  })
}
