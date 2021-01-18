<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 45px;">测试任务管理-测试报告管理</div>
    </div>
    <div class="mainContent">
      <el-tabs type="border-card">
        <el-tab-pane label="任务执行结果查看">
          <el-form :inline="true"
                   :model="formInline"
                   style="    width: 1100px;"
                   class="demo-form-inline">

            <el-form-item label="任务ID">
              <el-input v-model="formInline.taskid"
                        placeholder="请输入任务ID"></el-input>
            </el-form-item>
            <el-form-item label="创建者">
              <el-input v-model="formInline.createuser"
                        placeholder="请输入创建者"></el-input>
            </el-form-item>
            <el-form-item label="执行结果">
              <el-input placeholder="请输入执行结果"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type=""
                         size="mimi"
                         icon="el-icon-search"
                         @click="onSubmit">搜索</el-button>
            </el-form-item>

          </el-form>
          <!-- 主页的内容表格 -->
          <el-table :data="tableData"
                    style="width: 94%;margin-left:30px"
                    border
                    v-loading="loading"
                    :cell-style="{padding:'1px'}"
                    :header-cell-style="{background:'#F2F2F2'}">
            <el-table-column fixed
                             type="index"
                             label="序号"
                             width="70">
              <template slot-scope="scope">
                <span>{{scope.$index+(currpage - 1) * pagesize + 1}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="taskid"
                             label="任务ID"
                             width="auto">
            </el-table-column> -->
            <el-table-column prop="taskname"
                             label="任务名称"
                             width="auto">
            </el-table-column>
            <el-table-column prop="address"
                             label="发送邮件"
                             width="auto">
            </el-table-column>

            <el-table-column prop="totalcase"
                             label="包含接口数量"
                             width="auto">
            </el-table-column>
            <el-table-column prop="mobile"
                             label="执行时长"
                             width="auto">
            </el-table-column>
            <el-table-column prop="failure"
                             label="执行结果"
                             width="auto">
            </el-table-column>
            <el-table-column prop="createuser"
                             label="执行人"
                             width="auto">
            </el-table-column>
            <el-table-column prop="createtime"
                             label="创建时间"
                             width="auto">
            </el-table-column>
            <el-table-column label="操作"
                             width="220">
              <template slot-scope="scope">

                <el-button @click="handleClickDetails(scope.row)"
                           type="text"
                           size="small"
                           style="background-color:#fff;color:#1369c2">任务详情</el-button>
                <el-button type="text"
                           @click="handleClickExecute(scope.row)"
                           size="small"
                           style="background-color:#fff;color:#1369c2">立即执行</el-button>

                <el-button type="text"
                           size="small"
                           @click="handleReport(scope.$index, scope.row)"
                           style="background-color:#fff;color:#1369c2">查看报告</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页逻辑 -->
          <el-pagination layout="total,sizes,prev, pager, next"
                         :page-sizes="[5, 10, 15, 20]"
                         :page-size="pagesize"
                         :total="total"
                         @current-change="handleCurrentChange"
                         @size-change="handleSizeChange">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="任务集执行结果查看">
          <div style="height:500px">
            <div style="margin: 100px auto;color:skyblue;font-size:20px">我还没有定下来哦~期待后期的我吧</div>
          </div>

        </el-tab-pane>
      </el-tabs>
      <!-- 点击详情弹出页面 -->
      <el-dialog title="查看详情"
                 style="text-align:left"
                 width="50%"
                 top="10vh"
                 @open='openContent()'
                 :modal-append-to-body='false'
                 append-to-body
                 :visible.sync="dialogDetailsVisible">
        <el-table :show-header="false"
                  :data="tableData3"
                  border
                  :cell-style="columnStyle"
                  style="width: 100%; margin-top: 20px">

          <el-table-column width="180"
                           prop="name"></el-table-column>
          <el-table-column prop="amount1">
            <template slot-scope="scope">
              <el-button size="mini"
                         v-if='(scope.$index)==(tableData3.length-1)'>查看报告</el-button>
              <span prop="amount1"
                    v-else>{{scope.row.amount1}}</span>
            </template>
          </el-table-column>

        </el-table>

      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      pagesize: 10,
      currpage: 1,
      total: 0,
      taskname: '',
      province: '',
      dialogCreatVisible: false,
      dialogFormVisible: false,
      dialogDetailsVisible: false,
      formLabelWidth: '120px',
      reportButton: false,
      dataForm: {},
      formInline: {
        createuser: '',
        taskid: '',
        roleName: '',
        rolePlay: '',
        roleText: '',
        domains: [{
          value: ''
        }],
      },
      formEdit: {
        roleNameEdit: '',
        rolePlayEdit: '',
        roleTextEdit: ''
      },
      tableData: [],
      tableData1: [{
        name: '1',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '2',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '4',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '5',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '3',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '9',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '2',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '4',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '6',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }, {
        name: '2',
        province: '江苏联通集团开销户',
        city: 'lisi@ebupt.com',
        address: 'jslt_Boss接口',
        mobile: '立即执行',
        status: '正常'
      }]
    }
  },
  computed: {
    //因为数据用到了dataform中的数据，所以写在了computed中
    tableData3 () {
      return [
        {
          name: "执行编号",
          amount1: this.taskname,

        },
        {
          name: "任务名称",
          amount1: this.taskname,
        },
        {
          name: "任务说明",
          amount1: '会员名称',
        },
        {
          name: "基础信息",
          amount1: '用户来源',
        },
        {
          name: "执行方式",
          amount1: '用户来源',
        },
        {
          name: "执行间隔",
          amount1: '用户来源',
        },
        {
          name: "执行次数",
          amount1: '用户来源',
        },
        {
          name: "发送邮件",
          amount1: '用户来源',
        },
        {
          name: "执行状态",
          amount1: '用户来源',
        },
        {
          name: "执行结果",
          amount1: '用户来源',
        },
        {
          name: "测试报告",
        },
      ];
    }
  },
  created () {
    this.onSubmit()
  },
  methods: {
    // 自定义列背景色
    columnStyle ({ rowIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (rowIndex % 2 !== 0) {
        //第三第四列的背景色就改变了2和3都是列数的下标
        return "background:#f3f6fc;";
      } else {
        return "background:#ffffff;";
      }
    },
    // 点击renwuxiangq 
    handleEdit1 (index, row) {
      console.log(index, row);

    },
    //关于分页的方法
    handleCurrentChange (cpage) {
      this.currpage = cpage;
      this.onSubmit()
    },
    handleSizeChange (psize) {
      console.log(psize)
      this.pagesize = psize;
      this.onSubmit()

    },
    //主页面查询
    onSubmit () {
      // console.log('submit!');
      this.loading = true
      this.$http.getReportSearch(this.pagesize, this.currpage, this.formInline.createuser, this.formInline.taskid).then((res) => {
        console.log(res.data.data);
        if (res.data.data && res.data.code == '0000') {
          this.tableData = res.data.data
          this.loading = false
          this.total = res.data.paging.total;//总信息条数从数据库获取;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].failure == 0 && this.tableData[i].error == 0) {
              this.tableData[i].failure = '全部成功'
            } else if (this.tableData[i].failure !== 0 && this.tableData[i].error !== 0) {
              this.tableData[i].failure = '错误' + this.tableData[i].error + '次' + '/' + '失败' + this.tableData[i].failure + '次'
            } else if (this.tableData[i].failure !== 0 && this.tableData[i].error == 0) {
              this.tableData[i].failure = '失败' + this.tableData[i].failure + '次'
            } else if (this.tableData[i].failure == 0 && this.tableData[i].error !== 0) {
              this.tableData[i].failure = '错误' + this.tableData[i].error + '次'
            }
          }
        }

      }).catch(() => {
        //请求失败关闭；
        this.loading = false
        this.$message.error('请求超时了哦');
      })
    },
    creatRoleClick () {
      console.log('新增');
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
    },
    removeDomain (item) {
      var index = this.formInline.domains.indexOf(item)
      if (index !== -1) {
        this.formInline.domains.splice(index, 1)
      }
    },
    removeMock (item) {
      var index = this.formInline.mocks.indexOf(item)
      if (index !== -1) {
        this.formInline.mocks.splice(index, 1)
      }
    },
    addDomain () {
      this.formInline.domains.push({
        value: '',
        key: Date.now()
      });
    },
    addMock () {
      this.formInline.mocks.push({
        value1: '',
        key: Date.now()
      });
    },
    submitForm (formName) {
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
    //执行事件按钮
    handleClickExecute () {
      //  console.log(index, row);
      this.$confirm('确定要立即执行此任务所有用例吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '创建成功!'
        });
      }).catch(() => {

      });
    },
    //日志详情按钮操作事件
    //详情事件按钮
    handleClickDetails (row) {
      console.log(row, '详情');
      this.taskname = row.taskname,
        this.province = row.province,
        this.dialogDetailsVisible = true

    },
    // 报告点击事件
    handleReport () {
      window.open('https://element.eleme.io')
    },
    openContent () {
      console.log(this.tableData3)
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
  margin-top: 30px;
  margin-bottom: 20px;
  // margin-right: 205px;
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
.el-textarea {
  width: 193px !important;
  margin-right: 20px;
}
//任务详情页面
.el-card.is-always-shadow {
  width: 50%;
}
</style>