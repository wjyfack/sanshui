<template>
  <div class="dialogForm">
    <el-form ref="chuliForm" label-width="130px" >
      <div class="title">单位信息</div>
      <el-row class="row">
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="info.checkUseName" placeholder="请输入单位名称"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="使用单位地址" prop="name">
          <el-input placeholder="请输入使用单位地址"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="单位法人" prop="checkUseLegalPerson">
            <el-input v-model="info.checkUseLegalPerson" placeholder="请输入单位法人"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位联系人" required>
            <el-input v-model="info.checkUseContactMan" placeholder="请输入单位联系人"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="单位联系方式" required>
            <el-input v-model="info.checkUseContactManTel" placeholder="请输入单位联系方式"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人职务">
            <el-input v-model="info.checkUseContactPosition" placeholder="请输入联系人职务"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title"><span>关联设备</span> <el-button icon="el-icon-plus" size="mini" type="primary" >添加设备</el-button></div>
      <el-row class="row">
        <el-col :span="8">
          <el-form-item label="使用登记证" >
            <el-input placeholder="请输入使用登记证"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出厂编号" >
            <el-input placeholder="请输入出厂编号"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="违反模板" >
            <el-select v-model="value" placeholder="请选择违反条例">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">关联设备数量</div>
      <el-row class="row">
        <el-col :span="8">
          <el-form-item label="电梯">
            <el-input v-model="info.deviceType3Count" placeholder="请输入电梯"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专用机动车">
            <el-input v-model="info.deviceType8Count" placeholder="请输入专用机动车"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起重机">
            <el-input v-model="info.deviceType7Count" placeholder="请输入起重机"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="8">
          <el-form-item label="锅炉">
            <el-input v-model="info.deviceType1Count" placeholder="请输入锅炉"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="压力容器">
            <el-input v-model="info.deviceType2Count" placeholder="请输入压力容器"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="压力管道">
            <el-input v-model="info.deviceType5Count" placeholder="请输入压力管道"/>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">检查记录表信息</div>
      <el-row class="row">
        <el-col :span="12">
          <el-form-item label="检查类别" >
            <task-check @send="getTaskCheck"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位类别" >
            <el-select placeholder="请选择单位类别" @change="checkUseType">
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
              type="daterange"
              range-separator="~"
              start-placeholder="年/月/日"
              end-placeholder="年/月/日"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-form-item label="检查问题" >
          <el-input type="textarea" placeholder="请输入检查问题"/>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="处理措施" >
          <el-radio-group v-model="radio2">
            <el-radio :label="1">下达指令书</el-radio>
            <el-radio :label="2">直接封查</el-radio>
            <el-radio :label="3">实施扣押</el-radio>
            <el-radio :label="4">其他</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row class="row">
        <el-form-item label="检查意见" >
          <el-input type="textarea" placeholder="请输入检查意见"/>
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
    </el-form>
    <div class="zhilingshu-info">
      <div class="title">指令书信息</div>
      <el-form ref="form" label-width="130px">
        <el-row class="row">
          <el-form-item label="指令书编号">
            <el-input class="input" placeholder="请输入指令书编号"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="指令书流水号">
            <el-input class="input" placeholder="请输入指令书流水号"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="指令书模板">
            <el-select v-model="value" placeholder="请选择指令书模板">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="设备描述">
            <el-input type="textarea" placeholder="请输入设备描述"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="隐患描述">
            <el-select v-model="value5" multiple placeholder="请选择" style="flex:1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="违反条例">
            <div class="cont">
              <el-select v-model="value5" multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="处罚依据条例">
            <div class="cont">
              <el-select v-model="value5" multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="整改措施">
            <div class="cont">
              <el-select v-model="value5" multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input type="textarea" class="area"/>
            </div>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="整改截止日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="指令书日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-form-item label="注明情况">
            <el-input type="textarea" placeholder="" style="width:100%"/>
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
            <el-radio-group v-model="radio">
              <el-radio :label="3">通过</el-radio>
              <el-radio :label="6">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="确认描述" required>
            <el-input type="textarea" placeholder="请输入确认描述" style="width:100%"/>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sure">保存</el-button>
      <el-button @click="closed">取消</el-button>
    </span>
  </div>
</template>

<script>
import taskCheck from '@/components/taskCheck/index'
import { danWeiType, baseUrl } from '@/utils/config'
export default {
  components: {
    taskCheck
  },
  data() {
    return {
      baseUrl,
      danWeiType,
      dialogImageUrl: '',
      dialogVisible: false,
      nowFileList: [], // 现场图片
      info: {
        taskCheckId: '', // 任务id
        taskCheckCheckNo: '', // 任务编号
        checkUseId: '', // 使用单位id
        checkUseName: '', // 单位名称
        checkUseFullAddress: '', // 使用单位地址
        checkUseLegalPerson: '', // 单位法人
        checkUseContactMan: '', // 单位联系人
        checkUseContactManTel: '', // 单位联系方式
        checkUseContactPosition: '', // 联系人职位
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
        commandCcordingRulesIds: '', // 处罚依据条例id
        commandCcordingRulesNames: '', // 处罚依据条例名称
        commandChangedIds: '', // 整改截止日期id
        commandChangedNames: '', // 整改截止日期名称
        commandChangedEndDate: '', // 指令书日期
        commandDate: '', // 注明情况
        companyUseConfirmMan: '', // 单位确认人
        companyUseConfirmManPhone: '', // 联系方式
        checkStatus: '' // 任务状态
      },
      isShow: false,
      value5: '',
      value: '',
      options: [],
      radio2: ''
    }
  },
  methods: {
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
    checkUseType(event) {
      console.log(event)
      const index = event
      this.info.checkUseTypes = danWeiType[index].value // 单位类别id
      this.info.checkUseTypeNames = danWeiType[index].label // 单位类别名称
    },
    getTaskCheck(event) { // 检查类别
      // console.log(event)
      const { taskStatus, instructionStatus } = event
      this.info.checkType = taskStatus // 检查类别1
      this.info.checkType2 = instructionStatus // 检查类别2
    },
    sure() { // 确定
      this.closed()
    },
    onCheckbox(event) {
      this.isShow = event
    },
    closed() {
      this.$emit('closed')
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
