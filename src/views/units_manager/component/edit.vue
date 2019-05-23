<template>
  <div class="edit">
    <el-form ref="form" :model="unit" :rules="unitForm" label-width="155px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位名称" prop="useName">
            <el-input v-model="unit.useName"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="统一社会信用代码" prop="useCreditCode">
            <el-input v-model="unit.useCreditCode"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位电话" prop="useTel">
            <el-input v-model="unit.useTel"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="单位地址" prop="areaAddr">
        <el-cascader
          ref="deviceArea"
          v-model="unit.areaAddr"
          :options="addrCasc"/>
      </el-form-item>
      <el-form-item label="详情地址" prop="useFullAddress">
        <el-input v-model="unit.useFullAddress"/>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法定代表人" prop="useLegalPerson">
            <el-input v-model="unit.useLegalPerson"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人电话" prop="useLegalPersonTel">
            <el-input v-model="unit.useLegalPersonTel"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="useContactMan">
            <el-input v-model="unit.useContactMan"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人电话" prop="useContactManTel">
            <el-input v-model="unit.useContactManTel"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isShow">
        <el-form-item label="是否添加设备">
          <el-switch
            v-model="isAddDevice"/>
        </el-form-item>
      </el-row>
    </el-form>
    <el-form v-if="isAddDevice" ref="forms" :model="info" :rules="rules" label-width="130px">
      <div class="title">新增企业关联设备</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型" prop="useEque">
            <el-cascader
              ref="useEques"
              v-model="info.useEque"
              :options="equipmentAllType"
              class="select"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备状态" prop="status">
            <el-select v-model="info.status" placeholder="请选择">
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
        <el-form-item label="详细地址" prop="deviceInstallAddress">
          <el-input v-model="info.deviceInstallAddress" class="input" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-row>
      <!-- <el-row type="flex" justify="end">
        <el-button type="primary" @click="submitDevice('forms')">添加</el-button>
      </el-row> -->
    </el-form>
    <div class="form-right">
      <el-button @click="closed">取消</el-button>
      <el-button type="primary" @click="sure">确认</el-button>
    </div>
  </div>
</template>

