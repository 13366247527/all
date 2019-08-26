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
import outbound from "./outbound";
import marketSupplies from "./marketSupplies";
import cartonRecipients from "./cartonRecipients";


export default {
  name: "order-content",
  components: { outbound, marketSupplies, cartonRecipients},
  data() {
    return {
      mySwipr: '',
      focusDoctorList: [],
      focusHospitalList: "",
      list: [
        // used
        {
          path: "/loadMent/manageMent/outbound",
          component: outbound
        },
         {
          path: "/loadMent/manageMent/marketSupplies",
          component: marketSupplies
        },
        {
          path: "/loadMent/manageMent/cartonRecipients",
          component: cartonRecipients
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
      initialSlide : this.$route.path === "/loadMent/manageMent/outbound" ? 0  : this.$route.path === "/loadMent/manageMent/marketSupplies" ? 1 : this.$route.path === "/loadMent/manageMent/cartonRecipients" ? 2 : 0,
      //autoHeight : true
    });
    this.mySwipr.on("slideChange", () => {
      this.$root.eventHub.$emit("Fcslidetab", this.mySwipr.activeIndex);
    });
    this.$root.eventHub.$on("FcchangeTab", index => {
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
