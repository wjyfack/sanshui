<template>
  <div class="shebei">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div class="search">
          <label for="" class="label">使用单位：</label>
          <el-input v-model="danwei" class="input" placeholder="系统自动导入" />
          <label for="" class="label">设备种类：</label>
          <el-select v-model="equipmentTypeChecked" placeholder="请选择" class="select">
            <el-option
              v-for="item in equipmentType"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-button type="primary" @click="$message('查询')">查询</el-button>
          <el-button @click="$message('重置成功')">重置</el-button>
          <el-button @click="dialogVisible = true">更多查询</el-button>
        </div>
        <div class="searchs">
          <label for="" class="label">使用登记证：</label>
          <el-input v-model="dejizheng" class="input" placeholder="系统自动导入" />
        </div>
      </el-row>
    </div>
    <div class="shebeiTable">
      <div class="btn-group">
        <el-button icon="el-icon-plus" type="primary" @click="dialogAddVisible = true">新增</el-button>
        <el-button @click="toRouter">派发任务</el-button>
        <el-button @click="$message('导出Excel')">导出Excel</el-button>
      </div>
      <div class="notice"><span>已选择</span><span class="col">4</span><span>项   服务调用总计：36.4 万<span class="col">清空</span></span></div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="dialogInfoVisible = true">详情</el-button>
            <el-button
              :ab="scope.$index"
              size="mini"
              type="danger"
              @click="$message('编辑')">编辑</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="dengji"
          label="使用登记证"
          min-width="150"/>
        <el-table-column
          prop="useAddress"
          label="使用单位"
          min-width="150"/>
        <el-table-column
          prop="address"
          label="使用单位地址"
          min-width="150"/>
        <el-table-column
          prop="status"
          label="状态"
          width="100"/>
        <el-table-column
          prop="bianhao"
          label="设备出厂编号"
          min-width="150"/>
        <el-table-column
          prop="nextDate"
          label="下次年检日期"
          min-width="150"/>
        <el-table-column
          prop="city"
          label="所在镇街"
          min-width="150"/>
      </el-table>
      <div class="page">
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next, jumper"/>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
      title="">
      <div class="dialogForm">
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">使用登记证：</label><el-input class="input" placeholder="请输入使用登记证"/></el-col>
          <el-col :span="12">
            <label for="" class="label">状态：</label>
            <el-select v-model="statusChecked" placeholder="请选择">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">使用单位：</label><el-input class="input" placeholder="请输入使用单位"/></el-col>
          <el-col :span="12">
            <label for="" class="label">设备种类：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in equipmentType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">出厂编号：</label><el-input class="input" placeholder="请输入出厂编号"/></el-col>
          <el-col :span="12"><label for="" class="label">维保单位：</label><el-input class="input" placeholder="请输入维保单位"/></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label">设备检查状态：</label>
            <el-select v-model="checkStatusChecked" placeholder="请选择">
              <el-option
                v-for="item in checkStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
          <el-col :span="12">
            <label for="" class="label">是否超期：</label>
            <el-select v-model="overdueChecked" placeholder="请选择">
              <el-option
                v-for="item in overdue"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <label for="" class="label">年检日期：</label>
            <el-date-picker
              v-model="inspectionDate"
              type="daterange"
              range-separator="~"
              start-placeholder="年/月/日"
              end-placeholder="年/月/日"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <label for="" class="label">地区选择：</label>
          <el-cascader
            :options="options"/>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">查询</el-button>
        <el-button @click="dialogVisible = false">重置</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      :visible.sync="dialogInfoVisible"
      :before-close="handleClose"
      width="50%"
      title="">
      <div class="infoDialog">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-row type="flex" align="middle" class="row pd-top">
              <el-col :span="16"><span class="name">设备类型</span><span class="info">叉车</span> </el-col>
              <el-col :span="8"><span class="name">设备状态</span><span class="info">1</span> </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <el-col :span="8"><span class="name">设备编号</span><span class="info">123</span> </el-col>
              <el-col :span="8"><span class="name">设备名称</span><span class="info">叉车</span> </el-col>
              <el-col :span="8"><span class="name">上次检验日期</span><span class="info">2017-08-24</span> </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <el-col :span="8"><span class="name">设备型号</span><span class="info">CPPC45</span> </el-col>
              <el-col :span="8"><span class="name">设备注册号</span><span class="info">/</span> </el-col>
              <el-col :span="8"><span class="name">上次检验日期</span><span class="info">2017-08-24</span> </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <el-col :span="8"><span class="name">使用证编号</span><span class="info">CPPC45</span> </el-col>
              <el-col :span="8"><span class="name">设备出厂编号</span><span class="info">DUH#333</span> </el-col>
              <el-col :span="8"><span class="name">设备系统编号</span><span class="info">GDFSCC42231</span> </el-col>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <span class="name">使用单位部门地址</span><span class="info">西瞧工业园</span>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <span class="name">设备安装地址</span><span class="info">西瞧工业园</span>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <span class="name">经纬度</span><span class="info">/</span>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <span class="name">设备详情</span><span class="info">123</span>
            </el-row>
            <el-row type="flex" align="middle" class="row pd-top">
              <span class="name">设备相册</span><span class="info">123</span>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="单位信息" name="second">
            <div>
              <div class="titles">使用单位信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="12"><span class="name">使用单位名称</span><span class="info">佛山南海宝力</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系人</span><span class="info">xxx</span> </el-col>
                <el-col :span="12"><span class="name">联系电话</span><span class="info">13928515448</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系地址</span><span class="info">西瞧工业园</span> </el-col>
              </el-row>
            </div>
            <div>
              <div class="titles">制造单位信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="12"><span class="name">制造单位名称</span><span class="info">佛山南海宝力</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系人</span><span class="info">xxx</span> </el-col>
                <el-col :span="12"><span class="name">联系电话</span><span class="info">13928515448</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系地址</span><span class="info">西瞧工业园</span> </el-col>
              </el-row>
            </div>
            <div>
              <div class="titles">安装单位信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="12"><span class="name">安装单位名称</span><span class="info">佛山南海宝力</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系人</span><span class="info">xxx</span> </el-col>
                <el-col :span="12"><span class="name">联系电话</span><span class="info">13928515448</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系地址</span><span class="info">西瞧工业园</span> </el-col>
              </el-row>
            </div>
            <div>
              <div class="titles">维保单位信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="12"><span class="name">维保单位名称</span><span class="info">佛山南海宝力</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系人</span><span class="info">xxx</span> </el-col>
                <el-col :span="12"><span class="name">联系电话</span><span class="info">13928515448</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="12"><span class="name">联系地址</span><span class="info">西瞧工业园</span> </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="检验所信息" name="third">
            <div>
              <div class="titles">定期检验信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="8"><span class="name">上次检验结论</span><span class="info">合格</span> </el-col>
                <el-col :span="8"><span class="name">上次检验日期</span><span class="info">2015</span> </el-col>
                <el-col :span="8"><span class="name">下次检验日期</span><span class="info">2017</span> </el-col>
              </el-row>
            </div>
            <div>
              <div class="titles">年度检验信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="8"><span class="name">上次检验结论</span><span class="info">合格</span> </el-col>
                <el-col :span="8"><span class="name">上次检验日期</span><span class="info">2015</span> </el-col>
                <el-col :span="8"><span class="name">下次检验日期</span><span class="info">2017</span> </el-col>
              </el-row>
            </div>
            <div>
              <div class="titles">耐压检验信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="8"><span class="name">上次检验结论</span><span class="info">合格</span> </el-col>
                <el-col :span="8"><span class="name">上次检验日期</span><span class="info">2015</span> </el-col>
                <el-col :span="8"><span class="name">下次检验日期</span><span class="info">2017</span> </el-col>
              </el-row>
            </div>
            <div>
              <div class="titles">约检通知信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="8"><span class="name">登记人</span><span class="info">胡星系</span> </el-col>
                <el-col :span="8"><span class="name">登记时间</span><span class="info">2015</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="8"><span class="name">登记人</span><span class="info">胡星系</span> </el-col>
                <el-col :span="8"><span class="name">登记时间</span><span class="info">2015</span> </el-col>
              </el-row>
              <el-row type="flex" align="middle" class="row">
                <el-col :span="8"><span class="name">通知结果描述</span><span class="info">已通知xxx</span> </el-col>
                <el-col :span="8"><span class="name">联系人</span><span class="info">158206845114</span> </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务信息" name="fourth">
            <el-table
              ref="singleTable"
              :data="tableData"
              highlight-current-row
              style="width: 100%"
              @current-change="handleCurrentChange">
              <el-table-column
                type="index"
                width="50"/>
              <el-table-column
                property="date"
                label="任务编号"/>
              <el-table-column
                property="name"
                label="任务类型"/>
              <el-table-column
                property="address"
                label="接收部门"/>
              <el-table-column
                property="address"
                label="接收人"/>
              <el-table-column
                property="address"
                label="检查状态"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="参数信息" name="fifth">
            <div>
              <div class="titles">起重机械-参数信息</div>
              <el-row type="flex" align="middle" class="row pd-top">
                <el-col :span="8"><span class="name">起重机械</span><span class="info">2.0</span> </el-col>
                <el-col :span="8"><span class="name">跨度</span><span class="info">12</span> </el-col>
                <el-col :span="8"><span class="name">最大起升高度</span><span class="info">20</span> </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInfoVisible = false">确认</el-button>
        <el-button @click="dialogInfoVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      :visible.sync="dialogAddVisible"
      :before-close="handleClose"
      width="60%"
      title="新增">
      <div class="addDialog dialogForm">
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备类型</label>
            <el-select placeholder="请选择">
              <el-option>123</el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备状态</label>
            <el-select placeholder="请选择">
              <el-option>123</el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备编号</label>
            <el-input class="input" placeholder="请输入设备编号"/>
          </el-col>
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备名称</label>
            <el-input class="input" placeholder="请输入设备名称"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备型号</label>
            <el-input class="input" placeholder="请输入设备型号"/>
          </el-col>
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备注册号</label>
            <el-input class="input" placeholder="请输入设备注册号"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>使用证编号</label>
            <el-input class="input" placeholder="请输入使用证编号"/>
          </el-col>
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>设备出厂编号</label>
            <el-input class="input" placeholder="请输入设备出厂编号"/>
          </el-col>
        </el-row>
        <el-row class="row">
          <label for="" class="label"><span class="red">*</span>设备安装地址</label>
          <el-select placeholder="请选择">
            <el-option>123</el-option>
          </el-select>
        </el-row>
        <el-row class="row">
          <label for="" class="label"><span class="red">*</span>详细地址</label>
          <el-input class="input" placeholder="请输入详细地址"/>
        </el-row>
        <el-row class="row">
          <label for="" class="label">经纬度</label>
          <el-input class="input" style="max-width:100px" placeholder="经度坐标"/>
          <span>/</span>
          <el-input class="input" style="max-width:100px" placeholder="维度坐标"/>
          <el-button icon="el-icon-edit" type="primary">选择</el-button>
          <el-checkbox>重点监控设备</el-checkbox>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label"><span class="red">*</span>使用单位名称</label>
          <el-input placeholder="请输入使用单位名称">
            <el-button slot="append" icon="el-icon-search"/>
          </el-input>
        </el-row>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label">使用单位联系人</label>
            <el-input class="input" placeholder="请输入使用单位联系人"/>
          </el-col>
          <el-col :span="12">
            <label for="" class="label">使用单位电话</label>
            <el-input class="input" placeholder="请输入使用单位电话"/>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label">使用单位地址</label>
          <el-input placeholder="请输入使用单位地址"/>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label">设备详情</label>
          <el-input type="textarea" placeholder="请输入设备详情"/>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isOk">查询</el-button>
        <el-button @click="dialogAddVisible = false">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { equipmentType, status, checkStatus, overdue } from '@/utils/config'
