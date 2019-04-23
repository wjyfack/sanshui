<template>
  <div class="renwu">
    <div class="renwuMg">
      <el-tabs v-model="activeName" @tab-click="renwuTabClick">
        <el-tab-pane label="待派发" name="1"/>
        <el-tab-pane label="待接收" name="2"/>
        <el-tab-pane label="待处理" name="3"/>
        <el-tab-pane label="处理中" name="4"/>
        <el-tab-pane label="待审核" name="5"/>
        <el-tab-pane label="已完成" name="6"/>
        <el-tab-pane label="全部" name="7"/>
        <el-tab-pane label="回收站" name="8"/>
      </el-tabs>
      <div class="search">
        <el-row class="row">
          <el-col :span="8">
            <label for="">任务编号：</label>
            <el-input v-model="search.checkNo" class="input" placeholder="请输入任务编号"/>
          </el-col>
          <el-col :span="8">
            <label for="">使用单位：</label>
            <el-input v-model="search.companyUseName" class="input" placeholder="请输入使用单位"/>
          </el-col>
          <el-col :span="8">
            <label for="">使用登记证：</label>
            <el-input v-model="search.deviceCertNo" class="input" placeholder="请输入使用登记证"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="">指令书编号：</label>
            <el-input v-model="search.commandNo" class="input" placeholder="请输入指令书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="">所属镇街：</label>
            <el-select v-model="search.cont" placeholder="请选择">
              <el-option
                v-for="item in townType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
          <el-col v-if="activeName == '1'" :span="8">
            <el-button type="primary" @click="BatchWholesale">批量批发</el-button>
            <el-button type="danger" @click="closedLoop">闭环</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '2'" :span="8">
            <el-button type="primary" @click="taskOperation(2)">批量接收</el-button>
            <el-button type="primary">导出Excel</el-button>
            <el-button type="danger" @click="taskOperation(1)">删除</el-button>
          </el-col>
          <el-col v-else-if="activeName == '3'" :span="8">
            <el-button type="primary" @click="dialogAddTask= true">新增</el-button>
            <el-button type="danger" @click="closedLoop">闭环</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '4'" :span="8">
            <el-button type="primary" @click="dialogAddTask= true">新增</el-button>
            <el-button type="danger" @click="taskOperation(1)">删除</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == '5'" :span="8">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger" @click="closedLoop">闭环</el-button>
            <el-button type="primary">导出Excel</el-button>
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
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            prop="checkNo"
            label="任务编号"
            min-width="150"/>
          <el-table-column
            prop="companyUseName"
            label="使用单位"
            min-width="150"/>
          <el-table-column
            prop="deviceUseAddress"
            label="使用地址"
            min-width="150"/>
          <el-table-column
            prop="deviceAreaName4"
            label="所属镇街"
            width="100"/>

          <el-table-column
            v-if="activeStatus1"
            prop="checkIntro"
            label="任务要求"
            min-width="150"/>
          <el-table-column
            v-if="activeStatus1"
            prop="taskCreateTime"
            label="任务生成日期"
            min-width="150"/>

          <el-table-column
            v-if="activeStatus2"
            label="任务类型"
            min-width="150">
            <template>
              <span v-if="activeName == 4" >处理中</span>
              <span v-else-if="activeName == 5">处理中</span>
              <span v-else-if="activeName == 6">处理中</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeStatus2"
            prop="checkResulTreatment"
            label="任务处理方式"
            min-width="150"/>

          <el-table-column v-if="activeName == 'fifth'" label="审核状态">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                size="mini"
                type="primary">审核</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="280">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                click="handleDelete(scope.$index, scope.row)"
                size="mini"
                @click="taskDetail(scope.row)">详情</el-button>
              <el-button
                v-if="activeName == '1'"
                size="mini"
                type="primary"
                @click="onlyWholesale(scope.row)">派发任务</el-button>
              <el-button
                v-else-if="activeName == '2'"
                size="mini"
                type="primary"
                @click="taskDeleteAGet(scope.row, 1)">接收任务</el-button>
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
                @click="dialogEditVisible = true">编辑</el-button>
              <el-button
                v-else-if="activeName == '5'"
                size="mini"
                type="primary">查看</el-button>
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
      width="60%"
      title="">
      <div class="more-shebei">
        <el-button
          v-for="(item, index) in deviceDetailArr"
          :key="index"
          type="primary"
          @click="getdeviceDetail(item)">设备{{ index+1 }}</el-button>
      </div>
      <deviceDetail :loading="dialogInfoLoading" :info="taskdeviceDetail" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInfoVisible = false">确认</el-button>
        <el-button @click="dialogInfoVisible = false">关闭</el-button>
      </span>
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
      width="60%"
      class="dialogForm"
      title="">
      <el-form ref="chuliForm" label-width="130px" >
        <div class="title">单位信息</div>
        <el-row class="row">
          <el-form-item label="单位名称" prop="name">
            <el-input placeholder="请输入单位名称"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="使用单位地址" prop="name">
            <el-input placeholder="请输入使用单位地址"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="单位法人" prop="name">
              <el-input placeholder="请输入单位法人"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位联系人" required>
              <el-input placeholder="请输入单位联系人"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="单位联系方式" required>
              <el-input placeholder="请输入单位联系方式"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人职务">
              <el-input placeholder="请输入联系人职务"/>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title"><span>关联设备</span> <el-button icon="el-icon-plus" size="mini" type="primary" >添加设备</el-button></div>
        <el-row class="row">
          <el-col :span="8">
            <el-form-item label="使用登记证" >
              <el-input placeholder="请输入使用登记证"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出厂编号" >
              <el-input placeholder="请输入出厂编号"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="违反模板" >
              <el-select v-model="value" placeholder="请选择违反条例">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">关联设备数量</div>
        <el-row class="row">
          <el-col :span="8">
            <el-form-item label="电梯" >
              <el-input placeholder="请输入电梯"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="叉车" >
              <el-input placeholder="请输入叉车"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起重机" >
              <el-input placeholder="请输入起重机"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <el-form-item label="锅炉" >
              <el-input placeholder="请输入锅炉"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="压力容器" >
              <el-input placeholder="请输入压力容器"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="压力管道" >
              <el-input placeholder="请输入压力管道"/>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">检查记录表信息</div>
        <el-row class="row">
          <el-col :span="12">
            <el-form-item label="检查类别" >
              <el-select v-model="value" placeholder="请选择检查类别">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位类别" >
              <el-select v-model="value" placeholder="请选择单位类别">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <el-form-item label="检查日期" >
              <el-date-picker
                type="daterange"
                range-separator="~"
                start-placeholder="年/月/日"
                end-placeholder="年/月/日"
                value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-form-item label="检查问题" >
            <el-input type="textarea" placeholder="请输入检查问题"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="处理措施" >
            <el-radio-group v-model="radio2">
              <el-radio :label="1">下达指令书</el-radio>
              <el-radio :label="2">直接封查</el-radio>
              <el-radio :label="3">实施扣押</el-radio>
              <el-radio :label="4">其他</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="检查意见" >
            <el-input type="textarea" placeholder="请输入检查意见"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="是否填写指令书" >
            <el-checkbox id="isZhiLingShu" @change="onCheckbox"/>
          </el-form-item>
        </el-row>
      </el-form>
      <div v-show="isShow" class="zhilingshu-info">
        <el-form ref="form" label-width="130px">
          <el-row class="row">
            <el-form-item label="指令书编号">
              <el-input class="input" placeholder="请输入指令书编号"/>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="指令书流水号">
              <el-input class="input" placeholder="请输入指令书流水号"/>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="指令书模板">
              <el-select v-model="value" placeholder="请选择指令书模板">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="设备描述">
              <el-input type="textarea" placeholder="请输入设备描述"/>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="隐患描述">
              <el-select v-model="value5" multiple placeholder="请选择" style="flex:1">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="违反条例">
              <div class="cont">
                <el-select v-model="value5" multiple placeholder="请选择" class="select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
                <el-input type="textarea" class="area"/>
              </div>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="处罚依据条例">
              <div class="cont">
                <el-select v-model="value5" multiple placeholder="请选择" class="select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
                <el-input type="textarea" class="area"/>
              </div>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-form-item label="整改措施">
              <div class="cont">
                <el-select v-model="value5" multiple placeholder="请选择" class="select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
                <el-input type="textarea" class="area"/>
              </div>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-col :span="12">
              <el-form-item label="整改截止日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="指令书日期">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row">
            <el-form-item label="注明情况">
              <el-input type="textarea" placeholder="" style="width:100%"/>
            </el-form-item>
          </el-row>
          <el-row class="row">
            <el-col :span="12">
              <el-form-item label="使用单位确认人">
                <el-input class="input" placeholder="使用单位确认人"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式">
                <el-input class="input" placeholder="联系方式"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRenwushu(0)">检查记录预览</el-button>
        <el-button v-if="!isShow" type="warning">检查记录打印</el-button>
        <el-button v-if="isShow" @click="showRenwushu(1)">指令书预览</el-button>
        <el-button type="primary" @click="dialogEditVisible = false">确定</el-button>
        <el-button @click="dialogEditVisible = false">取消</el-button>
      </span>
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
      title="处理方式"
      width="250">
      <span>
        <el-select v-model="handle" placeholder="请选择处理方式" class="select">
          <el-option
            v-for="(item, index) in handleType"
            :key="item.value"
            :label="item.label"
            :value="index"/>
        </el-select>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="taskHandle">确定</el-button>
        <el-button @click="dialogChuliVisible = false">取消</el-button>
      </span>
    </el-dialog>

    <!-- 图片预览 -->
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <vue-preview :slides="slides" />
    </el-dialog>
    <!-- 生成任务 -->
    <el-dialog
      :visible.sync="dialogAddTask"
      :before-close="handleClose"
      title="生成任务">
      <addTaskDialog :visible="dialogAddTask" @closed="closed"/>
    </el-dialog>
  </div>