<script>
import { fetchAddDevice } from '@/api/shebei'
import { addrCasc, status } from '@/utils/config'
import { mapGetters } from 'vuex'
import { fetchAddCompanyUse, fetchEditCompanyUse } from '@/api/units'
export default {
  props: {
    infomation: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addrCasc,
      status,
      isShow: false,
      isAddDevice: false,
      unit: {
        areaAddr: [],
        useName: '',
        useCreditCode: '',
        useTel: '',
        useAddress: '',
        useArea1: '1',
        useAreaName1: '广东省',
        useArea2: '2',
        useAreaName2: '佛山市',
        useArea3: '',
        useAreaName3: '',
        useArea4: '',
        useAreaName4: '',
        useFullAddress: '',
        useLegalPerson: '',
        useLegalPersonTel: '',
        useContactMan: '',
        useContactManTel: ''
      },
      unitForm: {
        useName: [{ required: true, message: '请填写单位名称' }],
        useCreditCode: [{ required: true, message: '请填写统一社会信用代码/身份证号' }],
        areaAddr: [{ required: true, message: '请选择单位地址' }],
        useFullAddress: [{ required: true, message: '请填写详细地址' }],
        useContactMan: [{ required: true, message: '请填写联系人' }],
        useContactManTel: [{ required: true, message: '请填写联系人电话' }]
      },
      info: {
        useEque: [],
        status: '',
        deviceNo: '',
        deviceName: '',
        deviceRegNo: '',
        deviceModel: '',
        deviceCertNo: '',
        deviceProduceNo: '',
        installAddr: [],
        deviceInstallAddress: ''
      },
      rules: {
        useEque: [{ required: true, message: '请选择设备类型' }],
        status: [{ required: true, message: '请选择设备状态' }],
        deviceName: [{ required: true, message: '请输入设备名称' }],
        deviceNo: [{ required: true, message: '请输入设备编号' }],
        deviceRegNo: [{ required: true, message: '请输入设备注册号' }],
        deviceModel: [{ required: true, message: '请输入活动资源' }],
        deviceCertNo: [{ required: true, message: '请输入使用证编号' }],
        deviceProduceNo: [{ required: true, message: '请输入设备出厂编号' }],
        installAddr: [{ required: true, message: '请选择设备安装地址' }],
        deviceInstallAddress: [{ required: true, message: '请输入详细地址' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'equipmentAllType'
    ])
  },
  watch: {
    infomation: function(val) {
      this.dataChange()
    }
  },
  mounted() {
    if (this.equipmentAllType.length === 0) {
      this.$store.dispatch('actionsDeviceType')
    }
    this.dataChange()
  },
  methods: {
    dataChange() {
      if (this.infomation) {
        this.isShow = true
        const infomation = this.infomation
        infomation.areaAddr = [infomation.useArea2, infomation.useArea3, infomation.useArea4]
        this.unit = infomation
      } else {
        this.isShow = false
      }
    },
    sure() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const {
            id,
            areaAddr,
            useName,
            useCreditCode,
            useTel,
            // useAddress,
            useArea1,
            useAreaName1,
            useFullAddress,
            useLegalPerson,
            useLegalPersonTel,
            useContactMan,
            useContactManTel
          } = this.unit
          const [useArea2, useArea3, useArea4] = areaAddr
          let [useAreaName2, useAreaName3, useAreaName4] = this.$refs['deviceArea'].$el.innerText.replace(/\s+/g, '').split('/')
          if (!useAreaName2) {
            useAreaName2 = ''
          }
          if (!useAreaName3) {
            useAreaName3 = ''
          }
          if (!useAreaName4) {
            useAreaName4 = ''
          }
          let data = {
            useName,
            useCreditCode,
            useTel,
            useAddress: `${useAreaName1}${useAreaName2}${useAreaName3}${useAreaName4}`,
            useArea1,
            useAreaName1,
            useArea2,
            useAreaName2,
            useArea3,
            useAreaName3,
            useArea4,
            useAreaName4,
            useFullAddress,
            useLegalPerson,
            useLegalPersonTel,
            useContactMan,
            useContactManTel
          }
          if (this.isShow) { // 编辑前
            data.id = id
            if (this.isAddDevice) {
              this.$refs['forms'].validate((valids) => {
                if (valids) {
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
                    deviceInstallAddress
                  } = this.info
                  const useEqueArr = this.$refs['useEques'].$el.innerText.replace(/\s+/g, '').split('/')
                  const deviceInstallAreaArr = this.$refs['deviceInstallAreas'].$el.innerText.replace(/\s+/g, '').split('/')
                  const [{ label }] = this.status.filter(item => { return item.value === status })
                  const dataInfo = {
                    deviceType1: `${useEque[0]}`, // 设备类型1
                    deviceTypeName1: useEqueArr[0], // 设备类型名称1
                    deviceType2: `${useEque[1]}`, // 设备类型2
                    deviceTypeName2: useEqueArr[1], // 设备类型名称2
                    deviceType3: `${useEque[2]}`, // 设备类型2
                    deviceTypeName3: useEqueArr[2], // 设备类型名称2
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
                    deviceInstallAddress // 详细地址
                  }
                  // console.log(dataInfo)
                  data = {
                    ...data,
                    ...dataInfo
                  }
                } else {
                  console.log('error submit!!')
                  return false
                }
              })
            }
            fetchEditCompanyUse(data).then(res => {
              if (res.resultCode === '0000000') {
                this.$message.success(res.resultDesc)
                this.closed()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
          } else { // 新增
            fetchAddCompanyUse(data).then(res => {
              if (res.resultCode === '0000000') {
                this.$message.success(res.resultDesc)
                this.closed()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
          } = this.unit
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
    closed() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  .title {
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    color:#333;
    background: #DBDBDB;
    margin-bottom: 10px;
  }
  .form-right {
    padding-top: 15px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

