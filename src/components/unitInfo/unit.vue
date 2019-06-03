<template>
  <div>
    <div class="search">
      <el-row>
        <el-col :span="10" class="row">
          <label for="" class="label">使用单位名称</label>
          <el-input v-model="units.useName" placeholder="使用单位名称" />
        </el-col>
        <el-col :span="8" :offset="1">
          <el-button type="primary" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="unitData"
      :loading="loading"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="使用单位名称"
        prop="useName"/>
      <el-table-column
        label="使用单位联系人"
        prop="useContactMan"/>
      <el-table-column
        label="单位联系方式"
        prop="useTel"/>
      <el-table-column
        label="使用单位地址"
        prop="useAddress"/>
    </el-table>
    <div class="page">
      <el-pagination
        :total="total"
        background
        layout="sizes, prev, pager, next, jumper"
        @current-change="pageCurrChange"
        @size-change="pageSizeChange"/>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closed">取 消</el-button>
      <el-button type="primary" @click="sure">确 定</el-button>
    </span>
  </div>
</template>

<script>
import { fetchCompanyBase } from '@/api/units'
export default {
  data() {
    return {
      units: {
        useName: ''
      },
      unitData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      multipleSelection: []
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    sure() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length !== 0) {
        const data = multipleSelection[0]
        data.useContactManTel = data.useTel
        const useArea2 = data.useArea2 ? data.useArea2 : ''
        const useArea3 = data.useArea3 ? data.useArea3 : ''
        const useArea4 = data.useArea4 ? data.useArea4 : ''
        const area = [useArea2, useArea3, useArea4]
        const useAddress = data.useAddress
        const local = { area, useAddress }
        this.$store.dispatch('actionsLocalAddr', local)
        this.closed(data)
      } else {
        this.$message.warning('请勾选单位信息')
      }
    },
    closed(data = {}) {
      this.$emit('closed', data)
    },
    search() {
      this.pageNum = 1
      this.pageSize = 10
      this.fecthData()
    },
    fecthData() {
      const {
        useName
      } = this.units

      const data = {
        useName
      }
      data.pageNum = `${this.pageNum}`
      data.pageSize = `${this.pageSize}`
      this.loading = true
      fetchCompanyBase(data).then((res) => {
        if (res.resultCode === '0000000') {
          this.loading = false
          this.total = res.returnData.total
          const unitData = res.returnData.list
          this.unitData = unitData
        }
      }).then(() => {
        this.loading = false
      })
    },
    pageSizeChange(event) {
      this.pageSize = event
      this.fecthData()
    },
    pageCurrChange(event) {
      this.pageNum = event
      this.fecthData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.page {
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 5px;
}
.label {
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
}
.row {
  display: flex;
}
</style>
