<template>

  <div class="task">
    <el-form ref="form" label-width="130px">
      <unitInfo :com="com" @closed="unitClose"/>
      <!-- <div class="title">单位信息</div>
      <el-row>
        <el-form-item label="使用单位名称" required>
          <el-autocomplete
            v-model="com.useName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入使用单位名称"
            style="width:100%                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "
            @select="handleSelect"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用单位联系人">
            <el-input v-model="com.useContactMan" placeholder="使用单位联系人"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位联系方式">
            <el-input v-model="com.useContactManTel" placeholder="单位联系方式"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="使用单位地址">
          <el-input v-model="com.useAddress" placeholder="使用单位地址" />
        </el-form-item>
      </el-row> -->
      <div class="device-info">
        <div class="info">
          <span>设备信息</span>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="showAddDevice">添加设备</el-button>
        </div>
        <el-table
          :data="deviceList"
          height="250"
          border
          style="width: 100%"
          @selection-change="handleSelectionChanges">
          <el-table-column
            prop="deviceName"
            label="设备名称"/>
          <el-table-column
            prop="deviceSystemCode"
            label="设备索引码"/>
          <el-table-column
            prop="deviceCertNo"
            label="使用登记证号"/>
          <el-table-column
            prop="deviceStatusName"
            label="设备状态"/>
          <el-table-column
            prop="deviceName"
            label="设备型号"/>
          <el-table-column
            prop="deviceLastTestDate"
            label="检验日期"/>
          <el-table-column
            prop="deviceNextTestDate"
            label="下次检验日期"/>
        </el-table>
      </div>
      <div>
        <div class="title">任务信息</div>
        <el-row>
          <el-col :span="14">
            <el-form-item label="检查类型" required>
              <div style="display: flex;">
                <el-select v-model="com.taskone" placeholder="请选择" style="width: 190px;" @change="changeTask">
                  <el-option
                    v-for="item in taskType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
                <el-select v-model="com.tasktwo" placeholder="请选择" style="width: 200px;">
                  <el-option
                    v-for="item in taksTypeSecond"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="检查日期" required>
              <el-date-picker
                v-model="com.checkDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleAddTask">确 定</el-button>
    </span>
    <!-- 添加设备 -->
    <el-dialog
      :visible.sync="DialogAddDevice"
      width="45%"
      title=""
      append-to-body>
      <add-device :device="device" @closed="changeDevice"/>
    </el-dialog>

    <el-dialog
      :visible.sync="DialogAgain"
      width="45%"
      title=""
      class="again"
      append-to-body>
      <div class="titlea">已存在以下任务，是否重新生成?</div>
      <div class="group"><span v-for="item in task.list" :key="item" class="item">{{ item }} &nbsp;&nbsp;&nbsp;&nbsp;</span></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogAgain = false">取 消</el-button>
        <el-button type="primary" @click="againTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { status, addrCasc, taskType, inspectionType } from '@/utils/config'
