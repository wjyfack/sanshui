<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">任务操作信息</label></div>
    <el-row class="row">
      <span class="label"><span class="red">*</span> 任务状态</span>
      <el-radio-group v-model="taskStatus">
        <el-radio :label="0">通过</el-radio>
        <el-radio :label="1">不通过</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label"><span class="red">*</span>任务移交描述</span>
      <el-input v-model="taskDesc" type="textarea" class="textarea"/>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="isOk">确认</el-button>
      <el-button @click="closed">取 消</el-button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskStatus: '',
      taskDesc: ''
    }
  },
  methods: {
    isOk() {
      console.log(this.taskStatus, this.taskDesc)
      this.closed()
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
    .btn-group {
      position: absolute;
      right: 5px;
      top: 60px;
    }
    .table {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      background: #999999;
      td, th {
        padding:10px 0;
        background: #ffffff;
      }
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
