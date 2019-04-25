<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">任务操作信息</label></div>
    <el-row class="row">
      <span class="label"><span class="red">*</span> 任务状态</span>
      <el-radio-group v-model="radio2">
        <el-radio :label="3">通过</el-radio>
        <el-radio :label="6">不通过</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label"><span class="red">*</span>任务移交描述</span>
      <el-input type="textarea" class="textarea"/>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="isOk">确认</el-button>
      <el-button @click="dialogShenHeYiJiaoVisible = false">取 消</el-button>
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
    .detail {
      display: flex;
      flex-direction: column;
      .item {
        color: #666;
        display: flex;
        padding-bottom: 10px;
        .name {
          display: inline-block;
          min-width: 130px;
          text-align: right;
        }
        .info {
          min-width: 150px;
          color:#999999;
        }
      }
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