import { mapGetters } from 'vuex'
import { fetchBeforeTask, fetchAddDevice } from '@/api/shebei'
import { fetchAddTask, fecthHandleTask } from '@/api/task'
import { getFormatDate } from '@/utils/common'
import addDevice from '@/components/addDevice/index'
import unitInfo from '@/components/unitInfo/index'
import moHuSearch from '@/mixins/moHuSearch'
export default {
  components: {
    addDevice,
    unitInfo
  },
  mixins: [moHuSearch],
  props: {
    infos: {
      type: Object,
      default: () => {}
    },
    isadd: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      status,
      addrCasc,
      taskType,
      inspectionType,
      taksTypeSecond: [],
      DialogAddDevice: false,
      DialogAgain: false,
      loading: false,
      deviceList: [],
      noDeviceList: [],
      multipleSelection: [],
      multipleSelections: [],
      sendTime: '1', // 第几次
      task: {},
      device: {}, // 设备id 和 list
      com: {
        id: '',
        useName: '',
        useContactMan: '',
        useContactManTel: '',
        useAddress: '',
        requi: '',
        checkDate: getFormatDate(),
        taskone: '',
        tasktwo: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'equipmentAllType'
    ])
  },
  watch: {
    infos: function(val) {
      // console.log(val)
      this.dataCheck()
    }
  },
  mounted() {
    if (this.equipmentAllType.length === 0) {
      this.$store.dispatch('actionsDeviceType')
    }
    this.dataCheck()
  },
  methods: {
    unitClose(event) {
      console.log(event)
      const {
        id,
        useName,
        useContactMan,
        useTel,
        useAddress
      } = event
      this.com.id = id
      this.com.useName = useName
      this.com.useContactMan = useContactMan
      this.com.useContactManTel = useTel
      this.com.useAddress = useAddress
      // this.getDeviceList(id, 1)
      this.deviceList = []
    },
    changeDevice(event) {
      if (event.length !== 0) {
        this.deviceList = event
      }

      this.DialogAddDevice = false
    },
    dataCheck() {
      console.log(this.infos)
      if (this.infos) {
        this.task.id = this.infos.id // 任务id
        this.task.checkNo = this.infos.checkNo // 任务id
        if (this.infos.companyUse && this.infos.companyUse.id) {
          const companyUse = this.infos.companyUse
          const {
            id,
            useAddress,
            useContactMan,
            useTel,
            useName
          } = companyUse
          this.com.id = id
          this.com.useName = useName
          this.com.useContactMan = useContactMan
          this.com.useContactManTel = useTel
          this.com.useAddress = useAddress
          const useArea2 = companyUse.useArea2 ? companyUse.useArea2 : ''
          const useArea3 = companyUse.useArea3 ? companyUse.useArea3 : ''
          const useArea4 = companyUse.useArea4 ? companyUse.useArea4 : ''
          const area = [useArea2, useArea3, useArea4]
          // const useAddress = companyUse.useAddress
          const local = { area, useAddress }
          console.log(local)
          this.$store.dispatch('actionsLocalAddr', local)
        }
        if (this.infos.taskStatus) {
          this.com.taskone = this.infos.taskStatus
        }
        if (this.infos.taskStatusName) {
          this.taksTypeSecond = inspectionType
          this.com.tasktwo = this.infos.taskStatusName
        } else {
          this.taksTypeSecond = []
        }
        const list = this.infos.list
        if (list) {
          this.deviceList = list
        }
      }
    },
    againTask() { // 重新更新任务
      const task = this.task
      task.sendTime = '2'
      fetchAddTask(task).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.$message({
            message: data.resultDesc,
            type: 'success'
          })
          this.handleClose()
        }
      })
    },
    changeTask(value) {
      // console.log(value)
      switch (~~value) {
        case 2:
        case 1:
          this.com.tasktwo = ''
          this.taksTypeSecond = inspectionType
          break
        default:
          this.com.tasktwo = ''
          this.taksTypeSecond = []
      }
    },
    showAddDevice() {
      if (!this.com.useName) {
        this.$message({
          message: '请输入使用单位名称',
          type: 'warning'
        })
        return ''
      }
      const device = {
        company: this.com,
        list: this.deviceList
      }
      this.device = device
      // this.getDeviceList(this.com.id, 2)
      this.DialogAddDevice = true
    },
    submitDevice(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {
            useEque,
            status,
            deviceNo,
            deviceName,
            deviceRegNo,
            deviceModel,
            deviceCertNo,
            deviceProduceNo,
            installAddr,
            detailAddr
          } = this.info
          const useEqueArr = this.$refs['useEques'].$el.innerText.replace(/\s+/g, '').split('/')
          const deviceInstallAreaArr = this.$refs['deviceInstallAreas'].$el.innerText.replace(/\s+/g, '').split('/')
          const {
            id,
            useName,
            useContactMan,
            useContactManTel,
            useAddress
          } = this.com
          const [{ label }] = this.status.filter(item => { return item.value === status })
          const data = {
            deviceType1: `${useEque[0]}`, // 设备类型1
            deviceTypeName1: useEqueArr[0], // 设备类型名称1
            deviceType2: `${useEque[1]}`, // 设备类型2
            deviceTypeName2: useEqueArr[1], // 设备类型名称2
            deviceStatusCode: status,
            deviceStatusName: label, // 状态
            deviceNo, // 设备编号
            deviceName, // 设备名称
            deviceModel, // 设备型号
            deviceRegNo, // 设备注册号
            deviceCertNo, // 使用证编号
            deviceProduceNo, // 设备出厂编号
            deviceIndexesID: '', // 设备系统编号
            deviceArea1: '1', // 设备安装地址1
            deviceArea2: installAddr[0], // 设备安装地址2
            deviceArea3: installAddr[1], // 设备安装地址3
            deviceArea4: installAddr[2], // 设备安装地址4
            deviceAreaName1: '广东省', // 设备安装地址名1
            deviceAreaName2: deviceInstallAreaArr[0], // 设备安装地址名2
            deviceAreaName3: deviceInstallAreaArr[1], // 设备安装地址名3
            deviceAreaName4: deviceInstallAreaArr[2], // 设备安装地址名4
            deviceAddress: detailAddr, // 详细地址
            deviceLng: '', // 经度
            deviceLat: '', // 纬度
            // deviceIsMonitoring: keyMonitor ? '1' : '0', // 重点监控设备
            deviceUseName: useName, // 使用单位名称
            deviceUseContactMan: useContactMan, // 使用单位联系人
            deviceUseTel: useContactManTel, // 使用单位电话
            deviceUseAddress: useAddress, // 使用单位地址
            // deviceIntro: devDetail, // 设备详情
            deviceUseID: id
          }
          console.log(data)
          fetchAddDevice(data).then(response => {
            const data = response
            if (data.resultCode === '0000000') {
              this.$message({
                message: data.resultDesc,
                type: 'success'
              })
              this.$refs[formName].resetFields()
              // 刷新设备
              this.getDeviceList(id, 2)
            } else {
              this.$message({
                message: data.resultDesc,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAddTask() { // 提交处理
      const {
        id,
        useName,
        useContactMan,
        useContactManTel,
        useAddress,
        taskone,
        tasktwo,
        checkDate
      } = this.com
      if (!useName) {
        this.$message('请输入使用单位名称')
        return ''
      }
      // else if (!useContactMan) {
      //   this.$message('请输入使用单位联系人')
      //   return ''
      // } else if (!useContactManTel) {
      //   this.$message('请输入单位联系方式')
      //   return ''
      // } else if (!useAddress) {处理
      //   this.$message('请输入使用单位地址')
      //   return ''
      // } else
      if (!taskone) {
        this.$message('请选择检查类型')
        return ''
      } else if (!checkDate) {
        this.$message('请输入检查日期')
        return ''
      }
      const listDevice = this.deviceList
      let deviceIds = listDevice.map(item => { return item.id })
      const data = {
        companyUseName: useName,
        companyUseId: id,
        deviceUseContactMan: useContactMan,
        deviceUseAddress: useAddress,
        deviceUseContactManTel: useContactManTel,
        checkResultDate: checkDate
      }
      // console.log(data)
      // console.log(listDevice, deviceIds)
      if (this.isadd) {
        data.sendTime = this.sendTime
        data.listDevice = listDevice
        data.taskStatus = taskone
        data.checkStatus = '4'
        data.taskStatusName = tasktwo
        data.operateName = '新增任务'
        fetchAddTask(data).then(response => {
          const data = response
          if (data.resultCode === '0000000') {
            this.$message({
              message: data.resultDesc,
              type: 'success'
            })
            this.handleClose()
          } else {
            this.task = response.returnData
            this.DialogAgain = true
          }
        }).catch(err => {
          this.$message.error(err)
        })
      } else {
        deviceIds = deviceIds.length === 0 ? [] : deviceIds.join(',')
        data.checkStatus = '4' // 任務狀態 值傳4
        data.deviceIds = deviceIds
        data.taskCheckId = this.task.id
        data.checkType = taskone
        data.checkType2 = tasktwo
        data.operateName = '处理任务'
        data.checkNo = this.task.checkNo
        fecthHandleTask(data).then(response => {
          const data = response
          if (data.resultCode === '0000000') {
            this.$message({
              message: data.resultDesc,
              type: 'success'
            })
            this.handleClose()
          } else {
            this.$message.error(data.resultDesc)
          }
        }).catch(err => {
          this.$message.error(err)
        })
      }
    },
    selectDeviceQu() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length !== 0) {
        this.DialogAddDevice = false
        this.deviceList = this.multipleSelection
      } else {
        this.$message({
          message: '请勾选关联设备',
          type: 'warning'
        })
      }
    },
    handleClose() {
      // this.visible = false
      // done()
      this.DialogAgain = false
      this.$emit('closed', false)
    },
    handleSelect(item) { // 获取id
      console.log(item)
      // this.info.DeviceUseID = item.id
      const {
        id,
        value,
        useContactMan,
        useContactManTel,
        useAddress
      } = item
      this.com.id = id
      this.com.useName = value
      this.com.useContactMan = useContactMan
      this.com.useContactManTel = useContactManTel
      this.com.useAddress = useAddress

      this.getDeviceList(id, 1)
    },
    getDeviceList(id, opt) { // 获取设备列表 1 显示 2 添加
      this.loading = true
      fetchBeforeTask(id).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          const returnData = data.returnData
          if (opt === 1) {
            this.deviceList = returnData
          } else {
            this.noDeviceList = returnData
          }
        } else {
          this.$message({
            message: data.resultDesc,
            type: 'warning'
          })
        }
      }).finally(() => {
        console.log(this.deviceList)
        this.toggleSelection(this.deviceList)
        this.loading = false
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handelSameArea(selection, row) {
      console.log(selection)
      const { deviceArea4 } = selection[0]
      const deviceList = this.deviceList.filter(item => {
        return item.deviceArea4 === deviceArea4
      })
      this.noDeviceList = deviceList
      this.multipleSelections = selection
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChanges(val) {
      this.multipleSelections = val
    },
    closeDialog() {
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  font-size: 14px;
  .title {
    padding: 16px;
    color:#333;
    background: #DBDBDB;
    margin-bottom: 10px;
  }
  .device-info {
    border-radius: 4px;
    margin: 10px 0;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: #DBDBDB;
    }
  }
}
.title,.info {
  padding: 16px 0;
}
.dialog-footer {
  display:flex;
  justify-content: flex-end;
}
.again {
  .titlea {
    font-size: 16px;
    color:#333;
    margin-bottom: 10px;
  }
  .group {
    display: flex;
    flex-wrap: wrap;
    .item {
      font-size: 14px;
      width: 33%;
    }
  }
}
</style>
