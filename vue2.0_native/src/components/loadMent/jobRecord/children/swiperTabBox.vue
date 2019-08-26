<template>
	<!--轮播-->
   <div class="swiper-box">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in list" :key="index">
                    <keep-alive>
                        <component :is="item.component" v-on:upData='upData'></component>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Swiper from "swiper";
import wookStatistics from "./wookStatistics";//工作统计
import attendanceRecord from "./attendanceRecord";//考勤记录
import criminalRecords from "./criminalRecords";//违规记录
import brokenRecord from "./brokenRecord";//破损记录


export default {
  name: "order-content",
  components: { wookStatistics, attendanceRecord, criminalRecords,brokenRecord},
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/loadMent/jobRecord/wookStatistics",
          component: wookStatistics
        },
         {
          path: "/loadMent/jobRecord/attendanceRecord",
          component: attendanceRecord
        },
        {
          path: "/loadMent/jobRecord/criminalRecords",
          component: criminalRecords
        },
        {
          path: "/loadMent/jobRecord/brokenRecord",
          component: brokenRecord
        }
      ]
    };
  },
  methods: {
    // 更新高度
    upData(index) {
          if (this.mySwipr != null) {
              setTimeout(() => {
                  this.mySwipr.update()
              }, 300);
          }
      }
  },
  mounted() {
    this.mySwipr = new Swiper(".swiper-container", {
    	//设定初始化时slide的索引
      initialSlide : this.$route.path === "/loadMent/jobRecord/wookStatistics" ? 0  : this.$route.path === "/loadMent/jobRecord/attendanceRecord" ? 1 : this.$route.path === "/loadMent/jobRecord/criminalRecords" ? 2 : this.$route.path === "/loadMent/jobRecord/brokenRecord" ? 3 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
    	//左右滑动时将当前slide的索引发送到nav组件中
      this.$root.eventHub.$emit("JrLMslideTab", this.mySwipr.activeIndex);
    });
    //接收nav组件传过来的导航按钮索引值，跳转到相应的内容区
    this.$root.eventHub.$on("JrchangeTab", index => {
      this.mySwipr.slideTo(index, 0, false);
    });
  },
  destroyed() {
      if ( this.mySwipr != null ) {
          this.mySwipr.destroy(false);
      }
  }
};
</script>
<style lang="scss" scoped>
    .swiper-container{
        position: fixed;
        top:1.15rem;
        bottom:0;
        left: 0;
        right: 0;
        margin: auto;
        height:auto; 
    }  
</style>  
