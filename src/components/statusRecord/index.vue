<template>
  <div class="record">
    <div class="title">
      <div class="ti">状态变化记录</div>
      <!-- <el-button icon="add" type="primary" size="mini" @click="open">添加记录</el-button> -->
    </div>
    <div class="table">
      <el-table
        :data="status"
        border
        height="200"
        style="width: 100%;">
        <el-table-column
          type="index"/>
        <el-table-column
          prop="taskCheckOperateName"
          label="	操作类型"/>
        <el-table-column
          prop="taskCheckLogManName"
          label="操作员"/>
        <el-table-column
          prop="taskCheckOperateResult"
          label="执行结果"/>
        <el-table-column
          prop="taskCheckLogDate"
          label="	执行时间"/>
          <!-- <el-table-column
          prop="taskCheckDeptName"
          label="部门"/> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Array,
      default: () => []
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    open() {
      this.$prompt('', '请填写记录描述', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: '\S',
        inputErrorMessage: '请填写记录描述'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '' + value
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  padding-top: 15px;
  .title {
    display: flex;
    padding: 0 15px;
    height: 45px;
    justify-content: space-between;
    align-items: center;
    background: #DBDBDB;
  }
  .table {
    width: 100%;
    padding-left: 1px;
  }
}
</style>
