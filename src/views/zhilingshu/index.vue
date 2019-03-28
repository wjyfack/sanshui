<template>
  <div class="zhilingshu">
    <div class="zhilingshuMg">
      <div class="search">
        <el-row class="row">
          <el-col :span="8">
            <label for="">任务编号：</label>
            <el-input class="input" placeholder="请输入任务编号"/>
          </el-col>
          <el-col :span="8">
            <label for="">使用单位：</label>
            <el-input class="input" placeholder="请输入使用单位"/>
          </el-col>
          <el-col :span="8">
            <label for="">使用登记证：</label>
            <el-input class="input" placeholder="请输入使用登记证"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="">指令书编号：</label>
            <el-input class="input" placeholder="请输入指令书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="">所属镇街：</label>
            <el-select v-model="addrSel" placeholder="请选择">
              <el-option
                v-for="item in AddrOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="">移交书编号：</label>
            <el-input class="input" placeholder="请输入移交书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="">回复书编号：</label>
            <el-input class="input" placeholder="请输入回复书编号"/>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="$message('查询')">查询</el-button>
            <el-button @click="$message('重置成功')">重置</el-button>
            <el-button @click="$message('更多查询')">更多查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="待移交" name="first"/>
          <el-tab-pane label="批准移交" name="second"/>
          <el-tab-pane label="待处理" name="third"/>
          <el-tab-pane label="回复审核" name="fourth"/>
          <el-tab-pane label="待确认" name="fifth"/>
          <el-tab-pane label="已完成" name="sixth"/>
          <el-tab-pane label="全部" name="seventh"/>
        </el-tabs>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div v-if="activeName == 'first'">
                <el-button
                  :ab="scope.$index"
                  size="mini"
                  @click="dialogVisible= true">整改查看</el-button>
                <el-button
                  size="mini"
                  @click="dialogYiJiaoVisible = true">移交</el-button>
                <el-button
                  size="mini">闭环</el-button>
                <el-button
                  size="mini"
                  @click="$router.push({ path: '/paifa' })">复查</el-button>
              </div>
              <el-button
                v-else-if="activeName == 'second'"
                size="mini"
                @click="dialogYiJiaoVisible = true">审核移交</el-button>
              <el-button
                v-else-if="activeName == 'third'"
                size="mini"
                @click="dialogYiJiaoVisible = true">处理</el-button>
              <el-button
                v-else-if="activeName == 'fourth'"
                size="mini"
                @click="dialogYiJiaoVisible = true">审核</el-button>
              <el-button
                v-else-if="activeName == 'fifth'"
                size="mini"
                @click="dialogYiJiaoVisible = true">确认</el-button>
              <div v-else-if="activeName == 'sixth'">
                <el-button
                  size="mini"
                  @click="dialogYiJiaoVisible = true">下载</el-button>
                <el-button
                  size="mini"
                  @click="dialogYiJiaoVisible = true">查看</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="180"
            label="指令书"/>
          <el-table-column
            prop="userAddr"
            label="使用单位"/>
          <el-table-column
            prop="address"
            label="单位地址"/>
          <el-table-column
            prop="desc"
            label="问题描述"/>
          <el-table-column
            prop="date"
            width="120"
            label="指令书日期"/>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next, jumper"/>
      </div>
    </div>
    <!-- 整改信息 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      title="整改信息查看">
      <span><img src="@/assets/zhilingshu.png" style="width:100%"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 指令书 -->
    <el-dialog
      :visible.sync="dialogYiJiaoVisible"
      :before-close="handleClose"
      width="50%"
      title="指令书信息">
      <span v-if="activeName == 'first'"><img src="@/assets/zhilingshu1.png" style="width:100%"></span>
      <span v-else-if="activeName == 'second'">
        <img src="@/assets/zhilingshu2.png" style="width:100%">
        <img src="@/assets/zhilingshu3.png" style="width:100%">
      </span>
      <span v-else-if="activeName == 'third'">
        <img src="@/assets/zhilingshu4.png" style="width:100%">
        <img src="@/assets/zhilingshu5.png" style="width:100%">
      </span>
      <span v-else-if="activeName == 'fourth'">
        <img src="@/assets/zhilingshu4.png" style="width:100%">
        <img src="@/assets/zhilingshu6.png" style="width:100%">
      </span>
      <span v-else-if="activeName == 'fifth'">
        <img src="@/assets/zhilingshu4.png" style="width:100%">
        <img src="@/assets/zhilingshu7.png" style="width:100%">
        <img src="@/assets/zhilingshu8.png" style="width:100%">
      </span>
      <span v-else-if="activeName == 'sixth'">
        <img src="@/assets/zhilingshu4.png" style="width:100%">
        <img src="@/assets/zhilingshu7.png" style="width:100%">
        <img src="@/assets/zhilingshu9.png" style="width:100%">
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="activeName == 'first'" type="primary" @click="isOk">移交</el-button>
        <el-button v-if="activeName == 'first'" type="primary" @click="isOk">保存</el-button>
        <el-button v-else type="primary" @click="isOk">确认</el-button>
        <el-button @click="dialogYiJiaoVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <vue-preview :slides="slides" />
    </el-dialog>
  </div>
</template>

<script>
import img from '@/assets/renwushu1.jpg'
import imgs from '@/assets/renwushu2.jpg'
export default {
  data() {
    return {
      dialogYulanVisible: false,
      dialogYiJiaoVisible: false,
      dialogVisible: false,
      activeName: 'first',
      tableData: [{
        name: '[2018]第（5477）号',
        userAddr: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        desc: '在用的一台叉车（无铭牌）未按照规定办理使用登记；另外两台叉车（证号∶厂内粤A03211、车粤EM0174）检验不合格。',
        date: '2019-03-07'
      }],
      AddrOptions: [{
        value: '西南',
        label: '西南'
      }, {
        value: '乐平',
        label: '乐平'
      }, {
        value: '云东海',
        label: '云东海'
      }, {
        value: '南边',
        label: '南边'
      }, {
        value: '六和',
        label: '六和'
      }],
      addrSel: '',
      list: [
        { src: img, msrc: img, w: 600, h: 800 },
        { src: imgs, msrc: imgs, w: 600, h: 800 }
      ],
      slides: []
    }
  },
  methods: {
    isOk() {
      this.dialogYiJiaoVisible = false
      this.dialogVisible = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zhilingshu {
  background: #f2f2f2;
  padding: 16px;
  .zhilingshuMg {
    border-radius: 8px;
    background: #ffffff;
    padding: 16px;
    .search {
      .row {
        padding: 16px 0;
      }
      .input {max-width: 220px;}
    }
    .table {padding-top:16px;}
    .page {
      display: flex;
      justify-content: center;
      padding-top: 16px;
    }
  }
  .vistul { }
}
</style>
