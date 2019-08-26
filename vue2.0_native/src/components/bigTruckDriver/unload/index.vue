<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="tabbarContainer">
      <div class="tabbarBox">
        <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index ? 'activeTab' : ''" @click="UNtabClick(index)">{{item}}</span>
      </div>
    </div>
    <blank-space></blank-space>
    <swiper-tabBox :arrivalData="arrivalData" :acceptData="acceptData"></swiper-tabBox>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import BlankSpace from "@/components/common/BlankSpace"
import SwiperTabBox from "./swiperTabBox"

export default {
  name: "unload",
  data() {
    return {
      itemLists: [],
      title: "",
      tabbarList: ['卸货拍照', '送货单'],
      nowIndex: 0,
      routerList: ["/bigTruckDriver/unload/discharge", "/bigTruckDriver/unload/orderNew"],
      arrivalData: [],
      acceptData: [],
    };
  },
  components: {HeaderDefault, SwiperTabBox, BlankSpace},
  mounted() {
    this.getData();
    this.title = this.tabbarList[0];
    this.$root.eventHub.$on("UNslideTab", this.UNslidetab);
    this.$nextTick(() => { 
        this.initPage()
    });
    this.$root.eventHub.$on('updateAcceptData', this.updateAcceptData);
    this.$root.eventHub.$on('updateArrivalData', this.updateArrivalData)
  },
  methods: {
    getData(){
      // this.$loading.open()
      // this.$http.post('/getAgencyDeliveryDoc',{}).then(res => {
      //   this.$loading.close()
      //   let result = res.data;
      //   if(result.ret_code == 0){
      //     this.arrivalData = result.data.delAcceptList;
      //     this.acceptData = result.data.delCheckList;
      //   }
      // })
    },
    initPage(){
        this.nowIndex = this.$route.path === this.routerList[0] ? 0  : this.$route.path === this.routerList[1] ? 1 : 0;
    },
    UNtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('UNchangeTab', index)
    },
    UNslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  this.routerList[0] : index === 1 ? this.routerList[1] : index === 2 ? this.routerList[2] : this.routerList[3]
        this.$router.replace(href)
    },
    updateAcceptData(data){
      this.acceptData = data
    },
    updateArrivalData(data){
      this.arrivalData = data
    }
  }
};
</script>

<style lang="scss" scoped>
    .tabbarContainer{
      @include tabbar(2.92rem, 1.96rem)
    }
</style>

