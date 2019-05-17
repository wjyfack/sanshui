<template>
  <div class="task-detail">
    <el-row><div class="bianhao"><label for="">任务编号：{{ transfe.checkNo }}</label></div></el-row>
    <div class="detail">
      <div class="item">
        <span class="name">处理人：</span> <div class="info">{{ command.commandAddManName }}</div>
        <span class="name">处理方式：</span> <div class="info">{{ command.checkResulTreatmentId }}</div>
      </div>
      <div class="item">
        <span class="name">执行时间：</span> <div class="info">{{ command.commandAddDate }}</div>
        <span class="name">关联指令书编号：</span> <div class="info">{{ command.commandNo }}</div>
      </div>
      <div class="item">
        <span class="name">指令书日期：</span> <div class="info">{{ command.commandDate }}</div>
        <span class="name">备注：</span> <div class="info">{{ command.dangerDescription }}</div>
      </div>
      <div class="btn-item">
        <el-button size="mini" type="text">详情</el-button>
        <div>
          <el-button size="mini" type="warning">检查记录预览</el-button>
          <el-button size="mini" type="primary">检查记录打印</el-button>
          <el-button size="mini" type="warning">指令书预览</el-button>
          <el-button size="mini" type="primary">指令书打印</el-button>
        </div>
      </div>
    </div>
    <div class="btn-group">
      <div class="status">状态</div>
      <div v-if="transfe.checkStatus == '1'" class="statusNmae">待派发</div>
      <div v-else-if="transfe.checkStatus == '2'" class="statusNmae">待接收</div>
      <div v-else-if="transfe.checkStatus == '3'" class="statusNmae">待处理</div>
      <div v-else-if="transfe.checkStatus == '4'" class="statusNmae">处理中</div>
      <div v-else-if="transfe.checkStatus == '5'" class="statusNmae">待审核</div>
      <div v-else class="statusNmae">已完成</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      command: {}
    }
  },
  watch: {
    transfe: function(val) {
      this.changeData()
    }
  },
  mounted() {
    this.changeData()
  },
  methods: {
    changeData() {
      const transfe = this.transfe
      const checkRecord = transfe.checkRecord
      const command = transfe.command
      if (command.id) {
        this.command = command
      } else {
        this.command.commandAddManName = checkRecord.checkAddDate
        this.command.commandAddDate = checkRecord.checkAddManName
      }
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
          // min-width: 130px;
          // text-align: right;
        }
        .info {
          min-width: 200px;
          color:#999999;
        }
      }
      .btn-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
      }
    }
    .btn-group {
      position: absolute;
      right: 5px;
      top: 50px;
      padding-right: 5px;
      .status {
        text-align: right;
        color: #999999;
        padding-bottom: 5px;
      }
      .statusNmae{
        color: #000;
        font-size: 18px;
      }
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
  }
</style>
