<template>
  <div class="dialogForm">
    <el-form ref="chuliForm" label-width="130px" >
      <div class="title">单位信息</div>
      <el-row class="row">
        <el-form-item label="单位名称" >
          <el-input v-model="company.useName" placeholder="请输入单位名称"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="使用单位地址" >
          <el-input v-model="company.useAddress" placeholder="请输入使用单位地址"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="单位法人">
            <el-input v-model="company.useLegalPerson" placeholder="请输入单位法人"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位联系人" required>
            <el-input v-model="company.useContactMan" placeholder="请输入单位联系人"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="单位联系方式" required>
            <el-input v-model="company.useContactManTel" placeholder="请输入单位联系方式"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人职务">
            <el-input v-model="company.checkUseContactPosition" placeholder="请输入联系人职务"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title"><span>关联设备</span> <el-button icon="el-icon-plus" size="mini" type="primary" @click="addDvice">添加设备</el-button></div>
      <el-table
        :data="deviceList"
        :show-header="false"
        max-height="200"
        style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">
            <el-form-item label="使用登记证" >
              <el-input v-model="scope.row.deviceCertNo" placeholder="请输入使用登记证"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-form-item label="出厂编号" >
              <el-input v-model="scope.row.DeviceProduceNo" placeholder="请输入出厂编号"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-form-item label="违反模板" >
              <el-select v-model="illegalCount[scope.$index]" placeholder="请选择违反条例">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <div class="title">检查记录表信息</div>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="检查类别" >
            <el-select v-model="record.checkType" placeholder="请选择" @change="taskSelect">
              <el-option
                v-for="item in taskType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
            <el-select v-model="record.checkType2" placeholder="请选择">
              <el-option
                v-for="item in insprcType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位类别" >
            <el-select :value="record.checkUseTypeNames" placeholder="请选择单位类别" @change="checkUseType">
              <el-option
                v-for="(item, index) in danWeiType"
                :key="item.value"
                :label="item.label"
                :value="index"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col>
          <el-form-item label="检查日期" >
            <el-date-picker
              v-model="record.checkDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-form-item label="检查问题" >
          <el-input v-model="record.checkProblem" type="textarea" placeholder="请输入检查问题"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="处理措施" >
          <el-radio-group v-model="record.checkResulTreatmentId" @change="onCheckbox">
            <el-radio :label="'1'">下达指令书</el-radio>
            <el-radio :label="'2'">直接封查</el-radio>
            <el-radio :label="'3'">实施扣押</el-radio>
            <el-radio :label="'4'">其他</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="检查意见" >
          <el-input v-model="record.checkOpinion" type="textarea" placeholder="请输入检查意见"/>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="zhilingshu-info">
      <div class="title">指令书信息</div>
      <el-form ref="form" label-width="130px">
        <el-row class="row">
          <el-form-item label="指令书编号">
            <el-input v-model="command.commandNo" class="input" placeholder="请输入指令书编号"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="指令书模板">
            <el-select :value="command.commandModel" placeholder="请选择指令书模板" @change="changeCommandMode">
              <el-option
                v-for="item in instructionModels"
                :key="item.id"
                :label="item.name"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="设备描述">
            <el-input v-model="command.commandDeviceProblem" type="textarea" placeholder="请输入设备描述"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="隐患描述">
            <div class="cont">
              <el-input v-model="command.dangerDescription" type="input" class="area" style="flex:1"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="违反条例">
            <div class="cont">
              <el-select v-model="command.commandAgainstRulesNames" disabled multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input v-model="command.commandAgainstRulesInfo" type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="处罚依据条例">
            <div class="cont">
              <el-select v-model="command.commandCcordingRulesNames" disabled multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input v-model="command.commandCcordingRulesInfo" type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="整改措施">
            <div class="cont">
              <el-select v-model="command.commandChangedNames" disabled multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input v-model="command.commandChangedInfo" type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="整改截止日期">
              <el-date-picker
                v-model="command.commandChangedEndDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指令书日期">
              <el-date-picker
                v-model="command.commandDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-form-item label="注明情况">
            <el-input v-model="command.remark" type="textarea" placeholder="" style="width:100%"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="现场图片" >
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :action="baseUrl+'/file/upload/ScenePictures'"
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>
        </el-row>
        <el-row class="row" style="margin-bottom: 10px;">
          <el-button type="warning">检查记录预览</el-button>
          <el-button type="primary">检查记录打印</el-button>
          <el-button type="warning">指令书预览</el-button>
          <el-button type="primary">指令书打印</el-button>
        </el-row>
        <div class="title">任务操作信息</div>
        <el-row class="row">
          <el-form-item label="任务状态" required>
            <el-radio-group v-model="auditStatus" @change="changeStatus">
              <el-radio :label="'1'">通过</el-radio>
              <el-radio :label="'0'">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="确认描述" required>
            <el-input v-model="confirmDesc" type="textarea" placeholder="请输入确认描述" style="width:100%"/>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">保存</el-button>
      <el-button @click="closed">取消</el-button>
    </span>
    <!-- 添加设备 -->
    <el-dialog
      :visible.sync="DialogAddDevice"
      width="45%"
      title=""
      append-to-body>
      <el-form ref="tianjiaForm" :model="info" :rules="rules" label-width="130px">
        <div class="device-info">
          <div class="info">
            <span>系统导入关联设备</span>
          </div>
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="noDeviceList"
            height="250"
            border
            style=""
            @selection-change="handleSelectionChange"
            @select.once="handelSameArea">
            <el-table-column
              type="selection"
              width="55"/>
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
          </el-table>
        </div>
        <div class="title">手动新增关联设备</div>
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
          <el-button type="primary" @click="submitDevice('tianjiaForm')">添加</el-button>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogAddDevice = false">取 消</el-button>
        <el-button type="primary" @click="selectDeviceQu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import taskCheck from '@/components/taskCheck/index'
