<template>
	<div>
	   <header-default :title="title"></header-default>
	   <div class="tabbarContainer">
	   	 <div class="tabbarBox">
          <span v-for="(item, index) in tabbarList" :key="index" class="tab" :class="nowIndex == index?'activeTab' : ''" @click="LMtabClick(index)">{{item}}</span>
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
	export default{
		name:"outputStatistics",
		data(){
			return{
				itemLists:[],
				title:"产量确认",
				tabbarList:["班产量","日统计","月统计"],
				nowIndex:0
			}
		},
		mounted() {
		    this.$root.eventHub.$on("OsLMslideTab", this.OsLMslideTab);
		    this.$nextTick(() => { 
		        this.initPage()
		    })
		},
		methods: {
		    initPage(){
		        this.nowIndex = this.$route.path === "/manufacturingWorker/outputStatistics/banoutput" ? 0  : this.$route.path === "/manufacturingWorker/outputStatistics/outdaily" ? 1 : this.$route.path === "/manufacturingWorker/outputStatistics/outmonthly" ? 2 : 0;
		    },
		    LMtabClick(index) { 
		        this.$root.eventHub.$emit('OschangeTab', index)
		    },
		    OsLMslideTab(index) { 
		        this.nowIndex = index
		        let href = index == 0 ?  '/manufacturingWorker/outputStatistics/banoutput' : index === 1 ? '/manufacturingWorker/outputStatistics/outdaily' :  '/manufacturingWorker/outputStatistics/outmonthly' 
		        this.$router.replace(href)
		    }
        },
		components:{
			HeaderDefault,
			SwiperTabBox,
			BlankSpace
		}
	}
</script>

<style lang="scss" scoped>
	.tabbarContainer{
      @include tabbar(3.43rem, 1.15rem)
    }
</style>