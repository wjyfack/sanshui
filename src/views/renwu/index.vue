<template>
  <div class="renwu">
    <div class="renwuMg">
      <el-tabs v-model="activeName" @tab-click="renwuTabClick">
        <el-tab-pane v-if="auths.sys_task_stay_payout" :label="`待派发(${taskCount.taskStatus1})`" name="1"/>
        <el-tab-pane v-if="auths.sys_task_stay_receive" :label="`待接收(${taskCount.taskStatus2})`" name="2"/>
        <el-tab-pane v-if="auths.sys_task_stay_deal" :label="`待处理(${taskCount.taskStatus3})`" name="3"/>
        <el-tab-pane v-if="auths.sys_task_dealing" :label="`处理中(${taskCount.taskStatus4})`" name="4"/>
        <el-tab-pane v-if="auths.sys_task_stay_audit" :label="`待审核(${taskCount.taskStatus5})`" name="5"/>
        <el-tab-pane v-if="auths.sys_task_finish" :label="`已完成(${taskCount.taskStatus6})`" name="6"/>
        <el-tab-pane v-if="auths.sys_task_all" :label="`全部(${taskCount.taskStatusAll})`" name="7"/>
        <el-tab-pane v-if="auths.sys_task_recycle_space" label="回收站" name="8"/>
      </el-tabs>
      <div class="search">
        <el-row class="row">
          <el-col :span="8">
            <label class="label" for="">任务编号：</label>
            <el-input v-model="search.checkNo" class="input" placeholder="请输入任务编号"/>
          </el-col>
          <el-col :span="8">
            <label class="label" for="">使用单位：</label>
            <el-input v-model="search.companyUseName" class="input" placeholder="请输入使用单位"/>
          </el-col>
          <el-col :span="8">
            <label class="label" for="">使用登记证：</label>
            <el-input v-model="search.deviceCertNo" class="input" placeholder="请输入使用登记证"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label class="label" for="">指令书编号：</label>
            <el-input v-model="search.commandNo" class="input" placeholder="请输入指令书编号"/>
          </el-col>
          <el-col :span="8">
            <label class="label" for="">所属镇街：</label>
            <el-select v-model="search.cont" clearable placeholder="请选择">
              <el-option
                v-for="item in townSearchType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
          <el-col v-if="activeName == '1'" :span="8">
            <el-button type="primary" @click="BatchWholesale">批量派发</el-button>
            <el-button type="danger" @click="closedLoop">闭环</el-button>
            <el-button type="danger" @click="taskOperation(1)">删除</el-button>
            <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
            <el-button type="primary" @click="excelIn">Excel导入</el-button>
            <input id="files" type="file" >
          </el-col>
          <el-col v-else-if="activeName == '2'" :span="8">
            <el-button type="primary" @click="taskOperation(2)">批量接收</el-button>
            <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '3'" :span="8">
            <!-- <el-button type="primary" @click="dialogAddTask= true">新增</el-button> -->
            <el-button type="danger" @click="closedLoop">闭环</el-button>
            <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '4'" :span="8">
            <el-button type="primary" @click="dialogAddTask= true">新增</el-button>
            <el-button type="danger" @click="taskOperation(1)">删除</el-button>
            <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '5'" :span="8">
            <el-button type="primary" @click="mutilEditDailog">编辑</el-button>
            <el-button type="danger" @click="closedLoop">闭环</el-button>
            <el-button type="primary" @click="dialogExcelVisible = true">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '6'" :span="8">
            <el-button type="primary" @click="downloadOpt(1)">检查记录表下载</el-button>
            <el-button type="primary" @click="downloadOpt(2)">指令书下载</el-button>
            <el-button type="primary" @click="downloadOpt(3)">指+检下载</el-button>
            <el-button type="primary" @click="dialogDownloadPicVisible = true">图片下载</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="row">
          <el-button type="primary" @click="taskSearch">查 询</el-button>
          <el-button @click="searchReset">重 置</el-button>
          <el-button @click="dialogVisible = true">更多查询</el-button>
        </el-row>
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="taskList"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"/>
          <el-table-column
            prop="checkNo"
            sortable
            label="任务编号"/>
          <el-table-column
            prop="companyUseName"
            label="使用单位"/>
          <el-table-column
            prop="deviceUseAddress"
            label="使用地址"/>
          <el-table-column
            prop="deviceAreaName4"
            label="所属镇街"/>

          <el-table-column
            v-if="activeStatus1"
            key="checkIntro"
            prop="checkIntro"
            label="任务要求"/>
          <el-table-column
            v-if="activeStatus1"
            key="taskCreateTime"
            prop="taskCreateTime"
            label="任务生成日期"/>

          <el-table-column
            v-if="activeStatus2"
            key="taskStatus"
            label="任务类型">
            <template slot-scope="scope">
              <!-- scope.row && scope.row.taskStatus ?taskType[~~scope.row.taskStatus].label: '' -->
              <span>{{ getTaskStatus(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeStatus2"
            key="checkResulTreatment"
            prop="checkResulTreatment"
            label="任务处理方式"/>
          <el-table-column
            v-if="activeName != 6 && activeName != 7"
            key="optionss"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="taskDetail(scope.row)">详情</el-button>
              <el-button
                v-if="activeName == '1'"
                size="mini"
                type="primary"
                @click="onlyWholesale(scope.row)">派发</el-button>
              <el-button
                v-else-if="activeName == '2'"
                size="mini"
                type="primary"
                @click="taskDeleteAGet(scope.row, 2)">接收</el-button>
              <el-button
                v-if="activeName == '2'"
                size="mini"
                type="danger"
                @click="backTaskOperation(scope.row)">退回</el-button>
              <el-button
                v-else-if="activeName == '3'"
                size="mini"
                type="primary"
                @click="taskHandleDailog(scope.row)">处理</el-button>
              <el-button
                v-else-if="activeName == '4'"
                size="mini"
                type="primary"
                @click="taskEdit(scope.row)">编辑</el-button>
              <el-button
                v-else-if="activeName == '5'"
                size="mini"
                type="primary"
                @click="taskLook(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeName == '6' || activeName == '7'"
            key="optionS"
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
      </div>
      <div class="page">
        <el-pagination
          :total="taskTotal"
          background
          layout="sizes, prev, pager, next, jumper"
          @current-change="pageCurrChange"
          @size-change="pageSizeChange"/>
      </div>
    </div>
    <!-- 详情 -->
    <el-dialog
      :visible.sync="dialogInfoVisible"
      :before-close="handleClose"
      width="50%"
      title="">
      <div class="more-shebei">
        <el-button
          v-for="(item) in deviceDetailArr"
          :key="item.id"
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
    <!-- 更多搜索 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="">
      <searchDialog :visible="dialogVisible" @closed="closing"/>
    </el-dialog>
    <!-- 处理中编辑 -->
    <el-dialog
      :visible.sync="dialogEditVisible"
      :before-close="handleClose"
      width="50%"
      class="dialogForm"
      title="">
      <editDialog v-if="dialogEditVisible" :task.sync="editTask" @closed="closed"/>
    </el-dialog>
    <!-- 退回 -->
    <el-dialog
      :visible.sync="dialogBackVisible"
      :before-close="handleClose"
      :title="loopTittle"
      width="30%">
      <span>
        <el-input v-model="reason" placeholder="请输入原因"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskBackAndBi">确定</el-button>
        <el-button @click="dialogBackVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog
      :visible.sync="dialogChuliVisible"
      :before-close="handleClose"
      title="处理方式">
      <addTaskDialog :infos="editTask" :visible="dialogAddTask" @closed="closed"/>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      :visible.sync="dialogLookVisible"
      :before-close="handleClose"
      width="50%"
      class="dialogForm"
      title="">
      <lookDialog :task="editTask" @closed="closed"/>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <vue-preview :slides="slides" />
    </el-dialog>
    <!-- 新增任务 -->
    <el-dialog
      :visible.sync="dialogAddTask"
      :before-close="handleClose"
      title="新增任务">
      <addTaskDialog :isadd="true" @closed="closed"/>
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
      <div class="imgLists" >
        <div class="imgLists-item">
          <span>检查记录：</span>
          <img-loadc v-if="dialogEndVisible" :list="editTask.taskPhotoList" :imgurl="imgUrlRe" :imgshow="baseImgUrlRe" :limit="1" @sendimg="sendImgLoad"/>
        </div>
        <div v-if="dialogEndVisible && editTask.command && editTask.command.id" class="imgLists-item">
          <span>指令书：</span>
          <img-loadi :imgurl="imgUrlCom" :list="editTask.taskCommandPhotoList" :imgshow="baseImgUrlCom" :limit="1" @sendimg="sendImgLoad2"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确认</el-button>
        <el-button @click="dialogEndVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- excel -->
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
    <!-- excel -->
    <el-dialog
      :visible.sync="dialogDownloadVisible"
      :before-close="handleClose"
      width="30%"
      title="提示">
      <span>
        <el-radio-group v-model="isDownload">
          <el-radio :label="1">勾选项导出</el-radio>
          <el-radio :label="2">全部导出</el-radio>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDownloadVisible = false">取 消</el-button>
        <el-button :loading="isDownloading" type="primary" @click="toMakeDownload">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogDownloadPicVisible"
      :before-close="handleClose"
      width="30%"
      title="提示">
      <span>
        <el-form>
          <el-form-item>
            <el-radio-group v-model="isDownloadPic">
              <el-radio :label="1">勾选项导出</el-radio>
              <el-radio :label="2">全部导出</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-checkbox-group v-model="isDownloadType">
            <el-checkbox :label="1">指令书图片</el-checkbox>
            <el-checkbox :label="2">检查记录表图片</el-checkbox>
            <el-checkbox :label="3">整改图片</el-checkbox>
          </el-checkbox-group>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDownloadPicVisible = false">取 消</el-button>
        <el-button :loading="isDownloadingPic" type="primary" @click="toMakeDownloadPic">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import deviceDetail from '@/components/deviceDetail'
import searchDialog from './component/searchDialog'
import addTaskDialog from './component/addTaskDialog'
import lookDialog from './component/lookDialog'
import editDialog from './component/editDialog'
import statusRecord from '@/components/statusRecord/index'
import taskDetail from '@/components/taskDetail/taskDetail'
import comInfo from '@/components/comInfo/comInfo'
import { taskType, status, townSearchType, handleType, baseUrl } from '@/utils/config'
import { mapGetters } from 'vuex'
import { fetchBeforeDistribute, fetchtaskDetail, fetchtaskOpt, fecthBeforeEdit, fectLookTask, fecthResultPhotoList, fetchExcelTask, fetchImportExcel, fetchTaskPic } from '@/api/task'
import { fetchDeviceDetail } from '@/api/shebei'
import { opLoading } from '@/mixins/loading'
import authorization from '@/mixins/authorization'
import { fetchTaskDownload } from '@/api/common'
import { toViewer } from '@/utils/common'
import imgLoadc from '@/components/imgLoad/index'
import imgLoadi from '@/components/imgLoad/index'
export default {
  components: {
    deviceDetail,
    searchDialog,
    addTaskDialog,
    lookDialog,
    editDialog,
    statusRecord,
    taskDetail,
    comInfo,
    imgLoadc,
    imgLoadi
  },
  mixins: [opLoading, authorization],
  data() {
    return {
      isDownloadPic: 1,
      isDownloadType: [1],
      isDownloadingPic: false,
      dialogDownloadPicVisible: false,
      isExcelLoading: false,
      isDownloading: false,
      dialogDownloadVisible: false,
      isDownload: 1,
      optDownload: 1,
      baseImgUrlRe: `${baseUrl}/file/show/CheckRecord/`,
      imgUrlRe: `${baseUrl}/file/upload/CheckRecord`,
      baseImgUrlCom: `${baseUrl}/file/show/TaskCommand/`,
      imgUrlCom: `${baseUrl}/file/upload/TaskCommand`,
      downloadUrl: `${baseUrl}/file/download/create/`,
      rectifyAddImgs: [], // 上传的图片
      isExcel: 1,
      townSearchType,
      taskType,
      handleType,
      status,
      isCompent: false,
      // 设备详情
      taskdeviceDetail: {},
      dialogExcelVisible: false,
      dialogPreviewVisible: false,
      loading: false,
      dialogVisible: false,
      dialogInfoLoading: false,
      dialogBackVisible: false,
      dialogAddTask: false,
      dialogLookVisible: false,
      dialogEndVisible: false,
      dialogShowVisible: false,
      search: { // 搜索
        checkNo: '', // 任务编号
        companyUseName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        taskStatus: '', // 任务状态
        dateChecked: [], // 年检日期
        checkTypeId: '', // 状态
        checkStatus: '1', // 检查任务状态
        checkAddDeptName: '', // 任务派发部门
        isRecovery: '0', // 回搜站 1
        cont: '' // 所属镇街
      },
      pageSize: 10,
      pageNum: 1,
      commandPhotoList: [], // 图片
      dialogImageUrl: '',
      handle: '', // 处理方式
      statusChecked: '',
      taskTypeChecked: '',
      isShow: false,
      dialogEditVisible: false,
      dialogDetailVisible: false,
      dialogYulanVisible: false,
      dialogChuliVisible: false,
      dialogInfoVisible: false,
      activeName: '1',
      activeStatus1: true,
      activeStatus2: false,
      activeDialogName: 'first',
      multipleSelection: [],
      deviceDetailArr: [],
      taskRow: {},
      reason: '',
      taskOpt: 1, // 闭环
      loopTittle: '',
      editTask: {}, // 编辑的内容
      addrSel: '',
      options: [],
      value: '',
      radio2: '',
      value5: '',
      list: [
      ],
      slides: [],
      inStucListString: '',
      recordListString: ''
    }
  },
  computed: {
    ...mapGetters([
      'companyList',
      'taskTotal',
      'taskList',
      'taskCount'
    ])
  },
  mounted() {
    this.fecthData()
    // if (this.companyList.length === 0) {
    //   this.$store.dispatch('actionsMohuCom')
    // }
  },
  methods: {
    toMakeDownloadPic() {
      // fetchTaskPic
      let data = {}
      if (this.isDownload === 1) {
        // 勾选
        const multipleSelection = this.multipleSelection
        if (multipleSelection.length === 0) {
          this.$message.warning('请勾选任务')
          return ''
        }
        data = {
          id: multipleSelection.map(item => item.id).join(',')
        }

        // console.log(data)
      } else {
        // 全部
        const {
          checkNo, // 任务编号
          taskStatus, // 任务状态
          taskStatusName,
          companyUseName, // 使用单位
          commandNo, // 指令书编号
          deviceCertNo, // 使用登记证
          dateChecked, // 年检日期
          checkTypeId, // 状态
          checkAddDeptName, // 任务派发部门
          checkStatus, // 检查任务状态
          isRecovery, // 回搜站 1
          cont // 所属镇街 deviceAreaName4
        } = this.search
        let dateCheckeds = []
        if (!dateChecked) {
          dateCheckeds = []
        } else {
          dateCheckeds = dateChecked
        }
        const [nameValue] = townSearchType.filter(item => {
          return item.value === cont
        })
        data = {
          checkNo, // 任务编号
          taskStatus, // 任务状态
          taskStatusName,
          companyUseName, // 使用单位
          commandNo, // 指令书编号
          deviceCertNo, // 使用登记证
          updateTime: dateCheckeds[0] ? dateCheckeds[0] : '',
          commandAddDate: dateCheckeds[1] ? dateCheckeds[1] : '',
          checkTypeId, // 状态
          checkAddDeptName, // 任务派发部门
          checkStatus, // 检查任务状态
          isRecovery, // 回搜站 1
          // orderType: '1', // 升序
          deviceAreaName4: nameValue ? nameValue.name : '' // 所属镇街 deviceAreaName4
        }
      }
      const isDownloadType = this.isDownloadType
      if (isDownloadType.some(item => item === 1)) { // 指令书
        data.taskCommandPhotoList = '1'
      }
      if (isDownloadType.some(item => item === 2)) { // 检查记录表
        data.taskPhotoList = '1'
      }
      if (isDownloadType.some(item => item === 3)) { // 整改图片
        data.rectifyImg = '1'
      }
      this.isDownloadingPic = true
      fetchTaskPic(data).then(res => {
        const blob = new Blob([res], { type: 'application/pdf' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        let name = ''
        link.style.display = 'none'
        link.href = objectUrl
        name = `${new Date().getTime()}图片.pdf`
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      }).then(() => {
        this.dialogDownloadVisible = false
        this.isDownloadingPic = false
      })
    },
    sendImgLoad(event) {
      // console.log(event)
      this.recordListString = event
    },
    sendImgLoad2(event) {
      // console.log(event)
      this.inStucListString = event
    },
    excelIn() {
      const file = document.getElementById('files')
      const ev = new MouseEvent('click')
      file.dispatchEvent(ev)
      // console.log(file, ev)
      file.onchange = (e) => {
        // console.log(e.currentTarget.files)
        this.toLoadExcel(e.currentTarget.files)
      }
    },
    toLoadExcel(files) {
      const file = files[0]
      const lastName = file.name.split('.')
      if (lastName[lastName.length - 1] === 'xlsx' || lastName[lastName.length - 1] === 'xls') {
        console.log(lastName, file)
        const formData = new FormData()
        formData.append('file', file)
        fetchImportExcel(formData, (e) => {
          console.log(e)
        }).then(res => {
          if (res.resultCode === '0000000') {
            this.$message.success(res.resultDesc)
            this.fecthData()
          } else {
            this.$message.error(res.resultDesc)
          }
        })
      } else {
        this.$message.error('请选择xlsx或xls文件')
      }
    },
    downloadOpt(opt) {
      this.optDownload = opt
      this.dialogDownloadVisible = true
    },
    toMakeDownload() {
      let data = {}
      let url = '/file/downloadPDFs/create/'
      let imgType = 1
      if (this.isDownload === 1) {
        // 勾选
        const multipleSelection = this.multipleSelection
        if (multipleSelection.length === 0) {
          this.$message.warning('请勾选任务')
          return ''
        }
        data = {}
        let no = ''
        console.log(multipleSelection)
        switch (this.optDownload) { // 1 检查记录表 2 指令书 3 指令+检查
          case 1:
            url = `${url}${imgType}`
            no = multipleSelection.map(item => { // 传任务编号用，隔开
              return item.checkNo
            }).join(',')
            data.no = no
            break
          case 2:
            imgType = 2
            url = `${url}${imgType}`
            no = multipleSelection.map(item => { // 传指令书编号，用，隔开
              return item.commandNo
            }).join(',')
            data.no = no
            break
          case 3:
            url = `/file/downloadCmPDF/create`
            data.id = multipleSelection.map(item => { // 传任务编号用，隔开
              return item.id
            }).join(',')
            // data.commandNos = multipleSelection.map(item => { // 传指令书编号，用，隔开
            //   return item.commandNo
            // }).join(',')
            break
        }
        // console.log(data)
      } else {
        // 全部
        const {
          checkNo, // 任务编号
          taskStatus, // 任务状态
          taskStatusName,
          companyUseName, // 使用单位
          commandNo, // 指令书编号
          deviceCertNo, // 使用登记证
          dateChecked, // 年检日期
          checkTypeId, // 状态
          checkAddDeptName, // 任务派发部门
          checkStatus, // 检查任务状态
          isRecovery, // 回搜站 1
          cont // 所属镇街 deviceAreaName4
        } = this.search
        let dateCheckeds = []
        if (!dateChecked) {
          dateCheckeds = []
        } else {
          dateCheckeds = dateChecked
        }
        const [nameValue] = townSearchType.filter(item => {
          return item.value === cont
        })
        data = {
          checkNo, // 任务编号
          taskStatus, // 任务状态
          taskStatusName,
          companyUseName, // 使用单位
          commandNo, // 指令书编号
          deviceCertNo, // 使用登记证
          updateTime: dateCheckeds[0] ? dateCheckeds[0] : '',
          commandAddDate: dateCheckeds[1] ? dateCheckeds[1] : '',
          checkTypeId, // 状态
          checkAddDeptName, // 任务派发部门
          checkStatus, // 检查任务状态
          isRecovery, // 回搜站 1
          // orderType: '1', // 升序
          deviceAreaName4: nameValue ? nameValue.name : '' // 所属镇街 deviceAreaName4
        }
        switch (this.optDownload) { // 1 检查记录表 2 指令书 3 指令+检查
          case 1:
            data.no = ''
            url = `${url}${imgType}`
            break
          case 2:
            data.no = ''
            imgType = 2
            url = `${url}${imgType}`
            break
          case 3:
            data.id = ''
            // data.checkNos = ''
            // data.commandNos = ''
            url = `/file/downloadCmPDF/create`
            break
        }
      }
      console.log(data)
      this.isDownloading = true
      fetchTaskDownload({ url, data }).then(res => {
        const blob = new Blob([res], { type: 'application/pdf' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        let name = ''
        link.style.display = 'none'
        link.href = objectUrl
        switch (this.optDownload) { // 1 检查记录表 2 指令书 3 指令+检查
          case 1:
            name = `${new Date().getTime()}检查记录表.pdf`
            break
          case 2:
            name = `${new Date().getTime()}指令书.pdf`
            break
          case 3:
            name = `${new Date().getTime()}指令+检查.pdf`
            break
        }
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      }).then(() => {
        this.dialogDownloadVisible = false
        this.isDownloading = false
      })
      // this.dialogDownloadVisible = false
    },
    toDownload(item) {
      // console.log(item)
      // const link = document.createElement('a')
      // // link.style.display = 'none'

      // const el = document.createEvent('MouseEvents')
      // el.initMouseEvent('click', false, false) // 初始化事件对象
      // link.href = item.url
      // link.download = item.name
      // link.dispatchevent(el)
      var a = document.createElement('a')
      var e = document.createEvent('MouseEvents') // 创建鼠标事件对象
      e.initEvent('click', false, false) // 初始化事件对象
      a.href = item.url // 设置下载地址
      a.download = item.name // 设置下载文件名
      a.dispatchEvent(e)
    },
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
        const { // 搜索
          checkNo, // 任务编号
          companyUseName, // 使用单位
          deviceCertNo, // 使用登记证
          commandNo, // 指令书编号
          cont, // 所属镇街
          taskStatus, // 任务状态
          dateChecked, // 年检日期
          checkTypeId, // 状态
          isRecovery, // 回收站
          checkStatus, // 检查任务状态
          checkAddDeptName, // 任务派发部门
          taskStatusName
        } = this.search
        const [nameValue] = townSearchType.filter(item => {
          return item.value === cont
        })
        /**
        页大小	pageSize
        第几页	pageNum
        任务编号	checkNo
        指令书编号	commandNo
        使用单位	companyUseName
        所属镇街	deviceAreaName4
        使用登记证	deviceCertNo
        任务状态	taskStatus
        状态	checkTypeId
        任务派发部门	checkAddDeptName
        任务日期1	updateTime
        任务日期2	commandAddDate
        检查任务状态	checkStatus
        回收站	isRecovery
        排序	orderType
        任务状态2级 taskStatusName
        */
        data = {
          taskStatusName,
          isRecovery,
          checkTypeId,
          checkAddDeptName,
          companyUseName,
          taskStatus,
          commandNo,
          checkStatus,
          checkNo,
          deviceCertNo,
          deviceAreaName4: nameValue ? nameValue.name : '',
          updateTime: dateChecked[0] ? dateChecked[0] : '',
          commandAddDate: dateChecked[1] ? dateChecked[1] : '',
          orderType: '1'
        }
      }
      this.isExcelLoading = true
      fetchExcelTask(data).then(res => {
        this.isExcelLoading = false
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = objectUrl
        link.download = `${new Date().getTime()}任务导出.xls`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      }).then(() => {
        this.dialogExcelVisible = false
      })
    },
    sure() {
      if (~~this.activeName === 6) {
        // 上传图片
        const {
          id,
          checkNo
        } = this.editTask
        // console.log(this.commandPhotoList, this.rectifyAddImgs)
        // const rectifyAddImgs = this.rectifyAddImgs.map(item => {
        //   return item.response.returnData
        // })
        // const checkResultPhotoList = [...this.commandPhotoList, ...rectifyAddImgs].join(',')
        const data = {
          id,
          checkNo,
          // checkResultPhotoList,
          taskCommandPhotoList: this.recordListString,
          taskPhotoList: this.inStucListString,
          operateName: '上传签名图片'
        }

        // console.log(data)
        // return ''
        fecthResultPhotoList(data).then(res => {
          if (res.resultCode === '0000000') {
            this.$message.success(res.resultDesc)
            this.dialogEndVisible = false
            this.rectifyAddImgs = []
          } else {
            this.$message.error(res.resultDesc)
          }
        })
      } else {
        this.dialogEndVisible = false
      }
    },
    hasHandelDelete(index) {
      this.commandPhotoList.splice(index, 1)
      console.log(this.commandPhotoList, index)
    },
    hasHandlePreview(url) {
      this.handlePictureCardPreview({ url })
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      const returnData = response.returnData
      this.commandPhotoList = [...this.commandPhotoList, returnData]
      // this.rectifyAddImgs = fileList
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.rectifyAddImgs = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      // this.dialogPreviewVisible = true
      toViewer(this.dialogImageUrl)
    },
    /** 多选的编辑 */
    mutilEditDailog() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请选择任务',
          type: 'warning'
        })
        return ''
      }
      this.taskEdit(multipleSelection[0])
    },
    /** 图片查看 */
    seeCommandList(url) {
      this.dialogShowVisible = true
      this.dialogImageUrl = url
    },
    /** 已完成查询 */
    radirtaskDetail(row) {
      this.opShowLoading()
      fecthBeforeEdit(row.id).then(res => {
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
          let commandPhotoList = []
          if (data.checkResultPhotoList !== null) {
            commandPhotoList = data.checkResultPhotoList.split(',')
          }
          // if (data.command && data.command.commandProblemPhotoList) {
          //   commandPhotoList = data.command.commandProblemPhotoList.split(',')
          // commandPhotoList = list.map(item => {
          //   return {
          //     src: `${this.baseImgUrl}${item}`,
          //     msrc: `${this.baseImgUrl}${item}`,
          //     w: 500,
          //     h: 1000
          //   }
          // })
          // }
          // console.log(commandPhotoList)
          this.commandPhotoList = commandPhotoList // 现场图片
        } else {
          this.$message.error(res.resultDesc)
        }
      }).then(() => {
        this.isCompent = true
        this.onCloseLoading()
      })
    },
    getTaskStatus(row) {
      return row && row.taskStatus ? taskType[~~row.taskStatus].label : ''
    },
    /** 编辑 */
    taskEdit(row) {
      this.opShowLoading()
      fecthBeforeEdit(row.id).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          this.editTask = data
          this.dialogEditVisible = true
        } else {
          this.$message.error(res.resultDesc)
        }
      }).then(() => {
        this.onCloseLoading()
      })
    },
    /** 查看 */
    taskLook(row) {
      const { id } = row
      let { commandId } = row
      if (!commandId) { commandId = '' }
      const data = { id, commandId }
      this.opShowLoading()
      fectLookTask(data).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          this.editTask = data
          this.dialogLookVisible = true
        } else {
          this.$message.error(res.resultDesc)
        }
        this.onCloseLoading()
      })
    },
    /** 处理  */
    taskHandleDailog(row) {
      fecthBeforeEdit(row.id).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          // console.log(data)
          this.editTask = data
          this.dialogChuliVisible = true
        } else {
          this.$message.error(res.resultDesc)
        }
      })
    },
    taskHandle() {
      if (this.handle === '') {
        this.$message('请选择处理方式')
        return ''
      }
      const { value, label } = handleType[~~this.handle]
      console.log(value, label, this.taskRow)
      const data = [this.taskRow].map(item => {
        return { id: item.id, checkResulTreatmentId: value, checkResulTreatment: label, checkStatus: '4' }
      })
      this.tofetchtaskOpt(data).then(() => {
        this.dialogChuliVisible = false
      })
    },
    /** 闭环， 1*/
    closedLoop() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请选择任务',
          type: 'warning'
        })
        return ''
      }
      this.taskOpt = 1
      this.loopTittle = '闭环原因'
      this.dialogBackVisible = true
    },
    /**  退回， 2*/
    backTaskOperation(row) {
      this.dialogBackVisible = true
      this.taskRow = row
      this.taskOpt = 2
      this.loopTittle = '确认要对选中任务退回并填写退回原因'
    },
    taskBackAndBi() {
      const reason = this.reason // 原因
      if (!reason) {
        this.$message('请输入原因')
        return ''
      }
      let data = []
      if (this.taskOpt === 1) {
        const multipleSelection = this.multipleSelection
        data = multipleSelection.map(item => {
          return { id: item.id, checkStatus: '6', closedLoopReason: reason, operateName: '闭环任务', checkNo: item.checkNo }
        })
      } else { // 2
        data = [this.taskRow].map(item => {
          return { id: item.id, checkStatus: '1', rollbackReason: reason, operateName: '退回任务', checkNo: item.checkNo }
        })
      }

      // console.log(data)
      this.dialogBackVisible = false
      this.tofetchtaskOpt(data)
    },
    /** 批量 删除，接收，  1,2,3,4,5*/
    taskOperation(opt) {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请选择任务',
          type: 'warning'
        })
        return ''
      }
      let data = []
      switch (opt) {
        case 1:
          data = multipleSelection.map(item => {
            return { id: item.id, isRecovery: '1', operateName: '删除任务', checkNo: item.checkNo }
          })
          break
        case 2:
        case 3:
          data = multipleSelection.map(item => {
            return { id: item.id, checkStatus: '3', operateName: '接收任务', checkNo: item.checkNo }
          })
          break
      }
      this.tofetchtaskOpt(data)
    },
    /** 单个  删除，接收，*/
    taskDeleteAGet(row, opt) {
      let data = []
      switch (opt) {
        case 1:
          data = [row].map(item => {
            return { id: item.id, isRecovery: '1', checkNo: item.checkNo, operateName: '删除任务' }
          })
          break
        case 2:
          data = [row].map(item => {
            return { id: item.id, checkStatus: '3', operateName: '接收任务', checkNo: item.checkNo }
          })
          break
      }
      // console.log(data, row)
      // return ''
      this.tofetchtaskOpt(data)
    },
    tofetchtaskOpt(data) {
      return new Promise((resolve, reject) => {
        fetchtaskOpt(data).then(response => {
          const data = response
          if (data.resultCode === '0000000') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.fecthData() // 更新
            resolve()
          }
        })
      })
    },
    /** 设备详情 */
    taskDetail(row) {
      console.log(row.checkNo)
      fetchtaskDetail(row.checkNo).then(data => {
        if (data.resultCode === '0000000') {
          const arr = data.returnData
          console.log(arr)
          if (arr.length === 0) {
            this.$message('没有该任务的设备详情')
          } else {
            this.deviceDetailArr = arr.map(item => {
              return {
                id: item.id,
                deviceCertNo: item.deviceCertNo,
                deviceProduceNo: item.deviceProduceNo
              }
            })
            // 获取第一个设备信息
            this.getdeviceDetail(arr[0].id)
          }
        } else {
          this.$message.error(data.resultDesc)
        }
      })
    },
    /** 任务详情 */
    getdeviceDetail(id) {
      fetchDeviceDetail(id).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.taskdeviceDetail = data.returnData
          this.dialogInfoVisible = true
        } else {
          this.$message.error(data.resultDesc)
        }
      }).finally(() => {
        this.dialogInfoLoading = false
      })
    },
    /** BatchWholesale  批量派发*/
    BatchWholesale() {
      const multipleSelection = this.multipleSelection
      if (multipleSelection.length === 0) {
        this.$message({
          message: '请选择任务',
          type: 'warning'
        })
        return ''
      }
      const tasks = multipleSelection.map(item => {
        return item.id
      })
      console.log(tasks.join(','))
      const row = { id: tasks.join(',') }
      this.onlyWholesale(row)
    },
    onlyWholesale(row) {
      fetchBeforeDistribute(`${row.id}`).then(data => {
        if (data.resultCode === '0000000') {
          const arr = data.returnData
          // console.log(arr)
          this.$router.push({
            path: '/paifa',
            query: {
              taskTotal: this.taskTotal,
              arr
            }
          })
        } else {
          this.$message.error(data.resultDesc)
        }
      })
    },
    /** 数据获取 */
    fecthData() {
      this.loading = true
      const { // 搜索
        checkNo, // 任务编号
        companyUseName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        cont, // 所属镇街
        taskStatus, // 任务状态
        dateChecked, // 年检日期
        checkTypeId, // 状态
        isRecovery, // 回收站
        checkStatus, // 检查任务状态
        taskStatusName,
        checkAddDeptName // 任务派发部门
      } = this.search
      const [nameValue] = townSearchType.filter(item => {
        return item.value === cont
      })
      /**
      页大小	pageSize
      第几页	pageNum
      任务编号	checkNo
      指令书编号	commandNo
      使用单位	companyUseName
      所属镇街	deviceAreaName4
      使用登记证	deviceCertNo
      任务状态	taskStatus
      状态	checkTypeId
      任务派发部门	checkAddDeptName
      任务日期1	updateTime
      任务日期2	commandAddDate
      检查任务状态	checkStatus
      回收站	isRecovery
      排序	orderType
      任务状态2级 taskStatusName
      */
      const data = {
        pageSize: `${this.pageSize}`,
        pageNum: `${this.pageNum}`,
        isRecovery,
        checkTypeId,
        checkAddDeptName,
        companyUseName,
        taskStatus,
        commandNo,
        checkStatus,
        checkNo,
        deviceCertNo,
        taskStatusName,
        deviceAreaName4: nameValue ? nameValue.name : '',
        updateTime: dateChecked ? dateChecked[0] ? dateChecked[0] : '' : '',
        commandAddDate: dateChecked ? dateChecked[1] ? dateChecked[1] : '' : '',
        orderType: '1'
      }
      // console.log(JSON.stringify(data))
      this.$store.dispatch('fetchTaskList', data).then(() => {
        this.loading = false
        this.$store.dispatch('actionsTaskCount')
      })
    },
    taskSearch() {
      this.fecthData()
      // this.$message('搜索成功')
    },
    searchReset() {
      this.search.checkNo = '' // 任务编号
      this.search.companyUseName = '' // 使用单位
      this.search.deviceCertNo = '' // 使用登记证
      this.search.commandNo = '' // 指令书编号
      this.search.cont = '' // 所属镇街
      this.$message('重置成功')
    },
    pageSizeChange(event) {
      this.pageSize = event
      this.fecthData()
    },
    pageCurrChange(event) {
      this.pageNum = event
      this.fecthData()
    },
    closing(data) {
      console.log(data)
      if (data.visible) {
        return ''
      }
      const {
        checkNo, // 任务编号
        taskStatus, // 任务状态
        taskStatusName,
        companyUseName, // 使用单位
        commandNo, // 指令书编号
        deviceCertNo, // 使用登记证
        dateChecked, // 年检日期
        checkTypeId, // 状态
        checkAddDeptName // 任务派发部门
      } = data.info
      this.search.checkNo = checkNo
      this.search.taskStatus = taskStatus
      this.search.taskStatusName = taskStatusName
      this.search.companyUseName = companyUseName
      this.search.commandNo = commandNo
      this.search.deviceCertNo = deviceCertNo
      this.search.dateChecked = dateChecked
      this.search.checkTypeId = checkTypeId
      this.search.checkAddDeptName = checkAddDeptName
      this.dialogVisible = false
      this.fecthData()
    },
    renwuTabClick(tab) {
      console.log(this.activeName)
      let activeName = this.activeName
      if (activeName < 4) {
        this.activeStatus1 = true
        this.activeStatus2 = false
      } else if (activeName >= 4 && activeName <= 6) {
        this.activeStatus1 = false
        this.activeStatus2 = true
      }
      if (~~activeName !== 8) {
        if (~~activeName === 7) {
          activeName = ''
        }
        this.search.isRecovery = '0'
        this.search.checkStatus = activeName
      } else { // 回收站
        this.search.checkStatus = ''
        this.search.isRecovery = '1'
      }
      this.pageSize = `10`
      this.pageNum = '1'
      this.fecthData()
    },
    closed() {
      this.dialogAddTask = false
      this.dialogChuliVisible = false
      this.dialogEditVisible = false
      this.dialogLookVisible = false
      this.fecthData()
    },
    /**
     * 下面没啥用
     *  */
    toRouter() { this.$router.push({ path: '/paifa' }) },

    showRenwushu(index) {
      this.slides = [this.list[index]]
      this.dialogYulanVisible = true
    },
    handleClose(done) { done() },
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.renwu {
  background: #f2f2f2;
  font-size: 14px;
  padding: 16px;
  .label {
    display: inline-block;
    width: 130px;
    text-align: left;
    font-size: 14px;
  }
  .renwuMg {
    border-radius: 8px;
    background: #ffffff;
    padding: 16px;
    .search {
      .row {
        padding-bottom: 16px;
      }
      .input {max-width: 220px;}
    }
  }
  .more-shebei {
    overflow-x: scroll;
    display:flex;
    .button {
      margin-right: 16px;
    }
  }
  .page {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }
  .imgLists {
    padding-top: 15px;
    display: flex;
    .imgLists-item {
      flex: 1;
      display: flex;
    }
    .imglist {
      display: flex;
      .imgitem {
        width: 200px;
        height: 200px;
        margin-right: 15px;
      }
    }
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
.table {
  width: 100%;
  padding-left: 1px;
}
#files {
  filter:alpha(opacity=0);opacity:0;width: 0;height: 0;
}
</style>
