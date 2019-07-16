<template>
  <div class="task">
    <el-form ref="forms" :model="info" :rules="rules" label-width="130px">
      <div class="device-info">
        <div class="info">
          <span>系统导入关联设备</span>
          <div class="info-search">
            <el-input v-model="search.deviceCertNo" clearable placeholder="请输入使用登记证号" style="width:auto;"/>
            <el-select v-model="search.deviceType1" clearable placeholder="请选择设备类型">
              <el-option
                v-for="item in equipmentAllType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <el-button type="primary" size="mini" @click="clickSearch">搜索</el-button>
          </div>
        </div>
        <el-table
          v-loading="loading"
          ref="deviceMutl"
          :data="noDeviceList"
          height="250"
          border
          style=""
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            prop="deviceName"
            label="设备名称"/>
          <el-table-column
            prop="deviceProduceNo"
            label="出厂编号"/>
          <el-table-column
            prop="deviceCertNo"
            label="使用登记证号"/>
          <el-table-column
            prop="deviceStatusName"
            label="设备状态"/>
        </el-table>
      </div>
      <div class="title">手动新增关联设备</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型" prop="useEque">
            <el-select v-model="info.useEque" placeholder="请选择设备类型">
              <el-option
                v-for="item in equipmentAllType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <!-- <el-cascader
              ref="useEques"
              v-model="info.useEque"
              :options="equipmentAllType"
              class="select"/> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备状态" prop="status">
            <el-select v-model="info.status" placeholder="请选择设备状态">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编号" prop="deviceNo">
            <el-input v-model="info.deviceNo" placeholder="请输入设备编号"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="deviceName">
            <el-input v-model="info.deviceName" placeholder="请输入设备名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备型号" prop="deviceModel">
            <el-input v-model="info.deviceModel" placeholder="请输入设备型号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备注册号" prop="deviceRegNo">
            <el-input v-model="info.deviceRegNo" placeholder="请输入设备注册号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用证编号" prop="deviceCertNo">
            <el-input v-model="info.deviceCertNo" placeholder="请输入使用证编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备出厂编号" prop="deviceProduceNo">
            <el-input v-model="info.deviceProduceNo" placeholder="请输入设备出厂编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="设备安装地址" prop="installAddr">
          <el-cascader
            ref="deviceInstallAreas"
            v-model="info.installAddr"
            :options="addrCasc"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="详细地址" prop="detailAddr">
          <el-input v-model="info.detailAddr" class="input" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="设备图片">
          <img-load :imgurl="imgUrl" :imgshow="baseImgUrl" @sendimg="sendImgLoad"/>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="submitDevice('forms')">添加</el-button>
        <el-button type="primary" @click="selectDeviceQu">确 定</el-button>
      </el-row>
    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="closed">取 消</el-button>
      <el-button type="primary" @click="submitDevice('forms')">添加</el-button>
      <el-button type="primary" @click="selectDeviceQu">确 定</el-button>
    </span> -->
  </div>
</template>

<script>
import { fetchBeforeTask, fetchAddDevice } from '@/api/shebei'
import { addrCasc, status, baseUrl } from '@/utils/config'
import { mapGetters } from 'vuex'
import imgLoad from '@/components/imgLoad/index'
export default {
  components: {
    imgLoad
  },
  props: {
    device: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseImgUrl: `${baseUrl}/file/show/Device/`,
      imgUrl: `${baseUrl}/file/upload/Device`,
      addrCasc,
      status,
      loading: false,
      multipleSelection: [],
      noDeviceList: [],
      devList: [],
      company: {},
      phoneListString: '',
      search: {
        deviceType1: '',
        deviceCertNo: ''
      },
      info: {
        useEque: '',
        status: '01',
        deviceNo: '',
        deviceName: '',
        deviceRegNo: '',
        deviceModel: '',
        deviceCertNo: '',
        deviceProduceNo: '',
        installAddr: [],
        detailAddr: ''
      },
      rules: {
        useEque: [{ required: true, message: '请选择设备类型' }],
        status: [{ required: true, message: '请选择设备状态' }],
        // deviceName: [{ required: true, message: '请输入设备名称' }],
        // deviceNo: [{ required: true, message: '请输入设备编号' }],
        // deviceRegNo: [{ required: true, message: '请输入设备注册号' }],
        // deviceModel: [{ required: true, message: '请输入活动资源' }],
        // deviceCertNo: [{ required: true, message: '请输入使用证编号' }],
        deviceProduceNo: [{ required: true, message: '请输入设备出厂编号' }],
        installAddr: [{ required: true, message: '请选择设备安装地址' }],
        detailAddr: [{ required: true, message: '请输入详细地址' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'equipmentAllType'
    ])
  },
  watch: {
    device: function(val) {
      this.chageData()
    }
  },
  mounted() {
    this.chageData()
  },
  methods: {
    clickSearch() { // 搜索
      this.getDeviceList(this.device.company.id, this.search)
    },
    sendImgLoad(event) {
      // console.log(event)
      this.phoneListString = event
    },
    chageData() {
      const device = this.device
      // console.log(this.device)
      if (device.company && device.company.id) {
        this.company = device.company
        this.getDeviceList(device.company.id)
      }
      if (device.list.length !== 0) {
        this.devList = device.list
      }
      console.log(this.$store.getters.localAddr)
      const local = this.$store.getters.localAddr
      this.info.installAddr = local.area
      this.info.detailAddr = local.useAddress
    },
    getDeviceList(id, data = {}) { // 获取设备列表
      this.loading = true
      fetchBeforeTask(id, data).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          const returnData = data.returnData
          this.noDeviceList = returnData
        } else {
          this.$message({
            message: data.resultDesc,
            type: 'warning'
          })
        }
      }).finally(() => {
        this.loading = false
        const list = this.noDeviceList.filter(item => {
          const isHas = this.devList.some(val => {
            return val.id === item.id
          })
          return isHas
        })
        this.toggleSelection(list)
      })
    },
    selectDeviceQu() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length !== 0) {
        this.closed(this.multipleSelection)
      } else {
        this.$message({
          message: '请勾选关联设备',
          type: 'warning'
        })
      }
    },
    closed(data = []) {
      this.$emit('closed', data)
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
          // const useEqueArr = this.$refs['useEques'].$el.innerText.replace(/\s+/g, '').split('/')
          // 设备类型名称
          const [deviceTypeN] = this.equipmentAllType.filter(item => {
            return item.value === useEque
          })
          const deviceInstallAreaArr = this.$refs['deviceInstallAreas'].$el.innerText.replace(/\s+/g, '').split('/')
          const {
            id,
            useName,
            useContactMan,
            useContactManTel,
            useAddress
          } = this.company
          const [{ label }] = this.status.filter(item => { return item.value === status })
          const data = {
            deviceType1: useEque, // 设备类型1
            deviceTypeName1: deviceTypeN.label, // 设备类型名称1
            // deviceType2: `${useEque[1]}`, // 设备类型2
            // deviceTypeName2: useEqueArr[1], // 设备类型名称2
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
            deviceUseID: id,
            devicePhotos: this.phoneListString.split(',').map(item => {
              return `/file/show/Device/${item}`
            }).join(',')
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.deviceMutl.toggleRowSelection(row)
        })
      } else {
        this.$refs.deviceMutl.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
  margin-top: 15px;
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
.info-search {
  display: felx;
  align-items:center;
  justify-content:center;
}
</style>
