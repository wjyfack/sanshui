<template>
  <div class="edit">
    <el-form ref="form" :model="form" label-width="130px">
      <el-form-item label="单位名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="统一社会信用代码">
        <el-input v-model="form.name"/>
      </el-form-item>
      
    </el-form>
    <el-form ref="forms" :model="info" :rules="rules" label-width="130px">
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
        <el-form-item label="详细地址" prop="detailAddr">
          <el-input v-model="info.detailAddr" class="input" placeholder="请输入详细地址"/>
        </el-form-item>
      </el-row>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="submitDevice('forms')">添加</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { fetchBeforeTask, fetchAddDevice } from '@/api/shebei'
export default {
  data() {
    return {
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
        detailAddr: ''
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
        detailAddr: [{ required: true, message: '请输入详细地址' }]
      }
    }
  },
  methods: {
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
          } = this.company
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
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  .title {
    padding: 16px;
    color:#333;
    background: #DBDBDB;
    margin-bottom: 10px;
  }
}
</style>

