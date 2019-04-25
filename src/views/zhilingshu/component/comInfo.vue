<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">企业信息</label></div>
    <div class="detail">
      <div class="item">
        <span class="name">使用单位：</span> <div class="info">付小小</div>
        <span class="name">联系人:</span> <div class="info">小明</div>
      </div>
      <div class="item">
        <span class="name">联系电话：</span> <div class="info">1810 0000 000</div>
        <span class="name">联系地址：</span> <div class="info">佛山市南海区</div>
      </div>
    </div>
    <table class="table">
      <tr>
        <th>设备种类</th>
        <th>使用登记证</th>
        <th>出厂编号</th>
        <th>操作</th>
      </tr>
      <tr>
        <td>电梯</td>
        <td>EM粤5505</td>
        <td>123456</td>
        <td><el-button size="mini">详情</el-button></td>
      </tr>
    </table>
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
