<template>
  <div class="shebei">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div class="searchs">
          <label for="" class="label">使用单位：</label>
          <el-input v-model="units.danwei" class="input" placeholder="" />
          <label for="" class="label">添加时间：</label>
          <el-date-picker
            v-model="units.addTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"/>
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
        </div>
        <div class="searchs">
          <label for="" class="label">单位法人：</label>
          <el-input v-model="units.faren" class="input" placeholder="" />
          <label for="" class="label">信用代码：</label>
          <el-input v-model="units.xinyong" class="input" placeholder="" />
        </div>
      </el-row>
    </div>
    <div class="shebeiTable">
      <div class="btn-group">
        <el-button icon="el-icon-plus" type="primary">编辑</el-button>
        <el-button>新增企业</el-button>
        <el-button>导出Excel</el-button>
      </div>
      <div class="notice"><span>已选择</span><span class="col">{{ multipleSelection.length }}</span><span>项   服务调用总计：{{ total }} <el-button type="text" @click="clearing">清空</el-button></span></div>
      <el-table
        v-loading="loading"
        ref="multipleDevice"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="use_org_name"
          label="使用单位"/>
        <el-table-column
          prop="use_org_addr"
          label="使用单位地址"/>
        <el-table-column
          prop="cert_code"
          label="所在镇街"/>
        <el-table-column
          prop="product_code"
          label="统一社会信用代码"/>
        <el-table-column
          prop="reg_code"
          label="单位法人"/>
        <el-table-column
          prop="mai_org_cert_code"
          label="添加人"/>
        <el-table-column
          prop="mai_org_cert_code"
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
  </div>
</template>

<script>
import equementCascader from './../shebei/component/equementCascader'
// import { status } from '@/utils/config'
// import { fetchDeviceList } from '@/api/shengju'
import { mapGetters } from 'vuex'
export default {
  components: {
    equementCascader
  },
  data() {
    return {
      loading: false,
      units: {
        danwei: '', // 使用单位
        addTime: [], // 添加时间
        faren: '', // 单位法人
        xinyong: '' // 信用代码
      },
      multipleSelection: [],
      list: [],
      total: 99,
      pageNum: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters([
      'equipmentAllType'
    ])
  },
  mounted() {
    if (this.equipmentAllType.length === 0) {
      this.$store.dispatch('actionsDeviceType')
    }
    this.fecthData()
  },
  methods: {
    fecthData() { // get device
      this.loading = true
      setTimeout(() => { this.loading = false }, 1000)
      // let data = {}
      // // data = this.device
      // data.pageNum = `${this.pageNum}`
      // data.pageSize = `${this.pageSize}`
      // fetchDeviceList(data).then((res) => {
      //   console.log(res)
      //   if (res.resultCode === '0000000') {
      //     this.loading = false
      //     this.total = res.returnData.total
      //     const list = res.returnData.list
      //     this.list = list
      //   }
      // })
    },
    pageSizeChange(event) {
      this.pageSize = event
      this.fecthData()
    },
    pageCurrChange(event) {
      this.pageNum = event
      this.fecthData()
    },
    clearing() {},
    searchQuery() {
      this.fecthData()
    },
    searchReset() {
      this.$message('重置成功')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
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

