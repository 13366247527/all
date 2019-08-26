<template>
  <el-row class="container">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">储易智慧后台管理系统</h3>
      <el-form-item prop="account">
        <el-input
          type="text"
          v-model="ruleForm2.account"
          auto-complete="off"
          placeholder="请输入账号"
          style="background:rgba(248,250,252,1);
border:1px solid rgba(223, 227, 233, 1);
border-radius:4px;color:rgba(194,194,194,1);"
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm2.checkPass"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
        >登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import { requestLogin } from "../api/api";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
   mounted() {
        document.onkeydown = (event) => {
            var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键
                this.handleSubmit2();
            }
        }
    },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();
          let params = new URLSearchParams();
          params.append("username", this.ruleForm2.account);
          params.append("password", this.ruleForm2.checkPass);
          

          this.$http({
            method: "POST",
            url: "http://user.logwsd.com/login", //河北
            //url: "http://xh-com.logwsd.com/login", //预生产
            //url: "http://192.168.1.166:5010/login",
            //url: "http://test-com.logwsd.com/login", //河北测试

            data: params
          })
            .then(res => {
              this.logining = false;
              if (res.data.ret_code === "0") {
                
                sessionStorage.setItem("token", res.data.data.token);
                this.$message.success("登陆成功");
                this.$router.push({ path: "/home" });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
          // requestLogin(loginParams).then(data => {
          //   console.log(data);
          //   this.logining = false;
          //   //NProgress.done();
          //   let { msg, code, user } = data;
          //   if (code !== 200) {
          //     this.$message({
          //       message: msg,
          //       type: "error"
          //     });
          //   } else {
          //     sessionStorage.setItem("user", JSON.stringify(user));
          //     this.$router.push({ path: "/table" });
          //   }
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~scss_vars";
.container {
  width: 100%;
  height: 100%;
  background-image: url(../assets/login.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
.login-container {
  //   position: absolute;
  //           left:0;
  //           right:0;
  //           top: 0;
  //           bottom: 0;
  //           margin: auto;
  //  width: 30%;
  //           height:50%;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;

  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    font-size: 26px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>