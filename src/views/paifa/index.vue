<template>
  <div class="paifa">
    <div class="cont">
      <div class="title"><label class="label" for="">目前任务统计</label></div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="8"><label class="label" for="">待处理：</label><span>30</span></el-col>
        <el-col :span="8"><label class="label" for="">派发数量：</label><span>12</span></el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="6"><label class="label" for="">待处理：</label><el-input class="input" placeholder=""/></el-col>
        <el-col :span="6"><label class="label" for="">派发数量：</label>
          <el-select v-model="value" placeholder="请选择">
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
            v-model="value1"
            type="date"
            placeholder="选择日期"/>
        </el-col>
      </el-row>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="使用登记证"/>
          <el-table-column
            prop="name"
            label="使用单位"/>
          <el-table-column
            prop="address"
            label="所在地区"/>
          <el-table-column
            prop="address"
            label="检验类型"/>
          <el-table-column
            prop="address"
            label="任务要求"/>
          <el-table-column
            prop="address"
            label="最迟反馈时间"/>
        </el-table>
      </div>
      <div class="btnG">
        <el-button type="primary" @click="back">确认</el-button>
        <el-button type="primary" @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      options: [{
        value: '检验不合格',
        label: '检验不合格'
      }, {
        value: '超期未检',
        label: '超期未检'
      }, {
        value: '其他',
        label: '其他'
      }],
      value: '',
      tableData: []
    }
  },
  mounted() {
    confirm.log(this.$route)
  },
  methods: {
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