export default {
  data() {
    return {
      equipmentType,
      status,
      checkStatus,
      overdue,
      // 已选择状态
      equipmentTypeChecked: '',
      statusChecked: '',
      checkStatusChecked: '',
      overdueChecked: '',
      inspectionDate: '', // 年检

      options: [],
      activeName: 'first',
      dialogAddVisible: false,
      dialogInfoVisible: false,
      dialogVisible: false,
      danwei: '',
      dejizheng: '',
      value: '',
      tableData3: [{
        dengji: '起粤EM9888',
        useAddress: '佛山市南海港鹏五金销售部',
        address: '百西大地坑岑张家村前朗',
        status: '在用',
        bianhao: '41704406002010090222',
        nextDate: '2018-12-03 16:47:38',
        city: '桂城'
      }],
      tableData: [],
      multipleSelection: []
    }
  },
  mounted() {},
  methods: {
    isOk() {
      this.dialogAddVisible = false
      this.dialogVisible = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    },
    toRouter() { this.$router.push({ path: '/paifa' }) },
    handleClose(done) { done() },
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
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .shebei {
    background: #f2f2f2;
    color: #666666;
    font-size: 14px;
    padding: 30px;

    .shebeiSearch {
      padding: 16px;
      border-radius: 8px;
      background: #ffffff;
      label {text-align: right;min-width: 100px;}
      .search {
        display: flex;
        align-items: center;
      }
      .input {width: 200px;margin-right: 30px;}
      .select {margin-right: 15px;}
      .searchs {
        margin-top: 16px;
        display: flex;
        align-items: center;
      }
    }
    .shebeiTable {
     margin-top: 16px;
     padding: 16px;
     border-radius: 8px;
     background: #ffffff;
     .btn-group {
       padding-bottom: 16px;
     }
     .notice {
       background: rgba(230, 246, 255, 1);
       border: 1px solid rgba(186, 231, 255, 1);
       border-radius: 4px;
       height: 40px;
       padding: 0 32px;
       line-height: 40px;
       margin-bottom: 16px;
       .col {color:#1890ff;}
     }
     .page {
       display: flex;
       justify-content: flex-end;
       padding-top: 16px;
     }
    }
    .dialogForm {
      .row {padding-bottom: 16px;}
      .input {max-width: 220px;}
      .label {
        min-width: 120px;
        display: inline-block;
        .red {color: red}
      }
    }
    .infoDialog {
      .titles {
        padding: 10px;
        color:#191919;
        background: #EDEFF4
      }
      .pd-top{padding-top: 16px;}
      .row {
        padding-bottom: 16px;
        .name {
          color: #737C8A;
          display: inline-block;
          margin-right: 5px;
        }
        .info {
          color:#191919;
        }
      }
    }
  }

</style>
