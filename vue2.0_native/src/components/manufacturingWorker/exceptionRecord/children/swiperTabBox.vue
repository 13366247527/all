<template>
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
import daily from "./daily";
import monthly from "./monthly";
import year from "./year";


export default {
  name: "order-content",
  components: { daily, monthly, year},
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/manufacturingWorker/exceptionRecord/daily",
          component: daily
        },
         {
          path: "/manufacturingWorker/exceptionRecord/monthly",
          component: monthly
        },
        {
          path: "/manufacturingWorker/exceptionRecord/year",
          component: year
        }
      ]
    };
  },
  methods: {
    // 更新高度
    upData() {
          if (this.mySwipr != null) {
              setTimeout(() => {
                  this.mySwipr.update()
              }, 300);
          }
      }
  },
  mounted() {
    this.mySwipr = new Swiper(".swiper-container", {
      initialSlide : this.$route.path === "/manufacturingWorker/exceptionRecord/daily" ? 0  : this.$route.path === "/manufacturingWorker/exceptionRecord/monthly" ? 1 : this.$route.path === "/manufacturingWorker/exceptionRecord/year" ? 2 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("ScslideTab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("ScchangeTab", index => {
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
