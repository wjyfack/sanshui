const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  deviceTotal: state => state.device.total,
  deviceList: state => state.device.list,
  taskTotal: state => state.task.total, // 任务
  taskList: state => state.task.list,
  companyList: state => state.common.comlist, // 公司名称
  equipmentAllType: state => state.common.deviceType // 设备类型
}
export default getters
