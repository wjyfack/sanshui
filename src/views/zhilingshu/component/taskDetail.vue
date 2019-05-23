<template>
  <div class="task-detail">
    <el-row><div class="bianhao"><label for="">任务编号：{{ transfe.check.checkNo }}</label></div></el-row>
    <div class="detail">
      <div class="item">
        <span class="name">处理人：</span> <div class="info">{{ transfe.commandAddManName }}</div>
        <span class="name">处理方式：</span> <div class="info">{{ transfe.check.checkResulTreatmentId }}</div>
      </div>
      <div class="item">
        <span class="name">执行时间：</span> <div class="info">{{ transfe.commandAddDate }}</div>
        <span class="name">关联指令书编号：</span> <div class="info">{{ transfe.commandNo }}</div>
      </div>
      <div class="item">
        <span class="name">指令书日期：</span> <div class="info">{{ transfe.commandDate }}</div>
        <span class="name">备注：</span> <div class="info">{{ transfe.dangerDescription }}</div>
      </div>
      <div class="item">
        <el-button type="text" @click="look">详情</el-button>
      </div>
    </div>
    <div class="btn-group">
      <el-button type="warning" size="small">检查记录预览</el-button>
      <el-button type="warning" size="small">指令书预览</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body>
      <taskXiangxi :transfe="transfe"/>
    </el-dialog>
  </div>
</template>

<script>
import taskXiangxi from '@/components/taskXiangxi/index'
export default {
  components: {
    taskXiangxi
  },
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    look() {
      this.dialogVisible = true
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
          // text-align: right;
        }
        .info {
          min-width: 200px;
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
    .avatar-uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
  }
</style>
