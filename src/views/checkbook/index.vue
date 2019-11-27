<template>
  <div class="zhilingshu">
    <div class="zhilingshuMg">
      <div class="search">
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit-outline" @click="mutilEditDailog">编辑</el-button>
          <el-button v-if="activeName == '0,1'" type="primary" icon="el-icon-circle-close" @click="taskShenhe(1,scope.row)">审核</el-button>
          <el-button v-else type="primary" icon="el-icon-circle-close" @click="taskShenhe(2,scope.row)">反审核</el-button>
          <el-button v-if="activeName == '0,1'" type="danger" icon="el-icon-delete" @click="delTask">删除</el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="multiTaskDetail">详情</el-button>
          <el-button type="primary" icon="el-icon-download" @click="dialogExcelVisible = true">下载</el-button>
          <!-- <el-button type="primary" icon="el-icon-arrow-down">展开搜索</el-button> -->
        </el-button-group>
      </div>
      <div class="table">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="`待审核(${checkCount.checkStatus0+checkCount.checkStatus1})`" name="0,1"/>
          <el-tab-pane :label="`已审核(${checkCount.checkStatus2})`" name="2"/>
          <el-tab-pane :label="`全部(${checkCount.checkStatusAll})`" name="3"/>
        </el-tabs>
        <el-table
          v-loading="loading"
          :data="instructionList"
          border
          style="width: 100%"
          @row-dblclick="radirtaskDetail"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            v-if="activeName !== '3'"
            label="操作"
            width="300">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" icon="el-icon-edit-outline" @click="taskEdit(scope.row)">编辑</el-button>
                <el-button v-if="activeName == '0,1'" size="mini" type="primary" icon="el-icon-circle-close" @click="taskShenhe(1,scope.row)">审核</el-button>
                <el-button v-else size="mini" type="primary" icon="el-icon-circle-close" @click="taskShenhe(2,scope.row)">反审核</el-button>
                <el-button size="mini" type="success" icon="el-icon-search" @click="preview(scope.row)">预览</el-button>
              </el-button-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="commandNo"
            width="170"
            label="指令书"/>
          <el-table-column
            prop="commandAddDeptName"
            label="所属部门"
            width="150"/>
          <el-table-column
            prop="companyUseConfirmMan"
            label="单位联系人"
            width="100"/>
          <el-table-column
            prop="companyUseConfirmManPhone"
            label="单位联系电话"
            width="150"/>
          <el-table-column
            prop="companyUseNewName"
            label="使用单位"
            width="180"/>
          <el-table-column
            prop="companyUseFullAddress"
            label="单位地址"
            width="250"/>
          <el-table-column
            prop="commandDeviceProblem"
            label="问题描述"
            width="450"/>
          <!-- <el-table-column
            prop="commandTransferNo"
            label="移交书编号"/> -->
          <!-- <el-table-column
            key="commandReplyNo"
            prop="commandReplyNo"
            label="回复书编号"/> -->
          <el-table-column
            prop="commandDate"
            label="指令书日期"
            width="180"/>
          <el-table-column
            prop="commandChangedEndDate"
            label="整改截止日期"
            width="180"/>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          :total="instructionTotal"
          background
          layout="prev, pager, next, jumper"
          @current-change="pageCurrChange"
          @size-change="pageSizeChange"/>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <div>
        <editDialog v-if="dialogYulanVisible" :task.sync="editTask" @closed="dialogYulanVisible = false"/>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogBackVisible"
      :before-close="handleClose"
      :title="reason.title"
      width="30%">
      <span>
        <el-input v-model="reason.text" type="textarea" placeholder=""/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskSheheOpt">确定</el-button>
        <el-button @click="dialogBackVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 完成时详情 -->
    <el-dialog
      :visible.sync="dialogEndVisible"
      :before-close="handleClose"
      width="50%"
      title="">
      <taskDetail :transfe="editTask" />
      <comInfo :transfe="editTask"/>
      <statusRecord :status="editTask.taskCheckLogList"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogEndVisible = false">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogExcelVisible"
      :before-close="handleClose"
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
import { mapGetters } from 'vuex'
import comInfo from '@/components/comInfo/comInfo'
import instrucInfo from './component/instrucInfo'
import taskDetail from '@/components/taskDetail/taskDetail'
import transferInfo from './component/transferInfo'
import replyLetterInfo from './component/replyLetterInfo'
import yijiaoInfo from './component/yijiaoInfo'
import replyLetterSub from './component/replyLetterSub'
import examineSub from './component/examineSub'
import zhilingshuInfo from './component/zhilingshuInfo'
import statusRecord from '@/components/statusRecord/index'
import editDialog from '@/views/renwu/component/editDialog'
import { fetchBeforeRectify, fetchRectify, fetchBeforeTransfe, fetchClosedLoop, fetchBeforeReview, fetchTrialComm, fetchAuditComm, fetchDelComm } from '@/api/instruction'
import { fecthBeforeEdit } from '@/api/task'
import { fetchIdRefiy, fetchTaskDownload } from '@/api/common'
import { refiyUrl, townType, baseUrl } from '@/utils/config'
import authorization from '@/mixins/authorization'
import { toViewer, beforeUpload } from '@/utils/common'
import { opLoading } from '@/mixins/loading'
export default {
  components: {
    transferInfo,
    comInfo,
    instrucInfo,
    taskDetail,
    replyLetterInfo,
    yijiaoInfo,
    replyLetterSub,
    zhilingshuInfo,
    statusRecord,
    examineSub,
    editDialog
  },
  mixins: [opLoading, authorization],
  data() {
    return {
      baseUrl: `${refiyUrl}/file/show/img/rectify/`,
      imgUrl: `${refiyUrl}/open/api/file/upload/rectify`,
      downloadUrl: `${baseUrl}/file/download/create/`,
      printUrl: `${baseUrl}/file/show/img/create/`,
      townType,
      imgToken: '',
      loading: false,
      search: {
        checkNo: '', // 任务编号
        companyUseNewName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        deviceAreaName4: '', // 镇街
        instructionNo: '', // 移交书编号 (没)
        commandReplyNo: '', // 回复书编号
        commandExecTaskStatus: '', // 1 镇街待移交 12 区局待移交 7 批准移交 3 待处理 8回复审核 4 待确认  5:完成
        commandStatus: '0,1' // 0:审核退回 1:待审核 2:已审核 未审核传值：0，1 （app） web 必传 传值：2
      },
      pageSize: 10,
      pageNum: 1,
      dialogImageUrl: '',
      recitfy: { // 整改信息查看
        rectifyImg: [], // 图片
        rectifyAddImgs: [],
        rectifyAuditInfo: '', // 整改文字
        rectifyStatus: '3', // 审核动作
        rectifyRemark: '' // 审核描述
      },
      multipleSelection: [],
      reason: {},
      // yuanshi
      dialogBackVisible: false,
      // dialogShenHeVisible: false,
      // dialogChuLiVisible: false,
      // dialogShenHeYiJiaoVisible: false,
      dialogEndVisible: false,
      dialogYulanVisible: false,
      dialogYiJiaoVisible: false,
      dialogSureVisible: false,
      dialogLookVisible: false,
      dialogVisible: false,
      dialogPreviewVisible: false,
      activeName: '0,1',
      transfe: {}, // 移交前查的数据
      radio2: '',
      value1: '', // 后期删除
      addrSel: '',
      list: [
      ],
      slides: [],
      editTask: {},
      dialogExcelVisible: false,
      isExcelLoading: false,
      isExcel: 1
    }
  },
  computed: {
    ...mapGetters([
      'instructionTotal',
      'instructionList',
      'checkCount'
    ])
  },
  watch: {
    activeName(newValue, oldValue) {
      let status = newValue
      if (status === '3') {
        status = ''
      }
      this.search.commandStatus = status
      this.fecthData()
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    toMakeExcel() {
      let data = {}
      let url = `/excel/export/taskCommand/`
      if (this.isExcel === 1) { // 导出勾选的
        const multipleSelection = this.multipleSelection
        if (multipleSelection.length === 0) {
          this.$message('请勾选要导出的指令书')
          return ''
        } else {
          const arr = multipleSelection.map(item => {
            const model = {}
            model.commandNo = item.commandNo // .replace(/\[|\]/g, 'A')
            model.companyUseNewName = item.companyUseNewName
            model.companyUseFullAddress = item.companyUseFullAddress
            model.companyUseConfirmMan = item.companyUseConfirmMan
            model.companyUseConfirmManPhone = item.companyUseConfirmManPhone
            model.commandDeviceProblem = item.commandDeviceProblem
            model.commandDate = item.commandDate
            model.commandChangedEndDate = item.commandChangedEndDate
            model.commandStatus = this.search.commandStatus
            return model
          })
          data = arr
        }
        url = `${url}1`
      } else { // 全部
        // const arr = this.instructionList.map(item => {
        //   const model = {}
        //   model.commandNo = item.commandNo
        //   model.companyUseNewName = item.companyUseNewName
        //   model.companyUseFullAddress = item.companyUseFullAddress
        //   model.companyUseConfirmMan = item.companyUseConfirmMan
        //   model.companyUseConfirmManPhone = item.companyUseConfirmManPhone
        //   model.commandDeviceProblem = item.commandDeviceProblem
        //   model.commandDate = item.commandDate
        //   model.commandChangedEndDate = item.commandChangedEndDate
        //   model.commandStatus = this.search.commandStatus
        //   return model
        // })
        // data = arr
        data.commandStatus = this.search.commandStatus
        url = `${url}2`
      }
      this.isExcelLoading = true
      console.log(JSON.stringify(data))
      // return
      fetchTaskDownload({ url, data }).then(res => {
        this.isExcelLoading = false
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = objectUrl
        link.download = `${new Date().getTime()}监察指令书导出.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      }).then(() => {
        this.dialogExcelVisible = false
      })
    },
    multiTaskDetail() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请选择指令书',
          type: 'warning'
        })
        return ''
      }
      this.radirtaskDetail(multipleSelection[0])
    },
    /** 已完成查询 */
    radirtaskDetail(row) {
      this.opShowLoading()
      fecthBeforeEdit(row.taskCheckId).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          let taskPhotoList = ''
          let taskCommandPhotoList = ''
          if (data.taskPhotoList) {
            taskPhotoList = data.taskPhotoList
          }
          if (data.taskCommandPhotoList) {
            taskCommandPhotoList = data.taskCommandPhotoList
          }
          data.taskPhotoList = taskPhotoList
          data.taskCommandPhotoList = taskCommandPhotoList
          this.editTask = data
          this.dialogEndVisible = true
        } else {
          this.$message.error(res.resultDesc)
        }
      }).then(() => {
        this.onCloseLoading()
      })
    },
    /** 多选的编辑 */
    mutilEditDailog() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请选择指令书',
          type: 'warning'
        })
        return ''
      }
      this.taskEdit(multipleSelection[0])
    },
    /** 编辑 */
    taskEdit(row) {
      this.opShowLoading()
      fecthBeforeEdit(row.taskCheckId).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          this.editTask = data
          this.dialogYulanVisible = true
        } else {
          this.$message.error(res.resultDesc)
        }
      }).then(() => {
        this.onCloseLoading()
      })
    },
    delTask() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择指令书')
        return
      }
      this.$confirm('此操作将删除指令书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = this.multipleSelection[0].id
        const data = {
          id,
          checkStatus: '4',
          operateName: '删除监察指令书'
        }
        fetchDelComm(data).then(res => {
          if (res.resultCode === '0000000') {
            this.$message.success(res.resultDesc)
            this.fecthData()
          }
        })
      })
    },
    preview(row) {
      const { commandNo } = row
      const url = encodeURI(`${this.printUrl}（三水）质监特令${commandNo}.jpg`)
      toViewer(url)
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
    taskSheheOpt() {
      if (!this.reason.text) {
        this.$message.error('请输入描述')
        return
      }
      const { id, text } = this.reason
      const data = {
        id,
        commandAuditIntro1: text
      }
      if (this.reason.opt === 1) {
        // 审核
        data.commandStatus = '2'
        data.operateName = '监察指令书审核'
        fetchTrialComm(data).then(res => {
          if (res.resultCode === '0000000') {
            this.dialogBackVisible = false
            this.$message.success(res.resultDesc)
            this.fecthData()
          }
        })
      } else {
        // 反审核
        data.commandStatus = '0'
        data.operateName = '监察指令书反审核'
        fetchAuditComm(data).then(res => {
          if (res.resultCode === '0000000') {
            this.dialogBackVisible = false
            this.$message.success(res.resultDesc)
            this.fecthData()
          }
        })
      }
    },
    taskShenhe(opt, row = {}) {
      // let data = {}
      if (~~opt === 1) {
        this.reason.opt = 1
        this.reason.title = '请填写审核的理由'
      } else {
        this.reason.title = '请填写反审核的理由'
        this.reason.opt = 2
      }
      if (row.id) {
        this.dialogBackVisible = true
        this.reason.id = row.id
      } else {
        if (this.multipleSelection.length === 0) {
          this.$message.error('请选择指令书')
          return
        }
        this.dialogBackVisible = true
        this.reason.id = this.multipleSelection[0].id
      }
    },
    getOverTime(time) {
      const timeDate = new Date().getTime()
      if (time === null) {
        return ''
      }
      const timeDateEnd = new Date(time).getTime()
      if (timeDate > timeDateEnd) {
        return 'danger'
      } else {
        return ''
      }
    },
    beforeAvatarUpload(file) {
      beforeUpload(file)
    },
    yijiaoDownload(row) {
      // this.$message('模拟下载')
      const { commandTransferNo, commandNo, commandReplyNo } = row
      // console.log(row)
      // return ''
      const url = '/file/downloadPDFs/create/3'
      console.log(commandTransferNo, commandNo, commandReplyNo)
      this.$message.success('正在为你下载..')
      /**  指令书：  （三水）质监特令+指令书编号
       *   移交书：移交书编号
       *   回复书：回复书编号  三个用；隔开 不用加.pdf
      */
      const commandName = commandNo ? `（三水）质监特令${commandNo}` : null
      const no = [commandName, commandTransferNo, commandReplyNo].filter(item => {
        return item != null
      }).join(';')
      const data = {
        no
      }
      fetchTaskDownload({ url, data }).then(res => {
        const blob = new Blob([res], { type: 'application/pdf' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        const name = `${new Date().getTime()}指令+移交+回复.pdf`
        link.style.display = 'none'
        link.href = objectUrl
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      })
    },
    resetSearch() {
      const commandExecTaskStatus = this.search.commandExecTaskStatus
      this.search = {
        checkNo: '', // 任务编号
        companyUseNewName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        deviceAreaName4: '', // 镇街
        instructionNo: '', // 移交书编号 (没)
        commandReplyNo: '', // 回复书编号
        commandExecTaskStatus: commandExecTaskStatus // 1 镇街待移交 12 区局待移交 7 批准移交 3 待处理 8回复审核 4 待确认  5:完成
      }
      this.$message.success('重置成功')
      this.fecthData()
    },
    /** 整改start */
    hasHandelDelete(index) {
      const rectifyImg = this.recitfy.rectifyImg
      rectifyImg.splice(index, 1)
      this.recitfy.rectifyImg = rectifyImg
    },
    hasHandlePreview(url) {
      this.handlePictureCardPreview({ url })
    },
    handleSuccess(response, file, fileList) {
      // this.recitfy.rectifyAddImgs = fileList
      if (response.resultCode === '0000000') {
        const returnData = response.returnData
        this.recitfy.rectifyImg = [...this.recitfy.rectifyImg, returnData]
      } else {
        this.$message.error(response.resultDesc || '操作失败')
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.recitfy.rectifyAddImgs = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      // this.dialogPreviewVisible = true
      toViewer(this.dialogImageUrl)
    },
    /** 整改end */
    zSure() {
      this.dialogSureVisible = true
    },
    /** 复查 */
    reviewDialog(row) {
      // console.log(row)
      // 复查之前
      const {
        id
      } = row
      fetchBeforeReview({ commandId: id }).then(res => {
        if (res.resultCode === '0000000') {
          const {
            checkTypeId,
            checkIntro,
            checkResultEndDate,
            checkDeptId,
            checkDeptName,
            // list,
            checkNo
          } = res.returnData
          const info = {
            checkTypeId,
            checkIntro,
            checkResultEndDate,
            checkDeptId,
            checkDeptName,
            checkNo
          }
          this.$router.push({
            path: '/paifa',
            query: {
              info,
              arr: [res.returnData]
            }
          })
        }
      })
    },
    /** 闭环 */
    closedLoopDialog(row) {
      console.log(row)
      this.$confirm('此操作将闭环指令书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const info = {
          id: row.id,
          commandExecTaskStatus: '3',
          checkNo: row.checkNo,
          operateName: '指令书闭环'
        }
        fetchClosedLoop(info).then(res => {
          if (res.resultCode === '0000000') {
            this.$message(res.resultDesc)
            this.fecthData()
          }
        })
      }).catch(() => {})
    },
    /** 处理 */
    chuiliDialog(row) {
      console.log(row)
    },
    /** 查看 */
    zLook() {
      this.dialogLookVisible = true
    },
    /** 移交 */
    yijiaoDialog(row, opt = 1) { // opt 1移交， 2审核移交 3 处理 7 确认
      const data = {
        id: row.id,
        taskCheckId: row.taskCheckId
      }
      switch (opt) {
        case 1:
          data.isTrans = '1'
          break
        case 3:
        case 2:
          data.isReply = '1'
          break
      }
      fetchBeforeTransfe(data).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          this.transfe = data
          this.$store.dispatch('actionsExecTaskAddTime', data.commandExecTaskAddTime)
          switch (opt) {
            case 1:
              this.dialogYiJiaoVisible = true
              break
            case 2:
              this.dialogShenHeYiJiaoVisible = true
              break
            case 3:
              this.dialogChuLiVisible = true
              break
            case 4:
              this.dialogShenHeVisible = true
              break
            case 5:
              this.dialogLookVisible = true
              break
            case 6: // 镇街移交
              this.dialogYiJiaoVisible = true
              break
            case 7:
              this.dialogSureVisible = true
              break
          }
        } else {
          this.$message.error(res.resultDesc)
        }
      })
    },
    /** 关闭移交 */
    closedYiJiao() {
      this.dialogYiJiaoVisible = false
      this.dialogShenHeYiJiaoVisible = false
      this.dialogChuLiVisible = false
      this.dialogShenHeVisible = false
      this.dialogSureVisible = false
      this.dialogVisible = false
      this.fecthData()
    },
    /** 整改查看 */
    recitfyDialog(row) {
      fetchBeforeRectify(row.id).then(res => {
        let data = res.returnData
        // if (!data) {
        //   this.$message('没有数据')
        // }
        console.log(res)
        if (data === null) {
          data = {}
        }
        if (!data || !data.rectifyImg || data.rectifyImg === null) {
          data.rectifyImg = []
        } else {
          data.rectifyImg = data.rectifyImg.split('&').filter(item => item)
        }
        data.id = row.id
        this.recitfy = data
      }).then(() => {
        fetchIdRefiy().then(res => {
          if (res.resultCode === '0000000') {
            this.imgToken = { 'Access-Token': res.returnData }
            this.dialogVisible = true
          }
        })
      })
    },
    /** 整改信息 */
    recitfyInfo() {
      const {
        rectifyImg, // 图片
        rectifyAddImgs,
        id,
        rectifyRemark,
        rectifyStatus,
        rectifyAuditInfo
      } = this.recitfy
      if (!rectifyAuditInfo) {
        this.$message({ message: '请输入审核描述', type: 'error' })
        return ''
      }
      let imgs = ''
      // let imgUrl = ''
      let addImgUrl = []
      // if (rectifyImg.length !== 0) {
      //   imgUrl = rectifyImg.join(',')
      //   imgs = imgUrl
      // }
      // console.log(rectifyAddImgs)
      if (rectifyAddImgs && rectifyAddImgs.length !== 0) {
        addImgUrl = rectifyAddImgs.map(item => {
          return item.response.returnData
        })
      }
      imgs = [...rectifyImg, ...addImgUrl].join('&')
      const data = {
        sourceCommandId: id,
        rectifyStatus,
        rectifyRemark,
        rectifyImg: imgs,
        rectifyAuditInfo,
        sourceSySign: 'sanshuiSafetyServer'
      }
      fetchRectify(data).then(res => {
        if (res.resultCode === '0000000') {
          this.$message({
            message: res.resultDesc,
            type: 'success'
          })
          this.closedYiJiao()
        } else {
          this.$message({
            message: res.resultDesc,
            type: 'error'
          })
        }
      })
    },
    toSearch() {
      this.pageSize = 10
      this.pageNum = 1
      this.fecthData()
    },
    fecthData() { // 获取数据
      this.loading = true
      const {
        checkNo, // 任务编号
        companyUseNewName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        commandReplyNo, // 回复书编号
        commandExecTaskStatus,
        commandStatus
      } = this.search
      const data = {
        checkNo, // 任务编号
        companyUseNewName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        commandReplyNo, // 回复书编号
        commandExecTaskStatus,
        commandStatus
      }
      data.pageSize = `${this.pageSize}`
      data.pageNum = `${this.pageNum}`
      data.orderType = '1'
      // console.log(data)
      this.$store.dispatch('fetchInstructionList', data).then(() => {
        this.loading = false
        this.$store.dispatch('actionsCheckCount', data)
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
    isOk() {
      this.dialogYiJiaoVisible = false
      this.dialogVisible = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    handleClose(done) { // 弹窗关闭方法
      done()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zhilingshu {
  background: #f2f2f2;
  padding: 16px;
  font-size: 14px;
  .zhilingshuMg {
    border-radius: 8px;
    background: #ffffff;
    padding: 16px;
    .search {
      .label {
        display: inline-block;
        text-align: left;
        width: 130px;
      }
      .row {
        padding-bottom: 16px;
      }
      .input {max-width: 220px;}
    }
    .table {padding-top:16px;}
    .page {
      display: flex;
      justify-content: center;
      padding-top: 16px;
    }
  }
  .dialog {
    .row {
      padding: 16px 0;
      .label {display: inline-block; width: 100px;text-align: right;}
      .input {width: 220px;}
      .textarea {flex: 1;}
    }
  }
  .task-detail {
    position: relative;
    font-size: 14px;
    .red {
      color:#f56c6c;
    }
    .bianhao {
      display: flex;
      padding: 10px 5px;
      margin-bottom: 10px;
      background: #d3d3d3;
      label {font-weight: 300;color:#333;}
    }
    .detail {
      display: flex;
      flex-direction: column;
      .item {
        color: #666;
        display: flex;
        padding-bottom: 10px;
        .name {
          display: inline-block;
          min-width: 130px;
          text-align: right;
        }
        .info {
          min-width: 150px;
          color:#999999;
        }
      }
    }
    .btn-group {
      position: absolute;
      right: 5px;
      top: 60px;
    }
    .table {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      background: #999999;
      td, th {
        padding:10px 0;
        background: #ffffff;
      }
    }
    .row {
      padding: 10px 0;
      .red {color: red;}
      .label {display: inline-block; width: 110px;text-align: right;margin-right: 5px;}
      .input {width: 220px;}
      .textarea {flex: 1;}
      .mes {
        color: #333;
      }
    }
    .avatar-uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
  }
  .table {
    width: 100%;
    padding-left: 1px;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 146px;
  height: 146px;
  box-sizing: border-box;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
</style>
