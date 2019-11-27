<template>

  <div class="task">
    <el-form ref="form" label-width="150px">
      <!-- <unitInfo :edit="false" :com="com" @closed="unitClose"/> -->
      <el-row >
        <el-form-item label="使用单位名称" prop="deviceUseName">
          <el-input v-model="info.deviceUseName" disabled placeholder="请输入使用单位名称" style="width:100%">
            <el-button slot="append" icon="el-icon-search" @click="chageSearch"/>
          </el-input>
        </el-form-item>
        <el-dialog
          :visible.sync="dialogUnitVisible"
          append-to-body
          width="50%">
          <addUnit @closed="unitCloses"/>
        </el-dialog>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用单位联系人">
            <el-input v-model="info.deviceUseContactMan" class="input" placeholder="请输入使用单位联系人" @change="changeOther"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用单位电话">
            <el-input v-model="info.deviceUseContactManTel" class="input" placeholder="请输入使用单位电话" @change="changeOther"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="使用单位地址">
          <el-input v-model="info.deviceUseAddress" placeholder="请输入使用单位地址" @change="changeOther"/>
        </el-form-item>
      </el-row>
      <div class="device-info">
        <div class="info">
          <span>设备列表</span>
          <el-select v-model="deviceType" clearable placeholder="设备类型" @change="changeDeviceTypeGet">
            <el-option
              v-for="item in equipmentAllType"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <!--  <el-button icon="el-icon-plus" size="mini" type="primary" @click="showAddDevice">添加设备</el-button>
          -->
        </div>
        <el-table
          ref="multishebeili"
          :data="deviceList"
          height="350"
          border
          style="width: 100%"
          @selection-change="handleSelectionChanges">
          <el-table-column
            type="selection"
            width="50"/>
          <el-table-column
            prop="deviceName"
            label="设备名称"
            min-width="180"/>
          <el-table-column
            prop="deviceNo"
            label="设备代码"
            min-width="180"/>
          <el-table-column
            prop="deviceCertNo"
            label="使用登记证号"
            min-width="180"/>
          <!-- <el-table-column
            prop="deviceName"
            label="设备名称"
            min-width="180"/> -->
          <el-table-column
            prop="deviceTypeName1"
            label="类别名称"
            min-width="180"/>
          <el-table-column
            prop="deviceAddress"
            label="设备地址"
            min-width="180"/>
          <el-table-column
            prop="deviceModel"
            label="设备型号"
            min-width="180"/>
          <el-table-column
            prop="deviceAddress"
            label="设备地址"
            min-width="180"/>
          <el-table-column
            prop="deviceSize"
            label="设备规格"
            min-width="180"/>
          <el-table-column
            prop="deviceInteriorUseCode"
            label="单位内部编号"
            min-width="180"/>
          <el-table-column
            prop="deviceNextTestDate"
            label="下次检验日期"
            min-width="180"/>
          <el-table-column
            fixed="right"
            width="180"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="tableEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleAddTask">确 定</el-button>
    </span> -->
    <!-- 添加设备 -->
    <el-dialog
      :visible.sync="DialogAddDevice"
      width="45%"
      title=""
      append-to-body>
      <add-device v-if="DialogAddDevice" :device="device" @closed="changeDeviceType"/>
    </el-dialog>
    <edit-device :show.sync="dialogEdit" :infod="infoD" @change="updateD"/>
  </div>

</template>

<script>
import { status, addrCasc } from '@/utils/config'
import { mapGetters } from 'vuex'
import { fetchMakeTakes } from '@/api/shebei'
import moHuSearch from '@/mixins/moHuSearch'
import addDevice from '@/components/addDevice/index'
import unitInfo from '@/components/unitInfo/index'
import { getFormatDate } from '@/utils/common'
import { findDeviceForInspection } from '@/api/jiany'
import editDevice from './editDevice'
import addUnit from '@/components/unitInfo/unit'

