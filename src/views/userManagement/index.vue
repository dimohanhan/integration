<template>
  <div>
    <div class="header"
         style="width:200px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">系统管理-用户管理</div>
    </div>
    <div class="mainContent">
      <el-form :inline="true"
               :model="formInline"
               style="700px"
               class="demo-form-inline">
        <el-form-item label="账户名">
          <el-input v-model="formInline.username"
                    placeholder="请输入账户名"></el-input>
        </el-form-item>
        <el-form-item label="账户状态">
          <el-select v-model="formInline.state"
                     :popper-append-to-body="false"
                     placeholder="账户状态">
            <el-option label="正常"
                       value="0"></el-option>
            <el-option label="暂停"
                       value="1"></el-option>
            <el-option label="销户"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="onSubmit1('formCreate')">创建用户</el-button>

        </el-form-item>

      </el-form>
      <!-- 点击创建用户弹出页面 -->
      <el-dialog title="用户管理-创建用户"
                 style="text-align:left"
                 width="40%"
                 top="10vh"
                 :close-on-click-modal="false"
                 @close="closeAdd('formCreate')"
                 :visible.sync="dialogCreatVisible">
        <el-form :model="formCreate"
                 :rules="rules"
                 ref="formCreate"
                 class="demo-formInline"
                 style="width: 400px;">
          <el-form-item label="账户名:"
                        prop="uid"
                        :label-width="formLabelWidth">

            <el-input style="margin-left:0px"
                      v-model="formCreate.uid"></el-input>

          </el-form-item>
          <el-form-item label="用户名:"
                        prop="username"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input v-model="formCreate.username"> </el-input>
            </div>
          </el-form-item>
          <el-form-item label="用户密码:"
                        prop="passwd"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input v-model="formCreate.passwd"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="项目组:"
                        prop="group"
                        :label-width="formLabelWidth">
            <el-select v-model="formCreate.group"
                       placeholder="请选择"
                       filterable
                       style="width: 100%">
              <el-option v-for="item in groupData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色:"
                        prop="role"
                        :label-width="formLabelWidth">
            <el-select v-model="formCreate.role"
                       filterable
                       style="width: 100%"
                       placeholder="请选择">
              <el-option v-for="item in roleData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账户状态"
                        prop="state"
                        :label-width="formLabelWidth">
            <el-select v-model="formCreate.state"
                       :popper-append-to-body="false"
                       placeholder="账户状态">
              <el-option label="正常"
                         value="0"></el-option>
              <el-option label="暂停"
                         value="1"></el-option>
              <el-option label="销户"
                         value="2"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     icon=" iconfont icon-baocun"
                     @click="save('formCreate')">保存</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData"
                v-loading="loading"
                style="width: auto;margin:30px"
                border
                :cell-style="{padding:'3px'}"
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         type="index"
                         prop="date"
                         label="序号"
                         width="50">
          <template slot-scope="scope">
            <span>{{scope.$index+(currpage - 1) * pagesize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userid"
                         label="账户名"
                         width="auto">
        </el-table-column>
        <el-table-column prop="username"
                         label="用户名"
                         width="auto">
        </el-table-column>
        <el-table-column prop="group"
                         label="归属项目组"
                         width="auto">
        </el-table-column>
        <el-table-column prop="role"
                         label="角色"
                         width="auto">
        </el-table-column>
        <el-table-column prop="state"
                         label="状态"
                         width="auto">
        </el-table-column>
        <el-table-column prop="createtime"
                         label="创建时间"
                         width="auto">
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页逻辑 -->
      <el-pagination layout="total,sizes,prev, pager, next"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="pagesize"
                     :total="total">
      </el-pagination>

    </div>
    <!-- 点击编辑弹出页面 -->
    <el-dialog title="用户管理-用户修改"
               style="text-align:left"
               width="40%"
               top="10vh"
               :close-on-click-modal="false"
               @close="closeDetail('form')"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               style="width: 400px;">
        <el-form-item label="账户名:"
                      prop="uid"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.uid"
                      :disabled="true"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="用户名:"
                      prop="username"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.username"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="项目组:"
                      prop="group"
                      :label-width="formLabelWidth">
          <el-select v-model="form.group"
                     style="width: 100%"
                     ref="addgroup">
            <el-option v-for="item in groupData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色:"
                      prop="role"
                      :label-width="formLabelWidth">
          <el-select v-model="form.role"
                     style="width: 100%">
            <el-option v-for="item in roleData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户状态"
                      prop="state"
                      :label-width="formLabelWidth">
          <el-select v-model="form.state"
                     :popper-append-to-body="false"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>

          </el-select>
        </el-form-item>
        <!-- <el-form-item label="邮箱:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.email"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="手机号码:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.mobile"></el-input>
          </div>
        </el-form-item> -->
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon="iconfont icon-xiugai"
                   @click="handleUserSave('form')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //默认每页显示的条数
      pagesize: 10,
      // 默认显示第几页
      currpage: 1,
      total: 0,
      loading: false,
      dialogFormVisible: false,
      dialogCreatVisible: false,
      formLabelWidth: '120px',
      value: '',
      //搜索条件表单
      formInline: {
        username: '',
        state: '',
      },
      // 点击编辑弹出页面内容表单
      form: {
        username: '',
        uid: '',
        group: '',
        role: '',
        state: ''
      },
      //状态下拉的数据
      options: [{
        id: '0',
        name: '正常使用'
      }, {
        id: '1',
        name: '暂停'
      }, {
        id: '2',
        name: '销户'
      }],
      //点击创建内容的表单保存
      formCreate: {
        username: '',
        uid: '',
        group: '',
        role: '',
        state: '',
        passwd: ''
      },
      rules: {
        uid: [
          { required: true, message: '请输入账户名', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        group: [
          { required: true, message: '请选择项目组', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],

      },
      groupData: '',//项目组下拉存放数据
      roleData: '',//角色下拉存放数据
      tableData: [],
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    //搜索
    onSubmit () {
      console.log('搜索!');
      this.loading = true
      this.$http.getUserSearch(this.pagesize, this.currpage, this.formInline.state, '-createtime').then((res) => {
        console.log(res.data.data);
        if (res.data.data && res.data.code == '0000') {
          this.tableData = res.data.data
          this.loading = false
          this.total = this.tableData.length
          console.log(this.total)
          this.total = res.data.paging.total;//总信息条数从数据库获取;
          console.log(this.total)
        } else {
          this.tableData = []
        }
      }).catch(() => {
        //请求失败关闭；
        this.loading = false
        this.$message.error('请求出错了哦');
      })
    },
    //创建
    onSubmit1 () {
      console.log('创建!');
      this.formCreate = {}
      this.handleGroup()
      this.handleRole()
      this.dialogCreatVisible = true
    },
    //组别下拉接口
    handleGroup () {
      this.$http.getUserGroup().then((res) => {
        console.log(res.data.data);
        this.groupData = res.data.data
      });
    },
    //角色下拉接口
    handleRole () {
      this.$http.getUserRole().then((res) => {
        console.log(res.data.data);
        this.roleData = res.data.data
      });
    },
    //修改接口
    handleEditSave () {
      this.$http.getUserEdit(this.form).then((res) => {
        console.log(res.data.code);
        if (res.data.code == '0000') {
          console.log(res)
          this.$message({
            message: '修改成功!!',
            type: 'success',
            duration: '3000'
          })
          this.dialogFormVisible = false
          this.onSubmit()
        } else {
          this.$message.error(res.data.description);
        }
      });
    },
    //点击编辑按钮执行的事件
    handleEdit (index, row) {
      console.log(index, row, '编辑');
      this.handleRole()//角色下拉接口
      this.handleGroup()
      this.form.group = row.group
      this.form.uid = row.userid
      //循环角色下拉框找到对应的id
      this.$http.getUserRole().then((res) => {
        console.log(res.data.data);
        this.roleData = res.data.data
        for (let i = 0; i < this.roleData.length; i++) {
          if (this.roleData[i].name == row.role) {
            this.form.role = this.roleData[i].id
          }
        }
      });
      //循环组别下拉，找到对应的id
      this.$http.getUserGroup().then((res) => {
        console.log(res.data.data);
        this.groupData = res.data.data
        for (let i = 0; i < this.groupData.length; i++) {
          if (this.groupData[i].name == row.group) {
            this.form.group = this.groupData[i].id
          }
        }
      });
      //循环状态下拉框，找到对应的value
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name == row.state) {
          this.form.state = this.options[i].id
        }
      }
      this.form.username = row.username
      // this.form.role = row.role
      this.dialogFormVisible = true
    },
    // 创建用户的保存
    save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let aa = this.formCreate
          this.$http.getUserAdd(aa).then((res) => {
            if (res.data.code == '0000') {
              console.log(res)
              this.$message({
                message: '保存成功!!',
                type: 'success',
                duration: '3000'
              })
              this.dialogCreatVisible = false
              this.onSubmit(this.formInline)
            } else {
              this.$message.error(res.data.description);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    //删除事件
    handleDelete (index, row) {
      console.log(index, row)
      this.uid = row.userid
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.getUserDelete(this.uid).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.onSubmit()
          }
        });
      }).catch(() => {

      });
    },
    handleCurrentChange (cpage) {
      // console.log(cpage, '1111')
      this.currpage = cpage;
      this.onSubmit()
    },
    handleSizeChange (psize) {
      console.log(psize)
      this.pagesize = psize;
      // this.currpage = 1
      this.onSubmit()
    },
    handleSelectionChange (val) {
      console.log(val)
      this.onSubmit()

    },
    //点击编辑页面的修改
    handleUserSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.handleEditSave()
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },

    closeAdd (formName) {
      this.$refs[formName].resetFields();
    },
    closeDetail (formName) {
      this.$refs[formName].resetFields();
    }

  }
}
</script>
<style>
.el-main {
  line-height: 0 !important;
}
.el-input__inner:focus {
  border-color: #1369c2;
}
.el-select-dropdown__item :hover {
  color: #1369c2;
}
.el-button--primary {
  color: #fff;
  background-color: #1369c2 !important;
  border-color: #1369c2 !important;
}
</style>
<style lang="less" scoped>
.borderContent {
  width: 5px;
  height: 22px;
  position: relative;
  top: 11px;
  background-color: #1369c2;
}
.mainContent {
  width: 85%;
  margin: 1% 7%;
  background-color: #fff;
  border: 1px solid #eee;
}
#inputStyle :focus-within {
  border-color: #1369c2;
  border-width: 1px;
}
.el-button {
  background-color: #1369c2;
  color: #fff;
}
.el-form {
  margin-top: 50px;
  margin-bottom: 40px;
  text-align: left;
  margin-left: 30px;
}
.el-form--inline .el-form-item[data-v-d9de66ea] {
  margin-right: 27px;
}

.el-form--inline .el-form-item {
  margin-right: 10px;
  margin-bottom: 20px;
}
.el-pagination .el-select .el-input .el-input__inner {
  width: 100px !important;
}
.el-pagination {
  margin-bottom: 20px !important;
}
</style>