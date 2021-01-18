<template>
  <div>
    <div class="header"
         style="width:220px; margin-left: 250px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 20px;">测试任务管理-任务集列表</div>
    </div>
    <!-- 页面主要内容 -->
    <div class="mainContent"
         style="text-align: left;">
      <!-- 主页面的表单查询条件 -->
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-form-item label="编号:">
          <el-input v-model="formInline.user"
                    placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="任务名称:">
          <el-input v-model="formInline.user"
                    placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者:">
          <el-input v-model="formInline.user"
                    placeholder="请输入创建者"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type=""
                     size="mimi"
                     icon="el-icon-search"
                     @click="onSubmit">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="onSubmit1">创建任务集</el-button>
        </el-form-item>

      </el-form>
      <!-- 点击创建任务集弹出页面 -->
      <el-dialog style="text-align:left"
                 width="80%"
                 top="10vh"
                 :close-on-click-modal="false"
                 :visible.sync="dialogCreatVisible">
        <!-- 第一页内容 -->
        <div class="nextPageContent"
             v-if="type === 'B'">
          <div id="listText">测试任务管理-任务列表</div>
          <el-form :model="formInline"
                   style="margin-top:10px;width:80%"
                   :inline="true">
            <el-form-item label="任务集名称:"
                          :label-width="formLabelWidth">

              <el-input style="margin-left:0px"
                        v-model="formInline.tastName"></el-input>
            </el-form-item>

            <el-form-item label="产品名称:"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.basicMessage"
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

            </el-form-item>
            <el-form-item label="模块名称:"
                          :label-width="formLabelWidth">

              <el-select v-model="formInline.basicMessage"
                         @change="onChange"
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

            </el-form-item>
            <el-form-item label="任务集说明:"
                          :label-width="formLabelWidth">
              <el-input type="textarea"
                        :rows="2"
                        maxlength="100"
                        show-word-limit
                        placeholder="请输入内容"
                        v-model="formInline.tastExplain">
              </el-input>
            </el-form-item>
          </el-form>

          <div id="listText">任务列表</div>
          <!-- 查询列表的表单 -->
          <el-form :inline="true"
                   :model="formInline"
                   style="width: 100%;margin-bottom:10px"
                   class="demo-form-inline">
            <el-form-item label="接口名称"
                          style="margin-left:30px">
              <el-select v-model="formInline.basicMessage">
                <el-option label="请选择"
                           value=""></el-option>
                <el-option label="1"
                           value="zhengchang"></el-option>
                <el-option label="2"
                           value="zanting"></el-option>
                <el-option label="3"
                           value="xiaohu"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用例名称:"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.basicMessage">
                <el-option label="请选择"
                           value=""></el-option>
                <el-option label="1"
                           value="zhengchang"></el-option>
                <el-option label="2"
                           value="zanting"></el-option>
                <el-option label="3"
                           value="xiaohu"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"
                         icon="el-icon-search"
                         style="margin-left:20px"
                         @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="tableData"
                    style="width: 94%;margin-left:30px;margin-top: 20px;"
                    border
                    v-if="show"
                    :header-cell-style="{background:'#F2F2F2'}"
                    :cell-style="{padding:'2px'}">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column fixed
                             prop="date"
                             label="序号">
            </el-table-column>
            <el-table-column prop="name"
                             label="任务名称">
            </el-table-column>
            <el-table-column prop="province"
                             label="任务说明">
            </el-table-column>
            <el-table-column prop="city"
                             label="包含接口数量">
            </el-table-column>

            <el-table-column prop="status"
                             label="创建时间">
            </el-table-column>

          </el-table>
          <el-pagination layout="prev, pager, next"
                         :total="1000"
                         v-if="show">
          </el-pagination>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       icon=" iconfont icon-icon-test"
                       @click="allocation()">执行配置</el-button>
            <el-button type="primary"
                       icon=" iconfont icon-baocun"
                       @click="save()">保存</el-button>
          </div>
        </div>
        <!-- 第二页内容 -->
        <div class="thridPageContent"
             v-else-if="type === 'C'">
          <div id="listText">执行配置</div>
          <el-form :model="formInline"
                   style="width: 32%;margin-bottom:10px;"
                   class="demo-form-inline">
            <el-form-item label="重试次数:"
                          :label-width="formLabelWidth">
              <el-input style="margin-left:0px"
                        v-model="formInline.tastName"></el-input>
            </el-form-item>
            <el-form-item label="执行说明:"
                          :label-width="formLabelWidth">
              <el-input type="textarea"
                        :rows="2"
                        maxlength="100"
                        show-word-limit
                        placeholder="请输入内容"
                        v-model="formInline.tastExplain">
              </el-input>
            </el-form-item>
            <el-form-item label="时间间隔:"
                          :label-width="formLabelWidth">
              <el-input style="margin-left:0px"
                        placeholder="请换算为分钟填写"
                        v-model="formInline.tastName"></el-input>
            </el-form-item>
            <el-form-item label="报告方式:"
                          label-width="formLabelWidth">
              <el-radio-group v-model="formInline.report"
                              @change='handleChangeValue(formInline.report)'>
                <el-radio label="N">不发送邮件</el-radio>
                <el-radio label="Y">发送邮件</el-radio>
              </el-radio-group>
              <el-form-item prop="email"
                            label=""
                            v-if="inputOpen"
                            :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
                <el-input v-model="formInline.email"
                          placeholder="请输入邮箱地址  用分号(;)分隔"></el-input>
              </el-form-item>
            </el-form-item>
            <!-- 选择发送邮件时，显示input框 -->

            <el-form-item label="执行方式:"
                          :label-width="formLabelWidth">
              <el-radio-group v-model="formInline.radio"
                              @change='handleChangeRadio(formInline.radio)'>
                <el-radio label="3"
                          style="margin-left: 1px">暂不执行</el-radio>
                <el-radio label="1"
                          style="margin-left: 12px">立即执行</el-radio>
                <el-radio v-model="formInline.radio"
                          label="2"
                          style=" margin-left: 13px;">定时执行</el-radio>
              </el-radio-group>
              <el-form-item>
                <el-date-picker v-model="value1"
                                style="width:355px"
                                type="date"
                                v-if="regularly"
                                placeholder="选择执行日期">
                </el-date-picker>
              </el-form-item>
            </el-form-item>

          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       icon=" iconfont icon-baocun"
                       @click="allocationSave()">保存</el-button>

          </div>
        </div>
      </el-dialog>
      <!-- 任务管理主页面表格 -->
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px"
                border
                :header-cell-style="{background:'#F2F2F2'}"
                :cell-style="{padding:'5px'}">

        <el-table-column fixed
                         prop="date"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="name"
                         label="任务集名称"
                         width="130">
        </el-table-column>
        <el-table-column prop="province"
                         label="任务集说明"
                         width="130">
        </el-table-column>
        <el-table-column prop="email"
                         label="包含接口数量"
                         width="150">
        </el-table-column>
        <el-table-column prop="address"
                         label="创建者"
                         width="150">
        </el-table-column>
        <el-table-column prop="zip"
                         label="创建时间">
        </el-table-column>
        <el-table-column prop="zip"
                         label="执行状态">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作日志"
                         width="150">
          <template slot-scope="scope">
            <el-button @click="handleLogClick(scope.row)"
                       type="text"
                       size="small"
                       style="background-color:#fff;color:#1369c2">日志详情</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="230">
          <template slot-scope="scope">
            <el-button @click="handleClickCopy(scope.row)"
                       type="text"
                       size="small"
                       style="background-color:#fff;color:#1369c2">复制</el-button>
            <el-button @click="handleClickDetails(scope.row)"
                       type="text"
                       size="small"
                       style="background-color:#fff;color:#1369c2">详情</el-button>
            <el-button type="text"
                       @click="handleClickExecute(scope.row)"
                       size="small"
                       style="background-color:#fff;color:#1369c2">执行</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleDelete(scope.$index, scope.row)"
                       style="background-color:#fff;color:#1369c2">删除</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleReport(scope.$index, scope.row)"
                       style="background-color:#fff;color:#1369c2">报告</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格的分页 -->
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </div>
    <!-- 页面中弹窗部分 -->
    <!-- 点击复制弹出页面 -->
    <el-dialog title="测试任务集管理-复制"
               style="text-align:left"
               width="80%"
               top="10vh"
               :modal-append-to-body='false'
               append-to-body
               :visible.sync="dialogFormVisible">
      <el-form :model="formInline"
               style="width: 400px;margin-top:10px">
        <el-form-item label="任务名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.tastName"></el-input>

        </el-form-item>
        <el-form-item label="任务说明:"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="2"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入内容"
                    v-model="formInline.tastExplain">
          </el-input>
        </el-form-item>

      </el-form>
      <div id="listText">任务集列表</div>
      <!-- 点击复制进去页面查询列表的表单 -->
      <el-form :inline="true"
               :model="formInline"
               style="width: 100%;margin-bottom:10px"
               class="demo-form-inline">
        <el-form-item label="ID:"
                      :label-width="formLabelWidth">
          <el-input style="margin-left:0px"
                    v-model="formInline.tastName"></el-input>

        </el-form-item>
        <el-form-item label="任务名称:"
                      :label-width="formLabelWidth">
          <el-input style="margin-left:0px"
                    v-model="formInline.tastName"></el-input>

        </el-form-item>
        <el-form-item label="创建者:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.tastName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     style="margin-left:20px"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px;margin-top: 20px;"
                border
                :header-cell-style="{background:'#F2F2F2'}"
                :cell-style="{padding:'2px'}">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column fixed
                         prop="date"
                         label="ID">
        </el-table-column>
        <el-table-column prop="name"
                         label="RDMSID">
        </el-table-column>
        <el-table-column prop="province"
                         label="基础信息名称">
        </el-table-column>
        <el-table-column prop="city"
                         label="接口名称">
        </el-table-column>
        <el-table-column prop="address"
                         label="脚本名称">
        </el-table-column>
        <el-table-column prop="zip"
                         label="脚本说明"
                         w>
        </el-table-column>
        <el-table-column prop="mobile"
                         label="创建者">
        </el-table-column>
        <el-table-column prop="status"
                         label="创建时间">
        </el-table-column>

      </el-table>
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon=" iconfont icon-fuzhi"
                   @click="save()">复制</el-button>
      </div>
    </el-dialog>
    <!-- 点击详情弹出页面 -->
    <el-dialog title="测试任务集管理-详情"
               style="text-align:left"
               width="80%"
               top="10vh"
               :modal-append-to-body='false'
               append-to-body
               :visible.sync="dialogDetailsVisible">
      <el-form :model="formInline"
               style="width: 400px;margin-top:10px">
        <el-form-item label="任务名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.tastName"></el-input>

        </el-form-item>
        <el-form-item label="任务说明:"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="2"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入内容"
                    v-model="formInline.tastExplain">
          </el-input>
        </el-form-item>

      </el-form>
      <div id="listText">任务列表</div>
      <!-- 点击详情进去页面查询列表的表单 -->
      <el-form :inline="true"
               :model="formInline"
               style="width: 100%;margin-bottom:10px"
               class="demo-form-inline">
        <el-form-item label="基础信息名称:"
                      :label-width="formLabelWidth">

          <el-select v-model="formInline.basicMessage"
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
        </el-form-item>
        <el-form-item label="接口名称:"
                      :label-width="formLabelWidth">
          <el-select v-model="formInline.basicMessage"
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
        </el-form-item>
        <el-form-item label="用例名称:"
                      :label-width="formLabelWidth">

          <el-select v-model="formInline.basicMessage">
            <el-option label="请选择"
                       value=""></el-option>
            <el-option label="1"
                       value="zhengchang"></el-option>
            <el-option label="2"
                       value="zanting"></el-option>
            <el-option label="3"
                       value="xiaohu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     style="margin-left:20px"
                     @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData"
                style="width: 94%;margin-left:30px;margin-top: 20px;"
                border
                :header-cell-style="{background:'#F2F2F2'}"
                :cell-style="{padding:'2px'}">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column fixed
                         prop="date"
                         label="序号">
        </el-table-column>
        <el-table-column prop="name"
                         label="RDMSID">
        </el-table-column>
        <el-table-column prop="province"
                         label="基础信息名称">
        </el-table-column>
        <el-table-column prop="city"
                         label="接口名称">
        </el-table-column>
        <el-table-column prop="address"
                         label="脚本名称">
        </el-table-column>
        <el-table-column prop="zip"
                         label="脚本说明"
                         w>
        </el-table-column>
        <el-table-column prop="mobile"
                         label="创建者">
        </el-table-column>
        <el-table-column prop="status"
                         label="创建时间">
        </el-table-column>

      </el-table>
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon=" iconfont icon-xiugai"
                   @click="edit()">修改</el-button>
      </div>
    </el-dialog>
    <!-- 点击日志详弹出页面 -->
    <el-dialog title="日志详情"
               width="60%"
               top="25vh"
               :visible.sync="dialogTableVisible"
               append-to-body>
      <el-table :data="gridData"
                border>
        <el-table-column property="date"
                         label="日期"
                         width="150"></el-table-column>
        <el-table-column property="name"
                         label="姓名"
                         width="200"></el-table-column>
        <el-table-column property="address"
                         label="地址"></el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        tastName: '',
        tastExplain: '',
        basicMessage: '',
        radio: '1',
        report: 'N',
        emails: ''
      },
      type: 'B',
      value1: '',
      value2: '',
      show: false,
      inputOpen: false,//是否展示input框是否发邮件
      regularly: false,//是否展示input框定时执行
      dialogCreatVisible: false,//创建任务页面是否弹窗的判断条件
      dialogFormVisible: false,//复制页面是否弹窗的判断条件
      dialogTableVisible: false,//日志详情页面是否弹窗的判断条件
      dialogDetailsVisible: false,//详情页面是否弹窗的判断条件
      formLabelWidth: '120px',
      closeDialog: false,
      tableData: [{
        date: '1',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '2',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '3',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '4',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '5',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '6',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }, {
        date: '7',
        name: 'wangxiaohu',
        province: '王小虎',
        city: 'lisi@ebupt.com',
        address: '开发组',
        zip: 'TE',
        mobile: '13322349999',
        status: '正常'
      }],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  },
  methods: {

    onSubmit () {
      console.log('submit!');
    },
    // 创建用户按钮事件
    onSubmit1 () {
      console.log('submit!');
      this.dialogCreatVisible = true
    },
    //详情事件按钮
    handleClickDetails (row) {
      console.log(row, '详情');
      this.dialogDetailsVisible = true

    },
    //复制按钮事件
    handleClickCopy (row) {
      console.log(row, '复制');
      this.dialogFormVisible = true
    },
    //执行事件按钮
    handleClickExecute () {
      //  console.log(index, row);
      this.$confirm('确定执行么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '执行成功!'
        });
      }).catch(() => {

      });
    },
    //日志详情按钮操作事件
    handleLogClick (row) {
      console.log(row);
      this.dialogTableVisible = true
    },
    // 删除事件
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
    // 报告点击事件
    handleReport () {
      window.open('https://element.eleme.io')
    },
    // 创建页面点击保存按钮
    save () {
      this.$router.go(0)
      this.dialogCreatVisible = false
    },
    //点击下一步显示下一页
    next () {
      console.log(11)
      this.type = 'B'
    },
    //点击执行配置按钮
    allocation () {
      this.type = 'C'
    },
    //是否发送邮件事件
    handleChangeValue (report) {
      console.log(report)
      if (report == 'Y') {
        this.inputOpen = true
      } else {
        this.inputOpen = false

      }
    },
    //是否执行事件
    handleChangeRadio (radio) {
      console.log(radio)
      if (radio == '2') {
        this.regularly = true
      } else {
        this.regularly = false

      }
    },
    // 创建页面第三页点击保存按钮
    allocationSave () {
      this.$router.go(0)
      this.dialogCreatVisible = false
    },
    //选中模块名称。显示表格
    onChange (val) {
      console.log(val)
      this.show = true
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
.el-button .el-button--text {
  background: #fff !important;
  color: #1369c2 !important;
}
.el-button .el-button--default .el-button--small {
  background-color: #fff !important;
}
.el-input__inner {
  height: 30px;
}
.el-textarea__inner {
  padding: 5px 22px !important;
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
  margin-left: 30px;
}
.el-form--inline .el-form-item[data-v-d9de66ea] {
  margin-right: 27px;
}

.el-form--inline .el-form-item {
  margin-right: 10px;
}
.el-button--primary {
  background-color: #1369c2 !important;
}
#listText {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 18px;
  color: #1369c2;
  opacity: 1;
}
.el-pagination {
  padding: 9px 57px;
  text-align: right;
}
.dialog-footer {
  text-align: right;
}
</style>