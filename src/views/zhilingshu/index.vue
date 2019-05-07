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
            <el-input v-model="search.companyUseNewName" class="input" placeholder="请输入使用单位"/>
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
            <el-input v-model="search.commandReplyNo" class="input" placeholder="请输入回复书编号"/>
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
          <el-tab-pane label="全部" name="eight"/>
        </el-tabs>
        <el-table
          v-loading="loading"
          :data="instructionList"
          style="width: 100%">
          <el-table-column
            fixed
            width="400"
            label="操作">
            <template slot-scope="scope">
              <div v-if="activeName == 'first'">
                <el-button
                  :ab="scope.$index"
                  size="mini"
                  @click="recitfyDialog(scope.row)">整改查看</el-button>
                <el-button
                  size="mini"
                  @click="yijiaoDialog(scope.row)">移交</el-button>
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
                @click="zSure">确认</el-button>
              <div v-else-if="activeName == 'sixth'">
                <el-button
                  size="mini"
                  @click="dialogYiJiaoVisible = true">下载</el-button>
                <el-button
                  size="mini"
                  @click="zLook">查看</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="commandNo"
            width="180"
            label="指令书"/>
          <el-table-column
            prop="companyUseNewName"
            label="使用单位"/>
          <el-table-column
            prop="companyUseFullAddress"
            label="单位地址"/>
          <el-table-column
            prop="commandDeviceProblem"
            label="问题描述"/>
          <el-table-column
            prop="commandTransferNo"
            label="移交书编号"/>
          <el-table-column
            prop="commandReplyNo"
            label="回复书编号"/>
          <el-table-column
            prop="commandDate"
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
            <img v-for="(item, index) in recitfy.rectifyImg" :key="index" :src="baseUrl+item" alt="" srcset="" style="margin-right:10px;">
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="整改文字：">
            <el-input v-model="recitfy.rectifyRemark" placeholder="企业编写文字说明（非必填）" class="textarea"/>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="审核动作：" required>
            <el-radio-group v-model="recitfy.rectifyStatus">
              <el-radio :label="'2'">通过</el-radio>
              <el-radio :label="'3'">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row class="row">
          <el-form-item label="审核描述：" required>
            <el-input v-model="recitfy.rectifyAuditInfo" type="textarea" placeholder="审核描述" class="textarea"/>
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
      <taskDetail :transfe="transfe"/>
      <comInfo :transfe="transfe"/>
      <transferInfo @closed="dialogYiJiaoVisible = false"/>
    </el-dialog>
    <!-- 审核移交 -->
    <el-dialog
      :visible.sync="dialogShenHeYiJiaoVisible"
      :before-close="handleClose"
      width="50%"
      title="审核移交">
      <taskDetail />
      <comInfo />
      <instrucInfo @closed="dialogShenHeYiJiaoVisible = false"/>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog
      :visible.sync="dialogChuLiVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <taskDetail />
      <comInfo />
      <yijiaoInfo />
      <replyLetterSub @closed="dialogChuLiVisible = false"/>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog
      :visible.sync="dialogShenHeVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <!-- 任务信息 -->
      <taskDetail />
      <!-- 企业信息 -->
      <comInfo />
      <!-- 移交信息 -->
      <yijiaoInfo />
      <!-- 回复书信息 -->
      <replyLetterInfo/>
      <examineSub @closed="dialogShenHeVisible = false"/>
    </el-dialog>
    <!-- 确认 -->
    <el-dialog
      :visible.sync="dialogSureVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <taskDetail />
      <comInfo />
      <yijiaoInfo />
      <replyLetterInfo />
      <examineSub @closed="dialogSureVisible = false"/>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog
      :visible.sync="dialogLookVisible"
      :before-close="handleClose"
      width="50%"
      title="处理">
      <taskDetail />
      <comInfo />
      <zhilingshuInfo />
      <yijiaoInfo />
      <replyLetterInfo />
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
import replyLetterSub from './component/replyLetterSub'
import examineSub from './component/examineSub'
import zhilingshuInfo from './component/zhilingshuInfo'
import { fetchBeforeRectify, fetchRectify, fetchBeforeTransfe } from '@/api/instruction'
import { baseUrl } from '@/utils/config'
export default {
  components: {
    transferInfo,
    comInfo,
    instrucInfo,
    taskDetail,
    replyLetterInfo,
    yijiaoInfo,
    replyLetterSub,
    zhilingshuInfo,
    examineSub
  },
  data() {
    return {
      baseUrl: `${baseUrl}/file/show/rectify/`,
      townType,
      loading: false,
      search: {
        checkNo: '', // 任务编号
        companyUseNewName: '', // 使用单位
        deviceCertNo: '', // 使用登记证
        commandNo: '', // 指令书编号
        deviceAreaName4: '', // 镇街
        instructionNo: '', // 移交书编号 (没)
        commandReplyNo: '', // 回复书编号
        commandExecTaskStatus: '1' // 1 镇街待移交 12 区局待移交 7 批准移交 3 待处理 8回复审核 4 待确认  5:完成
      },
      pageSize: 10,
      pageNum: 1,
      recitfy: { // 整改信息查看
        rectifyImg: [], // 图片
        rectifyAuditInfo: '', // 整改文字
        rectifyStatus: '', // 审核动作
        rectifyRemark: '' // 审核描述
      },
      // yuanshi
      dialogShenHeVisible: false,
      dialogChuLiVisible: false,
      dialogShenHeYiJiaoVisible: false,
      dialogYulanVisible: false,
      dialogYiJiaoVisible: false,
      dialogSureVisible: false,
      dialogLookVisible: false,
      dialogVisible: false,
      activeName: 'first',
      transfe: {}, // 移交前查的数据
      radio2: '',
      value1: '', // 后期删除
      addrSel: '',
      list: [
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
  watch: {
    activeName(newValue, oldValue) {
      console.log(newValue, oldValue)
      /**
      * 1 镇街待移交 12 区局待移交 7 批准移交 3 待处理
       8回复审核 4 待确认  5:完成
       */
      let status = ''
      switch (newValue) {
        case 'first':
          status = '1'
          break
        case 'second':
          status = '12'
          break
        case 'third':
          status = '7'
          break
        case 'fourth':
          status = '3'
          break
        case 'fifth':
          status = '8'
          break
        case 'sixth':
          status = '4'
          break
        case 'seventh':
          status = '5'
          break
        case 'eight':
          status = ''
          break
      }
      this.search.commandExecTaskStatus = status
      this.fecthData()
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    zSure() {
      this.dialogSureVisible = true
    },
    /** 查看 */
    zLook() {
      this.dialogLookVisible = true
    },
    /** 移交 */
    yijiaoDialog(row) {
      fetchBeforeTransfe(row.id).then(res => {
        const data = res.returnData
        this.transfe = data
        this.dialogYiJiaoVisible = true
      })
    },
    /** 整改查看 */
    recitfyDialog(row) {
      fetchBeforeRectify(row.id).then(res => {
        const data = res.returnData
        if (!data) {
          this.$message('没有数据')
        }
        if (!data.rectifyImg) {
          data.rectifyImg = []
        } else {
          data.rectifyImg = data.rectifyImg.split(',')
        }
        data.id = row.id
        this.recitfy = data
        this.dialogVisible = true
      })
    },
    /** 整改信息 */
    recitfyInfo() {
      const {
        id,
        rectifyStatus,
        rectifyAuditInfo } = this.recitfy
      if (!rectifyAuditInfo) {
        this.$message({ message: '请输入审核描述', type: 'error' })
        return ''
      }
      const data = {
        sourceCommandId: id,
        rectifyStatus,
        rectifyAuditInfo }
      fetchRectify(data).then(res => {
        if (res.returnCode === '000000') {
          this.$message({
            message: res.resultDesc,
            type: 'success'
          })
          this.dialogVisible = false
        } else {
          this.$message({
            message: res.resultDesc,
            type: 'error'
          })
        }
      })
    },
    toSearch() {
      this.pageSize = 10
      this.pageNum = 1
      this.fecthData()
    },
    fecthData() { // 获取数据
      this.loading = true
      const {
        checkNo, // 任务编号
        companyUseNewName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        commandReplyNo, // 回复书编号
        commandExecTaskStatus
      } = this.search
      const data = {
        checkNo, // 任务编号
        companyUseNewName, // 使用单位
        deviceCertNo, // 使用登记证
        commandNo, // 指令书编号
        deviceAreaName4, // 镇街
        instructionNo, // 移交书编号
        commandReplyNo, // 回复书编号
        commandExecTaskStatus,
        pageSize: `${this.pageSize}`,
        pageNum: `${this.pageNum}`
      }
      console.log(data)
      this.$store.dispatch('fetchInstructionList', data).then(() => {
        this.loading = false
      })
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
