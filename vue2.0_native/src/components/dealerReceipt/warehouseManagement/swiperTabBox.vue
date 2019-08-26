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
import Accept from "./accept";
import Arrival from "./arrival";
import Sign from "./sign";
import Tray from "./tray";

export default {
  name: "order-content",
  props: ["arrivalData", "acceptData", "signTxt"],
  components: { Accept, Arrival, Sign, Tray },
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/dealerReceipt/warehouseManagement/arrival",
          component: Arrival
        },
         {
          path: "/dealerReceipt/warehouseManagement/accept",
          component: Accept
        },
        {
          path: "/dealerReceipt/warehouseManagement/sign",
          component: Sign
        },
        {
          path: "/dealerReceipt/warehouseManagement/tray",
          component: Tray
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
      initialSlide : this.$route.path === "/dealerReceipt/warehouseManagement/arrival" ? 0  : this.$route.path === "/dealerReceipt/warehouseManagement/accept" ? 1 : this.$route.path === "/dealerReceipt/warehouseManagement/sign" ? 2 : this.$route.path === "/dealerReceipt/warehouseManagement/tray" ? 3 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("WMslideTab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("WMchangeTab", index => {
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
