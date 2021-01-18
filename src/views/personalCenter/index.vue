<template>
  <div>
    <div class="header"
         style="width:200px; margin-left: 250px;">
      <div class="borderContent"></div>
      <div style=" margin-right: 40px;">系统管理-个人中心</div>
    </div>
    <div class="mainContent">
      <el-form label-position="left"
               label-width="90px"
               size="small"
               style="width: 400px;
    margin-left: 300px;
    margin-top: 30px;margin: 80px auto;">
        <el-form-item label="账户名:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.userid"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="用户名:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.username"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="角色名称:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.role"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="项目组:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.group"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="状态:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.state"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="创建时间:"
                      :label-width="formLabelWidth">
          <div id="inputStyle">
            <el-input v-model="form.createtime"></el-input>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelWidth: '120px',
      form: {
        userid: '',
        username: '',
        group: '',
        role: '',
        state: '',
        createtime: '',
      }
    }
  },
  created () {
    this.handleUserDetail()
  },
  methods: {
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
    }
  }
}
</script>
<style>
.el-main[data-v-5954443c] {
  line-height: 0 !important;
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
  height: 600px;
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
</style>