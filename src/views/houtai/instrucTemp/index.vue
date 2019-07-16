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
          <template slot-scope="scope">{{ scope.row.problemTitle }}</template>
        </el-table-column>
        <el-table-column
          prop="problem_dspt"
          label="主要问题"/>
        <el-table-column
          prop="rules_dspt"
          label="违反条例"/>
        <el-table-column
          prop="penalty_dspt"
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
          label="状态"
          width="80">
          <template slot-scope="scope">{{ scope.row.is_lock === '0' ? '启用' : '禁用' }}</template>
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
          <!-- <el-row>
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="formInline.name" class="input" placeholder="请输入模板名称"/>
            </el-form-item>
          </el-row> -->
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formInline.remark" type="textarea" class="input" placeholder="说点什么"/>
          </el-form-item>
          <el-form-item label="主要问题" prop="problem_dspt">
            <div>
              <div>
                <el-tag
                  v-for="(item, index) in selectList1"
                  :key="index"
                  :class="['eltag', item.isCheck ? 'el-tag--success': '']"
                  effect="plain"
                  type="info">
                  <span @click="clicktag(index,1)">{{ item.baseName }}</span>
                </el-tag>
              </div>
              <el-input v-model="formInline.problem_dspt" :rows="4" type="textarea" disabled placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="违反条例" prop="rules_dspt">
            <div>
              <div>
                <el-tag
                  v-for="(item, index) in selectList2"
                  :key="index"
                  :class="['eltag', item.isCheck ? 'el-tag--success': '']"
                  type="info"
                  effect="plain">
                  <span @click="clicktag(index,2)">{{ item.baseName }}</span>
                </el-tag>
              </div>
              <el-input v-model="formInline.rules_dspt" :rows="4" type="textarea" disabled placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="处罚依据条例" prop="penalty_dspt">
            <div>
              <div>
                <el-tag
                  v-for="(item, index) in selectList3"
                  :key="index"
                  :class="['eltag', item.isCheck ? 'el-tag--success': '']"
                  type="info"
                  effect="plain">
                  <span @click="clicktag(index,3)">{{ item.baseName }}</span>
                </el-tag>
              </div>
              <el-input v-model="formInline.penalty_dspt" :rows="4" type="textarea" disabled placeholder=""/>
            </div>
          </el-form-item>
          <el-form-item label="整改措施" prop="measure_dspt">
            <div>
              <div>
                <el-tag
                  v-for="(item, index) in selectList4"
                  :key="index"
                  :class="['eltag', item.isCheck ? 'el-tag--success': '']"
                  type="info"
                  effect="plain">
                  <span @click="clicktag(index,4)">{{ item.baseName }}</span>
                </el-tag>
              </div>
              <el-input v-model="formInline.measure_dspt" :rows="4" type="textarea" disabled placeholder=""/>
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
import { fetchGetLetterBaseList, fetchLetterTemp, fetchLetterAdd, fetchLetterEdit } from '@/api/admin'
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
      problemTitle: '',
      value: '',
      selectList1: [],
      selectList2: [],
      selectList3: [],
      selectList4: [],
      options: [],
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {
    this.fecthData()
    this.getBaseList()
  },
  methods: {
    // optains 四个中的一个
    clicktag(index, options) { // 点击单个标签
      console.log(index, options)
      switch (options) {
        case 1: // 只能单选
          var selectList1 = this.selectList1
          for (let i = selectList1.length - 1; i >= 0; i--) {
            selectList1[i].isCheck = false
          }
          this.problemTitle = this.selectList1[index].baseName
          this.selectList1[index].isCheck = true
          break
        case 2:
          this.selectList2[index].isCheck = !this.selectList2[index].isCheck
          break
        case 3:
          this.selectList3[index].isCheck = !this.selectList3[index].isCheck
          break
        case 4:
          this.selectList4[index].isCheck = !this.selectList4[index].isCheck
          break
      }
      this.toShowDesc(options)
      // this.$nextTick()
    },
    toShowDesc(options) {
      const str = [] // ；
      switch (options) {
        case 1:
          this.selectList1.map(item => {
            if (item.isCheck) {
              str.push(item.baseIntro)
            }
          })
          this.formInline.problem_dspt = str.join('；')
          break
        case 2:
          this.selectList2.map(item => {
            if (item.isCheck) {
              str.push(item.baseIntro)
            }
          })
          this.formInline.rules_dspt = str.join('；')
          break
        case 3:
          this.selectList3.map(item => {
            if (item.isCheck) {
              str.push(item.baseIntro)
            }
          })
          this.formInline.penalty_dspt = str.join('；')
          break
        case 4:
          this.selectList4.map(item => {
            if (item.isCheck) {
              str.push(item.baseIntro)
            }
          })
          this.formInline.measure_dspt = str.join('；')
          break
      }
      this.$nextTick()
    },
    getBaseList() {
      const data = {
        isAll: '1'
      }
      fetchGetLetterBaseList(data).then(res => {
        console.log(res)
        if (res.resultCode === '0000000') {
          const list = res.returnData.list
          for (let i = 0; i < list.length; i++) {
            list[i].isCheck = false
            switch (~~list[i].baseTypeId) {
              case 1:
                this.selectList1 = [...this.selectList1, list[i]]
                break
              case 3:
                this.selectList2 = [...this.selectList2, list[i]]
                break
              case 4:
                this.selectList3 = [...this.selectList3, list[i]]
                break
              case 2:
                this.selectList4 = [...this.selectList4, list[i]]
                break
            }
          }
        }
      })
    },
    add() {
      // this.getBaseList()
      this.selectList1 = this.selectList1.map(item => { // 主要问题
        item.isCheck = false
        return item
      })
      this.selectList2 = this.selectList2.map(item => { // 违法条例
        item.isCheck = false
        return item
      })
      this.selectList3 = this.selectList3.map(item => { // 处罚依据条例
        item.isCheck = false
        return item
      })
      this.selectList4 = this.selectList4.map(item => { // 主要问题
        item.isCheck = false
        return item
      })
      this.formInline.id = ''
      this.dialogVisible = true
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
        name,
        remark,
        problem_dspt,
        rules_dspt,
        penalty_dspt,
        measure_dspt,
        is_lock,
        templateOrder,
        problemTitle,
        measure,
        penalty,
        problem,
        rules
      } = row
      this.problemTitle = problemTitle
      const measureArr = measure.split(',').map(item => {
        const val = item + ''
        return val.substr(1)
      })
      const penaltyArr = penalty.split(',').map(item => {
        const val = item + ''
        return val.substr(1)
      })
      const problemArr = problem.split(',').map(item => {
        const val = item + ''
        return val.substr(1)
      })
      const rulesArr = rules.split(',').map(item => {
        const val = item + ''
        return val.substr(1)
      })
      // console.log(measureArr,penaltyArr,problemArr,rulesArr)
      // console.log(this.selectList1.map(item => item.id))
      // console.log(this.selectList2.map(item => item.id))
      // console.log(this.selectList3.map(item => item.id))
      // console.log(this.selectList4.map(item => item.id))
      this.selectList1 = this.selectList1.map(item => { // 主要问题
        if (problemArr.some(s => s === item.id)) {
          item.isCheck = true
        } else {
          item.isCheck = false
        }
        return item
      })
      this.selectList2 = this.selectList2.map(item => { // 违法条例
        if (rulesArr.some(s => s === item.id)) {
          item.isCheck = true
        } else {
          item.isCheck = false
        }
        return item
      })
      this.selectList3 = this.selectList3.map(item => { // 处罚依据条例
        if (penaltyArr.some(s => s === item.id)) {
          item.isCheck = true
        } else {
          item.isCheck = false
        }
        return item
      })
      this.selectList4 = this.selectList4.map(item => { // 主要问题
        if (measureArr.some(s => s === item.id)) {
          item.isCheck = true
        } else {
          item.isCheck = false
        }
        return item
      })
      this.formInline = {
        id,
        name,
        remark,
        problem_dspt,
        rules_dspt,
        penalty_dspt,
        measure_dspt,
        problemTitle,
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
            // name,
            remark,
            problem_dspt,
            rules_dspt,
            penalty_dspt,
            measure_dspt,
            is_lock,
            templateOrder
          } = this.formInline
          const problem = this.selectList1.filter(item => item.isCheck).map(item => {
            const id = `0${item.id}`
            return id
          }).join(',')
          const rules = this.selectList2.filter(item => item.isCheck).map(item => {
            const id = `0${item.id}`
            return id
          }).join(',')
          const penalty = this.selectList3.filter(item => item.isCheck).map(item => {
            const id = `0${item.id}`
            return id
          }).join(',')
          const measure = this.selectList4.filter(item => item.isCheck).map(item => {
            const id = `0${item.id}`
            return id
          }).join(',')
          const data = {
            // name,
            problemTitle: this.problemTitle,
            remark,
            problem,
            problem_dspt,
            rules,
            rules_dspt,
            penalty,
            penalty_dspt,
            measure,
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
                this.selectList1 = this.selectList1.map(item => { // 主要问题
                  item.isCheck = false
                  return item
                })
                this.selectList2 = this.selectList2.map(item => { // 违法条例
                  item.isCheck = false
                  return item
                })
                this.selectList3 = this.selectList3.map(item => { // 处罚依据条例
                  item.isCheck = false
                  return item
                })
                this.selectList4 = this.selectList4.map(item => { // 主要问题
                  item.isCheck = false
                  return item
                })
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
  .ppp {
    background: #fff;
    padding-left: 15px;
    padding-bottom: 10px;
  }
  .eltag {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .dialogVisible {
    .input {
      width: 100%;
    }
  }
</style>
