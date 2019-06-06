<template>
  <div class="paifa">
    <div class="cont">
      <div v-if="isShow">
        <div class="title"><label class="label" for="">目前任务统计</label></div>
        <el-row type="flex" align="middle" class="row">
          <el-col :span="8"><label class="label" for="">待处理：</label><span>{{ taskTotal }}</span></el-col>
          <el-col :span="8"><label class="label" for="">派发数量：</label><span>{{ deviceList.length }}</span></el-col>
        </el-row>
      </div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="6">
          <label class="label" for="">任务要求：</label>
          <el-input v-model="checkIntro" class="input" placeholder="请输入任务要求" @change="taskIntro"/>
        </el-col>
        <el-col :span="6"><label class="label" for="">检验类型：</label>
          <el-select v-model="checkTypeId" placeholder="请选择" @change="taskType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-col>
        <el-col :span="6">
          <label class="label" for="">反馈时间：</label>
          <el-date-picker
            v-model="checkResultEndDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="taskDate"/>
        </el-col>
      </el-row>
      <div class="table">
        <el-table
          :data="deviceList"
          border
          @cell-click="cellClick">
          <el-table-column
            prop="deviceCertNo"
            label="使用登记证"/>
          <el-table-column
            prop="companyUseName"
            label="使用单位名称"/>
          <el-table-column
            prop="deviceLastTestResult"
            label="上次检验结论"/>
          <el-table-column
            label="任务要求">
            <template slot-scope="scope">
              <el-input v-model="deviceList[scope.$index].checkIntro" placeholder="任务要求"/>
            </template>
          </el-table-column>
          <el-table-column
            label="检验类型">
            <template slot-scope="scope">
              <el-select v-model="deviceList[scope.$index].checkTypeId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="最迟反馈时间">
            <template slot-scope="scope">
              <el-date-picker
                v-model="deviceList[scope.$index].checkResultEndDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"/>
            </template>
          </el-table-column>
          <el-table-column
            label="接收部门">
            <template slot-scope="scope">
              <el-select v-model="deviceList[scope.$index].checkDeptId" placeholder="请选择" @change="deptChange">
                <el-option
                  v-for="(item) in deptNames"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id"/>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="任务状态">
            <template slot-scope="scope">
              <task-check :arr="deviceList[scope.$index].selectTask" @send="sendStatus($event,scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="btnG">
        <el-button type="primary" @click="submit">确认</el-button>
        <el-button type="primary" @click="back">取消</el-button>
      </div>
    </div>
    <!-- 详情 -->
    <el-dialog
      :visible.sync="dialogInfoVisible"
      title="">
      <div class="more-shebei">
        <el-button
          v-for="(item, index) in deviceDetailArr"
          :key="index"
          type="primary"
          class="button"
          @click="getdeviceDetail(item.id)">{{ item.deviceCertNo || item.deviceProduceNo }}</el-button>
      </div>
      <deviceDetail :loading="dialogInfoLoading" :info="taskdeviceDetail" />
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInfoVisible = false">确认</el-button>
        <el-button @click="dialogInfoVisible = false">关闭</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { fetchDistributeTask } from '@/api/task'
