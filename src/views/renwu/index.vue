<template>
  <div class="renwu">
    <div class="renwuMg">
      <el-tabs v-model="activeName" @tab-click="renwuTabClick">
        <el-tab-pane label="待派发" name="first"/>
        <el-tab-pane label="待接收" name="second"/>
        <el-tab-pane label="待处理" name="third"/>
        <el-tab-pane label="处理中" name="fourth"/>
        <el-tab-pane label="待审核" name="fifth"/>
        <el-tab-pane label="已完成" name="sixth"/>
        <el-tab-pane label="全部" name="seventh"/>
        <el-tab-pane label="回收站" name="eeee"/>
      </el-tabs>
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
          <el-col v-if="activeName == 'first'" :span="8">
            <el-button type="primary">批量批发</el-button>
            <el-button type="danger">闭环</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == 'second'" :span="8">
            <el-button type="primary">批量接收</el-button>
            <el-button type="primary">导出Excel</el-button>
            <el-button type="danger">删除</el-button>
          </el-col>
          <el-col v-else-if="activeName == 'third'" :span="8">
            <el-button type="primary">新增</el-button>
            <el-button type="danger">闭环</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == 'fourth'" :span="8">
            <el-button type="primary">新增</el-button>
            <el-button type="danger">删除</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
          <el-col v-else-if="activeName == 'fifth'" :span="8">
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">闭环</el-button>
            <el-button type="primary">导出Excel</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="row">
          <el-button type="primary" @click="$message('查询重置成功')">查 询</el-button>
          <el-button @click="$message('重置成功')">重 置</el-button>
          <el-button @click="dialogVisible = true">更多查询</el-button>
        </el-row>
      </div>
      <div class="table">
        <el-table
          v-show="activeName == 'sixth'"
          ref="multipleTables"
          :data="tableData4"
          style="width: 100%">
          <el-table-column label="任务信息">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                click="handleDelete(scope.$index, scope.row)"
                size="mini"
                type="primary"
                icon="el-icon-search"
                @click="dialogDetailVisible = true">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="bianhao"
            label="任务编号"
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
            prop="jiedao"
            label="所属镇街"
            width="100"/>
          <el-table-column
            prop="concat"
            label="联系人"
            min-width="150"/>
          <el-table-column
            prop="phone"
            label="联系电话"
            min-width="150"/>
          <el-table-column v-if="activeName == 'fifth'" label="审核状态">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                size="mini"
                type="primary"
                @click="$message('审核成功')">审核</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="资料整理"
            width="300">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                click="handleDelete(scope.$index, scope.row)"
                size="mini"
                @click="$message('下载')">检查记录表下载</el-button>
              <el-button
                size="mini"
                type="primary">批量下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="activeName != 'sixth'"
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"/>
          <el-table-column
            prop="bianhao"
            label="任务编号"
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
            prop="jiedao"
            label="所属镇街"
            width="100"/>
          <el-table-column
            prop="concat"
            label="联系人"
            min-width="150"/>
          <el-table-column
            prop="phone"
            label="联系电话"
            min-width="150"/>
          <el-table-column v-if="activeName == 'fifth'" label="审核状态">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                size="mini"
                type="primary">审核</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button
                :ab="scope.$index"
                click="handleDelete(scope.$index, scope.row)"
                size="mini"
                @click="dialogInfoVisible = true">设备详情</el-button>
              <el-button
                v-if="activeName == 'first'"
                size="mini"
                type="primary"
                @click="toRouter">派发任务</el-button>
              <el-button
                v-else-if="activeName == 'second'"
                size="mini"
                type="primary">接收任务</el-button>
              <el-button
                v-else-if="activeName == 'third'"
                size="mini"
                type="primary"
                @click="dialogChuliVisible = true">处理</el-button>
              <el-button
                v-else-if="activeName == 'fourth'"
                size="mini"
                type="primary"
                @click="dialogEditVisible = true">编辑</el-button>
              <el-button
                v-else-if="activeName == 'fifth'"
                size="mini"
                type="primary">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next, jumper"/>
      </div>
    </div>
    <!-- 详情 -->
    <el-dialog
      :visible.sync="dialogInfoVisible"
      :before-close="handleClose"
      width="50%"
      title="">
      <div class="more-shebei">
        <el-button type="primary">设备1</el-button>
        <el-button type="primary">设备2</el-button>
        <el-button type="primary">设备3</el-button>
        <el-button type="primary">设备4</el-button>
      </div>
      <div class="infoDialog">
        <el-tabs v-model="activeDialogName">
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
    <!-- 更多搜索 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="60%"
      title="">
      <div class="dialogForm">
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label">任务状态：</label>
            <el-select v-model="taskTypeChecked" placeholder="请选择">
              <el-option
                v-for="item in taskType"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">任务编号：</label><el-input class="input" placeholder="请输入任务编号"/></el-col>
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
          <el-col :span="12"><label for="" class="label">指令书编号：</label><el-input class="input" placeholder="请输入指令书编号"/></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">使用登记证：</label><el-input class="input" placeholder="请输入使用登记证"/></el-col>
          <el-col :span="12"><label for="" class="label">任务派发部门：</label><el-input class="input" placeholder="请输入任务派发部门"/></el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <label for="" class="label">年检日期：</label>
            <el-date-picker
              v-model="dateChecked"
              type="daterange"
              range-separator="~"
              start-placeholder="年/月/日"
              end-placeholder="年/月/日"/>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">查询</el-button>
        <el-button @click="dialogVisible = false">重置</el-button>
      </span>
    </el-dialog>
    <!-- 处理 -->
    <el-dialog
      :visible.sync="dialogChuliVisible"
      :before-close="handleClose"
      width="50%"
      title="">
      <div class="dialogForm">
        <div class="title">单位信息</div>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label"><span class="red">*</span> 单位名称：</label>
          <el-input placeholder="请选择使用单位名称"><el-button slot="append" icon="el-icon-search"/></el-input>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label"><span class="red">*</span>使用单位地址：</label>
          <el-input placeholder="使用单位地址"/>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label">单位法人</label><el-input class="input" placeholder=""/></el-col>
          <el-col :span="12"><label for="" class="label"><span class="red">*</span>单位联系人</label><el-input class="input" placeholder=""/></el-col>
        </el-row>
        <el-row class="row">
          <el-col :span="12"><label for="" class="label"><span class="red">*</span>单位联系方式</label><el-input class="input" placeholder=""/></el-col>
          <el-col :span="12"><label for="" class="label">联系人职务</label><el-input class="input" placeholder=""/></el-col>
        </el-row>
        <div class="title">关联设备</div>
        <el-row class="row">
          <el-col :span="8"><label for="" class="label">使用登记证</label><el-input class="input" placeholder=""/></el-col>
          <el-col :span="8"><label for="" class="label">出厂编号</label><el-input class="input" placeholder=""/></el-col>
          <el-col :span="8">
            <label for="" class="label">违反模板</label>
            <el-select v-model="value" placeholder="请选择违反条例">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <div class="title">检查记录表信息</div>
        <el-row class="row">
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>检查类别</label>
            <el-select v-model="value" placeholder="请选择检查类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
          <el-col :span="12">
            <label for="" class="label"><span class="red">*</span>单位类别</label>
            <el-select v-model="value" placeholder="请选择单位类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="row">
          <el-col>
            <label for="" class="label">检查日期：</label>
            <el-date-picker
              type="daterange"
              range-separator="至"
              start-placeholder="年/月/日"
              end-placeholder="年/月/日"/>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label"><span class="red">*</span>检查问题</label>
          <el-input type="textarea" placeholder="请输入检查问题"/>
        </el-row>
        <el-row class="row">
          <label for="" class="label"><span class="red">*</span>处理措施</label>
          <el-radio-group v-model="radio2">
            <el-radio :label="1">下达指令书</el-radio>
            <el-radio :label="2">直接封查</el-radio>
            <el-radio :label="3">实施扣押</el-radio>
            <el-radio :label="4">其他</el-radio>
          </el-radio-group>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label"><span class="red">*</span>检查意见</label>
          <el-input type="textarea" placeholder="请输入检查意见"/>
        </el-row>
        <el-row type="flex" align="middle" class="row">
          <label for="" class="label"><span class="red">*</span>现场图片</label>
          <el-upload
            :show-file-list="false"
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/">
            <i class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-row>
        <el-row class="row">
          <label for="isZhiLingShu" class="label">是否需要填写指令书</label>
          <el-checkbox id="isZhiLingShu" @change="onCheckbox"/>
        </el-row>
        <div v-show="isShow" class="zhilingshu-info">
          <el-row class="row">
            <label for="" class="label"><span class="red">*</span>指令书编号</label>
            <el-input class="input" placeholder="请输入指令书编号"/>
          </el-row>
          <el-row class="row">
            <label for="" class="label"><span class="red">*</span>指令书流水号</label>
            <el-input class="input" placeholder="请输入指令书流水号"/>
          </el-row>
          <el-row class="row">
            <label for="" class="label"><span class="red">*</span>指令书模板</label>
            <el-select v-model="value" placeholder="请选择指令书模板">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label"><span class="red">*</span>设备描述</label>
            <el-input type="textarea" placeholder="请输入设备描述"/>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label">隐患描述</label>
            <el-select v-model="value5" multiple placeholder="请选择" style="flex:1">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label"><span class="red">*</span>违反条例</label>
            <div class="cont">
              <el-select v-model="value5" multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input type="textarea" class="area"/>
            </div>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label"><span class="red">*</span>处罚依据条例</label>
            <div class="cont">
              <el-select v-model="value5" multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input type="textarea" class="area"/>
            </div>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label"><span class="red">*</span>整改措施</label>
            <div class="cont">
              <el-select v-model="value5" multiple placeholder="请选择" class="select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-input type="textarea" class="area"/>
            </div>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12">
              <label for="" class="label"><span class="red">*</span>整改截止日期</label>
              <el-date-picker
                type="date"
                placeholder="选择日期"/>
            </el-col>
            <el-col :span="12">
              <label for="" class="label"><span class="red">*</span>指令书日期</label>
              <el-date-picker
                type="date"
                placeholder="选择日期"/>
            </el-col>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label">监察指令书</label>
            <el-upload
              :show-file-list="false"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <label for="" class="label"><span class="red">*</span>注明情况</label>
            <el-input type="textarea" placeholder="" style="flex:1"/>
          </el-row>
          <el-row type="flex" align="middle" class="row">
            <el-col :span="12"><label for="" class="label"><span class="red">*</span>单位确认人</label><el-input class="input" placeholder="使用单位确认人"/> </el-col>
            <el-col :span="12"><label for="" class="label"><span class="red">*</span>联系方式</label><el-input class="input" placeholder="联系方式"/></el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRenwushu(0)">检查记录预览</el-button>
        <el-button v-if="!isShow" type="warning">检查记录打印</el-button>
        <el-button v-if="isShow" @click="showRenwushu(1)">指令书预览</el-button>
        <el-button type="primary" @click="dialogChuliVisible = false">确定</el-button>
        <el-button @click="dialogChuliVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogYulanVisible"
      :before-close="handleClose"
      title="">
      <vue-preview :slides="slides" />
    </el-dialog>
    <el-dialog
      :visible.sync="dialogDetailVisible"
      :before-close="handleClose"
      title="">
      <span><img src="@/assets/rewu3.png" alt="" style="width:100%"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">确定</el-button>
        <el-button @click="dialogDetailVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogEditVisible"
      :before-close="handleClose"
      title="">
      <span><img src="@/assets/renwu4.png" alt="" style="width:100%"><img src="@/assets/renwu5.png" alt="" style="width:100%"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogEditVisible = false">确定</el-button>
        <el-button @click="dialogEditVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { taskType, status } from '@/utils/config'
