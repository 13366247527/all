<template>
	<div calss="box">
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
		name:"jobRecord",
		data(){
			return{
				itemLists:[],
				title:"工作统计",
				tabbarList:["工作统计","考勤记录","违规记录","破损记录"],
				nowIndex:0
			}
		},
		mounted() {
		    this.title = this.tabbarList[0];
		    this.$root.eventHub.$on("JrLMslideTab", this.JrLMslideTab);
		    this.$nextTick(() => { 
		        this.initPage()
		    })
		},
		methods: {
		    initPage(){
		        this.nowIndex = this.$route.path === "/loadMent/jobRecord/wookStatistics" ? 0  : this.$route.path === "/loadMent/jobRecord/attendanceRecord" ? 1 : this.$route.path === "/loadMent/jobRecord/criminalRecords" ? 2 : this.$route.path === "/loadMent/jobRecord/brokenRecord" ? 3 : 0;
		    },
		    LMtabClick(index) { 
		    	localStorage.setItem('key', index)
		    	this.title = this.tabbarList[index];
		        this.$root.eventHub.$emit('JrchangeTab', index)
		    },
		    JrLMslideTab(index) {
		        this.nowIndex = index
		        this.title = this.tabbarList[index];
		        let href = index == 0 ?  '/loadMent/jobRecord/wookStatistics' : index === 1 ? '/loadMent/jobRecord/attendanceRecord' : index === 2 ? '/loadMent/jobRecord/criminalRecords' : "/loadMent/jobRecord/brokenRecord"; 
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