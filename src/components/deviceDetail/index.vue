<template>
  <div v-loading="loading" class="infoDialog">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <el-row type="flex" align="middle" class="row pd-top">
          <el-col :span="16"><span class="name">设备类型</span><span class="info">{{ info.deviceTypeName1 }}</span> </el-col>
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
          <el-col :span="8"><span class="name">设备系统编号</span><span class="info">{{ info.DeviceIndexesID }}</span> </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">使用单位部门地址</span><span class="info">{{ info.deviceCertNo }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">设备安装地址</span><span class="info">{{ info.DeviceAddress }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">经纬度</span><span class="info">{{ info.DeviceLng }}/{{ info.DeviceLat }}</span>
        </el-row>
        <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">设备详情</span><span class="info">{{ info.DeviceIntro }}</span>
        </el-row>
        <!-- <el-row type="flex" align="middle" class="row pd-top">
          <span class="name">设备相册</span><span class="info">DevicePhotos</span>
        </el-row> -->
      </el-tab-pane>
      <el-tab-pane label="单位信息" name="second">
        <div>
          <div class="titles">使用单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">使用单位名称</span><span class="info">{{ info.DeviceUseName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.DeviceUseContactMan }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.DeviceUseContactManTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.DeviceUseAddress }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">制造单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">制造单位名称</span><span class="info">{{ info.DeviceProduceName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.DeviceProduceContactMan }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.DeviceProduceContactTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.DeviceProduceAddress }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">安装单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">安装单位名称</span><span class="info">{{ info.DeviceInstallName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.DeviceInstallContactTel }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.DeviceUseAddress }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.DeviceUseAddress }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">维保单位信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="12"><span class="name">维保单位名称</span><span class="info">{{ info.DeviceTenanceName }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系人</span><span class="info">{{ info.DeviceTenanceContactMan }}</span> </el-col>
            <el-col :span="12"><span class="name">联系电话</span><span class="info">{{ info.DeviceTenanceContactManTel }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><span class="name">联系地址</span><span class="info">{{ info.DeviceTenanceAddress }}</span> </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="检验所信息" name="third">
        <div>
          <div class="titles">定期检验信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">上次检验结论</span><span class="info">{{ info.DeviceLastTestResult }}</span> </el-col>
            <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.DeviceLastTestDate }}</span> </el-col>
            <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.DeviceNextTestDate }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">年度检验信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">上次检验结论</span><span class="info">{{ info.DeviceLastYearTestResult }}</span> </el-col>
            <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.DeviceLastYearTestDate }}</span> </el-col>
            <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.DeviceNextYearTestDate }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">耐压检验信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">上次检验结论</span><span class="info">{{ info.DeviceLastPressureTestResult }}</span> </el-col>
            <el-col :span="8"><span class="name">上次检验日期</span><span class="info">{{ info.DeviceLastPressureTestDate }}</span> </el-col>
            <el-col :span="8"><span class="name">下次检验日期</span><span class="info">{{ info.DeviceNextPressureTestDate }}</span> </el-col>
          </el-row>
        </div>
        <div>
          <div class="titles">约检通知信息</div>
          <el-row type="flex" align="middle" class="row pd-top">
            <el-col :span="8"><span class="name">登记人</span><span class="info">{{ info.DeviceInsNoticeRegister }}</span> </el-col>
            <el-col :span="8"><span class="name">登记时间</span><span class="info">{{ info.DeviceInsNoticeTime }}</span> </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="8"><span class="name">通知结果描述</span><span class="info">{{ info.DeviceInsNoticeIntro }}</span> </el-col>
            <el-col :span="8"><span class="name">联系人</span><span class="info">{{ info.DeviceTenanceContactMan }}</span> </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="任务信息" name="fourth">
        <el-table
          ref="singleTable"
          :data="info.taskCheckList"
          highlight-current-row
          style="width: 100%"
          @current-change="handleCurrentChange">
          <el-table-column
            type="index"
            width="50"/>
          <el-table-column
            property="checkNo"
            label="任务编号"/>
          <el-table-column
            property="checkTypeID"
            label="任务类型"/>
          <el-table-column
            property="checkDeptName"
            label="接收部门"/>
          <el-table-column
            property="checkExecManName"
            label="接收人"/>
          <el-table-column
            property="checkStatus"
            label="检查状态"/>
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
            <div v-for="(item, index) in info.deviceParam" :key="item" class="row-flex-item">
              <span class="name">{{ index }}</span><span class="info">{{ item }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
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
      activeName: 'first'
    }
  },
  methods: {
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
