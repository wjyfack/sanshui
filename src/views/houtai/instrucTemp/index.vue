<template>
  <div class="account">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div class="search">
          <label for="" class="label">模板名称：</label>
          <el-input v-model="info.name" class="input" placeholder="" />
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button icon="el-icon-plus" @click="add">新增</el-button>
        </div>
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
          label="模板名称"
          width="120">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          prop="problem_dspt"
          label="主要问题"/>
        <el-table-column
          prop="rules_dspt"
          label="违反条例"/>
        <el-table-column
          prop="measure_dspt"
          label="处罚依据条例"/>
        <el-table-column
          prop="measure_dspt"
          label="整改措施"/>
        <el-table-column
          prop="remark"
          label="备注"/>
        <el-table-column
          prop="add_date"
          label="编辑日期"/>
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
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="formInline.name" class="input" placeholder="请输入模板名称"/>
            </el-form-item>
          </el-row>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formInline.remark" type="textarea" class="input" placeholder="说点什么"/>
          </el-form-item>
          <el-form-item label="主要问题" prop="problem_dspt">
            <div>
              <el-input v-model="formInline.problem_dspt" type="textarea" placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="违反条例" prop="rules_dspt">
            <div>
              <el-input v-model="formInline.rules_dspt" type="textarea" placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="处罚依据条例" prop="penalty_dspt">
            <div>
              <el-input v-model="formInline.penalty_dspt" type="textarea" placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="整改措施" prop="measure_dspt">
            <div>
              <el-input v-model="formInline.measure_dspt" type="textarea" placeholder=""/>
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
import { fetchLetterTemp, fetchLetterAdd, fetchLetterEdit } from '@/api/admin'
export default {

  data() {
    return {
      dialogVisible: false,
      isEdit: false,
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
        name: [{ required: true, trigger: 'blur', message: '请输入模板名称' }],
        problem_dspt: [{ required: true, trigger: 'blur', message: '主要问题' }],
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
    },
    edit(row) {
      this.isEdit = true
      console.log(row)
      const {
        id,
        name,
        remark,
        pronblem_dspt,
        rules_dspt,
        penalty_dspt,
        measure_dspt,
        is_lock,
        templateOrder
      } = row
      this.formInline = {
        id,
        name,
        remark,
        pronblem_dspt,
        rules_dspt,
        penalty_dspt,
        measure_dspt,
        is_lock: !~~is_lock, // is_lock === '0' ? true : false,
        templateOrder
      }
      this.dialogVisible = true
    },
    formSub() {
      this.$refs.formAddInfo.validate(valid => {
        if (valid) {
          console.log(this.formInline)
          const {
            name,
            remark,
            pronblem_dspt,
            rules_dspt,
            penalty_dspt,
            measure_dspt,
            is_lock,
            templateOrder
          } = this.formInline
          const data = {
            name,
            remark,
            pronblem_dspt,
            rules_dspt,
            penalty_dspt,
            measure_dspt,
            is_lock: is_lock ? '0' : '1',
            templateOrder
          }
          console.log(data)
          // return ''
          if (this.isEdit) {
            data.id = this.formInline.id
            fetchLetterEdit(data).then(res => {
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
            fetchLetterAdd(data).then(res => {
              if (res.resultCode === '0000000') {
                this.$message.success(res.resultDesc)
                this.dialogVisible = false
                this.fecthData()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
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
        pageNum,
        pageSize
      } = this.info
      const data = {
        name,
        pageNum,
        pageSize
      }
      fetchLetterTemp(data).then(res => {
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
  .dialogVisible {
    .input {
      width: 100%;
    }
  }
</style>
