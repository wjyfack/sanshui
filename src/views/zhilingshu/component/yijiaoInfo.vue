<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">移交信息</label></div>
    <el-row class="row">
      <span class="label">移交书编号</span>
      <span class="mes">南质2193第00053号</span>
      <el-button type="primary" size="small">预览移交书</el-button>
      <el-button type="primary" size="small">下载移交书</el-button>
    </el-row>
    <el-row class="row">
      <el-col :span="12" type="flex">
        <span class="label">任务移交人</span>
        <span class="mes">超级管理员</span>
      </el-col>
      <el-col :span="12" type="flex">
        <span class="label">移交人部门</span>
        <span class="mes">质监局</span>
      </el-col>
    </el-row>
    <el-row class="row">
      <span class="label">移交书日期</span>
      <el-date-picker
        v-model="yijiaoDate"
        type="date"
        placeholder="选择日期"/>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label">任务移交描述</span>
      <span class="mes">任务移交描述</span>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yijiaoDate: ''
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
}
</style>
