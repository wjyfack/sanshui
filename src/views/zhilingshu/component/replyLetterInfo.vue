<template>
  <div>
    <div class="bianhao"><label for="">回复书信息</label></div>
    <el-row type="flex" align="middle" class="row">
      <el-col :span="24">
        <span class="label"><span class="red">*</span> 回复书编号</span>
        <span class="mes">{{ transfe.commandReplyNo }}</span>
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
        <span class="mes">{{ transfe.commandExecTaskReplyTime }}</span>
      </el-col>
    </el-row>
    <el-row class="row" type="flex">
      <el-col :span="12">
        <span class="label">回复书日期</span>
        <span class="mes">{{ transfe.commandExecTaskAddTime }}</span>
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <span class="label">任务回复相册</span>
      <span>
        <ul class="el-upload-list el-upload-list--picture-card">
          <li v-for="(item, index) in urlImgs" :key="index" class="el-upload-list__item is-success">
            <img :src="baseUrl+item" alt="" class="el-upload-list__item-thumbnail">
            <i class="el-icon-close"/>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="hasHandlePreview(baseUrl+item)">
                <i class="el-icon-zoom-in"/>
              </span>
            </span>
          </li>
        </ul>
      </span>
    </el-row>
    <el-row class="row" type="flex">
      <el-col :span="12">
        <span class="label">任务回复描述</span>
        <span class="mes">{{ transfe.commandExecTaskReplyConfirmDesc }}</span>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogPreviewVisible" width="30%" append-to-body>
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/config'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: `${baseUrl}/file/show/reply/`,
      urlImgs: [],
      dialogPreviewVisible: false,
      dialogImageUrl: ''
    }
  },
  watch: {
    transfe: function(val) {
      this.dataChange()
    }
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      const urlImgs = this.transfe.commandExecTaskReplyIntroPhotoList
      if (urlImgs) {
        this.urlImgs = urlImgs.split(',')
      }
      console.log(this.urlImgs)
    },
    hasHandlePreview(url) {
      this.dialogPreviewVisible = true
      this.dialogImageUrl = url
    }
  }
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
