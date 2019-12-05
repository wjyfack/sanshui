<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">回复书信息</label></div>
    <el-row type="flex" align="middle" class="row">
      <el-col :span="12" class="col">
        <span class="label"><span class="red">*</span> 回复书编号</span>
        <el-input v-model="info.commandReplyNo" type="text" class="input"/>
      </el-col>
      <el-col :span="12" class="col">
        <span class="label">回复书日期</span>
        <el-date-picker
          v-model="info.commandReplyDate"
          type="date"
          style="width:300px"
          value-format="yyyy-MM-dd"
          placeholder="如非特殊情况,此项不用输入"
          class="input"/>
      </el-col>
    </el-row>
    <el-row class="row">
      <span class="label"><span class="red">*</span> 是否立案</span>
      <el-radio-group v-model="info.commandExecIsFiling" >
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
      <div class="" style="display:flex;">
        <ul class="el-upload-list el-upload-list--picture-card">
          <li v-for="(item, index) in commandExecTaskReplyIntroPhotoList" :key="index" class="el-upload-list__item is-success">
            <img :src="showUrl+item" alt="" class="el-upload-list__item-thumbnail">
            <i class="el-icon-close"/>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(showUrl+item)">
                <i class="el-icon-zoom-in"/>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(index)">
                <i class="el-icon-delete"/>
              </span>
            </span>
          </li>
        </ul>
        <el-upload
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
          :action="baseUrl"
          class="avatar-uploader">
          <i class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </div>
      <!-- <el-upload
        :on-preview="handlePictureCardPreview"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :action="baseUrl"
        :limit="3"
        list-type="picture-card">
        <i class="el-icon-plus avatar-uploader-icon"/>
      </el-upload> -->
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closed">取 消</el-button>
      <el-button type="primary" @click="isOk">确认</el-button>
    </span>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/config'
import { fetchClosedLoop } from '@/api/instruction'
import { getFormatDate, toViewer, beforeUpload } from '@/utils/common'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showUrl: `${baseUrl}/file/show/reply/`,
      baseUrl: `${baseUrl}/file/upload/reply`,
      info: {
        id: '',
        commandReplyNo: '', // 回复书
        commandReplyDate: getFormatDate(),
        commandExecIsFiling: '1', // 立案
        commandExecTaskReplyIntro: '', // 任务移交描述
        commandExecTaskStatus: '7'
      },
      commandExecTaskReplyIntroPhotoList: [], // 任务回复相册
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    transfe: function(val) {
      this.changeStatus()
    }
  },
  mounted() {
    this.changeStatus()
  },
  methods: {
    beforeAvatarUpload(file) {
      beforeUpload(file)
    },
    changeStatus() {
      // console.log(this.transfe)
      const {
        id,
        commandReplyNo,
        // commandExecIsFiling,
        // commandExecTaskReplyIntro,
        commandExecTaskReplyIntroPhotoList
        // commandReplyDate
      } = this.transfe
      // console.log(commandReplyNo)
      if (commandExecTaskReplyIntroPhotoList === null) {
        this.commandExecTaskReplyIntroPhotoList = []
      } else {
        this.commandExecTaskReplyIntroPhotoList = commandExecTaskReplyIntroPhotoList.split('&').filter(i => i)
      }
      this.info.commandReplyNo = commandReplyNo
      this.info.id = id
    },
    changeRadio(event) {
      if (event === 1) {
        this.info.commandExecTaskReplyIntro = '立案查处'
      } else {
        this.info.commandExecTaskReplyIntro = '不予立案'
      }
    },
    isOk() {
      const {
        check
      } = this.transfe
      const info = this.info
      if (!info.commandExecTaskReplyIntro) {
        this.$message({ message: '任务移交描述', type: 'error' })
        return ''
      }
      // info.id = id
      // info.commandReplyNo = commandReplyNo

      // const commandExecTaskReplyIntroPhotoList = this.commandExecTaskReplyIntroPhotoList.map(item => {
      //   return item.response.returnData
      // }).join(',')
      const commandExecTaskReplyIntroPhotoList = this.commandExecTaskReplyIntroPhotoList.join('&')
      console.log(this.commandExecTaskReplyIntroPhotoList)
      if (!commandExecTaskReplyIntroPhotoList) {
        this.$message({ message: '请选择任务回复相册', type: 'error' })
        return ''
      }
      info.commandExecTaskReplyIntroPhotoList = commandExecTaskReplyIntroPhotoList
      info.commandTransferDate = this.$store.getters.taskAddTime
      info.checkNo = check.checkNo
      info.operateName = '处理指令书'
      // console.log(info)
      // return ''
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
      if (response.resultCode === '0000000') {
        const returnData = response.returnData
        this.commandExecTaskReplyIntroPhotoList = [...this.commandExecTaskReplyIntroPhotoList, returnData]
      } else {
        this.$message.error(response.resultDesc || '操作失败')
      }
      // this.commandExecTaskReplyIntroPhotoList = fileList
    },
    handleRemove(index) {
      const rectifyImg = this.commandExecTaskReplyIntroPhotoList
      rectifyImg.splice(index, 1)
      this.commandExecTaskReplyIntroPhotoList = rectifyImg
    },
    handlePictureCardPreview(file) {
      toViewer(file)
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
        width: 350px;
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
    .col {
        display: flex;
        align-items: center;
        .input { flex: 1;}
      }
    // .input {width: 220px;}
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
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 146px;
  height: 146px;
  box-sizing: border-box;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
</style>