// import { fetchGetDevice } from '@/api/shebei'
export default {
  components: {
    addDevice,
    unitInfo,
    editDevice,
    addUnit
  },
  mixins: [moHuSearch],
  props: {
    infos: {
      type: Object,
      default: () => {}
    },
    devf: {
      type: Object,
      default: () => {}
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      info: {},
      status,
      addrCasc,
      checkDate: '',
      deviceType: '',
      form: {},
      formInfo: this.devf,
      infoD: {},
      dialogUnitVisible: false,
      DialogAddDevice: false,
      DialogAgain: false,
      loading: false,
      dialogEdit: false,
      deviceList: [],
      noDeviceList: [],
      multipleSelection: [],
      multipleSelections: [],
      sendTime: '1', // 第几次
      task: {},
      device: {},
      com: {
        id: '',
        useName: '',
        useContactMan: '',
        useContactManTel: '',
        useAddress: '',
        requi: '',
        checkDate: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'equipmentAllType'
    ])
  },
  watch: {
    infos(newVal, oldVal) {
      // console.log(newVal)
      this.deviceType = ''
      if (newVal && newVal.listDevice) {
        const com = {
          id: newVal.listDevice[0].deviceUseID,
          useName: newVal.deviceUseName,
          useContactMan: newVal.deviceUseContactMan,
          useContactManTel: newVal.deviceUseContactManTel,
          useAddress: newVal.deviceUseAddress
        }
        this.com = com
        this.info = {
          deviceUseID: newVal.listDevice[0].deviceUseID,
          deviceUseName: newVal.deviceUseName,
          deviceUseContactMan: newVal.deviceUseContactMan,
          deviceUseContactManTel: newVal.deviceUseContactManTel,
          deviceUseAddress: newVal.deviceUseAddress
        }
        this.deviceList = newVal.listDevice
        this.$nextTick(() => {
          newVal.listDevice.forEach(item => this.$refs['multishebeili'].toggleRowSelection(item))
          this.multipleSelections = newVal.listDevice
        })
        // this.$refs.multishebeili.toggleRowSelection(row)
        // this.multipleSelections = newVal.listDevice
      } else {
        this.info = {}
        this.deviceList = []
      }
    }
  },
  mounted() {
    this.deviceType = ''
    this.com.checkDate = getFormatDate()
    const newVal = this.infos
    if (newVal && newVal.listDevice) {
      const com = {
        id: newVal.listDevice[0].deviceUseID,
        useName: newVal.deviceUseName,
        useContactMan: newVal.deviceUseContactMan,
        useContactManTel: newVal.deviceUseContactManTel,
        useAddress: newVal.deviceUseAddress
      }
      this.com = com
      this.info = {
        deviceUseID: newVal.listDevice[0].deviceUseID,
        deviceUseName: newVal.deviceUseName,
        deviceUseContactMan: newVal.deviceUseContactMan,
        deviceUseContactManTel: newVal.deviceUseContactManTel,
        deviceUseAddress: newVal.deviceUseAddress
      }
      this.deviceList = newVal.listDevice
      this.$nextTick(() => {
        newVal.listDevice.forEach(item => this.$refs['multishebeili'].toggleRowSelection(item))
        this.multipleSelections = newVal.listDevice
      })
    } else {
      this.info = {}
      this.deviceList = []
    }
  },
  methods: {
    changeDeviceTypeGet() {
      if (!this.info.deviceUseID) {
        this.$message.warning('未选择使用单位')
        this.$nextTick(() => {
          this.deviceType = ''
        })
        return ''
      }
      const params = {
        deviceUseID: this.info.deviceUseID,
        deviceType1: this.deviceType
      }
      findDeviceForInspection(params).then(res => {
        console.log(res)
        const {
          returnData
        } = res
        this.deviceList = returnData
      })
    },
    changeOther() {
      // console.log(1111)
      this.$emit('other', this.info)
    },
    unitCloses(event) {
      console.log(event)
      if (event.id) {
        const { id, useAddress, useContactMan, useContactManTel, useName } = event
        this.info.deviceUseID = id
        this.info.deviceUseAddress = useAddress
        this.info.deviceUseContactManTel = useContactManTel
        this.info.deviceUseContactMan = useContactMan
        this.info.deviceUseName = useName
        this.$emit('other', this.info)
        const params = {
          deviceUseID: event.id
        }
        findDeviceForInspection(params).then(res => {
          console.log(res)
          const {
            returnData
          } = res
          this.deviceList = returnData
        })
      }
      this.dialogUnitVisible = false
    },
    chageSearch() {
      this.dialogUnitVisible = true
    },
    tableEdit(row) { // 设备编辑
      // console.log(row.id)
      console.log(row)
      const {
        id,
        deviceUseID,
        deviceUseName,
        deviceUseAddress,
        deviceUseContactMan,
        deviceUseContactManTel,
        deviceNo,
        deviceName,
        deviceType1,
        deviceTypeName1,
        deviceAddress,
        deviceModel,
        deviceSize,
        deviceCertNo,
        deviceInteriorUseCode,
        deviceNextTestDate
      } = row
      this.infoD = {
        useEque: [deviceType1],
        deviceID: id,
        deviceUseID,
        deviceUseName,
        deviceUseAddress,
        deviceUseContactMan,
        deviceUseContactManTel,
        deviceNo,
        deviceName,
        deviceCertNo,
        deviceType1,
        deviceTypeName1,
        deviceAddress,
        deviceModel,
        deviceSize,
        deviceInteriorUseCode,
        deviceNextTestDate
      }
      this.dialogEdit = true
      // this.infoTitle = '编辑'
      // fetchGetDevice(row.id).then(response => {
      //   const data = response
      //   if (data.resultCode === '0000000') {
      //     this.dialogEdit = true
      //     const res = data.returnData
      //     console.log(res)
      //     const {
      //       deviceUseID,
      //       id,
      //       deviceType1, // 设备类型1
      //       // deviceTypeName1, // 设备类型名称1
      //       deviceType2, // 设备类型2
      //       // deviceTypeName2, // 设备类型名称2
      //       // deviceStatusName, // 状态
      //       deviceStatusCode,
      //       deviceNo, // 设备编号
      //       deviceName, // 设备名称
      //       deviceModel, // 设备型号
      //       deviceRegNo, // 设备注册号
      //       deviceCertNo, // 使用证编号
      //       deviceProduceNo, // 设备出厂编号
      //       deviceIndexesID, // 设备系统编号
      //       // deviceArea1, // 设备安装地址1
      //       deviceArea2, // 设备安装地址2
      //       deviceArea3, // 设备安装地址3
      //       deviceArea4, // 设备安装地址4
      //       // deviceAreaName1, // 设备安装地址名1
      //       // deviceAreaName2, // 设备安装地址名2
      //       // deviceAreaName3, // 设备安装地址名3
      //       // deviceAreaName4, // 设备安装地址名4
      //       deviceAddress, // 详细地址
      //       deviceLng, // 经度
      //       deviceLat, // 纬度
      //       deviceIsMonitoring, // 重点监控设备
      //       deviceUseName, // 使用单位名称
      //       deviceUseContactMan, // 使用单位联系人
      //       deviceUseTel, // 使用单位电话
      //       deviceUseAddress, // 使用单位地址
      //       deviceIntro, // 设备详情
      //       devicePhotos
      //     } = res
      //     const useEques = (deviceType1, deviceType2) => {
      //       if (deviceType2) {
      //         return [deviceType1, deviceType2]
      //       } else {
      //         return [deviceType1]
      //       }
      //     }
      //     const installAddr = (deviceArea2, deviceArea3, deviceArea4) => {
      //       return [deviceArea2, deviceArea3, deviceArea4]
      //     }
      //     // console.log(useEques(deviceType1, deviceType2))
      //     this.infoD = {
      //       deviceUseID,
      //       id,
      //       useEque: useEques(deviceType1, deviceType2), // 设备种类
      //       status: deviceStatusCode, // 状态
      //       devNum: deviceNo, // 设备编号
      //       devName: deviceName, // 设备名称
      //       devUnit: deviceModel, // 设备型号
      //       devReg: deviceRegNo, // 设备注册号
      //       useCert: deviceCertNo, // 使用证编号
      //       deviceIndexesID, // 设备系统编号
      //       detailAddr: deviceAddress, // 详细地址
      //       Longitude: deviceLng, // 经度
      //       latitude: deviceLat, // 纬度
      //       useUnitName: deviceUseName, // 使用单位名称
      //       concat: deviceUseContactMan, // 使用单位联系人
      //       telephone: deviceUseTel, // 使用单位电话
      //       unitAddr: deviceUseAddress, // 使用单位地址
      //       devDetail: deviceIntro, // 设备详情
      //       factNum: deviceProduceNo, // 设备出厂编号
      //       installAddr: installAddr(deviceArea2, deviceArea3, deviceArea4), // 设备安装地址
      //       keyMonitor: deviceIsMonitoring === '0' ? '' : '1', // 重点监控设备
      //       devicePhotos
      //     }
      //   }
      // })
    },
    updateD(event) {
      this.$emit('changes')
      // findDeviceForInspection(event).then(res => {
      //   // console.log(res)
      //   const {
      //     returnData
      //   } = res
      //   this.deviceList = returnData
      // })
    },
    unitClose(event) {
      console.log(event)
      const {
        id,
        useName,
        useContactMan,
        useTel,
        useAddress,
        contactManTel
      } = event
      this.com.id = id
      this.com.useName = useName
      this.com.useContactMan = useContactMan
      this.com.useContactManTel = useTel
      this.com.useAddress = useAddress
      this.com.contactManTel = contactManTel
      // 获取
      const params = {
        deviceUseID: id
      }
      findDeviceForInspection(params).then(res => {
        console.log(res)
        const {
          returnData
        } = res
        this.deviceList = returnData
      })
      // this.deviceList = []
    },
    changeDevice(event) {
      if (event.length !== 0) {
        this.deviceList = event
      }

      this.DialogAddDevice = false
    },
    againTask() { // 重新更新任务
      const task = this.task
      task.sendTime = '2'
      fetchMakeTakes(task).then(response => {
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
    showAddDevice() {
      if (!this.com.id) {
        this.$message({
          message: '请输入使用单位名称',
          type: 'warning'
        })
        return ''
      }
      console.log(this.com.id)
      this.device = {
        company: this.com,
        list: this.deviceList
      }
      // this.getDeviceList(this.com.id, 2)
      this.DialogAddDevice = true
    },
    handleAddTask() { // 添加任务
      const {
        useName
      } = this.com
      if (!useName) {
        this.$message('请输入使用单位名称')
        return ''
      }
      if (this.multipleSelections.length === 0) {
        this.$message('请选择设备')
        return ''
      }
      const device = {
        company: this.com,
        list: this.multipleSelections
      }
      this.$emit('change', device)
      // console.log(this.deviceList)
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
      const device = {
        company: this.com,
        list: this.deviceList
      }
      this.device = device
      // this.getDeviceList(id, 1)
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSelectionChanges(val) {
      this.multipleSelections = val
      const device = {
        company: this.com,
        list: this.multipleSelections,
        devf: this.formInfo
      }
      this.$emit('change', device)
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
      padding: 0 10px;
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
