<template>
  <div>
    <div class="header"
         style="width:270px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 80px;">用例管理-产品模块管理</div>
    </div>
    <div class="mainContent">
      <el-form :inline="true"
               :model="formInline"
               style="width: 640px"
               class="demo-form-inline">

        <el-form-item label="产品名称">
          <el-input v-model="formInline.product"
                    placeholder="请输入产品名称"></el-input>
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
      <el-dialog title="用例管理-产品模块的新增"
                 style="text-align:left"
                 width="50%"
                 :inline="true"
                 top="10vh"
                 @close='closeMessage()'
                 :visible.sync="dialogCreatVisible">
        <!-- 新增第一页内容 -->
        <div class="firstPageContent"
             v-if="type === 'A'">
          <el-form :model="formInline"
                   ref="formInline"
                   :inline="true"
                   style="width: 560px;">
            <el-form-item label="归属产品:"
                          :label-width="formLabelWidth">

              <el-select v-model="formInline.productid"
                         value-key="productid"
                         placeholder="请选择">
                <el-option v-for="item in productData"
                           :key="item.productid"
                           :label="item.name"
                           :value="item.productid"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="模块名称:"
                          :label-width="formLabelWidth">
              <el-input style="margin-left:0px"
                        v-model="formInline.modulename"></el-input>
            </el-form-item>
            <!-- 测试环境信息新增内容 -->
            <!-- <div >
            <el-form-item v-for="(domain, index) in formInline.domains"
                          :label="'测试环境信息' + index+':'"
                          :key="domain.key"
                          :label-width="formLabelWidth"
                          :prop="'domains.' + index + '.value'"
                          :rules="{
      required: true, message: '测试环境信息不能为空', trigger: 'blur'
    }">
              <el-input v-model="domain.value"
                        type="textarea"></el-input>

              <el-button v-if="index >= 1"
                         type="danger"
                         @click.prevent="removeDomain(domain)">删除</el-button>

            </el-form-item>
            <el-form-item>
              <el-button @click="addDomain"
                         style="    margin-top: 14px;">新增</el-button>
            </el-form-item>
          </div> -->
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
              <el-input v-model="formInline.desc"></el-input>
            </el-form-item>
            <el-form-item label="测试依赖excel文件:"
                          label-width="150px">
              <el-upload class="upload-demo"
                         ref="upload"
                         :action="baseUrl+'/module/v1/manage/'"
                         multiple
                         :data="{optype:'0',productid:this.formInline.productid,modulename:this.formInline.modulename,desc:this.formInline.desc,username:this.updateuser}"
                         :on-preview="handlePreview"
                         :on-remove="remove"
                         :on-success="success"
                         :file-list="fileList"
                         :limit="1"
                         :before-upload="beforeAvatarUpload"
                         :on-exceed="handleExceed"
                         :auto-upload="false">
                <el-button slot="trigger"
                           size="small"
                           type="">选取文件</el-button>
                <div slot="tip"
                     style="width: 250px;"
                     class="el-upload__tip">只能上传excel格式文件，文件不能超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <!-- <el-button type="primary"
                       icon=" iconfont icon-icon-test"
                       @click="allocation()">保存并开始环境配置</el-button> -->
            <el-button type="primary"
                       icon=" iconfont icon-baocun"
                       @click="submitUpload">保存</el-button>
          </div>
        </div>
        <!-- 新增第二页内容 -->
        <div class="nextPageContent"
             v-if="type === 'B'">
          <el-form :model="formInline"
                   ref="formInline">
            <!-- 测试环境信息新增内容 -->
            <el-form-item>
              <el-button @click="addDomain"
                         type="primary">新增</el-button>
            </el-form-item>
            <div style="font-size:16px">新增成功后的信息将会在下方展示:</div>
            <div>
              <el-form-item v-for="(domain, index) in formInline.domains"
                            :label="'测试环境信息' + (index+1)+':'"
                            :key="(domain.environmentid)"
                            :label-width="formLabelWidth"
                            style="margin-top: 30px">
                <el-card>
                  <div style="width:auto;height:100px;overflow:auto;white-space: pre-wrap">
                    {{'环境名称:'+domain.environmentname+'\n'}}
                    {{'服务器host:'+domain.host+'\n'}}
                    {{'ssh端口:'+domain.port+'\n'}}
                    {{'服务器用户名:'+domain.user+'\n'}}
                    {{'服务器密码:'+domain.password+'\n'}}
                    {{'数据库编号:'+domain.db+'\n'}}
                    {{'代码部署路径:'+domain.contents+'\n'}}
                  </div>
                </el-card>
                <div style="position: relative;left: 300px;bottom: 90px;">
                  <el-button type=""
                             @click.prevent="resertDomain(domain)">修改</el-button>
                  <el-button type="danger"
                             @click.prevent="removeDomain(domain)">删除</el-button>
                </div>
              </el-form-item>
            </div>
          </el-form>

        </div>
      </el-dialog>
      <!-- 点击新增按钮环境，弹出输入的文本 -->
      <el-dialog title="测试环境信息填写"
                 :visible.sync="dialog"
                 :show-close='false'
                 :close-on-click-modal='true'>
        <el-form :model="formEnvironment"
                 style="width: 300px;">
          <el-form-item label="环境名称:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.environmentname"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务器host:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.host"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ssh端口:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.port"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务器用户名:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.user"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务器密码:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库编号:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.db"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="代码部署路径:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironment.contents"
                      autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="EmessageSave">保存</el-button>
        </div>
      </el-dialog>
      <!-- 点击修改按钮环境，弹出输入的文本 -->
      <el-dialog title="测试环境信息修改"
                 :visible.sync="dialogReaert"
                 :show-close='false'
                 @close='closeMessageD()'>
        <el-form :model="formEnvironmentResert"
                 style="width: 300px;">
          <el-form-item label="环境名称:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.environmentname"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务器host:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.host"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ssh端口:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.port"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务器用户名:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.user"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="服务器密码:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据库编号:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.db"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="代码部署路径:"
                        :label-width="formLabelWidth">
            <el-input v-model="formEnvironmentResert.contents"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="EmessageResert">保存</el-button>
        </div>
      </el-dialog>
      <!-- 主页的内容表格 -->
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px"
                border
                v-loading="loading"
                :cell-style="{padding:'3px'}"
                :header-cell-style="{background:'#F2F2F2'}">
        <el-table-column fixed
                         type="index"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="product"
                         label="归属产品"
                         width="auto">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="mock"
                         width="auto">
        </el-table-column>
        <el-table-column prop="createuser"
                         label="创建者"
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
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="pagesize"
                     :total="total"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <!-- 点击编辑弹出页面 -->
    <el-dialog title="用例管理-产品模块的修改"
               style="text-align:left"
               width="50%"
               :inline="true"
               top="10vh"
               :visible.sync="dialogFormVisible">
      <!-- 编辑页面第一页内容 -->
      <div class="firstEditPage"
           v-if="type1=== 'a'">
        <el-form :model="formInline"
                 ref="formInline"
                 :inline="true"
                 style="width: 560px;">
          <el-form-item label="归属产品:"
                        :label-width="formLabelWidth">

            <el-select v-model="formInline.productidDetails"
                       placeholder="请选择">
              <el-option v-for="item in productData"
                         :key="item.productid"
                         :label="item.name"
                         :value="item.productid"></el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="模块名称:"
                        :label-width="formLabelWidth">
            <el-input v-model="formInline.modulenameDetails"></el-input>
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
            <el-input v-model="formInline.descDetails"></el-input>
          </el-form-item>
          <el-form-item label="测试依赖Excel文件:"
                        label-width="150px">
            <el-upload class="upload-demo"
                       ref="upload1"
                       :action="baseUrl+'/module/v1/manage/'"
                       multiple
                       :data="{optype:'1',productid:this.formInline.productidDetails,
                       modulename:this.formInline.modulenameDetails,desc:this.formInline.descDetails,
                       username:this.updateuser,moduleid:this.moduleidDetails}"
                       :file-list="fileList1"
                       :on-preview="handlePreview1"
                       :on-exceed="handleExceed1"
                       :on-success="success1"
                       :on-error="error1"
                       :before-upload="beforeAvatarUpload1"
                       :limit="1"
                       :auto-upload="false">
              <el-button slot="trigger"
                         size="small"
                         type="">选取文件</el-button>
              <div slot="tip"
                   style="width: 260px;"
                   class="el-upload__tip">只能上传excel格式文件，文件不能超过500kb</div>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     icon=" iconfont icon-baocun"
                     @click="submitUpload1">保存</el-button>
        </div>
      </div>
      <!-- 编辑页面第二页内容 -->
      <div class="secondEditPage"
           v-if="type1 === 'b'">
        <el-form :model="formInline"
                 ref="formInline"
                 :inline="true"
                 style="width: 600px;">
          <el-form-item :label-width="formLabelWidth">
            <el-button @click="addDomain1">新增</el-button>
          </el-form-item>
          <div>
            <!-- 测试环境信息新增内容 -->
            <el-form-item v-for="(domain, index) in formInline.domains1"
                          :label="'测试环境信息' + index+':'"
                          :key="domain.key"
                          :label-width="formLabelWidth"
                          :prop="'domains1.' + index + '.value'">
              <el-card>
                <div style="width:auto;height:100px;overflow:auto;white-space: pre-wrap">
                  {{'环境名称:'+domain.environmentname+'\n'}}
                  {{'服务器host:'+domain.host+'\n'}}
                  {{'ssh端口:'+domain.port+'\n'}}
                  {{'服务器用户名:'+domain.user+'\n'}}
                  {{'服务器密码:'+domain.password+'\n'}}
                  {{'数据库编号:'+domain.db+'\n'}}
                  {{'代码部署路径:'+domain.contents+'\n'}}
                </div>
              </el-card>
              <div style="position: relative;left: 300px;bottom: 90px;">
                <el-button type=""
                           @click.prevent="resDomain(domain)">修改</el-button>
                <el-button type="danger"
                           @click.prevent="removeDomain1(domain)">删除</el-button>
              </div>

            </el-form-item>
          </div>

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      str: '',
      dialog: false,
      dialogReaert: false,
      baseUrl: 'http://10.1.94.89:8000',
      updateuser: '',
      pagesize: 10,
      currpage: 1,
      total: 0,
      dialogCreatVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      show: false,
      show1: false,
      type: 'A',
      type1: 'a',
      fileList: [],
      fileList1: [],
      formInline: {
        productid: '',//产品id
        modulename: '',//模块名称
        desc: '',//备注说明
        roleName: '',
        rolePlay: '',
        roleText: '',
        domains: [],//新增环境信息列表
        domains1: [],//修改环境信息列表
        productidDetails: '',
        modulenameDetails: '',
        descDetails: ''
      },
      //存放环境信息页面信息的
      formEnvironment: {
        environmentname: '',
        moduleid: '',
        host: '',
        port: '',
        user: '',
        password: '',
        db: '',
        contents: '',
        username: '',
        str: ''
      },
      //存放环境信息修改页面信息
      formEnvironmentResert: {
        environmentname: '',
        environmentid: '',
        moduleid: '',
        host: '',
        port: '',
        user: '',
        password: '',
        db: '',
        contents: '',
        username: '',
      },
      formEdit: {
        roleNameEdit: '',
        rolePlayEdit: '',
        roleTextEdit: '',

      },
      tableData: [],
      loading: false,
      productData: [],//产品下拉数据
      environmentList: [],
      aaa: [],
      flag: '',
      moduleidenvieorment: '',//保存成功的模块id，用来环境新增接口
      moduleidDetails: ''//点击编辑存放当前信息的moudleid
    }
  },
  created () {
    this.onSubmit()
    this.updateuser = localStorage.getItem('uid')

  },
  methods: {
    //环境页面，点击新增，新增文本框
    addDomain () {

      this.dialog = true
      this.formEnvironment.environmentname = ''
      this.formEnvironment.moduleid = ''
      this.formEnvironment.host = ''
      this.formEnvironment.port = ''
      this.formEnvironment.user = ''
      this.formEnvironment.password = ''
      this.formEnvironment.db = ''
      this.formEnvironment.contents = ''
      this.formEnvironment.updatetime = ''
      this.formEnvironment.updateuser = ''
    },
    //从新增模块进入的点击环境信息修改的时候
    resertDomain (domain) {
      console.log(domain.environmentid, '环境id')
      this.formEnvironmentResert.environmentname = domain.environmentname
      this.formEnvironmentResert.host = domain.host
      this.formEnvironmentResert.port = domain.port
      this.formEnvironmentResert.user = domain.user
      this.formEnvironmentResert.password = domain.password
      this.formEnvironmentResert.db = domain.db
      this.formEnvironmentResert.contents = domain.contents
      this.formEnvironmentResert.environmentid = domain.environmentid
      this.dialogReaert = true
    },
    //从编辑模块进入的点击环境信息修改的时候
    resDomain (domain) {
      console.log(domain.environmentid, '环境id')
      this.formEnvironmentResert.environmentname = domain.environmentname
      this.formEnvironmentResert.host = domain.host
      this.formEnvironmentResert.port = domain.port
      this.formEnvironmentResert.user = domain.user
      this.formEnvironmentResert.password = domain.password
      this.formEnvironmentResert.db = domain.db
      this.formEnvironmentResert.contents = domain.contents
      this.formEnvironmentResert.environmentid = domain.environmentid
      this.dialogReaert = true
    },
    //从编辑按钮进入到环境页面，点击新增，新增文本框
    addDomain1 () {
      this.dialog = true
      this.formEnvironmentResert.environmentname = ''
      this.formEnvironmentResert.moduleid = ''
      this.formEnvironmentResert.host = ''
      this.formEnvironmentResert.port = ''
      this.formEnvironmentResert.user = ''
      this.formEnvironmentResert.password = ''
      this.formEnvironmentResert.db = ''
      this.formEnvironmentResert.contents = ''
      this.formEnvironmentResert.updatetime = ''
      this.formEnvironmentResert.updateuser = ''
    },
    //进入环境信息配置管理页面，点击新增弹出页面输入信息保存操作
    EmessageResert () {
      console.log(this.formEnvironmentResert)
      this.formEnvironmentResert.username = this.updateuser
      this.dialogReaert = false
      if (this.flag == 'bianji') {
        this.formEnvironmentResert.moduleid = this.moduleidDetails//存储编辑修改后产生的moduleid
        //环境信息的修改
        this.$http.getEnvironmentResert(this.formEnvironmentResert).then((res) => {
          if (res.data.code == '0000') {
            this.dialog = false
            this.$http.getEnvironmentSearch(this.formEnvironmentResert.moduleid, 'createtime').then((res) => {
              if (res.data.code == '0000') {
                this.formInline.domains1 = res.data.data
              }
            })
          }
        });
      } else {
        this.formEnvironmentResert.moduleid = this.moduleidenvieorment//存储新增模块后产生的moduleid
        //环境信息的修改
        this.$http.getEnvironmentResert(this.formEnvironmentResert).then((res) => {
          if (res.data.code == '0000') {
            this.dialog = false
            this.$http.getEnvironmentSearch(this.formEnvironmentResert.moduleid, 'createtime').then((res) => {
              if (res.data.code == '0000') {
                this.formInline.domains = res.data.data
              }
            })
          }
        });
      }
    },
    //进入环境信息配置管理页面，点击新增弹出页面输入信息保存操作
    EmessageSave () {
      console.log(this.formEnvironment)
      this.formEnvironment.username = this.updateuser
      if (this.flag == 'xinzeng') {
        console.log('新增模块后产生的moduleid')
        this.formEnvironment.moduleid = this.moduleidenvieorment//存储新增模块后产生的moduleid
        //环境信息的新增
        this.$http.getEnvironmentSave(this.formEnvironment).then((res) => {
          if (res.data.code == '0000') {
            console.log(res.data.data, '我是环境配置页面新增成功的接口返回数据');
            this.dialog = false
            this.$http.getEnvironmentSearch(this.formEnvironment.moduleid, 'createtime').then((res) => {
              if (res.data.code == '0000') {
                this.formInline.domains = res.data.data
                console.log(res.data.data);
              }
            })
          }
        });
      } else {
        console.log('编辑修改后产生的moduleid')
        this.formEnvironment.moduleid = this.moduleidDetails//存储编辑修改后产生的moduleid
        //环境信息的新增
        this.$http.getEnvironmentSave(this.formEnvironment).then((res) => {
          if (res.data.code == '0000') {
            console.log(res.data.data, '我是环境配置页面新增成功的接口返回数据');
            this.dialog = false
            this.$http.getEnvironmentSearch(this.formEnvironment.moduleid, 'createtime').then((res) => {
              if (res.data.code == '0000') {
                this.formInline.domains1 = res.data.data
                console.log(res.data.data);
              }
            })
          }
        });
      }


    },
    //新增配置环境页面的删除按钮
    removeDomain (item) {
      console.log(item.environmentid)
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.getEnvironmentDelete(item.environmentid).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //环境信息的查询
            this.$http.getEnvironmentSearch(this.formEnvironment.moduleid, 'createtime').then((res) => {
              if (res.data.code == '0000') {
                this.formInline.domains = res.data.data
                console.log(res.data.data);
              }
            })

          }
        });
      })
    },
    //编辑配置环境页面的删除按钮
    removeDomain1 (item) {
      console.log(item.environmentid)
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.getEnvironmentDelete(item.environmentid).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //环境信息的查询
            this.$http.getEnvironmentSearch(this.moduleidDetails, 'createtime').then((res) => {
              if (res.data.code == '0000') {
                this.formInline.domains1 = res.data.data
                console.log(res.data.data);
              }
            })

          }
        });
      })
    },
    //主页面查询
    onSubmit () {
      // console.log('submit!');
      this.loading = true
      this.$http.getProductSearch(this.pagesize, this.currpage, '-createtime').then((res) => {
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
        this.$message.error('请求超时了哦');
      })
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
    //产品模块下拉
    handlegetProduct () {
      this.$http.getProduct().then((res) => {
        console.log(res.data.data);
        this.productData = res.data.data
      });
    },
    //选中产品下拉得到的值
    productChange (val) {
      console.log(val)
    },
    //点击新增按钮
    creatRoleClick () {
      console.log('新增');
      this.flag = 'xinzeng'
      console.log(this.flag)
      this.handlegetProduct()
      this.dialogCreatVisible = true
    },
    // 点击编辑按钮事件
    handleEdit (index, row) {
      this.flag = 'bianji'
      console.log(this.flag)
      this.fileList1 = []
      console.log(index, row);
      this.formInline.modulenameDetails = row.modulename
      this.moduleidDetails = row.moduleid
      this.formInline.descDetails = row.desc
      //循环产品下拉框找到对应的id
      this.$http.getProduct().then((res) => {
        console.log(res.data.data);
        this.productData = res.data.data
        for (let i = 0; i < this.productData.length; i++) {
          if (this.productData[i].name == row.product) {
            console.log(1111)
            this.formInline.productidDetails = this.productData[i].productid
          }
        }
      });
      this.dialogFormVisible = true
      var obj = {}
      this.$set(obj, 'name', row.filename);
      this.$set(obj, 'url', row.download)
      this.fileList1.push(obj);

    },
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.getProductDelete(row.moduleid).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            // this.$refs.multipleTable.clearSelection();// 删除后清空之前选择的数据
            this.onSubmit()
          }
        });
      })
    },
    removeMock (item) {
      var index = this.formInline.mocks.indexOf(item)
      if (index !== -1) {
        this.formInline.mocks.splice(index, 1)
      }
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
    //新增页面仅保存按钮
    submitUpload () {
      this.$refs.upload.submit();
    },
    //编辑页面中仅保存上传
    submitUpload1 () {
      this.$refs.upload1.submit();
      // this.$refs.upload1.clearFiles();
      // this.$message.warning('该文件已上传,请重新选择!')
    },
    //新增点击环境配置按钮调取保存接口获取id
    allocation () {
      this.$refs.upload.submit();
    },
    //新增页面文件上传成功后的回调
    success (data) {
      if (data.code == '400') {
        this.$message.error(data.description);
        this.$refs.upload.clearFiles();
      }
      if (data.code == '0000') {
        this.moduleidenvieorment = data.moduleid
        this.$confirm('保存成功,是否进行环境配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.type = 'B'
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });

      } else {
        this.$message.error('接口异常,请重新上传');
      }
    },
    //修改页面文件上传成功后的回调
    success1 (data) {
      console.log(data.code)
      if (data.code == '400') {
        this.$message.error(data.description);
        this.$refs.upload.clearFiles();
      }
      if (data.code == '0000') {
        this.moduleidDetails = data.moduleid
        console.log(this.moduleidDetails)
        this.$confirm('保存成功,是否进行环境配置?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.type1 = 'b'
          this.$http.getEnvironmentSearch(this.moduleidDetails, 'createtime').then((res) => {
            if (res.data.code == '0000') {
              this.formInline.domains1 = res.data.data
              console.log(res.data.data);
            }
          })
        }).catch(() => {
        });

      } else {
        this.$message.error('接口异常,请重新上传');
      }
    },
    //修改页面文件上传失败后的回调
    error1 (data) {
      console.log(data)
    },
    // 新增页面，选中文件列表中获得的文件，根据状态获取文件是否可以下载
    handlePreview (file) {
      console.log(file, '新增页面选中文件列表中获得的文件');
      if (file.status == 'success') {
        window.open(file.url)
      } else {
        this.$message.warning('文件未上传,请上传成功后进行下载！')
      }
    },
    // 修改选中文件列表中获得的文件，根据状态获取文件是否可以下载
    handlePreview1 (file) {
      console.log(file, '修改选中文件列表中获得的文件');
      if (file.status == 'success') {
        window.open(file.url)
      }
    },
    remove (file, fileList) {
      console.log(file, fileList);
    },
    //新增页面上传的时候文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，您共选择了 ${files.length + fileList.length} 个文件`);
    },
    //修改页面上传的时候文件超出个数限制时的钩子
    handleExceed1 (files, fileList) {
      console.log(files, fileList)
      this.$message.warning(`当前限制选择 1 个文件，您共选择了 ${files.length + fileList.length} 个文件`);
    },

    //针对新增页面上传文件的文件限制
    beforeAvatarUpload (file) {
      console.log(file, '11')
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xlsx'
      const extension2 = testmsg === 'xls'
      const isLt2M = file.size / 1024 < 500
      if (!extension) {
        this.$message({
          message: '上传文件只能是excel格式!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500kB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M
    },
    //针对编辑页面上传文件的文件限制
    beforeAvatarUpload1 (file) {
      console.log(file, '11')
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'xlsx'
      const extension2 = testmsg === 'xls'
      const isLt2M = file.size / 1024 < 500
      if (!extension) {
        this.$message({
          message: '上传文件只能是excel格式!',
          type: 'warning'
        });
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 500kB!',
          type: 'warning'
        });
      }
      return extension || extension2 && isLt2M
    },
    //创建页面弹窗关闭前的回调
    closeMessage () {
      this.$router.go(0)
    },
    closeMessageD () {
      this.$router.go(0)
    }
  }
}
</script>
<style>
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/* //滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: #d5d8e0;
  border-radius: 3px;
}
.el-main[data-v-5954443c] {
  line-height: 0 !important;
}
.el-input__inner:focus {
  border-color: #1369c2;
}
.el-form-item__content {
  width: 230px !important;
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
.el-textarea {
  width: 193px !important;
  margin-right: 20px;
}
.dialog-footer {
  text-align: right;
}
</style>