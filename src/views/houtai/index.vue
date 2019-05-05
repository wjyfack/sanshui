<template>
  <div class="admin">
    <div class="header">
      <div class="p-info">
        <img src="../../assets/avatar.png" alt="" class="avatar">
        <span class="tips">早安，管理员，祝你开心每一天！</span>
      </div>
      <div class="group">
        <div class="item border"><span>成员管理</span><span class="all">56</span></div>
        <div class="item border"><span>操作记录</span><el-button type="primary" size="mini">查询</el-button></div>
        <div class="item border"><span>时间</span></div>
      </div>
    </div>
    <div class="opt-group">
      <div class="item" @click="changeActiveName(1)">
        <img src="http://placehold.it/100x100" alt="" class="img">
        <div class="name">账户管理</div>
      </div>
      <div class="item" @click="changeActiveName(2)">
        <img src="http://placehold.it/100x100" alt="" class="img">
        <div class="name">角色管理</div>
      </div>
      <div class="item" @click="changeActiveName(3)">
        <img src="http://placehold.it/100x100" alt="" class="img">
        <div class="name">指令书模板管理</div>
      </div>
      <div class="item" @click="changeActiveName(4)">
        <img src="http://placehold.it/100x100" alt="" class="img">
        <div class="name">指令书状态管理</div>
      </div>
      <div class="item">
        <img src="http://placehold.it/100x100" alt="" class="img">
        <div class="name">三级标题</div>
      </div>
    </div>
    <account v-if="activeName == 1"/>
    <roles v-else-if="activeName == 2"/>
    <instruction v-else-if="activeName == 3"/>
    <instruction-status v-else/>

  </div>
</template>

<script>
import account from './component/account'
import instruction from './component/instruction'
import instructionStatus from './component/instructionStatus'
import roles from './component/roles'
export default {
  components: {
    account,
    instruction,
    instructionStatus,
    roles
  },
  data() {
    return {
      activeName: 1
    }
  },
  methods: {
    changeActiveName(opt) {
      this.activeName = opt
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.admin {
  font-size: 14px;
  padding: 16px;
  .header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, .3);
    .p-info {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        margin-right: 16px;
      }
      .tips {
        color:#333;
      }
    }
    .group {
      display: flex;
      .item {
        min-width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #666;
        span {
          display: inline-block;
          padding-bottom: 5px;
        }
        .all {
          font-size: 20px;
          color: #333;
        }
      }
      .border {
        border-left: 1px solid #999;
      }
    }
  }
  .opt-group {
    display: flex;
    padding: 10px 0;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 16px;
      .img {width:150px; height: 75px;}
      .name  {
        cursor: pointer;
        color: #333;
        font-weight: bold;
        line-height: 35px;
      }
    }
  }
}
</style>
