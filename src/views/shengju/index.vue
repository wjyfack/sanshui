<template>
  <div class="shebei">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div v-if="deviceShow == 1" class="search">
          <label for="" class="label">单位名称：</label>
          <el-input v-model="device.use_org_name" class="input" placeholder="" />
          <label for="" class="label">设备种类：</label>
          <equement-cascader
            ref="equipmentCasc1"
            :equipment="equipmentAllType"
            @click.native="equipmentClear"
            @cascader="onUseEqueChange"/>
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
          <!-- <el-button @click="dialogVisible = true">更多查询</el-button> -->
          <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
        </div>
        <div v-if="deviceShow == 2" class="searchs">
          <label for="" class="label">单位名称：</label>
          <el-input v-model="biange.out_org_name" class="input" placeholder="" />
          <label for="" class="label">申请类别：</label>
          <el-select v-model="biange.apply_type" clearable placeholder="请选择申请类别">
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
          <!-- <el-button @click="dialogVisible = true">更多查询</el-button> -->
          <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
        </div>
        <div v-if="deviceShow == 3" class="searchs">
          <label for="" class="label">单位名称：</label>
          <el-input v-model="units.org_name" class="input" placeholder="" />
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
          <!-- <el-button @click="dialogVisible = true">更多查询</el-button> -->
          <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
        </div>
      </el-row>
    </div>
    <div class="shebeiTable">
      <div class="btn-group">
        <el-button :type="selectBtns[0]" @click="changeInfo(1)">设备信息</el-button>
        <el-button :type="selectBtns[1]" @click="changeInfo(2)">变更信息</el-button>
        <el-button :type="selectBtns[2]" @click="changeInfo(3)">单位信息</el-button>
      </div>
      <div class="notice"><span>已选择</span><span class="col">{{ multipleSelection.length }}</span><span>项   服务调用总计：{{ total }} <el-button type="text" @click="clearing">清空</el-button></span></div>
      <el-table
        v-loading="loading"
        v-show="deviceShow == 1"
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
          prop="use_org_name"
          label="使用单位"/>
        <el-table-column
          prop="use_org_addr"
          label="使用单位地址"/>
        <el-table-column
          prop="cert_code"
          label="使用登记证"/>
        <el-table-column
          prop="product_code"
          label="出厂编号"/>
        <el-table-column
          prop="reg_code"
          label="设备注册代码"/>
        <el-table-column
          prop="mai_org_cert_code"
          label="维保单位证书编号"/>
        <el-table-column
          label="设备状态">
          <template slot-scope="scope">
            <span>{{ getDeviceStatus(scope.row.use_status) }}</span>
          </template>
        </el-table-column>
        <!-- x-_-x -->
      </el-table>
      <el-table
        v-loading="loading"
        v-show="deviceShow == 2"
        ref="multipleChange"
        :data="bianlist"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="apply_type"
          label="申请类别"/>
        <el-table-column
          prop="out_org_name"
          label="使用单位"/>
        <el-table-column
          prop="out_org_addr"
          label="使用单位地址"/>
        <el-table-column
          prop="out_corp"
          label="单位法人"/>
        <el-table-column
          prop="out_tel"
          label="电话"/>
        <el-table-column
          prop="in_org_name"
          label="转入单位名称"/>
        <el-table-column
          prop="in_org_addr"
          label="转入单位地址"/>
        <el-table-column
          prop="in_corp"
          label="转入法定代表人"/>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-search"
              type="primary"
              @click="radirtaskDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-loading="loading"
        v-show="deviceShow == 3"
        ref="multipledanwu"
        :data="danlist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="org_name"
          label="使用单位"/>
        <el-table-column
          prop="org_addr"
          label="使用单位地址"/>
        <el-table-column
          prop="legalrepre"
          label="法定代表人"/>
        <!-- <el-table-column
          prop="legalrepre_cert_type"
          label="单位联系人"/> -->
        <el-table-column
          prop="tel"
          label="联系电话"/>
        <el-table-column
          prop="area_code"
          label="行政区域"/>
        <el-table-column
          prop="legalrepre_cert_code"
          label="社会信用代码"/>
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
      :visible.sync="dialogInfoVisible"
      width="50%"
      title="">
      <div class="more-shebei">
        <el-button
          v-for="(item) in deviceDetailArr"
          :key="item.id"
          type="primary"
          class="button"
          @click="changeDeviceDetail(item)">{{ item.cert_code }}</el-button>
      </div>
      <deviceDetail :loading="dialogInfoLoading" :info="taskdeviceDetail" />
    </el-dialog>
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
        <el-button :loading="isExcelLoading" type="primary" @click="toMakeExcel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import deviceDetail from './component/deviceDetail'
