<template>
  <div class="loginPage">
    <div class="login">
      <img src="@/assets/images/common/logo.png" class="logo">
    </div>
    <div class="login-content">
      <div class="login-inner">
        <i class="userName"></i>
        <b>工号</b>
      </div>
      <div class="login-input">
        <input type="text" v-model="username" @keyup.enter="loginOpt">
      </div>
    </div>
    <div class="login-content">
      <div class="login-inner">
        <i class="password"></i>
        <b>密码</b>
      </div>
      <div class="login-input" v-if="showPwdState">
        <input type="text" v-model="password" @keyup.enter="loginOpt">
      </div>
      <div class="login-input" v-else>
        <input type="password" v-model="password">
      </div>
      <img src="@/assets/images/common/seen.png" alt="密码是否可见" class="seen" @click="showPwd">
    </div>
    <div class="loginPanel">
      <span @click="rember">
        <i :class="selectState ? 'checked' : 'check'"></i>记住我
      </span>
      <!-- <span>忘记密码？</span> -->
    </div>
    <div class="loginBtn" @click="loginOpt">登录</div>
    <div class="loginBottom rights">Copyright@1999-2018 All Rights Reserved</div>
    <div class="loginBottom company">储易智慧公司版权所有</div>
  </div>
</template>

<script>
import { setCache, getCache, removeCache } from "../config/utils";
import native from "@/native/bridge.js";


export default {
  name: "login",
  data() {
    return {
      selectState: true,
      showPwdState: false,
      username: "",
      password: "",
      first: null,
      test: ""
    };
  },

  mounted() {
    console.log("new")
    // let params = {
    //   statu: 1
    // };
    // native.callhandler("startLocation", params, data => {
    //  // console.log(data);
    // });

    window["back"] = () => {
      if (this.test) {
        this.fun();
      }
    };

    this.username = getCache("username");
    this.password = getCache("password");

    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.fun, false); //false阻止默认事件
    }
  },
  destroyed() {
    this.test = false;
    window.removeEventListener("popstate", this.fun, false); //false阻止默认事件
  },
  methods: {
    fun() {
      this.test = true;
      if (!this.first) {
        this.first = new Date().getTime();
       window.instance ? window.instance.close() : "";
              window.instance = this.$toast({
              message: "再按一次退出应用!",
              duration: 1000
            });
        let that = this;
        setTimeout(function() {
          that.first = null;
        }, 1000);
      } else {
        native.callhandler("finish", "");
      }
    },
    rember() {
      this.selectState = !this.selectState;
    },
    showPwd() {
      this.showPwdState = !this.showPwdState;
    },
    login(Vue, loginName, password) {
      removeCache("token");
      removeCache("roles");

      setCache("username", loginName);
      setCache("lastCheckTime", +new Date());

      Vue.$http
        .post("/login", {
          username: loginName,
          password: password
        })
        .then(res => {
          let result = res ? res.data : "";
          this.$loading.close();
          if (result.ret_code == 0) {
            native.callhandler("initJpush", result.data.user.uname, data => {
             // console.log(data);
            });

            setCache("token", result.data.token);
            setCache("user", result.data.user); //车辆调度员
            setCache("jobpost", result.data.currentJobpost);
            setCache("vehgrpnum", "vehgrpnum");
            //console.log(result);

            // Vue.$router.push({
            //     path: '/SignIn',
            // })
            

            if (result.data.currentJobpost == "14"||result.data.currentJobpost == "08"||result.data.currentJobpost == "07") {
              window.instance = this.$toast({
                message: result.msg,
                position: "bottom",
                duration: 1500
              });
              Vue.$router.push({
                path: "/home"
              });
            }else if(result.data.currentJobpost == "15"){
                  window.instance = this.$toast({
                  message: result.msg,
                  position: "bottom",
                  duration: 1500
                  });
                  //上班计划
                  Vue.$router.replace({
                     path: "/WorkScheduleRule"
                  });
            } else {
              this.$toast("身份不符合，请输入正确的账号！");
            }
          } else if (result.ret_code == 401) {
            native.callhandler("showVoice", result.msg, data => {});
            this.$toast(result.msg);
            Vue.$router.push({
              path: "/login"
            });
          } else {
            native.callhandler("showVoice", result.msg, data => {});
            result ? this.$toast(result.msg) : "";
            return;
          }
        });
    },
    loginOpt() {
      if (this.username.length < 2) {
        this.$toast("请输入正确的账号");
        native.callhandler("showVoice", "请输入正确的账号", data => {});
        return false;
      }
      if (this.password.length < 1) {
        this.$toast("请输入密码");
        native.callhandler("showVoice", "请输入密码");
        return false;
      }
      if (this.selectState) {
        setCache("username", this.username);
        setCache("password", this.password);
      } else {
        removeCache("password");
      }
      this.$loading.open();
      this.login(this, this.username, this.password);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 2.1rem;
  height: 0.5rem;
  margin: 1rem auto 0.5rem;
}
.logo {
  width: 100%;
  height: 100%;
}
.login-content {
  box-sizing: border-box;
  position: relative;
  width: 2.4rem;
  height: 0.48rem;
  margin: 0 auto 0.15rem;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 0.05rem;
  display: flex;
  align-items: center;
  font-size: 0.15rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(119, 119, 119, 1);
}
.login-content .seen {
  width: 0.2rem;
  height: 0.12rem;
  position: absolute;
  right: 0.1rem;
}
.login-inner {
  width: 0.71rem;
  display: flex;
  align-items: center;
  background: url(../assets/images/common/shu.png) no-repeat right;
}
.login-inner i {
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  margin-left: 0.1rem;
  margin-right: 0.08rem;
}
.login-inner .userName {
  background: url(../assets/images/common/username.png) no-repeat center;
  background-size: 100% 100%;
}
.login-inner .password {
  background: url(../assets/images/common/password.png) no-repeat center;
  background-size: 100% 100%;
}
.login-input input {
  width: 1.3rem;
  height: 0.2rem;
  line-height: 0.2rem;
  padding-left: 0.05rem;
  border: 0;
  background: rgba(250, 250, 250, 1);
}
.loginPanel {
  width: 2.4rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 0.12rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(119, 119, 119, 1);
}
.loginPanel span {
  display: flex;
  align-items: center;
}
.loginPanel span i {
  display: inline-block;
  margin-right: 0.06rem;
  margin-left: 0.02rem;
  width: 0.15rem;
  height: 0.16rem;
}
.loginPanel span .checked {
  background: url(../assets/images/common/checked.png) no-repeat center;
  background-size: 100% 100%;
}
.loginPanel span .check {
  background: url(../assets/images/common/check.png) no-repeat center;
  background-size: 100% 100%;
}
.loginBtn {
  width: 2.4rem;
  height: 0.48rem;
  line-height: 0.48rem;
  text-align: center;
  margin: 0.4rem auto 0;
  background: rgba(227, 29, 43, 1);
  border-radius: 0.05rem;
  font-size: 0.18rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.loginBtn:active {
  box-shadow: 0.05em 0.1em 0.2em rgba(0, 0, 0, 0.6) inset;
  border-color: rgba(0, 0, 0, 0.3);
  background: #ccc;
}
.loginBottom {
  font-size: 0.1rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(136, 136, 136, 1);
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}
.rights {
  bottom: 0.35rem;
}
.company {
  bottom: 0.16rem;
}
</style>


