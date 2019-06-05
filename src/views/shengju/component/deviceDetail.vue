<template>
  <div class="infodialog">
    <div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">使用单位（人）</span><span class="info">{{ info.use_org_name }}</span> </el-col>
        <el-col :span="12"><span class="name">使用单位（人）地址</span><span class="info">{{ info.use_org_addr }}</span> </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">证书编号</span><span class="info">{{ info.cert_code }}</span> </el-col>
        <el-col :span="12"><span class="name">产品（出厂）编号</span><span class="info">{{ info.product_code }}</span> </el-col>
      </el-row>
    </div>
    <div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">设备注册代码</span><span class="info">{{ info.reg_code }}</span> </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">维保单位证书编号</span><span class="info">{{ info.mai_org_cert_code }}</span> </el-col>
        <el-col :span="12"><span class="name">设备单位内地点</span><span class="info">{{ info.equ_org_place }}</span> </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">下次检验日期</span><span class="info">{{ info.next_insp_date }}</span> </el-col>
        <el-col :span="12"><span class="name">检验日期</span><span class="info">{{ info.insp_date }}</span> </el-col>
      </el-row>
    </div>
    <div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">法定代表人</span><span class="info">{{ info.use_corp }}</span> </el-col>
        <el-col :span="12"><span class="name">单位使用（人）电话</span><span class="info">{{ info.use_tel }}</span> </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">注册登记日期</span><span class="info">{{ info.registier_date }}</span> </el-col>
        <el-col :span="12"><span class="name">安全管理人员</span><span class="info">{{ info.sa_person }}</span> </el-col>
      </el-row>
    </div>
    <div>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">安全管理联系电话</span><span class="info">{{ info.sa_tel }}</span> </el-col>
        <el-col :span="12"><span class="name">设备用途</span><span class="info">{{ info.equ_use }}</span> </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="row">
        <el-col :span="12"><span class="name">投用日期</span><span class="info">{{ info.use_date }}</span> </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.infodialog {
  padding-top: 15px;
  .titles {
    padding: 10px;
    color:#191919;
    background: #EdEFF4
  }
  .pd-top{padding-top: 16px;}
  .row {
    padding: 16px 0;
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
