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
      <div class="title"><span>关联设备</span></div>
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
              <el-input v-model="scope.row.deviceProduceNo" placeholder="请输入出厂编号"/>
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
      <!-- <el-row v-for="(item, index) in deviceList" :key="index" class="row">
        <el-col :span="8">
          <el-form-item label="使用登记证" >
            <el-input v-model="item.deviceCertNo" placeholder="请输入使用登记证"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出厂编号" >
            <el-input v-model="item.deviceCertNo" placeholder="请输入出厂编号"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="违反模板" >
            <el-select v-model="item.illegalCountId" placeholder="请选择违反条例">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row> -->

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
      </el-row>
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
      <!-- <el-row class="row">
        <el-form-item label="是否填写指令书" >
          <el-checkbox id="isZhiLingShu" @change="onCheckbox"/>
        </el-form-item>
      </el-row> -->
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
  </div>
</template>

<script>
import taskCheck from '@/components/taskCheck/index'
import { fecthBeforeEdit } from '@/api/task'
import { mapGetters } from 'vuex'
import { getFormatDate, getFormatDate30 } from '@/utils/common'
import { danWeiType, taskType, inspectionType } from '@/utils/config'
export default {
  components: {
    taskCheck
  },
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      taskType,
      danWeiType,
      inspectionType,
      DialogAddDevice: false,
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
      deviceList: [],
      illegalCount: [], // 违反模板ids
      info: {},
      task: {},
      isShow: false,
      value5: '',
      value: '',
      options: [],
      radio2: ''
    }
  },
  computed: {
    ...mapGetters([
      'instructionModels'
    ])
  },
  watch: {
    transfe: function(val) {
      console.log(val)
      this.fecthData()
    }
  },
  mounted() {
    if (this.instructionModels.length === 0) {
      this.$store.dispatch('actionsInstructionModels')
    }
    this.fecthData()
  },
  methods: {
    fecthData() {
      let id = this.transfe.id
      // let taskCheckId = ''
      if (this.transfe.check) {
        id = this.transfe.check.id
      }
      // const info = {
      //   // taskCheckId,
      //   id
      // }
      fecthBeforeEdit(id).then(res => {
        if (res.resultCode === '0000000') {
          this.task = res.returnData
        }
      }).then(() => { this.tackCheck() })
    },
    tackCheck() {
      // this.info = this.task
      const task = this.task
      // console.log(task)
      const company = task.companyUse
      const record = task.checkRecord
      if (record && record.id) {
        company.useLegalPerson = record.checkUseLegalPerson // ? record.checkUseLegalPerson : ''
        company.useContactMan = record.checkUseContactMan
        company.useContactManTel = record.checkUseContactManTel
        company.checkUseContactPosition = record.checkUseContactPosition
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
      if (record.checkDateStart || record.checkDateEnd) {
        // const tt = record.checkDateStart ? record.checkDateStart : ''
        const tts = record.checkDateEnd ? record.checkDateEnd : getFormatDate()
        record.checkDate = tts
      } else {
        record.checkDate = getFormatDate()
      }
      // console.log(record)
      if (record.checkResulTreatmentId === '1') { this.isShow = true }
      this.record = record
      // console.log(record)
      this.deviceList = task.list
      this.illegalCount = this.deviceList.map(item => item.illegalCountId)
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
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
