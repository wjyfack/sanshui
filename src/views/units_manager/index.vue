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
          <label for="" class="label">镇街：</label>
          <!-- <el-cascader
            ref="deviceInstallArea"
            v-model="units.installAddr"
            :options="addrCasc"
            clearable/> -->
          <el-select v-model="units.useArea4" placeholder="请选择" clearable>
            <el-option
              v-for="item in townSearchType"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
      </el-row>
    </div>
    <div class="shebeiTable">
      <div class="btn-group">
        <el-button icon="el-icon-plus" type="primary" @click="editCom">编辑</el-button>
        <el-button @click="addCom">新增企业</el-button>
        <el-button @click="dialogExcelVisible = true">导出Excel</el-button>
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
        <!-- <el-table-column
          prop="useCreditCode"
          label="统一社会信用代码"/> -->
        <el-table-column
          prop="useLegalPerson"
          label="单位法人"/>
        <el-table-column
          prop="deviceCount1"
          label="压力容器"/>
        <el-table-column
          prop="deviceCount2"
          label="压力管道"/>
        <el-table-column
          prop="deviceCount3"
          label="场（厂）内专用机动车辆"/>
        <el-table-column
          prop="deviceCount4"
          label="大型游乐设施"/>
        <el-table-column
          prop="deviceCount5"
          label="电梯"/>
        <el-table-column
          prop="deviceCount6"
          label="起重机械"/>
        <el-table-column
          prop="deviceCount7"
          label="锅炉"/>
          <!-- <el-table-column
            prop="useAddManName"
            label="添加人"/>
          <el-table-column
            prop="useAddDate"
            label="添加时间"/> -->
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
    <!-- excel -->
    <el-dialog
      :visible.sync="dialogExcelVisible"
      width="30%"
      title="提示">
      <span>
        <el-radio-group v-model="isExcel">
          <el-radio :label="1">勾选项导出</el-radio>
          <el-radio :label="2">全部导出</el-radio>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogExcelVisible = false">取 消</el-button>
        <el-button type="primary" @click="toMakeExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addrCasc, townSearchType } from '@/utils/config'
import addUnit from './component/edit'
// import { status } from '@/utils/config'
import { fetchCompanyBase, fetchCompanyForEdit, fetchExcelCom } from '@/api/units'
// import { mapGetters } from 'vuex'
export default {
  components: {
    addUnit
  },
  data() {
    return {
      townSearchType,
      addrCasc,
      isExcel: 1,
      dialogExcelVisible: false,
      loading: false,
      addDialog: false,
      infomation: {},
      units: {
        useName: '', // 使用单位
        addTime: [], // 添加时间
        useLegalPerson: '', // 单位法人
        useCreditCode: '', // 信用代码
        installAddr: [],
        useArea3: '7'
      },
      multipleSelection: [],
      list: [],
      total: 0,
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
    toMakeExcel() {
      let data = {}
      if (this.isExcel === 1) { // 导出勾选的
        const multipleSelection = this.multipleSelection
        if (multipleSelection.length === 0) {
          this.$message('请勾选要导出的设备')
          return ''
        } else {
          const id = multipleSelection.map(item => {
            return item.id
          }).join(',')
          data.id = id
        }
      } else { // 全部
        const {
          useName, // 使用单位
          addTime, // 添加时间
          useLegalPerson, // 单位法人
          useCreditCode, // 信用代码
          // installAddr,
          useArea3,
          useArea4
        } = this.units
        // const useArea3 = installAddr[1] ? installAddr[1] : ''
        // const useArea4 = installAddr[2] ? installAddr[2] : ''
        data = {
          useName,
          useAddDate1: addTime[0],
          useAddDate2: addTime[1],
          useLegalPerson,
          useCreditCode,
          useArea3,
          useArea4
        }
      }
      this.$message('正在下载...')
      fetchExcelCom(data).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = objectUrl
        link.download = `${new Date().getTime()}公司导出.xls`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      }).then(() => {
        this.dialogExcelVisible = false
      })
    },
    addCom() {
      this.addDialog = true
      this.infomation = {}
      // this.$refs['unitForm'].resetFields()
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
        useCreditCode, // 信用代码
        // installAddr,
        useArea3,
        useArea4
      } = this.units
      // const useArea3 = installAddr[1] ? installAddr[1] : ''
      // const useArea4 = installAddr[2] ? installAddr[2] : ''
      const data = {
        useName,
        useAddDate1: addTime ? addTime[0] : '',
        useAddDate2: addTime ? addTime[1] : '',
        useLegalPerson,
        useCreditCode,
        useArea3,
        useArea4
      }
      data.pageNum = `${this.pageNum}`
      data.pageSize = `${this.pageSize}`
      fetchCompanyBase(data).then((res) => {
        console.log(res)
        if (res.resultCode === '0000000') {
          this.loading = false
          this.total = res.returnData.total
          const list = res.returnData.list.map(item => {
            if (item.deviceTypeTotal.length !== 0) {
              const count = this.getdeviceCount(item.deviceTypeTotal)
              item = { ...item, ...count }
            }
            return item
          })
          this.list = list
        }
      })
    },
    /** 获取各种设备数量 */
    getdeviceCount(deviceTypeTotal) {
      /**
         * 压力容器
      压力管道
      场（厂）内专用机动车辆
      大型游乐设施
      电梯
      起重机械
      锅炉
        */
      let deviceCount1 = 0
      let deviceCount2 = 0
      let deviceCount3 = 0
      let deviceCount4 = 0
      let deviceCount5 = 0
      let deviceCount6 = 0
      let deviceCount7 = 0
      if (deviceTypeTotal !== null) {
        deviceTypeTotal.forEach(item => {
          switch (item.deviceTypeName) {
            case '压力容器':
              deviceCount1++
              break
            case '压力管道':
              deviceCount2++
              break
            case '场（厂）内专用机动车辆':
              deviceCount3++
              break
            case '大型游乐设施':
              deviceCount4++
              break
            case '电梯':
              deviceCount5++
              break
            case '起重机械':
              deviceCount6++
              break
            case '锅炉':
              deviceCount7++
              break
          }
        })
      }
      return {
        deviceCount1,
        deviceCount2,
        deviceCount3,
        deviceCount4,
        deviceCount5,
        deviceCount6,
        deviceCount7
      }
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
      this.units = {
        useName: '', // 使用单位
        addTime: [], // 添加时间
        useLegalPerson: '', // 单位法人
        useCreditCode: '', // 信用代码
        installAddr: [],
        useArea3: '7',
        useArea4: ''
      }
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

