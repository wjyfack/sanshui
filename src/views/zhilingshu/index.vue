<template>
  <div class="zhilingshu">
    <div class="zhilingshuMg">
      <div class="search">
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">任务编号：</label>
            <el-input v-model="search.checkNo" class="input" placeholder="请输入任务编号"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">使用单位：</label>
            <el-input v-model="search.deviceUseName" class="input" placeholder="请输入使用单位"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">使用登记证：</label>
            <el-input v-model="search.deviceCertNo" class="input" placeholder="请输入使用登记证"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">指令书编号：</label>
            <el-input v-model="search.commandNo" class="input" placeholder="请输入指令书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">所属镇街：</label>
            <el-select v-model="search.deviceAreaName4" placeholder="请选择" clearable>
              <el-option
                v-for="item in townType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">移交书编号：</label>
            <el-input v-model="search.instructionNo" class="input" placeholder="请输入移交书编号"/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">回复书编号：</label>
            <el-input v-model="search.recallNo" class="input" placeholder="请输入回复书编号"/>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="toSearch">查询</el-button>
            <el-button @click="$message('重置成功')">重置</el-button>
            <el-button @click="$message('更多查询')">更多查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="镇街移交" name="first"/>
          <el-tab-pane label="待移交" name="second"/>
          <el-tab-pane label="批准移交" name="third"/>
          <el-tab-pane label="待处理" name="fourth"/>
          <el-tab-pane label="回复审核" name="fifth"/>
          <el-tab-pane label="待确认" name="sixth"/>
          <el-tab-pane label="已完成" name="seventh"/>
          <el-tab-pane label="全部" name="8"/>
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
                @click="dialogShenHeYiJiaoVisible = true">审核移交</el-button>
              <el-button
                v-else-if="activeName == 'third'"
                size="mini"
                @click="dialogChuLiVisible = true">处理</el-button>
              <el-button
                v-else-if="activeName == 'fourth'"
                size="mini"
                @click="dialogShenHeVisible = true">审核</el-button>
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
          :total="instructionTotal"
          background
          layout="prev, pager, next, jumper"
          @current-change="pageCurrChange"
          @size-change="pageSizeChange"/>
      </div>
    </div>
    <!-- 整改信息 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="50%"
      title="整改信息查看">
      <el-form label-width="120px" class="dialog">
        <el-row class="row">
          <el-form-item label="整改图片：">
            <img v-for="(item, index) in recitfy.recitfyImgs" :key="index" src="http://placehold.it/100x100" alt="" srcset="" style="margin-right:10px;">
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="整改文字：">
            <el-input v-model="recitfy.recitfyTitle" placeholder="企业编写文字说明（非必填）" class="textarea"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="审核动作：" required>
            <el-radio-group v-model="recitfy.examineStatus">
              <el-radio :label="3">通过</el-radio>
              <el-radio :label="6">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="审核描述：" required>
            <el-input v-model="recitfy.examineDesc" type="textarea" placeholder="审核描述" class="textarea"/>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recitfyInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 指令书 -->
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <vue-preview :slides="slides" />
    </el-dialog>
    <!-- 移交 -->
    <el-dialog
      :visible.sync="dialogYiJiaoVisible"
      :before-close="handleClose"
      width="50%"
      title="移交">
      <taskDetail />
      <comInfo />
      <transferInfo />
    </el-dialog>
    <!-- 审核移交 -->
    <el-dialog
      :visible.sync="dialogShenHeYiJiaoVisible"
      :before-close="handleClose"
      width="50%"
      title="审核移交">
      <taskDetail />
      <comInfo />
      <instrucInfo/>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog
      :visible.sync="dialogChuLiVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <div class="task-detail">
        <el-row><div class="bianhao"><label for="">任务编号：234231028321</label></div></el-row>
        <div class="detail">
          <div class="item">
            <span class="name">处理人：</span> <div class="info">qulili</div>
            <span class="name">处理方式：</span> <div class="info">下指令书</div>
          </div>
          <div class="item">
            <span class="name">执行时间：</span> <div class="info">2017</div>
            <span class="name">关联指令书编号：</span> <div class="info">[2109]第1</div>
          </div>
          <div class="item">
            <span class="name">指令书日期：</span> <div class="info">2017</div>
            <span class="name">备注：</span> <div class="info">请于两个</div>
          </div>
          <div class="item">
            <el-button type="text">详情</el-button>
          </div>
          <div class="btn-group">
            <el-button type="warning" size="small">检查记录预览</el-button>
            <el-button type="warning" size="small">指令书预览</el-button>
          </div>
        </div>
        <div class="bianhao"><label for="">企业信息</label></div>
        <div class="detail">
          <div class="item">
            <span class="name">使用单位：</span> <div class="info">付小小</div>
            <span class="name">联系人:</span> <div class="info">小明</div>
          </div>
          <div class="item">
            <span class="name">联系电话：</span> <div class="info">1810 0000 000</div>
            <span class="name">联系地址：</span> <div class="info">佛山市南海区</div>
          </div>
        </div>
        <table class="table">
          <tr>
            <th>设备种类</th>
            <th>使用登记证</th>
            <th>出厂编号</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>电梯</td>
            <td>EM粤5505</td>
            <td>123456</td>
            <td>123456</td>
          </tr>
        </table>
        <div class="bianhao"><label for="">移交信息</label></div>
        <el-row class="row">
          <span class="label">移交书编号</span>
          <span class="mes">南质2193第00053号</span>
          <el-button type="primary" size="small">预览移交书</el-button>
          <el-button type="primary" size="small">下载移交书</el-button>
        </el-row>
        <el-row class="row">
          <el-col :span="12" type="flex">
            <span class="label">任务移交人</span>
            <span class="mes">超级管理员</span>
          </el-col>
          <el-col :span="12" type="flex">
            <span class="label">移交人部门</span>
            <span class="mes">质监局</span>
          </el-col>
        </el-row>
        <el-row class="row">
          <span class="label">移交书日期</span>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期"/>
        </el-row>
        <el-row class="row" type="flex">
          <span class="label">任务移交描述</span>
          <span class="mes">任务移交描述</span>
        </el-row>
        <div class="bianhao"><label for="">回复书信息</label></div>
        <el-row type="flex" align="middle" class="row">
          <el-col :span="12">
            <span class="label"><span class="red">*</span> 任务状态</span>
            <span class="mes">三质监稽[2019]第0052号</span>
          </el-col>
          <el-col :span="12">
            <span class="label">回复书日期</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <span class="label"><span class="red">*</span> 是否立案</span>
          <el-radio-group v-model="radio2">
            <el-radio :label="3">立案查处</el-radio>
            <el-radio :label="6">不予立案</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="row" type="flex">
          <span class="label"><span class="red">*</span>任务移交描述</span>
          <el-input type="textarea" class="textarea"/>
        </el-row>
        <el-row type="flex" class="row">
          <span class="label"><span class="red">*</span>任务回复相册</span>
          <el-upload
            :show-file-list="false"
            class="avatar-uploader"
            action="">
            <i class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isOk">确认</el-button>
        <el-button @click="dialogChuLiVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog
      :visible.sync="dialogShenHeVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <div class="task-detail">
        <!-- 任务信息 -->
        <taskDetail />
        <!-- 企业信息 -->
        <comInfo />
        <!-- 移交信息 -->
        <yijiaoInfo />
        <!-- 回复书信息 -->
        <replyLetterInfo/>
        <div class="bianhao"><label for="">审核状态</label></div>
        <el-row class="row" type="flex">
          <el-col :span="12">
            <span class="label"><span class="red">*</span> 任务状态</span>
            <el-radio-group v-model="radio2">
              <el-radio :label="3">通过</el-radio>
              <el-radio :label="6">不通过</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row type="flex" class="row">
          <span class="label"><span class="red">*</span> 任务描述</span>
          <el-input type="textarea" placeholder="请输入描述"/>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isOk">确认</el-button>
        <el-button @click="dialogShenHeVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { townType } from '@/utils/config'
