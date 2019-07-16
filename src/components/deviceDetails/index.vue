<template>
  <div v-loading="loading" class="infodialog">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-row type="flex" align="middle" class="row pd-top">
          <el-col :span="8"><span class="name">设备类型</span><span class="info">{{ info.deviceTypeName1 }}</span> </el-col>
          <el-col :span="8"><span class="name">设备状态</span><span class="info">{{ info.deviceStatusName }}</span> </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <el-col :span="8"><span class="name">设备编号</span><span class="info">{{ info.deviceNo }}</span> </el-col>
          <el-col :span="8"><span class="name">设备名称</span><span class="info">{{ info.deviceName }}</span> </el-col>
          <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.deviceLastTestDate }}</span> </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <el-col :span="8"><span class="name">设备型号</span><span class="info">{{ info.deviceModel }}</span> </el-col>
          <el-col :span="8"><span class="name">设备注册号</span><span class="info">{{ info.deviceRegNo }}</span> </el-col>
          <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.deviceNextTestDate }}</span> </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <el-col :span="8"><span class="name">使用证编号</span><span class="info">{{ info.deviceCertNo }}</span> </el-col>
          <el-col :span="8"><span class="name">设备出厂编号</span><span class="info">{{ info.deviceProduceNo }}</span> </el-col>
          <el-col :span="8"><span class="name">设备系统编号</span><span class="info">{{ info.deviceSystemCode }}</span> </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">使用单位部门地址</span><span class="info">{{ info.deviceCertNo }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">设备安装地址</span><span class="info">{{ info.deviceAddress }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">经纬度</span><span class="info">{{ info.deviceLng }}/{{ info.deviceLat }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">设备详情</span><span class="info">{{ info.deviceIntro }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">设备相册</span>
          <div v-if="commandPhotoList.length != 0" class="imgLists" >
            <ul class="el-upload-list el-upload-list--picture-card">
              <li v-for="(item, index) in commandPhotoList" :key="index" class="el-upload-list__item is-success">
                <img :src="baseUrl+item" alt="" class="el-upload-list__item-thumbnail">
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="hasHandlePreview(baseUrl+item)">
                    <i class="el-icon-zoom-in"/>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="单位信息" name="second">
        <div>
          <div class="titles">使用单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">使用单位名称</span><span class="info">{{ info.deviceUseName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.deviceUseContactMan }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.deviceUseContactManTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.deviceUseAddress }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">制造单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">制造单位名称</span><span class="info">{{ info.deviceProduceName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.deviceProduceContactMan }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.deviceProduceContactTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.deviceProduceAddress }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">安装单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">安装单位名称</span><span class="info">{{ info.deviceInstallName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.deviceInstallContactTel }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.deviceInstallContactTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.deviceInstallAddress }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">维保单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">维保单位名称</span><span class="info">{{ info.deviceTenanceName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.deviceTenanceContactMan }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.deviceTenanceContactManTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.deviceTenanceAddress }}</span> </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="检验所信息" name="third">
        <div>
          <div class="titles">定期检验信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">上次检验结论</span><span class="info">{{ info.deviceLastTestResult }}</span> </el-col>
            <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.deviceLastTestDate }}</span> </el-col>
            <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.deviceNextTestDate }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">年度检验信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">上次检验结论</span><span class="info">{{ info.deviceLastYearTestResult }}</span> </el-col>
            <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.deviceLastYearTestDate }}</span> </el-col>
            <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.deviceNextYearTestDate }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">耐压检验信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">上次检验结论</span><span class="info">{{ info.deviceLastPressureTestResult }}</span> </el-col>
            <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.deviceLastPressureTestDate }}</span> </el-col>
            <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.deviceNextPressureTestDate }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">约检通知信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">登记人</span><span class="info">{{ info.deviceInsNoticeRegister }}</span> </el-col>
            <el-col :span="8"><span class="name">登记时间</span><span class="info">{{ info.deviceInsNoticeTime }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="8"><span class="name">通知结果描述</span><span class="info">{{ info.deviceInsNoticeIntro }}</span> </el-col>
            <el-col :span="8"><span class="name">联系人</span><span class="info">{{ info.deviceTenanceContactMan }}</span> </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务信息" name="fourth">
        <el-table
          ref="singleTable"
          :data="info.taskCheckList"
          highlight-current-row
          border
          style="width: 100%;margin-top: 1px;"
          @current-change="handleCurrentChange"
          @row-click="cellClick">
          <el-table-column
            type="index"
            width="50"/>
          <el-table-column
            prop="checkNo"
            label="任务编号"/>
          <el-table-column
            label="任务类型">
            <template slot-scope="scope">
              <span>{{ checkTypeIdchange(scope.row.checkTypeId) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="checkDeptName"
            label="接收部门"/>
          <el-table-column
            prop="checkExecManName"
            label="接收人"/>
          <el-table-column
            label="检查状态">
            <template slot-scope="scope">
              <span>{{ checkStatusChange(scope.row.checkStatus) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="参数信息" name="fifth">
        <div>
          <div v-if="info.deviceType1 == 1" class="titles">锅炉</div>
          <div v-else-if="info.deviceType1 == 2" class="titles">压力容器</div>
          <div v-else-if="info.deviceType1 == 3" class="titles">电梯</div>
          <div v-else-if="info.deviceType1 == 4" class="titles">起重机械</div>
          <div v-else-if="info.deviceType1 == 5" class="titles">场（厂）内专用机动车辆</div>
          <div v-else class="titles">压力管道</div>
          <div class="row pd-top row-flex">
            <div v-for="(item, index) in info.deviceParam" :key="index" class="row-flex-item">
              <span class="name">{{ index }}</span><span class="info">{{ item }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="dialogEndVisible"
      width="50%"
      append-to-body
      title="">
      <taskDetail :transfe="editTask" />
      <comInfo :transfe="editTask"/>
      <statusRecord :status="editTask.taskCheckLogList"/>
    </el-dialog>
  </div>
</template>

<script>
import { fecthBeforeEdit } from '@/api/task'
import { opLoading } from '@/mixins/loading'
import { baseUrl } from '@/utils/config'
import statusRecord from '@/components/statusRecord/index'
import comInfo from '@/components/comInfo/comInfo'
import taskDetail from '@/components/taskDetail/taskDetail'
import { toViewer } from '@/utils/common'
export default {
  components: {
    statusRecord,
    comInfo,
    taskDetail
  },
  mixins: [opLoading],
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      baseUrl,
      activeName: 'first',
      commandPhotoList: [],
      editTask: {},
      dialogEndVisible: false,
      baseImgUrl: `${baseUrl}/file/show/ScenePictures/`
    }
  },
  watch: {
    info: function() {
      this.commandPhotoList = this.info.devicePhotos ? this.info.devicePhotos.split(',') : []
    }
  },
  mounted() {
    this.commandPhotoList = this.info.devicePhotos ? this.info.devicePhotos.split(',') : []
  },
  methods: {
    hasHandlePreview(url) {
      toViewer(url)
    },
    cellClick(row) {
      console.log(row)
      this.radirtaskDetail(row)
    },
    radirtaskDetail(row) {
      this.opShowLoading()
      fecthBeforeEdit(row.id).then(res => {
        if (res.resultCode === '0000000') {
          const data = res.returnData
          this.editTask = data
          this.dialogEndVisible = true
          // let commandPhotoList = []
          // if (data.checkResultPhotoList !== null) {
          // commandPhotoList = data.checkResultPhotoList.split(',')
          // }
          // this.commandPhotoList = commandPhotoList // 现场图片
        } else {
          this.$message.error(res.resultDesc)
        }
      }).then(() => {
        // this.isCompent = true
        this.onCloseLoading()
      })
    },
    checkTypeIdchange(checkType) {
      let name = ''
      switch (~~checkType) {
        case 0:
          name = '其他'
          break
        case 1:
          name = '超期未检'
          break
        case 2:
          name = '检验不合格'
          break
        case 3:
          name = '主动上报'
          break
        case 4:
          name = '投诉任务'
      }
      return name
    },
    checkStatusChange(type) {
      let name = ''
      switch (~~type) {
        case 1:
          name = '待派发'
          break
        case 2:
          name = '待接收'
          break
        case 3:
          name = '待处理'
          break
        case 4:
          name = '处理中'
          break
        case 5:
          name = '待审核'
          break
        case 6:
          name = '已完成'
          break
      }
      return name
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
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>

<style lang="scss" scoped>
.infodialog {
  .titles {
    padding: 10px;
    color:#191919;
    background: #EdEFF4
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
  .row-flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &-item {
      margin-bottom: 10px;
      width: 30%;
    }
  }
}
</style>
