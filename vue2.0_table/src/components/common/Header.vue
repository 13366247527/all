<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="logo_img">
           <img class="img" :src="logoImgNew">
        </div>
        <div class="logo">河北中粮可口可乐饮料有限公司</div>
        <div v-if="collapseChageF" class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="header-m">
          <ul>
            <li><span @click="TabList(1)" :class="ind==1?'active':''">仓储</span></li>
            <li><span @click="TabList(2)" :class="ind==2?'active':''">运输</span></li>
            <li><span @click="TabList(3)" :class="ind==3?'active':''">供应</span></li>
            <li><span @click="TabList(4)" :class="ind==4?'active':''">销售</span></li>
            <li><span @click="TabList(5)" :class="ind==5?'active':''">配送</span></li>
            <li><span @click="TabList(6)" :class="ind==6?'active':''">人员管理</span></li>
            <li><span @click="TabList(7)" :class="ind==7?'active':''">权限设置</span></li>
          </ul>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- <marquee onMouseOver="this.start()" style="font-size:18px;padding-bottom:4px;width:100px;" scrollamount="1">{{getlev}}</marquee> -->
                <div class="user-avator"><img :src="yonghu"></div>
                <div style="font-size:14px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(51,51,51,1);">Hi, {{getlev}}</div>
                <!-- 全屏显示 -->
                <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div> -->
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->

                <!-- 用户名下拉菜单 -->
                <!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="https://github.com/merciqiao" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/merciqiao/merciqiao-vue" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <a href="/zanzhu" target="_blank">
                            <el-dropdown-item style="color:orange;">赞助作者</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    export default {
        data() {
            return {
              collapseChageF:false,
               logoImgNew: require("@/assets/NewLogo.png"),
      yonghu: require("@/assets/yonghus.png"),
                collapse: false,
                fullscreen: false,
                name: 'merciqiao',
                lev:'青铜级',
                message: 2,
                ind:1
            }
        },
        computed:{
            username(){
                let username = this.$common.getSessionStorage('username');
                return username ? username : this.name;
            },
            getlev(){

                let lev = this.$common.getSessionStorage('lev');
                // let lev='';
                // if(levList){
                //     for(var i=0;i<levList.length;i++){
                //         lev+=levList[i].roleName;
                //     }
                // }

                return lev ? lev : this.lev;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$common.removeSessionStorage('token');
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            TabList(index){
              this.ind = index
              this.$emit('getChildIndex', index);
              if(index==1||index == 2){
                this.$common.setSessionStorage('ind', index);
              }

            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){

            let ind = this.$common.getSessionStorage('ind');
            this.ind = ind?ind:1
            if(document.body.clientWidth < 1366){
              this.collapseChageF = true
                this.collapseChage();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        font-size: 22px;
      font-size:20px;
font-family:PingFangSC-Regular;
font-weight:bold;
color:rgba(51,51,51,1);
        background-color: #fff;
        box-shadow:-2px 4px 8px 0px rgba(0, 0, 0, 0.05);
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 80px;
    }
    .header .logo{
        float: left;
        width:290px;
        line-height: 80px;
    }
    .header-m{
      //width:400px;
      height:100%;
      float: left;
      margin-left:150px;
      ul{
        list-style: none;
        height:80px;
        li{
          float: left;
          padding: 0 20px;
           height:100%;
          // background: #f56c6c;
          font-size:18px;
font-family:PingFangSC-Regular;
font-weight:bold;
color:rgba(51,51,51,1);
cursor: pointer;
          span{
            height:100%;
            line-height: 80px;
            display: inline-block;
            border-bottom: 3px solid rgba(0, 0, 0, 0);
            box-sizing:border-box;
          }
          .active{
            color:#E31D2B;
            border-bottom: 3px solid #E31D2B;
          }
        }
      }
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 80px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:20px;
        height:20px;
margin-right:10px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }

      .logo_img{
        width:258px;
        height:52px;
        float: left;
    margin-left: 50px;
    margin-top: 15px;
        //margin: 15px 0 0 50px;
         img{
        width:100%;
        height:100%;
      }
      }

</style>
