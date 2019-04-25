<template>
  <div class="task-detail">
    <el-row><div class="bianhao"><label for="">指令书信息</label></div></el-row>
    <div class="detail">
      <div class="item">
        <span class="name">指令书编号：</span> <div class="info">qulili</div>
      </div>
      <div class="item">
        <span class="name">设备描述：</span> <div class="info">下指令书</div>
      </div>
      <div class="item">
        <span class="name">隐患描述：</span> <div class="info">2017</div>
      </div>
      <div class="item">
        <span class="name">违反条例：</span> <div class="info">[2109]第1</div>
      </div>
      <div class="item">
        <span class="name">处罚依据条例：</span> <div class="info">2017</div>
      </div>
      <div class="item">
        <span class="name">整改措施：</span> <div class="info">2017</div>
      </div>
      <div class="item">
        <span class="name">监察指令书：</span> <div class="info">2017</div>
      </div>
    </div>
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
