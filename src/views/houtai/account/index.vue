<template>
  <div class="account">
    <div class="shebeiSearch">
      <el-row :gutter="20">
        <div class="search">
          <label for="" class="label">姓名：</label>
          <el-input v-model="info.userNickName" class="input" placeholder="" />
          <label for="" class="label">手机号：</label>
          <el-input v-model="info.userPhone" class="input" placeholder="" />
          <label for="" class="label">部门：</label>
          <el-select v-model="info.userDeptId" placeholder="请选择">
            <el-option
              v-for="item in deptNames"
              :key="item.id"
              :label="item.deptName"
              :value="item.id"/>
          </el-select>
          <label for="" class="label">角色：</label>
          <el-select v-model="info.userRoleId" placeholder="请选择">
            <el-option
              v-for="item in userRole"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
          <el-button type="primary" style="margin-left: 16px;" @click="searchQuery">查询</el-button>
          <el-button @click="searchReset">重置</el-button>
          <el-button icon="el-icon-plus" @click="add">新增</el-button>
        </div>
      </el-row>
    </div>
    <div class="table">
      <el-table
        ref="multipleAccountsTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          label="帐号"
          width="120">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column
          prop="userNickName"
          label="昵称"
          width="120"/>
        <el-table-column
          prop="roleName"
          label="角色"/>
        <el-table-column
          prop="deptName"
          label="所属部门"/>
        <el-table-column
          prop="userPhone"
          label="联系方式"/>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">{{ scope.row.userStatus == 0 ? '启用' : '禁用' }}</template>
        </el-table-column>
        <el-table-column
          prop="userAddDate"
          label="添加日期"/>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ppp">
      <el-pagination
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title">
      <div class="dialogVisible">
        <el-form ref="addLoginForm" :inline="true" :model="addForm" :rules="rules" class="demo-form-inline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="帐号" prop="userName">
                <el-input v-model="addForm.userName" placeholder="请输入帐号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="isEdit" label="是否初始化密码" prop="initPwd">
                <el-switch
                  v-model="addForm.initPwd"/>
              </el-form-item>
              <el-form-item v-else label="密码" prop="userPwd">
                <el-input v-model="addForm.userPwd" placeholder="请输入密码"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="userNickName">
                <el-input v-model="addForm.userNickName" placeholder="请输入姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="userPhone">
                <el-input v-model="addForm.userPhone" placeholder="请输入手机号"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="userDeptId">
                <el-select v-model="addForm.userDeptId" placeholder="请选择部门" @change="userDeptIdChange">
                  <el-option
                    v-for="item in deptNames"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色" prop="userRoleId">
                <el-select v-model="addForm.userRoleId" placeholder="请选择角色">
                  <el-option
                    v-for="item in userRoleShow"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="userEmail">
                <el-input v-model="addForm.userEmail" placeholder="请输入邮箱"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位" prop="position">
                <el-input v-model="addForm.position" placeholder="请输入职位"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="是否可登录app" prop="userIsApp">
                <el-switch
                  v-model="addForm.userIsApp"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="userStatus">
                <el-switch
                  v-model="addForm.userStatus"/>
              </el-form-item>
            </el-col>
          </el-row>
          <!--  <el-row>
            <el-col :span="12">
              <el-form-item label="是否可登录app" prop="userIsSend">
                <el-switch
                  v-model="addForm.userIsSend"/>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-form-item label="电子签名" prop="userSign">
              <imgLoad :list="addForm.userSign" :imgurl="imgurl" :imgshow="imgshow" @sendimg="getSendImg" />
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="formSub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import imgLoad from '@/components/imgLoad'
import { baseUrl, userRole } from '@/utils/config'
import { fetchUserList, fetchUserUpdate, fetchUserAdd, fetchinitPwd } from '@/api/admin'
import { mapGetters } from 'vuex'
export default {
  components: {
    imgLoad
  },
  data() {
    return {
      title: '新增',
      userRole,
      userRoleShow: [],
      imgurl: `${baseUrl}/file/upload/userSign`,
      imgshow: `${baseUrl}/file/show/userSign/`,
      dialogVisible: false,
      isEdit: false,
      info: {
        userNickName: '',
        userPhone: '',
        userRoleId: '',
        userDeptId: '',
        pageNum: '1',
        pageSize: '10'
      },
      addForm: {
        initPwd: false,
        userEmail: '',
        userName: '',
        userNickName: '',
        userRoleId: '',
        userRoleType: '2',
        userPhone: '',
        userDeptId: '',
        userStatus: true,
        userIsApp: true,
        userIsSystem: '0',
        userSign: '',
        userSignImg: '',
        position: ''
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', message: '请输入帐号' }],
        userPwd: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        userEmail: [{ required: true, trigger: 'blur', message: '请输入邮箱' }],
        userNickName: [{ required: true, trigger: 'blur', message: '请输入姓名' }],
        userRoleId: [{ required: true, trigger: 'blur', message: '请选择角色' }],
        userPhone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        userDeptId: [{ required: true, trigger: 'blur', message: '请选择部门' }],
        position: [{ required: true, trigger: 'blur', message: '请输入职位' }]
      },
      total: 0,
      value: '',
      options: [],
      tableData: [],
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters([
      'deptNames'
    ])
  },
  mounted() {
    if (this.deptNames.length === 0) {
      this.$store.dispatch('actionsDeptNames')
    }
    console.log(this.deptNames)
    this.fecthData()
  },
  methods: {
    add() {
      this.title = '新增'
      this.isEdit = false
      this.addForm.id = ''
      this.dialogVisible = true
      this.addForm = {
        userEmail: '',
        userName: '',
        userNickName: '',
        userRoleId: '',
        userRoleType: '2',
        userPhone: '',
        userDeptId: '',
        userStatus: true,
        userIsApp: true,
        userIsSystem: '0',
        userSign: '',
        userSignImg: '',
        userIsSend: false,
        position: ''
      }
    },
    userDeptIdChange(event) {
      // console.log(event)
      switch (~~event) {
        case 1:
        case 3:
        case 2:
        case 4:
        case 5:
          this.userRoleShow = this.userRole.slice(0, 2)
          break
        case 8:
        case 9:
          this.userRoleShow = this.userRole.slice(2, 5)
          break
        case 10:
          this.userRoleShow = this.userRole.slice(5)
          break
        case 11:
          this.userRoleShow = this.userRole.slice(7)
          break
      }
      this.addForm.userRoleId = ''
    },
    edit(row) {
      this.title = '编辑'
      this.isEdit = true
      console.log(row)
      const {
        id,
        userName,
        userNickName,
        userRoleId,
        userRoleType,
        userPhone,
        userStatus,
        userIsApp,
        userIsSystem,
        userSign,
        userEmail,
        userPwd,
        userDeptId,
        userIsSend,
        position
      } = row
      this.addForm = {
        id,
        userName,
        userNickName,
        userRoleId,
        userRoleType,
        userPhone,
        userStatus: !~~userStatus, // userStatus === '0' ? true : false,
        userIsApp: !!~~userIsApp, // userIsApp === '1' ? true : false,
        userIsSend: !!~~userIsSend,
        userIsSystem,
        userSign,
        userEmail,
        userPwd,
        position,
        userDeptId,
        userSignImg: userSign
      }
      this.dialogVisible = true
    },
    formSub() {
      this.$refs.addLoginForm.validate(valid => {
        if (valid) {
          console.log(this.addForm)
          const {
            userName,
            userNickName,
            userRoleId,
            userRoleType,
            userPhone,
            userStatus,
            userIsApp,
            userIsSystem,
            userEmail,
            userPwd,
            userDeptId,
            userSignImg,
            userIsSend,
            position
          } = this.addForm
          const data = {
            position,
            userName,
            userNickName,
            userRoleId,
            userRoleType,
            userPhone,
            userEmail,
            userPwd,
            userDeptId,
            userStatus: userStatus ? '0' : '1',
            userIsApp: userIsApp ? '1' : '0',
            userIsSend: userIsSend ? '1' : '0',
            userIsSystem,
            userSign: userSignImg
          }
          // console.log(data)
          // return ''
          if (this.isEdit) {
            data.id = this.addForm.id
            fetchUserUpdate(data).then(res => {
              if (res.resultCode === '0000000') {
                if (this.addForm.initPwd) {
                  fetchinitPwd({ id: this.addForm.id })
                }
                this.isEdit = false
                this.$message.success(res.resultDesc)
                this.dialogVisible = false
                this.fecthData()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
          } else {
            fetchUserAdd(data).then(res => {
              if (res.resultCode === '0000000') {
                this.$message.success(res.resultDesc)
                this.dialogVisible = false
                this.fecthData()
              } else {
                this.$message.error(res.resultDesc)
              }
            })
          }
          this.addForm = {
            userEmail: '',
            userName: '',
            userNickName: '',
            userRoleId: '',
            userRoleType: '2',
            userPhone: '',
            userDeptId: '',
            userStatus: true,
            userIsApp: true,
            userIsSystem: '0',
            userSign: '',
            userSignImg: ''
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    searchQuery() {
      this.fecthData()
    },
    fecthData() {
      // 名字  userNickName
      // 手机  userPhone
      // 角色id  userRoleId
      // 部门id  userDeptId
      // 页码  pageNum
      // 行数  pageSize
      const {
        userNickName,
        userPhone,
        userRoleId,
        userDeptId,
        pageNum,
        pageSize
      } = this.info
      const data = {
        userNickName,
        userPhone,
        userRoleId,
        userDeptId,
        pageNum,
        pageSize
      }
      fetchUserList(data).then(res => {
        console.log(res)
        if (res.resultCode === '0000000') {
          const { list, total } = res.returnData
          this.tableData = list
          this.total = total
        } else {
          this.$message.error(res.resultDesc)
        }
      })
    },
    getSendImg(event) {
      console.log(event)
      this.addForm.userSignImg = event
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.info.pageSize = `${val}`
      this.fecthData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.info.pageNum = `${val}`
      this.fecthData()
    },
    searchReset() {
      this.info = {
        userNickName: '',
        userPhone: '',
        userRoleId: '',
        userDeptId: ''
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleAccountsTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleAccountsTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .account {
    background: #f2f2f2;
    color: #666666;
    font-size: 14px;
    padding: 15px;
    .shebeiSearch {
      padding: 16px;
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
    .table {
      background: #ffffff;
      padding: 0 15px;
      padding-bottom: 15px;
    }
  }
  .ppp {
    padding-top: 15px;
  }
</style>
