<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">储易智慧</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="radioSelect">
                    <div>
                        <el-button class="defaultBtn" slot="prepend" icon="el-icon-lx-home"></el-button>
                        <el-select v-model="ruleForm.radioSelect" placeholder="请选择环境">
                            <el-option v-for="item in radioList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    radioSelect: '',
                    username: '',
                    password: ''
                },
                radioList: [
                    { value: '1', label: '河北生产环境' },
                    { value: '2', label: '香河生产环境' },
                    { value: '3', label: '吉林生产环境' },
                    { value: '4', label: '内蒙生产环境' }
                ],
                rules: {
                    radioSelect: [
                        { required: true, message: '请选择环境', trigger: 'change' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let loginUrl
                    if (this.ruleForm.radioSelect === '1') {
                        loginUrl = 'http://user.logwsd.com/login'
                    } else if (this.ruleForm.radioSelect === '2') {
                        loginUrl = 'http://user.logwsd.com/login'
                    } else if (this.ruleForm.radioSelect === '3') {
                        loginUrl = 'http://62.234.98.225:5010/login'
                    } else if (this.ruleForm.radioSelect === '4') {
                        loginUrl = 'http://62.234.98.225:5010/login'
                    } else {
                        loginUrl = 'http://user.logwsd.com/login'
                    }
                    if (valid) {
                        // console.log(this.$http.post)
                        const data = new URLSearchParams()
                        data.append('username', this.ruleForm.username)
                        data.append('password', this.ruleForm.password)
                        this.$http({
                            method: 'post',
                            // url: 'http://192.168.1.166:5010/login',
                            url: loginUrl,
                            data: data
                        }).then(res => {
                            if(res.data.ret_code === '0') {
                                sessionStorage.setItem('ms_username',this.ruleForm.username);
                                sessionStorage.setItem('user', JSON.stringify(res.data.data))
                                this.$router.push('/delivery');
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        /*background-image: url(../../assets/img/login-bg.jpg);*/
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
    .defaultBtn {
        width: 46px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        background-color: #F5F7FA;
        color: #909399;
    }
</style>

<style lang="less">
    .ms-content {
        .el-select {
            width: 244px;
            border-radius: inherit;
            .el-input__inner {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                border-left: 0;
            }
        }
    }
</style>