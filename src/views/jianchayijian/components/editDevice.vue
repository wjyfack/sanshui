<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      :title="'新增设备'"
      :show="show"
      width="50%"
      append-to-body
      @close="$emit('update:show', false)">
      <div class="addDialog dialogForm">
        <el-form ref="addForm" :model="info" :rules="infoRules" label-position="right" label-width="130px">
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记证编号" prop="deviceCertNo">
                <el-input v-model="info.deviceCertNo" class="input" placeholder="请输入登记证编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备代码" prop="deviceNo">
                <el-input v-model="info.deviceNo" class="input" placeholder="请输入设备代码"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备名称" prop="deviceName">
                <el-input v-model="info.deviceName" class="input" placeholder="请输入设备名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备地址" prop="deviceAddress">
                <el-input v-model="info.deviceAddress" class="input" placeholder="请输入设备地址"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备型号" prop="deviceModel">
                <el-input v-model="info.deviceModel" class="input" placeholder="请输入设备型号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备规格" prop="deviceSize">
                <el-input v-model="info.deviceSize" class="input" placeholder="请输入设备规格"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位内部编号" prop="deviceInteriorUseCode">
                <el-input v-model="info.deviceInteriorUseCode" class="input" placeholder="请输入单位内部编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次检验日期" prop="deviceNextTestDate">
                <el-date-picker
                  v-model="info.deviceNextTestDate"
                  type="date"
                  placeholder="下次检验日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-form-item label="使用单位名称" prop="deviceUseName">
              <el-input v-model="info.deviceUseName" placeholder="请输入使用单位名称" style="width:100%">
                <el-button slot="append" icon="el-icon-search" @click="chageSearch"/>
              </el-input>
            </el-form-item>
            <el-dialog
              :visible.sync="dialogUnitVisible"
              append-to-body
              width="50%">
              <addUnit @closed="unitClose"/>
            </el-dialog>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="使用单位联系人">
                <el-input v-model="info.deviceUseContactMan" class="input" placeholder="请输入使用单位联系人"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用单位电话">
                <el-input v-model="info.deviceUseContactManTel" class="input" placeholder="请输入使用单位电话"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="使用单位地址">
              <el-input v-model="info.deviceUseAddress" placeholder="请输入使用单位地址"/>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="addDevice('addForm')">确认</el-button>
      </span>

    </el-dialog>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { status, addrCasc } from '@/utils/config'
import addUnit from '@/components/unitInfo/unit'
import imgLoad from '@/components/imgLoad/index'
import { fetchUpdateDevice } from '@/api/jiany'
export default {
  components: {
    addUnit,
    imgLoad
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    infod: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      status,
      addrCasc,
      visible: this.show,
      dialogMapVisible: false,
      dialogUnitVisible: false,
      phoneListString: '',
      info: this.infod,
      // {
      //   useEque: [], // 设备种类
      //   status: '', // 状态
      //   devNum: '', // 设备编号
      //   devName: '', // 设备名称
      //   devUnit: '', // 设备型号
      //   devReg: '', // 设备注册号
      //   useCert: '', // 使用证编号
      //   deviceIndexesID: '', // 设备系统编号
      //   detailAddr: '', // 详细地址
      //   Longitude: '', // 经度
      //   latitude: '', // 纬度
      //   deviceUseName: '', // 使用单位名称
      //   deviceUseContactMan: '', // 使用单位联系人
      //   deviceUseContactManTel: '', // 使用单位电话
      //   deviceUseAddress: '', // 使用单位地址
      //   devDetail: '', // 设备详情
      //   factNum: '', // 设备出厂编号
      //   installAddr: [], // 设备安装地址
      //   keyMonitor: '', // 重点监控设备
      //   deviceUseID: '' // 使用单位id
      // },
      infoRules: {
        useEque: [{ type: 'array', required: true, message: '请选择设备种类' }], // 设备种类
        deviceUseName: [{ type: 'string', required: true, message: '请输入使用单位名称' }],
        deviceUseAddress: [{ type: 'string', required: true, message: '请输入使用单位地址' }],
        deviceUseContactMan: [{ type: 'string', required: true, message: '请输入使用单位联系人' }],
        deviceUseContactManTel: [{ type: 'string', required: true, message: '请输入使用单位联系人电话' }],
        deviceCertNo: [{ type: 'string', required: true, message: '请输入使用登记证编号' }],
        deviceNo: [{ type: 'string', required: true, message: '请输入设备代码' }],
        deviceName: [{ type: 'string', required: true, message: '请输入设备名称' }],
        deviceAddress: [{ type: 'string', required: true, message: '请输入设备地址' }],
        deviceModel: [{ type: 'string', required: true, message: '请输入设备型号' }],
        deviceSize: [{ type: 'string', required: true, message: '请输入设备规格' }],
        deviceInteriorUseCode: [{ type: 'string', required: true, message: '请输入单位内部编号' }],
        deviceNextTestDate: [{ type: 'string', required: true, message: '请选择下次检验日期' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      // 'companyList',
      'equipmentAllType'
    ])
  },
  watch: {
    show() {
      this.visible = this.show
    },
    infod() {
      this.info = this.infod
    }
  },
  mounted() {
    // if (this.companyList.length === 0) {
    //   this.$store.dispatch('actionsMohuCom')
    // }
    if (this.equipmentAllType.length === 0) {
      this.$store.dispatch('actionsDeviceType')
    }
  },
  methods: {
    unitClose(event) {
      console.log(event)
      if (event.id) {
        const { id, useAddress, useContactMan, useContactManTel, useName } = event
        this.info.deviceUseID = id
        this.info.deviceUseAddress = useAddress
        this.info.deviceUseContactManTel = useContactManTel
        this.info.deviceUseContactMan = useContactMan
        this.info.deviceUseName = useName
      }
      this.dialogUnitVisible = false
    },
    sendImgLoad(event) {
      // console.log(event)
      this.phoneListString = event
    },
    addDevice(formName) { // 添加设备
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {
            useEque // 设备种类
          } = this.info
          const useEqueArr = this.$refs['useEques'].$el.innerText.replace(/\s+/g, '').split('/')
          // const deviceInstallAreaArr = this.$refs['deviceInstallArea'].$el.innerText.replace(/\s+/g, '').split('/')
          const statusName = this.status.filter(item => {
            return item.value === status
          })
          console.log(statusName)
          // console.log(useEqueArr, 123123)
          const data = {
            deviceType1: `${useEque[0]}`, // 设备类型1
            deviceTypeName1: useEqueArr[0], // 设备类型名称1
            ...this.info
          }
          console.log(data)
          fetchUpdateDevice(data).then(response => {
            const data = response
            if (data.resultCode === '0000000') {
              this.$message({
                message: data.resultDesc,
                type: 'success'
              })
              this.resetForm()
              // shuaxin
              const params = {
                deviceUseID: this.info.deviceUseID
              }
              this.$emit('change', params)
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
    resetForm() {
      this.visible = false
      this.$refs['addForm'].resetFields()
    },
    chageSearch() {
      this.dialogUnitVisible = true
    },
    handleClose(done) { done() }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialogForm {
  .row {padding-bottom: 16px;}
  .input {max-width: 220px;}
  .label {
    min-width: 105px;
    display: inline-block;
    .red {color: red}
  }
}
.bm-view {
  width: 100%;
  height: 500px;
}
</style>