import { fetchReview } from '@/api/instruction'
import { mapGetters } from 'vuex'
import { getFormatDate } from '@/utils/common'
import { fetchDeviceDetail } from '@/api/shebei'
import deviceDetail from '@/components/deviceDetail'
import taskCheck from '@/components/taskCheck/index'
export default {
  components: {
    deviceDetail,
    taskCheck
  },
  data() {
    return {
      isShow: true,
      deviceList: [],
      taskTotal: 0,
      id: '', // 任务id
      checkIntro: '', // 任务要求
      checkResultEndDate: '', // 反馈时间
      checkTypeId: '', // 检验类型
      checkDeptId: '', // 接收部门id
      checkDeptName: '', // 接收部门
      checkNo: '',
      dialogInfoLoading: false,
      dialogInfoVisible: false,
      deviceDetailArr: [],
      taskdeviceDetail: {},
      options: [{
        value: '2',
        label: '检验不合格'
      }, {
        value: '1',
        label: '超期未检'
      }, {
        value: '3',
        label: '主动上报'
      }, {
        value: '4',
        label: '投诉任务'
      }, {
        value: '0',
        label: '其他'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'deptNames'
    ])
  },
  watch: {
    checkIntro: function(val) {
      this.taskIntro(val)
    }
  },
  mounted() {
    if (this.deptNames.length === 0) {
      this.$store.dispatch('actionsDeptNames')
    }
    console.log(this.deptNames)
    const { arr, taskTotal, info } = this.$route.query

    // console.log(info !== undefined)
    if (info !== undefined) { // 重新派发
      // console.log(info)
      // this.checkIntro = info.checkIntro // 任务要求
      // this.checkResultEndDate = info.checkResultEndDate // 反馈时间
      // this.checkTypeId = info.checkTypeId // 检验类型
      // this.checkDeptId = info.checkDeptId // 接收部门id
      // this.checkDeptName = info.checkDeptName // 接收部门
      this.checkNo = info.checkNo
      const list = arr.map(element => {
        const selectTask = [element.taskStatus, element.taskStatusName]
        element.selectTask = selectTask
        return element
      })
      this.deviceList = list
    } else {
      // let list = []
      // arr.map(item => {
      //   const devList = item.list === null ? [] : item.list.map(val => {
      //     val.companyUseName = item.companyUseName
      //     val.deviceLastTestResult = item.deviceLastTestResult
      //     val.checkDeptId = item.checkDeptId
      //     return val
      //   })
      //   list = [...list, ...devList]
      // })
      const list = this.selectDept(arr)
      this.deviceList = list
    }
    if (!taskTotal) {
      this.isShow = false
    } else {
      this.isShow = true
      this.taskTotal = taskTotal
    }
  },
  methods: {
    taskIntro(event) {
      this.deviceList = this.deviceList.map(item => {
        item.checkIntro = event
        return item
      })
    },
    taskType(event) {
      this.deviceList = this.deviceList.map(item => {
        item.checkTypeId = event
        return item
      })
    },
    taskDate(event) {
      this.deviceList = this.deviceList.map(item => {
        item.checkResultEndDate = event
        return item
      })
    },
    sendStatus(event, index) {
      console.log(event, index)
      const {
        taskStatus,
        instructionStatus
      } = event
      this.deviceList.taskStatus = taskStatus
      this.deviceList.taskStatusName = instructionStatus
    },
    /** 指定接收部门 */
    selectDept(arr) {
      let arrs = arr
      const deptNames = this.deptNames
      // const { deptArea4Names } = deptNames // 镇街
      arrs = arrs.map(element => {
        const { deviceAreaName4 } = element
        // console.log(deviceAreaName4)
        const arrG = deptNames.filter(item => {
          return item.deptArea4Names.indexOf(deviceAreaName4) > -1 && item.deptType === '2'
        })
        if (arrG.length !== 0) {
          element.checkDeptId = arrG[0].id
        }
        // console.log(arrG)
        const selectTask = [element.taskStatus, element.taskStatusName]
        element.selectTask = selectTask
        element.checkResultEndDate = element.checkResultEndDate ? element.checkResultEndDate : getFormatDate()
        return element
      })
      return arrs
    },
    cellClick(row, column, cell, event) {
      // console.log(column, cell)
      const { label } = column
      if (label === '使用登记证') {
        const { list } = row
        this.deviceDetailArr = list.map(item => {
          return {
            id: item.id,
            deviceCertNo: item.deviceCertNo,
            deviceProduceNo: item.deviceProduceNo
          }
        })
        this.getdeviceDetail(this.deviceDetailArr[0].id)
      }
    },
    deptChange(event) {
      console.log(event)
      console.log(this.deviceList)
    },
    /** 任务详情 */
    getdeviceDetail(id) {
      this.dialogInfoVisible = true
      fetchDeviceDetail(id).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.taskdeviceDetail = data.returnData
        }
      }).finally(() => {
        this.dialogInfoLoading = false
      })
    },
    submit() {
      const deviceList = this.deviceList
      // console.log(deviceList)
      const ischeckIntro = deviceList.some(item => {
        return item.checkIntro === '' || item.checkIntro === null
      })
      if (ischeckIntro) {
        this.$message.warning('请输入任务要求')
        return ''
      } // 任务要求
      const ischeckTypeId = deviceList.some(item => {
        return item.checkTypeId === '' || item.checkTypeId === null
      })
      if (ischeckTypeId) {
        this.$message.warning('请输入检验类型')
        return ''
      } // 检验类型
      const ischeckResultEndDate = deviceList.some(item => {
        return item.checkResultEndDate === '' || item.checkResultEndDate === null
      })
      if (ischeckResultEndDate) {
        this.$message.warning('请输入反馈时间')
        return ''
      } // 反馈时间
      const isType = deviceList.some(item => {
        return item.checkDeptId === '' || item.checkDeptId === null
      })
      // console.log(isType)
      if (isType) {
        this.$message.warning('请选择接收部门')
        return ''
      }
      if (this.isShow) { // 派发任务
        console.log(12111231)
        const arr = deviceList.map(item => {
          // const data = {}
          const [{ deptName }] = this.deptNames.filter(val => {
            return val.id === item.checkDeptId
          })
          // data.id = item.id
          delete item.list
          delete item.selectTask
          item.checkDeptName = deptName
          // item.checkIntro = this.checkIntro
          // item.checkResultEndDate = this.checkResultEndDate
          // item.checkTypeId = this.checkTypeId
          // item.checkNo = item.checkNo
          // item.checkDeptId = item.checkDeptId
          item.operateName = '派发任务' // 操作记录
          return item
        })
        // console.log(arr)
        // return ''
        fetchDistributeTask(arr).then(data => {
          if (data.resultCode === '0000000') {
            this.$message({
              message: data.resultDesc,
              type: 'success'
            })
            setTimeout(() => { this.back() }, 1500)
          }
        })
      } else {
        // const deviceList = this.deviceList
        const [data] = deviceList.map(item => {
          const [{ deptName }] = this.deptNames.filter(val => {
            return val.id === item.checkDeptId
          })
          delete item.list
          delete item.selectTask
          item.checkDeptName = deptName
          // item.checkIntro = this.checkIntro // 任务要求
          // item.checkResultEndDate = this.checkResultEndDate // 反馈时间
          // item.checkTypeId = this.checkTypeId // 检验类型
          // item.checkDeptId = this.checkDeptId // 接收部门id
          // item.checkDeptName = this.checkDeptName // 接收部门
          item.operateName = '复查任务'
          item.checkNo = this.checkNo
          return item
        })
        // const data = {
        //   checkIntro: this.checkIntro, // 任务要求
        //   checkResultEndDate: this.checkResultEndDate, // 反馈时间
        //   checkTypeId: this.checkTypeId, // 检验类型
        //   checkDeptId: this.checkDeptId, // 接收部门id
        //   checkDeptName: this.checkDeptName, // 接收部门
        //   operateName: '复查任务',
        //   checkNo: this.checkNo
        // }
        // console.log(data, 123)
        // return ''
        fetchReview(data).then(data => {
          if (data.resultCode === '0000000') {
            this.$message({
              message: data.resultDesc,
              type: 'success'
            })
            setTimeout(() => { this.back() }, 1500)
          }
        })
      }
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.paifa {
  background: #f2f2f2;
  padding: 16px;
  .cont {
    background: #ffffff;
    padding: 16px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 16px;
  }
  .row {
    padding-bottom: 16px;
  }
  .label {min-width: 100px;}
  .input {width: 216px;}
  .btnG {
    padding: 16px 0;
    display: flex;
    justify-content: flex-end;
  }
}
.more-shebei {
    overflow-x: scroll;
    display:flex;
    .button {
      margin-right: 16px;
    }
  }
</style>
