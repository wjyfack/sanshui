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

      <div class="title">关联设备数量</div>
      <el-row class="row">
        <el-col :span="8">
          <el-form-item label="电梯">
            <el-input v-model="record.deviceType3Count" placeholder="请输入电梯"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专用机动车">
            <el-input v-model="record.deviceType8Count" placeholder="请输入专用机动车"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起重机">
            <el-input v-model="record.deviceType7Count" placeholder="请输入起重机"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8">
          <el-form-item label="锅炉">
            <el-input v-model="record.deviceType1Count" placeholder="请输入锅炉"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="压力容器">
            <el-input v-model="record.deviceType2Count" placeholder="请输入压力容器"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="压力管道">
            <el-input v-model="record.deviceType5Count" placeholder="请输入压力管道"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="游乐设施">
            <el-input v-model="record.deviceType4Count" placeholder="请输入压力管道"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">检查记录表信息</div>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="检查类别" required>
            <div style="display:flex;">
              <el-select v-model="record.checkType" placeholder="请选择" @change="taskSelect">
                <el-option
                  v-for="item in taskType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-select v-model="record.checkType2" filterable allow-create placeholder="请选择">
                <el-option
                  v-for="item in insprcType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位类别" required>
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
          <el-form-item label="检查日期" required>
            <el-date-picker
              v-model="record.checkDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-form-item label="检查问题" required>
          <el-input v-model="record.checkProblem" type="textarea" placeholder="请输入检查问题"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="处理措施" required>
          <el-checkbox-group v-model="checkBoxValue" @change="onCheckboxT">
            <el-checkbox :label="'1'">下达指令书</el-checkbox>
            <el-checkbox :label="'2'">直接封查</el-checkbox>
            <el-checkbox :label="'3'">实施扣押</el-checkbox>
            <el-checkbox :label="'4'">其他</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="检查意见" required>
          <el-input v-model="record.checkOpinion" type="textarea" placeholder="请输入检查意见"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="现场图片">
          <img-load v-if="imgUrl" :imgurl="imgUrl" :imgshow="baseImgUrl" :time="`${new Date().getTime()}`" @sendimg="sendImgLoad"/>
        </el-form-item>
      </el-row>
      <div v-show="isShow" class="title">
        <span>关联设备</span>
        <div class="flex-all">
          <el-select v-model="IllegalCountIds" multiple class="select" placeholder="请选择指令书模板" @change="changeAlldevice">
            <el-option
              v-for="item in instructionModels"
              :key="item.id"
              :label="item.problemTitle"
              :value="item.id"/>
          </el-select>
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="addDvice">添加设备</el-button>
        </div>
      </div>
      <el-table
        v-show="isShow"
        :data="deviceList"
        :show-header="false"
        max-height="200"
        style="width: 100%">
        <el-table-column>
          <template slot-scope="scope">
            <el-form-item label="使用登记证" >
              <el-input v-model="scope.row.deviceCertNo" disabled placeholder="请输入使用登记证"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-form-item label="出厂编号" >
              <el-input v-model="scope.row.deviceProduceNo" disabled placeholder="请输入出厂编号"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-form-item label="隐患模板" >
              <el-select v-model="deviceList[scope.$index].illegalCountId" multiple placeholder="请选择指令书模板" @change="changeOnlyDevice">
                <el-option
                  v-for="item in instructionModels"
                  :key="item.id"
                  :label="item.problemTitle"
                  :value="item.id"/>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div v-show="isShow" class="zhilingshu-info">
      <div class="title">指令书信息</div>
      <el-form ref="form" label-width="130px">
        <el-row class="row">
          <el-form-item label="指令书编号">
            <el-input v-model="command.commandNo" class="input" placeholder="请输入指令书编号"/>
          </el-form-item>
        </el-row>
        <!-- <el-row class="row">
          <el-form-item label="指令书流水号">
            <el-input class="input" placeholder="请输入指令书流水号"/>
          </el-form-item>
        </el-row> -->
        <!-- <el-row class="row">
          <el-form-item label="指令书模板" required>
            <el-select :value="command.commandModel" placeholder="请选择指令书模板" @change="changeCommandMode">
              <el-option
                v-for="(item, index) in instructionModels"
                :key="item.id"
                :label="item.name"
                :value="index"/>
            </el-select>
          </el-form-item>
        </el-row> -->
        <el-row class="row">
          <el-form-item label="设备描述">
            <el-input v-model="command.commandDeviceProblem" :rows="2" type="textarea" placeholder="请输入设备描述"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="隐患描述">
            <div class="cont">
              <el-input v-model="command.dangerDescription" :rows="4" type="textarea" class="area" style="flex:1"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="违反条例">
            <div class="cont">
              <!-- <el-select v-model="command.commandAgainstRulesNames" disabled multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select> -->
              <el-input v-model="command.commandAgainstRulesInfo" :rows="4" type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="处罚依据条例">
            <div class="cont">
              <!--  <el-select v-model="command.commandCcordingRulesNames" disabled multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select> -->
              <el-input v-model="command.commandCcordingRulesInfo" :rows="4" type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="整改措施">
            <div class="cont">
              <!--  <el-select v-model="command.commandChangedNames" disabled multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select> -->
              <el-input v-model="command.commandChangedInfo" :rows="4" type="textarea" class="area"/>
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
          <el-col :span="12">
            <el-form-item label="使用单位确认人">
              <el-input v-model="command.companyUseConfirmMan" class="input" placeholder="使用单位确认人"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <el-input v-model="command.companyUseConfirmManPhone" class="input" placeholder="联系方式"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button v-if="!isShow" type="warning">检查记录打印</el-button>-->
      <!--  <div style="padding-left: 30px;">
        <el-button type="warning" @click="recordPreview">检查记录预览</el-button>
        <el-button v-if="isShow" type="warning" @click="instructionPreview">指令书预览</el-button>
      </div>
      <div>
        <el-button :loading="subLoading" type="primary" @click="sure">确定</el-button>
        <el-button @click="closed">取消</el-button>
      </div>
      -->
    </span>
    <!-- 添加设备 -->
    <el-dialog
      :visible.sync="DialogAddDevice"
      title=""
      append-to-body>
      <add-device v-if="DialogAddDevice" :device="device" @closed="changeDevice"/>
    </el-dialog>
    <el-dialog
      :visible.sync="previewRecordDialog"
      width="850px"
      title=""
      top= "0"
      center
      append-to-body>
      <previewRecord :record="recordpv"/>
    </el-dialog>
    <el-dialog
      :visible.sync="previewInstrDialog"
      width="850px"
      title=""
      top= "0"
      center
      append-to-body>
      <previewInstruction :command="pInstruction"/>
    </el-dialog>
  </div>