import { fetchBeforeTask, fetchAddDevice } from '@/api/shebei'
import { fecthExamineTask } from '@/api/task'
import { mapGetters } from 'vuex'
import { status, addrCasc, danWeiType, baseUrl, taskType, inspectionType } from '@/utils/config'
import { getFormatDate } from '@/utils/common'
export default {
  components: {
    taskCheck
  },
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      status,
      addrCasc,
      baseUrl,
      danWeiType,
      taskType,
      inspectionType,
      dialogImageUrl: '',
      dialogVisible: false,
      nowFileList: [], // 现场图片
      DialogAddDevice: false,
      loading: false,
      noDeviceList: [],
      multipleSelection: [],
      insprcType: [],
      company: {
        useLegalPerson: '',
        useContactMan: '',
        useContactManTel: '',
        checkUseContactPosition: ''
      },
      command: {},
      deviceList: [],
      illegalCount: [],
      record: {},
      auditStatus: '1',
      confirmDesc: '审核通过',
      value5: '',
      value: '',
      options: [],
      radio: '',
      info: {
        useEque: [],
        status: '',
        deviceNo: '',
        deviceName: '',
        deviceRegNo: '',
        deviceModel: '',
        deviceCertNo: '',
        deviceProduceNo: '',
        installAddr: '',
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
  computed: {
    ...mapGetters([
      'instructionModels',
      'companyList',
      'equipmentAllType'
    ])
  },
  watch: {
    task: function(val, oldVal) {
      this.tackCheck()
    }
  },
  mounted() {
    if (this.instructionModels.length === 0) {
      this.$store.dispatch('actionsInstructionModels')
    }
    this.tackCheck()
  },
  methods: {
    changeStatus(event) {
      console.log(event)
      if (!~~event) {
        this.confirmDesc = '审核不通过'
      } else {
        this.confirmDesc = '审核通过'
      }
    },
    tackCheck() {
      // this.info = this.task
      const task = this.task
      const company = task.companyUse !== null ? task.companyUse : {}
      const record = task.checkRecord
      console.log(company, record)
      if (record && record.id) {
        console.log(2222222)
        if (company) {
          company.id = record.checkUseId
          company.useLegalPerson = record.checkUseLegalPerson ? record.checkUseLegalPerson : '' // 法人
          company.useContactMan = record.checkUseContactMan
          company.useContactManTel = record.checkUseContactManTel // 联系方式
          company.checkUseContactPosition = record.checkUseContactPosition
          company.useName = record.checkUseName // 单位名称
          company.useAddress = record.checkUseFullAddress // 单位地址
          company.useContactMan = record.checkUseContactMan // 联系人
          company.checkUseContactPosition = record.checkUseContactPosition // 联系人职务
        }
      }
      const command = task.command
      if (command && command.commandNo) {
        // console.log(command.commandAgainstRulesIds, 111231)
        command.commandAgainstRulesNames = command.commandAgainstRulesNames && typeof command.commandAgainstRulesNames !== 'object' ? command.commandAgainstRulesNames.split(',') : []
        command.commandCcordingRulesNames = command.commandCcordingRulesNames && typeof command.commandCcordingRulesNames !== 'object' ? command.commandCcordingRulesNames.split(',') : []
        command.commandChangedNames = command.commandChangedNames && typeof command.commandChangedNames !== 'object' ? command.commandChangedNames.split(',') : []
        this.command = command
      }
      if (company) {
        this.company = company
      }
      // if (!this.company.checkUseContactPosition) {
      //   this.company.checkUseContactPosition = '主管负责人'
      // } del

      // checkType2有值
      if (record.checkType2) this.insprcType = inspectionType
      if (record.checkDateStart || record.checkDateEnd) {
        // const tt = record.checkDateStart ? record.checkDateStart : ''
        const tts = record.checkDateEnd ? record.checkDateEnd : getFormatDate()
        record.checkDate = tts
      } else {
        record.checkDate = getFormatDate()
      }
      // console.log(record.checkType2)
      // if (record.checkResulTreatmentId === '1') { this.isShow = true } del
      this.record = record
      // console.log(record)
      this.deviceList = task.list === null ? [] : task.list
      this.illegalCount = this.deviceList.map(item => item.illegalCountId)
    },
    taskSelect(event) { // 检查类别
      console.log(event)
      switch (~~event) {
        case 0:
          this.insprcType = []
          break
        default:
          this.insprcType = inspectionType
      }
      this.record.checkType2 = ''
    },
    // 前判断添加设备
    addDvice() {
      if (this.company.id) {
        this.loading = true
        fetchBeforeTask(this.company.id).then(response => {
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
          this.DialogAddDevice = true
        })
      } else {
        this.$message('请输入单位名称')
      }
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
    selectDeviceQu() {
      if (this.multipleSelection.length !== 0) {
        this.DialogAddDevice = false
        this.deviceList = [...this.deviceList, ...this.multipleSelection]
        const ids = this.multipleSelection.map(item => item.illegalCountId)
        this.illegalCount = [...this.illegalCount, ...ids]
      } else {
        this.$message({
          message: '请勾选关联设备',
          type: 'warning'
        })
      }
    },
    changeCommandMode(event) {
      console.log(event)
      const {
        id,
        name,
        templateRulesTitel,
        templateProblemTitel,
        templatePenaltyTitel,
        templateMeasureTitel,
        // problem_dspt,
        rules_dspt,
        penalty_dspt,
        measure_dspt,
        // problem,
        rules,
        penalty,
        measure
      } = event
      this.command.commandAgainstRulesIds = rules
      this.command.commandCcordingRulesIds = penalty
      this.command.commandChangedIds = measure
      this.command.commandCcordingRulesInfo = penalty_dspt
      this.command.commandAgainstRulesInfo = rules_dspt
      this.command.commandChangedInfo = measure_dspt
      this.command.commandModelId = id
      this.command.commandModel = name
      this.command.dangerDescription = templateProblemTitel
      const commandAgainstRulesNames = templateRulesTitel.split(',').filter(item => { return item !== '' }) // 违反条例名称
      this.command.commandAgainstRulesNames = commandAgainstRulesNames
      const commandChangedNames = templateMeasureTitel.split(',').filter(item => { return item !== '' }) // 整改措施名称
      this.command.commandChangedNames = commandChangedNames
      const commandCcordingRulesNames = templatePenaltyTitel.split(',').filter(item => { return item !== '' }) // 处罚依据条例名称
      this.command.commandCcordingRulesNames = commandCcordingRulesNames
      /** 设备描述 */
      console.log(this.deviceList)
      const deviceNoString = this.deviceList.map(item => {
        return item.deviceCertNo
      }).join('、')
      this.command.commandDeviceProblem = `在用的【${deviceNoString}】+${templateProblemTitel}`
    },
    handleSuccess(response, file, fileList) {
      this.nowFileList = fileList
    },
    handleRemove(file, fileList) {
      this.nowFileList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getCheckResulTreatment(id) {
      let name = ''
      switch (~~id) {
        case 1:
          name = '下达指令书'
          break
        case 2:
          name = '直接封查'
          break
        case 3:
          name = '实施扣押'
          break
        case 4:
          name = '其他'
          break
      }
      return name
    },
    checkUseType(event) {
      console.log(event)
      const index = event
      this.record.checkUseTypes = danWeiType[index].value // 单位类别id
      this.record.checkUseTypeNames = danWeiType[index].label // 单位类别名称
    },
    getTaskCheck(event) { // 检查类别
      // console.log(event)
      const { taskStatus, instructionStatus } = event
      this.record.checkType = taskStatus // 检查类别1
      this.record.checkType2 = instructionStatus // 检查类别2
    },
    sure() { // 确定
      // 判断
      const auditStatus = this.auditStatus
      const confirmDesc = this.confirmDesc
      if (!confirmDesc) {
        this.$message.error('请输入确认描述')
        return ''
      }
      const { id, checkNo } = this.task
      const checkUseId = this.company.id // 使用单位id
      const {
        useName, // 单位名称
        useAddress, // 单位地址
        useLegalPerson, // 法人
        useContactMan, // 联系人
        useContactManTel, // 联系方式
        checkUseContactPosition // 联系人职务
      } = this.company
      const {
        checkType,
        checkType2,
        checkUseTypes,
        checkUseTypeNames,
        checkDate,
        checkProblem,
        checkResulTreatmentId,
        checkOpinion
      } = this.record
      const {
        commandNo,
        commandModel, // 暂无
        commandModelId,
        commandDeviceProblem,
        dangerDescription,
        commandAgainstRulesIds,
        commandAgainstRulesNames, // 暂无
        commandAgainstRulesInfo,
        commandCcordingRulesIds,
        commandCcordingRulesNames, // 暂无
        commandCcordingRulesInfo,
        commandChangedIds,
        commandChangedNames, // 暂无
        commandChangedInfo,
        commandChangedEndDate,
        commandDate,
        remark // ,注明情况
        // auditStatus,
        // confirmDesc
        // companyUseConfirmMan,
        // companyUseConfirmManPhone
      } = this.command
      // 设备ids
      const deviceIds = this.deviceList.map(item => item.id).join(',')
      // 违反模板ids
      const illegalCountIds = this.illegalCount.join(',')
      // checkDate 检查日期
      // const [checkDateStart, checkDateEnd] = checkDate
      // 处理措施
      const checkResulTreatmentName = this.getCheckResulTreatment(checkResulTreatmentId)
      const checkRecordId = this.record.id
      const commandId = this.command.id
      // 监察指令书
      // console.log(this.nowFileList)
      const commandProblemPhotoList = this.nowFileList.map(item => {
        return item.response.returnData
      }).join(',')
      const data = {
        taskCheckId: id, // 任务id
        taskCheckCheckNo: checkNo, // 任务编号
        checkUseId, // 使用单位id
        checkUseName: useName, // 单位名称
        checkUseFullAddress: useAddress, // 单位地址
        checkUseLegalPerson: useLegalPerson, // 法人
        checkUseContactMan: useContactMan, // 联系人
        checkUseContactManTel: useContactManTel, // 联系方式
        checkUseContactPosition, // 联系人职务
        deviceIds,
        illegalCountIds,
        checkType,
        checkType2,
        checkUseTypes,
        checkUseTypeNames,
        checkDateStart: checkDate,
        checkDateEnd: checkDate,
        checkProblem,
        checkResulTreatmentId,
        checkResulTreatmentName,
        checkOpinion,
        checkRecordId,
        commandId,
        commandNo,
        commandModel,
        commandModelId,
        commandDeviceProblem,
        dangerDescription,
        commandAgainstRulesIds: commandAgainstRulesIds,
        commandAgainstRulesNames: commandAgainstRulesNames.join(','),
        commandAgainstRulesInfo,
        commandCcordingRulesIds: commandCcordingRulesIds,
        commandCcordingRulesNames: commandCcordingRulesNames.join(','),
        commandCcordingRulesInfo,
        commandChangedIds: commandChangedIds,
        commandChangedNames: commandChangedNames.join(','),
        commandChangedInfo,
        commandChangedEndDate,
        commandDate,
        remark, // 注明情况
        commandProblemPhotoList,
        auditStatus,
        confirmDesc,
        // companyUseConfirmMan,
        // companyUseConfirmManPhone
        operateName: '审核任务', // operate
        checkNo: checkNo
      }
      console.log(data, 11)
      // return ''
      fecthExamineTask(data).then(res => {
        console.log(res)
        if (res.resultCode === '0000000') {
          this.$message({
            message: res.resultDesc,
            type: 'success'
          })
          this.closed()
        } else {
          this.$message({
            message: res.resultDesc,
            type: 'fail'
          })
        }
      })
    },
    closed() {
      this.$emit('closed')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getMoreSelect(arr, types) {
      if (!arr) { return '' }
      let arrName = []
      types.map(item => {
        if (arr.indexOf(item.value) > -1) {
          arrName = [...arrName, item.label]
        }
      })
      return arrName.join(',')
    },
    onCheckbox(event) {
      // this.isShow = event
      console.log(event)
      switch (~~event) {
        case 1:
          this.isShow = true
          break
        default:
          this.isShow = false
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogForm {
  .title {
    display:flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    color:#333;
    background: #DBDBDB;
    padding: 0 10px;
    margin-bottom: 10px;
  }
  .row {}
  .input {width: 100%}
  .label {
    min-width: 120px;
    display: inline-block;
    .red {color: red}
  }
  .cont {
    flex: 1;
    display: flex;
    flex-direction: column;
    .select {width: 100%;}
    .area {width:100%;}
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
