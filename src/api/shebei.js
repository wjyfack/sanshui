import request from '@/utils/request'

export function fetchList({
  pageSize = '10', // 页大小
  pageNum = '1', // 第几页
  deviceUseName = '', // 使用单位名称
  deviceType1 = '', // 种类1
  deviceType2 = '', // 种类2
  deviceTenanceName = '', // 维保单位
  deviceCertNo = '', // 使用登记证
  deviceNextYearTestDate1 = '', // 年检范围1
  deviceNextYearTestDate2 = '', // 年检范围2
  isOverdue = '0', // 是否超期  0否1是
  orderType = '2' }) { // 排序类型 1降序 2升序de
  return request({
    url: '/device/ss/get',
    method: 'post',
    data: {
      pageSize,
      pageNum,
      deviceUseName,
      deviceType1,
      deviceType2,
      deviceTenanceName,
      deviceCertNo,
      deviceNextYearTestDate1,
      deviceNextYearTestDate2,
      isOverdue,
      orderType }
  })
}
export function fetchAddDevice(data) { // 新增设备
  return request({
    url: '/device/ss/addDevice',
    method: 'post',
    data: data
  })
}
export function fetchUpdateDevice(data) { // 新增设备
  return request({
    url: '/device/ss/updateDevice',
    method: 'post',
    data: data
  })
}
export function fetchDeviceDetail(id = 0) { // 详情设备
  return request({
    url: '/device/ss/getDeviceDt',
    method: 'post',
    data: { id }
  })
}
export function fetchMohuCom(useArea3 = '7') { // 模糊搜索公司
  return request({
    url: '/company/name/companyNamelist',
    method: 'post',
    data: {
      useArea3
    }
  })
}
export function fetchMakeTakes(data) { // 生成任务
  return request({
    url: '/taskCheck/addTask',
    method: 'post',
    data: data
  })
}
export function fetchGetDevice(id = 0) { // 设备获取编辑
  return request({
    url: '/device/ss/getDevice',
    method: 'post',
    data: { id }
  })
}

export function fetchDeviceType() { // 设备类型
  return request({
    url: '/deviceType/ss/getDeviceType',
    method: 'post',
    data: { }
  })
}

export function fetchBeforeTask(deviceUseID) { // 生成任务钱设备查询
  return request({
    url: '/device/ss/getDeviceForTask',
    method: 'post',
    data: { deviceUseID }
  })
}