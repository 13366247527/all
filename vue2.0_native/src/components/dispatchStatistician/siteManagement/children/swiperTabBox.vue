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
import VehicleCondition from "./VehicleCondition";
import SigningManagement from "./SigningManagement";
import ResourceCollection from "./ResourceCollection";


export default {
  name: "order-content",
  components: { VehicleCondition, SigningManagement, ResourceCollection},
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/dispatchStatistician/siteManagement/VehicleCondition",
          component: VehicleCondition
        },
         {
          path: "/dispatchStatistician/siteManagement/SigningManagement",
          component: SigningManagement
        },
        {
          path: "/dispatchStatistician/siteManagement/ResourceCollection",
          component: ResourceCollection
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
      initialSlide : this.$route.path === "/dispatchStatistician/siteManagement/VehicleCondition" ? 0  : this.$route.path === "/dispatchStatistician/siteManagement/SigningManagement" ? 1 : this.$route.path === "/dispatchStatistician/siteManagement/ResourceCollection" ? 2 : 0,
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
