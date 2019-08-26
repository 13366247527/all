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
      tabbarList: ['单据整理', '一车多单', '一车多库'],
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
        this.nowIndex = this.$route.path === "/vehicleDispatcher/billManagement/CollectionOfDocuments" ? 0  : this.$route.path === "/vehicleDispatcher/billManagement/MoreThanOneCar" ? 1 : this.$route.path === "/vehicleDispatcher/billManagement/OneCarAndManyLibraries" ? 2 : 0;
    },
    LMtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('changeTab', index)
    },
    LMslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  "/vehicleDispatcher/billManagement/CollectionOfDocuments" : index === 1 ? "/vehicleDispatcher/billManagement/MoreThanOneCar" : "/vehicleDispatcher/billManagement/OneCarAndManyLibraries" 
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

