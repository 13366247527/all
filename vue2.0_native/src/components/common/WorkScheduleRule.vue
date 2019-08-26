<template>
  <div class="common-page-flex">
    <div class="header-default">
      <div class="header-default-box">
        <div class="header-default-back" @click="back">
          <img src="@/assets/images/common/fanhui.png">
          <span>返回</span>
        </div>
        <span class="header-default-txt">
          <span class="img-lt direction" @click="imgLt">
            <img src="@/assets/images/common/fanhui.png">
          </span>
          第{{title}}周排班计划
          <span class="img-gt direction" @click="imgGt" >
            <img src="@/assets/images/common/fanhui.png">
          </span>
        </span>
      </div>
    </div>
    <div class="common-page-content">
      <h1>{{datenum}}</h1>
      <p class="center">
        <span>{{years}}</span>
        <span>{{week}}</span>
      </p>
      <ul class="common-page-week">
        <li>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
           <div>日</div>
        </li>
        <li>
          <div>{{weekss[0]}}</div>
          <div>{{weekss[1]}}</div>
          <div>{{weekss[2]}}</div>
          <div>{{weekss[3]}}</div>
          <div>{{weekss[4]}}</div>
          <div>{{weekss[5]}}</div>
          <div>{{weekss[6]}}</div>
        </li>
      </ul>
    </div>
    <div class="tab pageFlex">
      <ul class="common-content-box">
        <li class="common-content-title">
          <div>日期</div>
          <div>上班时间</div>
        </li>
      </ul>
      <ul class="common-content-box common-content-contents">
        <li v-for="(item, index) in arr" :key="index">
          <div>
            <span>{{item.dateStr}}</span>
            <span class="weektime">{{item.week}}</span>
          </div>
          <div>
            <p class="selectBox wid90">
              <span v-if="item.code==0" class="redBtn Btn">{{item.week}}</span>
              <span v-else-if="item.code==1" class="greenBtn Btn">{{item.week}}</span>
              <span v-else class="redBtn Btn">{{item.workTime}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="common-bottom-button bottom-button-fixed" @click="okFn">
      <span class="redBtner" >确定</span>
    </div>
  </div>
</template>

<script>
import { setCache, getCache } from "@/config/utils";
import { debug } from 'util';
import native from '@/native/bridge.js'
export default {
  name: "TimeReselect",
  data() {
    return {
      datenum: "",
      years: "",
      week: "",
      weeks: "",
      weekss: [],
      year_z:'2019',
      arr:[],//后台获取的时间数据
      vehlicnum: "123123",
      timeStatus: null,
      title: null,
      state:0//排班状态 1=未排班，2=已排班
    };
  },
  watch: {
    // title() {
      
    // }
  },
  mounted() {
    this.getData(this.year_z);
    this.getDatas(this.title,this.year_z);
    this.getData1()
  },
  methods: {
    changeTimeSelectStatus(index) {
      this.timeStatus = index;
    },
    toInstruction() {
      this.$router.push({
        path: "/vehicleDispatcher/loadingManagement/aboutCar"
        // query:{
        //     index:this.$route.query.index,
        //     timeStatus: this.dataList[this.timeStatus].selval
        //     }
      });
    },
    standardBig() {
      this.isBig = !this.isBig;
      this.standardFlag = false;
      this.bigImgUrl = require("@/assets/images/common/standard.jpg");
    },
    getData(year_z) {

      var myDate = new Date();
      var firstDay = new Date(year_z, 0, 1);
      var dayOfWeek = firstDay.getDay();
      var spendDay = 1;
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
      }
      firstDay = new Date(year_z, 0, 1 + spendDay);
      var d = Math.ceil((myDate.valueOf() - firstDay.valueOf()) / 86400000);
      var result = Math.ceil(d / 7);
      this.title = result + 1;
    },
    getData2(year_z,mon,datenum) {
      var myDate = new Date(year_z,mon,datenum);
      var firstDay = new Date(year_z, 0, 1);
      var dayOfWeek = firstDay.getDay();
      var spendDay = 1;
      if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
      }
      firstDay = new Date(year_z, 0, 1 + spendDay);
      var d = Math.ceil((myDate.valueOf() - firstDay.valueOf()) / 86400000);
      var result = Math.ceil(d / 7);
      this.title = result + 1
    },
    getDatas(titl,year_z) {
      var myDate = new Date();
      let weeks = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
      switch (weeks) {
        case 0:
          this.week = "星期日";
          break;
        case 1:
          this.week = "星期一";
          break;
        case 2:
          this.week = "星期二";
          break;
        case 3:
          this.week = "星期三";
          break;
        case 4:
          this.week = "星期四";
          break;
        case 5:
          this.week = "星期五";
          break;
        case 6:
          this.week = "星期六";
          break;
        default:
          this.week = "未知";
          break;
      }
      
      var yearer = myDate.getFullYear();
      this.weekss[0] = (this.getXDate(year_z, titl, 1) + "").slice(8, 10);
      this.weekss[1] = (this.getXDate(year_z, titl, 2) + "").slice(8, 10);
      this.weekss[2] = (this.getXDate(year_z, titl, 3) + "").slice(8, 10);
      this.weekss[3] = (this.getXDate(year_z, titl, 4) + "").slice(8, 10);
      this.weekss[4] = (this.getXDate(year_z, titl, 5) + "").slice(8, 10);
      this.weekss[5] = (this.getXDate(year_z, titl, 6) + "").slice(8, 10);
      this.weekss[6] = (this.getXDate(year_z, titl+1, 0) + "").slice(8, 10);
      this.datenum = this.weekss[weeks-1];
      var date = new Date(this.getXDate(year_z, titl, weeks));
      var getMonth = date.getMonth() + 1;
      var date_value =
        date.getFullYear() +
        "-" +
        (getMonth < 10 ? 0 + "" + getMonth : getMonth);
        this.year_z == date.getFullYear()?'':this.getData(date.getFullYear());
        this.year_z = date.getFullYear()
        this.years = date_value;
        this.getData2(this.year_z,date.getMonth(),date.getDate())
    },
    getXDate(year, weeks, weekDay) {
      var date = new Date(year, "0", "1");
      var time = date.getTime();
      time += (weeks - 1) * 7 * 24 * 3600000;
      date.setTime(time);
      return this.getNextDate(date, weekDay);
    },
    getNextDate(nowDate, weekDay) {
      weekDay %= 7;
      var day = nowDate.getDay();
      var time = nowDate.getTime();
      var sub = weekDay - day;
      time += sub * 24 * 3600000;
      nowDate.setTime(time);
      return nowDate;
    },
    imgLt() {
        this.title--;
        this.getDatas(this.title,this.year_z);
         var date = this.years +'-'+this.datenum 
               var username = getCache("username")
               var parame = {
                  date:date,
                  username:username
               }
               this.$http.get('wms/work/plan/getWorkPlan',parame).then(res=>{
                 console.log(res)
                 this.arr =  res.data.data.outList
               }) 
      
    },
    imgGt() {
      this.title++;
      this.getDatas(this.title,this.year_z);
       var date = this.years +'-'+this.datenum 
               var username = getCache("username")
               var parame = {
                  date:date,
                  username:username
               }
               this.$http.get('wms/work/plan/getWorkPlan',parame).then(res=>{
                 console.log(res)
                 this.arr =  res.data.data.outList
               }) 
    },

    back() {
      this.$router.go(-1);
    },
    //获取后台数据
    getData1(){
               this.$loading.open();
               var date = this.years +'-'+this.datenum 
               var username = getCache("username")
               var parame = {
                  date:date,
                  username:username
               }
               this.$http.get('wms/work/plan/getWorkPlan',parame).then(res=>{
                 console.log(res)
                  this.$loading.close();
                 this.arr =  res.data.data.outList
                 this.state =  res.data.data.flag
               })       
    },
    //确认
    okFn(){
       if(this.state == 1){
         this.$toast("未排班,请先排班！")
          native.callhandler("showVoice", "未排班,请先排班！");
       }else if(this.state == 2){
            this.$router.replace({
              path: '/SignIns',
            })
       }else{
         return
       }
    }
  }
};
</script>

