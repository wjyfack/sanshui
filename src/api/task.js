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
/**
 * 任务编辑前查询
 */
export function fecthBeforeEdit(id = 0) {
  return request({
    url: '/taskCheck/getTaskForEdit',
    method: 'post',
    data: { id }
  })
}
/** 任务编辑 */
export function fectEditTask(data) {
  return request({
    url: '/taskCheck/eidtTaskCheck',
    method: 'post',
    data: data
  })
}
/** 任务查看 */
export function fectLookTask({ id, commandId }) {
  return request({
    url: '/taskCheck/getTaskForExamine',
    method: 'post',
    data: { id, commandId }
  })
}
/** 任务审核 */
export function fecthExamineTask(data) {
  return request({
    url: '/taskCheck/examineTaskCheck',
    method: 'post',
    data: data
  })
}
/** 处理任务 */
export function fecthHandleTask(data) {
  return request({
    url: '/taskCheck/handleTaskCheck',
    method: 'post',
    data: data
  })
}
/** 更新现场图片 */
export function fecthResultPhotoList(data) {
  return request({
    url: '/taskCheck/updateCheckResultPhotoList',
    method: 'post',
    data: data
  })
}
/** 导出excel */
export function fetchExcelTask(data) {
  return request({
    url: '/file/excel/export/taskcheck',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
/** excel 导入 */
export function fetchImportExcel(data, fn) {
  return request({
    url: '/file/excel/importTaskCheckData',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
    onUploadProgress: fn
  })
}
/** 各个任务状态数量 */
export function fetchTaskCount(data, deviceArea3 = '7') {
  return request({
    url: '/taskCheck/getTaskCount',
    method: 'post',
    data: { ...data, deviceArea3 }
  })
}
/** 导出图片 */
export function fetchTaskPic(data) {
  return request({
    url: '/file/downloadPictureForPDF/CheckRecord',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
/** excel导出检查记录 */
export function fetchExcelRecord(data) {
  return request({
    url: '/excel/excel/export/checkRecord',
    method: 'post',
    responseType: 'blob',
    data: data
  })
}
/** 导入excel匹配的数据 */
export function fetchTaskMore(data) {
  return request({
    url: '/taskCheck/exprotTask',
    method: 'post',
    data: data
  })
}

