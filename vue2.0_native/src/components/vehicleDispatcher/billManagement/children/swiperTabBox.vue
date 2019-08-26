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
import CollectionOfDocuments from "./CollectionOfDocuments";
import MoreThanOneCar from "./MoreThanOneCar";
import OneCarAndManyLibraries from "./OneCarAndManyLibraries";


export default {
  name: "order-content",
  components: { CollectionOfDocuments, MoreThanOneCar, OneCarAndManyLibraries},
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/vehicleDispatcher/billManagement/CollectionOfDocuments",
          component: CollectionOfDocuments
        },
         {
          path: "/vehicleDispatcher/billManagement/MoreThanOneCar",
          component: MoreThanOneCar
        },
        {
          path: "/vehicleDispatcher/billManagement/OneCarAndManyLibraries",
          component: OneCarAndManyLibraries
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
      initialSlide : this.$route.path === "/vehicleDispatcher/billManagement/CollectionOfDocuments" ? 0  : this.$route.path === "/vehicleDispatcher/billManagement/MoreThanOneCar" ? 1 : this.$route.path === "/vehicleDispatcher/billManagement/OneCarAndManyLibraries" ? 2 : 0,
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
