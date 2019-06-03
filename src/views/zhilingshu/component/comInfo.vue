<template>
  <div class="task-detail">
    <div class="bianhao"><label for="">企业信息</label></div>
    <div class="detail">
      <div class="item">
        <span class="name">使用单位：</span> <div class="info">{{ transfe.companyUseNewName }}</div>
        <span class="name">联系人:</span> <div class="info">{{ transfe.companyUseConfirmMan }}</div>
      </div>
      <div class="item">
        <span class="name">联系电话：</span> <div class="info">{{ transfe.companyUseConfirmManPhone }}</div>
        <span class="name">联系地址：</span> <div class="info">{{ transfe.companyUseFullAddress }}</div>
      </div>
    </div>
    <el-table
      :data="deviceList"
      border
      height="230"
      style="width: 100%;padding-top: 5px;padding-left: 1px;">
      <el-table-column
        prop="deviceTypeName1"
        label="设备种类"
        width="180"/>
      <el-table-column
        prop="deviceCertNo"
        label="使用登记证"
        width="180"/>
      <el-table-column
        prop="deviceProduceNo"
        label="出厂编号"/>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="innerVisible"
      width="40%"
      title="设备"
      append-to-body>
      <deviceDetail :info="info"/>
    </el-dialog>
  </div>
</template>

<script>
import deviceDetail from '@/components/deviceDetail/index'
import { fetchDeviceDetail } from '@/api/shebei'
export default {
  components: {
    deviceDetail
  },
  props: {
    transfe: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      info: {},
      innerVisible: false,
      deviceList: []
    }
  },
  mounted() {
    if (this.transfe.list.length !== 0) {
      this.deviceList = this.transfe.list
    }
  },
  methods: {
    detail(row) {
      fetchDeviceDetail(row.id).then(response => {
        const data = response
        if (data.resultCode === '0000000') {
          this.info = data.returnData
        }
      }).finally(() => {
        this.innerVisible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
          // text-align: right;
        }
        .info {
          min-width: 200px;
          color:#999999;
        }
      }
    }
    .btn-group {
      position: absolute;
      right: 5px;
      top: 60px;
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
</style>
