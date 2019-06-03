<template>

  <div class="task">
    <el-form ref="form" label-width="150px">
      <unitInfo :com="{}" @closed="unitClose"/>
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
          <el-form-item label="任务要求" required>
            <el-input v-model="com.requi" type="textarea" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="检查日期" required>
            <el-date-picker
              v-model="com.checkDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"/>
          </el-form-item>
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
import { status, addrCasc } from '@/utils/config'
// import { mapGetters } from 'vuex'
import { fetchMakeTakes } from '@/api/shebei'
import moHuSearch from '@/mixins/moHuSearch'
import addDevice from '@/components/addDevice/index'
import unitInfo from '@/components/unitInfo/index'
import { getFormatDate } from '@/utils/common'
export default {
  components: {
    addDevice,
    unitInfo
  },
  mixins: [moHuSearch],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status,
      addrCasc,
      checkDate: '',
      form: {},
      DialogAddDevice: false,
      DialogAgain: false,
      loading: false,
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
  // computed: {
  //   ...mapGetters([
  //     'equipmentAllType'
  //   ])
  // },
  mounted() {
    this.com.checkDate = getFormatDate()
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
        id,
        useName,
        useContactMan,
        useContactManTel,
        useAddress,
        requi,
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
      // } else if (!useAddress) {
      //   this.$message('请输入使用单位地址')
      //   return ''
      // } else
      if (!requi) {
        this.$message('请输入任务要求')
        return ''
      } else if (!checkDate) {
        this.$message('请输入检查日期')
        return ''
      }
      const data = {
        companyUseName: useName,
        companyUseId: id,
        deviceUseContactMan: useContactMan,
        deviceUseAddress: useAddress,
        deviceUseContactManTel: useContactManTel,
        checkIntro: requi,
        sendTime: this.sendTime,
        checkResultDate: checkDate,
        listDevice: this.deviceList
      }
      console.log(data)
      fetchMakeTakes(data).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.$message({
            message: data.resultDesc,
            type: 'success'
          })
          this.handleClose()
        } else {
          if (data.resultCode === 'TASK001') { // 已存在任务
            const task = data.returnData
            this.task = task
            this.DialogAgain = true
          }
          // this.$message({
          //   message: data.resultDesc,
          //   type: 'warning'
          // })
        }
      }).catch(err => {
        this.$message.error(err)
      })
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
