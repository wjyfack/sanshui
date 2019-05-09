<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">回复书信息</label></div>
    <el-row type="flex" align="middle" class="row">
      <el-col :span="12">
        <span class="label"><span class="red">*</span> 回复书编号</span>
        <span class="mes">{{ info.commandReplyNo }}</span>
      </el-col>
      <el-col :span="12">
        <span class="label">回复书日期</span>
        <el-date-picker
          v-model="info.commandReplyDate"
          type="date"
          style="width:300px"
          value-format="yyyy-MM-dd"
          placeholder="如非特殊情况,此项不用输入"/>
      </el-col>
    </el-row>
    <el-row class="row">
      <span class="label"><span class="red">*</span> 是否立案</span>
      <el-radio-group v-model="info.commandExecIsFiling">
        <el-radio :label="'1'">立案查处</el-radio>
        <el-radio :label="'2'">不予立案</el-radio>
      </el-radio-group>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label"><span class="red">*</span>任务移交描述</span>
      <el-input v-model="info.commandExecTaskReplyIntro" type="textarea" class="textarea"/>
    </el-row>
    <el-row type="flex" class="row">
      <span class="label"><span class="red">*</span>任务回复相册</span>
      <el-upload
        :on-preview="handlePictureCardPreview"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :action="baseUrl"
        :limit="3"
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
import { fetchClosedLoop } from '@/api/instruction'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: `${baseUrl}/file/upload/reply`,
      info: {
        id: '',
        commandReplyNo: '', // 回复书
        commandReplyDate: '',
        commandExecIsFiling: '1', // 立案
        commandExecTaskReplyIntro: '' // 任务移交描述
      },
      commandExecTaskReplyIntroPhotoList: [], // 任务回复相册
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  mounted() {
    // console.log(this.transfe)
    // const {
    //   id,
    //   commandReplyNo
    //   // commandExecIsFiling,
    //   // commandExecTaskReplyIntro,
    //   // commandExecTaskReplyIntroPhotoList,
    //   // commandReplyDate
    // } = this.transfe
    // this.info = { id, commandReplyNo }
  },
  methods: {
    isOk() {
      const {
        id,
        commandReplyNo
      } = this.transfe
      const info = this.info
      if (!info.commandExecTaskReplyIntro) {
        this.$message({ message: '任务移交描述', type: 'error' })
        return ''
      }
      info.id = id
      info.commandReplyNo = commandReplyNo

      const commandExecTaskReplyIntroPhotoList = this.commandExecTaskReplyIntroPhotoList.map(item => {
        return item.response.returnData
      }).join(',')
      // console.log(this.commandExecTaskReplyIntroPhotoList)
      if (!commandExecTaskReplyIntroPhotoList) {
        this.$message({ message: '请选择任务回复相册', type: 'error' })
        return ''
      }
      info.commandExecTaskReplyIntroPhotoList = commandExecTaskReplyIntroPhotoList

      fetchClosedLoop(info).then(res => {
        if (res.resultCode === '0000000') {
          this.$message({ message: res.resultDesc, type: 'success' })
          this.closed()
        }
      })
      // this.closed()
    },
    closed() {
      this.$emit('closed')
    },
    handleSuccess(response, file, fileList) {
      console.log(fileList)
      this.commandExecTaskReplyIntroPhotoList = fileList
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.commandExecTaskReplyIntroPhotoList = fileList
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
        // text-align: right;
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
