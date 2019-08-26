<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="tabbarContainer">
      <div class="tabbarBox">
        <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index ? 'activeTab' : ''" @click="LMtabClick(index)">{{item}}</span>
    </div>
    </div>
    <blank-space></blank-space>
    <swiper-tabBox></swiper-tabBox>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import BlankSpace from "@/components/common/BlankSpace"
import SwiperTabBox from "./children/swiperTabBox"

export default {
  name: "deliveryManagement",
  data() {
    return {
      itemLists: [],
      title: "",
      tabbarList: ['车辆状态', '签单管理', '资源收集'],
      nowIndex: 0,
    };
  },
  components: {HeaderDefault, SwiperTabBox, BlankSpace},
  mounted() {
    //this.getData();
    this.title = this.tabbarList[0];
    this.$root.eventHub.$on("LMslideTab", this.LMslidetab);
    this.$nextTick(() => { 
        this.initPage()
    })
  },
  methods: {
    initPage(){
        this.nowIndex = this.$route.path === '/vehicleDispatcher/deliveryManagement/VehicleCondition' ? 0  : this.$route.path === '/vehicleDispatcher/deliveryManagement/SigningManagement' ? 1 : this.$route.path === '/vehicleDispatcher/deliveryManagement/ResourceCollection' ? 2 : 0;
    },
    LMtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('changeTab', index)
    },
    LMslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  '/vehicleDispatcher/deliveryManagement/VehicleCondition' : index === 1 ? '/vehicleDispatcher/deliveryManagement/SigningManagement' :  '/vehicleDispatcher/deliveryManagement/ResourceCollection' 
        this.$router.replace(href)
    }
  }
};
</script>

<style lang="scss" scoped>
    .tabbarContainer{
      @include tabbar(3.43rem, 1.15rem)
    }
</style>

