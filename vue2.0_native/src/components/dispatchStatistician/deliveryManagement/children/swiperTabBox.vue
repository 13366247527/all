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
import DischargeCargo from "./DischargeCargo";
import DrivingRecord from "./DrivingRecord";
import customerService from "./customerService";
import TraceBackTo from "./TraceBackTo";

export default {
  name: "order-content",
  components: { DischargeCargo, DrivingRecord, customerService, TraceBackTo },
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/dispatchStatistician/deliveryManagement/DischargeCargo",
          component: DischargeCargo
        },
        {
          path: "/dispatchStatistician/deliveryManagement/DrivingRecord",
          component: DrivingRecord
        },
         {
          path: "/dispatchStatistician/deliveryManagement/customerService",
          component: customerService
        },
        
        {
          path: "/dispatchStatistician/deliveryManagement/TraceBackTo",
          component: TraceBackTo
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
      initialSlide : this.$route.path === "/dispatchStatistician/deliveryManagement/DischargeCargo" ? 0  : this.$route.path === "/dispatchStatistician/deliveryManagement/DrivingRecord" ? 1 : this.$route.path === "/dispatchStatistician/deliveryManagement/customerService" ? 2 : this.$route.path === "/dispatchStatistician/deliveryManagement/TraceBackTo" ? 3 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("LMslideTab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("changeTab", index => {
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
