<template>
  <div class="record">
    <div class="title">
      <div class="ti">状态变化记录</div>
      <el-button icon="add" type="primary" size="mini" @click="open">添加记录</el-button>
    </div>
    <div class="table">
      <el-table
        :data="status"
        border
        height="200">
        <el-table-column
          type="index"/>
        <el-table-column
          prop="date"
          label="操作人"/>
        <el-table-column
          prop="name"
          label="	发生时间"/>
        <el-table-column
          prop="address"
          label="	操作"/>
        <el-table-column
          prop="address"
          label="描述"/>
        <el-table-column
          prop="address"
          label="部门"/>
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
  padding: 15px 0;
  .title {
    display: flex;
    padding-top: 15px;
    height: 50px;
    justify-content: space-between;
    align-items: center;
    background: #DBDBDB;
  }
  .table {
  }
}
</style>
