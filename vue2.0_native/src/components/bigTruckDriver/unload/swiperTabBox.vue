<template>
   <div class="swiper-box">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in list" :key="index">
                    <keep-alive>
                        <component :is="item.component" v-on:upData='upData' :arrivalData="arrivalData" :acceptData="acceptData"></component>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Swiper from "swiper";
import Discharge from "./discharge";
import Order from "./orderNew";

export default {
  name: "order-content",
  props: ["arrivalData", "acceptData"],
  components: { Discharge, Order },
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/bigTruckDriver/unload/discharge",
          component: Discharge
        },
         {
          path: "/bigTruckDriver/unload/orderNew",
          component: Order
        }
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
      initialSlide : this.$route.path === "/bigTruckDriver/unload/discharge" ? 0  : this.$route.path === "/bigTruckDriver/unload/orderNew" ? 1 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("UNslideTab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("UNchangeTab", index => {
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
