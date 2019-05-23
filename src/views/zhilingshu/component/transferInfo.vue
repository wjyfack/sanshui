<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">移交信息</label></div>
    <div v-if="instructionStatus == 12">
      <el-row class="row">
        <el-col :span="12" type="flex" class="col">
          <span class="label"><span class="red">*</span>移交书编号</span>
          <el-input v-model="info.commandTransferNo" placeholder="移交书编号" class="input"/>
        </el-col>
        <el-col :span="12" class="col">
          <span class="label"><span class="red">*</span>移交书材料</span>
          <el-input v-model="info.commandTransferFileCount" placeholder="移交书材料" class="input"/>
        </el-col>
      </el-row>
      <el-row class="row">
        <span class="label">移交书日期</span>
        <el-date-picker
          v-model="info.commandTransferDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"/>
      </el-row>
      <el-row class="row" type="flex">
        <span class="label"><span class="red">*</span>任务移交描述</span>
        <el-input v-model="info.commandTransferDesc" type="textarea" class="textarea"/>
      </el-row>
    </div>
    <div v-if="instructionStatus == 1">
      <el-row class="row" type="flex">
        <span class="label"><span class="red">*</span>任务移交原因</span>
        <el-input v-model="info.commandExecTaskAddReason" type="textarea" class="textarea"/>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="toTransfer">移交</el-button>
      <!-- <el-button v-if="instructionStatus == 1" type="primary" @click="isOk">确认</el-button> -->
      <el-button @click="closed">取 消</el-button>
    </span>
  </div>
</template>

<script>
import { fetchTransferSave } from '@/api/instruction'
import { mapGetters } from 'vuex'
import { getFormatDate } from '@/utils/common'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShow: true,
      checkNo: '',
      info: {
        id: '',
        commandTransferNo: '', // 移交书编号
        commandTransferFileCount: '', // 移交书材料
        commandTransferDate: getFormatDate(), // 移交书日期
        commandTransferDesc: '', // 任务移交描述
        commandExecTaskAddReason: '' // 任务移交原因
      }
    }
  },
  computed: {
    ...mapGetters([
      'instructionStatus'
    ])
  },
  watch: {
    transfe: function(val) {
      this.changeStatus()
    }
  },
  mounted() {
    this.changeStatus()
  },
  methods: {
    changeStatus() {
      console.log(this.instructionStatus)
      const {
        id,
        commandTransferNo,
        commandTransferFileCount,
        commandTransferDesc,
        check
      } = this.transfe
      if (check) {
        this.checkNo = check.checkNo
      }
      let commandTransferDate = this.commandTransferDate
      // console.log(this.transfe)
      if (!commandTransferDate) {
        commandTransferDate = getFormatDate()
      }
      this.info = {
        id,
        commandTransferNo,
        commandTransferFileCount: commandTransferFileCount === null ? '1' : commandTransferFileCount,
        commandTransferDate,
        commandTransferDesc
      }
      if (~~this.instructionStatus === 12) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    toTransfer() {
      const { va, message } = this.validate()
      if (!va) {
        this.$message({ message, type: 'error' })
        return ''
      } else {
        this.get2Tranfer(2)
      }
    },
    validate() {
      const {
        commandTransferNo,
        commandTransferFileCount,
        commandTransferDate,
        commandTransferDesc
      } = this.info
      if (~~this.instructionStatus !== 1) {
        if (!commandTransferNo) { return { va: false, message: '请输入移交书编号' } }
        if (!commandTransferFileCount) { return { va: false, message: '请输入移交书材料' } }
        if (!~~commandTransferFileCount) { return { va: false, message: '移交书材料为数量' } }
        if (!commandTransferDate) { return { va: false, message: '请选择移交书日期' } }

        if (!commandTransferDesc) { return { va: false, message: '请输入任务移交描述' } }
      }
      return { va: true, message: '' }
    },
    isOk() {
      const { va, message } = this.validate()
      if (!va) {
        this.$message({ message, type: 'error' })
        return ''
      } else {
        this.get2Tranfer(1)
      }
    },
    get2Tranfer(opt) { // 处理 1 保存,2 移交
      // 镇街移交传值12 待移交传值7
      const {
        id,
        commandTransferNo, // 移交书编号
        commandTransferFileCount, // 移交书材料
        commandTransferDate, // 移交书日期
        commandTransferDesc, // 任务移交描述
        commandExecTaskAddReason // 任务移交原因
      } = this.info
      let data = {}
      if (opt === 2) {
        if (~~this.instructionStatus === 1) { // 镇街移交传值
          if (!commandExecTaskAddReason) {
            this.$message({ message: '请输入原因', type: 'error' })
            return ''
          }
          data = { id, commandExecTaskAddReason, checkNo: this.checkNo, operateName: '镇街移交' }
          data.commandExecTaskStatus = '12'
        } else { // 移交
          data = {
            id,
            commandTransferNo, // 移交书编号
            commandTransferFileCount, // 移交书材料
            commandTransferDate, // 移交书日期
            commandTransferDesc, // 任务移交描述
            checkNo: this.checkNo,
            companyUseNewName: this.transfe.companyUseNewName,
            operateName: '区局移交'
          }
          data.commandExecTaskStatus = '7'
        }
      } else { // 确认镇街移交 确认
        if (~~this.instructionStatus === 1) { // 镇街移交传值
          data = {
            id,
            commandTransferNo, // 移交书编号
            commandTransferFileCount, // 移交书材料
            commandTransferDate, // 移交书日期
            commandTransferDesc, // 任务移交描述
            checkNo: this.checkNo,
            operateName: '镇街移交'
          }
          // data.commandExecTaskStatus = '7'
        }
      }
      fetchTransferSave(data).then(res => {
        this.$message.success(res.resultDesc)
        if (res.resultCode === '0000000') {
          this.closed()
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
.task-detail {
    position: relative;
    font-size: 14px;
    .red {
      color:#f56c6c;
    }
    .bianhao {
      display: flex;
      padding: 10px 5px;
      margin-bottom: 10px;
      background: #d3d3d3;
      label {font-weight: 300;color:#333;}
    }
    .row {
      padding: 10px 0;
      .red {color: red;}
      .label {display: inline-block; width: 110px;text-align: right;margin-right: 5px;}
      .col {
        display: flex;
        align-items: center;
        .input { flex: 1;}
      }

      .textarea {flex: 1;}
      .mes {
        color: #333;
      }
    }
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
