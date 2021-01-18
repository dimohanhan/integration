<template>
  <div>
    <div class="header"
         style="width:200px; margin-left: 250px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">系统管理-角色管理</div>
    </div>
    <div class="mainContent">
      <el-form :inline="true"
               :model="formInline"
               style="width: 900px"
               class="demo-form-inline">
        <el-form-item label="角色名称">
          <el-input v-model="formInline.user"
                    placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="formInline.region"
                     :popper-append-to-body="false"
                     placeholder="角色状态">
            <el-option label="请选择"
                       value=""></el-option>
            <el-option label="正常"
                       value="zhengchang"></el-option>
            <el-option label="暂停"
                       value="zanting"></el-option>
            <el-option label="销户"
                       value="xiaohu"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="creatRoleClick()">创建角色</el-button>
        </el-form-item>

      </el-form>
      <!-- 点击创建角色弹出页面 -->
      <el-dialog title="用户管理-创建角色"
                 style="text-align:left"
                 width="40%"
                 top="10vh"
                 :visible.sync="dialogCreatVisible">
        <el-form :model="formInline"
                 style="width: 400px;">
          <el-form-item label="角色名称:"
                        :label-width="formLabelWidth">

            <el-input style="margin-left:0px"
                      v-model="formInline.roleName"></el-input>

          </el-form-item>
          <el-form-item label="角色代号:"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input v-model="formInline.rolePlay"></el-input>
            </div>
          </el-form-item>

          <el-form-item label="角色描述:"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-input type="textarea"
                        :rows="4"
                        maxlength="100"
                        show-word-limit
                        v-model="formInline.roleText"></el-input>
            </div>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     icon=" iconfont icon-baocun"
                     @click="save()">保存</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px"
                border
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         prop="date"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="name"
                         label="角色名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="province"
                         label="角色代号"
                         width="auto">
        </el-table-column>
        <el-table-column prop="city"
                         label="角色描述"
                         width="auto">
        </el-table-column>
        <el-table-column prop="address"
                         label="角色状态"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="联系方式"
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
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
    <!-- 点击编辑弹出页面 -->
    <el-dialog title="用户管理-角色修改"
               style="text-align:left"
               width="40%"
               top="10vh"
               :visible.sync="dialogFormVisible">
      <el-form :model="formEdit"
               style="width: 400px;">
        <el-form-item label="角色名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formEdit.roleNameEdit"></el-input>

        </el-form-item>
        <el-form-item label="角色代号:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="formEdit.rolePlayEdit"></el-input>
          </div>
        </el-form-item>

        <el-form-item label="角色描述:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input type="textarea"
                      :rows="2"
                      maxlength="100"
                      show-word-limit
                      v-model="formEdit.roleTextEdit"></el-input>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon="iconfont icon-xiugai"
                   @click="dialogFormVisible = false">修改</el-button>
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
        roleText: ''
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
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '2',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '3',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '4',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '5',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '6',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        mobile: '13322349999',
        status: '正常'
      }]
    }
  },
  methods: {

    onSubmit () {
      console.log('submit!');
    },
    creatRoleClick () {
      console.log('创建角色');
      this.dialogCreatVisible = true
    },
    // 点击编辑按钮事件
    handleEdit (index, row) {
      console.log(index, row);
      // 点击编辑按钮，把对应的数据赋值给对应的input
      this.formEdit.roleNameEdit = row.name
      this.formEdit.rolePlayEdit = row.province
      this.formEdit.roleTextEdit = row.city
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
    }
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
.el-textarea {
  width: 193px !important;
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
</style>