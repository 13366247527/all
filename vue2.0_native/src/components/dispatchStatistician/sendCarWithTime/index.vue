<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="tabbarContainer">
      <div class="tabbarBox">
        <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index ? 'activeTab' : ''" @click="LMtabClick(index)">{{item}}</span>
      </div>
    </div>
    <blank-space></blank-space> 
    <swiper-tabBox class="space"></swiper-tabBox>
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
      tabbarList: ['选单派车', '排单调车', '继续约车', '已约车辆'],
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
        this.nowIndex = this.$route.path === "/dispatchStatistician/sendCarWithTime/aboutCar" ? 0  : this.$route.path === "/dispatchStatistician/sendCarWithTime/menuCar" ? 1 : this.$route.path === "/dispatchStatistician/sendCarWithTime/carManage" ? 2 : this.$route.path === "/dispatchStatistician/sendCarWithTime/siteManage" ? 3 : 0;
    },
    LMtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('changeTab', index)
    },
    LMslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  "/dispatchStatistician/sendCarWithTime/aboutCar" : index === 1 ? "/dispatchStatistician/sendCarWithTime/menuCar" : index === 2 ? "/dispatchStatistician/sendCarWithTime/carManage" : "/dispatchStatistician/sendCarWithTime/siteManage"
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