import equementCascader from './../shebei/component/equementCascader'
import { status } from '@/utils/config'
import { fetchDeviceList, fetchChangeList, fetchCompanyBase, fetchDeviceDetail, fetchExcelUnit, fetchExcelDeviceBase, fetchExcelDeviceChange } from '@/api/shengju'
import { mapGetters } from 'vuex'
export default {
  components: {
    equementCascader,
    deviceDetail
  },
  data() {
    return {
      dialogExcelVisible: false,
      isExcel: 1,
      isExcelLoading: false,
      dialogInfoVisible: false,
      deviceDetailArr: [],
      dialogInfoLoading: false,
      taskdeviceDetail: {},
      loading: false,
      deviceShow: '1', // 显示内容 1,2,3
      selectBtns: ['primary', 'info', 'info'],
      // 单个信息
      status,
      // 已选择状态
      equipmentTypeChecked: '',
      statusChecked: '',
      checkStatusChecked: '',
      overdueChecked: '',
      inspectionDate: '', // 年检
      // 查询
      pageNum: '1',
      pageSize: '10',
      device: {
        equ_kind: '', // 一级
        equ_type: '', // 设备种类二级
        use_org_name: '', // 单位名称
        area_code: '440607'
      },
      biange: {
        out_area_code: '440607',
        apply_type: '',
        out_org_name: ''
      },
      units: {
        org_name: ''
      },
      list: [],
      bianlist: [],
      danlist: [],
      total: 0,
      opt: 1,
      options: [],
      activeName: 'first',
      value: '',
      multipleSelection: []
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
    toMakeExcel() {
      const data = {}
      if (this.isExcel === 1) { // 导出勾选的
        const multipleSelection = this.multipleSelection
        if (multipleSelection.length === 0) {
          this.$message('请勾选要导出选项')
          return ''
        } else {
          this.isExcelLoading = true
          data.fileType = '1'
          let arr = []
          switch (this.deviceShow) {
            case '1': // 设备
              arr = multipleSelection.map(item => {
                const dataItem = {}
                dataItem.USE_ORG_NAME = item.use_org_name
                dataItem.USE_ORG_ADDR = item.use_org_addr
                dataItem.CERT_CODE = item.cert_code
                dataItem.PRODUCT_CODE = item.product_code
                dataItem.REG_CODE = item.reg_code
                dataItem.MAI_ORG_CERT_CODE = item.mai_org_cert_code
                dataItem.USE_STATUS = item.use_status
                return dataItem
              })

              data.arr = arr
              console.log(JSON.stringify(arr))
              fetchExcelDeviceBase(data).then(res => {
                this.toLoading(res)
              })
              break
            case '2': // 变更
              arr = multipleSelection.map(item => {
                const dataItem = {}
                dataItem.DStatusName = item.apply_type
                dataItem.OUT_ORG_NAME = item.out_org_name
                dataItem.OUT_ORG_ADDR = item.out_org_addr
                dataItem.OUT_CORP = item.out_corp
                dataItem.OUT_TEL = item.out_tel
                dataItem.IN_ORG_NAME = item.in_org_addr
                dataItem.IN_ORG_ADDR = item.in_org_name
                return dataItem
              })
              data.arr = arr
              // console.log(JSON.stringify(arr))
              // return ''
              fetchExcelDeviceChange(data).then(res => {
                this.toLoading(res)
              })
              break
            case '3': // 单位
              arr = multipleSelection.map(item => {
                const dataItem = {}
                dataItem.ORG_NAME = item.org_name
                dataItem.ORG_ADDR = item.org_addr
                dataItem.LEGALREPRE = item.legalrepre
                dataItem.TEL = item.tel
                dataItem.AREA_CODE = item.area_code
                dataItem.LEGALREPRE_CERT_CODE = item.legalrepre_cert_code
                // dataItem.useCreditCode = item.legalrepre_cert_code
                return dataItem
              })
              data.arr = arr
              fetchExcelUnit(data).then(res => {
                this.toLoading(res)
              })
              break
          }
        }
      } else { // 全部
        this.isExcelLoading = true
        data.fileType = '2'
        switch (this.deviceShow) {
          case '1': // 设备
            data.use_org_name = this.device.use_org_name
            data.equ_kind = this.device.equ_kind
            data.equ_type = this.device.equ_type
            fetchExcelDeviceBase(data).then(res => {
              this.toLoading(res)
            })
            break
          case '2': // 变更
            data.apply_type = this.biange.apply_type
            data.out_org_name = this.biange.out_org_name
            fetchExcelDeviceChange(data).then(res => {
              this.toLoading(res)
            })
            break
          case '3': // 单位
            data.org_name = this.units.org_name
            fetchExcelUnit(data).then(res => {
              this.toLoading(res)
            })
            break
        }
      }
    },
    toLoading(res, opt = 1) {
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = objectUrl
      link.download = `${new Date().getTime()}导出.xls`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(objectUrl)
      this.dialogExcelVisible = false
      this.isExcelLoading = false
    },
    equipmentClear() {
      const equipmentCasc1 = this.$refs.equipmentCasc1
      if (equipmentCasc1) {
        equipmentCasc1.clear()
      }
    },
    changeDeviceDetail(item) {
      this.taskdeviceDetail = item
    },
    radirtaskDetail(row) {
      console.log(row)
      const { deviceIds } = row
      this.getdeviceDetail(deviceIds)
    },
    /** 任务详情 */
    getdeviceDetail(ids) {
      fetchDeviceDetail(ids).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          if (data.returnData.length !== 0) {
            this.deviceDetailArr = data.returnData
            this.taskdeviceDetail = this.deviceDetailArr[0]
            this.dialogInfoVisible = true
          } else {
            this.$message.error('暂无数据')
          }
        } else {
          this.$message.error(data.resultDesc)
        }
      }).finally(() => {
        this.dialogInfoLoading = false
      })
    },
    getDeviceStatus(value) {
      const [item] = this.status.filter(item => {
        return item.value === value
      })
      return !item ? '' : item.label
    },
    changeInfo(opt) {
      switch (~~opt) {
        case 1:
          this.selectBtns = ['primary', 'info', 'info']
          this.opt = 1
          break
        case 2:
          this.selectBtns = ['info', 'primary', 'info']
          this.opt = 2
          break
        case 3:
          this.selectBtns = ['info', 'info', 'primary']
          this.opt = 3
          break
      }
      this.deviceShow = `${opt}`
      this.fecthData()
    },
    onUseEqueChange(event) { // 设备种类
      const [kind, type] = event
      console.log(kind, type, 123)
      this.device.equ_kind = kind // 一级
      this.device.equ_type = type
    },
    fecthData() { // get device
      this.loading = true
      let data = {}
      switch (this.opt) {
        case 1:
          data = this.device
          data.pageNum = `${this.pageNum}`
          data.pageSize = `${this.pageSize}`
          fetchDeviceList(data).then((res) => {
            console.log(res)
            if (res.resultCode === '0000000') {
              this.loading = false
              this.total = res.returnData.total
              const list = res.returnData.list
              this.list = list
            }
          })
          break
        case 2:
          data = this.biange
          data.pageNum = `${this.pageNum}`
          data.pageSize = `${this.pageSize}`
          fetchChangeList(data).then((res) => {
            if (res.resultCode === '0000000') {
              this.loading = false
              this.total = res.returnData.total
              this.bianlist = res.returnData.list
            }
          })
          break
        case 3:
          data = this.units
          data.pageNum = `${this.pageNum}`
          data.pageSize = `${this.pageSize}`
          fetchCompanyBase(data).then((res) => {
            if (res.resultCode === '0000000') {
              this.loading = false
              this.total = res.returnData.total
              this.danlist = res.returnData.list
            }
          })
          break
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
    clearing() {
      this.toggleSelection()
    },
    searchQuery() {
      this.fecthData()
    },
    searchReset() {
      this.$message('重置成功')
      this.device = {
        equ_kind: '', // 一级
        equ_type: '', // 设备种类二级
        use_org_name: '', // 单位名称
        area_code: '440607'
      }
      this.biange = {
        out_area_code: '440607',
        apply_type: '',
        out_org_name: ''
      }
      this.units = {
        org_name: ''
      }
      this.equipmentClear()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleDevice.toggleRowSelection(row)
          this.$refs.multipleChange.toggleRowSelection(row)
          this.$refs.multipledanwu.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleDevice.clearSelection()
        this.$refs.multipleChange.clearSelection()
        this.$refs.multipledanwu.clearSelection()
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

