<template>
  <div class="paifa">
    <div class="cont">
      <div class="title"><label class="label" for="">目前任务统计</label></div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="8"><label class="label" for="">待处理：</label><span>{{ taskTotal }}</span></el-col>
        <el-col :span="8"><label class="label" for="">派发数量：</label><span>{{ deviceList.length }}</span></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="6">
          <label class="label" for="">任务要求：</label>
          <el-input v-model="checkIntro" class="input" placeholder="请输入任务要求"/>
        </el-col>
        <el-col :span="6"><label class="label" for="">检验类型：</label>
          <el-select v-model="checkTypeId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="label" for="">反馈时间：</label>
          <el-date-picker
            v-model="checkResultEndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"/>
        </el-col>
      </el-row>
      <div class="table">
        <el-table
          :data="deviceList"
          style="width: 100%">
          <el-table-column
            prop="deviceCertNo"
            label="使用登记证"/>
          <el-table-column
            prop="companyUseName"
            label="使用单位名称"/>
          <el-table-column
            prop="deviceLastTestResult"
            label="上次检验结论"/>
          <!-- <el-table-column
            prop="address"
            label="检验类型"/>
          <el-table-column
            prop="address"
            label="任务要求"/>
          <el-table-column
            prop="checkResultEndDate"
            label="最迟反馈时间"/> -->
          <el-table-column
            prop="checkDeptName"
            label="接收部门"/>
        </el-table>
      </div>
      <div class="btnG">
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button type="primary" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchDistributeTask } from '@/api/task'
export default {
  data() {
    return {
      deviceList: [],
      taskTotal: 0,
      id: '', // 任务id
      checkIntro: '', // 任务要求
      checkResultEndDate: '', // 反馈时间
      checkTypeId: '', // 检验类型
      checkDeptId: '', // 接收部门id
      checkDeptName: '', // 接收部门

      options: [{
        value: '2',
        label: '检验不合格'
      }, {
        value: '1',
        label: '超期未检'
      }, {
        value: '3',
        label: '主动上报'
      }, {
        value: '4',
        label: '投诉任务'
      }, {
        value: '0',
        label: '其他'
      }]
    }
  },
  mounted() {
    const { arr, taskTotal } = this.$route.query
    this.deviceList = arr
    this.taskTotal = taskTotal
  },
  methods: {
    submit() {
      if (!this.checkIntro) {
        this.$message('请输入任务要求')
        return ''
      } // 任务要求
      if (!this.checkResultEndDate) {
        this.$message('请输入反馈时间')
        return ''
      } // 反馈时间
      if (!this.checkTypeId) {
        this.$message('请输入检验类型')
        return ''
      } // 检验类型
      const deviceList = this.deviceList
      const arr = deviceList.map(item => {
        item.checkIntro = this.checkIntro
        item.checkResultEndDate = this.checkResultEndDate
        item.checkTypeId = this.checkTypeId
        return item
      })
      fetchDistributeTask(arr).then(data => {
        if (data.resultCode === '0000000') {
          this.$message({
            message: data.resultDesc,
            type: 'success'
          })
          setTimeout(() => { this.back() }, 1500)
        }
      })
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.paifa {
  background: #f2f2f2;
  padding: 16px;
  .cont {
    background: #ffffff;
    padding: 16px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 16px;
  }
  .row {
    padding-bottom: 16px;
  }
  .label {min-width: 100px;}
  .input {width: 216px;}
  .btnG {
    padding: 16px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