import { mapGetters } from 'vuex'
import comInfo from './component/comInfo'
import instrucInfo from './component/instrucInfo'
import taskDetail from './component/taskDetail'
import transferInfo from './component/transferInfo'
import replyLetterInfo from './component/replyLetterInfo'
import yijiaoInfo from './component/yijiaoInfo'
import img from '@/assets/renwushu1.jpg'
import imgs from '@/assets/renwushu2.jpg'
export default {
  components: {
    transferInfo,
    comInfo,
    instrucInfo,
    taskDetail,
    replyLetterInfo,
    yijiaoInfo
  },
  data() {
    return {
      townType,
      search: {
        checkNo: '', // 任务编号
        deviceUseName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        deviceAreaName4: '', // 镇街
        instructionNo: '', // 移交书编号
        recallNo: '' // 回复书编号
      },
      pageSize: 10,
      pageNum: 1,
      recitfy: { // 整改信息查看
        recitfyImgs: [], // 图片
        recitfyTitle: '', // 整改文字
        examineStatus: '', // 审核动作
        examineDesc: '' // 审核描述
      },
      // yuanshi
      dialogShenHeVisible: false,
      dialogChuLiVisible: false,
      dialogShenHeYiJiaoVisible: false,
      dialogYulanVisible: false,
      dialogYiJiaoVisible: false,
      dialogVisible: false,
      activeName: 'first',
      radio2: '',
      value1: '', // 后期删除
      tableData: [{
        name: '[2018]第（5477）号',
        userAddr: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        desc: '在用的一台叉车（无铭牌）未按照规定办理使用登记；另外两台叉车（证号∶厂内粤A03211、车粤EM0174）检验不合格。',
        date: '2019-03-07'
      }],
      addrSel: '',
      list: [
        { src: img, msrc: img, w: 600, h: 800 },
        { src: imgs, msrc: imgs, w: 600, h: 800 }
      ],
      slides: []
    }
  },
  computed: {
    ...mapGetters([
      'instructionTotal',
      'instructionList'
    ])
  },
  methods: {
    /** 整改信息 */
    recitfyInfo() {
      console.log(JSON.stringify(this.recitfy))
      this.dialogVisible = false
    },
    toSearch() {
      this.pageSize = 10
      this.pageNum = 1
      this.fecthData()
    },
    fecthData() { // 获取数据
      const {
        checkNo, // 任务编号
        deviceUseName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        recallNo // 回复书编号
      } = this.search
      const data = {
        checkNo, // 任务编号
        deviceUseName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        recallNo, // 回复书编号
        pageSize: `${this.pageSize}`,
        pageNum: `${this.pageNum}`
      }
      console.log(data)
    },
    pageSizeChange(event) {
      this.pageSize = event
      this.fecthData()
    },
    pageCurrChange(event) {
      this.pageNum = event
      this.fecthData()
    },
    isOk() {
      this.dialogYiJiaoVisible = false
      this.dialogVisible = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    handleClose(done) { // 弹窗关闭方法
      done()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zhilingshu {
  background: #f2f2f2;
  padding: 16px;
  font-size: 14px;
  .zhilingshuMg {
    border-radius: 8px;
    background: #ffffff;
    padding: 16px;
    .search {
      .label {
        display: inline-block;
        text-align: left;
        width: 130px;
      }
      .row {
        padding-bottom: 16px;
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
  .dialog {
    .row {
      padding: 16px 0;
      .label {display: inline-block; width: 100px;text-align: right;}
      .input {width: 220px;}
      .textarea {flex: 1;}
    }
  }
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
          text-align: right;
        }
        .info {
          min-width: 150px;
          color:#999999;
        }
      }
    }
    .btn-group {
      position: absolute;
      right: 5px;
      top: 60px;
    }
    .table {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      background: #999999;
      td, th {
        padding:10px 0;
        background: #ffffff;
      }
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
}
</style>
