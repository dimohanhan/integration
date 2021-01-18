<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 80px;">用例管理-接口信息管理</div>
    </div>
    <div class="mainContent">
      <el-form :inline="true"
               :model="formInline"
               style="width: 900px"
               class="demo-form-inline">
        <el-form-item label="归属产品">
          <el-input v-model="formInline.user"
                    placeholder="请输入归属产品"></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="formInline.user"
                    placeholder="请输入接口名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="creatRoleClick()">新增</el-button>
        </el-form-item>

      </el-form>
      <!-- 点击新增弹出页面 -->
      <el-dialog title="用例管理-接口信息转换"
                 style="text-align:left"
                 width="50%"
                 :inline="true"
                 top="10vh"
                 :visible.sync="dialogCreatVisible">
        <el-form :model="formInline"
                 ref="formInline"
                 :inline="true"
                 style="width: 600px;">
          <el-form-item label="接口信息名称:"
                        :label-width="formLabelWidth">

            <el-input style="margin-left:0px"
                      v-model="formInline.roleName"></el-input>

          </el-form-item>

          <!-- 默认DB配置新增内容 -->
          <!-- <el-form-item v-for="(Db, index) in formInline.Dbs"
                        :label="'默认DB配置' + index+':'"
                        :key="Db.key"
                        :label-width="formLabelWidth"
                        :prop="'Dbs.' + index + '.value1'"
                        :rules="{
      required: true, message: '默认DB配置不能为空', trigger: 'blur'
    }">
            <el-input v-model="Db.value1"></el-input>

            <el-button v-if="index >= 1"
                       style="width: 74%;"
                       type="danger"
                       @click.prevent="removeDb(Db)">删除</el-button>

          </el-form-item> -->
          <!-- <el-form-item>
            <el-button @click="addDb">新增</el-button>
          </el-form-item> -->
          <el-form-item label="协议类型:"
                        prop="rolePlay"
                        :label-width="formLabelWidth"
                        :rules="{
      required: true, message: '协议类型不能为空', trigger: 'blur'
    }">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <el-form-item label="method:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <el-form-item label="baseurL:"
                        :label-width="formLabelWidth"
                        prop="rolePlay"
                        :rules="{ required: true, message: 'baseurL不能为空', trigger: 'blur'}">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <el-form-item label="接口名:"
                        prop="rolePlay"
                        :label-width="formLabelWidth"
                        :rules="{ required: true, message: '接口名不能为空', trigger: 'blur'}">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <el-form-item label="header:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <el-form-item label="消息体:"
                        prop="rolePlay"
                        :label-width="formLabelWidth"
                        :rules="{ required: true, message: '消息体不能为空', trigger: 'blur'}">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
          <el-form-item label="功能说明:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>

          <!-- mock配置新增按钮 -->
          <!-- <el-form-item v-for="(mock, index) in formInline.mocks"
                        :label="'MOCK配置' + index+':'"
                        :key="mock.key"
                        :label-width="formLabelWidth"
                        :prop="'mocks.' + index + '.value1'"
                        :rules="{
      required: true, message: 'MOCK配置不能为空', trigger: 'blur'
    }">
            <el-input v-model="mock.value1"
                      style="width: 75%;"></el-input>

            <el-button v-if="index >= 1"
                       type="danger"
                       @click.prevent="removeMock(mock)">删除</el-button>
          </el-form-item>
          <el-button @click="addMock">新增</el-button> -->
          <el-form-item label="备注说明:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.rolePlay"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     icon=" iconfont icon-baocun"
                     @click="submitForm('formInline')">保存</el-button>
        </div>
      </el-dialog>
      <!-- 主页的内容表格 -->
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px"
                border
                :cell-style="{padding:'3px'}"
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         prop="date"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="name"
                         label="模块名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="province"
                         label="接口名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="city"
                         label="协议类型"
                         width="auto">
        </el-table-column>
        <el-table-column prop="address"
                         label="method"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="mock"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="创建者"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="创建时间"
                         width="auto">
        </el-table-column>
        <el-table-column label="操作"
                         width="230">
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
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
    <!-- 点击编辑弹出页面 -->
    <el-dialog title="用例管理-接口信息模块的修改"
               style="text-align:left"
               width="50%"
               :inline="true"
               top="10vh"
               :visible.sync="dialogFormVisible">
      <el-form :model="formInline"
               ref="formInline"
               :inline="true"
               style="width: 600px;">
        <el-form-item label="接口信息名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.roleName"></el-input>

        </el-form-item>

        <!-- 默认DB配置新增内容 -->
        <!-- <el-form-item v-for="(Db, index) in formInline.Dbs"
                      :label="'默认DB配置' + index+':'"
                      :key="Db.key"
                      :label-width="formLabelWidth"
                      :prop="'Dbs.' + index + '.value1'"
                      :rules="{
      required: true, message: '默认DB配置不能为空', trigger: 'blur'
    }">
          <el-input v-model="Db.value1"></el-input>

          <el-button v-if="index >= 1"
                     style="width: 74%;"
                     type="danger"
                     @click.prevent="removeDb(Db)">删除</el-button>

        </el-form-item> -->
        <!-- <el-form-item>
          <el-button @click="addDb">新增</el-button>
        </el-form-item> -->
        <el-form-item label="协议类型:"
                      prop="rolePlay"
                      :label-width="formLabelWidth"
                      :rules="{
      required: true, message: '协议类型不能为空', trigger: 'blur'
    }">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="method:"
                      :label-width="formLabelWidth">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="baseurL:"
                      :label-width="formLabelWidth"
                      prop="rolePlay"
                      :rules="{ required: true, message: 'baseurL不能为空', trigger: 'blur'}">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="接口名:"
                      :label-width="formLabelWidth"
                      prop="rolePlay"
                      :rules="{ required: true, message: '接口名不能为空', trigger: 'blur'}">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="header:"
                      :label-width="formLabelWidth">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="消息体:"
                      :label-width="formLabelWidth"
                      prop="rolePlay"
                      :rules="{ required: true, message: '消息体不能为空', trigger: 'blur'}">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
        <el-form-item label="功能说明:"
                      :label-width="formLabelWidth">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>

        <!-- mock配置新增按钮 -->
        <!-- <el-form-item v-for="(mock, index) in formInline.mocks"
                        :label="'MOCK配置' + index+':'"
                        :key="mock.key"
                        :label-width="formLabelWidth"
                        :prop="'mocks.' + index + '.value1'"
                        :rules="{
      required: true, message: 'MOCK配置不能为空', trigger: 'blur'
    }">
            <el-input v-model="mock.value1"
                      style="width: 75%;"></el-input>

            <el-button v-if="index >= 1"
                       type="danger"
                       @click.prevent="removeMock(mock)">删除</el-button>
          </el-form-item>
          <el-button @click="addMock">新增</el-button> -->
        <el-form-item label="备注说明:"
                      :label-width="formLabelWidth">
          <el-input v-model="formInline.rolePlay"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon=" iconfont icon-baocun"
                   @click="submitFormEdit('formInline')">保存</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogCreatVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      formInline: {
        roleName: '',
        rolePlay: '',
        roleText: '',
        domains: [{
          value: ''
        }],
        Dbs: [{
          value1: ''
        }]
        // mocks: [{
        //   value1: ''
        // }],
      },
      formEdit: {
        roleNameEdit: '',
        rolePlayEdit: '',
        roleTextEdit: ''
      },
      tableData: [{
        date: '1',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'http',
        address: '开发组',
        mobile: '12',
        status: '正常'
      }, {
        date: '2',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'https',
        address: '开发组',
        mobile: '13',
        status: '正常'
      }, {
        date: '3',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '22',
        status: '正常'
      }, {
        date: '4',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '32',
        status: '正常'
      }, {
        date: '5',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '3',
        status: '正常'
      }, {
        date: '6',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '4',
        status: '正常'
      }, {
        date: '7',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '5',
        status: '正常'
      }, {
        date: '8',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '6',
        status: '正常'
      }, {
        date: '9',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '7',
        status: '正常'
      }, {
        date: '10',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '89',
        status: '正常'
      }]
    }
  },
  methods: {

    onSubmit () {
      console.log('submit!');
    },
    creatRoleClick () {
      console.log('新增');
      this.dialogCreatVisible = true
    },
    // 点击编辑按钮事件
    handleEdit (index, row) {
      console.log(index, row);
      // 点击编辑按钮，把对应的数据赋值给对应的input
      this.formInline.roleName = row.name
      this.formInline.roleName = row.province
      this.formInline.roleName = row.city
      this.dialogFormVisible = true
    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {

      });
    },
    removeDb (item) {
      var index = this.formInline.Dbs.indexOf(item)
      if (index !== -1) {
        this.formInline.Dbs.splice(index, 1)
      }
    },
    removeMock (item) {
      var index = this.formInline.mocks.indexOf(item)
      if (index !== -1) {
        this.formInline.mocks.splice(index, 1)
      }
    },
    addDb () {
      this.formInline.Dbs.push({
        value1: '',
        key: Date.now()
      });
    },
    addMock () {
      this.formInline.mocks.push({
        value1: '',
        key: Date.now()
      });
    },
    // 新增保存按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formEdit);
          this.dialogCreatVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 修改保存按钮
    submitFormEdit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formEdit);
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
<style>
.el-main[data-v-5954443c] {
  line-height: 0 !important;
}
.el-input__inner:focus {
  border-color: #1369c2;
}
.el-select-dropdown__item :hover {
  color: #1369c2;
}
</style>
<style lang="less" scoped>
.borderContent {
  width: 5px;
  height: 22px;
  position: absolute;
  top: 60px;
  background-color: #1369c2;
}
.mainContent {
  width: 85%;
  margin: 3% 7%;
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
}
.el-form--inline .el-form-item[data-v-d9de66ea] {
  margin-right: 27px;
}

.el-form--inline .el-form-item {
  margin-right: 10px;
}
/* 调整表格内的按钮样式 */
.el-button--mini,
.el-button--small {
  height: 25px !important;
}

.delete {
  position: absolute;
  top: 0px;
  left: 292px;
}
// .el-textarea {
//   width: 193px !important;
//   margin-right: 20px;
// }
// .el-input.el-input__inner {
//   width: 74% !important;
// }
.el-form-item .is-required.el-form-item__label.el-form-item__content {
  width: 74% !important;
}
</style>