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
  name: "loadingManagement",
  data() {
    return {
      itemLists: [],
      title: "",
      tabbarList: ['选车派单', '已约车辆', '到车管理', '现场管理'],
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
        this.nowIndex = this.$route.path === "/vehicleDispatcher/loadingManagement/aboutCar" ? 0  : this.$route.path === "/vehicleDispatcher/loadingManagement/menuCar" ? 1 : this.$route.path === "/vehicleDispatcher/loadingManagement/carManage" ? 2 : this.$route.path === "/vehicleDispatcher/loadingManagement/siteManage" ? 3 : 0;
    },
    LMtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('changeTab', index)
    },
    LMslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  "/vehicleDispatcher/loadingManagement/aboutCar" : index === 1 ? "/vehicleDispatcher/loadingManagement/menuCar" : index === 2 ? "/vehicleDispatcher/loadingManagement/carManage" : "/vehicleDispatcher/loadingManagement/siteManage"
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

