<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      :title="'新增设备'"
      :show="show"
      width="50%"
      append-to-body
      @close="$emit('update:show', false)">
      <div class="addDialog dialogForm">
        <el-form ref="addForm" :model="info" label-position="right" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="登记证编号" prop="deviceCertNo">
                <el-input v-model="info.deviceCertNo" class="input" placeholder="请输入登记证编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备代码" prop="deviceNo">
                <el-input v-model="info.deviceNo" class="input" placeholder="请输入设备代码"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备名称" prop="deviceName">
                <el-input v-model="info.deviceName" class="input" placeholder="请输入设备名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备地址" prop="deviceAddress">
                <el-input v-model="info.deviceAddress" class="input" placeholder="请输入设备地址"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备型号" prop="deviceModel">
                <el-input v-model="info.deviceModel" class="input" placeholder="请输入设备型号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备规格" prop="deviceSize">
                <el-input v-model="info.deviceSize" class="input" placeholder="请输入设备规格"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="单位内部编号" prop="deviceInteriorUseCode">
                <el-input v-model="info.deviceInteriorUseCode" class="input" placeholder="请输入单位内部编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次检验日期" prop="deviceNextTestDate">
                <el-date-picker
                  v-model="info.deviceNextTestDate"
                  type="date"
                  placeholder="下次检验日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-form-item label="使用单位名称" prop="deviceUseName">
              <el-input v-model="info.deviceUseName" placeholder="请输入使用单位名称" style="width:100%">
                <el-button slot="append" icon="el-icon-search" @click="chageSearch"/>
              </el-input>
            </el-form-item>
            <el-dialog
              :visible.sync="dialogUnitVisible"
              append-to-body
              width="50%">
              <addUnit />
            </el-dialog>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="使用单位联系人">
                <el-input v-model="info.deviceUseContactMan" class="input" placeholder="请输入使用单位联系人"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用单位电话">
                <el-input v-model="info.deviceUseContactManTel" class="input" placeholder="请输入使用单位电话"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="使用单位地址">
              <el-input v-model="info.deviceUseAddress" placeholder="请输入使用单位地址"/>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import { status, addrCasc } from '@/utils/config'
import addUnit from '@/components/unitInfo/unit'
// import imgLoad from '@/components/imgLoad/index'
import { fetchUpdateDevice } from '@/api/jiany'
export default {
  components: {
    addUnit
    // imgLoad
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    infod: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      status,
      addrCasc,
      visible: this.show,
      dialogMapVisible: false,
      dialogUnitVisible: false,
      phoneListString: '',
      info: this.infod
    }
  },
  computed: {
  },
  watch: {
    show() {
      this.visible = this.show
    },
    infod() {
      this.info = this.infod
    }
  },
  mounted() {
  },
  methods: {
    chageSearch() {
      this.dialogUnitVisible = true
    },
    handleClose(done) { done() }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialogForm {
  .row {padding-bottom: 16px;}
  .input {max-width: 220px;}
  .label {
    min-width: 105px;
    display: inline-block;
    .red {color: red}
  }
}
.bm-view {
  width: 100%;
  height: 500px;
}
</style>
