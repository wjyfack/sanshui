<template>
  <div class="shebei">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div class="searchs">
          <label for="" class="label">使用单位：</label>
          <el-input v-model="units.useName" class="input" placeholder="" />
          <label for="" class="label">添加时间：</label>
          <el-date-picker
            v-model="units.addTime"
            clearable
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"/>
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
        </div>
        <div class="searchs">
          <label for="" class="label">单位法人：</label>
          <el-input v-model="units.useLegalPerson" class="input" placeholder="" />
          <label for="" class="label">信用代码：</label>
          <el-input v-model="units.useCreditCode" class="input" placeholder="" />
        </div>
      </el-row>
    </div>
    <div class="shebeiTable">
      <div class="btn-group">
        <el-button icon="el-icon-plus" type="primary" @click="editCom">编辑</el-button>
        <el-button @click="addCom">新增企业</el-button>
        <el-button>导出Excel</el-button>
      </div>
      <div class="notice"><span>已选择</span><span class="col">{{ multipleSelection.length }}</span><span>项   服务调用总计：{{ total }} <el-button type="text" @click="clearing">清空</el-button></span></div>
      <el-table
        v-loading="loading"
        ref="multipleDevice"
        :data="list"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="useName"
          label="使用单位"/>
        <el-table-column
          prop="useAddress"
          label="使用单位地址"/>
        <el-table-column
          prop="useAreaName4"
          label="所在镇街"/>
        <el-table-column
          prop="useCreditCode"
          label="统一社会信用代码"/>
        <el-table-column
          prop="useLegalPerson"
          label="单位法人"/>
        <el-table-column
          prop="useAddManName"
          label="添加人"/>
        <el-table-column
          prop="useAddDate"
          label="添加时间"/>
          <!-- x-_-x -->
      </el-table>

      <div class="page">
        <el-pagination
          :total="total"
          background
          layout="sizes, prev, pager, next, jumper"
          @current-change="pageCurrChange"
          @size-change="pageSizeChange"/>
      </div>
    </div>
    <el-dialog
      :visible.sync="addDialog">
      <addUnit :infomation="infomation" @closed="closed"/>
    </el-dialog>
  </div>
</template>

<script>
import addUnit from './component/edit'
// import { status } from '@/utils/config'
import { fetchCompanyBase, fetchCompanyForEdit } from '@/api/units'
// import { mapGetters } from 'vuex'
export default {
  components: {
    addUnit
  },
  data() {
    return {
      loading: false,
      addDialog: false,
      infomation: {},
      units: {
        useName: '', // 使用单位
        addTime: [], // 添加时间
        useLegalPerson: '', // 单位法人
        useCreditCode: '' // 信用代码
      },
      multipleSelection: [],
      list: [],
      total: 99,
      pageNum: 1,
      pageSize: 10
    }
  },
  computed: {
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    addCom() {
      this.addDialog = true
      this.infomation = null
    },
    editCom() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message.error('请选择单位信息')
        return ''
      }
      const id = multipleSelection[0].id
      fetchCompanyForEdit({ id: id }).then(res => {
        if (res.resultCode === '0000000') {
          this.infomation = res.returnData
          this.addDialog = true
        }
      })
    },
    fecthData() { // get device
      this.loading = true
      const {
        useName, // 使用单位
        addTime, // 添加时间
        useLegalPerson, // 单位法人
        useCreditCode // 信用代码
      } = this.units

      const data = {
        useName,
        useAddDate1: addTime[0],
        useAddDate2: addTime[1],
        useLegalPerson,
        useCreditCode
      }
      data.pageNum = `${this.pageNum}`
      data.pageSize = `${this.pageSize}`
      fetchCompanyBase(data).then((res) => {
        console.log(res)
        if (res.resultCode === '0000000') {
          this.loading = false
          this.total = res.returnData.total
          const list = res.returnData.list
          this.list = list
        }
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
    closed() {
      this.addDialog = false
      this.fecthData()
    },
    clearing() {
      this.multipleSelection = []
      this.toggleSelection()
    },
    searchQuery() {
      this.fecthData()
    },
    searchReset() {
      this.$message('重置成功')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleDevice.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleDevice.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shebei {
    background: #f2f2f2;
    color: #666666;
    font-size: 14px;
    padding: 30px;

    .shebeiSearch {
      padding: 16px;
      border-radius: 8px;
      background: #ffffff;
      label {text-align: right;min-width: 100px;}
      .search {
        display: flex;
        align-items: center;
      }
      .input {width: 200px;margin-right: 30px;}
      .select {margin-right: 15px;}
      .searchs {
        margin-top: 16px;
        display: flex;
        align-items: center;
      }
    }
    .shebeiTable {
     margin-top: 16px;
     padding: 16px;
     border-radius: 8px;
     background: #ffffff;
     .btn-group {
       padding-bottom: 16px;
     }
     .notice {
       background: rgba(230, 246, 255, 1);
       border: 1px solid rgba(186, 231, 255, 1);
       border-radius: 4px;
       height: 40px;
       padding: 0 32px;
       line-height: 40px;
       margin-bottom: 16px;
       .col {color:#1890ff;}
     }
     .page {
       display: flex;
       justify-content: flex-end;
       padding-top: 16px;
     }
    }
    .dialogForm {
      .row {padding-bottom: 16px;}
      .input {max-width: 220px;}
      .label {
        min-width: 120px;
        display: inline-block;
        .red {color: red}
      }
    }
    .infoDialog {
      .titles {
        padding: 10px;
        color:#191919;
        background: #EDEFF4
      }
      .pd-top{padding-top: 16px;}
      .row {
        padding-bottom: 16px;
        .name {
          color: #737C8A;
          display: inline-block;
          margin-right: 5px;
        }
        .info {
          color:#191919;
        }
      }
    }
  }

</style>

