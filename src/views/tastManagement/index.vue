<template>
  <div>
    <div class="header"
         style="width:220px; margin-left: 200px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">测试任务管理-任务列表</div>
    </div>
    <!-- 页面整体的内容 -->
    <div class="mainContent">
      <!-- 主页面的表单查询条件 -->
      <el-form :inline="true"
               :model="formInline"
               style="    text-align: left;"
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
                     @click="search">搜索</el-button>
          <el-button type="mimi"
                     icon="el-icon-plus"
                     @click="onSubmit1">创建任务</el-button>
        </el-form-item>

      </el-form>
      <!-- 任务管理主页面表格 -->
      <el-table :data="tableDataMain"
                style="width: 94%;margin-left:30px"
                border
                v-loading="loading"
                ref="multipleTable"
                :header-cell-style="{background:'#F2F2F2'}"
                :cell-style="{padding:'2px'}">

        <el-table-column fixed
                         type="index"
                         label="序号"
                         width="50">
          <template slot-scope="scope">
            <span>{{scope.$index+(currpage - 1) * pagesize + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="taskname"
                         label="任务名称"
                         width="130">
        </el-table-column>
        <el-table-column prop="description"
                         label="任务说明"
                         width="130">
        </el-table-column>
        <el-table-column prop="totalcase"
                         label="包含接口数量"
                         width="150">
        </el-table-column>
        <el-table-column prop="createuser"
                         label="创建者"
                         width="150">
        </el-table-column>
        <el-table-column prop="createtime"
                         label="创建时间">
        </el-table-column>
        <el-table-column prop="status"
                         label="执行状态">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作日志"
                         width="150">
          <template slot-scope="scope">
            <el-button @click="handleLogClick(scope.row)"
                       type="text"
                       size="small"
                       style="background-color:transparent;color:#1369c2">日志详情</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="230">
          <template slot-scope="scope">
            <el-button @click="handleClickCopy(scope.row)"
                       type="text"
                       size="small"
                       style="background-color:transparent;color:#1369c2">复制</el-button>
            <el-button @click="handleClickDetails(scope.row)"
                       type="text"
                       size="small"
                       style="background-color:transparent;color:#1369c2">详情</el-button>
            <el-button type="text"
                       @click="handleClickExecute(scope.row)"
                       size="small"
                       style="background-color:transparent;color:#1369c2">执行</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleDelete(scope.$index, scope.row)"
                       style="background-color:transparent;color:#1369c2">删除</el-button>
            <el-button type="text"
                       size="small"
                       @click="handleReport(scope.$index, scope.row)"
                       style="background-color:transparent;color:#1369c2">报告</el-button>
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
      <!-- 点击创建任务弹出页面 -->
      <el-dialog style="text-align:left"
                 width="80%"
                 top="10vh"
                 @close="closeMessage"
                 :close-on-click-modal="false"
                 :visible.sync="dialogCreatVisible"
                 v-if="dialogCreatVisible">
        <!-- 第一页内容 -->
        <div class="nextPageContent"
             v-if="type === 'B'">
          <div id="listText">测试任务管理-任务列表</div>
          <el-form :model="formInline"
                   :rules="rules"
                   ref="formInline"
                   style="margin-top:10px">
            <el-form-item label="任务名称:"
                          prop="taskname"
                          :label-width="formLabelWidth">
              <el-input style="margin-left:0px"
                        v-model="formInline.taskname"></el-input>
            </el-form-item>
            <el-form-item label="任务说明:"
                          :label-width="formLabelWidth">
              <el-input type="textarea"
                        :rows="2"
                        maxlength="100"
                        show-word-limit
                        placeholder="请输入内容"
                        v-model="formInline.description">
              </el-input>
            </el-form-item>

            <el-form-item label="产品名称:"
                          prop="product"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.product"
                         placeholder="请选择"
                         @change="productChange">
                <el-option v-for="item in productData"
                           :key="item.productid"
                           :label="item.name"
                           :value="item.productid"></el-option>

              </el-select>
            </el-form-item>
            <el-form-item label="模块名称:"
                          prop="moduleid"
                          :label-width="formLabelWidth">
              <el-select v-model="formInline.moduleid"
                         @change="onChange"
                         placeholder="请选择">
                <el-option v-for="item in moduleData"
                           :key="item.moduleid"
                           :label="item.modulename"
                           :value="item.moduleid"></el-option>

              </el-select>
            </el-form-item>
          </el-form>
          <div id="listText">测试任务管理-脚本列表</div>
          <!-- // 使用树形穿梭框组件 -->
          <tree-transfer :from_data='fromData'
                         :to_data='toData'
                         :title="titleTransfer"
                         v-model="toData"
                         :defaultProps="{label:'label'}"
                         :props="{key:'id',label:'label'}"
                         @add-btn='add'
                         @remove-btn='remove'
                         :mode='mode'
                         v-if="show"
                         height='450px'
                         style="width:85%; margin-top: 10px;"
                         @change="aaaaa"
                         filter
                         openAll>
          </tree-transfer>
          <div slot="footer"
               class="dialog-footer"
               style="margin-top:10px">
            <!-- <el-button type="primary"
                       icon=" iconfont icon-icon-test"
                       @click="allocation()">执行配置</el-button> -->
            <el-button type="primary"
                       icon=" iconfont icon-baocun"
                       @click="save('formInline')">仅保存</el-button>
          </div>
          <!-- <div id="listText">脚本列表</div> -->
          <!-- 查询列表的表单 -->
          <!-- <el-form :inline="true"
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
            <el-form-item label="脚本名称:"
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
          <el-table :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
                    row-key="date"
                    v-if="show"
                    style="width: 94%;margin-left:30px;margin-top: 20px;"
                    @selection-change="handleSelectionChange"
                    border
                    :header-cell-style="{background:'#F2F2F2'}"
                    :cell-style="{padding:'2px'}">
            <el-table-column type="selection"
                             width="55"
                             :reserve-selection='true'>
            </el-table-column>
            <el-table-column fixed
                             prop="date"
                             label="序号">
            </el-table-column>
            <el-table-column prop="name"
                             label="RDMSID">
            </el-table-column>
            <el-table-column prop="province"
                             label="模块名称">
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

          </el-table> -->
        </div>
        <!-- 第二页内容 -->
        <div class="thridPageContent"
             v-else-if="type === 'C'">
          <div id="listText">执行配置</div>
          <el-form :model="formInline"
                   :inline="true"
                   ref="formInline"
                   :rules="rules"
                   style="width: 47%;margin-bottom:10px;">
            <el-form-item label="时间间隔:"
                          prop="interval"
                          placeholder="请换算为分钟填写"
                          :label-width="formLabelWidth">
              <el-input style="margin-left:0px"
                        v-model="formInline.interval"></el-input>
            </el-form-item>
            <el-form-item label="执行次数:"
                          :class="[text==true?'is-error':'']"
                          :label-width="formLabelWidth">
              <el-input style="margin-left:0px"
                        v-model="formInline.remainingtimes"></el-input>
              <div v-show="text"
                   style="position: absolute;top: 100%;left: 0;font-size:12px;color:#F56C6C">请输入执行次数</div>
            </el-form-item>
            <el-form-item label="报告方式:"
                          :label-width="formLabelWidth">
              <el-radio-group v-model="formInline.issendemail"
                              @change='handleChangeValue(formInline.issendemail)'>
                <el-radio label="0">不发送邮件</el-radio>
                <el-radio label="1">发送邮件</el-radio>
              </el-radio-group>

            </el-form-item>
            <el-form-item prop="email"
                          label=""
                          v-if="inputOpen">
              <el-input v-model="formInline.email"
                        placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
            <!-- 选择发送邮件时，显示input框 -->
            <el-form-item label="执行方式:"
                          :label-width="formLabelWidth">
              <el-radio-group v-model="formInline.rcycleflag"
                              @change='handleChangeRadio(formInline.rcycleflag)'>
                <el-radio label="2">暂不执行</el-radio>
                <el-radio label="0">立即执行</el-radio>
                <el-radio label="1">定时执行</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="begintime">
              <el-date-picker v-model="formInline.begintime"
                              style="width:355px"
                              type="datetime"
                              v-if="regularly"
                              placeholder="选择执行日期"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <div class="dialog-footer">
              <el-button type="primary"
                         icon=" iconfont icon-baocun"
                         @click="allocationSave('formInline')">保存</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <!-- 分页逻辑 -->
    </div>
    <!-- 关于弹窗的主要内容 -->
    <!-- 点击复制弹出页面 -->
    <el-dialog title="测试任务管理-复制"
               style="text-align:left"
               width="80%"
               top="10vh"
               :modal-append-to-body='false'
               append-to-body
               :visible.sync="dialogFormVisible">
      <el-form style="width: 400px;margin-top:10px">
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
      <!-- 点击复制进去页面查询列表的表单 -->
      <el-form :inline="true"
               :model="formInline"
               style="width: 100%;margin-bottom:10px"
               class="demo-form-inline">
        <el-form-item label="模块名称:"
                      :label-width="formLabelWidth">
          <el-input style="margin-left:0px"
                    v-model="formInline.basicMessage"></el-input>
        </el-form-item>
        <el-form-item label="接口名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.basicMessage"></el-input>
        </el-form-item>
        <el-form-item label="用例名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.basicMessage"></el-input>
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
                         type="index"
                         label="序号">
        </el-table-column>
        <el-table-column prop="rdmsid"
                         label="RDMSID">
        </el-table-column>
        <el-table-column prop="moduleid"
                         label="模块名称">
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
      <!-- <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon=" iconfont icon-fuzhi"
                   @click="copy()">复制</el-button>
      </div> -->
    </el-dialog>
    <!-- 点击详情弹出页面 -->
    <el-dialog title="测试任务管理-详情"
               style="text-align:left"
               width="80%"
               top="10vh"
               :modal-append-to-body='false'
               append-to-body
               @close="closeDetialsMessage"
               :visible.sync="dialogDetailsVisible">
      <el-form style="width: 400px;margin-top:10px">
        <el-form-item label="任务名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.tastNameDetial"></el-input>

        </el-form-item>
        <el-form-item label="任务说明:"
                      :label-width="formLabelWidth">
          <el-input type="textarea"
                    :rows="2"
                    maxlength="100"
                    show-word-limit
                    placeholder="请输入内容"
                    v-model="formInline.tastDescDetial">
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
          <el-input style="margin-left:0px"
                    v-model="formInline.basicMessage"></el-input>
        </el-form-item>
        <el-form-item label="接口名称:"
                      :label-width="formLabelWidth">
          <el-input style="margin-left:0px"
                    v-model="formInline.basicMessage"></el-input>
        </el-form-item>
        <el-form-item label="用例名称:"
                      :label-width="formLabelWidth">

          <el-input style="margin-left:0px"
                    v-model="formInline.basicMessage"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     style="margin-left:20px"
                     @click="onSubmit">查询</el-button>
          <el-button type="primary"
                     icon="el-icon-plus"
                     style="margin-left:20px"
                     @click="scriptAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-button size=""
                 type="danger"
                 :disabled="openIsDisabled"
                 style="margin-left:30px;margin-bottom:20px"
                 @click="handleDelete1()">删除</el-button>
      <!-- 详情页点击新增弹出页面 -->
      <el-dialog title="测试任务管理-脚本新增"
                 style="text-align:left;height:100%"
                 width="60%"
                 top="20vh"
                 :modal-append-to-body='false'
                 append-to-body
                 :visible.sync="dialogDetailsAdd">
        <!-- <div id="listText">脚本列表</div> -->
        <!-- 点击详情新增进去页面查询穿梭框 -->
        <tree-transfer :from_data='fromData1'
                       :to_data='toData1'
                       v-model="toData1"
                       :title="titleTransfer"
                       :defaultProps="{label:'label',children:'children'}"
                       @add-btn='add1'
                       @remove-btn='remove1'
                       :mode='mode'
                       height='450px'
                       style="width:100%; margin-top: 10px;"
                       @change="aaaaa"
                       filter
                       openAll>
        </tree-transfer>
        <div style="text-align:right">
          <el-button @click="scriptSave()"
                     icon="iconfont icon-baocun">保存</el-button>
        </div>

      </el-dialog>
      <el-table :data="tableDataDetial"
                style="width: 94%;margin-left:30px"
                border
                @selection-change="handleSelectionChange"
                :header-cell-style="{background:'#F2F2F2'}"
                :cell-style="{padding:'2px'}">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
        <el-table-column fixed
                         type="index"
                         label="序号">
        </el-table-column>
        <el-table-column prop="rdmsid"
                         label="RDMSID">
        </el-table-column>
        <el-table-column prop="productid"
                         label="产品名称">
        </el-table-column>
        <el-table-column prop="moduleid"
                         label="模块名称">
        </el-table-column>

        <el-table-column prop="address"
                         label="脚本名称">
        </el-table-column>
        <el-table-column prop="zip"
                         label="脚本说明">
        </el-table-column>
        <el-table-column prop="createuser"
                         label="创建者">
        </el-table-column>
        <el-table-column prop="createtime"
                         label="创建时间">
        </el-table-column>

      </el-table>
      <!-- <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   icon=" iconfont icon-xiugai"
                   @click="edit()">修改</el-button>
      </div> -->
      <!-- 分页逻辑 -->
      <el-pagination layout="sizes,prev, pager, next"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="1"
                     :total="tableDataDetial.length"
                     @current-change="handleCurrentChangeDetial"
                     @size-change="handleSizeChangeDetial">
      </el-pagination>
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
    </el-dialog>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer' // 引入
import axios from '../../utils/request';
export default {
  data () {
    //配置管理的时候针对邮箱地址进行校验
    const validatePass = (rule, value, callback) => {
      console.log(value, 'value')
      // eslint-disable-next-line no-useless-escape
      let reg = /^((([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}\,))*(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/;
      console.log(reg)
      if (!reg.test(value)) {
        callback(new Error('请输入正确的邮箱格式,多个邮箱地址需用逗号分隔'));
      } else {
        callback()
      }
    };
    //配置管理的时候针对时间进行校验
    const validatetime = (rule, value, callback) => {
      console.log(value, 'value')
      if (!value && this.radio == 1) {
        callback(new Error('请选择时间'));
      } else {


        callback()
      }
    };
    // eslint-disable-next-line no-unused-vars
    return {
      titleTransfer: ["用例列表", "已选中的用例列表"],
      rules: {
        moduleid: [
          { required: true, message: '请选择模块名称', trigger: 'change' }
        ],
        taskname: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        product: [
          { required: true, message: '请选择产品名称', trigger: 'change' }
        ],
        interval: [
          { required: true, message: '请输入时间间隔', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        begintime: [
          { required: true, validator: validatetime, trigger: 'blur' }
        ],

      },
      text: false,
      emailSplit: '',//存放邮箱地址数据
      mode: "transfer",
      fromData: [],
      fromData1: [],
      toData: [],
      toData1: [],
      generateData: [],
      checked: [], //穿梭框绑定的数据，选定到右侧框中的数据项的value组成的数组
      value: [],
      data: [],
      formInline: {
        taskname: '',
        taskid: '',
        description: '',
        basicMessage: '',
        product: '',
        moduleid: '',
        rcycleflag: '2',//是否执行
        remainingtimes: '',//执行次数
        issendemail: '0',
        interval: '',//执行间隔
        begintime: '',//开始时间
        email: '',//发送邮件填写的邮件
        tastDescDetial: '',//详情页的任务名称
        tastNameDetial: ''//详情页的任务说明
      },
      // idValue: [],//保存穿梭框数剧
      productVal: '',//产品下拉选中的值
      multipleSelection: [],
      pagesize: 10,
      currpage: 1,
      total: 0,
      type: 'B',
      show: false,
      Button: false,//保存和执行配置按钮的展示判断
      secondContent: false,//第二页的内容是否展示
      firstContent: false,//第一页的内容是否展示
      firstContentButton: false,
      regularly: false,//是否展示input框定时执行
      openIsDisabled: true,
      inputOpen: false,//选择发送邮件，显示的对话框
      dialogCreatVisible: false,//创建任务页面是否弹窗的判断条件
      dialogFormVisible: false,//复制页面是否弹窗的判断条件
      dialogTableVisible: false,//日志详情页面是否弹窗的判断条件
      dialogDetailsVisible: false,//详情页面是否弹窗的判断条件
      dialogDetailsAdd: false,//详情页新增
      formLabelWidth: '120px',
      closeDialog: false,
      productData: [],//产品下拉框数据存放
      moduleData: [],//模块下拉数据存放
      tableDataMain: [],//主页表格
      tableDataDetial: [],//详情页表格
      tableData: [],
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
      loading: false,
      taskid: '',
      secondMoudleid: ''//新增第一页保存成功后存储返回的模块id
    }
  },

  created () {
    this.search()

  },
  methods: {
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode == "transfer") {
        this.mode = "addressList";
      } else {
        this.mode = "transfer";
      }
    },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    //穿梭框右边选择数据
    aaaaa (value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    //关于主页分页的方法
    handleCurrentChange (cpage) {
      this.currpage = cpage;
      this.search()
    },
    handleSizeChange (psize) {
      console.log(psize)
      this.pagesize = psize;
      this.search()
    },
    //关于详情页表格分页的方法
    handleCurrentChangeDetial (cpage) {
      this.currpage = cpage;
      this.getTaskDetialSearch()
    },
    handleSizeChangeDetial (psize) {
      console.log(psize)
      this.pagesize = psize;
      this.getTaskDetialSearch()
    },
    //记录翻页数据事件
    handleSelectionChange (val) {
      console.log(val.length, '记录翻页数据')
      if (val.length !== 0) {
        this.openIsDisabled = false
      } else {
        this.openIsDisabled = true
      }
      const arr = []
      this.arr = arr
      this.arr = new Array();
      for (var i = 0; i < val.length; i++) {
        console.log(val[i].scriptid)
        this.arr.push(val[i].scriptid)
      }
      console.log(this.arr);
    },
    //主页表格查询
    search () {
      console.log('search!');
      this.loading = true
      this.$http.getTaskSearch(this.pagesize, this.currpage, '-createtime').then((res) => {
        console.log(res.data.data);
        if (res.data.data && res.data.code == '0000') {
          this.loading = false
          this.tableDataMain = res.data.data
          for (var i = 0; i < this.tableDataMain.length; i++) {
            if (res.data.data[i].status == 0) {
              res.data.data[i].status = '待执行'
            } else if (res.data.data[i].status == 1) {
              res.data.data[i].status = '执行中'
            } else if (res.data.data[i].status == 2) {
              res.data.data[i].status = '任务暂停'
            } else if (res.data.data[i].status == 3) {
              res.data.data[i].status = '执行完成'
            }
            else if (res.data.data[i].status == 4) {
              res.data.data[i].status = '任务取消'
            }
          }

          this.total = res.data.paging.total;//总信息条数从数据库获取;
          console.log(this.total)
        }

      }).catch(() => {
        //请求失败关闭；
        this.loading = false
        this.$message.error('请求出错了哦');
      })

    },
    // 创建用户按钮事件
    onSubmit1 () {
      console.log('submit!');
      //循环拿到的数据进行添加id和pid字段
      this.fromData.forEach((item1, index) => {
        item1.id = index + 1;
        item1.pid = 0;
        item1.children.forEach((item2) => {
          item2.pid = index + 1
        })
      })

      this.dialogCreatVisible = true
      this.handleTaskProduct()
    },
    // 创建页面第一页点击保存按钮
    save (formName) {
      // this.type = 'C'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(111)
          const idValue = []
          this.idValue = idValue
          console.log(this.toData, '点击保存拿到的穿梭框的选中值')
          if (this.toData.length == '0') {
            this.$message.warning('脚本列表为必填项')
          }
          for (var i = 0; i < this.toData.length; i++) {
            for (var j = 0; j < this.toData[i].children.length; j++) {
              console.log(this.toData[i].children[j].id)
              this.idValue.push(this.toData[i].children[j].id)
            }
            console.log(this.idValue)
            this.$http.getTaskAdd(this.formInline.taskname, this.formInline.description, this.formInline.moduleid, this.idValue).then((res) => {
              console.log(res.data);
              if (res.data.code == '0000') {
                this.secondTaskid = res.data.taskid
                this.$confirm('保存成功,是否进行执行配置?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '关闭',
                  type: 'success'
                }).then(() => {
                  this.type = 'C'
                }).catch(() => {
                  this.$router.go(0)
                  this.dialogCreatVisible = false
                });
              } else {
                this.$message.error(res.data.description)
              }

            });
          }
        } else {
          console.log('error submit')
          return false
        }
      })


    },
    // 创建页面第二页点击保存按钮
    allocationSave (formName1) {
      if (this.formInline.remainingtimes == '') {
        console.log('执行次数为空')
        this.text = true
      } else {
        this.text = false
      }
      this.$refs[formName1].validate((valid) => {
        if (valid) {
          console.log(1111)
          if (this.report == '1') {
            this.emailSplit = this.formInline.email.split(",")
            this.formInline.email = this.emailSplit
          } else {
            this.formInline.email = []
          }
          this.formInline.cases = this.idValue
          this.formInline.taskid = this.secondTaskid
          this.$http.getTaskSecondAdd(this.formInline, this.idValue).then((res) => {
            if (res.data.code == '0000') {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.search()
              this.dialogCreatVisible = false
            } else {
              this.$message.error(res.data.description);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onSubmit () {
      console.log('submit!');
      // this.dialogCreatVisible = true
      // this.handleRole()
    },
    //详情事件按钮
    handleClickDetails (row) {
      console.log(row, '详情');
      this.dialogDetailsVisible = true
      this.formInline.tastNameDetial = row.taskname
      this.formInline.tastDescDetial = row.description
      this.taskid = row.taskid
      this.$http.getTaskDetialSearch(this.pagesize, this.currpage, row.taskid, '-createtime').then((res) => {
        if (res.data.code == '0000') {
          this.loading = false
          this.tableDataDetial = res.data.task_cases
          this.total = res.data.paging.total;//总信息条数从数据库获取;
          console.log(this.total)
        } else {
          this.$message.error(res.data.description)
          this.tableDataDetial = []
        }
      });

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
    // 主页表格删除事件
    handleDelete (index, row) {
      console.log(index, row);
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.getTaskDelete(row.taskid).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search()
          } else {
            this.$message.error(res.data.description)
          }
        });

      }).catch(() => {

      });
    },
    // 详情页多选删除事件
    handleDelete1 (index, row) {
      console.log(index, row);
      this.$confirm('确定进行删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.getDetialTaskDelete(this.taskid, this.arr).then((res) => {
          console.log(res.data.code);
          if (res.data.code == '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$http.getTaskDetialSearch(this.pagesize, this.currpage, this.taskid, '-createtime').then((res) => {
              if (res.data.code == '0000') {
                this.loading = false
                this.tableDataDetial = res.data.task_cases
                this.total = res.data.paging.total;//总信息条数从数据库获取;
                console.log(this.total)
              } else {
                this.$message.error(res.data.description)
                this.tableDataDetial = []
              }
            });
          } else {
            this.$message.error(res.data.description)
          }
        });

      }).catch(() => {

      });
    },
    //点击执行配置按钮
    // allocation () {
    //   this.type = 'C'
    // },
    // 报告点击事件
    handleReport () {
      // window.open('https://element.eleme.io')
      this.$message.warning('当前无法下载')
    },
    //是否发送邮件事件
    handleChangeValue (report) {
      console.log(report)
      const report1 = report
      this.report = report1
      if (this.report == '1') {
        this.inputOpen = true

      } else {
        this.inputOpen = false

      }
    },
    //是否执行事件
    handleChangeRadio (radio) {
      console.log(radio)
      const radio1 = radio
      this.radio = radio1
      if (this.radio == '1') {
        this.regularly = true
      } else {
        //找到要清除的执行方式的校验结果
        let _field = this.$refs['formInline'].fields /*当然，你可以打印一下fields*/
        _field.map(i => {
          if (i.prop === 'begintime') {  //通过prop属性值相同来判断是哪个输入框，比如：要移除prop为'user'
            i.resetField()
            return false
          }
        })
        this.regularly = false
        this.formInline.begintime = ''
      }
    },
    //选中模块名称显示表格
    onChange (val) {
      console.log(val, '333')
      this.show = true
      this.$http.getTasktransferSearch(val).then((res) => {
        console.log(res.data.data);
        if (res.data.code == '0000') {
          this.fromData = res.data.data
          this.fromData.forEach((item1, index) => {
            item1.id = index + 1;
            item1.pid = 0;
            item1.children.forEach((item2) => {
              item2.pid = index + 1
              item2.id = item2.scriptid
              console.log(item2.scriptid)
            })

          })
        }
      });

      // this.fetchData()
    },
    //创建页面弹窗关闭前的回调
    closeMessage () {
      this.formInline = ''
      this.$router.go(0)
    },
    //详情页面弹窗关闭前的回调
    closeDetialsMessage () {
      // this.formInline = ''
      // this.$router.go(0)
      console.log('详情页面的关闭回调')
    },
    //穿梭框右侧数据
    handleChange () {
      let a = []
      a.push(this.checked)
      console.log(a)
      // console.log('选中的数据有' + this.checked)
    },
    //产品模块下拉
    handleTaskProduct () {
      this.$http.getTaskProduct().then((res) => {
        console.log(res.data.data);
        this.productData = res.data.data
      });
    },
    //模块名称的下拉
    handleTaskModule () {
      this.$http.getTaskModule(this.formInline.productid).then((res) => {
        console.log(res.data.data);
        this.moduleData = res.data.data
      });
    },
    //选中产品模块下拉值时调取模块名称下拉
    productChange (val) {
      if (val) {
        console.log(val)
        this.$http.getTaskModule(val).then((res) => {
          console.log(res.data.data);
          this.moduleData = res.data.data
        });
      }
    },
    //详情页面中 点击新增进行脚本新增
    scriptAdd () {
      const that = this
      this.dialogDetailsAdd = true
      axios.get('/script/v1/distinct/?taskid=' + this.taskid)
        .then(function (res) {
          console.log(res.data.data);
          that.fromData1 = res.data.data
          //循环拿到的数据进行添加id和pid字段
          that.fromData1.forEach((item1, index) => {
            item1.id = index + 1;
            item1.pid = 0;
            item1.children.forEach((item2) => {
              item2.pid = index + 1
              item2.id = item2.scriptid
              console.log(item2.scriptid)
            })

          })
        })
        .catch(function (error) {
          console.log(error);
        });


    },
    scriptSave () {
      const xqlist = []
      this.xqlist = xqlist
      console.log(this.toData1, '点击保存拿到的穿梭框的选中值')
      if (this.toData1.length == '0') {
        this.$message.warning('脚本列表为必填项')
      }
      for (var i = 0; i < this.toData1.length; i++) {
        for (var j = 0; j < this.toData1[i].children.length; j++) {
          console.log(this.toData1[i].children[j].id)
          this.xqlist.push(this.toData1[i].children[j].id)
        }
      }
      console.log(this.xqlist)
      this.formInline.cases = this.xqlist
      this.$http.getTasktransferAdd(this.taskid, this.xqlist).then((res) => {
        console.log(res.data);
        if (res.data.code == '0000') {
          this.$message({
            type: 'success',
            message: '保存成功',
          })
          this.dialogDetailsVisible = false
        } else {
          this.$message.error(res.data.description)
        }
      });
    },
    // 详情页监听穿梭框组件添加
    add1 (fromData1, toData1, obj) {
      console.log("fromData1:", fromData1);
      console.log("toData1:", toData1);
      console.log("obj:", obj);
    },
    // 详情页监听穿梭框组件移除
    remove1 (fromData1, toData1, obj) {
      console.log("fromData:", fromData1);
      console.log("toData:", toData1);
      console.log("obj:", obj);
    },
  },
  components: { "tree-transfer": treeTransfer } // 注册穿梭框组件
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
.el-button .el-button--text {
  background: #fff !important;
  color: #1369c2 !important;
}
.el-button .el-button--default .el-button--small {
  background-color: #fff !important;
}
.el-input__inner {
  height: 35px !important;
}
.inputCor {
  border-color: #f56c6c !important;
  height: 35px !important;
}
.el-textarea__inner {
  padding: 5px 22px !important;
}
.wl-transfer .transfer-left,
.wl-transfer .transfer-right {
  width: 25% !important;
  /* left: 47px !important; */
}
.el-dialog__body {
  position: relative !important;
}
.wl-transfer .transfer-left {
  left: 70px !important;
  /* top: -20px !important; */
}
.wl-transfer .transfer-center {
  left: 27% !important;
}
.wl-transfer .transfer-right {
  right: 385px !important;
  /* top: -20px !important; */
}
.el-input--small {
  width: 138px !important;
}
.el-date-picker {
  width: 337px !important;
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
  margin-top: 30px;
  margin-bottom: 20px;
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
  margin-top: 109px;
}
.el-pagination .el-select .el-input {
  width: 81px !important;
}
.el-transfer {
  position: absolute;
  top: 0px;
  right: 264px;
}
</style>