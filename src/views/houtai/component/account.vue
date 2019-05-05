<template>
  <div>
    <div class="btn-group">
      <el-button-group>
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="warning" size="small">删除</el-button>
        <el-button type="primary" size="small">查询</el-button>
      </el-button-group>
    </div>
    <el-table
      ref="multipleAccountTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="日期"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"/>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip/>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleAccountTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleAccountTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
