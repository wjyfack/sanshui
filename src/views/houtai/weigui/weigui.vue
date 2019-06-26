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
        ref="multipleAccountsTables"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="模板名称">
          <template slot-scope="scope">{{ scope.row.illegalName }}</template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">{{ scope.row.is_lock === '0' ? '启用' : '禁用' }}</template>
        </el-table-column>
        <!-- <el-table-column
          prop="remark"
          label="备注"/> -->
        <el-table-column
          prop="illlegalAddTime"
          label="添加日期"/>
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
          <el-form-item label="状态" prop="is_lock">
            <el-switch
              v-model="formInline.is_lock"/>
          </el-form-item>
          <!-- <el-form-item label="排序" prop="templateOrder">
            <el-input v-model="formInline.templateOrder" class="input"/>
          </el-form-item> -->
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
import { fetchTaskIllegalList, fetchAddTaskIllegal, fetchEditTaskIllegal } from '@/api/admin'
export default {
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      formInline: {
        name: '',
        remark: '',
        is_lock: true,
        templateOrder: ''
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入模板名称' }]
        // templateOrder: [{ required: true, trigger: 'blur', message: '排序' }]
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
        illegalName,
        is_lock
      } = row
      this.formInline = {
        id,
        name: illegalName,
        is_lock: !~~is_lock // is_lock === '0' ? true : false,
      }
      this.dialogVisible = true
    },
    formSub() {
      this.$refs.formAddInfo.validate(valid => {
        if (valid) {
          console.log(this.formInline)
          const {
            name,
            is_lock
          } = this.formInline
          const data = {
            illegalName: name,
            is_lock: is_lock ? '0' : '1'
          }
          console.log(data)
          // return ''
          if (this.isEdit) {
            data.id = this.formInline.id
            fetchEditTaskIllegal(data).then(res => {
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
            fetchAddTaskIllegal(data).then(res => {
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
        illegalName: name,
        pageNum,
        pageSize
      }
      fetchTaskIllegalList(data).then(res => {
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
          this.$refs.multipleAccountsTables.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleAccountsTables.clearSelection()
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
