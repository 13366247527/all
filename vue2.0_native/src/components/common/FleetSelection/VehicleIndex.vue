<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="tabbarContainer">
      <div class="tabbarBox">
        <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index ? 'activeTab' : ''" @click="LMtabClick(index)">{{item}}</span>
      </div>
    </div>
    <blank-space></blank-space> 
    <swiper-fleet-selection class="space"></swiper-fleet-selection>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import BlankSpace from "@/components/common/BlankSpace"
import SwiperFleetSelection from "@/components/common/FleetSelection/children/SwiperFleetSelection"

export default {
  name: "loadingManagement",
  data() {
    return {
      itemLists: [],
      title: "",
      tabbarList: ['车队选择', '合约车辆', '临时调车'],
      nowIndex: 0,
    };
  },
  components: {HeaderDefault, SwiperFleetSelection, BlankSpace},
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
        this.nowIndex = this.$route.path === "/common/FleetSelection/FleetSelection" ? 0  : this.$route.path === "/common/FleetSelection/VehicleSelection" ? 1 : this.$route.path === "/common/FleetSelection/TemporaryVehicleSelection" ? 2 : 0;
    },
    LMtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('changeTab', index)
    },
    LMslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  "/common/FleetSelection/FleetSelection" : index === 1 ? "/common/FleetSelection/VehicleSelection" : "/common/FleetSelection/TemporaryVehicleSelection"
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

