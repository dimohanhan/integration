<template>
  <div id="loginImage">
    <div id="loginBackground">
      <div id="content">
        <div class="text">自动化集成测试平台</div>
        <!-- <div class="texta">zidonghuajichengceshipingtai</div> -->
        <el-form :model="ruleForm"
                 status-icon
                 :inline='true'
                 :rules="rules"
                 ref="ruleForm"
                 label-width="auto"
                 class="demo-ruleForm">
          <el-form-item prop="name">
            <div id="inputStyle">
              <el-input type="name"
                        v-model="ruleForm.uid"
                        autocomplete="off"
                        placeholder="请输入用户名称">
                <i slot="prefix"
                   style="font-size:23px"
                   class="el-input__icon el-icon-s-custom"></i>
              </el-input>
            </div>

          </el-form-item>
          <el-form-item prop="password">
            <div id="inputStyle">
              <el-input type="password"
                        v-model="ruleForm.passwd"
                        autocomplete="off"
                        placeholder="请输入登陆密码">
                <i slot="prefix"
                   style="font-size:23px"
                   class="el-input__icon el-icon-lock"></i>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="btnColor"
                       style="width:100px !important;line-height: 14px;"
                       @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data () {

    return {
      ruleForm: {
        usid: '',
        passwd: '',
      },
      rules: {
        usid: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ],

      }
    };
  },
  methods: {
    ...mapMutations(['changeLogin']),

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$http.getUserLogin(this.ruleForm).then((res) => {
            console.log(res);

            this.userToken = 'user=' + this.ruleForm.uid + ',' + 'token=' + res.data.token;

            this.changeLogin({ Authorization: this.userToken });
            // this.changeLogin1({ uid: this.ruleForm.uid });
            console.log(localStorage.setItem('uid', this.ruleForm.uid));
          });
          this.$router.push('/home/')
        } else {
          console.log('error submit!!');
        }
      });
    },
  }
}
</script>
<style>
* {
  margin: 0px;
}
.el-input__inner {
  height: 45px;
}
</style>
<style lang='less' scoped>
#loginImage {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  background: url(../../assets/login.png);
}

#content {
  margin: 20px;
  .btnColor {
    width: 300px;
    height: 36px;
    background-color: #2d6ac0;
    color: rgb(251, 248, 248);
    vertical-align: middle;
    border: 1px solid #2d6ac0;
    font-size: 18px;
    font-weight: 500;
  }
  .text {
    color: #e5ebfc;
    letter-spacing: 5pt;
    font-weight: 900;
    text-align: center;
    padding-bottom: 10px;
    margin-top: 135px;
    font-size: 40px;
  }
  .texta {
    color: #fff;
    letter-spacing: 2pt;
    text-align: center;
    font-size: 20px;
  }
}

#inputStyle :focus-within {
  border-color: #8bc0f5;
  border-width: 2px;
}
.el-input {
  width: 300px !important;
  margin-right: 20px;
}
.el-button {
  width: 100% !important;
}
.el-form {
  text-align: center;
  margin-top: 90px;
  margin-left: 90px;
}
</style>