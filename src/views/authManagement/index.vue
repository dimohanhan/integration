<template>
  <div>
    <div class="header"
         style="width:200px; margin-left: 250px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">系统管理-权限管理</div>
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
                     @click="onSubmit1">创建权限</el-button>
        </el-form-item>

      </el-form>
      <!-- 点击创建角色弹出页面 -->
      <el-dialog title="用户管理-创建权限"
                 style="text-align:left"
                 width="40%"
                 top="10vh"
                 :visible.sync="dialogCreatVisible">
        <el-form :model="formInline"
                 style="width: 400px;">
          <el-form-item label="权限名称:"
                        :label-width="formLabelWidth">

            <el-input style="margin-left:0px"
                      v-model="formInline.authName"></el-input>

          </el-form-item>
          <el-form-item label="所属角色:"
                        :label-width="formLabelWidth">
            <div id="inputStyle">
              <el-select v-model="formInline.role"
                         style="width: 100%">
                <el-option label="请选择"
                           value=""></el-option>
                <el-option label="1"
                           value="zhengchang"></el-option>
                <el-option label="2"
                           value="zanting"></el-option>
                <el-option label="3"
                           value="xiaohu"></el-option>

              </el-select>

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
                         label="权限名称"
                         width="auto">
        </el-table-column>

        <el-table-column label="操作">
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
    <el-dialog title="权限管理-权限修改"
               style="text-align:left"
               width="40%"
               top="15vh"
               :visible.sync="dialogFormVisible">
      <el-form :model="formInline"
               style="width: 400px;">
        <el-form-item label="权限名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.authName"></el-input>

        </el-form-item>
        <el-form-item label="所属角色:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-select v-model="formInline.role"
                       style="width: 100%">
              <el-option label="请选择"
                         value=""></el-option>
              <el-option label="1"
                         value="zhengchang"></el-option>
              <el-option label="2"
                         value="zanting"></el-option>
              <el-option label="3"
                         value="xiaohu"></el-option>

            </el-select>

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
      dialogFormVisible: false,
      dialogCreatVisible: false,
      formLabelWidth: '120px',
      formInline: {
        authName: '',
        role: ''
      },
      tableData: [{
        date: '1',
        name: '用例设计',
      }, {
        date: '2',
        name: '用例执行',
      }, {
        date: '3',
        name: '用例同步',
      }, {
        date: '4',
        name: '用例执行',
      }, {
        date: '5',
        name: '用例执行',
      }, {
        date: '6',
        name: '用例同步',
      }]
    }
  },
  methods: {

    onSubmit () {
      console.log('submit!');
    },
    onSubmit1 () {
      console.log('submit!');
      this.dialogCreatVisible = true
    },
    handleEdit (index, row) {
      console.log(index, row);
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