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
import Tray from "./tray";
import Box from "./box";

export default {
  name: "order-content",
  props: ["arrivalData", "acceptData", "signTxt"],
  components: { Tray, Box },
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/dealerReceipt/packageManagement/tray",
          component: Tray
        },
         {
          path: "/dealerReceipt/packageManagement/box",
          component: Box
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
      initialSlide : this.$route.path === "/dealerReceipt/packageManagement/tray" ? 0  : this.$route.path === "/dealerReceipt/packageManagement/box" ? 1 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("PMslideTab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("PMchangeTab", index => {
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

</style>  
