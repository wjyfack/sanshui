import request from '@/utils/request'

export function fetchList(data) { // 排序类型 1降序 2升序de
  return request({
    url: '/device/ss/get',
    method: 'post',
    data: data
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
export function fetchMohuCom(useArea3 = '') { // 模糊搜索公司
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
    data: { ...data, operateName: '生成派发任务' }
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
    data: { deviceUseID, deviceArea3: '7' } // 只查三水的设备
  })
}
