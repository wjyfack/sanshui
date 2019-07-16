<template>
  <div class="account">
    <div class="shebeiSearch">
      <el-row>
        <div class="search">
          <label for="" class="label">基础信息名称：</label>
          <el-input v-model="info.name" class="input" placeholder="" />
          <label for="" class="label">基础信息描述：</label>
          <el-input v-model="info.desc" class="input" placeholder="" />
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button icon="el-icon-plus" @click="add">新增</el-button>
        </div>
      </el-row>
      <el-row style="display:felx;align-items:center;">
        <label for="" class="label">基础信息类型：</label>
        <el-radio-group v-model="tabPosition" style="padding-top: 15px;" @change="searchQuery">
          <el-radio-button label="1">指令书-主要问题</el-radio-button>
          <el-radio-button label="2">指令书-整改措施</el-radio-button>
          <el-radio-button label="3">指令书-违反条例</el-radio-button>
          <el-radio-button label="4">指令书-处罚依据条例</el-radio-button>
        </el-radio-group>
      </el-row>
    </div>
    <div class="table">
      <el-table
        ref="multipleAccountsTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="baseTypeName"
          width="150"
          label="类型"/>
        <el-table-column
          label="名称"
          width="180">
          <template slot-scope="scope">{{ scope.row.baseName }}</template>
        </el-table-column>
        <el-table-column
          prop="baseIntro"
          label="描述"/>
        <el-table-column
          prop="baseUpdateDate"
          width="160"
          label="编辑时间"/>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">{{ scope.row.baseStatus == '0' ? '启用' : '禁用' }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ppp">
      <el-pagination
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加信息">
      <div class="dialogVisible">
        <el-form ref="formAddInfo" :model="formInline" :rules="rules" label-width="130px" class="demo-form-inline">
          <el-row>
            <el-form-item label="类型" prop="name">
              <el-select v-model="formInline.name" :disabled="isEdit" placeholder="请选择">
                <el-option
                  v-for="item in instrucBaseType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-form-item label="名称" prop="remark">
            <el-input v-model="formInline.remark" type="textarea" class="input" placeholder=""/>
          </el-form-item>
          <el-form-item label="描述" prop="problem_dspt">
            <div>
              <el-input v-model="formInline.problem_dspt" type="textarea" placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="状态" prop="is_lock">
            <el-switch
              v-model="formInline.is_lock"/>
          </el-form-item>
          <el-form-item label="排序" prop="templateOrder">
            <el-input v-model="formInline.templateOrder" class="input"/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="formSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchGetLetterBaseList, fetchAddLetterBaseList, fetchEditLetterBaseList } from '@/api/admin'
import { instrucBaseType } from '@/utils/config'
export default {

  data() {
    return {
      tabPosition: '1',
      dialogVisible: false,
      isEdit: false,
      instrucBaseType,
      formInline: {
        name: '',
        remark: '',
        problem_dspt: '',
        rules_dspt: '',
        penalty_dspt: '',
        measure_dspt: '',
        is_lock: true,
        templateOrder: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请选择类型' }],
        problem_dspt: [{ required: true, trigger: 'blur', message: '请输入描述' }],
        remark: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        rules_dspt: [{ required: true, trigger: 'blur', message: '违反条例' }],
        penalty_dspt: [{ required: true, trigger: 'blur', message: '处罚依据条例' }],
        measure_dspt: [{ required: true, trigger: 'blur', message: '整改措施' }],
        templateOrder: [{ required: true, trigger: 'blur', message: '排序' }]
      },
      info: {
        name: '',
        pageNum: '1',
        pageSize: '10'
      },
      total: 0,
      value: '',
      options: [],
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    add() {
      this.formInline.id = ''
      this.dialogVisible = true
      this.isEdit = false
      this.formInline = {
        name: '',
        remark: '',
        problem_dspt: '',
        rules_dspt: '',
        penalty_dspt: '',
        measure_dspt: '',
        is_lock: true,
        templateOrder: ''
      }
    },
    edit(row) {
      this.isEdit = true
      console.log(row)
      const {
        id,
        baseTypeId,
        baseName,
        baseIntro,
        baseStatus,
        baseOrder
      } = row
      this.formInline = {
        id,
        name: baseTypeId,
        remark: baseName,
        problem_dspt: baseIntro,
        is_lock: !~~baseStatus, // is_lock === '0' ? true : false,
        templateOrder: baseOrder
      }
      this.dialogVisible = true
    },
    formSub() {
      this.$refs.formAddInfo.validate(valid => {
        if (valid) {
          // console.log(this.formInline)
          const {
            name,
            remark,
            problem_dspt,
            // rules_dspt,
            // penalty_dspt,
            // measure_dspt,
            is_lock,
            templateOrder
          } = this.formInline
          const data = {
            baseTypeId: name,
            baseName: remark,
            baseIntro: problem_dspt,
            // rules_dspt,
            baseStatus: is_lock ? '0' : '1',
            baseOrder: templateOrder
          }
          console.log(data)
          // return ''
          if (this.isEdit) {
            data.id = this.formInline.id
            fetchEditLetterBaseList(data).then(res => {
              if (res.resultCode === '0000000') {
                this.isEdit = false
                this.$message.success(res.resultDesc)
                this.dialogVisible = false
                this.fecthData()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
          } else {
            fetchAddLetterBaseList(data).then(res => {
              if (res.resultCode === '0000000') {
                this.$message.success(res.resultDesc)
                this.dialogVisible = false
                this.fecthData()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
          }
          this.formInline = {
            name: '',
            remark: '',
            problem_dspt: '',
            rules_dspt: '',
            penalty_dspt: '',
            measure_dspt: '',
            is_lock: true,
            templateOrder: ''
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    searchQuery() {
      this.fecthData()
    },
    fecthData() {
      const {
        name,
        desc,
        pageNum,
        pageSize
      } = this.info
      const data = {
        baseName: name,
        baseIntro: desc,
        baseTypeId: this.tabPosition,
        pageNum,
        pageSize,
        isAll: '0'
      }
      fetchGetLetterBaseList(data).then(res => {
        console.log(res)
        if (res.resultCode === '0000000') {
          const { list, total } = res.returnData
          this.tableData = list
          this.total = total
        } else {
          this.$message.error(res.resultDesc)
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.info.pageSize = `${val}`
      this.fecthData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.info.pageNum = `${val}`
      this.fecthData()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleAccountsTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleAccountsTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .account {
    background: #f2f2f2;
    color: #666666;
    font-size: 14px;
    padding: 15px;
    .shebeiSearch {
      padding: 16px;
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
    .table {
      background: #ffffff;
      padding: 0 15px;
      padding-bottom: 15px;
    }
  }
  .ppp {
    background: #fff;
    padding-left: 15px;
    padding-bottom: 10px;
  }
  .dialogVisible {
    .input {
      width: 100%;
    }
  }
</style>
