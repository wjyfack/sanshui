<template>
  <div class="zhilingshu">
    <div class="zhilingshuMg">
      <div class="search">
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">任务编号：</label>
            <el-input v-model="search.checkNo" class="input" placeholder="请输入任务编号"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">使用单位：</label>
            <el-input v-model="search.companyUseNewName" class="input" placeholder="请输入使用单位"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">使用登记证：</label>
            <el-input v-model="search.deviceCertNo" class="input" placeholder="请输入使用登记证"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">指令书编号：</label>
            <el-input v-model="search.commandNo" class="input" placeholder="请输入指令书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">所属镇街：</label>
            <el-select v-model="search.deviceAreaName4" placeholder="请选择" clearable>
              <el-option
                v-for="item in townSearchType"
                :key="item.value"
                :label="item.label"
                :value="item.name"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">移交书编号：</label>
            <el-input v-model="search.instructionNo" class="input" placeholder="请输入移交书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">回复书编号：</label>
            <el-input v-model="search.commandReplyNo" class="input" placeholder="请输入回复书编号"/>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="toSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
            <el-button @click="dialogExcelVisible = true">excel导出指令书</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="`镇街移交(${instrCount.instrStatus1})`" name="1"/>
          <el-tab-pane :label="`待移交(${instrCount.instrStatus2})`" name="2"/>
          <el-tab-pane :label="`审核移交(${instrCount.instrStatus4})`" name="4"/>
          <el-tab-pane :label="`批准移交(${instrCount.instrStatus5})`" name="5"/>
          <el-tab-pane :label="`执法三科待处理(${instrCount.instrStatus6})`" name="6"/>
          <el-tab-pane :label="`执法三科审核(${instrCount.instrStatus7})`" name="7"/>
          <el-tab-pane :label="`已完成(${instrCount.instrStatusEnd})`" name="8"/>
          <el-tab-pane :label="`全部(${instrCount.instrStatusAll})`" name="9"/>
          <!-- auths.sys_command_all -->
        </el-tabs>
        <el-table
          v-loading="loading"
          key="theOnlayOne"
          :data="instructionList"
          :row-class-name="tableRowClassName"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"/>
          <el-table-column
            v-if="activeName == '1' && auths.sys_command_town_remove"
            key="sys_command_town_remove"
            label="操作"
            width="350px">
            <template slot-scope="scope">
              <el-button
                :type="getOverTime(scope.row.commandChangedEndDate)"
                size="mini"
                @click="recitfyDialog(scope.row)"><span v-if="scope.row['commandChangeStatus'] == 0">未整改</span><span v-else>整改查看</span></el-button>
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row, 6)">移交</el-button>
              <el-button
                size="mini"
                @click="closedLoopDialog(scope.row)">闭环</el-button>
              <el-button
                size="mini"
                @click="reviewDialog(scope.row)">复查</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '2' && auths.sys_command_stay_remove"
            key="sys_command_stay_remove"
            label="操作"
            width="350px">
            <template slot-scope="scope">
              <el-button
                :type="getOverTime(scope.row.commandChangedEndDate)"
                size="mini"
                @click="recitfyDialog(scope.row)"><span v-if="scope.row['commandChangeStatus'] == 0">未整改</span><span v-else>整改查看</span></el-button>
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row)">移交</el-button>
              <el-button
                size="mini"
                @click="closedLoopDialog(scope.row)">闭环</el-button>
              <el-button
                size="mini"
                @click="reviewDialog(scope.row)">复查</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '4' && auths.sys_command_approval_remove"
            key="sys_command_approval_remove"
            label="操作"
            width="180px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row,2)">审核移交</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '5' && auths.sys_command__confirm_ratify"
            key="sys_command__confirm_ratify"
            label="操作"
            width="180px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row,7)">确认</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '6' && auths.sys_command_stay_deal"
            key="sys_command_stay_deal"
            label="操作"
            width="180px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row,3)">处理</el-button>
              <el-button
                size="mini"
                @click="backXZ(scope.row)">退回</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '7' && auths.sys_command_reply_audit"
            key="sys_command_reply_audit"
            label="操作"
            width="180px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row,4)">审核</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '8' && auths.sys_command_finish"
            key="sys_command_finish"
            label="操作"
            width="200px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="yijiaoDownload(scope.row)">下载</el-button>
              <el-button
                size="mini"
                @click="yijiaoDialog(scope.row,5)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="commandNo"
            width="180"
            label="指令书"/>
          <el-table-column
            prop="companyUseNewName"
            label="使用单位"
            width="250"/>
          <el-table-column
            prop="companyUseFullAddress"
            label="单位地址"
            width="350"/>
          <el-table-column
            prop="commandDeviceProblem"
            label="问题描述"
            width="750"/>
          <el-table-column
            v-if="activeName != '1' && activeName != '2'"
            key="commandTransferNo"
            prop="commandTransferNo"
            label="移交书编号"
            width="250"/>
          <!-- <el-table-column
            key="commandReplyNo"
            prop="commandReplyNo"
            label="回复书编号"/> -->
          <el-table-column
            :formatter="formatDate"
            prop="commandDate"
            label="指令书日期"
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
    <!-- 整改信息 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      title="整改信息查看">
      <el-form label-width="120px" class="dialog">
        <el-row>
          <el-form-item label="整改图片：" >
            <div class="" style="display:flex;">
              <ul class="el-upload-list el-upload-list--picture-card">
                <li v-for="(item, index) in recitfy.rectifyImg" :key="index" class="el-upload-list__item is-success">
                  <img :src="baseUrl+item" alt="" class="el-upload-list__item-thumbnail">
                  <i class="el-icon-close"/>
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="hasHandlePreview(baseUrl+item)">
                      <i class="el-icon-zoom-in"/>
                    </span>
                    <span class="el-upload-list__item-delete" @click="hasHandelDelete(index)">
                      <i class="el-icon-delete"/>
                    </span>
                  </span>
                </li>
              </ul>
              <el-upload
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
                :action="imgUrl"
                :headers="imgToken"
                class="avatar-uploader">
                <i class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </div>
            <el-dialog :visible.sync="dialogPreviewVisible" width="30%" append-to-body>
              <img :src="dialogImageUrl" width="100%" alt="">
            </el-dialog>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="整改备注：">
            <el-input v-model="recitfy.rectifyRemark" placeholder="企业编写文字说明（非必填）" class="textarea"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="审核动作：" required>
            <el-radio-group v-model="recitfy.rectifyStatus">
              <el-radio :label="'3'">通过</el-radio>
              <el-radio :label="'2'">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="审核描述：" required>
            <el-input v-model="recitfy.rectifyAuditInfo" type="textarea" placeholder="审核描述" class="textarea"/>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recitfyInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 指令书 -->
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <vue-preview :slides="slides" />
    </el-dialog>
    <!-- 移交 -->
    <el-dialog
      :visible.sync="dialogYiJiaoVisible"
      :before-close="handleClose"
      title="移交">
      <taskDetail :transfe="transfe"/>
      <statusRecord :status="transfe.taskCheckLogList"/>
      <comInfo :transfe="transfe"/>
      <transferInfo :transfe="transfe" @closed="closedYiJiao"/>
    </el-dialog>
    <!-- 审核移交 -->
    <el-dialog
      :visible.sync="dialogShenHeYiJiaoVisible"
      :before-close="handleClose"
      width="50%"
      title="审核移交">
      <taskDetail :transfe="transfe"/>
      <statusRecord :status="transfe.taskCheckLogList"/>
      <comInfo :transfe="transfe"/>
      <yijiaoInfo :transfe="transfe"/>
      <instrucInfo :transfe="transfe" @closed="closedYiJiao"/>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog
      :visible.sync="dialogChuLiVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <taskDetail :transfe="transfe"/>
      <statusRecord :status="transfe.taskCheckLogList"/>
      <comInfo :transfe="transfe"/>
      <yijiaoInfo :transfe="transfe"/>
      <replyLetterSub :transfe="transfe" @closed="closedYiJiao"/>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog
      :visible.sync="dialogShenHeVisible"
      :before-close="handleClose"
      width="50%"
      title="审核">
      <!-- 任务信息 -->
      <taskDetail :transfe="transfe"/>
      <statusRecord :status="transfe.taskCheckLogList"/>
      <!-- 企业信息 -->
      <comInfo :transfe="transfe"/>
      <!-- 移交信息 -->
      <yijiaoInfo :transfe="transfe"/>
      <!-- 回复书信息 -->
      <replyLetterInfo :transfe="transfe"/>
      <examineSub :transfe="transfe" :status="8" @closed="closedYiJiao"/>
    </el-dialog>
    <!-- 确认 -->
    <el-dialog
      :visible.sync="dialogSureVisible"
      :before-close="handleClose"
      width="50%">
      <taskDetail :transfe="transfe"/>
      <statusRecord :status="transfe.taskCheckLogList"/>
      <comInfo :transfe="transfe"/>
      <yijiaoInfo :transfe="transfe"/>
      <examineSub :transfe="transfe" :status="6" @closed="closedYiJiao"/>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      :visible.sync="dialogLookVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <taskDetail :transfe="transfe"/>
      <statusRecord :status="transfe.taskCheckLogList"/>
      <comInfo :transfe="transfe"/>
      <zhilingshuInfo :transfe="transfe"/>
      <yijiaoInfo :transfe="transfe"/>
      <replyLetterInfo :transfe="transfe"/>
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
import comInfo from './component/comInfo'
import instrucInfo from './component/instrucInfo'
import taskDetail from './component/taskDetail'
import transferInfo from './component/transferInfo'
import replyLetterInfo from './component/replyLetterInfo'
import yijiaoInfo from './component/yijiaoInfo'
import replyLetterSub from './component/replyLetterSub'
import examineSub from './component/examineSub'
import zhilingshuInfo from './component/zhilingshuInfo'
import statusRecord from '@/components/statusRecord/index'
import { fetchBeforeRectify, fetchRectify, fetchBeforeTransfe, fetchClosedLoop, fetchBeforeReview, fetchExcelTaskCommand, fetchbackCommand } from '@/api/instruction'
import { fetchIdRefiy } from '@/api/common'
import { refiyUrl, townSearchType, baseUrl } from '@/utils/config'
import authorization from '@/mixins/authorization'
import { fetchTaskDownload } from '@/api/common'
import { toViewer, beforeUpload } from '@/utils/common'
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
    examineSub
  },
  mixins: [authorization],
  data() {
    return {
      baseUrl: `${refiyUrl}/file/show/img/rectify/`,
      imgUrl: `${refiyUrl}/open/api/file/upload/rectify`,
      downloadUrl: `${baseUrl}/file/download/create/`,
      townSearchType,
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
        commandExecTaskStatus: '1' // 1 镇街待移交 12 区局待移交 7 审核移交 3 执法三科待处理 8执法三科审核 4 待确认  5:完成
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
      // yuanshi
      dialogShenHeVisible: false,
      dialogChuLiVisible: false,
      dialogShenHeYiJiaoVisible: false,
      dialogYulanVisible: false,
      dialogYiJiaoVisible: false,
      dialogSureVisible: false,
      dialogLookVisible: false,
      dialogVisible: false,
      dialogPreviewVisible: false,
      activeName: '1',
      transfe: {}, // 移交前查的数据
      radio2: '',
      value1: '', // 后期删除
      addrSel: '',
      list: [
      ],
      slides: [],
      multipleSelection: [],
      dialogExcelVisible: false,
      isExcelLoading: false,
      isExcel: 1,
      row: {}
    }
  },
  computed: {
    ...mapGetters([
      'instructionTotal',
      'instructionList',
      'instrCount'
      // 'instructionStatus'
    ])
  },
  watch: {
    activeName(newValue, oldValue) {
      /**
      * 1 镇街待移交 12 区局待移交 7 审核移交 3 执法三科待处理
       8执法三科审核 4 待确认  5:完成
       */
      let status = newValue
      if (status === '9') {
        status = ''
      }
      // switch (newValue) {
      //   case 'first':
      //     status = '1'
      //     break
      //   case 'second':
      //     status = '12'
      //     break
      //   case 'third':
      //     status = '7'
      //     break
      //   case 'fourth':
      //     status = '3'
      //     break
      //   case 'fifth':
      //     status = '8'
      //     break
      //   case 'sixth':
      //     status = '4'
      //     break
      //   case 'seventh':
      //     status = '5'
      //     break
      //   case 'eight':
      //     status = ''
      //     break
      // }
      console.log(status)
      this.$store.dispatch('changeStatus', status)
      this.search.commandExecTaskStatus = status
      this.fecthData()
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    backXZ(row) {
      const params = {
        id: row.id
      }
      this.$prompt('请输入退回原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning',
        inputPattern: /\w+|[\u4e00-\u9fa5]+/,
        inputErrorMessage: '不能为空'
      }).then(({ value }) => {
        params.rejectReason = value
        params.operateName = '指令书退回'
        // console.log(params)
        // return
        fetchbackCommand(params).then(res => {
          const {
            resultDesc
          } = res
          this.$message.success(resultDesc)
          this.fecthData()
        })
      })
    },
    toMakeExcel() {
      const param = this.search
      if (this.isExcel === 1) {
        if (this.multipleSelection.length === 0) {
          this.$message('请选择指令书')
          return
        }
        param.id = this.multipleSelection.map(item => {
          return item.id
        })
      }
      param.commandStatus = '2'
      this.isExcelLoading = true
      fetchExcelTaskCommand(param).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = objectUrl
        link.download = `${new Date().getTime()}指令书导出.xlsx`
        document.body.appendChild(link)
        link.click()
        this.isExcelLoading = false
        this.dialogExcelVisible = false
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      })
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
      const no = [commandName, commandName, commandName, commandNo, commandTransferNo, commandReplyNo].filter(item => {
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
        commandExecTaskStatus: commandExecTaskStatus // 1 镇街待移交 12 区局待移交 7 审核移交 3 执法三科待处理 8执法三科审核 4 待确认  5:完成
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
      this.row = row
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
    closedYiJiaoTo(event) {
      // console.log(event)
      this.dialogYiJiaoVisible = false
      // if (event === 'end') {
      //   this.yijiaoDialog(this.row)
      // }
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
        sourceSySign: 'sanshuiSafetyServer',
        operateName: '监察指令书审核'
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
        commandExecTaskStatus
      } = this.search
      const data = {
        checkNo, // 任务编号
        companyUseNewName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        commandReplyNo, // 回复书编号
        commandExecTaskStatus
      }
      data.pageSize = `${this.pageSize}`
      data.pageNum = `${this.pageNum}`
      data.orderType = '1'
      data.commandStatus = '2'
      // console.log(data)
      this.$store.dispatch('fetchInstructionList', data).then(() => {
        this.loading = false
        this.$store.dispatch('actionsIntrcCount', data)
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log(row.rejectReason)
      // console.log(this.activeName)
      if (row.rejectReason && (~~this.activeName === 1 || ~~this.activeName === 2)) {
        return 'warning-row'
      }
      return ''
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: #ef9999;
}
.el-table .warning-row:hover {
  background: #ef9999;
}
</style>
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
