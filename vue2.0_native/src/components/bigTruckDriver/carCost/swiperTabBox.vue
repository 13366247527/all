<template>
   <div class="swiper-box">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in list" :key="index">
                    <keep-alive>
                        <component :is="item.component" v-on:upData='upData' :arrivalData="arrivalData" :acceptData="acceptData" :signTxt="signTxt"></component>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Swiper from "swiper";
import Car from "./car";
import Repair from "./repair";
import Day from "./day";
import Cost from "./cost";

export default {
  name: "order-content",
  props: ["arrivalData", "acceptData", "signTxt"],
  components: { Car, Repair, Day, Cost },
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/bigTruckDriver/costManagement/car",
          component: Car
        },
         {
          path: "/bigTruckDriver/costManagement/repair",
          component: Repair
        },
        {
          path: "/bigTruckDriver/costManagement/day",
          component: Day
        },
        {
          path: "/bigTruckDriver/costManagement/cost",
          component: Cost
        },
      ],
     
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
      initialSlide : this.$route.path === "/bigTruckDriver/costManagement/car" ? 0  : this.$route.path === "/bigTruckDriver/costManagement/repair" ? 1 : this.$route.path === "/bigTruckDriver/costManagement/day" ? 2 : this.$route.path === "/bigTruckDriver/costManagement/cost" ? 3 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("CCslideTab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("CCchangeTab", index => {
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
        top:1.1rem;
        bottom:0;
        left: 0;
        right: 0;
        margin: auto;
        height:auto;
    }
    
</style>  