</template>

<script>
import taskCheck from '@/components/taskCheck/index'
// import { fetchBeforeTask } from '@/api/shebei'
import { fectEditTask } from '@/api/task'
import { mapGetters } from 'vuex'
import { getFormatDate, getFormatDate30, autoDeviceCountConcat } from '@/utils/common'
import { danWeiType, taskType, inspectionType, baseUrl } from '@/utils/config'
import addDevice from '@/components/addDevice/index'
import previewRecord from '@/components/previewRecord/index'
import previewInstruction from '@/components/previewInstruction/index'
import { toViewer } from '@/utils/common'
export default {
  components: {
    taskCheck,
    addDevice,
    previewRecord,
    previewInstruction
  },
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      IllegalCountIds: [],
      checkBoxValue: [],
      baseImgUrl: `${baseUrl}/file/show/ScenePictures/`,
      imgUrl: `${baseUrl}/file/upload/ScenePictures`,
      // IrregularitiesType,
      taskType,
      danWeiType,
      inspectionType,
      subLoading: false,
      DialogAddDevice: false,
      previewRecordDialog: false,
      previewInstrDialog: false,
      loading: false,
      noDeviceList: [],
      multipleSelection: [],
      insprcType: [],
      device: {},
      company: { // 公司
        useName: '',
        useLegalPerson: '',
        useContactMan: '',
        useContactManTel: '',
        checkUseContactPosition: ''
      },
      command: {
        commandNo: '',
        commandModel: '', // 暂无
        commandModelId: '',
        commandDeviceProblem: '',
        dangerDescription: '',
        commandAgainstRulesIds: [],
        commandAgainstRulesNames: '', // 暂无
        commandAgainstRulesInfo: '',
        commandCcordingRulesIds: [],
        commandCcordingRulesNames: '', // 暂无
        commandCcordingRulesInfo: '',
        commandChangedIds: [],
        commandChangedNames: '', // 暂无
        commandChangedInfo: '',
        commandChangedEndDate: getFormatDate30(),
        commandDate: getFormatDate(),
        remark: '', // 注明情况
        companyUseConfirmMan: '',
        companyUseConfirmManPhone: ''
      }, // 指令书
      record: {
        checkDate: [] // 日期
      }, // 指令书
      recordpv: {},
      pInstruction: {},
      deviceList: [],
      illegalCount: [], // 隐患模板ids
      info: {
        taskCheckId: '', // 任务id
        taskCheckCheckNo: '', // 任务编号
        checkUseId: '', // 使用单位id
        checkUseName: '', // 单位名称
        checkUseFullAddress: '', // 使用单位地址
        checkUseLegalPerson: '', // 单位法人
        checkUseContactMan: '', // 单位联系人
        checkUseContactManTel: '', // 单位联系方式
        checkUseContactPosition: '主管负责人', // 联系人职位
        IllegalCountIds: '', // 违法模板
        deviceIds: '', // 设备ids
        deviceType1Count: '', // 锅炉数量
        deviceType2Count: '', // 压力容器数量
        deviceType3Count: '', // 电梯数量
        deviceType4Count: '', // 大型游乐设施数量
        deviceType5Count: '', // 压力管道数量
        deviceType6Count: '', // 客运索道数量
        deviceType7Count: '', // 起重机械数量
        deviceType8Count: '', // 场（厂）内专用机动车辆数量
        deviceType9Count: '', // 管道元件数量
        deviceType10Count: '', // 安全附件及安全保护装置数量
        checkType: '', // 检查类别1
        checkType2: '', // 检查类别2
        checkUseTypes: '', // 单位类别id
        checkUseTypeNames: '', // 单位类别名称
        checkProblem: '', // 检查问题
        checkResulTreatmentId: '', // 处理措施id
        checkResulTreatmentName: '', // 处理措施名称
        checkOpinion: '', // 检查意见
        checkDateStart: '', // 检查开始日期
        checkDateEnd: '', // 检查结束日期
        commandNo: '', // 指令书编号
        commandModelId: '', // 指令书模板id
        commandModel: '', // 指令书模板名称
        commandDeviceProblem: '', // 设备描述
        dangerDescription: '', // 隐患描述
        commandAgainstRulesIds: '', // 违反条例
        commandAgainstRulesNames: [], // 违反条例名称
        commandAgainstRulesInfo: '', // 违反条例描述
        commandCcordingRulesIds: '', // 处罚依据条例id
        commandCcordingRulesNames: [], // 处罚依据条例名称
        commandCcordingRulesInfo: '', // 处罚依据条例描述
        commandChangedIds: '', // 整改截止日期id
        commandChangedNames: [], // 整改截止日期名称
        commandChangedInfo: '', // 整改措施描述
        commandChangedEndDate: '', // 整改截止日期
        commandDate: '', // 指令书日期
        companyUseConfirmMan: '', // 单位确认人
        companyUseConfirmManPhone: '', // 联系方式
        checkStatus: '5', // 任务状态 5
        checkRecordId: '', // 检查记录表编号
        commandId: '' // 检查记录表编号
      },
      isShow: false,
      value5: '',
      value: '',
      options: [
      ],
      radio2: '',
      phoneListString: '',
      commandPhotoList: []
    }
  },
  computed: {
    ...mapGetters([
      'instructionModels',
      'IrregularitiesType'
    ])
  },
  watch: {
    task: function(val) {
      this.tackCheck()
    }
  },
  mounted() {
    if (this.instructionModels.length === 0) {
      this.$store.dispatch('actionsInstructionModels')
    }
    if (this.IrregularitiesType.length === 0) {
      this.$store.dispatch('actionsTaskIllegal')
    }
    this.tackCheck()
  },
  methods: {
    changeAlldevice(event) { // 全部指令书模板
      // console.log(event)
      const deviceList = this.deviceList
      deviceList.map(item => { // 遍历添加到每一个设备
        item.illegalCountId = event
        return item
      })
      this.deviceList = deviceList
      this.autoCommand()
    },
    changeOnlyDevice(event) {
      this.autoCommand()
    },
    autoCommand() { // 自动填充内容
      const info = { // 最后结果
        commandAgainstRulesIds: [],
        commandCcordingRulesIds: [],
        commandChangedIds: [],
        commandCcordingRulesInfo: [],
        commandAgainstRulesInfo: [],
        commandChangedInfo: [],
        commandModelId: [],
        commandModel: [],
        dangerDescription: [],
        templateRulesTitel: [],
        templateProblemTitel: [],
        templatePenaltyTitel: [],
        templateMeasureTitel: []
      }
      const commandDeviceProblem = [] // 设备描述
      // 选择的隐患模板 不重复的
      let illegalSelect = []
      this.deviceList.forEach(item => {
        // let illSelect = `在用的【${item.deviceCertNo}】` // 拼接
        illegalSelect = [...illegalSelect, ...item.illegalCountId] // 要去重的
        // const deviceCertNo = item.deviceCertNo // 编号
        let nameArr = [] // 设备描述
        this.instructionModels.map(model => {
          if (item.illegalCountId.some(s => s === model.id)) {
            nameArr = [...nameArr, model.problemTitle]
          }
        })
        commandDeviceProblem.push(`【${item.deviceCertNo}】${nameArr.join('、')}`)
      })
      const illegalCountIds = Array.from(new Set(illegalSelect)) // 模板的id
      this.instructionModels.map(item => {
        if (illegalCountIds.some(id => id === item.id)) {
          // console.log(item)
          info.commandAgainstRulesIds.push(item.rules)
          info.commandCcordingRulesIds.push(item.penalty)
          info.commandChangedIds.push(item.measure)
          // Info
          info.commandCcordingRulesInfo = info.commandCcordingRulesInfo.concat(item.penalty_dspt.split('；'))
          info.commandAgainstRulesInfo = info.commandAgainstRulesInfo.concat(item.rules_dspt.split('；'))
          info.commandChangedInfo = info.commandChangedInfo.concat(item.measure_dspt.split('；'))
          info.dangerDescription = info.dangerDescription.concat(item.problem_dspt.split('；')) // 隐患描述
          // Info
          info.commandModelId.push(item.id)
          info.commandModel.push(item.name)
          info.templateRulesTitel.push(item.templateRulesTitel)
          info.templateProblemTitel.push(item.templateProblemTitel)
          info.templatePenaltyTitel.push(item.templatePenaltyTitel)
          info.templateMeasureTitel.push(item.templateMeasureTitel)
          info.templateMeasureTitel.push(item.templateMeasureTitel)
          // if (info.commandModelId) {
          //   info.commandModelId += `,${item.id}`
          //   info.commandModel += `,${item.name}`
          //   info.commandAgainstRulesIds += `,${item.rules}`
          //   info.commandCcordingRulesIds += `,${item.penalty}`
          //   info.commandChangedIds += `,${item.measure}`
          //   info.commandCcordingRulesInfo += `${item.penalty_dspt}`
          //   info.commandAgainstRulesInfo += `${item.rules_dspt}`
          //   info.commandCcordingRulesIds += `,${item.penalty}`
          //   info.commandChangedInfo += `${item.measure_dspt}`
          //   info.dangerDescription += `,${item.problem_dspt}`
          //   info.templateProblemTitel = `,${item.templateProblemTitel}`
          //   info.templatePenaltyTitel = `,${item.templatePenaltyTitel}`
          //   info.templateMeasureTitel = `,${item.templateMeasureTitel}`
          //   info.templateRulesTitel = `,${item.templateRulesTitel}`
          // } else {
          //   info.commandModelId = `${item.id}`
          //   info.commandModel = `${item.name}`
          //   info.commandAgainstRulesIds = `${item.rules}`
          //   info.commandCcordingRulesIds = `${item.penalty}`
          //   info.commandChangedIds = `${item.measure}`
          //   info.commandCcordingRulesInfo = `${item.penalty_dspt}`
          //   info.commandAgainstRulesInfo = `${item.rules_dspt}`
          //   info.commandCcordingRulesIds = `${item.penalty}`
          //   info.commandChangedInfo = `${item.measure_dspt}`
          //   info.dangerDescription = `${item.problem_dspt}`
          //   info.templateProblemTitel = `${item.templateProblemTitel}`
          //   info.templatePenaltyTitel = `${item.templatePenaltyTitel}`
          //   info.templateMeasureTitel = `${item.templateMeasureTitel}`
          //   info.templateRulesTitel = `${item.templateRulesTitel}`
          // }
        }
      })
      // console.log(info)
      // 显示
      this.command.commandAgainstRulesIds = Array.from(new Set(info.commandAgainstRulesIds)).join(',')
      this.command.commandCcordingRulesIds = Array.from(new Set(info.commandCcordingRulesIds)).join(',')
      this.command.commandChangedIds = Array.from(new Set(info.commandChangedIds)).join(',')
      // Info
      const commandCcordingRulesInfo = Array.from(new Set(info.commandCcordingRulesInfo)).map((item, index) => {
        return `${index + 1}、${item}`
      }).join('；')
      this.command.commandCcordingRulesInfo = commandCcordingRulesInfo ? commandCcordingRulesInfo + '。' : ''
      const commandAgainstRulesInfo = Array.from(new Set(info.commandAgainstRulesInfo)).map((item, index) => {
        return `${index + 1}、${item}`
      }).join('；')
      this.command.commandAgainstRulesInfo = commandAgainstRulesInfo ? commandAgainstRulesInfo + '。' : ''
      const commandChangedInfo = Array.from(new Set(info.commandChangedInfo)).map((item, index) => {
        return `${index + 1}、${item}`
      }).join('；')
      this.command.commandChangedInfo = commandChangedInfo ? commandChangedInfo + '。' : ''
      const dangerDescription = Array.from(new Set(info.dangerDescription)).map((item, index) => {
        return `${index + 1}、${item}`
      }).join('；')
      this.command.dangerDescription = dangerDescription ? dangerDescription + '。' : ''
      // Info
      this.command.commandModelId = info.commandModelId.join(',')
      this.command.commandModel = info.commandModel.join(',')
      this.command.commandAgainstRulesNames = info.templateRulesTitel.filter(item => { return item !== '' }) // 违反条例名称
      this.command.commandChangedNames = info.templateMeasureTitel.filter(item => { return item !== '' }) // 整改措施名称
      this.command.commandCcordingRulesNames = info.templatePenaltyTitel.filter(item => { return item !== '' }) // 处罚依据条例名称
      this.record.checkProblem = this.command.commandDeviceProblem = '在用的' + commandDeviceProblem.join('；') + '。'
      /** 设备描述 */
      // console.log(this.deviceList)
      // const deviceNoString = this.deviceList.map(item => {
      //   return item.deviceCertNo
      // }).join('、')
      // this.command.commandDeviceProblem = `在用的【${deviceNoString}】${templateProblemTitel}`
    },
    onCheckboxT(value) {
      // this.isShow = value
      console.log(value)
      console.log(this.record.checkResulTreatmentId)
      const isShow = this.checkBoxValue.some(item => item === '1')
      this.isShow = isShow
      // switch (~~event) {
      //   case 1:
      //     this.isShow = true
      //     break
      //   default:
      //     this.isShow = false
      //     break
      // }
    },
    hasHandlePreview(url) {
      toViewer(url)
    },
    sendImgLoad(event) {
      // console.log(event)
      this.phoneListString = event
    },
    instructionPreview() {
      const {
        commandChangedEndDate,
        commandNo,
        commandDeviceProblem,
        commandDate,
        commandAgainstRulesInfo,
        commandCcordingRulesInfo,
        commandChangedInfo,
        commandModel
      } = this.command
      if (!commandModel) {
        this.$message.error('请选择指令书模板')
        return ''
      }
      const {
        useName
      } = this.company
      this.pInstruction = {
        useName,
        commandChangedEndDate,
        commandNo,
        commandDeviceProblem,
        commandDate,
        commandAgainstRulesInfo,
        commandCcordingRulesInfo,
        commandChangedInfo
      }
      this.previewInstrDialog = true
    },
    recordPreview() {
      const { checkNo } = this.task
      const {
        useName, // 单位名称
        useAddress, // 单位地址
        useLegalPerson, // 法人
        useContactMan, // 联系人
        useContactManTel, // 联系方式
        checkUseContactPosition // 联系人职务
      } = this.company
      const {
        checkType, // 任务
        checkType2,
        checkUseTypes,
        checkUseTypeNames, // 单位类型
        checkDate,
        checkProblem,
        checkResulTreatmentId,
        checkOpinion
      } = this.record
      // if (!checkUseTypeNames) {
      //   this.$message.error('请选择单位类别')
      //   return ''
      // } else if (!checkProblem) {
      //   this.$message.error('请输入检查意见')
      //   return ''
      // }
      this.recordpv = {
        useName, // 单位名称
        useAddress, // 单位地址
        useLegalPerson, // 法人
        useContactMan, // 联系人
        useContactManTel, // 联系方式
        checkUseContactPosition,
        checkType, // 任务
        checkType2,
        checkUseTypes,
        checkUseTypeNames, // 单位类型
        checkDate,
        checkProblem,
        checkResulTreatmentId,
        checkOpinion,
        checkNo
      }
      console.log(this.recordpv)
      this.previewRecordDialog = true
    },
    changeDevice(event) {
      if (event.length !== 0) {
        this.deviceList = event.map(item => {
          const data = item
          if (item.illegalCountId) {
            data.illegalCountId = item.illegalCountId ? item.illegalCountId.split(',') : []
          } else {
            data.illegalCountId = []
          }
          return data
        })
        console.log(this.deviceList)
        const {
          deviceType1Count,
          deviceType2Count,
          deviceType3Count,
          deviceType4Count,
          deviceType5Count,
          deviceType6Count,
          deviceType7Count,
          deviceType8Count,
          deviceType9Count,
          deviceType10Count
        } = autoDeviceCountConcat(this.deviceList)
        this.record.deviceType1Count = deviceType1Count
        this.record.deviceType2Count = deviceType2Count
        this.record.deviceType3Count = deviceType3Count
        this.record.deviceType4Count = deviceType4Count
        this.record.deviceType5Count = deviceType5Count
        this.record.deviceType6Count = deviceType6Count
        this.record.deviceType7Count = deviceType7Count
        this.record.deviceType8Count = deviceType8Count
        this.record.deviceType9Count = deviceType9Count
        this.record.deviceType10Count = deviceType10Count
        const deviceNoString = this.deviceList.map(item => {
          return item.deviceCertNo
        }).join('、')
        this.command.commandDeviceProblem = `在用的【${deviceNoString}】${this.command.dangerDescription}`
      }
      this.DialogAddDevice = false
    },
    tackCheck() {
      console.log(this.task)
      const task = this.task
      // console.log(task)
      const company = task.companyUse
      const record = task.checkRecord
      if (company) {
        const useArea2 = company.useArea2 ? company.useArea2 : ''
        const useArea3 = company.useArea3 ? company.useArea3 : ''
        const useArea4 = company.useArea4 ? company.useArea4 : ''
        const area = [useArea2, useArea3, useArea4]
        const useAddress = company.useAddress
        const local = { area, useAddress }
        console.log(local)
        this.$store.dispatch('actionsLocalAddr', local)
      }
      if (record && record.id) {
        company.useLegalPerson = record.checkUseLegalPerson ? record.checkUseLegalPerson : ''
        company.useContactMan = record.checkUseContactMan
        company.useContactManTel = record.checkUseContactManTel
        company.checkUseContactPosition = record.checkUseContactPosition
      } else {
        // record.checkUseTypes = 6
        record.checkUseTypeNames = '使用'
      }
      const command = task.command
      if (command && command.commandNo) {
        // console.log(command.commandAgainstRulesIds, 111231)
        command.commandAgainstRulesNames = command.commandAgainstRulesNames && typeof command.commandAgainstRulesNames !== 'object' ? command.commandAgainstRulesNames.split(',') : []
        command.commandCcordingRulesNames = command.commandCcordingRulesNames && typeof command.commandCcordingRulesNames !== 'object' ? command.commandCcordingRulesNames.split(',') : []
        command.commandChangedNames = command.commandChangedNames && typeof command.commandChangedNames !== 'object' ? command.commandChangedNames.split(',') : []
        command.commandDate = command.commandDate !== null ? command.commandDate : getFormatDate()
        command.commandChangedEndDate = command.commandChangedEndDate !== null ? command.commandChangedEndDate : getFormatDate30()
        command.companyUseConfirmMan = company.useContactMan // 联系人
        command.companyUseConfirmManPhone = company.useContactManTel // 联系方式
        this.command = command
      }
      console.log(this.command)
      this.company = company
      if (!this.company.checkUseContactPosition) {
        this.company.checkUseContactPosition = '主管负责人'
      }

      // 编辑前 检查类别
      if (task.taskStatusName) {
        this.insprcType = inspectionType
        record.checkType2 = task.taskStatusName
      }
      if (task.taskStatus) {
        record.checkType = task.taskStatus
      }
      // if (record.checkDateStart || record.checkDateEnd) {
      //   // const tt = record.checkDateStart ? record.checkDateStart : ''
      //   const tts = record.checkDateEnd ? record.checkDateEnd : getFormatDate()
      //   record.checkDate = tts
      // } else {
      //   record.checkDate = getFormatDate()
      // }
      if (!record.checkDate) {
        record.checkDate = getFormatDate()
      }
      // console.log(record)
      if (record.checkResulTreatmentId !== null) {
        const checkBoxValue = record.checkResulTreatmentId ? record.checkResulTreatmentId.split(',') : []
        this.isShow = record.checkResulTreatmentId.split(',').some(item => item === '1')
        this.checkBoxValue = checkBoxValue
      }
      const {
        deviceType1Count,
        deviceType2Count,
        deviceType3Count,
        deviceType4Count,
        deviceType5Count,
        deviceType6Count,
        deviceType7Count,
        deviceType8Count,
        deviceType9Count,
        deviceType10Count
      } = autoDeviceCountConcat(this.deviceList)
      record.deviceType1Count = deviceType1Count
      record.deviceType2Count = deviceType2Count
      record.deviceType3Count = deviceType3Count
      record.deviceType4Count = deviceType4Count
      record.deviceType5Count = deviceType5Count
      record.deviceType6Count = deviceType6Count
      record.deviceType7Count = deviceType7Count
      record.deviceType8Count = deviceType8Count
      record.deviceType9Count = deviceType9Count
      record.deviceType10Count = deviceType10Count
      this.record = record
      // console.log(record)
      this.deviceList = task.list.map(item => {
        const data = item
        if (item.illegalCountId) {
          data.illegalCountId = item.illegalCountId.split(',')
        } else {
          data.illegalCountId = []
        }
        return data
      })
      // this.illegalCount = this.deviceList.map(item => item.illegalCountId)
      this.autoCommand()
    },
    changeCommandMode(event) {
      // console.log(event)
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
      } = this.instructionModels[event]
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
      this.command.commandDeviceProblem = `在用的【${deviceNoString}】${templateProblemTitel}`
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
      const device = {
        company: this.company,
        list: this.deviceList
      }
      this.device = device
      this.DialogAddDevice = true
      // if (this.company.id) {
      //   this.loading = true
      //   fetchBeforeTask(this.company.id).then(response => {
      //     const data = response
      //     if (data.resultCode === '0000000') {
      //       const returnData = data.returnData
      //       this.noDeviceList = returnData
      //       const device = {
      //         company: this.company,
      //         list: this.deviceList
      //       }
      //       this.device = device
      //     } else {
      //       this.$message({
      //         message: data.resultDesc,
      //         type: 'warning'
      //       })
      //     }
      //   }).finally(() => {
      //     this.loading = false
      //     this.DialogAddDevice = true
      //   })
      // } else {
      //   this.$message('请输入单位名称')
      // }
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
    checkUseType(event) { // 单位类型
      // console.log(event, 555)
      const index = event
      this.record.checkUseTypes = danWeiType[index].value // 单位类别id
      this.record.checkUseTypeNames = danWeiType[index].label // 单位类别名称
    },
    getTaskCheck(event) { // 检查类别
      // console.log(event)
      const { taskStatus, instructionStatus } = event
      this.info.checkType = taskStatus // 检查类别1
      this.info.checkType2 = instructionStatus // 检查类别2
    },
    sure() { // 确定
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
        deviceType1Count,
        deviceType2Count,
        deviceType3Count,
        deviceType4Count,
        deviceType5Count,
        deviceType6Count,
        deviceType7Count,
        deviceType8Count,
        deviceType9Count,
        deviceType10Count,
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
        // commandModel, // 暂无
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
        commandModel,
        remark, // 注明情况
        companyUseConfirmMan,
        companyUseConfirmManPhone
      } = this.command
      if (!checkUseTypeNames) {
        this.$message.error('请选择单位类别')
        return ''
      } else if (!checkProblem) {
        this.$message.error('请输入检查意见')
        return ''
      }
      if (checkResulTreatmentId === '1') {
        if (!commandModel) {
          this.$message.error('请选择指令书模板')
          return ''
        }
      }
      // 设备ids
      const deviceIds = this.deviceList.map(item => item.id).join(',')
      // 隐患模板ids
      const illegalCountIds = this.deviceList.map(item => item.illegalCountId.join(',')).join(';')
      // checkDate 检查日期
      // const [checkDateStart, checkDateEnd] = checkDate
      // 处理措施
      const checkResulTreatmentName = this.getCheckResulTreatment(checkResulTreatmentId)
      const checkRecordId = this.record.id
      const commandId = this.command.id
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
        deviceType1Count: `${deviceType1Count}`,
        deviceType2Count: `${deviceType2Count}`,
        deviceType3Count: `${deviceType3Count}`,
        deviceType4Count: `${deviceType4Count}`,
        deviceType5Count: `${deviceType5Count}`,
        deviceType6Count: `${deviceType6Count}`,
        deviceType7Count: `${deviceType7Count}`,
        deviceType8Count: `${deviceType8Count}`,
        deviceType9Count: `${deviceType9Count}`,
        deviceType10Count: `${deviceType10Count}`,
        checkType,
        checkType2,
        checkUseTypes: '' + checkUseTypes,
        checkUseTypeNames,
        // checkDateStart: checkDate,
        checkDate,
        checkProblem,
        checkResulTreatmentId,
        checkResulTreatmentName,
        checkOpinion,
        checkRecordId,
        checkStatus: '6',
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
        companyUseConfirmMan,
        companyUseConfirmManPhone,
        operateName: '编辑任务', // operate
        checkNo: checkNo,
        deviceAreaName4: this.task.deviceAreaName4,
        checkResultPhotoList: this.phoneListString
      }
      console.log(data, 11)
      // return ''
      this.subLoading = true
      // return
      fectEditTask(data).then(res => {
        // console.log(res)
        if (res.resultCode === '0000000') {
          this.$message({
            message: res.resultDesc,
            type: 'success'
          })
          this.subLoading = false
          this.closed()
        } else {
          this.$message({
            message: res.resultDesc,
            type: 'fail'
          })
        }
      })
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
    },
    closed() {
      this.$emit('closed')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    justify-content: space-between;
    align-items: center;
  }
}
</style>
