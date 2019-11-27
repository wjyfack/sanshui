<template>
  <div class="zhilingshu">
    <div class="zhilingshuMg">
      <div class="search">
        <el-row class="row">
          <el-col :span="8">
            <label for="" class="label">使用登记证编号：</label>
            <el-input v-model="search.deviceCertNos" class="input" placeholder="请输入使用登记证编号" clearable/>
          </el-col>
          <el-col :span="8">
            <label for="" class="label">使用单位名称：</label>
            <el-input v-model="search.deviceUseName" class="input" placeholder="请输入使用单位名称" clearable/>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="() => {toSearch()}">搜索</el-button>
            <el-button type="primary" @click="beforeDevice">新增</el-button>
            <el-button type="primary" @click="() => {dialogExcelVisible = true}">导出</el-button>
            <el-button type="primary" @click="multiDeal">处理</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="table">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="`待处理`" name="1"/>
          <el-tab-pane :label="`已处理`" name="2"/>
          <!-- auths.sys_command_all -->
        </el-tabs>
        <el-table
          v-loading="loading"
          :data="instructionList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"/>
          <el-table-column
            prop="inspectionNo"
            width="180"
            label="编号"/>
          <el-table-column
            prop="postDate"
            width="180"
            label="发出日期"/>
          <el-table-column
            prop="receiveDate"
            width="180"
            label="接收日期"/>
          <el-table-column
            prop="deviceUseName"
            width="180"
            label="使用单位"/>
          <el-table-column
            prop="deviceUseAddress"
            width="180"
            label="地址"/>
          <el-table-column
            prop="deviceUseContactMan"
            width="180"
            label="联系人"/>
          <el-table-column
            prop="deviceUseContactManTel"
            width="180"
            label="联系电话"/>
          <el-table-column
            prop="deviceCertNos"
            width="180"
            label="设备"/>
          <el-table-column
            prop="inspectionProblem"
            width="180"
            label="检验问题和意见"/>
          <el-table-column
            prop="reExaminationDate"
            width="180"
            label="复检时间"/>
          <el-table-column
            prop="inspectionReportDate"
            width="180"
            label="报检日期"/>
          <el-table-column
            prop="inspectionReportDate"
            width="180"
            label="检验日期"/>
          <el-table-column
            prop="inspectionPeople"
            width="180"
            label="跟进人"/>
          <el-table-column
            prop="dealInfo"
            width="180"
            label="处理情况"/>
          <el-table-column
            prop="finshInfo"
            width="180"
            label="完成情况"/>
          <el-table-column
            fixed="right"
            width="180"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
              <el-button v-if="search.status == 1" type="text" @click="dealRow(scope.row)">处理</el-button>
            </template>
          </el-table-column>
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

    <el-dialog
      :visible.sync="dialogExcelVisible"
      :before-close="handleClose"
      width="30%"
      title="提示">
      <span>
        <el-radio-group v-model="isExcel">
          <el-radio :label="1">勾选项导出</el-radio>
          <el-radio :label="2">全部导出</el-radio>
        </el-radio-group>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogExcelVisible = false">取 消</el-button>
        <el-button :loading="isExcelLoading" type="primary" @click="toMakeExcel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogNewVisible"
      :before-close="handleClose"
      width="60%">
      <!-- <div v-if="false" class="zhilingshuMg">
        <span class="search">
          <el-row>
            <el-col :span="10">
              <label for="" class="label1">使用单位：</label>
              <el-input v-model="device.deviceUseName" class="input" placeholder="请输入使用单位" clearable/>
            </el-col>
            <el-col :span="10">
              <label for="" class="label1">使用登记证：</label>
              <el-input v-model="device.deviceCertNo" class="input" placeholder="请输入使用登记证" clearable/>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="beforeDevice">搜索</el-button>
            </el-col>
          </el-row>
          <el-row class="device-table">
            <el-table
              :data="deviceList"
              border
              style="width: 100%"
              @selection-change="handledeviceChange">
              <el-table-column
                type="selection"/>
              <el-table-column
                prop="deviceCertNo"
                width="180"
                label="使用登记证"/>
              <el-table-column
                prop="deviceName"
                width="180"
                label="设备名称"/>
              <el-table-column
                prop="deviceUseName"
                width="180"
                label="使用单位"/>
              <el-table-column
                prop="deviceUseAddress"
                width="180"
                label="使用单位地址"/>
              <el-table-column
                prop="deviceUseContactMan"
                width="180"
                label="单位联系人"/>
              <el-table-column
                prop="deviceTypeName1"
                width="180"
                label="设备类型"/>
            </el-table>
          </el-row>
          <el-row>
            <div class="page">
              <el-pagination
                :total="deviceTotal"
                background
                layout="prev, pager, next, jumper"
                @current-change="pageCurrDeviceChange"
                @size-change="pageSizeDeviceChange"/>
            </div>
          </el-row>
        </span>
      </div> -->
      <add-jian :infos="deviceInfo" :devf="deiveForm" @change="selDevice" @changes="selDevices" @other="changeOther"/>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewVisible = false">取 消</el-button>
        <el-button type="primary" @click="selDevice">确 定</el-button>
      </span> -->
      <!-- </el-dialog>
      <el-dialog
        :visible.sync="dialowVisible"
        :before-close="handleClose"
        width="60%"> -->
      <div style="padding-top: 15px;">
        <el-form ref="ruleForms" :model="deiveForm" :rules="rulesForm" label-width="150px">
          <!-- <el-form-item label="使用登记证编号">
            <el-input v-model="deiveForm.deviceCertNos" disabled />
          </el-form-item> -->
          <el-form-item label="通知书编号" prop="inspectionNo">
            <el-input v-model="deiveForm.inspectionNo" />
          </el-form-item>
          <el-form-item label="发出日期" prop="postDate">
            <el-date-picker
              v-model="deiveForm.postDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="接收日期" prop="receiveDate">
            <el-date-picker
              v-model="deiveForm.receiveDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="检验类型名称" prop="inspectionTypeName">
            <el-select v-model="deiveForm.inspectionTypeName" placeholder="请选择检验类型名称">
              <el-option
                v-for="item in inspectionTypeNames"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="检验问题" prop="inspectionProblem">
            <el-input v-model="deiveForm.inspectionProblem" />
          </el-form-item>
          <el-form-item label="复验日期" prop="reExaminationDate">
            <el-date-picker
              v-model="deiveForm.reExaminationDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="要求检验日期" prop="inspectionReportDate">
            <el-date-picker
              v-model="deiveForm.inspectionReportDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="检验日期" prop="inspectionDate">
            <el-date-picker
              v-model="deiveForm.inspectionDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="跟进人" prop="inspectionPeople">
            <el-input v-model="deiveForm.inspectionPeople" />
          </el-form-item>
          <div v-if="isEdit">
            <el-form-item label="处理情况" prop="dealInfo">
              <el-input v-model="deiveForm.dealInfo" />
            </el-form-item>
            <el-form-item label="完成情况" prop="finshInfo">
              <el-input v-model="deiveForm.finshInfo" />
            </el-form-item>
            <el-form-item label="检验意见通知书图片">
              <div style="display:flex;">
                <ul class="el-upload-list el-upload-list--picture-card">
                  <li v-for="(item, index) in imgs" :key="index" class="el-upload-list__item is-success">
                    <img :src="baseUrl+item" alt="" class="el-upload-list__item-thumbnail">
                    <i class="el-icon-close"/>
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="hasHandlePreview(baseUrl+item)">
                        <i class="el-icon-zoom-in"/>
                      </span>
                      <span class="el-upload-list__item-delete" @click="hasHandelDelete(index)">
                        <i class="el-icon-delete"/>
                      </span>
                    </span>
                  </li>
                </ul>
                <el-upload
                  :on-success="handleSuccess"
                  :before-upload="beforeAvatarUpload"
                  :action="imgUrl"
                  class="avatar-uploader">
                  <i class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInspection">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogChuVisible"
      :before-close="handleClose"
      width="40%"
      title="处理">
      <div>
        <el-form ref="inpusbForm" :model="dealForm" label-width="101px">
          <el-form-item label="完成情况">
            <el-input v-model="dealForm.finshInfo" />
          </el-form-item>
          <el-form-item label="处理情况">
            <el-input v-model="dealForm.dealInfo" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChuVisible = false">取 消</el-button>
        <el-button type="primary" @click="dealSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// findDeviceForInspection
