<template>
    <div class="login_wrapper">
      <div class="container">


        <div class="login">
            <el-form :model="formLogin">
                <el-form-item>
                    <h2 class="title">后台管理系统</h2>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formLogin.loginName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="formLogin.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>

                </el-form-item>

            </el-form>

        </div>
</div>
    </div>
</template>

<style lang="scss" scoped>
$input_width:300px;

.login_wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .container {
  width: 100%;
  height: 100%;
  background-image: url(../assets/login.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
}
    .login {
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

  // width: 350px;
  // padding: 35px 35px 15px 35px;
   background: #fff;
  // border: 1px solid #eaeaea;
  // box-shadow: 0 0 25px #cac6c6;
        width: 460px;
       // height: 296px;
       // margin-top: -150px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            text-align: center;
            color: #505458;
        }
        .el-form-item__content {
            width: $input_width;
        }
        .el-button {
            width: $input_width;
        }
        .el-form {
            margin: 30px 80px auto 80px;
            .error {
                display: block;
                text-align: center;
                color: red;
            }
        }
    }
}
.recover{
    position:absolute;
    bottom:0px;
    cursor:pointer;
    color:#E6A23C;
    // display: none;
}
.bei{
    position:absolute;
    bottom:20px;
    cursor:pointer;
    color:#505458;
}
</style>

<script>
import {loginIn} from '../apis/apis';
export default {
    name: 'login',
    data() {
        return {
            formLogin: {   //表单对象
                loginName: '',
                password: ''
            }
        }
    },
    mounted() {
        document.onkeydown = (event) => {
            var router=this.$route.path;
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13&&this.$route.path=='/login') { // enter 键
                this.login();
            }
        }
    },
    methods: {
        login() {
            //调用后端登陆接口
             let params = new URLSearchParams();
             params.append("username", this.formLogin.loginName);
             params.append("password", this.formLogin.password);
             loginIn(params)
                .then((data) => {
                    console.log(data)
                    if (data && data.data) {
                        var json = data.data;
                        if (json.ret_code == '0') {
                            this.$common.setSessionStorage('token', json.data.token);
                            this.$common.setSessionStorage('lev', this.formLogin.loginName);
                            this.$router.push({ path: "/housereport" });
                            this.$message.success("登录成功");
                        }else{
                      this.$message({
                        type:"error",
                        message:data.data.msg,
                      });
                    }

                    }
                })

        }
    }
}
</script>
