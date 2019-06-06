<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">移交信息</label></div>
    <el-row class="row">
      <span class="label">移交书编号</span>
      <span class="mes">{{ transfe.commandTransferNo }}</span>
      <el-button v-if="transfe.commandTransferNo" type="primary" size="small" @click="preview">预览移交书</el-button>
      <el-button v-if="transfe.commandTransferNo" type="primary" size="small" @click="download">下载移交书</el-button>
    </el-row>
    <el-row class="row">
      <el-col :span="12" type="flex">
        <span class="label">任务移交人</span>
        <span class="mes">{{ transfe.commandExecTaskAddManName1 }}</span>
      </el-col>
      <el-col :span="12" type="flex">
        <span class="label">移交人部门</span>
        <span class="mes">{{ transfe.commandExecTaskAddDeptName1 }}</span>
      </el-col>
    </el-row>
    <el-row class="row">
      <span class="label">移交书日期</span>
      <el-date-picker
        v-model="transfe.commandTransferDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        @change="changePicke"/>
    </el-row>
    <el-row class="row" type="flex">
      <span class="label">任务移交描述</span>
      <span class="mes">{{ transfe.commandTransferDesc }}</span>
    </el-row>
    <el-dialog
      :visible.sync="lookPic"
      width="850px"
      title=""
      append-to-body>
      <img :src="imgDialog" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/config'
import { toViewer } from '@/utils/common'
export default {
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      printUrl: `${baseUrl}/file/show/img/create/`,
      downloadUrl: `${baseUrl}/file/download/create/`,
      lookPic: false,
      imgDialog: '',
      yijiaoDate: ''
    }
  },
  watch: {
    transfe: function() {
      this.dataChange()
    }
  },
  mounted() {
    this.dataChange()
  },
  methods: {
    dataChange() {
      this.$store.dispatch('actionsExecTaskAddTime', this.transfe.commandTransferDate)
    },
    preview() {
      const { commandTransferNo } = this.transfe
      if (!commandTransferNo) {
        this.$message.error('无移交书编号')
        return ''
      }
      // this.lookPic = true
      this.imgDialog = encodeURI(`${this.printUrl}${commandTransferNo}.jpg`)
      toViewer(this.imgDialog)
    },
    download() {
      const { commandTransferNo } = this.transfe
      if (!commandTransferNo) {
        this.$message.error('无移交书编号')
        return ''
      }
      const url = encodeURI(`${this.downloadUrl}${commandTransferNo}.pdf`)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.download = `${commandTransferNo}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    changePicke(event) {
      // console.log(event)
      this.$store.dispatch('actionsExecTaskAddTime', event)
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
  .row {
      padding-bottom: 10px;
      .red {color: red;}
      .label {display: inline-block; width: 110px;text-align: left;margin-right: 5px;}
      .input {width: 220px;}
      .textarea {flex: 1;}
      .mes {
        color: #333;
      }
    }
}
</style>