<style lang="scss" scoped>
.weektime{
    margin-left: 0.2rem
}
h1 {
  text-align: center;
  font-size: 0.4rem;
}
.header-default {
  height: 0.5rem;
  line-height: 0.5rem;
  background: $red;
}
.center {
  text-align: center;
  font-size: 0.16rem;
  padding: 0.05rem 0;
}
.center span {
  padding: 0.1rem;
}
.common-page-week li div {
  font-size: 0.16rem;
  text-align: center;
  display: inline-block;
  width: 14.2%;
}
.header-default-box {
  width: 100vw;
  height: 0.5rem;
  line-height: 0.5rem;
  position: fixed;
  margin: 0 auto;
  box-sizing: border-box;
  z-index: 997;
  background: $red;
  text-align: center;
}

.header-default-txt {
  font-size: 0.18rem;
  font-family: PingFangSC-Medium;
  color: rgba(255, 255, 255, 1);
}

.header-default-back {
  position: absolute;
  left: 0.17rem;
  height: 100%;
  display: flex;
  align-items: center;
  img {
    display: block;
    height: 0.21rem;
    width: 0.12rem;
    margin: 0;
  }
  span {
    font-size: 0.15rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-left: 0.05rem;
  }
}
.pageFlex {
  margin-bottom: 0.5rem;
}
.common-page-content {
  width: 100%;
  height: 1.5rem;
  background: #e31d2b;
  margin-top: -0.01rem;
  color: #fff;
}
.common-content-box {
  display: flex;
  flex-flow: row wrap;
  font-size: 0.16rem;
}
.common-content-box .common-content-title {
  background: #eee;
}

.common-content-box li div {
  width: 50%;
}

.common-bottom-button span {
  width: 50%;
}
.commonTab li {
  padding: 0.1rem 0;
  width: 50%;
}
.commonTab li span:nth-child(1) {
  margin-left: 0.1rem;
}
.direction img {
  width: 0.1rem;
  margin-top: -0.05rem;
}
.img-lt img {
  margin-right: 0.15rem;
}
.img-gt img {
  margin-left: 0.2rem;
  transform: rotate(180deg);
}
.Btn {
  width: 0.7rem;
}
</style>
