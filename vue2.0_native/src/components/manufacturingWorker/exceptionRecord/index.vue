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
		name:"exceptionRecord",
		data(){
			return{
				itemLists:[],
				title:"异常记录",
				tabbarList:["日统计","月统计","年统计"],
				nowIndex:0
			}
		},
		mounted() {
		    //this.getData();
//		    this.title = this.tabbarList[0];
		    this.$root.eventHub.$on("ScslideTab", this.ScslideTab);
		    this.$nextTick(() => { 
		        this.initPage()
		    })
		},
		methods: {
		    initPage(){
		        this.nowIndex = this.$route.path === "/manufacturingWorker/exceptionRecord/daily" ? 0  : this.$route.path === "/manufacturingWorker/exceptionRecord/monthly" ? 1 : this.$route.path === "/manufacturingWorker/exceptionRecord/year" ? 2 : 0;
		    },
		    LMtabClick(index) { 
//		        this.title = this.tabbarList[index]
		        this.$root.eventHub.$emit('ScchangeTab', index)
		    },
		    ScslideTab(index) { 
		        this.nowIndex = index
//		        this.title = this.tabbarList[index]
		        let href = index == 0 ?  '/manufacturingWorker/exceptionRecord/daily' : index === 1 ? '/manufacturingWorker/exceptionRecord/monthly' :  '/manufacturingWorker/exceptionRecord/year' 
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