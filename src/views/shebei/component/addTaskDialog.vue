<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      class="task"
      width="50%">
      <el-form ref="form" :model="form" label-width="150px">
        <div class="title">单位信息</div>
        <el-row>
          <el-form-item label="使用单位名称">
            <el-input />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="使用单位联系人">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位联系方式">
              <el-input />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="使用单位地址">
            <el-input />
          </el-form-item>
        </el-row>
        <div class="device-info">
          <div class="info">
            <span>设备信息</span>
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="DialogAddDevice= true">添加设备</el-button>
          </div>
          <el-table
            :data="[]"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="设备名称"/>
            <el-table-column
              prop="name"
              label="设备索引码"/>
            <el-table-column
              prop="address"
              label="设备状态"/>
            <el-table-column
              prop="address"
              label="设备型号"/>
            <el-table-column
              prop="address"
              label="检验日期"/>
            <el-table-column
              prop="address"
              label="检验日期"/>
          </el-table>
        </div>
        <div>
          <div class="title">单位信息</div>
          <el-row>
            <el-form-item label="任务要求">
              <el-input type="textarea" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="检查日期">
              <el-date-picker
                v-model="checkDate"
                type="date"
                placeholder="选择日期"/>
            </el-form-item>
          </el-row>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <addDeviceDialog :visible="DialogAddDevice"/>
  </div>
</template>

<script>
import addDeviceDialog from './addDeviceDialog'
export default {
  components: {
    addDeviceDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkDate: '',
      form: {},
      DialogAddDevice: false
    }
  },
  methods: {
    handleClose(done) {
      this.visible = false
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  font-size: 14px;
  .title {
    padding: 16px;
    color:#333;
    background: #DBDBDB;
    margin-bottom: 10px;
  }
  .device-info {
    border-radius: 4px;
    margin: 10px 0;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: #DBDBDB;
    }
  }
}

</style>
