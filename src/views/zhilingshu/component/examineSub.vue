<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">审核状态</label></div>
    <el-row class="row" type="flex">
      <el-col :span="12">
        <span class="label"><span class="red">*</span> 任务状态</span>
        <el-radio-group v-model="taskStatus" @change="taskChange">
          <el-radio :label="'1'">通过</el-radio>
          <el-radio :label="'0'">不通过</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <span class="label"><span class="red">*</span> 任务描述</span>
      <el-input v-model="taskDesc" type="textarea" placeholder="请输入描述"/>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closed">取 消</el-button>
      <el-button type="primary" @click="isOk">确认</el-button>
    </span>
  </div>
</template>

<script>
import { fetchClosedLoop } from '@/api/instruction'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    },
    status: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      taskStatus: '1',
      taskDesc: '通过'
    }
  },
  methods: {
    taskChange(event) {
      if (~~event === 1) {
        this.taskDesc = '通过'
      } else {
        this.taskDesc = '不通过'
      }
    },
    isOk() {
      if (!this.taskDesc) {
        this.$message({ message: '请输入任务描述', type: 'error' })
        return ''
      }
      const {
        id,
        check
      } = this.transfe
      const data = {
        id: id,
        commandExecTaskReplyAuditStatus: this.taskStatus,
        commandExecTaskReplyConfirmDesc: this.taskDesc,
        commandExecTaskStatus: `${this.status}`,
        commandTransferDate: this.$store.getters.taskAddTime,
        checkNo: check.checkNo
      }
      if (this.status === 4) {
        data.operateName = '回复审核'
      } else {
        data.operateName = '回复确认'
      }
      // console.log(data)
      // return ''
      fetchClosedLoop(data).then(res => {
        if (res.resultCode === '0000000') {
          this.$message({ message: res.resultDesc, type: 'success' })
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
    .input {width: 220px;}
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