</template>

<script>
import deviceDetail from '@/components/deviceDetail'
import searchDialog from './component/searchDialog'
import addTaskDialog from './component/addTaskDialog'
import { taskType, status, townType, handleType } from '@/utils/config'
import { mapGetters } from 'vuex'
import { fetchBeforeDistribute, fetchtaskDetail, fetchtaskOpt } from '@/api/task'
import { fetchDeviceDetail } from '@/api/shebei'
import img from '@/assets/renwushu1.jpg'
import imgs from '@/assets/renwushu2.jpg'
export default {
  components: {
    deviceDetail,
    searchDialog,
    addTaskDialog
  },
  data() {
    return {
      townType,
      taskType,
      handleType,
      status,
      // 设备详情
      taskdeviceDetail: {},
      loading: false,
      dialogVisible: false,
      dialogInfoLoading: false,
      dialogBackVisible: false,
      dialogAddTask: false,
      search: { // 搜索
        checkNo: '', // 任务编号
        companyUseName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        taskStatus: '', // 任务状态
        dateChecked: [], // 年检日期
        checkTypeId: '1', // 状态
        checkStatus: '', // 检查任务状态
        checkAddDeptName: '', // 任务派发部门
        isRecovery: '0', // 回搜站 1
        cont: '' // 所属镇街
      },
      pageSize: 10,
      pageNum: 1,
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
      addrSel: '',
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      value: '',
      radio2: '',
      value5: '',
      list: [
        { src: img, msrc: img, w: 600, h: 800 },
        { src: imgs, msrc: imgs, w: 600, h: 800 }
      ],
      slides: []
    }
  },
  computed: {
    ...mapGetters([
      'companyList',
      'taskTotal',
      'taskList'
    ])
  },
  mounted() {
    this.fecthData()
    if (this.companyList.length === 0) {
      this.$store.dispatch('actionsMohuCom')
    }
  },
  methods: {
    /** 处理  下拉框选择 1 无需处理 3 下达指令书*/
    taskHandleDailog(row) {
      this.dialogChuliVisible = true
      this.taskRow = row
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
      this.tofetchtaskOpt(data)
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
          return { id: item.id, checkStatus: '6', closedLoopReason: reason }
        })
      } else { // 2
        data = [this.taskRow].map(item => {
          return { id: item.id, checkStatus: '1', rollbackReason: reason }
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
            return { id: item.id, isRecovery: '1' }
          })
          break
        case 3:
          data = multipleSelection.map(item => {
            return { id: item.id, checkStatus: '3' }
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
            return { id: item.id, isRecovery: '1' }
          })
          break
        case 2:
          data = [row].map(item => {
            return { id: item.id, checkStatus: '3' }
          })
          break
      }
      this.tofetchtaskOpt(data)
    },
    tofetchtaskOpt(data) {
      fetchtaskOpt(data).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fecthData() // 更新
        }
      })
    },
    /** 设备详情 */
    taskDetail(row) {
      console.log(row.checkNo)
      fetchtaskDetail('CK312019041145').then(data => {
        if (data.resultCode === '0000000') {
          const arr = data.returnData
          console.log(arr)
          if (arr.length === 0) {
            this.$message('没有该任务的设备详情')
          } else {
            this.deviceDetailArr = arr
            // 获取第一个设备信息
            this.getdeviceDetail(arr[0])
          }
        }
      })
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
    /** BatchWholesale  批量批发*/
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
      this.onlyWholesale({ id: '17,18,19,20' })
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
        checkAddDeptName // 任务派发部门
      } = this.search
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
        deviceAreaName4: cont,
        updateTime: dateChecked[0],
        commandAddDate: dateChecked[1],
        orderType: ''
      }
      this.$store.dispatch('fetchTaskList', data).then(() => {
        this.loading = false
      })
    },
    taskSearch() {
      this.fecthData()
      // this.$message('搜索成功')
    },
    searchReset() {
      this.search = { // 搜索
        checkNo: '', // 任务编号
        companyUseName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        cont: '' // 所属镇街
      }
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
        companyUseName, // 使用单位
        commandNo, // 指令书编号
        deviceCertNo, // 使用登记证
        dateChecked, // 年检日期
        checkTypeId, // 状态
        checkAddDeptName // 任务派发部门
      } = data.info
      this.search.checkNo = checkNo
      this.search.taskStatus = taskStatus
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
        this.search.checkTypeId = activeName
      } else { // 回收站
        this.search.checkTypeId = ''
        this.search.isRecovery = '1'
      }
      this.fecthData()
    },
    closed() {
      this.dialogAddTask = false
    },
    /**
     * 下面没啥用
     *  */
    toRouter() { this.$router.push({ path: '/paifa' }) },
    onCheckbox(event) {
      this.isShow = event
    },
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
  label {font-size: 14px;}
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
    display: flex;
    padding: 16px 30px;
    justify-content: space-around;
  }
  .page {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }
  .dialogForm {
    .title {
      display:flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;
      color:#333;
      background: #DBDBDB;
      padding: 0 10px;
      margin-bottom: 10px;
    }
    .row {}
    .input {width: 100%}
    .label {
      min-width: 120px;
      display: inline-block;
      .red {color: red}
    }
    .cont {
      flex: 1;
      display: flex;
      flex-direction: column;
      .select {width: 100%;}
      .area {width:100%;}
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
}
</style>