import img from '@/assets/renwushu1.jpg'
import imgs from '@/assets/renwushu2.jpg'
export default {
  data() {
    return {
      taskType,
      status,
      statusChecked: '',
      taskTypeChecked: '',
      dateChecked: '',
      isShow: false,
      dialogEditVisible: false,
      dialogDetailVisible: false,
      dialogYulanVisible: false,
      dialogChuliVisible: false,
      dialogVisible: false,
      dialogInfoVisible: false,
      activeName: 'first',
      activeDialogName: 'first',
      tableData3: [{
        bianhao: 'CK19030100009043',
        useAddress: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        jiedao: '西南',
        concat: '王建玲',
        phone: '18918212988',
        city: '桂城'
      }, {
        bianhao: 'CK19030100009043',
        useAddress: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        jiedao: '西南',
        concat: '王建玲',
        phone: '18918212988',
        city: '桂城'
      }, {
        bianhao: 'CK19030100009043',
        useAddress: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        jiedao: '西南',
        concat: '王建玲',
        phone: '18918212988',
        city: '桂城'
      }],
      tableData4: [{
        bianhao: 'CK19030100009043',
        useAddress: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        jiedao: '西南',
        concat: '王建玲',
        phone: '18918212988',
        city: '桂城'
      }, {
        bianhao: 'CK19030100009043',
        useAddress: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        jiedao: '西南',
        concat: '王建玲',
        phone: '18918212988',
        city: '桂城'
      }, {
        bianhao: 'CK19030100009043',
        useAddress: '广州益力多乳品有限公司',
        address: '西南街道百威大道3号',
        jiedao: '西南',
        concat: '王建玲',
        phone: '18918212988',
        city: '桂城'
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
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      value: '',
      radio2: '',
      value5: '',
      list: [
        { src: img, msrc: img, w: 600, h: 800 },
        { src: imgs, msrc: imgs, w: 600, h: 800 }
      ],
      slides: []
    }
  },
  methods: {
    toRouter() { this.$router.push({ path: '/paifa' }) },
    onCheckbox(event) {
      this.isShow = event
    },
    showRenwushu(index) {
      this.slides = [this.list[index]]
      this.dialogYulanVisible = true
    },
    renwuTabClick(tab, event) {
      // console.log(tab, event)
      // const name = tab.name
      console.log(this.activeName)
    },
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.renwu {
  background: #f2f2f2;
  font-size: 14px;
  padding: 16px;
  label {font-size: 14px;}
  .renwuMg {
    border-radius: 8px;
    background: #ffffff;
    padding: 16px;
    .search {
      .row {
        padding-bottom: 16px;
      }
      .input {max-width: 220px;}
    }
  }
  .more-shebei {
    display: flex;
    padding: 16px 30px;
    justify-content: space-around;
  }
  .page {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }
  .dialogForm {
    .title {padding: 16px 0;color:#333;font-weight: bold;}
    .row {padding-bottom: 16px;}
    .input {max-width: 220px;}
    .label {
      min-width: 120px;
      display: inline-block;
      .red {color: red}
    }
    .cont {
      flex: 1;
      display: flex;
      flex-direction: column;
      .select {width: 100%;}
      .area {width:100%;}
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
