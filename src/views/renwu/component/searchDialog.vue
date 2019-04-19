<template>
  <div>
    <div class="dialogForm">
      <el-row class="row">
        <el-col :span="12">
          <label for="" class="label">任务状态：</label>
          <el-select v-model="info.taskStatus" placeholder="请选择">
            <el-option
              v-for="item in taskType"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"><label for="" class="label">任务编号：</label><el-input v-model="info.checkNo" class="input" placeholder="请输入任务编号"/></el-col>
        <el-col :span="12">
          <label for="" class="label">状态：</label>
          <el-select v-model="info.checkTypeId" placeholder="请选择">
            <el-option
              v-for="item in taskStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"><label for="" class="label">使用单位：</label><el-input v-model="info.companyUseName" class="input" placeholder="请输入使用单位"/></el-col>
        <el-col :span="12"><label for="" class="label">指令书编号：</label><el-input v-model="info.commandNo" class="input" placeholder="请输入指令书编号"/></el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12"><label for="" class="label">使用登记证：</label><el-input v-model="info.deviceCertNo" class="input" placeholder="请输入使用登记证"/></el-col>
        <el-col :span="12"><label for="" class="label">任务派发部门：</label><el-input v-model="info.checkAddDeptName" class="input" placeholder="请输入任务派发部门"/></el-col>
      </el-row>
      <el-row class="row">
        <el-col>
          <label for="" class="label">年检日期：</label>
          <el-date-picker
            v-model="info.dateChecked"
            type="daterange"
            range-separator="~"
            start-placeholder="年/月/日"
            end-placeholder="年/月/日"
            value-format="yyyy-MM-dd"/>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="moreSearch">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </span>
  </div>
</template>

<script>
import { status, taskType, taskStatus } from '@/utils/config'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status,
      taskType,
      taskStatus,
      visibleDialog: this.visible,
      info: {
        checkNo: '', // 任务编号
        taskStatus: '', // 任务状态
        companyUseName: '', // 使用单位
        commandNo: '', // 指令书编号
        deviceCertNo: '', // 使用登记证
        dateChecked: [], // 年检日期
        checkTypeId: '', // 状态
        checkAddDeptName: '' // 任务派发部门
      }
    }
  },
  methods: {
    moreSearch() {
      this.$emit('closed', {
        info: this.info,
        visible: false
      })
    },
    reset() {
      this.info = {
        checkNo: '', // 任务编号
        taskStatus: '', // 任务状态
        companyUseName: '', // 使用单位
        commandNo: '', // 指令书编号
        deviceCertNo: '', // 使用登记证
        dateChecked: [], // 年检日期
        checkTypeId: '', // 状态
        checkAddDeptName: '' // 任务派发部门
      }
      this.$message('重置成功')
    },
    handleClose(done) {
      done()
      this.$emit('closed', {
        visible: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialogForm {
    .title {padding: 16px 0;color:#333;font-weight: bold;}
    .row {padding-bottom: 10px;}
    .input {max-width: 220px;}
    .label {
      min-width: 120px;
      display: inline-block;
      .red {color: red}
    }
    .cont {
      flex: 1;
      display: flex;
      flex-direction: column;
      .select {width: 100%;}
      .area {width:100%;}
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
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