import { fetchGetData, fetchAddData, fetchExcel, fetchDeal, fetchEdit, fetchInspectionDt } from '@/api/jiany'
import { baseUrl, inspectionTypeNames } from '@/utils/config'
// import authorization from '@/mixins/authorization'
import { toViewer, beforeUpload } from '@/utils/common'
// import AddTask
import AddJian from './components/AddJian'
import { getFormatDate } from '@/utils/common'
export default {
  // mixins: [authorization],
  components: {
    AddJian
  },
  data() {
    return {
      inspectionTypeNames,
      baseUrl: `${baseUrl}/file/show/img/ScenePictures/`,
      imgUrl: `${baseUrl}/file/upload/ScenePictures`,
      downloadUrl: `${baseUrl}/file/download/create/`,
      instructionList: [],
      loading: false,
      activeName: '1',
      search: {
        status: '1',
        deviceCertNo: '',
        deviceUseName: ''
      },
      instructionTotal: 0,
      pageSize: 10,
      pageNum: 1,
      multipleSelection: [],
      dialowVisible: false,
      dialogNewVisible: false,
      dialogExcelVisible: false,
      isExcelLoading: false,
      dialogChuVisible: false,
      isExcel: 1,
      deviceTotal: 0,
      deviceList: [],
      deviceSelection: [],
      device: {
        pageSize: '10',
        pageNum: '1',
        deviceUseName: '',
        deviceCertNos: ''
      },
      deviceInfo: {},
      deiveForm: {},
      rulesForm: {
        inspectionNo: [{ required: true, message: '请填写检验意见通知书编号', trigger: 'blur' }],
        postDate: [{ required: true, message: '请选择发出日期', trigger: 'change' }],
        receiveDate: [{ required: true, message: '请选择接收日期', trigger: 'change' }],
        inspectionTypeName: [{ required: true, message: '请选择检验类型名称', trigger: 'change' }],
        inspectionProblem: [{ required: true, message: '请填写检验问题', trigger: 'blur' }],
        reExaminationDate: [{ required: true, message: '请选择复验日期', trigger: 'change' }],
        inspectionReportDate: [{ required: true, message: '请选择要求检验日期', trigger: 'change' }],
        inspectionDate: [{ required: true, message: '请选择检验日期', trigger: 'change' }],
        inspectionPeople: [{ required: true, message: '请填写跟进人', trigger: 'blur' }]
      },
      dealForm: {},
      isEdit: false,
      editModeEnabled: false,
      isMul: false,
      imgs: [],
      comInfo: {},
      editId: '',
      deviceAInfo: {}
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
    activeName(newValue, oldValue) {
      /**
      * 1 镇街待移交 12 区局待移交 7 批准移交 3 待处理
       8回复审核 4 待确认  5:完成
       */
      // let status = newValue
      // if (status === '9') {
      //   status = ''
      // }
      this.search.status = newValue
      this.fecthData()
    }
  },
  mounted() {
    this.fecthData()
  },
  methods: {
    multiDeal() {
      if (this.multipleSelection.length !== 0) {
        const ids = this.multipleSelection.map(item => item.id).join()
        this.dealRow({ id: ids })
      } else {
        this.$message('请选择列表')
      }
    },
    changeOther(event) {
      const {
        deviceUseID,
        deviceUseName,
        deviceUseAddress,
        deviceUseContactMan,
        deviceUseContactManTel
      } = event
      console.log(event)
      this.deviceAInfo = event
      this.deiveForm.deviceUseAddress = deviceUseAddress
      this.deiveForm.deviceUseContactMan = deviceUseContactMan
      this.deiveForm.deviceUseContactManTel = deviceUseContactManTel
      this.deiveForm.deviceUseID = deviceUseID
      this.deiveForm.deviceUseName = deviceUseName
    },
    hasHandelDelete(index) {
      const rectifyImg = this.imgs
      rectifyImg.splice(index, 1)
      this.imgs = rectifyImg
    },
    hasHandlePreview(url) {
      toViewer(url)
    },
    beforeAvatarUpload(file) {
      beforeUpload(file)
    },
    handleSuccess(response, file, fileList) {
      // this.recitfy.rectifyAddImgs = fileList
      if (response.resultCode === '0000000') {
        const returnData = response.returnData
        // console.log(returnData)
        this.imgs = [...this.imgs, returnData]
        // this.recitfy.rectifyImg = [...this.recitfy.rectifyImg, returnData]
      } else {
        this.$message.error(response.resultDesc || '操作失败')
      }
    },
    edit(row) {
      const params = {
        id: row.id
      }
      this.editId = row.id
      this.isMul = true
      fetchInspectionDt(params).then(res => {
        const {
          returnData
        } = res
        if (this.search.status === '1') {
          this.isEdit = false
        } else {
          this.isEdit = true
        }
        this.imgs = returnData.inspectionPhoto ? returnData.inspectionPhoto.split(',') : []
        this.deviceInfo = returnData
        this.deviceAInfo.deviceUseAddress = returnData.deviceUseAddress
        this.deviceAInfo.deviceUseContactMan = returnData.deviceUseContactMan
        this.deviceAInfo.deviceUseContactManTel = returnData.deviceUseContactManTel
        this.deviceAInfo.deviceUseID = returnData.deviceUseID
        this.deviceAInfo.deviceUseName = returnData.deviceUseName
        const {
          listDevice,
          ...data
        } = returnData
        console.log(listDevice)
        // console.log(data)
        setTimeout(() => {
          this.deiveForm = data
        }, 1000)
        console.log(this.deiveForm)
        this.dialogNewVisible = true
      }).finally(() => {
        this.isMul = false
      })
    },
    dealSure() {
      const params = this.dealForm
      fetchDeal(params).then(res => {
        const {
          resultDesc
        } = res
        this.dialogChuVisible = false
        this.$message.success(resultDesc)
        this.fecthData()
      })
    },
    dealRow(row) {
      const {
        id
      } = row
      this.dealForm.id = id
      this.dialogChuVisible = true
    },
    toMakeExcel() {
      let param = this.search
      let fileType = '1'
      if (this.isExcel === 1) {
        if (this.multipleSelection.length === 0) {
          this.$message('请选择指令书')
          return
        }
        param = this.multipleSelection
      } else {
        fileType = '2'
      }
      // param.commandStatus = '2'
      this.isExcelLoading = true
      fetchExcel(param, fileType).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = objectUrl
        link.download = `${new Date().getTime()}检验意见.xlsx`
        document.body.appendChild(link)
        link.click()
        this.isExcelLoading = false
        this.dialogExcelVisible = false
        document.body.removeChild(link)
        window.URL.revokeObjectURL(objectUrl)
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      // this.dialogPreviewVisible = true
      toViewer(this.dialogImageUrl)
    },
    toSearch() {
      this.pageSize = 10
      this.pageNum = 1
      this.fecthData()
    },
    addInspection() {
      // console.log(this.deiveForm, this.deviceInfo)
      const {
        deviceIDs // ,
        // deviceUseID
      } = this.deiveForm
      if (!deviceIDs) {
        this.$message.error('请选择设备')
        return ''
      }

      this.$refs['ruleForms'].validate((valid) => {
        if (valid) {
          let params = {}
          if (!this.deiveForm.id) {
            console.log(this.deiveForm, this.deviceAInfo)
            // if (!deviceUseID) {
            //   this.deiveForm = {
            //     ...this.deiveForm,
            //     ...this.deviceAInfo
            //   }
            //   const {
            //     deviceUseAddress,
            //     deviceUseContactMan,
            //     deviceUseContactManTel
            //   } = event
            //   console.log(event)
            //   this.deviceAInfo = event
            //   this.deiveForm.deviceUseAddress = deviceUseAddress
            //   this.deiveForm.deviceUseContactMan = deviceUseContactMan
            //   this.deiveForm.deviceUseContactManTel = deviceUseContactManTel
            // }
            params = {
              ...this.deiveForm,
              ...this.deviceAInfo
            }
            // console.log(params)
            // return
            fetchAddData(params).then(res => {
              const {
                resultDesc
              } = res
              this.$message.success(resultDesc)
              this.dialowVisible = false
              this.dialogNewVisible = false
              this.fecthData()
            })
          } else {
            params = {
              ...this.deiveForm
            }
            params.inspectionPhoto = this.imgs.join(',')
            // console.log(params)
            // return
            fetchEdit(params).then(res => {
              const {
                resultDesc
              } = res
              this.$message.success(resultDesc)
              this.dialogNewVisible = false
              this.fecthData()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    selDevices() {
      const params = {
        id: this.editId
      }
      this.edit(params)
    },
    selDevice(event) {
      console.log(event)
      if (this.isMul) return
      const {
        company,
        list,
        devf
      } = event
      this.comInfo = event
      const deviceCertNos = list.map(item => item.deviceCertNo || '/').join()
      const deviceIDs = list.map(item => item.id).join()
      // this.dialogNewVisible = false
      // this.dialowVisible = true
      this.deiveForm = {
        ...devf,
        deviceCertNos,
        deviceIDs,
        deviceUseID: company.id,
        deviceUseName: company.useName,
        deviceUseAddress: company.useAddress,
        deviceUseContactMan: company.useContactMan,
        deviceUseContactManTel: company.useContactManTel
      }
      // console.log(devf,this.deiveForm)
      // if (this.deviceSelection.length > 0) {
      //   const devcie = this.deviceSelection[0]
      //   // const {
      //   //   id,
      //   //   deviceCertNo,
      //   //   deviceName,
      //   //   deviceUseName,
      //   //   deviceUseAddress,
      //   //   deviceUseContactMan,
      //   //   deviceTypeName1,
      //   //   deviceAddress,
      //   //   deviceUseContactManTel,
      //   //   deviceInteriorUseCode,
      //   //   deviceType1
      //   // } = device
      //   devcie.deviceID = devcie.id
      //   this.deviceInfo = devcie
      //   this.deiveForm = {
      //     inspectionReportDate: new Date(),
      //     postDate: new Date(),
      //     receiveDate: new Date(),
      //     reExaminationDate: new Date(),
      //     inspectionDate: new Date()
      //   }
      //   this.dialowVisible = true
      //   this.dialogNewVisible = false
      // } else {
      //   this.$message.error('请选择设备')
      // }
    },
    beforeDevice() {
      this.isEdit = false
      // findDeviceForInspection(this.device).then(res => {
      //   const {
      //     returnData
      //   } = res
      //   const {
      //     list,
      //     total
      //   } = returnData
      //   this.deviceList = list
      //   this.deviceTotal = total
      this.deviceInfo = null
      this.deiveForm = {
        inspectionReportDate: getFormatDate(),
        postDate: getFormatDate(),
        receiveDate: getFormatDate(),
        reExaminationDate: getFormatDate(),
        inspectionDate: getFormatDate()
      }
      this.dialogNewVisible = true
      // })
    },
    pageSizeDeviceChange(event) {
      this.search.pageSize = event
      this.beforeDevice()
    },
    pageCurrDeviceChange(event) {
      this.search.pageNum = event
      this.beforeDevice()
    },
    fecthData() { // 获取数据
      this.loading = true
      const {
        status,
        deviceCertNos,
        deviceUseName
      } = this.search
      const data = {
        status,
        deviceCertNos,
        deviceUseName
      }
      data.pageSize = `${this.pageSize}`
      data.pageNum = `${this.pageNum}`
      fetchGetData(data).then(res => {
        console.log(res)
        const {
          returnData
        } = res
        const {
          list,
          total
        } = returnData
        this.instructionList = list
        this.instructionTotal = total
      }).finally(() => {
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
    handleClose(done) { // 弹窗关闭方法
      done()
    },
    handledeviceChange(val) {
      this.deviceSelection = val
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.formTable{
  padding-bottom: 20px;
}
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
      .label1 {
        display: inline-block;
        text-align: left;
        width: 100px;
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
  .device-table {
    padding-top: 10px;
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
  .table {
    width: 100%;
    padding-left: 1px;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 146px;
  height: 146px;
  box-sizing: border-box;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 146px;
  height: 146px;
  line-height: 146px;
  text-align: center;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
</style>
