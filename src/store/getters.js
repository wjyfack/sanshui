const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  deptArea: state => state.user.deptArea, // 地区名
  deviceTotal: state => state.device.total,
  deviceList: state => state.device.list,
  taskTotal: state => state.task.total, // 任务
  taskList: state => state.task.list,
  instructionTotal: state => state.instruction.total, // 指令书
  instructionList: state => state.instruction.list,
  instructionStatus: state => state.instruction.status,
  companyList: state => state.common.comlist, // 公司名称
  equipmentAllType: state => state.common.deviceType, // 设备类型
  instructionModels: state => state.common.instructionModels, // 指令书模板
  deptNames: state => state.common.deptNames, // 接收任务部门
  taskAddTime: state => state.common.taskAddTime, // 指令书日期
  addRouters: state => state.permission.addRouters
}
export default getters
