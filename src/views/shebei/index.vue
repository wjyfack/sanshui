<template>
  <div class="shebei">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div class="search">
          <label for="" class="label">使用单位：</label>
          <el-input v-model="search.useUnit" class="input" placeholder="系统自动导入" />
          <label for="" class="label">设备种类：</label>
          <equement-cascader
            :equipment="equipmentAllType"
            @cascader="onUseEqueChange"/>
          <!-- <el-cascader
            v-model="search.useEque"
            :options="equipmentAllType"
            :change-on-select="true"
            class="select"
            @active-item-change="onUseEqueChange"/> -->
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-button type="primary" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
          <el-button @click="() => {dialogVisible = true;search.useEque=[]}">更多查询</el-button>
        </div>
        <div class="searchs">
          <label for="" class="label">使用登记证：</label>
          <el-input v-model="search.userReg" class="input" placeholder="系统自动导入" />
        </div>
      </el-row>
    </div>
    <div class="shebeiTable">
      <div class="btn-group">
        <el-button icon="el-icon-plus" type="primary" @click="() => {dialogAddVisible = true;infoTitle = '新增'}">新增</el-button>
        <el-button @click="makeTask">生成任务</el-button>
        <el-button @click="dialogExcelVisible = true">导出Excel</el-button>
      </div>
      <div class="notice"><span>已选择</span><span class="col">{{ multipleSelection.length }}</span><span>项   服务调用总计：{{ deviceTotal }} <el-button type="text" @click="clearing">清空</el-button></span></div>
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="deviceList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="tableDetal(scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="tableEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceCertNo"
          label="使用登记证"
          min-width="150"/>
        <el-table-column
          prop="deviceUseName"
          label="使用单位"
          min-width="150"/>
        <el-table-column
          prop="deviceUseAddress"
          label="使用单位地址"
          min-width="150"/>
        <el-table-column
          prop="deviceStatusName"
          label="状态"
          width="100"/>
        <el-table-column
          prop="deviceProduceNo"
          label="设备出厂编号"
          min-width="150"/>
        <el-table-column
          prop="deviceNextYearTestDate"
          label="下次年检日期"
          min-width="150"/>
        <el-table-column
          prop="areaName"
          label="所在镇街"
          min-width="150"/>
      </el-table>
      <div class="page">
        <el-pagination
          :total="deviceTotal"
          background
          layout="sizes, prev, pager, next, jumper"
          @current-change="pageCurrChange"
          @size-change="pageSizeChange"/>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
      title="">
      <div class="dialogForm">
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label">使用登记证：</label>
            <el-input v-model="search.userReg" class="input" placeholder="请输入使用登记证"/>
          </el-col>
          <el-col :span="12">
            <label for="" class="label">状态：</label>
            <el-select v-model="search.status" placeholder="请选择">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label">使用单位：</label>
            <el-input v-model="search.useUnit" class="input" placeholder="请输入使用单位"/>
          </el-col>
          <el-col :span="12" style="display:flex;">
            <label for="" class="label">设备种类：</label>
            <!-- <el-cascader
              v-model="search.useEque"
              :options="equipmentAllType"
              class="select"/> -->
            <equement-cascader
              :equipment="equipmentAllType"
              @cascader="onUseEqueChange"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">出厂编号：</label><el-input v-model="search.facNum" class="input" placeholder="请输入出厂编号"/></el-col>
          <el-col :span="12"><label for="" class="label">维保单位：</label><el-input v-model="search.maintUnit" class="input" placeholder="请输入维保单位"/></el-col>
        </el-row>
        <el-row class="row">
          <!-- <el-col :span="12">
            <label for="" class="label">设备检查状态：</label>
            <el-select v-model="search.equiStatus" placeholder="请选择">
              <el-option
                v-for="item in checkStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col> -->
          <el-col :span="12">
            <label for="" class="label">是否超期：</label>
            <el-select v-model="search.isOverdue" placeholder="请选择">
              <el-option
                v-for="item in overdue"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <label for="" class="label">年检日期：</label>
            <el-date-picker
              v-model="search.inspecDate"
              type="daterange"
              range-separator="~"
              start-placeholder="年/月/日"
              end-placeholder="年/月/日"
              value-format="yyyy-MM-dd"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <label for="" class="label">设备地址选择：</label>
          <el-cascader
            ref="addrCascRefs"
            v-model="search.addrCasc"
            :options="addrCasc"/>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="moreSearchQuery">查询</el-button>
        <el-button @click="searchReset">重置</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      :visible.sync="dialogInfoVisible"
      :before-close="handleClose"
      width="50%"
      title="">
      <deviceDetail :loading="dialogInfoLoading" :info="deviceDetail" />

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInfoVisible = false">确认</el-button>
        <el-button @click="dialogInfoVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      :visible.sync="dialogAddVisible"
      :before-close="handleClose"
      :title="infoTitle"
      width="60%">
      <div class="addDialog dialogForm">
        <el-form ref="addForm" :model="info" :rules="infoRules" label-position="right" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备类型" prop="useEque">
                <el-cascader
                  ref="useEque"
                  v-model="info.useEque"
                  :options="equipmentAllType"
                  class="select"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-select v-model="info.status" placeholder="请选择">
                  <el-option
                    v-for="item in status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备编号" prop="devNum">
                <el-input v-model="info.devNum" class="input" placeholder="请输入设备编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备名称" prop="devName">
                <el-input v-model="info.devName" class="input" placeholder="请输入设备名称"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备型号" prop="devUnit">
                <el-input v-model="info.devUnit" class="input" placeholder="请输入设备型号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备注册号" prop="devReg">
                <el-input v-model="info.devReg" class="input" placeholder="请输入设备注册号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="使用证编号" prop="useCert">
                <el-input v-model="info.useCert" class="input" placeholder="请输入使用证编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备出厂编号" prop="factNum">
                <el-input v-model="info.factNum" class="input" placeholder="请输入设备出厂编号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="设备系统编号">
                <el-input v-model="info.DeviceIndexesID" class="input" placeholder="请输入设备系统编号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="设备安装地址" prop="installAddr">
              <el-cascader
                ref="deviceInstallArea"
                v-model="info.installAddr"
                :options="addrCasc"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="详细地址" prop="detailAddr">
              <el-input v-model="info.detailAddr" class="input" placeholder="请输入详细地址"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="经纬度">
              <el-input v-model="info.Longitude" class="input" style="max-width:100px" placeholder="经度坐标"/>
              <span>/</span>
              <el-input v-model="info.latitude" class="input" style="max-width:100px" placeholder="维度坐标"/>
              <el-button icon="el-icon-edit" type="primary" size="small">选择</el-button>
              <el-checkbox v-model="info.keyMonitor" style="margin-left: 30px;">重点监控设备</el-checkbox>
            </el-form-item>
          </el-row>
          <el-row >
            <el-form-item label="使用单位名称" prop="useUnitName">
              <el-autocomplete
                v-model="info.useUnitName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入使用单位名称"
                @select="handleMoHuSelect"
              />
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="使用单位联系人">
                <el-input v-model="info.concat" class="input" placeholder="请输入使用单位联系人"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用单位电话">
                <el-input v-model="info.telephone" class="input" placeholder="请输入使用单位电话"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="使用单位地址">
              <el-input v-model="info.unitAddr" placeholder="请输入使用单位地址"/>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="设备详情">
              <el-input v-model="info.devDetail" type="textarea" placeholder="请输入设备详情"/>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice('addForm')">确认</el-button>
        <el-button @click="resetForm">取消</el-button>
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
        <el-button type="primary" @click="dialogExcelVisible = false">确 定</el-button>
      </span>
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
import equementCascader from './component/equementCascader'
import addTaskDialog from './component/addTaskDialog'
import deviceDetail from '@/components/deviceDetail'
import { equipmentType, status, checkStatus, overdue, addrCasc } from '@/utils/config'
import { mapGetters } from 'vuex'
import { fetchAddDevice, fetchMohuCom, fetchDeviceDetail, fetchGetDevice, fetchUpdateDevice } from '@/api/shebei'
//  fetchMakeTakes,
export default {
  components: {
    equementCascader,
    addTaskDialog,
    deviceDetail
  },
  data() {
    return {
      restaurants: [],
      timeout: null,
      loading: false,
      equipmentType,
      status,
      checkStatus,
      overdue,
      addrCasc,
      // 已选择状态
      equipmentTypeChecked: '',
      statusChecked: '',
      checkStatusChecked: '',
      overdueChecked: '',
      inspectionDate: '', // 年检
      isExcel: 1, // 导出选项 1：勾选项 2：全部
      // 查询
      search: {
        useUnit: '', // 使用单位
        useEque: [], // 设备种类
        userReg: '', // 登记证
        status: '', // 状态
        facNum: '', // 出厂编号
        maintUnit: '', // 维保单位
        equiStatus: '', // 设备检查状态
        isOverdue: '', // 是否超期
        inspecDate: [], // 年检日期
        addrCasc: '' // 地区联级
      },
      // 弹出框
      dialogExcelVisible: false,
      dialogAddVisible: false,
      dialogInfoVisible: false,
      dialogInfoLoading: false,
      dialogVisible: false,
      dialogAddTask: false,
      // 单个信息
      infoTitle: '新增',
      info: {
        useEque: [], // 设备种类
        status: '', // 状态
        devNum: '', // 设备编号
        devName: '', // 设备名称
        devUnit: '', // 设备型号
        devReg: '', // 设备注册号
        useCert: '', // 使用证编号
        DeviceIndexesID: '', // 设备系统编号
        detailAddr: '', // 详细地址
        Longitude: '', // 经度
        latitude: '', // 纬度
        useUnitName: '', // 使用单位名称
        concat: '', // 使用单位联系人
        telephone: '', // 使用单位电话
        unitAddr: '', // 使用单位地址
        devDetail: '', // 设备详情
        factNum: '', // 设备出厂编号
        installAddr: [], // 设备安装地址
        keyMonitor: '', // 重点监控设备
        DeviceUseID: '' // 使用单位id
      },
      infoRules: {
        useEque: [{ type: 'array', required: true, message: '请选择设备种类' }], // 设备种类
        status: [{ type: 'string', required: true, message: '请选择状态' }], // 状态
        devNum: [{ type: 'string', required: true, message: '请输入设备编号' }], // 设备编号
        devName: [{ type: 'string', required: true, message: '请输入设备名称' }], // 设备名称
        devUnit: [{ type: 'string', required: true, message: '请输入设备型号' }], // 设备型号
        devReg: [{ type: 'string', required: true, message: '请输入设备注册号' }], // 设备注册号
        useCert: [{ type: 'string', required: true, message: '请输入使用证编号' }], // 使用证编号
        detailAddr: [{ type: 'string', required: true, message: '请输入详细地址' }], // 详细地址
        useUnitName: [{ type: 'string', required: true, message: '请输入使用单位名称' }], // 使用单位名称
        installAddr: [{ type: 'array', required: true, message: '请输入设备安装地址' }], // 设备安装地址
        factNum: [{ type: 'string', required: true, message: '请输入设备出厂编号' }] // 设备出厂编号
      },
      multipleSelection: [], // 已勾选的项
      pageSize: '10', // 页大小
      pageNum: 1,
      // 设备详情
      deviceDetail: {},

      options: [],
      activeName: 'first',
      danwei: '',
      dejizheng: '',
      value: '',
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'deviceTotal',
      'deviceList',
      'companyList',
      'equipmentAllType'
    ])
  },
  mounted() {
    this.fecthData()
    if (this.companyList.length === 0) {
      this.$store.dispatch('actionsMohuCom')
    }
    if (this.equipmentAllType.length === 0) {
      this.$store.dispatch('actionsDeviceType')
    }
  },
  methods: {
    onUseEqueChange(event) { // 设备种类
      console.log(event, 123)
      this.search.useEque = event
    },
    makeTask() { // 生成任务
      // console.log(this.multipleSelection)
      // const arr = this.multipleSelection // 已选数据
      // if (arr.length === 0) {
      //   this.$message({
      //     message: '未选择数据',
      //     type: 'warning'
      //   })
      //   return ''
      // }
      // const arrOp = arr.map(item => {
      //   return { companyUseName: item.deviceUseName, deviceIds: item.id }
      // })
      // console.log(arrOp)
      this.dialogAddTask = true // 打开任务
      // fetchMakeTakes(arrOp).then(response => {
      //   const data = response
      //   if (data.resultCode === '0000000') {
      //     const returnData = data.returnData
      //     console.log(returnData)
      //     this.$message({
      //       message: data.resultDesc,
      //       type: 'success'
      //     })
      //     this.fecthData()
      //   } else {
      //     this.$message({
      //       message: data.resultDesc,
      //       type: 'warning'
      //     })
      //   }
      // })
    },
    tableDetal(row) { // 设备详情
      this.dialogInfoVisible = true
      this.dialogInfoLoading = true // 加载显示
      // row.id
      fetchDeviceDetail(row.id).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.deviceDetail = data.returnData
        }
      }).finally(() => {
        this.dialogInfoLoading = false
      })
    },
    tableEdit(row) { // 设备编辑
      console.log(row.id)
      this.infoTitle = '编辑'
      this.dialogAddVisible = true
      fetchGetDevice(row.id).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          const res = data.returnData
          console.log(res)
          const {
            id,
            deviceType1, // 设备类型1
            // deviceTypeName1, // 设备类型名称1
            deviceType2, // 设备类型2
            // deviceTypeName2, // 设备类型名称2
            deviceStatusName, // 状态
            deviceNo, // 设备编号
            deviceName, // 设备名称
            deviceModel, // 设备型号
            deviceRegNo, // 设备注册号
            deviceCertNo, // 使用证编号
            deviceProduceNo, // 设备出厂编号
            DeviceIndexesID, // 设备系统编号
            // deviceInstallArea1, // 设备安装地址1
            deviceInstallArea2, // 设备安装地址2
            deviceInstallArea3, // 设备安装地址3
            deviceInstallArea4, // 设备安装地址4
            // deviceInstallAreaName1, // 设备安装地址名1
            // deviceInstallAreaName2, // 设备安装地址名2
            // deviceInstallAreaName3, // 设备安装地址名3
            // deviceInstallAreaName4, // 设备安装地址名4
            deviceInstallAddress, // 详细地址
            deviceLng, // 经度
            deviceLat, // 纬度
            deviceIsMonitoring, // 重点监控设备
            deviceUseName, // 使用单位名称
            deviceUseContactMan, // 使用单位联系人
            deviceUseTel, // 使用单位电话
            deviceUseAddress, // 使用单位地址
            deviceIntro // 设备详情
          } = res
          const useEque = (deviceType1, deviceType2) => {
            if (deviceType2) {
              return [~~deviceType1, ~~deviceType2]
            } else {
              return [~~deviceType1]
            }
          }
          const installAddr = (deviceInstallArea2, deviceInstallArea3, deviceInstallArea4) => {
            return [deviceInstallArea2, deviceInstallArea3, deviceInstallArea4]
          }
          this.info = {
            id,
            useEque: useEque(deviceType1, deviceType2), // 设备种类
            status: deviceStatusName, // 状态
            devNum: deviceNo, // 设备编号
            devName: deviceName, // 设备名称
            devUnit: deviceModel, // 设备型号
            devReg: deviceRegNo, // 设备注册号
            useCert: deviceCertNo, // 使用证编号
            DeviceIndexesID, // 设备系统编号
            detailAddr: deviceInstallAddress, // 详细地址
            Longitude: deviceLng, // 经度
            latitude: deviceLat, // 纬度
            useUnitName: deviceUseName, // 使用单位名称
            concat: deviceUseContactMan, // 使用单位联系人
            telephone: deviceUseTel, // 使用单位电话
            unitAddr: deviceUseAddress, // 使用单位地址
            devDetail: deviceIntro, // 设备详情
            factNum: deviceProduceNo, // 设备出厂编号
            installAddr: installAddr(deviceInstallArea2, deviceInstallArea3, deviceInstallArea4), // 设备安装地址
            keyMonitor: deviceIsMonitoring === '0' ? '' : '1' // 重点监控设备
          }
        }
      })
    },
    addDevice(formName) { // 添加设备
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {
            id,
            useEque, // 设备种类
            status, // 状态
            devNum, // 设备编号
            devName, // 设备名称
            devUnit, // 设备型号
            devReg, // 设备注册号
            useCert, // 使用证编号
            DeviceIndexesID, // 设备系统编号
            detailAddr, // 详细地址
            Longitude, // 经度
            latitude, // 纬度
            useUnitName, // 使用单位名称
            concat, // 使用单位联系人
            telephone, // 使用单位电话
            unitAddr, // 使用单位地址
            devDetail, // 设备详情
            factNum, // 设备出厂编号
            installAddr, // 设备安装地址
            keyMonitor, // 重点监控设备
            DeviceUseID
          } = this.info
          const useEqueArr = this.$refs['useEque'].$el.innerText.replace(/\s+/g, '').split('/')
          const deviceInstallAreaArr = this.$refs['deviceInstallArea'].$el.innerText.replace(/\s+/g, '').split('/')
          // console.log(useEqueArr, 123123)
          const data = {
            deviceType1: `${useEque[0]}`, // 设备类型1
            deviceTypeName1: useEqueArr[0], // 设备类型名称1
            deviceType2: `${useEque[1]}`, // 设备类型2
            deviceTypeName2: useEqueArr[1], // 设备类型名称2
            deviceStatusName: status, // 状态
            deviceNo: devNum, // 设备编号
            deviceName: devName, // 设备名称
            deviceModel: devUnit, // 设备型号
            deviceRegNo: devReg, // 设备注册号
            deviceCertNo: useCert, // 使用证编号
            deviceProduceNo: factNum, // 设备出厂编号
            DeviceIndexesID, // 设备系统编号
            deviceInstallArea1: '1', // 设备安装地址1
            deviceInstallArea2: installAddr[0], // 设备安装地址2
            deviceInstallArea3: installAddr[1], // 设备安装地址3
            deviceInstallArea4: installAddr[2], // 设备安装地址4
            deviceInstallAreaName1: '广东省', // 设备安装地址名1
            deviceInstallAreaName2: deviceInstallAreaArr[0], // 设备安装地址名2
            deviceInstallAreaName3: deviceInstallAreaArr[1], // 设备安装地址名3
            deviceInstallAreaName4: deviceInstallAreaArr[2], // 设备安装地址名4
            deviceInstallAddress: detailAddr, // 详细地址
            deviceLng: Longitude, // 经度
            deviceLat: latitude, // 纬度
            deviceIsMonitoring: keyMonitor ? '1' : '0', // 重点监控设备
            deviceUseName: useUnitName, // 使用单位名称
            deviceUseContactMan: concat, // 使用单位联系人
            deviceUseTel: telephone, // 使用单位电话
            deviceUseAddress: unitAddr, // 使用单位地址
            deviceIntro: devDetail, // 设备详情
            DeviceUseID
          }
          const changeMethod = (data, id) => {
            if (this.infoTitle === '新增') {
              return fetchAddDevice(data)
            } else {
              data.id = id
              return fetchUpdateDevice(data)
            }
          }
          changeMethod(data, id).then(response => {
            const data = response
            if (data.resultCode === '0000000') {
              this.$message({
                message: data.resultDesc,
                type: 'success'
              })
              this.resetForm(formName)
              // shuaxin
              this.fecthData()
            } else {
              this.$message({
                message: data.resultDesc,
                type: 'warning'
              })
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.dialogAddVisible = false
      this.$refs[formName].resetFields()
    },
    fecthData() { // get device
      this.loading = true
      const {
        useUnit, // 使用单位
        useEque, // 设备种类
        userReg, // 登记证
        status, // 状态
        facNum, // 出厂编号
        maintUnit, // 维保单位
        // equiStatus, // 设备检查状态
        isOverdue, // 是否超期
        inspecDate // 年检日期
        // addrCasc // 地区联级
      } = this.search
      const deviceType1 = useEque[0] ? `${useEque[0]}` : ''
      const deviceType2 = useEque[1] ? `${useEque[1]}` : ''
      // console.log(this)
      const addr = this.$refs['addrCascRefs'] ? this.$refs['addrCascRefs'].innerText : ''
      const addrCascArr = addr ? addr.replace(/\s+/g, '').split('/') : []
      const data = {
        pageSize: `${this.pageSize}`, // 页大小
        pageNum: `${this.pageNum}`, // 第几页
        deviceUseName: useUnit, // 使用单位名称
        deviceType1, // 种类1
        deviceType2, // 种类2
        deviceProduceNo: facNum, // 出厂编号
        deviceStatusName: status, // 状态
        deviceTenanceName: maintUnit, // 维保单位
        deviceCertNo: userReg, // 使用登记证
        deviceAreaName4: addrCascArr.length !== 0 ? addrCascArr[addrCascArr.length - 1] : '', // 设备地址选择
        deviceNextYearTestDate1: inspecDate[0], // 年检范围1
        deviceNextYearTestDate2: inspecDate[1], // 年检范围2
        isOverdue: `${isOverdue}`, // 是否超期  0否1是
        orderType: '1' // 排序类型 1降序 2升序
      }
      this.$store.dispatch('getDeviceList', data).then(() => {
        this.loading = false
      })
    },
    searchQuery() {
      this.fecthData()
    },
    moreSearchQuery() {
      this.fecthData()
      this.dialogVisible = false
    },
    searchReset() {
      this.search = {
        useUnit: '', // 使用单位
        useEque: [], // 设备种类
        userReg: '', // 登记证
        status: '', // 状态
        facNum: '', // 出厂编号
        maintUnit: '', // 维保单位
        equiStatus: '', // 设备检查状态
        isOverdue: '', // 是否超期
        inspecDate: [], // 年检日期
        addrCasc: '' // 地区联级
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
    querySearchAsync(queryString, cb) { // 模糊搜索公司名
      var restaurants = this.companyList
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 300)
    },
    queryAllCom() {
      fetchMohuCom().then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          var restaurants = data.returnData
          // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
          this.restaurants = restaurants.map(item => {
            return { value: item.useName, id: item.id }
          })
        } else {
          this.$message({
            message: data.resultDesc,
            type: 'warning'
          })
        }
      })
    },
    handleMoHuSelect(item) { // 获取id
      // console.log(item)
      this.info.DeviceUseID = item.id
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    closed(event) {
      this.dialogAddTask = false
    },
    clearing() { // 清空
      this.$refs.multipleTable.clearSelection()
      // this.multipleSelection = []
    },
    toRouter() { this.$router.push({ path: '/paifa' }) },
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
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
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
