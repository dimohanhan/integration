<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 80px;">脚本管理-脚本文件导入</div>
    </div>
    <div class="mainContent">
      <el-row :gutter="10">
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-col :md="3"
                  :lg="8">
            <el-form-item label="产品名称:"
                          prop="productid"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.productid"
                         style="width: 100%"
                         placeholder="请选择"
                         @change="onChangeProduct">
                <el-option v-for="item in productData"
                           :key="item.productid"
                           :label="item.name"
                           :value="item.productid"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="3"
                  :lg="8">
            <el-form-item label="模块名称:"
                          prop="moduleid"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.moduleid"
                         style="width: 100%"
                         @change="onChangeMoudle"
                         placeholder="请选择">
                <el-option v-for="item in moduleData"
                           :key="item.moduleid"
                           :label="item.modulename"
                           :value="item.moduleid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6"
                  :lg="10">
            <el-form-item label="测试依赖python文件:"
                          label-width="160px">
              <el-upload class="upload-demo"
                         ref="upload"
                         :action="baseUrl+'/script/v1/add/'"
                         multiple
                         :headers='headers'
                         :data="{productid:this.formInline.productid,moduleid:this.formInline.moduleid,username:username}"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :before-upload="beforeAvatarUpload"
                         :on-success="success"
                         :file-list="fileList"
                         :auto-upload="false">
                <el-button slot="trigger"
                           style=""
                           size="small"
                           type="">选取文件</el-button>
                <el-button style="margin-top: 10px;"
                           size="small"
                           type=""
                           @click="submitUpload">上传文件</el-button>
                <div slot="tip"
                     class="el-upload__tip">只能上传python格式文件，文件不能超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div id="listText"
           v-if="show">脚本列表</div>
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline"
               style="text-align: left;margin-top:10px">
        <el-form-item label="脚本名称:"
                      :label-width="formLabelWidth">
          <el-input v-model="formInline.filename"
                    placeholder="脚本名称"></el-input>
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
                ref="multipleTable"
                :row-key='getRowKeys'
                v-if="show"
                v-loading="loading"
                :cell-style="{padding:'3px'}"
                @selection-change="handleSelectionChange"
                :header-cell-style="{background:'#F2F2F2'}"
                :default-sort="{prop: 'index', order: 'descending'}">
        <el-table-column type="selection"
                         width="55"
                         :reserve-selection='true'>
        </el-table-column>
        <el-table-column fixed
                         type="index"
                         label="序号"
                         sortable
                         width="70">
          <template slot-scope="scope">
            <span>{{scope.$index+(currpage - 1) * pagesize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productid"
                         label="产品名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="moduleid"
                         label="模块名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="filename"
                         label="脚本名称"
                         width="auto">
        </el-table-column>
        <el-table-column prop="createuser"
                         label="创建者"
                         width="auto">
        </el-table-column>
        <el-table-column prop="createtime"
                         sortable
                         label="创建时间"
                         width="auto">
        </el-table-column>

      </el-table>

      <!-- 分页逻辑 -->
      <el-pagination layout="total,sizes,prev, pager, next"
                     v-if="show"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="pagesize"
                     :total="total"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange">
      </el-pagination>
      <div v-if="show"
           style="text-align:left;margin-left:30px;margin-bottom:30px">
        <el-button type="danger"
                   size=""
                   :disabled="openIsDisabled"
                   @click="handleDelete()"
                   icon="el-icon-delete">删除</el-button>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  data () {
    this.username = localStorage.getItem('uid')
    return {
      getRowKeys (row) {
        return row.scriptid
      },

      baseUrl: 'http://10.1.94.89:8000',
      headers: {},
      pagesize: 10,
      currpage: 1,
      openIsDisabled: true,
      dialogCreatVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      show: false,
      valuee: '',
      uid: '',
      formInline: {
        filename: '',
        moduleid: '',
        productid: '',
      },
      productData: [],//产品名称的下拉数据
      moduleData: [],//模块名称的下拉数据
      formEdit: {
        roleNameEdit: '',
        rolePlayEdit: '',
        roleTextEdit: ''
      },
      tableData: [],
      fileList: [],
      formdata: {},
      loading: false,
      total: 0,
      arr: []
    }
  },
  created () {
    this.handleimportProduct()
    this.headers = { Authorization: localStorage.getItem('Authorization') }

  },
  methods: {

    onSubmit () {
      console.log('submit!');
      this.loading = true
      this.show = true
      this.$http.getImportSearch(this.pagesize, this.currpage, this.formInline.moduleid, this.formInline.filename, this.formInline.productid, '-createtime').then((res) => {
        console.log(res.data.data);
        if (res.data.data && res.data.code == '0000') {
          this.tableData = res.data.data
          this.loading = false
          this.total = res.data.paging.total;//总信息条数从数据库获取;
          console.log(this.total)
        }

      }).catch(() => {
        //请求失败关闭；
        this.loading = false
        this.$message.error('请求出错了哦');
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
        this.$http.getImportDelete(this.arr).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            this.$refs.multipleTable.clearSelection();// 删除后清空之前选择的数据
            this.onSubmit()
          }
        });
      }).catch(() => {

      });
    },
    // removeDb (item) {
    //   var index = this.formInline.Dbs.indexOf(item)
    //   if (index !== -1) {
    //     this.formInline.Dbs.splice(index, 1)
    //   }
    // },
    // removeMock (item) {
    //   var index = this.formInline.mocks.indexOf(item)
    //   if (index !== -1) {
    //     this.formInline.mocks.splice(index, 1)
    //   }
    // },
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
    //记录翻页数据事件
    handleSelectionChange (val) {
      console.log(val.length, '记录翻页数据')
      if (val.length !== 0) {
        this.openIsDisabled = false

      } else {
        this.openIsDisabled = true
      }
      this.arr = new Array();
      for (var i = 0; i < val.length; i++) {
        console.log(val[i].scriptid)
        this.arr.push(val[i].scriptid)
      }
      console.log(this.arr);
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
    //表单提交
    submitUpload (file) {
      console.log(file)
      console.log(this.formInline.productid, '999')
      if (this.formInline.productid !== '' && this.formInline.moduleid !== '') {
        this.$refs.upload.submit();
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          offset: 50,
          message: '产品名称和模块名称为必填项!'
        });
      }

    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    //选中产品名称的时候，调取模块名称下拉
    onChangeProduct (val) {
      console.log(val)
      this.$http.getImportModule(val).then((res) => {
        console.log(res.data.data);
        this.moduleData = res.data.data
      });
    },
    //模块名称的下拉
    handleImportModule () {
      this.$http.getImportModule(this.formInline.productid).then((res) => {
        console.log(res.data.data);
        this.moduleData = res.data.data
      });
    },
    //模块名称change事件显示表格,并且调取表格接口查询
    onChangeMoudle (val) {
      console.log(val)
      this.show = true
      this.$http.getImportSearch(this.pagesize, this.currpage, this.formInline.moduleid, this.formInline.filename, this.formInline.productid, '-createtime').then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data
      });
    },
    //产品模块下拉
    handleimportProduct () {
      this.$http.getimportProduct().then((res) => {
        console.log(res.data.data);
        this.productData = res.data.data
      });
    },
    //针对新增页面上传文件的文件限制
    beforeAvatarUpload (file) {
      console.log(file, '上传文件前')
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'py'
      const isLt2M = file.size / 1024 < 500
      if (!extension) {
        this.$message({
          message: '上传文件只能是python格式!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500kB!',
          type: 'warning'
        });
      }
      return extension && isLt2M
    },
    //上传成功后的回调
    success (file, fileList) {
      console.log(file, fileList)
      this.$http.getImportSearch(this.pagesize, this.currpage, this.formInline.moduleid, this.formInline.filename, this.formInline.productid, '-createtime').then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data
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
.upload-demo {
  text-align: left;
  // margin: 30px 30px;
}
#listText {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 18px;
  color: #1369c2;
  opacity: 1;
  text-align: left;
  margin-left: 30px;
  margin-bottom: 30px;
}
.el-upload__tip {
  margin-top: 0;
}
.el-upload-list {
  overflow: auto;
  height: 150px;
}
</style>