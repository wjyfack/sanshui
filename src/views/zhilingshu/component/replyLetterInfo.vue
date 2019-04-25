<template>
  <div>
    <div class="bianhao"><label for="">回复书信息</label></div>
    <el-row type="flex" align="middle" class="row">
      <el-col :span="24">
        <span class="label"><span class="red">*</span> 回复书编号</span>
        <span class="mes">三质监稽[2019]第0052号</span>
        <el-button type="primary" size="small">预览回复书</el-button>
        <el-button type="primary" size="small">下载回复书</el-button>
      </el-col>
    </el-row>
    <el-row class="row" type="flex">
      <el-col :span="12">
        <span class="label">任务回复人</span>
        <span class="mes">超级管理源</span>
      </el-col>
      <el-col :span="12">
        <span class="label">任务回复时间</span>
        <span class="mes">2019-1-23</span>
      </el-col>
    </el-row>
    <el-row class="row" type="flex">
      <el-col :span="12">
        <span class="label">回复书日期</span>
        <span class="mes">2019-1-23</span>
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <span class="label">任务回复相册</span>
      <span>
        <img src="http://placehold.it/100x100" alt="">
      </span>
    </el-row>
    <el-row class="row" type="flex">
      <el-col :span="12">
        <span class="label">任务回复描述</span>
        <span class="mes">sss</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
</style>
