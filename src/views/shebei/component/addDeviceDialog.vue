<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="handleClose"
    class="device"
    width="50%">
    <el-form ref="form" :model="info" :rules="rules" label-width="130px">
      <div class="device-info">
        <div class="info">
          <span>系统导入关联设备</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="[]"
          height="250"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            prop="date"
            label="使用证编号"/>
          <el-table-column
            prop="name"
            label="设备型号"/>
          <el-table-column
            prop="address"
            label="设备出厂编号"/>
          <el-table-column
            prop="address"
            label="设备注册号"/>
        </el-table>
      </div>
      <div class="title">手动新增关联设备</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型">
            <el-cascader
              ref="useEque"
              v-model="info.useEque"
              :options="equipmentAllType"
              class="select"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备状态">
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
          <el-form-item label="设备编号">
            <el-input v-model="info.bianhao" placeholder="请输入设备编号"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称">
            <el-input v-model="info.mingcheng" placeholder="请输入设备名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备型号">
            <el-input v-model="info.xianghao" placeholder="请输入设备型号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备注册号">
            <el-input v-model="info.zhucehao" placeholder="请输入设备注册号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="使用证编号">
            <el-input v-model="info.zhengbianhao" placeholder="请输入使用证编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备出厂编号">
            <el-input v-model="info.chuchuangbianhao" placeholder="请输入设备出厂编号" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { status, equipmentAllType } from '@/utils/config'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      status,
      checkDate: '',
      info: {
        useEque: '',
        status: '',
        mingcheng: '',
        bianhao: '',
        zhucehao: '',
        xianghao: '',
        zhengbianhao: '',
        chuchuangbianhao: ''
      },
      rules: {
        useEque: [{ required: true, message: '请选择设备类型' }],
        status: [{ required: true, message: '请选择设备状态' }],
        mingcheng: [{ required: true, message: '请输入设备名称' }],
        bianhao: [{ required: true, message: '请输入设备编号' }],
        zhucehao: [{ required: true, message: '请输入设备注册号' }],
        xianghao: [{ required: true, message: '请输入活动资源' }],
        zhengbianhao: [{ required: true, message: '请输入使用证编号' }],
        chuchuangbianhao: [{ required: true, message: '请输入设备出厂编号' }]
      },
      equipmentAllType
    }
  },
  methods: {
    handleClose(done) {
      this.visible = false
      done()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.device {
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
