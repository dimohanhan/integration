<template>
  <div style="height:100%">
    <el-container>
      <!-- 头部内容 -->
      <el-header style="height: 52px;background-color:#464C5B">
        <el-dropdown trigger="click"
                     @command="handleCommand">
          <span class="el-dropdown-link"><i class="iconfont icon-zhanghu1"></i>
            {{userid}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人中心</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog title="修改密码"
                   style="text-align:left"
                   width="40%"
                   top="10vh"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   status-icon
                   :rules="rules"
                   ref="form"
                   class="demo-form"
                   style="width: 400px;">
            <el-form-item label="旧密码"
                          :label-width="formLabelWidth">

              <el-input v-model="form.name"></el-input>

            </el-form-item>
            <el-form-item label="密码"
                          prop="pass"
                          :label-width="formLabelWidth">
              <el-input type="password"
                        v-model="form.pass"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          prop="checkPass"
                          :label-width="formLabelWidth">
              <el-input type="password"
                        v-model="form.checkPass"
                        autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       icon="iconfont icon-xiugai"
                       @click="dialogFormVisible = false">修改</el-button>
          </div>
        </el-dialog>
        <el-button type="info"
                   icon="iconfont icon-tcdl"
                   @click="handleOutLogin()">退出登录</el-button>
      </el-header>
      <el-container>
        <!-- 左边导航栏 -->
        <el-aside style="width:200px;background-color:#fff">
          <el-row class="tac">
            <el-col>
              <el-menu :default-active="this.$route.path"
                       class="el-menu-vertical-demo"
                       router
                       @open="handleOpen"
                       @select="handleSelect"
                       @close="handleClose"
                       background-color="#F9F9F9"
                       active-text-color="#1369C2">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-setting"> <span>系统管理</span></i>
                  </template>
                  <el-menu-item-group>
                    <!-- <el-menu-item index="/personal">个人中心</el-menu-item> -->
                    <el-menu-item index="/userManagement">用户管理</el-menu-item>
                    <el-menu-item index="/roleManagement">角色管理</el-menu-item>
                    <el-menu-item index="/authManagement">权限管理</el-menu-item>
                    <!-- <el-menu-item index="./">修改密码</el-menu-item> -->
                    <!-- <el-menu-item index="./content"></el-menu-item> -->
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-document"> <span>项目配置管理</span></i>

                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/productManagement">产品模块管理</el-menu-item>
                    <el-menu-item index="/interfaceManagement">接口信息管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-notebook-1">
                      <span>测试脚本管理</span></i>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/ImportScript">脚本导入</el-menu-item>
                    <!-- <el-menu-item index="3-2">选项2</el-menu-item> -->
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-document"><span>测试任务管理</span></i>

                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="/tastManagement">任务管理</el-menu-item>
                    <el-menu-item index="/taskSetManagement">任务集管理</el-menu-item>
                    <el-menu-item index="/reportManagement">测试报告管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-document"> <span>辅助工具</span></i>

                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1">选项1</el-menu-item>
                    <el-menu-item index="4-2">选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!-- 主要展示的页面 -->
        <el-main style="background-color:#F8F8F8">
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isRouterAlive: true,
      isCollapse: true,
      handleUser: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        delivery: false,
        type: [],
        pass: '',
        checkPass: '',
      },

      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      userid: '',
      //搜索条件表单
      formInline: {
        username: '',
        state: '',
      },
    };
  },
  created () {
    this.userid = localStorage.getItem('uid')
  },
  methods: {

    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    handleOutLogin () {
      console.log('退出登录')
      this.$confirm('确定退出登录么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('Authorization');
        this.$router.push('/login');

      }).catch(() => {

      });


    },
    handleSelect (route) {
      console.log(route)
      if (route == '/userManagement') {
        this.getUserSearch()
      }
    },
    //个人中心信息详情
    handleUserDetail () {
      this.$http.getUserDetail().then((res) => {
        if (res.data.code == '0000') {
          console.log(res.data.userdetail)
          let data = res.data.userdetail
          this.form.userid = data.userid
          this.form.username = data.username
          this.form.role = data.role
          this.form.group = data.group
          this.form.state = data.state
          this.form.createtime = data.createtime

        }

      });
    },
    handleCommand (command) {
      // this.$message('click on item ' + command);
      if (command === 'b') {
        this.dialogFormVisible = true
      } else {
        this.handleUserDetail()
        this.$router.push('/home/personal')

      }
    },
    getUserSearch () {
      this.$http.getUserSearch().then((res) => {
        console.log(res);

      });
    },



  }
} 
</script>
<style>
.el-button {
  width: auto !important;
  /* color: #fff !important; */
}
.el-submenu__title {
  background: #eee !important;
}
</style>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
// 侧边导航鼠标移入背景色，字体颜色改变
.el-menu-item:hover {
  background: #fff !important;
  color: #1369c2 !important;
}
.el-submenu :hover {
  // background: #eee !important;
  color: #1369c2 !important;
}
.el-submenu .is-active {
  background: #fff !important;
  color: #1369c2 !important;
}
.el-submenu__title:hover {
  background: #fff !important;
  color: #1369c2 !important;
}

// 导航栏字体和icon大小
.el-submenu [class^="el-icon-"] [data-v-5954443c] {
  vertical-align: middle;
  margin-right: 5px;
  text-align: center;
  font-size: 15px;
}
.el-submenu [class^="el-icon-"] {
  width: 86px !important;
}
// hone页顶部右侧按钮样式
.el-button--info {
  color: #fff;
  background-color: #464c5b;
  border-color: #464c5b;
  text-align: right;
}
.el-header[data-v-5954443c],
.el-footer[data-v-5954443c] {
  text-align: right;
}
.el-button:hover {
  background: #1369c2 !important;
  color: #fff !important;
  height: 55px;
}
.el-button {
  padding: 13px 17px;
  // padding-bottom: 13px;
  padding-top: 18px;
  font-size: 16px;
  margin-left: 0px;
  // height: 33px;
}
.el-header {
  padding: 0;
}
//下拉菜单样式
.el-dropdown {
  color: #fff;
}
.el-dropdown:hover {
  height: 50px;
  // background: #1369c2;
  border-radius: 4px;
}
</style>