<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      :show="show"
      title="excel导入"
      width="100%"
      @close="$emit('update:show', false)">
      <div class="addDialog dialogForm">
        <el-table
          ref="multipleTable"
          :data="taskList"
          border
          tooltip-effect="dark"
          height="450px"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            :selectable="changeSelectable"
            width="50"
            type="selection"/>
          <el-table-column
            width="180"
            prop="deviceAreaName4"
            sortable
            label="镇街"/>
          <el-table-column
            width="180"
            prop="deviceSystemCode"
            label="设备库ID"/>
          <el-table-column
            width="180"
            prop="matchStatus"
            label="匹配情况">
            <template slot-scope="scope">
              <el-tag :type="scope.row.matchStatus === '匹配成功' ? 'success' : 'danger'" size="small">{{ scope.row.matchStatus }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            prop="checkNo"
            label="任务编号"/>
          <!-- <el-table-column
            width="180"
            prop="checkStatus"
            label="任务状态"/> -->
          <el-table-column
            width="180"
            prop="deviceUseAddress"
            label="所在地址"/>
          <el-table-column
            width="180"
            prop="deviceUseName"
            label="使用单位名称"/>
          <el-table-column
            width="180"
            prop="deviceUseContactMan"
            label="使用单位联系人"/>
          <el-table-column
            width="180"
            prop="deviceUseContactManTel"
            label="使用单位联系人电话"/>
          <el-table-column
            width="180"
            prop="deviceCertNo"
            label="使用证编号"/>
          <el-table-column
            width="180"
            prop="deviceName"
            label="设备名称"/>
          <el-table-column
            :formatter="formatDate"
            width="180"
            prop="deviceNextTestDate"
            label="下次检验日期"/>
          <el-table-column
            width="180"
            prop="deviceLastTestResult"
            label="上次检验结论"/>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toMakeTash">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchTaskMore } from '@/api/task'
// import { mapGetters } from 'vuex'
// import addUnit from '@/components/unitInfo/unit'
// import imgLoad from '@/components/imgLoad/index'
// import { fetchUpdateDevice } from '@/api/jiany'
export default {
  components: {
    // addUnit
    // imgLoad
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: this.show,
      dialogMapVisible: false,
      dialogUnitVisible: false,
      taskList: this.list,
      multipleSelection: []
    }
  },
  computed: {
  },
  watch: {
    show() {
      this.visible = this.show
    },
    list() {
      this.taskList = this.list
    }
  },
  mounted() {
    // console.log(this.list)
  },
  methods: {
    changeSelectable(row) {
      return row.matchStatus === '匹配成功'
    },
    toMakeTash() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择任务')
      } else {
        // console.log(123)
        const params = this.multipleSelection
        console.log(params)
        fetchTaskMore(params).then(res => {
          this.visible = false
          this.$emit('change')
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
