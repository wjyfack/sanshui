<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">回复书信息</label></div>
    <el-row type="flex" align="middle" class="row">
      <el-col :span="12">
        <span class="label"><span class="red">*</span> 回复书编号</span>
        <span class="mes">三质监稽[2019]第0052号</span>
      </el-col>
      <el-col :span="12">
        <span class="label">回复书日期</span>
        <el-date-picker
          v-model="replyDate"
          type="date"
          placeholder="选择日期"/>
      </el-col>
    </el-row>
    <el-row class="row">
      <span class="label"><span class="red">*</span> 是否立案</span>
      <el-radio-group v-model="isReister">
        <el-radio :label="1">立案查处</el-radio>
        <el-radio :label="2">不予立案</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label"><span class="red">*</span>任务移交描述</span>
      <el-input v-model="taskDesc" type="textarea" class="textarea"/>
    </el-row>
    <el-row type="flex" class="row">
      <span class="label"><span class="red">*</span>任务回复相册</span>
      <el-upload
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :action="baseUrl+'/file/upload/ScenePictures'"
        list-type="picture-card">
        <i class="el-icon-plus avatar-uploader-icon"/>
      </el-upload>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="isOk">确认</el-button>
      <el-button @click="closed">取 消</el-button>
    </span>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/config'
export default {
  data() {
    return {
      baseUrl,
      replyDate: '', // 回复书
      isReister: '1', // 立案
      taskDesc: '', // 任务移交描述
      taskImgs: '', // 任务回复相册
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    isOk() {
      this.closed()
    },
    closed() {
      this.$emit('closed')
    },
    handleSuccess(response, file, fileList) {
      this.taskImgs = fileList
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.taskImgs = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
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
  .row {
    padding: 10px 0;
    .red {color: red;}
    .label {display: inline-block; width: 110px;text-align: right;margin-right: 5px;padding-top:5px;}
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
  .dialog-footer {
      display: flex;
      justify-content: flex-end;
    }
}
</style>
