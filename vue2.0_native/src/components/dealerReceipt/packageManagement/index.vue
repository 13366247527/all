<template>
  <div>
    <header-default :title="title"></header-default>
    <div class="tabbarContainer">
      <div class="tabbarBox">
        <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index ? 'activeTab' : ''" @click="PMtabClick(index)">{{item}}</span>
      </div>
    </div>
    <blank-space></blank-space>
    <swiper-tabBox :arrivalData="arrivalData" :acceptData="acceptData" :signTxt="signTxt"></swiper-tabBox>
  </div>
</template>

<script>

import HeaderDefault from "@/components/common/HeaderDefault"
import BlankSpace from "@/components/common/BlankSpace"
import SwiperTabBox from "./swiperTabBox"

export default {
  name: "packageManagement",
  data() {
    return {
      itemLists: [],
      title: "",
      tabbarList: ['托盘管理', '瓶箱管理'],
      nowIndex: 0,
      routerList: ["/dealerReceipt/packageManagement/tray", "/dealerReceipt/packageManagement/box"],
      arrivalData: [],
      acceptData: [],
      signTxt: '',
    };
  },
  components: {HeaderDefault, SwiperTabBox, BlankSpace},
  mounted() {
    this.getData();
    this.title = this.tabbarList[0];
    this.$root.eventHub.$on("PMslideTab", this.PMslidetab);
    this.$nextTick(() => { 
        this.initPage()
    });
    this.$root.eventHub.$on('updateAcceptData', this.updateAcceptData);
    this.$root.eventHub.$on('updateArrivalData', this.updateArrivalData)
  },
  methods: {
    getData(){
      this.$loading.open()
      this.$http.post('/getAgencyDeliveryDoc',{}).then(res => {
        this.$loading.close()
        let result = res.data;
        if(result.ret_code == 0){
          this.arrivalData = result.data.delAcceptList;
          this.acceptData = result.data.delCheckList;
          this.signTxt = result.data.artSign;
        }
      })
    },
    initPage(){
        this.nowIndex = this.$route.path === this.routerList[0] ? 0  : this.$route.path === this.routerList[1] ? 1 : 0;
    },
    PMtabClick(index) { 
        this.title = this.tabbarList[index]
        this.$root.eventHub.$emit('PMchangeTab', index)
    },
    PMslidetab(index) { 
        this.nowIndex = index
        this.title = this.tabbarList[index]
        let href = index == 0 ?  this.routerList[0] : this.routerList[1]
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

