<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">移交信息</label></div>
    <el-row class="row">
      <el-col :span="12" type="flex">
        <span class="label"><span class="red">*</span>移交书编号</span>
        <el-input placeholder="移交书编号" class="input"/>
      </el-col>
      <el-col :span="12">
        <span class="label"><span class="red">*</span>移交书材料</span>
        <el-input placeholder="移交书材料" class="input"/>
      </el-col>
    </el-row>
    <el-row class="row">
      <span class="label">移交书日期</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"/>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label"><span class="red">*</span>任务移交描述</span>
      <el-input type="textarea" class="textarea"/>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" >移交</el-button>
      <el-button type="primary" @click="isOk">确认</el-button>
      <el-button @click="dialogYiJiaoVisible = false">取 消</el-button>
    </span>
  </div>
</template>

<script>
export default {

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
